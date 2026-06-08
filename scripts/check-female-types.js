const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = { window: {}, console };
context.global = context;
vm.createContext(context);

function load(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) throw new Error(`Missing file: ${file}`);
  vm.runInContext(fs.readFileSync(fullPath, 'utf8'), context, { filename: file });
}

load('data/wiki.js');
load('data/female-types.js');

const types = context.window.FEMALE_TYPES;
const filters = context.window.FEMALE_TYPE_FILTERS;
const wiki = context.window.WIKI || {};

if (!Array.isArray(types) || !types.length) {
  throw new Error('window.FEMALE_TYPES should be a non-empty array');
}
if (!filters || typeof filters !== 'object') {
  throw new Error('window.FEMALE_TYPE_FILTERS should exist');
}

const requiredFields = [
  'id',
  'name',
  'icon',
  'subtitle',
  'tags',
  'difficulty',
  'pace',
  'riskLevel',
  'bestStage',
  'summary',
  'watchFirst',
  'core',
  'signals',
  'greenFlags',
  'yellowFlags',
  'redFlags',
  'misreads',
  'betterMoves',
  'doDont',
  'scripts',
  'boundaries',
  'fitFor',
  'notFitFor',
  'training',
  'reviewChecklist',
  'related',
  'observationWindow',
  'decisionRule',
  'antiPattern',
  'repair',
  'evidence'
];

const arrayFields = [
  'tags',
  'core',
  'signals',
  'greenFlags',
  'yellowFlags',
  'redFlags',
  'misreads',
  'betterMoves',
  'mistakes',
  'scripts',
  'boundaries',
  'confusedWith',
  'stageSignals',
  'scriptsByStage',
  'scenarios',
  'fitFor',
  'notFitFor',
  'training',
  'reviewChecklist',
  'related',
  'observationWindow',
  'antiPattern',
  'repair',
  'evidence'
];

const filterMap = {
  difficulties: 'difficulty',
  paces: 'pace',
  risks: 'riskLevel',
  stages: 'bestStage'
};

function assertText(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} should be non-empty text`);
}

function assertArray(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} should be an array`);
}

const ids = new Set();
const articleIds = new Set(Object.keys(wiki.titles || {}));

for (const type of types) {
  for (const field of requiredFields) {
    if (!(field in type)) throw new Error(`Female type ${type.id || '(missing id)'} is missing field: ${field}`);
  }

  assertText(type.id, 'type.id');
  assertText(type.name, `${type.id}.name`);
  assertText(type.icon, `${type.id}.icon`);
  assertText(type.subtitle, `${type.id}.subtitle`);
  assertText(type.difficulty, `${type.id}.difficulty`);
  assertText(type.pace, `${type.id}.pace`);
  assertText(type.riskLevel, `${type.id}.riskLevel`);
  assertText(type.bestStage, `${type.id}.bestStage`);
  assertText(type.summary, `${type.id}.summary`);
  assertText(type.watchFirst, `${type.id}.watchFirst`);
  assertText(type.decisionRule, `${type.id}.decisionRule`);

  if (ids.has(type.id)) throw new Error(`Duplicate female type id: ${type.id}`);
  ids.add(type.id);

  for (const field of arrayFields) assertArray(type[field], `${type.id}.${field}`);
  for (const field of ['tags', 'core', 'signals', 'greenFlags', 'yellowFlags', 'redFlags', 'observationWindow', 'antiPattern', 'repair', 'evidence']) {
    if (!type[field].length) throw new Error(`${type.id}.${field} should not be empty`);
  }

  if (!type.doDont || !Array.isArray(type.doDont.dont) || !Array.isArray(type.doDont.do)) {
    throw new Error(`${type.id}.doDont should include dont/do arrays`);
  }

  for (const related of type.related) {
    if (!related || typeof related !== 'object') throw new Error(`${type.id}.related item should be an object`);
    if (!related.id || !related.name) throw new Error(`${type.id}.related item should include id/name`);
    if (!articleIds.has(related.id)) throw new Error(`${type.id}.related points to unknown article: ${related.id}`);
  }
}

for (const [filterKey, field] of Object.entries(filterMap)) {
  const values = new Set(types.map(type => type[field]).filter(Boolean));
  const options = new Set(filters[filterKey] || []);
  for (const value of values) {
    if (!options.has(value)) throw new Error(`FEMALE_TYPE_FILTERS.${filterKey} missing option: ${value}`);
  }
}

const filterTags = new Set(filters.tags || []);
for (const type of types) {
  const covered = (type.tags || []).some(tag => filterTags.has(tag));
  if (!covered) throw new Error(`FEMALE_TYPE_FILTERS.tags does not cover ${type.id}: ${type.tags.join(', ')}`);
}

console.log(JSON.stringify({
  status: 'ok',
  femaleTypes: types.length,
  filters: Object.fromEntries(Object.keys(filterMap).map(key => [key, (filters[key] || []).length])),
  tagFilters: (filters.tags || []).length
}, null, 2));
