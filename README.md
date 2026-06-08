# 直男蜕变指南

基于 Vue 3（CDN、零构建）+ Vue Router 的现代知识库 / 长文阅读站。  
所有正文内容从原 `pages/*.html` 抽取，尽量保持原有结构、文案、案例对话完整；站点壳层、导航、首页和文章阅读体验已重构为暖白、墨绿、琥珀配色的知识产品风格。

## 目录结构

```
wiki/
├── index.html              入口文件
├── app.js                  Vue 应用初始化、动态标题、最近访问记录
├── router.js               Hash 路由配置
├── scripts/
│   ├── check-site.js       自动检查脚本（脚本引用、路由、语法、HTTP 资源）
│   └── extract-content.ps1  从 pages/*.html 重新生成 data/content.js
├── data/
│   ├── wiki.js             站点导航、专栏规划、阅读顺序、标题映射
│   ├── user-state.js       localStorage 最近阅读、收藏、阅读进度
│   ├── site-search.js      轻量全站搜索索引（工具页 + 正文摘要 + 结构化模块）
│   ├── relationship-scenarios.js  关系推进急救包结构化场景数据
│   ├── female-types.js     女性类型图鉴结构化数据
│   ├── appearance-upgrade.js 外在蜕变形象方案结构化数据
│   ├── case-library.js     真实案例库独立页索引
│   ├── emergency-toolkit.js 场景应急手册独立页索引
│   ├── site-principles.js  全站价值观与边界声明
│   └── content.js          所有文章正文（自动生成）
├── components/
│   ├── topnav.js           顶栏（品牌 + route 导航 + 全站搜索面板）
│   ├── sidebar.js          左侧学习路径目录
│   ├── mobile-quicknav.js  移动端底部快捷导航
│   └── chrome.js           阅读进度条 + 返回顶部
├── views/
│   ├── home.js             首页学习路径仪表盘
│   ├── article.js          文章阅读页（收藏、阅读进度、目录、读后推荐）
│   ├── relationship.js     关系推进急救包独立工具页
│   ├── female-types.js     女性类型图鉴独立工具页
│   ├── appearance.js       外在蜕变形象方案独立工具页
│   ├── cases.js            真实案例库独立工具页
│   ├── emergency.js        场景应急手册独立工具页
│   ├── principles.js       价值观与边界声明页
│   └── search.js           独立站内搜索页（多关键词、高亮、来源展示）
└── css/
    ├── wiki.css            现代知识库主题（暖白/墨绿/琥珀）
    ├── components.css      原内容组件样式（给 v-html 用）
    └── ch*.css             原章节样式
```

## 本地预览

### 方式 1：双击 index.html

直接双击 `wiki/index.html` 可以打开。Vue 和 Vue Router 走 CDN，不需要本地 Node 环境。

### 方式 2：本地 http 服务器（推荐）

```powershell
cd "C:\Users\douha\Music\woman - 副本\wiki"
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');let p=decodeURIComponent(url.pathname);if(p==='/'||p==='')p='/index.html';const file=path.join(root,p);if(!file.startsWith(root)){res.writeHead(403);return res.end('Forbidden')}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200);res.end(data)})}).listen(8080,()=>console.log('http://localhost:8080'))"
# 然后访问 http://localhost:8080
```

如果本机 Python http 服务可用，也可以使用：

```powershell
python -m http.server 8080
```

应用使用 Hash 模式，常用地址：

- 首页仪表盘：`http://localhost:8080/#/`
- 文章：`http://localhost:8080/#/a/ch1`
- 外在蜕变形象方案：`http://localhost:8080/#/appearance`
- 外在蜕变原章节：`http://localhost:8080/#/a/ch2`
- 关系推进急救包：`http://localhost:8080/#/relationship`
- 女性类型图鉴：`http://localhost:8080/#/female-types`
- 女性类型图鉴原章节：`http://localhost:8080/#/a/ch21`
- 真实案例库工具页：`http://localhost:8080/#/cases`
- 真实案例库原章节：`http://localhost:8080/#/a/ch8`
- 场景应急手册工具页：`http://localhost:8080/#/emergency`
- 场景应急手册原章节：`http://localhost:8080/#/a/ch9-1`
- 站内搜索页：`http://localhost:8080/#/search?q=边界`
- 价值观与边界声明：`http://localhost:8080/#/principles`

## 站点内容规划

当前站点按“学习路径 + 工具查询”组织：

- 首页学习路径仪表盘（继续阅读、收藏、问题入口、7 天路线）
- 第一阶段 · 自我建设（含外在蜕变形象方案独立工具页）
- 第二阶段 · 沟通吸引
- 第三阶段 · 约会关系（含关系推进急救包独立工具页）
- 真实案例库（独立工具页 + 200 个原案例正文）
- 场景应急手册（独立工具页 + 300 条原场景正文）
- 表达工具箱（含女性类型图鉴独立工具页）
- 价值观与边界声明（尊重同意、反操控、反羞辱、体面退出）

顶部导航保留高频 route 入口；左侧目录负责完整章节与分组导航；移动端底部快捷导航提供首页、案例、急救、边界四个入口。

