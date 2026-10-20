#!/bin/sh
# Renders the OG card and touch icon to PNG with headless Chrome.
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=2000 \
  --window-size=1200,630 --screenshot="$PWD/../../public/og.png" "file://$PWD/card.html"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=2000 \
  --window-size=180,180 --screenshot="$PWD/../../public/apple-touch-icon.png" "file://$PWD/icon.html"
