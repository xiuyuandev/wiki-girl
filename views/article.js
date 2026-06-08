/* 文章视图 */
window.ArticleView = {
  template: `
    <div v-if="article" class="wiki-article-shell">
      <article class="wiki-article">
        <div class="wiki-article__crumbs"><router-link to="/">首页</router-link><span class="sep">/</span><span>{{ sectionName }}</span></div>
        <header class="wiki-article__head">
          <div class="wiki-article__kicker"><span v-if="article.chapterNum">CHAPTER {{ article.chapterNum }}</span><span>{{ sectionName }}</span></div>
          <h1 class="wiki-article__title">{{ article.title }}</h1>
          <p v-if="article.lead" class="wiki-article__lead">{{ article.lead }}</p>
          <div class="wiki-article__meta"><span>{{ readingMinutes }} 分钟阅读</span><span>{{ toc.length ? toc.length + ' 个小节' : '长文精读' }}</span><span v-if="progress">已读 {{ progress.pct }}%</span></div>
          <div class="wiki-article-actions"><button class="wiki-btn" @click="toggleFav">{{ favorite ? '已收藏' : '收藏本文' }}</button><button class="wiki-btn wiki-btn--ghost" @click="markDone">标记已读</button></div>
        </header>
        <nav v-if="toc.length" class="wiki-article__toc" aria-label="本文目录"><strong>本文目录</strong><a v-for="item in toc" :key="item.id" :href="'#' + item.id" :class="'level-' + item.level">{{ item.text }}</a></nav>
        <div class="wiki-article__body" ref="body" v-html="article.html"></div>

        <section v-if="hasRecommendations" class="wiki-article__recommend" aria-label="读完后的下一步推荐">
          <div class="wiki-article__recommend-head">
            <span>Next Step</span>
            <h2>读完后的下一步推荐</h2>
            <p>按当前主题、案例库和应急手册自动整理，帮你把这篇内容接到下一次练习。</p>
          </div>
          <div class="wiki-recommend-grid">
            <div v-if="nextStepRecommendations.length" class="wiki-recommend-card wiki-recommend-card--primary">
              <h3>继续学习</h3>
              <router-link v-for="item in nextStepRecommendations" :key="item.id" :to="'/a/' + item.id" class="wiki-recommend-link">
                <span>{{ item.badge }}</span><strong>{{ item.title }}</strong><em>{{ item.reason }}</em>
              </router-link>
            </div>
            <div v-if="relatedCases.length" class="wiki-recommend-card">
              <h3>相关案例</h3>
              <router-link v-for="item in relatedCases" :key="item.id" :to="'/a/' + item.articleId" class="wiki-recommend-link">
                <span>{{ item.category }}</span><strong>{{ item.title }}</strong><em>{{ item.summary }}</em>
              </router-link>
            </div>
            <div v-if="relatedEmergency.length" class="wiki-recommend-card">
              <h3>相关应急场景</h3>
              <router-link v-for="item in relatedEmergency" :key="item.id" :to="'/a/' + item.articleId" class="wiki-recommend-link">
                <span>{{ item.category }}</span><strong>{{ item.title }}</strong><em>{{ item.summary }}</em>
              </router-link>
            </div>
          </div>
        </section>

        <div class="wiki-article__nav"><router-link v-if="prev" :to="'/a/' + prev" class="prev"><span class="label">上一篇</span><span>{{ titles[prev] || prev }}</span></router-link><span v-else></span><router-link v-if="next" :to="'/a/' + next" class="next"><span class="label">继续学习</span><span>{{ titles[next] || next }}</span></router-link></div>
      </article>
    </div>
    <div v-else class="wiki-404"><h1>404</h1><p>没有找到这篇内容。</p><router-link to="/">← 返回首页</router-link></div>
  `,
  data() { return { toc: [], favorite: false, progress: null, ticking: false }; },
  computed: {
    article() { return window.ARTICLES.articles[this.$route.params.id] || null; },
    currentId() { return this.$route.params.id; },
    titles() { return window.WIKI.titles; },
    order() { return window.WIKI.articleOrder; },
    sectionName() { return window.WIKI.getSectionName ? window.WIKI.getSectionName(this.currentId) : '成长知识库'; },
    readingMinutes() { if (!this.article || !this.article.html) return 3; const text = this.article.html.replace(/<[^>]+>/g, '').replace(/\s+/g, ''); return Math.max(3, Math.ceil(text.length / 520)); },
    prev() { const i = this.order.indexOf(this.currentId); return i > 0 ? this.order[i - 1] : null; },
    next() { const i = this.order.indexOf(this.currentId); return i >= 0 && i < this.order.length - 1 ? this.order[i + 1] : null; },
    currentSectionIds() {
      const sectionMap = (window.WIKI && window.WIKI.sectionMap) || {};
      return Object.keys(sectionMap).reduce((found, key) => {
        if (found) return found;
        const section = sectionMap[key];
        const ids = Array.isArray(section) ? section : (section && section.ids) || [];
        return ids.includes(this.currentId) ? ids : null;
      }, null) || [];
    },
    nextStepRecommendations() {
      const picked = [];
      const pushArticle = (id, badge, reason) => {
        if (!id || id === this.currentId || !this.titles[id] || picked.some(item => item.id === id)) return;
        picked.push({ id, title: this.titles[id], badge, reason });
      };

      pushArticle(this.next, '下一篇', '沿着知识库顺序继续往下读');
      const currentIndex = this.currentSectionIds.indexOf(this.currentId);
      this.currentSectionIds.slice(currentIndex + 1).forEach(id => pushArticle(id, this.sectionName, '同主题的下一篇延伸内容'));
      this.order.slice(Math.max(0, this.order.indexOf(this.currentId)) + 1).forEach(id => pushArticle(id, '推荐', '补齐后续学习路径'));
      return picked.slice(0, 3);
    },
    relatedCases() {
      const groups = (window.CASE_LIBRARY && window.CASE_LIBRARY.groups) || [];
      if (!groups.length) return [];
      const preferred = this.pickRelatedItems(groups, this.caseKeywords, group => [group.category, group.title, group.summary].concat(group.focus || []).join(' '));
      return preferred.slice(0, 2).map(group => ({
        id: group.id,
        articleId: group.articleId,
        category: group.category,
        title: group.title,
        summary: group.summary
      }));
    },
    relatedEmergency() {
      const cards = (window.EMERGENCY_TOOLKIT && window.EMERGENCY_TOOLKIT.quickCards) || [];
      const groups = (window.EMERGENCY_TOOLKIT && window.EMERGENCY_TOOLKIT.groups) || [];
      const source = cards.concat(groups.map(group => ({
        id: group.articleId,
        title: group.title,
        category: group.category,
        articleId: group.articleId,
        summary: group.summary
      })));
      if (!source.length) return [];
      const preferred = this.pickRelatedItems(source, this.emergencyKeywords, item => [item.category, item.title, item.summary, item.script].concat(item.do || []).join(' '));
      return preferred.slice(0, 2).map(item => ({
        id: item.id || item.articleId,
        articleId: item.articleId,
        category: item.category,
        title: item.title,
        summary: item.summary || item.script
      }));
    },
    caseKeywords() {
      if (this.currentId.indexOf('ch8-') === 0) return [this.currentId];
      if (['date', 'datingPractice'].includes(this.sectionKey)) return ['约会', '邀约', '推进'];
      if (['communicate', 'longTermReality'].includes(this.sectionKey)) return ['社交', '兴趣', '失败复盘'];
      if (['maleBase', 'build', 'start'].includes(this.sectionKey)) return ['日常生活', '自然破冰', '主页展示'];
      return ['日常生活', '社交兴趣'];
    },
    emergencyKeywords() {
      if (this.currentId.indexOf('ch9-') === 0) return [this.currentId];
      if (['communicate', 'longTermReality'].includes(this.sectionKey)) return ['微信', '消息', '长期关系'];
      if (['date', 'datingPractice'].includes(this.sectionKey)) return ['邀约', '约会', '推进'];
      if (['maleBase', 'build', 'start'].includes(this.sectionKey)) return ['情绪管理', '自我提升'];
      return ['失误', '修复', '情绪管理'];
    },
    sectionKey() {
      const sectionMap = (window.WIKI && window.WIKI.sectionMap) || {};
      return Object.keys(sectionMap).find(key => {
        const section = sectionMap[key];
        const ids = Array.isArray(section) ? section : (section && section.ids) || [];
        return ids.includes(this.currentId);
      }) || '';
    },
    hasRecommendations() { return this.nextStepRecommendations.length || this.relatedCases.length || this.relatedEmergency.length; }
  },
  watch: { '$route'() { this.toc = []; window.scrollTo({ top: 0, behavior: 'auto' }); this.$nextTick(() => this.afterRender()); this.refreshState(); } },
  mounted() { window.scrollTo({ top: 0 }); window.addEventListener('scroll', this.onScroll, { passive: true }); this.$nextTick(() => this.afterRender()); this.refreshState(); },
  beforeUnmount() { window.removeEventListener('scroll', this.onScroll); },
  methods: {
    afterRender() { this.rewriteLinks(); this.buildToc(); },
    refreshState() { if (!window.WikiUserState) return; this.favorite = window.WikiUserState.isFavorite('article:' + this.currentId); this.progress = window.WikiUserState.getProgress(this.currentId); },
    toggleFav() { if (!window.WikiUserState || !this.article) return; this.favorite = window.WikiUserState.toggleFavorite({ key: 'article:' + this.currentId, path: '/a/' + this.currentId, articleId: this.currentId, title: this.article.title, type: '文章' }); },
    markDone() { if (!window.WikiUserState) return; window.WikiUserState.setProgress(this.currentId, 100); this.refreshState(); },
    onScroll() { if (this.ticking || !window.WikiUserState) return; this.ticking = true; requestAnimationFrame(() => { const h = document.documentElement; const total = h.scrollHeight - h.clientHeight; const pct = total > 0 ? (h.scrollTop / total) * 100 : 0; window.WikiUserState.setProgress(this.currentId, pct); this.progress = window.WikiUserState.getProgress(this.currentId); this.ticking = false; }); },
    rewriteLinks() { const root = this.$refs.body; if (!root) return; root.querySelectorAll('a[href]').forEach(a => { const href = a.getAttribute('href') || ''; const m = href.match(/^(?:\.\/|\.\.\/pages\/|pages\/)?(ch\d+(?:-\d+)?)\.html(#[^'"\s]*)?$/); if (m) a.setAttribute('href', '#/a/' + m[1] + (m[2] || '')); }); },
    buildToc() { const root = this.$refs.body; if (!root) return; const heads = Array.from(root.querySelectorAll('h2, h3')).slice(0, 10); this.toc = heads.map((h, i) => { if (!h.id) h.id = 'section-' + this.currentId + '-' + i; return { id: h.id, text: h.textContent.trim(), level: h.tagName === 'H2' ? 2 : 3 }; }).filter(item => item.text); },
    pickRelatedItems(items, keywords, textGetter) {
      const scored = items.map((item, index) => {
        const text = (textGetter(item) || '') + ' ' + (item.articleId || '');
        const score = keywords.reduce((sum, key) => sum + (text.indexOf(key) >= 0 ? 1 : 0), 0) + (item.articleId === this.currentId ? 3 : 0);
        return { item, index, score };
      });
      return scored.sort((a, b) => b.score - a.score || a.index - b.index).map(row => row.item);
    }
  }
};
