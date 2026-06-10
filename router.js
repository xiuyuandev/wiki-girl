/* 路由 */
window.Routes = [
  { path: '/',             component: window.HomeView,          name: 'home' },
  { path: '/relationship', component: window.RelationshipView,  name: 'relationship' },
  { path: '/female-types', component: window.FemaleTypesView,   name: 'female-types' },
  { path: '/appearance',   component: window.AppearanceView,    name: 'appearance' },
  { path: '/cases',        component: window.CasesView,         name: 'cases' },
  { path: '/emergency',    component: window.EmergencyView,     name: 'emergency' },
  { path: '/wechat-training', component: window.WechatTrainingView, name: 'wechat-training' },
  { path: '/principles',   component: window.PrinciplesView,    name: 'principles' },
  { path: '/positive-psychology', component: window.PositivePsychologyView, name: 'positive-psychology' },
  { path: '/married-woman', component: window.MarriedWomanView, name: 'married-woman' },
  { path: '/universal-scripts', component: window.UniversalScriptsView, name: 'universal-scripts' },
  { path: '/belief-training', component: window.BeliefTrainingView, name: 'belief-training' },
  { path: '/expression',   component: window.ExpressionView,    name: 'expression' },
  { path: '/storytelling', component: window.StorytellingView,  name: 'storytelling' },
  { path: '/lifestyle',    component: window.LifestyleView,     name: 'lifestyle' },
  { path: '/attraction',   component: window.AttractionView,    name: 'attraction' },
  { path: '/mindset',      component: window.MindsetStrongView, name: 'mindset' },
  { path: '/wealth',       component: window.WealthView,        name: 'wealth' },
  { path: '/women',        component: window.WomenView,         name: 'women' },
  { path: '/lifehacks',    component: window.LifehacksView,     name: 'lifehacks' },
  { path: '/persona',      component: window.PersonaView,       name: 'persona' },
  { path: '/search',       component: window.SearchView,        name: 'search' },
  { path: '/a/:id',        component: window.ArticleView,       name: 'article' },
  { path: '/:pathMatch(.*)*', component: {
      template: `
        <div class="wiki-404">
          <h1>404</h1>
          <p>页面不存在。</p>
          <router-link to="/">← 返回首页</router-link>
        </div>`
    }
  }
];
