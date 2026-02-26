#!/usr/bin/env bash
# generate-and-upload-image.sh
#
# Generates an image with Gemini (nano-banana-pro) and uploads it to Vercel Blob.
# Validates the uploaded URL before printing it.
#
# Usage:
#   ./scripts/generate-and-upload-image.sh "image prompt" "slug-filename"
#
# Output (on success):
#   Prints the public Vercel Blob URL to stdout.
#   All logs go to stderr.
#
# Exit codes:
#   0 - success (URL printed to stdout)
#   1 - generation failed
#   2 - upload failed
#   3 - validation failed (URL not reachable)

set -euo pipefail

PROMPT="${1:-}"
FILENAME="${2:-}"

if [[ -z "$PROMPT" || -z "$FILENAME" ]]; then
  echo "Usage: $0 \"image prompt\" \"slug-filename\"" >&2
  exit 1
fi

# Ensure .png extension
FILENAME="${FILENAME%.png}.png"
TMP_FILE="/tmp/${FILENAME}"

# ── Config ──────────────────────────────────────────────────────────────────
GEMINI_API_KEY="${GEMINI_API_KEY:-AIzaSyAoMoSiUnkyrMynkxelDXVZP9AqSdX4KGA}"
BLOB_TOKEN="${BLOB_READ_WRITE_TOKEN:-vercel_blob_rw_vWY1T1uzxWussKuN_FjE4IeEoKA8YgWALowzMqZ9I9ulZWX}"
BLOB_BASE_PATH="aroma-de-cuba/images/blog"
GENERATE_SCRIPT="/root/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/skills/nano-banana-pro/scripts/generate_image.py"
MAX_RETRIES=2

# ── Step 1: Generate image ───────────────────────────────────────────────────
echo "🎨 Generating image: $FILENAME" >&2
echo "   Prompt: $PROMPT" >&2

for attempt in $(seq 1 $MAX_RETRIES); do
  echo "   Attempt $attempt/$MAX_RETRIES..." >&2
  if GEMINI_API_KEY="$GEMINI_API_KEY" uv run "$GENERATE_SCRIPT" \
      --prompt "$PROMPT" \
      --filename "$TMP_FILE" \
      --resolution 1K 2>&1 | grep -v "^$" >&2; then
    if [[ -f "$TMP_FILE" && -s "$TMP_FILE" ]]; then
      echo "   ✅ Image generated: $(du -h "$TMP_FILE" | cut -f1)" >&2
      break
    fi
  fi
  if [[ $attempt -eq $MAX_RETRIES ]]; then
    echo "❌ Image generation failed after $MAX_RETRIES attempts" >&2
    exit 1
  fi
  echo "   Retrying..." >&2
  sleep 2
done

# ── Step 2: Upload to Vercel Blob ─────────────────────────────────────────────
BLOB_KEY="${BLOB_BASE_PATH}/${FILENAME}"
echo "☁️  Uploading to Vercel Blob: $BLOB_KEY" >&2

UPLOAD_RESPONSE=$(curl -sf -X PUT \
  "https://blob.vercel-storage.com/${BLOB_KEY}" \
  -H "Authorization: Bearer ${BLOB_TOKEN}" \
  -H "x-api-version: 7" \
  -H "Content-Type: image/png" \
  --data-binary "@${TMP_FILE}" \
  --max-time 60) || {
    echo "❌ Upload to Vercel Blob failed" >&2
    exit 2
  }

PUBLIC_URL=$(echo "$UPLOAD_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin)['url'])" 2>/dev/null) || {
  echo "❌ Could not parse URL from upload response:" >&2
  echo "$UPLOAD_RESPONSE" >&2
  exit 2
}

echo "   ✅ Uploaded: $PUBLIC_URL" >&2

# ── Step 3: Validate URL ──────────────────────────────────────────────────────
echo "🔍 Validating URL..." >&2

HTTP_STATUS=$(curl -so /dev/null -w "%{http_code}" --max-time 15 "$PUBLIC_URL") || HTTP_STATUS="000"

if [[ "$HTTP_STATUS" != "200" ]]; then
  echo "❌ Validation failed — URL returned HTTP $HTTP_STATUS: $PUBLIC_URL" >&2
  exit 3
fi

echo "   ✅ URL is reachable (HTTP 200)" >&2

# ── Cleanup ───────────────────────────────────────────────────────────────────
rm -f "$TMP_FILE"

# ── Output ────────────────────────────────────────────────────────────────────
echo "$PUBLIC_URL"
