# travel-japan — 日本旅遊規劃專案

## 專案定位
- 這是一個**旅遊專用專案**，不是軟體開發專案。
- 用途：規劃與記錄日本旅遊的行程、交通、住宿、景點、美食、預算與注意事項。
- 全域 CLAUDE.md 中與程式開發相關的規則（TDD、80% 測試覆蓋率、code review agent、ruff/black、commit 前安全檢查等）在本專案**不適用**，除非我明確要求寫程式。
- 語言偏好、Token 節省、破壞性指令確認等通用規則仍然適用。

## 輸出語言與格式
- 所有內容一律繁體中文；地名、店名、車站名、路線名保留日文原文，第一次出現時可附中文或英文對照。
- 金額統一以日圓（¥）標示，必要時附台幣換算並註明匯率與日期。
- 時間一律使用 24 小時制，日期格式 `YYYY-MM-DD`。
- 行程表優先用 Markdown 表格：日期 / 時段 / 地點 / 交通 / 預估費用 / 備註。

## 檔案結構（依此規劃，不要自行發明新結構）
```
travel-japan/
├── CLAUDE.md
├── README.md              # 旅程總覽：日期、人數、城市、預算上限
├── _config.yml            # Jekyll 設定（GitHub Pages 原生支援）
├── index.md               # 首頁：全程地圖 + 每日卡片
├── _days/                 # ★ 每日行程（Jekyll collection），一天一個 .md，如 day01-tokyo.md
├── _data/                 # 行程結構化資料 YAML（時間軸節點、座標、花費），頁面由此渲染
├── _includes/             # 可重用片段：timeline.html、map.html、place-card.html
├── _layouts/              # 版型：default.html、day.html
├── assets/
│   ├── css/
│   ├── js/                # Leaflet 地圖初始化、時間軸互動
│   └── img/               # 景點照片（壓縮後，單張 < 300KB）
├── transport/             # 交通：機票、JR Pass、IC 卡、地鐵路線、班次
├── accommodation/         # 住宿：訂房資訊、地址、入住退房時間
├── places/                # 景點與美食筆記，依城市分子目錄
├── budget/                # 預算表與實際花費紀錄
├── checklist/             # 行前準備、打包清單、簽證/保險/網路
├── reference/             # 外部連結、官方公告、匯率、天氣
├── scripts/setup-mcp.sh   # 一次性安裝需本機建置的 MCP
└── mcp/                   # 本機 MCP 原始碼（gitignore，由 scripts/setup-mcp.sh 產生）
```
- 內容一律寫 Markdown（`_days/`、`_data/`），**不手寫整頁 HTML**；HTML 只出現在 `_layouts/` 與 `_includes/` 的版型片段。
- `transport/`、`places/` 等資料夾若要出現在網站上，在 front matter 加 `layout` 即可，否則只是筆記。

## 主要產出：GitHub Pages 靜態網站（給朋友看）
本專案最終交付物是用 **Jekyll 4 + GitHub Pages（Actions）** 自動產生的靜態網站。我只寫 Markdown 與 YAML，push 到 GitHub 後由 Pages 自動建置與部署，**不手寫 HTML 頁面、不在本機維護產出的 HTML**。

### 建置與部署
- 使用 **Jekyll 4 + GitHub Actions**（`.github/workflows/pages.yml`）部署，repo Settings → Pages → Source 選 **GitHub Actions**。不用 `github-pages` gem：它綁定 Jekyll 3.9，與本機 Ruby 4.0 不相容。
- `_config.yml` 必填：`title`、`lang: zh-Hant`、`collections: { days: { output: true, permalink: /day/:name/ } }`、`defaults` 給 `_days` 套 `layout: day`。
- 本機預覽：`bundle exec jekyll serve --livereload`；gem 安裝在 `vendor/bundle`（已 gitignore）。
- 網址為 `https://<user>.github.io/travel-japan/`，所有連結用 `{{ '/path' | relative_url }}`，不可寫死根路徑。

### 內容要求
- **圖文並茂**：每個景點、餐廳、住宿至少一張圖片（官方圖或自拍，標明來源），搭配 2～3 句說明與必看重點。圖片放 `assets/img/`，壓縮後單張 < 300KB，加 `alt`。
- **非常詳細的流程與時間點**：每天一個 `_days/dayNN-<城市>.md`，front matter 放摘要（日期、城市、住宿、天氣、步行總量、花費總計），時間軸節點放 `_data/days/dayNN.yml`，由 `_includes/timeline.html` 渲染。每個節點必須有：
  - `time`：24 小時制精確到分鐘（如 `08:12`）
  - `title`：地點日文原名 + 中文
  - `what`：做什麼、停留多久
  - `transport`：搭哪條線、哪個月台、幾號出口、車程幾分、票價、末班車時間；步行路段寫步行分鐘數與距離
  - `cost`：預估花費（¥）
  - `buffer` / `plan_b`：緩衝時間與備案（下雨、休館、客滿時改去哪）
  - `lat` / `lng` / `gmap`：座標與 Google Maps 導航連結
- **地圖**：
  - 首頁：全程地圖，標出所有城市與住宿點，依天數連線
  - 每日頁：當日路線地圖，依時間順序標號（①②③…），點擊 marker 顯示該點摘要與時間；座標直接讀 `_data/days/dayNN.yml`
  - 地圖用 Leaflet + OpenStreetMap（免金鑰），由 `_includes/map.html` 載入，CDN 鎖版本（`leaflet@1.9.4`）
- 首頁另放：行程總表、預算總表、交通票券說明、緊急聯絡與注意事項。

