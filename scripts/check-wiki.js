const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'router.js',
  'app.js',
  'data/wiki.js',
  'data/content.js',
  'data/female-types.js',
  'data/female-types-article.js',
  'data/extra-columns.js',
  'data/rich-columns-23-27.js',
  'views/home.js',
  'views/article.js',
  'views/female-types.js',
  'css/female-types.css'
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const context = {
  window: {},
  console
};
context.global = context;
vm.createContext(context);

for (const file of [
  'data/wiki.js',
  'data/female-types.js',
  'data/content.js',
  'data/wechat-training-upgrade.js',
  'data/female-types-article.js',
  'data/extra-columns.js',
  'data/rich-columns-23-27.js'
]) {
  const code = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(code, context, { filename: file });
}

const wiki = context.window.WIKI;
const articlesApi = context.window.ARTICLES;
const femaleTypes = context.window.FEMALE_TYPES;

if (!wiki || !articlesApi || !articlesApi.articles) {
  throw new Error('window.WIKI or window.ARTICLES did not initialize correctly');
}

const articles = articlesApi.articles;
const articleIds = Object.keys(articles);
const sidebarArticleIds = wiki.sidebar
  .flatMap(group => group.items || [])
  .filter(item => item.type === 'article' || item.articleId)
  .map(item => item.articleId || item.id);

const orderWithoutArticle = wiki.articleOrder.filter(id => !articles[id]);
const sidebarWithoutArticle = sidebarArticleIds.filter(id => !articles[id]);
const cardsWithoutArticle = wiki.homeCategories
  .flatMap(item => item.to ? (item.articleId ? [item.articleId] : []) : [item.id])
  .filter(id => !articles[id]);
const articlesWithoutTitle = articleIds.filter(id => !wiki.titles[id]);
const titlesWithoutArticle = Object.keys(wiki.titles).filter(id => !articles[id]);
const duplicateOrderIds = wiki.articleOrder.filter((id, index) => wiki.articleOrder.indexOf(id) !== index);

for (const id of articleIds) {
  const article = articles[id];
  if (!article.title || typeof article.title !== 'string') {
    throw new Error(`Article ${id} is missing title`);
  }
  if (!article.html || typeof article.html !== 'string') {
    throw new Error(`Article ${id} is missing html`);
  }
}

if (!Array.isArray(femaleTypes) || femaleTypes.length < 18) {
  throw new Error(`FEMALE_TYPES should contain at least 18 types, got ${Array.isArray(femaleTypes) ? femaleTypes.length : 'not an array'}`);
}

const typeIds = new Set();
const requiredTypeFields = [
  'id',
  'name',
  'subtitle',
  'tags',
  'difficulty',
  'pace',
  'riskLevel',
  'bestStage',
  'summary',
  'greenFlags',
  'yellowFlags',
  'redFlags',
  'stageSignals',
  'doDont',
  'scriptsByStage',
  'scenarios',
  'boundaries',
  'fit',
  'exit',
  'related'
];

for (const type of femaleTypes) {
  for (const field of requiredTypeFields) {
    if (!(field in type)) throw new Error(`Female type ${type.id || '(missing id)'} is missing field: ${field}`);
  }
  if (typeIds.has(type.id)) throw new Error(`Duplicate female type id: ${type.id}`);
  typeIds.add(type.id);

  for (const field of ['tags', 'greenFlags', 'yellowFlags', 'redFlags', 'stageSignals', 'scriptsByStage', 'scenarios', 'boundaries', 'related']) {
    if (!Array.isArray(type[field])) throw new Error(`Female type ${type.id}.${field} should be an array`);
  }
  if (!type.doDont || !Array.isArray(type.doDont.dont) || !Array.isArray(type.doDont.do)) {
    throw new Error(`Female type ${type.id}.doDont should include dont/do arrays`);
  }
}

if (!articles.ch21 || articles.ch21.title !== '女性沟通倾向 Atlas' || !/Female Communication Atlas/.test(articles.ch21.html || '')) {
  throw new Error('ch21 female-types article override did not apply');
}

const failures = {
  orderWithoutArticle,
  sidebarWithoutArticle,
  cardsWithoutArticle,
  articlesWithoutTitle,
  titlesWithoutArticle,
  duplicateOrderIds
};

const hasFailure = Object.values(failures).some(list => list.length > 0);
if (hasFailure) {
  console.error(JSON.stringify(failures, null, 2));
  throw new Error('Static wiki validation failed');
}

const lastArticleId = wiki.articleOrder[wiki.articleOrder.length - 1];

console.log(JSON.stringify({
  status: 'ok',
  articles: articleIds.length,
  orderedArticles: wiki.articleOrder.length,
  lastArticleId,
  lastArticleTitle: articles[lastArticleId].title,
  femaleTypes: femaleTypes.length,
  ch21Title: articles.ch21.title
}, null, 2));
