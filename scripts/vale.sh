#!/usr/bin/env bash
# Run Vale, using whatever is already on PATH; otherwise fetch the real
# release binary into .bin/ and use that. Deliberately not npm/npx: the
# npm-wrapped Vale packages (@vvago/vale) are known to fail with
# "vale: command not found" even after a clean install, an npx
# bin-resolution problem, not a broken download.
set -euo pipefail
cd "$(dirname "$0")/.."

if command -v vale >/dev/null 2>&1; then
  VALE=vale
else
  BIN=".bin/vale"
  if [ ! -x "$BIN" ]; then
    mkdir -p .bin
    case "$(uname -s)_$(uname -m)" in
      Darwin_arm64)  pattern='*macOS_arm64.tar.gz' ;;
      Darwin_x86_64) pattern='*macOS_64-bit.tar.gz' ;;
      Linux_x86_64)  pattern='*Linux_64-bit.tar.gz' ;;
      Linux_aarch64) pattern='*Linux_arm64.tar.gz' ;;
      *) echo "vale.sh: unsupported platform $(uname -s)_$(uname -m)" >&2; exit 1 ;;
    esac
    echo "vale.sh: vale not on PATH, fetching a local copy into .bin/..." >&2
    tmp="$(mktemp -d)"
    gh release download --repo vale-cli/vale --pattern "$pattern" --output "$tmp/vale.tar.gz" --clobber
    tar -xzf "$tmp/vale.tar.gz" -C .bin vale
    rm -rf "$tmp"
  fi
  VALE="$BIN"
fi

if [ ! -d styles/Google ] || [ ! -d styles/write-good ] || [ ! -d styles/alex ]; then
  "$VALE" sync
fi

exec "$VALE" "$@"
