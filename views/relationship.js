/* 关系推进急救包 */
window.RelationshipView = {
  template: `
    <div class="wiki-rel-shell">
      <section class="wiki-rel-hero">
        <div>
          <div class="wiki-home__eyebrow">Relationship Rescue System</div>
          <h1>关系推进急救包</h1>
          <p>
            不再只背话术，而是学会判断窗口、表达意图、确认双向意愿、尊重边界。
            适合约会后卡住、暧昧很久、不敢推进、错过机会后想修复的场景。
          </p>
          <div class="wiki-rel-hero__actions">
            <button type="button" class="wiki-btn wiki-btn--primary" @click="scrollTo('featured')">先看最高频卡点</button>
            <button type="button" class="wiki-btn" @click="scrollTo('scenarios')">按场景查询</button>
          </div>
        </div>
        <aside class="wiki-rel-principle">
          <span>底线原则</span>
          <strong>主动 ≠ 施压，暧昧 ≠ 同意。</strong>
          <p>所有推进都必须建立在清醒、自愿、舒服、可随时拒绝的基础上。</p>
        </aside>
      </section>

      <section id="featured" class="wiki-rel-featured" v-if="featured">
        <div class="wiki-rel-featured__copy">
          <span>{{ featured.stage }} · {{ featured.urgency }}</span>
          <h2>{{ featured.title }}</h2>
          <p>{{ featured.pain }}</p>
          <strong>{{ featured.risk }}</strong>
        </div>
        <div class="wiki-rel-featured__steps">
          <div v-for="(step, i) in featured.betterMove.slice(0, 4)" :key="step">
            <b>{{ String(i + 1).padStart(2, '0') }}</b>
            <p>{{ step }}</p>
          </div>
        </div>
      </section>

      <section class="wiki-section wiki-rel-query" id="scenarios">
        <div class="wiki-section__head">
          <span>Scenario Finder</span>
          <h2>按你现在卡住的位置查</h2>
        </div>
        <div class="wiki-rel-filters">
          <button
            v-for="tag in filters"
            :key="tag"
            type="button"
            :class="{ active: currentFilter === tag }"
            @click="currentFilter = tag"
          >{{ tag }}</button>
        </div>
        <div class="wiki-rel-grid">
          <article
            v-for="item in filteredScenarios"
            :key="item.id"
            class="wiki-rel-card"
            :class="'wiki-rel-card--' + item.tone"
            @click="select(item.id)"
          >
            <div class="wiki-rel-card__top">
              <span>{{ item.stage }}</span>
              <b>{{ item.urgency }}</b>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.risk }}</p>
            <ul>
              <li v-for="signal in item.signals.slice(0, 3)" :key="signal">{{ signal }}</li>
            </ul>
            <button type="button">查看处理步骤 →</button>
          </article>
        </div>
      </section>

      <section class="wiki-rel-detail" v-if="selected">
        <div class="wiki-rel-detail__head">
          <span>{{ selected.stage }}</span>
          <h2>{{ selected.title }}</h2>
          <p>{{ selected.pain }}</p>
        </div>

        <div class="wiki-rel-panels">
          <div class="wiki-rel-panel">
            <h3>判断信号</h3>
            <ul><li v-for="x in selected.signals" :key="x">{{ x }}</li></ul>
          </div>
          <div class="wiki-rel-panel wiki-rel-panel--mistake">
            <h3>常见错误</h3>
            <ul><li v-for="x in selected.commonMistakes" :key="x">{{ x }}</li></ul>
          </div>
          <div class="wiki-rel-panel wiki-rel-panel--right">
            <h3>正确推进</h3>
            <ol><li v-for="x in selected.betterMove" :key="x">{{ x }}</li></ol>
          </div>
        </div>

        <div class="wiki-rel-lower">
          <div class="wiki-rel-boundary">
            <h3>边界提醒</h3>
            <p v-for="x in selected.consentBoundary" :key="x">{{ x }}</p>
          </div>
          <div class="wiki-rel-script">
            <h3>可直接用的话术</h3>
            <blockquote v-for="x in selected.scripts" :key="x">{{ x }}</blockquote>
          </div>
          <div class="wiki-rel-recovery">
            <h3>错过后的修复</h3>
            <ul><li v-for="x in selected.recovery" :key="x">{{ x }}</li></ul>
          </div>
        </div>

        <div class="wiki-rel-links">
          <span>继续补课：</span>
          <router-link v-for="id in selected.links" :key="id" :to="'/a/' + id">{{ titleOf(id) }}</router-link>
        </div>
      </section>
    </div>
  `,
  data() {
    const scenarios = window.RELATIONSHIP_SCENARIOS || [];
    return {
      scenarios,
      filters: window.RELATIONSHIP_STAGE_FILTERS || ['全部'],
      currentFilter: '全部',
      selectedId: scenarios[0] ? scenarios[0].id : null
    };
  },
  computed: {
    featured() {
      return this.scenarios[0] || null;
    },
    filteredScenarios() {
      if (this.currentFilter === '全部') return this.scenarios;
      return this.scenarios.filter(item => item.stage === this.currentFilter);
    },
    selected() {
      return this.scenarios.find(item => item.id === this.selectedId) || this.featured;
    }
  },
  methods: {
    select(id) {
      this.selectedId = id;
      this.$nextTick(() => {
        const el = document.querySelector('.wiki-rel-detail');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    titleOf(id) {
      return (window.WIKI && window.WIKI.titles && window.WIKI.titles[id]) || id;
    },
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};
