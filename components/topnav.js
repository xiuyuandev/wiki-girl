/* 顶栏组件 */
window.TopNav = {
  template: `
    <header class="wiki-header wiki-header--premium">
      <router-link to="/" class="wiki-header__brand" aria-label="返回首页">
        <span class="wiki-header__logo">魅</span>
        <span class="wiki-header__brand-copy">
          <strong>{{ brand }}</strong>
          <em>{{ tagline }}</em>
        </span>
      </router-link>

      <nav class="wiki-header__nav wiki-header__nav--primary" aria-label="核心栏目">
        <router-link v-for="item in primaryNav" :key="item.to || item.id" :to="item.to || ('/a/' + item.id)">
          {{ item.name }}
        </router-link>
      </nav>

      <div class="wiki-header__spacer"></div>

      <div class="wiki-header__search" @keydown.esc="clearSearch" @keydown.down.prevent="moveActive(1)" @keydown.up.prevent="moveActive(-1)" @keydown.enter.prevent="submitSearch">
        <span class="wiki-header__search-icon">⌕</span>
        <input type="search" placeholder="搜索：聊天 / 约会 / 信念 / 急救" v-model="query" @focus="open = true" @input="onInput" aria-label="站内搜索" />
        <div v-if="open && query.trim()" class="wiki-search-panel">
          <router-link v-for="(r, i) in results" :key="r.id" :to="r.path" class="wiki-search-item" :class="{ active: i === activeIndex }" @mouseenter="activeIndex = i" @click="clearSearch">
            <span v-html="r.sourceHtml"></span>
            <strong v-html="r.titleHtml"></strong>
            <p v-html="r.excerptHtml"></p>
          </router-link>
          <router-link :to="searchPath" class="wiki-search-more" @click="open = false">查看全部搜索结果</router-link>
          <div v-if="!results.length" class="wiki-search-empty">没有匹配结果，按 Enter 打开搜索页换个关键词试试。</div>
        </div>
      </div>

      <div class="wiki-header__more" v-if="secondaryNav.length">
        <button type="button" class="wiki-header__more-btn" aria-haspopup="true">工具库</button>
        <div class="wiki-header__more-panel" role="menu">
          <router-link v-for="item in secondaryNav" :key="item.to || item.id" :to="item.to || ('/a/' + item.id)" role="menuitem">
            {{ item.name }}
          </router-link>
        </div>
      </div>

      <router-link to="/a/ch44" class="wiki-header__cta">信念改写</router-link>
    </header>
  `,
  data() {
    return { brand: window.WIKI.brand, tagline: window.WIKI.tagline, topNav: window.WIKI.topNav, query: '', open: false, activeIndex: -1 };
  },
  computed: {
    primaryNav() {
      const priority = ['成长路径', '外在蜕变', '关系急救', '案例库', '应急手册', '女性图鉴'];
      return (this.topNav || []).filter(item => priority.includes(item.name));
    },
    secondaryNav() {
      const priority = new Set(this.primaryNav.map(item => item.name).concat(['信念改写']));
      return (this.topNav || []).filter(item => !priority.has(item.name));
    },
    results() {
      return window.SiteSearch ? window.SiteSearch.search(this.query, 8) : [];
    },
    searchPath() {
      return { path: '/search', query: { q: this.query.trim() } };
    }
  },
  mounted() { document.addEventListener('click', this.onDocClick); },
  beforeUnmount() { document.removeEventListener('click', this.onDocClick); },
  methods: {
    clearSearch() { this.query = ''; this.open = false; this.activeIndex = -1; },
    onInput() { this.open = true; this.activeIndex = this.results.length ? 0 : -1; },
    moveActive(step) {
      this.open = true;
      if (!this.results.length) return;
      this.activeIndex = (this.activeIndex + step + this.results.length) % this.results.length;
    },
    submitSearch() {
      if (this.activeIndex >= 0 && this.results[this.activeIndex]) {
        this.$router.push(this.results[this.activeIndex].path);
        this.clearSearch();
        return;
      }
      if (this.query.trim()) {
        this.$router.push(this.searchPath);
        this.open = false;
      }
    },
    onDocClick(e) { if (!this.$el.contains(e.target)) this.open = false; }
  }
};
