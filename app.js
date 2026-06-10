/* 应用入口 */
(function() {
  const MOBILE_QUERY = '(max-width: 900px)';

  function routeTitle(to) {
    if (to.name === 'article') {
      const id = to.params.id;
      const article = window.ARTICLES && window.ARTICLES.articles[id];
      return (article && article.title) || (window.WIKI && window.WIKI.titles[id]) || '文章';
    }
    const map = { home: '超级首页专栏门户', appearance: '外在蜕变形象方案', relationship: '关系推进急救包', 'female-types': '女性类型图鉴', cases: '真实案例库', emergency: '场景应急手册', principles: '价值观与边界声明', 'positive-psychology': '幸福的科学', 'married-woman': '搞定人妻专栏', 'universal-scripts': '万能话术', storytelling: '故事叙述与幽默能力', lifestyle: '生活方式探索', attraction: '主导力与松弛感', mindset: '强者心态锻造', wealth: '财富建设', women: '她世界解码', lifehacks: '生活妙招', persona: '人设叙事', expression: '微表情与动作管理', 'belief-training': '信念改写训练', search: '站内搜索' };
    return map[to.name] || '成长知识库';
  }

  const app = Vue.createApp({
    components: { TopNav: window.TopNav, ProgressBar: window.ProgressBar, ToTop: window.ToTop, MobileQuickNav: window.MobileQuickNav },
    data() {
      return {
        isMobile: window.matchMedia ? window.matchMedia(MOBILE_QUERY).matches : window.innerWidth <= 900,
        mediaQuery: null,
        handleMediaChange: null
      };
    },
    computed: {
      pageTitle() { return routeTitle(this.$route); }
    },
    mounted() {
      if (!window.matchMedia) return;
      this.mediaQuery = window.matchMedia(MOBILE_QUERY);
      this.handleMediaChange = event => { this.isMobile = event.matches; };
      if (this.mediaQuery.addEventListener) this.mediaQuery.addEventListener('change', this.handleMediaChange);
      else if (this.mediaQuery.addListener) this.mediaQuery.addListener(this.handleMediaChange);
    },
    beforeUnmount() {
      if (!this.mediaQuery || !this.handleMediaChange) return;
      if (this.mediaQuery.removeEventListener) this.mediaQuery.removeEventListener('change', this.handleMediaChange);
      else if (this.mediaQuery.removeListener) this.mediaQuery.removeListener(this.handleMediaChange);
    },
    template: `
      <progress-bar></progress-bar>

      <template v-if="!isMobile">
        <top-nav></top-nav>
        <div class="wiki-layout wiki-desktop-shell wiki-shell--portal">
          <main class="wiki-main wiki-desktop-main">
            <router-view v-slot="{ Component }"><component :is="Component" /></router-view>
            <footer class="wiki-footer">
              <div class="wiki-footer__links">
                <router-link to="/">回到超级首页</router-link><router-link to="/appearance">外在蜕变</router-link><router-link to="/relationship">关系急救</router-link><router-link to="/cases">案例库</router-link><router-link to="/emergency">应急手册</router-link><router-link to="/female-types">女性图鉴</router-link><router-link to="/storytelling">故事与幽默</router-link><router-link to="/lifestyle">生活方式</router-link><router-link to="/attraction">主导力</router-link><router-link to="/mindset">强者心态</router-link><router-link to="/wealth">财富建设</router-link><router-link to="/women">她世界</router-link><router-link to="/lifehacks">生活妙招</router-link><router-link to="/persona">人设叙事</router-link><router-link to="/principles">边界声明</router-link><router-link to="/positive-psychology">幸福的科学</router-link><router-link to="/married-woman">搞定人妻</router-link><router-link to="/universal-scripts">万能话术</router-link>
              </div>
              <div>© 2026 直男蜕变指南 · 普通男性的魅力成长知识库</div>
            </footer>
          </main>
        </div>
      </template>

      <template v-else>
        <div class="wiki-mobile-shell wiki-shell--portal">
          <header class="wiki-mobile-header wiki-mobile-header--premium">
            <router-link to="/" class="wiki-mobile-brand" aria-label="返回首页">
              <span class="wiki-header__logo">魅</span>
              <span>
                <strong>{{ pageTitle }}</strong>
                <em>{{ $route.name === 'home' ? '成长控制台' : '返回控制台' }}</em>
              </span>
            </router-link>
            <div class="wiki-mobile-actions">
              <router-link class="wiki-mobile-icon-btn" to="/a/ch44" aria-label="信念改写">✦</router-link>
              <router-link class="wiki-mobile-icon-btn" to="/search" aria-label="搜索">⌕</router-link>
            </div>
          </header>

          <main class="wiki-main wiki-mobile-main">
            <router-view v-slot="{ Component }"><component :is="Component" /></router-view>
            <footer class="wiki-footer">
              <div class="wiki-footer__links">
                <router-link to="/">超级首页</router-link><router-link to="/appearance">外在蜕变</router-link><router-link to="/relationship">关系急救</router-link><router-link to="/cases">案例库</router-link><router-link to="/emergency">应急手册</router-link><router-link to="/female-types">女性图鉴</router-link><router-link to="/principles">边界声明</router-link><router-link to="/positive-psychology">幸福的科学</router-link><router-link to="/married-woman">搞定人妻</router-link><router-link to="/universal-scripts">万能话术</router-link><router-link to="/lifehacks">生活妙招</router-link><router-link to="/persona">人设叙事</router-link>
              </div>
              <div>© 2026 直男蜕变指南</div>
            </footer>
          </main>
          <mobile-quick-nav></mobile-quick-nav>
        </div>
      </template>

      <to-top></to-top>
    `
  });

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: window.Routes,
    scrollBehavior(to, from, saved) { if (saved) return saved; return { top: 0 }; }
  });

  router.afterEach(to => {
    const title = routeTitle(to);
    document.title = title + ' · 直男蜕变指南';
    if (window.WikiUserState) window.WikiUserState.recordVisit({ path: to.fullPath, title, type: to.name === 'article' ? '文章' : '工具页', articleId: to.name === 'article' ? to.params.id : null });
  });

  app.use(router);
  app.mount('#app');
})();
