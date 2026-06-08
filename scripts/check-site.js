#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const rel = file => file.replace(/\\/g, '/');
const full = file => path.join(root, file);

const requiredFiles = [
  'index.html',
  'router.js',
  'app.js',
  'data/wiki.js',
  'data/content.js',
  'data/user-state.js',
  'components/topnav.js',
  'components/sidebar.js',
  'components/chrome.js',
  'views/home.js',
  'views/article.js',
  'views/search.js'
];

const requiredRoutes = [
  "path: '/'",
  "path: '/relationship'",
  "path: '/female-types'",
  "path: '/appearance'",
  "path: '/cases'",
  "path: '/emergency'",
  "path: '/wechat-training'",
  "path: '/principles'",
  "path: '/search'",
  "path: '/a/:id'"
];

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  throw new Error(message);
}

function assertFileExists(file) {
  if (!fs.existsSync(full(file))) {
    fail(`缺少文件：${file}`);
  }
}

function read(file) {
  return fs.readFileSync(full(file), 'utf8');
}

function cleanLocalSrc(src) {
  if (!src || /^(https?:)?\/\//i.test(src) || /^data:/i.test(src)) return null;
  return decodeURIComponent(src.split('#')[0].split('?')[0]).replace(/^\.\//, '');
}

function getIndexLocalScripts(indexHtml) {
  const scripts = [];
  const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = re.exec(indexHtml))) {
    const src = cleanLocalSrc(match[1]);
    if (src) scripts.push(src);
  }
  return scripts;
}

function runNodeCheck(files) {
  const failures = [];
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', full(file)], {
      cwd: root,
      encoding: 'utf8'
    });
    if (result.status !== 0) {
      failures.push({ file, output: `${result.stdout || ''}${result.stderr || ''}`.trim() });
    }
  }

  if (failures.length) {
    for (const item of failures) {
      console.error(`\n[node --check failed] ${item.file}\n${item.output}`);
    }
    fail(`${failures.length} 个 JS 文件语法检查失败`);
  }

  pass(`node --check 通过（${files.length} 个 JS 文件）`);
}

function checkStaticConsistency() {
  requiredFiles.forEach(assertFileExists);
  pass(`关键数据/组件/视图文件存在（${requiredFiles.length} 个）`);

  const indexHtml = read('index.html');
  const scripts = getIndexLocalScripts(indexHtml);
  if (!scripts.length) fail('index.html 未发现本地脚本');

  const missingScripts = scripts.filter(file => !fs.existsSync(full(file)));
  if (missingScripts.length) fail(`index.html 引用的脚本不存在：${missingScripts.join(', ')}`);
  pass(`index.html 本地脚本引用存在（${scripts.length} 个）`);

  for (const file of ['data/wiki.js', 'data/content.js', 'data/site-search.js', 'views/home.js', 'views/article.js', 'views/search.js', 'router.js', 'app.js']) {
    if (!scripts.includes(file)) fail(`index.html 未加载关键脚本：${file}`);
  }
  pass('index.html 关键脚本加载齐全');

  const routerJs = read('router.js');
  const missingRoutes = requiredRoutes.filter(route => !routerJs.includes(route));
  if (missingRoutes.length) fail(`router.js 缺少关键路由：${missingRoutes.join(', ')}`);
  pass(`router.js 关键路由存在（${requiredRoutes.length} 条）`);

  return scripts;
}

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8';
  if (file.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (file.endsWith('.css')) return 'text/css; charset=utf-8';
  return 'application/octet-stream';
}

function createStaticServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';

    const target = path.normalize(path.join(root, pathname));
    const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;
    if (target !== root && !target.startsWith(rootWithSep)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(target, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'content-type': contentType(target) });
      res.end(data);
    });
  });
}

function requestStatus(port, resource) {
  return new Promise((resolve, reject) => {
    const req = http.get({ hostname: '127.0.0.1', port, path: resource }, res => {
      res.resume();
      res.on('end', () => resolve(res.statusCode));
    });
    req.setTimeout(3000, () => {
      req.destroy(new Error(`请求超时：${resource}`));
    });
    req.on('error', reject);
  });
}

async function checkHttpResources() {
  const resources = [
    '/',
    '/index.html',
    '/router.js',
    '/app.js',
    '/data/site-search.js',
    '/views/home.js',
    '/views/article.js',
    '/views/search.js',
    '/css/wiki.css'
  ];

  const server = createStaticServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  const { port } = server.address();
  try {
    const bad = [];
    for (const resource of resources) {
      const status = await requestStatus(port, resource);
      if (status !== 200) bad.push(`${resource} -> ${status}`);
    }
    if (bad.length) fail(`本地 HTTP 核心资源检查失败：${bad.join(', ')}`);
    pass(`临时本地 HTTP 核心资源返回 200（${resources.length} 个，无需 Chrome）`);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

async function main() {
  console.log('开始检查静态站点...');
  const scripts = checkStaticConsistency();
  runNodeCheck([...new Set(scripts)]);
  await checkHttpResources();
  console.log('全部检查通过。');
}

main().catch(err => {
  console.error(`✗ ${err.message}`);
  process.exitCode = 1;
});
