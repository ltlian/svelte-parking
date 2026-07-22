#!/bin/bash
set -euo pipefail

# Fix ownership of named volumes (Docker creates them as root).
sudo chown -R agent:agent /workspace/node_modules 2>/dev/null || true
sudo chown -R agent:agent /home/agent/.config/crush 2>/dev/null || true
sudo chown -R agent:agent /home/agent/.local/share/crush 2>/dev/null || true

exec "$@"
