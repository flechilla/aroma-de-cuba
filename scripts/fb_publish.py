#!/usr/bin/env python3
"""
Facebook Publisher for Aroma de Cuba
=====================================
Publishes blog posts to Facebook Page.

Setup:
    python fb_publish.py --setup

Publish a post:
    python fb_publish.py --url "https://aromadecuba.com/blog/es/..." --title "..." --description "..." --image "https://..."

Test (dry run):
    python fb_publish.py --test
"""

import os
import sys
import argparse
import requests
from pathlib import Path
from urllib.parse import urlencode
from dotenv import load_dotenv

# Load environment
ENV_FILE = Path(__file__).parent / ".env.facebook"
load_dotenv(ENV_FILE)

FB_APP_ID = os.getenv("FB_APP_ID")
FB_APP_SECRET = os.getenv("FB_APP_SECRET")
FB_PAGE_ID = os.getenv("FB_PAGE_ID")
FB_PAGE_ACCESS_TOKEN = os.getenv("FB_PAGE_ACCESS_TOKEN")

GRAPH_API_VERSION = "v21.0"
GRAPH_API_BASE = f"https://graph.facebook.com/{GRAPH_API_VERSION}"


def setup_token():
    """Interactive setup to get Page Access Token."""
    print("\n🔐 Facebook Page Access Token Setup")
    print("=" * 50)
    
    # Step 1: Generate OAuth URL
    permissions = "pages_manage_posts,pages_read_engagement,pages_show_list"
    oauth_url = (
        f"https://www.facebook.com/{GRAPH_API_VERSION}/dialog/oauth?"
        f"client_id={FB_APP_ID}&"
        f"redirect_uri=https://localhost/&"
        f"scope={permissions}&"
        f"response_type=token"
    )
    
    print("\n1️⃣  Open this URL in your browser (logged into Facebook):\n")
    print(oauth_url)
    print("\n2️⃣  After authorizing, you'll be redirected to a localhost URL.")
    print("    Copy the 'access_token' parameter from that URL.\n")
    
    user_token = input("3️⃣  Paste the access_token here: ").strip()
    
    if not user_token:
        print("❌ No token provided. Aborting.")
        return
    
    # Step 2: Exchange for long-lived token
    print("\n⏳ Exchanging for long-lived token...")
    response = requests.get(
        f"{GRAPH_API_BASE}/oauth/access_token",
        params={
            "grant_type": "fb_exchange_token",
            "client_id": FB_APP_ID,
            "client_secret": FB_APP_SECRET,
            "fb_exchange_token": user_token,
        },
    )
    
    if response.status_code != 200:
        print(f"❌ Error: {response.json()}")
        return
    
    long_lived_token = response.json().get("access_token")
    print("✅ Got long-lived user token")
    
    # Step 3: Get Page Access Token
    print(f"\n⏳ Getting Page Access Token for page {FB_PAGE_ID}...")
    response = requests.get(
        f"{GRAPH_API_BASE}/me/accounts",
        params={"access_token": long_lived_token},
    )
    
    if response.status_code != 200:
        print(f"❌ Error: {response.json()}")
        return
    
    pages = response.json().get("data", [])
    page_token = None
    page_name = None
    
    for page in pages:
        if page["id"] == FB_PAGE_ID:
            page_token = page["access_token"]
            page_name = page["name"]
            break
    
    if not page_token:
        print(f"❌ Page {FB_PAGE_ID} not found. Available pages:")
        for page in pages:
            print(f"   - {page['name']} (ID: {page['id']})")
        return
    
    print(f"✅ Got Page Access Token for '{page_name}'")
    
    # Step 4: Save to .env file
    env_content = ENV_FILE.read_text()
    env_content = env_content.replace(
        "FB_PAGE_ACCESS_TOKEN=",
        f"FB_PAGE_ACCESS_TOKEN={page_token}"
    )
    ENV_FILE.write_text(env_content)
    
    print(f"\n✅ Token saved to {ENV_FILE}")
    print("\n🎉 Setup complete! You can now publish to Facebook.")
    print(f"   Page: {page_name}")
    print(f"   Token expires: ~60 days (re-run --setup to refresh)")


