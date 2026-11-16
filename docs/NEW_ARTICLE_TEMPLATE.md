# 新增文章範本

此檔搭配根目錄 `AGENTS.md` 使用。新增文章時，複製下方**單個物件**到 `assets/js/data.js` 內的 `window.ATLAS_ENTRIES` 陣列，記得在前一項後加逗號；不要複製 `const`、`export` 或 HTML 標籤。

```js
{
  slug: "example-topic", // 唯一的小寫英文 slug
  category: "modality", // layer | modality | ai | workflow
  title: "新文章中文標題",
  titleEn: "English Full Name · ABC",
  summary: "用一兩句話清楚說明這篇文章要介紹的主題與用途。",
  lead: "簡短的文章導讀，說明技術核心與閱讀目的。",
  readMins: 3,
  keywords: ["關鍵字", "keyword", "ABC"],
  highlight: "最值得記住的一句話，也可寫成重要提醒。",
  sections: [
    {
      heading: "基本原理",
      paragraphs: ["第一段有事實依據的完整說明。"],
      bullets: ["觀念 A。", "觀念 B。"]
    },
    {
      heading: "研究應用與限制",
      paragraphs: ["第二段，說明適用情況與限制。"],
      bullets: []
    }
  ],
  references: [
    { label: "可信來源或論文標題", url: "https://example.org/real-source" }
  ],
  related: ["rcm", "shg"]
}
```

## 新增後驗證

```bash
node tests/check.mjs
python -m http.server 8000
```

在瀏覽器開啟 `http://localhost:8000/library.html`，用文章的中文或英文關鍵字搜尋，確認能開啟 `http://localhost:8000/article.html?slug=example-topic`，並在手機寬度下檢查版面。

## 不要做的事

- 不要直接貼入人體影像或未公開受試者資料。
- 不要把網址寫成 `/article.html`，這會讓 GitHub Pages 子路徑出錯。
- 不要把醫學推測寫成確認診斷。
- 不要編造來源；上方範例的 `example.org` 必須換成實際存在的正式來源。
