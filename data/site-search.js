/* 全站搜索索引：运行时整合工具页、结构化数据和正文摘要。 */
(function() {
  function strip(html) {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
  }
  function escapeHtml(text) {
    return String(text || '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  }
  function escapeRegExp(text) {
    return String(text || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function tokenize(query) {
    return Array.from(new Set(String(query || '').toLowerCase().trim().split(/[\s,，、]+/).filter(Boolean)));
  }
  function push(list, item) {
    list.push(Object.assign({ keywords: '', excerpt: '', section: '', content: '' }, item));
  }
  function haystack(item) {
    return [item.title, item.type, item.section, item.keywords, item.excerpt, item.content].join(' ').toLowerCase();
  }
  function hit(item, tokens) {
    const hay = haystack(item);
    return tokens.every(token => hay.includes(token));
  }
  function countHits(text, token) {
    if (!token) return 0;
    return (String(text || '').toLowerCase().match(new RegExp(escapeRegExp(token), 'g')) || []).length;
  }
  function score(item, tokens) {
    const title = (item.title || '').toLowerCase();
    const type = (item.type || '').toLowerCase();
    const section = (item.section || '').toLowerCase();
    const keywords = (item.keywords || '').toLowerCase();
    return tokens.reduce((sum, token) => {
      if (title === token) return sum + 120;
      return sum
        + (title.includes(token) ? 80 : 0)
        + (keywords.includes(token) ? 45 : 0)
        + (section.includes(token) ? 35 : 0)
        + (type.includes(token) ? 25 : 0)
        + Math.min(countHits(item.excerpt + ' ' + item.content, token) * 8, 40);
    }, 0) + (item.type === '工具页' ? 4 : 0);
  }
  function snippet(item, tokens) {
    const text = (item.excerpt || item.content || '').replace(/\s+/g, ' ').trim();
    if (!text) return '';
    const lower = text.toLowerCase();
    const pos = tokens.reduce((best, token) => {
      const i = lower.indexOf(token);
      return i >= 0 ? Math.min(best, i) : best;
    }, Number.MAX_SAFE_INTEGER);
    if (pos === Number.MAX_SAFE_INTEGER || text.length <= 150) return text.slice(0, 170);
    const start = Math.max(0, pos - 55);
    const end = Math.min(text.length, pos + 115);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }
  function highlight(text, tokens) {
    let html = escapeHtml(text);
    tokens.forEach(token => {
      html = html.replace(new RegExp('(' + escapeRegExp(escapeHtml(token)) + ')', 'ig'), '<mark>$1</mark>');
    });
    return html;
  }
  function decorate(item, tokens) {
    const copy = Object.assign({}, item);
    const excerpt = snippet(item, tokens);
    copy.excerpt = excerpt;
    copy.source = [copy.type, copy.section].filter(Boolean).join(' · ');
    copy.titleHtml = highlight(copy.title, tokens);
    copy.excerptHtml = highlight(excerpt, tokens);
    copy.sourceHtml = highlight(copy.source, tokens);
    copy.tokens = tokens;
    return copy;
  }
  function articleTitle(id) {
    return (window.ARTICLES && window.ARTICLES.articles[id] && window.ARTICLES.articles[id].title) || (window.WIKI && window.WIKI.titles[id]) || id;
  }
  function sectionName(id, fallback) {
    return (window.WIKI && window.WIKI.getSectionName && id) ? window.WIKI.getSectionName(id) : (fallback || '成长知识库');
  }
  function flatText(value) {
    if (!value) return '';
    if (Array.isArray(value)) return value.map(flatText).join(' ');
    if (typeof value === 'object') {
      if ('name' in value && 'id' in value) return [value.name, value.id].filter(Boolean).join(' ');
      return Object.values(value).map(flatText).join(' ');
    }
    return String(value);
  }

  window.SiteSearch = {
    buildIndex() {
      const list = [];
      push(list, { id: 'home', title: '首页学习路径仪表盘', type: '工具页', section: '开始这里', path: '/', keywords: '学习路径 继续阅读 收藏 7天路线', excerpt: '从首页进入成长路径、最近阅读、收藏、案例库和应急手册。' });
      [
        ['appearance', '外在蜕变形象方案', '/appearance', '自我建设', '发型 穿搭 体态 护肤 卫生 低预算'],
        ['relationship', '关系推进急救包', '/relationship', '约会关系', '暧昧 约会 推进 边界 修复'],
        ['female-types', '女性类型图鉴', '/female-types', '表达工具箱', '慢热 理性 外放 类型 识别'],
        ['cases', '真实案例库', '/cases', '真实案例库', '200案例 复盘 日常 工作 线上 约会'],
        ['emergency', '场景应急手册', '/emergency', '场景应急手册', '300场景 不回消息 邀约 修复 上头'],
        ['principles', '价值观与边界声明', '/principles', '长期关系与现实课题', '同意 尊重 反操控 边界 体面退出'],
        ['positive-psychology', '幸福的科学', '/positive-psychology', '心理成长', '幸福 优势 关系 意义 韧性 耶鲁 积极心理学 感恩 正念 幸福的科学 well-being'],
        ['married-woman', '搞定人妻专栏', '/married-woman', '特殊关系', '人妻 已婚 边界 风险 信号 私密 退出 道德'],
        ['universal-scripts', '万能话术', '/universal-scripts', '话术工具', '话术 开场 破冰 升温 修复 退出 社交 聊天 回应 模板']
      ].forEach(r => push(list, { id: r[0], title: r[1], type: '工具页', path: r[2], section: r[3], keywords: r[4], excerpt: r[1] }));

      if (window.WIKI && window.WIKI.articleOrder && window.ARTICLES) {
        window.WIKI.articleOrder.forEach(id => {
          const article = window.ARTICLES.articles[id];
          if (!article) return;
          const text = strip(article.html);
          push(list, { id, title: article.title || articleTitle(id), type: '文章', section: sectionName(id), path: '/a/' + id, articleId: id, keywords: sectionName(id), excerpt: text.slice(0, 180), content: text });
        });
      }
      (window.APPEARANCE_MODULES || []).forEach(m => push(list, { id: 'appearance-' + m.id, title: m.title, type: '外在模块', section: '外在蜕变', path: '/appearance', keywords: [m.stage, m.budget, m.scene, m.subtitle].join(' '), excerpt: [m.summary].concat(m.actionList || []).join(' ') }));
      (window.RELATIONSHIP_SCENARIOS || []).forEach(s => push(list, { id: 'rel-' + s.id, title: s.title, type: '关系场景', section: '关系推进急救包', path: '/relationship', keywords: [s.stage, s.urgency].join(' '), excerpt: [s.pain].concat(s.scripts || []).join(' ') }));
      (window.MARRIED_WOMAN_SCENARIOS || []).forEach(s => push(list, { id: 'mw-' + s.id, title: s.title, type: '人妻场景', section: '搞定人妻专栏', path: '/married-woman', keywords: [s.stage, s.urgency].join(' '), excerpt: [s.pain].concat(s.scripts || []).join(' ') }));
      (window.FEMALE_TYPES || []).forEach(t => {
        const keywordFields = [
          t.name,
          t.subtitle,
          t.difficulty,
          t.pace,
          t.riskLevel,
          t.bestStage,
          t.tags,
          t.confusedWith,
          t.doDont,
          t.observationWindow,
          t.decisionRule,
          t.antiPattern,
          t.repair,
          t.evidence
        ];
        const contentFields = [
          t.subtitle,
          t.summary,
          t.watchFirst,
          t.core,
          t.signals,
          t.greenFlags,
          t.yellowFlags,
          t.redFlags,
          t.stageSignals,
          t.misreads,
          t.betterMoves,
          t.mistakes,
          t.doDont,
          t.scripts,
          t.scriptsByStage,
          t.scenarios,
          t.boundaries,
          t.fitFor,
          t.notFitFor,
          t.training,
          t.reviewChecklist,
          t.observationWindow,
          t.decisionRule,
          t.antiPattern,
          t.repair,
          t.evidence
        ];
        push(list, {
          id: 'type-' + t.id,
          title: t.name,
          type: '女性类型',
          section: '女性沟通倾向 Atlas',
          path: '/female-types?type=' + encodeURIComponent(t.id),
          keywords: flatText(keywordFields),
          excerpt: flatText([t.subtitle, t.summary, t.watchFirst, t.decisionRule, t.observationWindow]).slice(0, 260),
          content: flatText(contentFields)
        });
      });
      ((window.CASE_LIBRARY && window.CASE_LIBRARY.groups) || []).forEach(c => push(list, { id: 'case-' + c.id, title: c.title, type: '案例分组', section: c.category || '真实案例库', path: '/cases', articleId: c.articleId, keywords: [c.category, c.range].concat(c.focus || []).join(' '), excerpt: c.summary }));
      ((window.EMERGENCY_TOOLKIT && window.EMERGENCY_TOOLKIT.quickCards) || []).forEach(e => push(list, { id: 'emergency-' + e.id, title: e.title, type: '应急卡片', section: e.category || '场景应急手册', path: '/emergency', articleId: e.articleId, keywords: [e.category, e.level].join(' '), excerpt: [e.script].concat(e.do || []).join(' ') }));
      if (window.POSITIVE_PSYCHOLOGY) {
        const pp = window.POSITIVE_PSYCHOLOGY;
        push(list, { id: 'positive-psychology', title: pp.title, type: '工具页', section: '心理成长', path: '/positive-psychology', keywords: '耶鲁 幸福的科学 积极心理学 幸福 优势 关系 意义 韧性 感恩 正念 well-being', excerpt: pp.lead });
        (pp.dimensions || []).forEach(d => push(list, { id: 'pp-dim-' + d.id, title: d.name, type: '心理维度', section: '幸福的科学', path: '/positive-psychology', keywords: [d.name, d.desc].concat(d.topics.map(t => t.title)).join(' '), excerpt: d.desc }));
        (pp.dailyTools || []).forEach(t => push(list, { id: 'pp-tool-' + t.name, title: t.name, type: '心理工具', section: '幸福的科学', path: '/positive-psychology', keywords: [t.name, t.source].join(' '), excerpt: t.desc + ' ' + t.effect }));
      }
      return list;
    },
    tokenize,
    highlight,
    search(query, limit) {
      const tokens = tokenize(query);
      if (!tokens.length) return [];
      const max = limit || 8;
      return this.buildIndex().filter(item => hit(item, tokens)).sort((a, b) => score(b, tokens) - score(a, tokens)).slice(0, max).map(item => decorate(item, tokens));
    }
  };
})();
