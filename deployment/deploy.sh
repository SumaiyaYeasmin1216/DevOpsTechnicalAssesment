#!/usr/bin/env bash

# Deploy a verified main commit on the Linux host that runs this script.
set -euo pipefail

deployment_path="${DEPLOY_PATH:?DEPLOY_PATH must name the server checkout}"
deployment_commit="${DEPLOY_COMMIT:?DEPLOY_COMMIT must name the commit to deploy}"
public_port="${PUBLIC_PORT:-8080}"
base_url="http://127.0.0.1:${public_port}"

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Required command is missing: $1" >&2
    exit 1
  }
}

require_command curl
require_command docker
require_command git

test -d "$deployment_path/.git" || {
  echo "Deployment checkout is missing: $deployment_path" >&2
  exit 1
}

git -C "$deployment_path" fetch --prune origin main
git -C "$deployment_path" checkout --detach "$deployment_commit"
test "$(git -C "$deployment_path" rev-parse HEAD)" = "$deployment_commit"

docker compose --project-directory "$deployment_path" config --quiet
docker compose --project-directory "$deployment_path" up --build --detach --remove-orphans --wait --wait-timeout 120

health_body="$(curl --fail --silent --show-error --retry 5 --retry-connrefused "$base_url/healthz")"
test "$health_body" = "healthy"

root_headers="$(curl --silent --show-error --dump-header - --output /dev/null --max-redirs 0 "$base_url/")"
printf '%s\n' "$root_headers" | grep --quiet '^HTTP/.* 302'
printf '%s\n' "$root_headers" | grep --ignore-case --quiet '^location: .*/site1/'

for site_path in /site1/ /site2/; do
  curl --fail --silent --show-error --retry 5 --retry-connrefused "$base_url$site_path" >/dev/null
done

echo "Deployment verified at $base_url"
