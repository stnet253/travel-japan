# travel-japan

日本旅遊行程網站，以 Jekyll + GitHub Pages 建置。

- 線上網址：https://stnet253.github.io/travel-japan/
- 每日行程：`_days/dayNN-<城市>.md`（摘要）+ `_data/days/dayNN.yml`（時間軸節點）
- 旅程總覽：`_data/trip.yml`

## 本機預覽
```bash
bundle install
bundle exec jekyll serve --livereload
```

## MCP
專案專用 MCP 定義於 `.mcp.json`；`japan-transit` 需先執行 `./scripts/setup-mcp.sh`。
