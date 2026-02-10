#!/usr/bin/env python3
"""
Facebook OAuth Callback Server
==============================
Temporary server to capture OAuth token automatically.

Usage:
    python fb_oauth_server.py

Then visit: http://SERVER_IP:9876/start
"""

import os
import sys
from pathlib import Path
from flask import Flask, request, redirect, render_template_string
import requests
from dotenv import load_dotenv

# Load environment
ENV_FILE = Path(__file__).parent / ".env.facebook"
load_dotenv(ENV_FILE)

FB_APP_ID = os.getenv("FB_APP_ID")
FB_APP_SECRET = os.getenv("FB_APP_SECRET")
FB_PAGE_ID = os.getenv("FB_PAGE_ID")

GRAPH_API_VERSION = "v21.0"
GRAPH_API_BASE = f"https://graph.facebook.com/{GRAPH_API_VERSION}"

# Get server's public URL - adjust this to your server
SERVER_HOST = os.getenv("OAUTH_HOST", "0.0.0.0")
SERVER_PORT = int(os.getenv("OAUTH_PORT", "9876"))
CALLBACK_URL = os.getenv("OAUTH_CALLBACK_URL", f"http://localhost:{SERVER_PORT}/callback")

app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Aroma de Cuba - Facebook Setup</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
               max-width: 600px; margin: 50px auto; padding: 20px; }
        .success { color: #22c55e; }
        .error { color: #ef4444; }
        .box { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        a.button { display: inline-block; background: #1877f2; color: white; 
                   padding: 12px 24px; text-decoration: none; border-radius: 6px; }
        a.button:hover { background: #166fe5; }
        code { background: #e9ecef; padding: 2px 6px; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🌺 Aroma de Cuba</h1>
    <h2>Facebook Page Setup</h2>
    {% if status == 'start' %}
        <div class="box">
            <p>Click the button below to authorize posting to your Facebook Page.</p>
            <p><a href="{{ oauth_url }}" class="button">🔗 Connect Facebook Page</a></p>
        </div>
        <p><small>This will request permission to post on behalf of your page.</small></p>
    {% elif status == 'success' %}
        <div class="box success">
            <h3>✅ Success!</h3>
            <p>Connected to: <strong>{{ page_name }}</strong></p>
            <p>Token saved. You can now close this window.</p>
        </div>
        <p>Test with: <code>python fb_publish.py --test</code></p>
    {% elif status == 'error' %}
        <div class="box error">
            <h3>❌ Error</h3>
            <p>{{ error }}</p>
        </div>
        <p><a href="/start">Try again</a></p>
    {% endif %}
</body>
</html>
"""


@app.route("/")
def index():
    return redirect("/start")


@app.route("/start")
def start():
    """Start the OAuth flow."""
    permissions = "pages_manage_posts,pages_read_engagement,pages_show_list"
    oauth_url = (
        f"https://www.facebook.com/{GRAPH_API_VERSION}/dialog/oauth?"
        f"client_id={FB_APP_ID}&"
        f"redirect_uri={CALLBACK_URL}&"
        f"scope={permissions}"
    )
    return render_template_string(HTML_TEMPLATE, status="start", oauth_url=oauth_url)


@app.route("/callback")
def callback():
    """Handle OAuth callback."""
    # Check for error
    if "error" in request.args:
        error = request.args.get("error_description", "Authorization denied")
        return render_template_string(HTML_TEMPLATE, status="error", error=error)
    
    # Get authorization code
    code = request.args.get("code")
    if not code:
        return render_template_string(HTML_TEMPLATE, status="error", error="No authorization code received")
    
    # Exchange code for access token
    try:
        response = requests.get(
            f"{GRAPH_API_BASE}/oauth/access_token",
            params={
                "client_id": FB_APP_ID,
                "client_secret": FB_APP_SECRET,
                "redirect_uri": CALLBACK_URL,
                "code": code,
            },
        )
        
        if response.status_code != 200:
            error = response.json().get("error", {}).get("message", "Token exchange failed")
            return render_template_string(HTML_TEMPLATE, status="error", error=error)
        
        short_token = response.json().get("access_token")
        
        # Exchange for long-lived token
        response = requests.get(
            f"{GRAPH_API_BASE}/oauth/access_token",
            params={
                "grant_type": "fb_exchange_token",
                "client_id": FB_APP_ID,
                "client_secret": FB_APP_SECRET,
                "fb_exchange_token": short_token,
            },
        )
        
        if response.status_code != 200:
            error = response.json().get("error", {}).get("message", "Long-lived token exchange failed")
            return render_template_string(HTML_TEMPLATE, status="error", error=error)
        
        long_token = response.json().get("access_token")
        
        # Get Page Access Token
        response = requests.get(
            f"{GRAPH_API_BASE}/me/accounts",
            params={"access_token": long_token},
        )
        
        if response.status_code != 200:
            error = response.json().get("error", {}).get("message", "Failed to get pages")
            return render_template_string(HTML_TEMPLATE, status="error", error=error)
        
        pages = response.json().get("data", [])
        page_token = None
        page_name = None
        
        for page in pages:
            if page["id"] == FB_PAGE_ID:
                page_token = page["access_token"]
                page_name = page["name"]
                break
        
        if not page_token:
            available = ", ".join([f"{p['name']} ({p['id']})" for p in pages])
            return render_template_string(
                HTML_TEMPLATE, 
                status="error", 
                error=f"Page {FB_PAGE_ID} not found. Available: {available}"
            )
        
        # Save token to .env file
        env_content = ENV_FILE.read_text()
        # Replace existing token or empty value
        import re
        env_content = re.sub(
            r'FB_PAGE_ACCESS_TOKEN=.*',
            f'FB_PAGE_ACCESS_TOKEN={page_token}',
            env_content
        )
        ENV_FILE.write_text(env_content)
        
        print(f"\n✅ Token saved for page: {page_name}")
        
        return render_template_string(HTML_TEMPLATE, status="success", page_name=page_name)
        
    except Exception as e:
        return render_template_string(HTML_TEMPLATE, status="error", error=str(e))


if __name__ == "__main__":
    print(f"""
╔══════════════════════════════════════════════════════════════╗
║  Facebook OAuth Server for Aroma de Cuba                     ║
╠══════════════════════════════════════════════════════════════╣
║  1. Make sure port {SERVER_PORT} is accessible                       ║
║  2. Visit: http://YOUR_SERVER_IP:{SERVER_PORT}/start                 ║
║  3. Authorize the Facebook app                               ║
║  4. Token will be saved automatically                        ║
╚══════════════════════════════════════════════════════════════╝
""")
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=False)
