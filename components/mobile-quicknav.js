/* 移动端快捷导航 · 底部 Tab 栏 */
window.MobileQuickNav = {
  template: `
    <nav class="wiki-mobile-tabs" aria-label="移动快捷导航">
      <router-link to="/" aria-label="首页" exact-active-class="router-link-active"><span>⌂</span><b>首页</b></router-link>
      <router-link to="/search" aria-label="搜索"><span>⌕</span><b>搜索</b></router-link>
      <router-link to="/storytelling" aria-label="故事"><span>✎</span><b>故事</b></router-link>
      <router-link to="/lifestyle" aria-label="生活"><span>☀</span><b>生活</b></router-link>
      <router-link to="/attraction" aria-label="主导"><span>◆</span><b>主导</b></router-link>
      <router-link to="/wealth" aria-label="财富"><span>💰</span><b>财富</b></router-link>
      <router-link to="/women" aria-label="她世界"><span>🌸</span><b>懂她</b></router-link>
      <router-link to="/lifehacks" aria-label="妙招"><span>💡</span><b>妙招</b></router-link>
      <router-link to="/persona" aria-label="人设"><span>🎭</span><b>人设</b></router-link>
      <router-link to="/cases" aria-label="案例"><span>▤</span><b>案例</b></router-link>
      <router-link to="/emergency" aria-label="急救"><span>!</span><b>急救</b></router-link>
    </nav>
  `
};
