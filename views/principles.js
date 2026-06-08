/* 原则页 */
window.PrinciplesView = {
  template: `
    <div class="wiki-principles-shell">
      <section class="wiki-principles-hero">
        <span>Principles</span>
        <h1>{{ data.title }}</h1>
        <p>{{ data.intro }}</p>
      </section>
      <section class="wiki-principles-grid">
        <article v-for="p in data.principles" :key="p.title">
          <h2>{{ p.title }}</h2>
          <p>{{ p.text }}</p>
        </article>
      </section>
      <section class="wiki-principles-boundary">
        <h2>使用边界</h2>
        <ul><li v-for="b in data.boundaries" :key="b">{{ b }}</li></ul>
        <router-link to="/" class="wiki-btn wiki-btn--primary">回到学习路径</router-link>
      </section>
    </div>
  `,
  data() { return { data: window.SITE_PRINCIPLES }; }
};