### 版型規範
- 響應式，手機直向優先（朋友多半用手機看），側邊 gutter 16px，無水平捲動。
- 支援深色模式（`prefers-color-scheme`）。
- 字型用 Google Fonts 的 Noto Sans TC + Noto Sans JP。
- 導航：頂部固定列可切換每日頁；每日頁底部有「前一天 / 後一天」（用 collection 的 `previous` / `next`）。
- `@media print` 隱藏地圖互動層、展開全部時間軸，方便列印成 PDF 隨身帶。

### 視覺風格（必須遵守，避免 AI 制式感）
- **定位**：專業旅遊雜誌／獨立旅遊部落格的編輯排版，不是 dashboard、不是卡片牆。
- **色彩**：和紙底色（`--paper`）、墨色文字、朱色（`--vermilion`）唯一強調色、藍染色（`--indigo`）用於連結。禁止漸層紫藍、禁止彩色 badge 堆疊。
- **字型**：標題用明朝體（Shippori Mincho + Noto Serif TC），內文用 Noto Sans TC，時間與數字用 IBM Plex Mono。
- **排版**：左對齊為主、大量留白、以細線（`--rule`）分隔而非圓角卡片；章節標題旁用直書小標（目次／地図／時程）；目錄用大號數字 01、02 做節奏。
- **文字**：標題像文章標題（「抵達東京，先去明治神宮走一走」），不是「Day 1：東京」；每個節點有 `tips` 寫一句只有去過才知道的細節；避免「探索」「體驗」「打卡」「必訪」等空泛詞與 emoji。
- **圖片**：全幅封面（`hero` / `cover`）、3:2 比例、附圖說與出處；沒有圖片時用 `hero--plain` 色塊，不用假圖。
- 新增頁面或片段時沿用 `assets/css/main.css` 既有 token 與 class，不另開一套樣式。

### 工作流程
1. 先用 `norikae`、`weather`、`gurume` 等 MCP 查證當日所有時間、票價、營業時間，記錄來源與查詢日期。
2. 寫入 `_data/days/dayNN.yml` 與 `_days/dayNN-<城市>.md`。
3. 若有本機 Jekyll 環境，`bundle exec jekyll build` 確認無錯誤；再用 playwright MCP 開 `_site/` 截圖檢查手機（390px）與桌機（1280px）版面。
4. 修改時只回報變動的檔案與片段，不要重貼整份內容。
5. push 到 `main` 即自動部署；push 前先向我確認。

## 工作原則
- **資訊必須可查證**：營業時間、票價、班次、休館日等會變動的資訊，一律查最新來源並附上網址與查詢日期；查不到就明講，不可憑記憶填寫。
- **優先使用官方來源**：JR 各社、各地鐵公司、觀光局、景點官網、Google Maps；部落格與論壇只能當輔助。
- **匯率與價格要標日期**：不要給沒有日期的金額。
- 行程安排要考慮：移動時間（含轉乘與步行）、最後班次、休館日、季節性活動與人潮、天氣。
- 不替我做訂房、訂票、付款等任何對外送出的操作；只整理資訊與提供連結。
- 修改既有行程時只回報變動的部分，不要重貼整份行程。

## 網路查詢
- 查詢時優先使用 wigolo MCP（`cache` → `search` → `fetch`），依全域規則操作。
- 關鍵字用日文或英文效果較好，例如 `京都 清水寺 営業時間`、`JR East Pass Tohoku price`。
- 時效性資訊（票價、班次、公告）加 `force_refresh: true` 或 `time_range`。

## Git
- 行程文件直接 commit 到 main，commit message 格式：`<type>(<scope>): <subject>`，type 用 `docs` / `chore`，scope 用目錄名（如 `docs(itinerary): 新增 day03 大阪行程`）。
- 不要把含個資的檔案（護照影本、訂房確認信全文、信用卡資訊）放進 repo；這類資料只放連結或遮罩後的摘要。

## 專案專用 MCP（定義於 `.mcp.json`，僅限本專案，禁止寫入全域設定）
| MCP | 用途 | 啟動方式 | 需要金鑰 |
|-----|------|----------|----------|
| `norikae` | 日本電車乘換（Yahoo!乗換案内）：路線、IC 運賃、首末班車、新幹線/特急開關 | npx | 無 |
| `weather` | 天氣預報、警報、空氣品質、歷史天氣（含日本） | npx | 無 |
| `airbnb` | Airbnb 房源搜尋、價格、評價 | npx | 無 |
| `gurume` | 食べログ餐廳搜尋、關鍵字建議、地圖範圍查詢 | uvx（需 `--with "mcp<2"`，PyPI 版未鎖 mcp 1.x） | 無 |
| `japan-transit` | 日本交通路線（Transit API），`norikae` 的備援 | node（需先跑 `scripts/setup-mcp.sh`） | 無 |

- 本專案 MCP 全部免金鑰；日後若新增需金鑰的 MCP，金鑰一律由環境變數注入（`.env`，已 gitignore），`.mcp.json` 只寫 `${VAR}`。
- 查站到站交通先用 `norikae`（站名用日文），失敗再用 `japan-transit`；步行與巴士路段用 wigolo 查 Google Maps 網頁版或官方路線圖，無法查到就明講。
- 查餐廳用 `gurume`，營業時間與公休日再以店家官網或食べログ頁面確認。
- 查天氣用 `weather` 的 `get_forecast` / `get_weather_summary`。
- 全域已存在的 MCP（wigolo、firecrawl、playwright、Google Calendar 等）可照常使用。
