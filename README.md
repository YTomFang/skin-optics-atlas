# Skin Optics Atlas — 生醫光學影像知識庫

一個可持續擴充的生醫光學主題介紹網站，包含皮膚分層、反射式共軛焦顯微術（RCM）、二倍頻（SHG）、三倍頻（THG）、AI 影像分析與 Z-stack 工作流。

**專案核心不是只有網頁成果，而是一套 AI 可遵循的維護規則：[`AGENTS.md`](AGENTS.md)。** AI 新增文章時先讀規則，再依固定欄位將內容寫入 `assets/js/data.js`，網站便會自動產生可分享的文章網址並更新列表與搜尋。

## 網站功能

- 首頁：網站導讀、三個領域入口、皮膚分層自製 SVG 示意圖、精選文章。
- 知識文章：依皮膚分層／光學模態／AI／工作流程分類，支援中英文關鍵字搜尋。
- 文章頁：同一份 HTML 模板呈現不同內容，包含摘要、段落目錄、參考資料與延伸閱讀。
- 主題切換：深色／淺色模式，選擇保存在本機瀏覽器。
- 響應式：支援手機、平板與桌面；適用 GitHub Pages，沒有需安裝的套件。

## 本機預覽

因為本專案沒有外部 API 或編譯依賴，**直接雙擊根目錄 `index.html` 就能預覽**。

也可用 Python 啟動簡易 HTTP 伺服器：

```bash
cd skin-optics-atlas
python -m http.server 8000
```

然後開啟 <http://localhost:8000>。

## 資料夾與維護

```text
index.html             首頁
library.html           搜尋與分類列表
article.html           文章模板
about.html             專案介紹
AGENTS.md              AI 專案手冊（先讀）
assets/js/data.js      文章資料（新增文章主要編輯處）
assets/js/app.js       互動、搜尋與渲染
assets/css/style.css   全站共用設計系統
assets/svg/            自製圖解
tests/check.mjs        自動驗收測試
```

**如何新增一篇文章：**閱讀 [`AGENTS.md`](AGENTS.md) 和 [`docs/NEW_ARTICLE_TEMPLATE.md`](docs/NEW_ARTICLE_TEMPLATE.md)，在 `ATLAS_ENTRIES` 陣列新增符合欄位格式的文章，為它指定不重複的 `slug`、分類與可信來源，接著執行測試。詳細文章頁網址如下：

```text
article.html?slug=rcm
article.html?slug=skin-sb
article.html?slug=ai-reconstruction
```

## 本機驗收

使用 Node.js 18+（測試腳本只用內建模組，不需要 npm install）：

```bash
node tests/check.mjs
```

測試會檢查文章欄位、唯一 slug、分類、參考資料 URL、延伸閱讀連結、必要檔案和 HTML 靜態資源。部署前也應用瀏覽器手動測試頁面與手機排版。

## 發布到 GitHub Pages

1. 登入 GitHub，新建 **Public** repository，建議名稱為 `skin-optics-atlas`。
2. 將此專案**資料夾裡面的所有檔案**上傳到 repository 的根目錄，確保 `index.html` 位於最上層，不要多包一層資料夾。
3. 打開 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Source: Deploy from a branch**，**Branch: main**，資料夾選 **/(root)**，然後儲存。
5. 等待 GitHub Pages 部署成功後，網站網址一般會是 `https://<你的帳號>.github.io/skin-optics-atlas/`。
6. 開啟網站，確認首頁、列表、文章與關於頁正常。最後將 repository 及**實際可打開的網站網址**貼入繳交頁。

官方說明：<https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>

### 使用 Git 指令上傳（可選）

```bash
git init
git add .
git commit -m "Initial Skin Optics Atlas website and AI development rules"
git branch -M main
git remote add origin https://github.com/<你的帳號>/skin-optics-atlas.git
git push -u origin main
```

執行上列命令前需先在 GitHub 網站建立空白 repository，並確認本機已安裝 Git、完成身分驗證；請將 `<你的帳號>` 換成你的實際 GitHub ID。

## 參考與聲明

站內科學內容參考 NCBI Bookshelf、PMC 開放論文與成像技術回顧，全文於各文章底部保留來源。所有 SVG 為本專案原創概念示意。本站供學習用途，**不構成醫療診斷建議**，不包含真實人體顯微影像或受試者資料。

本專案為課程作業的獨立作品，參考教師提供的規則設計概念，但不複製教師範例網站或素材。
