#!/usr/bin/env bash
# ScanForge → GitHub push script
#
# Usage:
#   1. Edit YOUR_GITHUB_USERNAME and YOUR_REPO_NAME below.
#   2. Run: bash scripts/push-to-github.sh
#   3. When asked for a password, paste your GitHub Personal Access Token (PAT).
#      Generate one at: https://github.com/settings/tokens/new
#      (tick the "repo" scope, then Generate token)

set -euo pipefail

# ====== এখানে আপনার তথ্য বসান ======
YOUR_GITHUB_USERNAME="YOUR_USERNAME"   # যেমন: adalovelace
YOUR_REPO_NAME="scanforge"             # যেমন: scanforge  (GitHub-এ এই নামে রেপো তৈরি করা থাকতে হবে)
# =====================================

REPO_DIR="/home/z/my-project"

if [ "$YOUR_GITHUB_USERNAME" = "YOUR_USERNAME" ]; then
  echo "❌ আগে scripts/push-to-github.sh ফাইলে YOUR_GITHUB_USERNAME বসান!"
  exit 1
fi

cd "$REPO_DIR"

echo "📦 কমিট আছে কিনা দেখছি..."
if git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "✓ সব কমিট হয়ে আছে"
else
  echo "📝 নতুন পরিবর্তন কমিট করছি..."
  git add -A
  git commit -m "update: ScanForge workspace" || true
fi

REMOTE_URL="https://github.com/${YOUR_GITHUB_USERNAME}/${YOUR_REPO_NAME}.git"

echo "🔗 রিমোট যোগ করছি..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"

echo "🚀 পুশ করছি ($REMOTE_URL) ..."
echo "    ইউজারনেম: আপনার GitHub ইউজারনেম"
echo "    পাসওয়ার্ড: আপনার PAT টোকেন পেস্ট করুন (ghp_xxx...)"
echo ""
git branch -M main
git push -u origin main

echo ""
echo "✅ হয়ে গেছে! আপনার কোড এখানে আছে:"
echo "   https://github.com/${YOUR_GITHUB_USERNAME}/${YOUR_REPO_NAME}"
