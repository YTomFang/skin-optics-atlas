// No dependencies. Run from project root: node tests/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'assets/js/data.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: 'assets/js/data.js', timeout: 3000 });
const entries = sandbox.window.ATLAS_ENTRIES;
const categories = sandbox.window.ATLAS_CATEGORIES;
const errors = [];
let checks = 0;
function assert(condition, message) { checks++; if (!condition) errors.push(message); }
function nonempty(value) { return typeof value === 'string' && value.trim().length > 0; }
const mustExist = ['index.html','library.html','article.html','about.html','AGENTS.md','README.md','docs/NEW_ARTICLE_TEMPLATE.md','assets/css/style.css','assets/js/app.js','assets/js/data.js','assets/svg/favicon.svg','assets/svg/skin-layers.svg','.nojekyll'];
for (const file of mustExist) assert(existsSync(join(root, file)), `缺少必要檔案: ${file}`);
assert(Array.isArray(entries) && entries.length >= 1, '文章陣列必須至少含 1 篇');
assert(categories && Object.keys(categories).sort().join('|') === ['ai','layer','modality','workflow'].sort().join('|'), '分類定義必須含四種固定類別');
const seen = new Set();
for (const e of entries || []) {
  const slug = e?.slug || '(missing slug)';
  assert(typeof e.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug), `${slug}: slug 格式錯誤`);
  assert(!seen.has(e.slug), `${slug}: slug 重複`); seen.add(e.slug);
  assert(Object.hasOwn(categories, e.category), `${slug}: 無效分類`);
  for (const field of ['title','titleEn','summary','lead','highlight']) {
    assert(nonempty(e[field]), `${slug}: ${field} 不可空白`);
    assert(!/<\/?[a-z][^>]*>/i.test(String(e[field] || '')), `${slug}: ${field} 不可包含 HTML 標籤`);
  }
  assert(Number.isInteger(e.readMins) && e.readMins > 0, `${slug}: readMins 必須是正整數`);
  assert(Array.isArray(e.keywords) && e.keywords.length >= 2 && e.keywords.every(nonempty), `${slug}: keywords 至少兩項`);
  assert(Array.isArray(e.sections) && e.sections.length >= 2, `${slug}: 至少兩個段落`);
  const sectionHeadings = new Set();
  for (const sec of e.sections || []) {
    assert(nonempty(sec.heading), `${slug}: 段落標題不可空白`);
    assert(!sectionHeadings.has(sec.heading), `${slug}: 段落標題不可重複`); sectionHeadings.add(sec.heading);
    assert(Array.isArray(sec.paragraphs) && sec.paragraphs.length > 0 && sec.paragraphs.every(nonempty), `${slug}: paragraphs 至少一段`);
    assert(Array.isArray(sec.bullets) && sec.bullets.every(nonempty), `${slug}: bullets 必須是字串陣列`);
  }
  assert(Array.isArray(e.references) && e.references.length > 0, `${slug}: 至少一筆來源`);
  for (const r of e.references || []) {
    assert(nonempty(r.label) && typeof r.url === 'string' && /^https:\/\//.test(r.url), `${slug}: 來源需標題及 HTTPS URL`);
  }
  assert(Array.isArray(e.related) && e.related.length > 0, `${slug}: 至少一個延伸閱讀`);
}
for (const e of entries || []) for (const related of e.related || []) {
  assert(seen.has(related), `${e.slug}: 延伸閱讀 slug 不存在: ${related}`);
  assert(related !== e.slug, `${e.slug}: 不可把自己設為延伸閱讀`);
}
for (const file of ['index.html','library.html','article.html','about.html']) {
  const html = readFileSync(join(root, file), 'utf8');
  assert(/<html lang="zh-Hant">/.test(html), `${file}: 缺少繁體中文語系`);
  assert(/<main id="main"/.test(html), `${file}: 缺少 main landmark`);
  assert(/<nav aria-label="主選單"/.test(html), `${file}: 缺少導覽`);
  // Check HTML href/src paths that are local and static (not data-driven content).
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|tel:|#|data:)/.test(value)) continue;
    const pathname = decodeURIComponent(value.split(/[?#]/)[0]);
    if (!pathname) continue;
    assert(!pathname.startsWith('/'), `${file}: 站內連結不可使用絕對根路徑: ${value}`);
    assert(existsSync(join(root, pathname)), `${file}: 站內資源不存在: ${value}`);
  }
}
if (errors.length) {
  console.error(`❌ 驗收失敗：${errors.length} 個問題 / ${checks} 項檢查`);
  errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
  process.exitCode = 1;
} else {
  console.log(`✅ 驗收通過：${checks} 項檢查、${entries.length} 篇文章、${Object.keys(categories).length} 種分類、4 個頁面`);
}
