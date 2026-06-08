/* 移动端快捷导航 */
window.MobileQuickNav = {
  template: `
    <nav class="wiki-mobile-tabs" aria-label="移动快捷导航">
      <router-link to="/" aria-label="首页"><span>⌂</span><b>首页</b></router-link>
      <router-link to="/search" aria-label="搜索"><span>⌕</span><b>搜索</b></router-link>
      <router-link to="/female-types" aria-label="图鉴"><span>◇</span><b>图鉴</b></router-link>
      <router-link to="/cases" aria-label="案例"><span>▤</span><b>案例</b></router-link>
      <router-link to="/emergency" aria-label="急救"><span>!</span><b>急救</b></router-link>
      <router-link to="/positive-psychology" aria-label="幸福"><span>✦</span><b>幸福</b></router-link>
      <router-link to="/universal-scripts" aria-label="话术"><span>✎</span><b>话术</b></router-link>
    </nav>
  `
};
