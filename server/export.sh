#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# QCTWeb Data Export
#
# Decrypts newsletter + contact_submissions tables and emails both as CSVs
# to the admin address configured in server/.env (NOTIFY_EMAIL).
#
# Usage:
#   bash server/export.sh
#
# Run from the project root OR from inside the server/ directory — both work.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

if [ ! -f ".env" ]; then
  echo "Error: server/.env not found. Copy .env.example and fill in the values."
  exit 1
fi

echo ""
echo "  Running QCTWeb export..."
echo ""

npx tsx src/scripts/export-data.ts
