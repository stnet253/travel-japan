#!/usr/bin/env bash
# 下載並建置需要本機原始碼的 MCP server（japan-transit）
# 只需執行一次；mcp/ 目錄已在 .gitignore 中
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p mcp

[ -d mcp/japan-transit-mcp ] || git clone --depth 1 https://github.com/Anchovy-s3/japan-transit-mcp.git mcp/japan-transit-mcp
(cd mcp/japan-transit-mcp && npm install && npm run build)

echo "完成。重啟 Claude Code 並執行 claude mcp list 確認 japan-transit 已連線"
