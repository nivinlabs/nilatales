#!/usr/bin/env bash
# deploy/hostinger.sh — build NilaTales and prepare a Hostinger upload bundle.
#
# NilaTales is a fully static Astro site. The domain nilatales.com is hosted
# on Hostinger. This script:
#   1. Runs the production build (npm run build)
#   2. Bundles the dist/ folder into a timestamped zip in the project root
#   3. Prints the rsync command for uploading to Hostinger via SFTP
#
# Prerequisites for upload:
#   - Hostinger SFTP credentials in ~/.ssh/config or env (HOSTINGER_USER, HOSTINGER_HOST)
#   - The public_html directory on Hostinger should be the upload target
#
# Usage:
#   ./deploy/hostinger.sh                          # build + zip, print rsync
#   ./deploy/hostinger.sh --upload                 # build + zip + rsync
#   HOSTINGER_USER=u123456 ./deploy/hostinger.sh --upload
#
# After upload, point nilatales.com DNS at the Hostinger nameservers (already
# configured if the domain was registered there).

set -euo pipefail

cd "$(dirname "$0")/.."
PROJECT_ROOT=$(pwd)

echo "==> NilaTales · Hostinger deploy"
echo "    Project root: $PROJECT_ROOT"

# 1. Build
echo ""
echo "==> Building site..."
npm run build

if [[ ! -d dist ]]; then
  echo "ERROR: dist/ not created. Build failed?" >&2
  exit 1
fi

# 2. Bundle
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
ZIP_NAME="nilatales-${TIMESTAMP}.zip"
echo ""
echo "==> Bundling dist/ → $ZIP_NAME"
cd dist
zip -rq "../$ZIP_NAME" .
cd "$PROJECT_ROOT"
echo "    Bundle: $PROJECT_ROOT/$ZIP_NAME ($(du -h "$ZIP_NAME" | cut -f1))"

# 3. Upload (optional)
if [[ "${1:-}" == "--upload" ]]; then
  : "${HOSTINGER_USER:?HOSTINGER_USER env var required (e.g. u123456789)}"
  : "${HOSTINGER_HOST:=nilatales.com}"
  REMOTE="${HOSTINGER_USER}@${HOSTINGER_HOST}:~/domains/nilatales.com/public_html/"
  echo ""
  echo "==> Uploading to $REMOTE"
  rsync -avz --delete \
    -e "ssh -o StrictHostKeyChecking=accept-new" \
    dist/ "$REMOTE"
  echo ""
  echo "==> Upload complete. Verify at https://nilatales.com/"
else
  echo ""
  echo "==> To upload, run:"
  echo "    HOSTINGER_USER=your_user ./deploy/hostinger.sh --upload"
  echo ""
  echo "    Or manually upload $ZIP_NAME via the Hostinger file manager,"
  echo "    unzipping into domains/nilatales.com/public_html/."
fi
