#!/usr/bin/env bash
# Run on the VPS (via: ssh ... "export REMOTE_APP='...'; bash -s" < deploy/ci-remote.sh)
# or on a self-hosted runner: REMOTE_APP=/var/www/epicfinance bash deploy/ci-remote.sh
set -euo pipefail
: "${REMOTE_APP:?REMOTE_APP is not set}"

as_root() { if [ "$(id -u)" -eq 0 ]; then "$@"; else sudo "$@"; fi; }
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

if command -v npm >/dev/null 2>&1; then NPM=npm
elif [ -x /usr/bin/npm ]; then NPM=/usr/bin/npm
elif [ -x /usr/local/bin/npm ]; then NPM=/usr/local/bin/npm
else
  echo "::error::npm not found on the server. Install Node 20: curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs"
  exit 127
fi

cd "$REMOTE_APP"
"$NPM" ci
"$NPM" run build
if [ ! -f .next/BUILD_ID ]; then
  echo "::error::next build did not produce .next/BUILD_ID (build failed or wrong directory)."
  exit 1
fi

if ! id -u deploy >/dev/null 2>&1; then
  as_root useradd --system --create-home --shell /bin/bash deploy
fi
SVC_SRC="$REMOTE_APP/deploy/epicfinance-nextjs.service"
SVC_DST="/etc/systemd/system/epicfinance-nextjs.service"
if [ ! -f "$SVC_DST" ]; then
  if [ ! -f "$SVC_SRC" ]; then
    echo "::error::Missing $SVC_SRC. Ensure deploy/epicfinance-nextjs.service is in the repo."
    exit 1
  fi
  as_root cp "$SVC_SRC" "$SVC_DST"
  as_root systemctl daemon-reload
  as_root systemctl enable epicfinance-nextjs
fi
as_root chown -R deploy:deploy "$REMOTE_APP"
as_root systemctl restart epicfinance-nextjs