## 搜索、收藏和进度

- 顶栏搜索由 `data/site-search.js` 运行时构建索引，支持多关键词组合匹配、结果评分排序、关键词高亮和来源展示，覆盖：
  - 独立工具页
  - `data/content.js` 里的文章标题与正文摘要
  - 关系推进、女性类型、外在蜕变、案例库、应急手册等结构化数据
- 顶栏搜索支持键盘上下选择、Enter 跳转；独立搜索页地址为 `/#/search?q=关键词`。
- 用户状态由 `data/user-state.js` 写入浏览器 `localStorage`，key 为 `wikiUserState.v1`。
- 保存内容包括：
  - 最近阅读 `recent`
  - 收藏 `favorites`
  - 文章阅读进度 `progress`
  - 已完成标记 `completed`
- 这些数据只保存在当前浏览器本地，不会上传，也不会影响部署文件。

## 添加/修改文章

**A. 修改现有文章**

理想维护方式是编辑外层 `pages/chN.html`，然后重新抽取：

```powershell
cd "C:\Users\douha\Music\woman - 副本"
powershell -ExecutionPolicy Bypass -File "wiki\scripts\extract-content.ps1"
```

**B. 新增一篇文章**

1. 在 `pages/` 创建新文件，例如 `pages/ch39.html`
2. 运行抽取脚本
3. 在 `data/wiki.js` 中更新：
   - `sidebar`：加入侧栏入口
   - `articleOrder`：加入阅读顺序
   - `titles`：加入标题映射
   - `sectionMap` / `homeCategories`：按需加入栏目和首页入口

**C. 当前内容源说明**

`data/content.js` 是正文数据文件，正文通过 `v-html` 渲染。该文件体积较大且由脚本重新生成，除非只是临时修补，否则不建议直接手改正文。

关系推进急救包、女性类型图鉴、外在蜕变形象方案、真实案例库、场景应急手册和价值观声明都属于独立工具页，分别由以下结构化数据维护：

- `data/relationship-scenarios.js`
- `data/female-types.js`
- `data/appearance-upgrade.js`
- `data/case-library.js`
- `data/emergency-toolkit.js`
- `data/site-principles.js`

案例库和应急手册独立页只提供筛选、摘要和跳转索引，不复制 `data/content.js` 的自动生成正文。

## 维护检查

修改站点文件后建议执行自动检查脚本：

```powershell
cd "C:\Users\douha\Music\woman - 副本\wiki"
node scripts/check-site.js
```

该脚本会自动执行主要 JS 文件的 `node --check`，检查 `index.html` 本地脚本引用是否存在、`router.js` 关键路由是否齐全、关键数据/组件/视图文件是否存在，并启动临时本地 HTTP server 验证核心资源返回 200（无需 Chrome）。

新增工具页时，同时检查：

1. `index.html` 是否按依赖顺序加载数据、组件和视图。
2. `router.js` 是否有 route。
3. `data/wiki.js` 的顶栏、侧栏、首页入口是否一致。
4. `data/site-search.js` 是否纳入搜索索引。
5. `README.md` 是否补充路由和维护说明。

## SEO / 分享信息

站点已在 `index.html` 中加入基础 description、theme-color、Open Graph、Twitter card 和 SVG favicon。  
`app.js` 会在路由切换后动态更新 `document.title`。

由于当前是 Hash 路由，传统搜索引擎对每个 `/#/...` 子页面的索引能力有限；如果未来需要强 SEO，可迁移到 Astro、VitePress 或其他静态生成方案。

## 部署到 GitHub Pages

1. 创建公开仓库，例如 `zhinan-wiki`
2. 推送 `wiki/` 目录内容
3. GitHub 仓库 → Settings → Pages → Source 选 `main` 分支 / `/` 根目录
4. 访问 `https://你的用户名.github.io/zhinan-wiki/`

应用使用 **Hash 路由**（URL 形如 `/#/a/ch1`），GitHub Pages 不需要额外重写配置。

## 后续可演进

| 想做的事 | 怎么做 |
|---|---|
| 加新分类/新文章 | 按上面新增文章流程操作 |
| 内容从 Markdown 写 | 改用 Astro / VitePress（需要构建步骤） |
| 搜索模糊匹配 | 当前已支持多关键词、高亮和评分排序；如需拼音/错别字容错，可接入 Fuse.js / MiniSearch |
| 用户状态跨设备同步 | 接入后端或 Supabase / Firebase 等远程存储 |
| 加评论/反馈 | 接入 Giscus（基于 GitHub Discussions） |
| 加访问统计 | 接入 Google Analytics / Plausible |

## 已知取舍

- **没有构建步骤**：不能用 `.vue` 单文件组件，不能 tree-shake，但部署最简单。
- **正文仍由 `v-html` 渲染**：保留原文章结构和案例对话，样式通过 `wiki.css` 统一浅色化覆盖。
- **搜索是轻量运行时索引**：无需构建，适合当前体量；超大内容量时可换专业搜索库。
- **Hash 路由 SEO 有限制**：部署省心，但单页深度索引不如静态生成。
