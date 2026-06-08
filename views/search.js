/* 搜索页 */
window.SearchView = {
  template: `
    <section class="wiki-search-page">
      <header class="wiki-search-hero">
        <span>Site Search</span>
        <h1>站内搜索</h1>
        <p>支持多个关键词组合匹配，覆盖工具页、文章正文、案例分组和应急卡片。</p>
        <form class="wiki-search-page__form" @submit.prevent="applySearch">
          <input type="search" v-model="query" placeholder="例如：约会 边界 / 微信 冷场" aria-label="搜索关键词" autofocus>
          <button class="wiki-btn wiki-btn--primary" type="submit">搜索</button>
        </form>
      </header>

      <div v-if="keyword" class="wiki-search-summary">
        <strong>“{{ keyword }}”</strong> 找到 {{ results.length }} 条结果
      </div>
      <div v-else class="wiki-search-summary">输入关键词开始搜索，可用空格分隔多个关键词。</div>

      <div v-if="results.length" class="wiki-search-results">
        <router-link v-for="r in results" :key="r.id" :to="r.path" class="wiki-search-result">
          <div class="wiki-search-result__source" v-html="r.sourceHtml"></div>
          <h2 v-html="r.titleHtml"></h2>
          <p v-html="r.excerptHtml"></p>
        </router-link>
      </div>
      <div v-else-if="keyword" class="wiki-search-empty wiki-search-empty--page">没有匹配结果。试试减少关键词，或搜索“聊天 / 约会 / 边界 / 形象”。</div>
    </section>
  `,
  data() { return { query: this.$route.query.q || '' }; },
  computed: {
    keyword() { return (this.$route.query.q || '').trim(); },
    results() { return window.SiteSearch ? window.SiteSearch.search(this.keyword, 50) : []; }
  },
  watch: {
    '$route.query.q'(q) { this.query = q || ''; }
  },
  methods: {
    applySearch() {
      const q = this.query.trim();
      this.$router.push({ path: '/search', query: q ? { q } : {} });
    }
  }
};