def publish_post(url: str, title: str, description: str, image_url: str = None) -> dict:
    """
    Publish a link post to Facebook Page.
    
    Args:
        url: The blog post URL
        title: Post title (used in message)
        description: Post description
        image_url: Optional image URL (Facebook will scrape from og:image if not provided)
    
    Returns:
        dict with 'success', 'post_id', and 'error' keys
    """
    if not FB_PAGE_ACCESS_TOKEN:
        return {"success": False, "error": "No FB_PAGE_ACCESS_TOKEN configured. Run --setup first."}
    
    # Compose the message
    message = f"📰 {title}\n\n{description}\n\n🔗 Lee más en Aroma de Cuba"
    
    # Publish to page feed
    endpoint = f"{GRAPH_API_BASE}/{FB_PAGE_ID}/feed"
    
    payload = {
        "message": message,
        "link": url,
        "access_token": FB_PAGE_ACCESS_TOKEN,
    }
    
    response = requests.post(endpoint, data=payload)
    
    if response.status_code == 200:
        post_id = response.json().get("id")
        return {"success": True, "post_id": post_id}
    else:
        error = response.json().get("error", {})
        return {
            "success": False,
            "error": f"{error.get('type', 'Unknown')}: {error.get('message', 'Unknown error')}",
        }


def publish_photo_post(url: str, title: str, description: str, image_url: str) -> dict:
    """
    Publish a photo post with link in caption.
    Better engagement than link posts.
    """
    if not FB_PAGE_ACCESS_TOKEN:
        return {"success": False, "error": "No FB_PAGE_ACCESS_TOKEN configured. Run --setup first."}
    
    message = f"📰 {title}\n\n{description}\n\n🔗 {url}"
    
    endpoint = f"{GRAPH_API_BASE}/{FB_PAGE_ID}/photos"
    
    payload = {
        "caption": message,
        "url": image_url,
        "access_token": FB_PAGE_ACCESS_TOKEN,
    }
    
    response = requests.post(endpoint, data=payload)
    
    if response.status_code == 200:
        post_id = response.json().get("id")
        return {"success": True, "post_id": post_id}
    else:
        error = response.json().get("error", {})
        return {
            "success": False,
            "error": f"{error.get('type', 'Unknown')}: {error.get('message', 'Unknown error')}",
        }


def test_connection():
    """Test the Facebook API connection."""
    if not FB_PAGE_ACCESS_TOKEN:
        print("❌ No FB_PAGE_ACCESS_TOKEN configured. Run --setup first.")
        return False
    
    print("🔍 Testing Facebook API connection...")
    
    response = requests.get(
        f"{GRAPH_API_BASE}/{FB_PAGE_ID}",
        params={
            "fields": "name,fan_count,about",
            "access_token": FB_PAGE_ACCESS_TOKEN,
        },
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Connected to: {data.get('name')}")
        print(f"   Followers: {data.get('fan_count', 'N/A')}")
        print(f"   About: {data.get('about', 'N/A')[:100]}...")
        return True
    else:
        error = response.json().get("error", {})
        print(f"❌ Error: {error.get('message', 'Unknown error')}")
        return False


def main():
    parser = argparse.ArgumentParser(description="Facebook Publisher for Aroma de Cuba")
    parser.add_argument("--setup", action="store_true", help="Setup Page Access Token")
    parser.add_argument("--test", action="store_true", help="Test API connection")
    parser.add_argument("--url", help="Blog post URL to publish")
    parser.add_argument("--title", help="Post title")
    parser.add_argument("--description", help="Post description")
    parser.add_argument("--image", help="Image URL (required for photo posts)")
    parser.add_argument("--link-only", action="store_true", help="Force link post instead of photo post")
    
    args = parser.parse_args()
    
    if args.setup:
        setup_token()
    elif args.test:
        test_connection()
    elif args.url and args.title and args.description:
        # Default: photo post when image provided (better engagement)
        # Use --link-only to force old link-sharing behavior
        if args.image and not args.link_only:
            result = publish_photo_post(args.url, args.title, args.description, args.image)
        else:
            result = publish_post(args.url, args.title, args.description, args.image)
        
        if result["success"]:
            print(f"✅ Published! Post ID: {result['post_id']}")
            print(f"   View: https://facebook.com/{result['post_id']}")
        else:
            print(f"❌ Failed: {result['error']}")
            sys.exit(1)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
