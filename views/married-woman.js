/* 复杂关系边界手册 */
window.MarriedWomanView = {
  template: `
    <div class="wiki-mw-shell">
      <!-- 顶部英雄区 -->
      <section class="wiki-mw-hero">
        <div class="wiki-mw-hero__glow wiki-mw-hero__glow--one"></div>
        <div class="wiki-mw-hero__glow wiki-mw-hero__glow--two"></div>
        <div class="wiki-mw-hero__content">
          <div class="wiki-home__eyebrow">Complex Relationship Boundaries · 高风险关系自查</div>
          <h1>复杂关系边界手册</h1>
          <p>
            不是教你推进关系，而是帮你识别越界、降低伤害、守住底线并体面退出。
            20 个风险场景，覆盖从暧昧信号、情绪依赖、隐蔽互动到止损表达的完整自查。
            所有互动的前提是：不介入、不欺骗、不利用脆弱，并允许任何一方随时回到安全距离。
          </p>
          <div class="wiki-mw-stats">
            <div><strong>{{ scenarios.length }}</strong><span>风险场景</span></div>
            <div><strong>{{ stageFilters.length - 1 }}</strong><span>阶段分类</span></div>
            <div><strong>200+</strong><span>边界表达</span></div>
          </div>
          <div class="wiki-mw-hero__actions">
            <button type="button" class="wiki-btn wiki-btn--primary" @click="scrollTo('featured')">先看核心原则</button>
            <button type="button" class="wiki-btn" @click="scrollTo('scenarios')">按风险查询</button>
            <button type="button" class="wiki-btn wiki-btn--ghost" @click="scrollTo('self-check')">自我审视</button>
          </div>
        </div>
        <aside class="wiki-mw-principle">
          <span>底线原则</span>
          <strong>不介入 · 不欺骗 · 不利用 · 可退出</strong>
          <p>她的婚姻是她的选择，不是你的机会。利用困境是操控，不是魅力。</p>
          <div class="wiki-mw-principle__meta">
            <small>⚠ 本页用于风险识别、降温和止损，不提供隐蔽推进或规避发现的方法</small>
          </div>
        </aside>
      </section>

      <!-- 核心原则速览 -->
      <section id="featured" class="wiki-mw-featured" v-if="featured">
        <div class="wiki-mw-featured__copy">
          <span class="wiki-mw-badge wiki-mw-badge--featured">{{ featured.stage }} · {{ featured.urgency }}</span>
          <h2>{{ featured.title }}</h2>
          <p>{{ featured.pain }}</p>
          <strong class="wiki-mw-detail__risk">{{ featured.risk }}</strong>
        </div>
        <div class="wiki-mw-featured__steps">
          <div v-for="(step, i) in featured.betterMove.slice(0, 4)" :key="step">
            <b>{{ String(i + 1).padStart(2, '0') }}</b>
            <p>{{ step }}</p>
          </div>
        </div>
      </section>

      <!-- 场景查询区 -->
      <section class="wiki-section wiki-mw-query" id="scenarios">
        <div class="wiki-section__head">
          <span>Scenario Finder</span>
          <h2>按你当前阶段查</h2>
          <p>20 个深度场景，从越界信号到体面退出，帮助你识别风险、降温互动并守住底线</p>
        </div>

        <!-- 搜索 -->
        <div class="wiki-mw-search">
          <span class="wiki-mw-search__icon">⌕</span>
          <input
            v-model="query"
            type="search"
            placeholder="搜索场景关键词，例如：微信、风险、愧疚、离婚、办公室..."
          />
          <button v-if="query" type="button" @click="query = ''">清除</button>
        </div>

        <!-- 过滤器 -->
        <div class="wiki-mw-filters">
          <button
            v-for="tag in filters"
            :key="tag"
            type="button"
            :class="{ active: currentFilter === tag }"
            @click="currentFilter = tag"
          >{{ tag }}</button>
        </div>

        <!-- 场景卡片网格 -->
        <div class="wiki-mw-grid">
          <article
            v-for="item in filteredScenarios"
            :key="item.id"
            class="wiki-mw-card"
            :class="'wiki-mw-card--' + item.tone"
            @click="select(item.id)"
          >
            <div class="wiki-mw-card__top">
              <span class="wiki-mw-card__stage">{{ item.stage }}</span>
              <b class="wiki-mw-card__urgency">{{ item.urgency }}</b>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="wiki-mw-card__risk">{{ item.risk }}</p>
            <ul class="wiki-mw-card__signals">
              <li v-for="signal in item.signals.slice(0, 3)" :key="signal">{{ signal }}</li>
            </ul>
            <div class="wiki-mw-card__footer">
              <span class="wiki-mw-card__count">{{ item.betterMove.length }} 步处理</span>
              <button type="button">查看边界方案 →</button>
            </div>
          </article>
        </div>

        <p v-if="!filteredScenarios.length" class="wiki-mw-empty">没有找到匹配场景，试试其他关键词或分类。</p>
      </section>

      <!-- 场景详情 -->
      <section class="wiki-mw-detail" v-if="selected" :key="selected.id">
        <div class="wiki-mw-detail__head">
          <div class="wiki-mw-detail__meta">
            <span class="wiki-mw-badge" :class="'wiki-mw-badge--' + selected.tone">{{ selected.stage }}</span>
            <b class="wiki-mw-detail__urgency">{{ selected.urgency }}</b>
          </div>
          <h2>{{ selected.title }}</h2>
          <p class="wiki-mw-detail__pain">{{ selected.pain }}</p>
          <strong class="wiki-mw-detail__risk">{{ selected.risk }}</strong>
        </div>

        <!-- 三栏面板 -->
        <div class="wiki-mw-panels">
          <div class="wiki-mw-panel">
            <h3><span class="wiki-mw-icon">◈</span> 判断信号</h3>
            <ul><li v-for="x in selected.signals" :key="x">{{ x }}</li></ul>
          </div>
          <div class="wiki-mw-panel wiki-mw-panel--mistake">
            <h3><span class="wiki-mw-icon">✕</span> 常见错误</h3>
            <ul><li v-for="x in selected.commonMistakes" :key="x">{{ x }}</li></ul>
          </div>
          <div class="wiki-mw-panel wiki-mw-panel--right">
            <h3><span class="wiki-mw-icon">✓</span> 建议处理</h3>
            <ol><li v-for="x in selected.betterMove" :key="x">{{ x }}</li></ol>
          </div>
        </div>

        <!-- 底部扩展区 -->
        <div class="wiki-mw-lower">
          <div class="wiki-mw-boundary">
            <h3><span class="wiki-mw-icon">⚠</span> 边界提醒</h3>
            <div class="wiki-mw-boundary__items">
              <p v-for="x in selected.consentBoundary" :key="x">{{ x }}</p>
            </div>
          </div>
          <div class="wiki-mw-script">
            <h3><span class="wiki-mw-icon">❝</span> 边界表达</h3>
            <div class="wiki-mw-script__items">
              <blockquote v-for="x in selected.scripts" :key="x">
                <span class="wiki-mw-script__quote">{{ x.split('——')[0] || x }}</span>
                <span v-if="x.includes('——')" class="wiki-mw-script__note">—— {{ x.split('——')[1] }}</span>
              </blockquote>
            </div>
          </div>
          <div class="wiki-mw-recovery">
            <h3><span class="wiki-mw-icon">↺</span> 错过后的修复</h3>
            <ul><li v-for="x in selected.recovery" :key="x">{{ x }}</li></ul>
          </div>
        </div>

        <!-- 关联文章 -->
        <div class="wiki-mw-links">
          <span>继续补课：</span>
          <router-link v-for="id in selected.links" :key="id" :to="'/a/' + id">{{ titleOf(id) }}</router-link>
        </div>
      </section>

      <!-- 自我审视区 -->
      <section class="wiki-section wiki-mw-selfcheck" id="self-check">
        <div class="wiki-section__head">
          <span>Self Reflection</span>
          <h2>自我审视</h2>
          <p>在继续之前，先问自己几个根本问题</p>
        </div>
        <div class="wiki-mw-selfcheck__grid">
          <article class="wiki-mw-selfcheck__card">
            <h3>动机纯度测试</h3>
            <p>如果她是单身，你还会追她吗？如果答案是否定的，你的动机主要是"人妻"这个身份，而不是她这个人。</p>
          </article>
          <article class="wiki-mw-selfcheck__card">
            <h3>后果承受力</h3>
            <p>如果被发现、失去工作、社交圈毁灭——这些后果你能承受吗？如果答案是否定的，退出。</p>
          </article>
          <article class="wiki-mw-selfcheck__card">
            <h3>换位思考</h3>
            <p>如果你的妹妹/女儿/最好的朋友遇到这种情况，你会支持那个男人吗？</p>
          </article>
          <article class="wiki-mw-selfcheck__card wiki-mw-selfcheck__card--warn">
            <h3>长期视角</h3>
            <p>十年后回头看这段关系，你会骄傲还是羞愧？每个错误都是学习的机会，但前提是你在学习。</p>
          </article>
        </div>
      </section>
    </div>
  `,
  data() {
    const scenarios = window.MARRIED_WOMAN_SCENARIOS || [];
    return {
      scenarios,
      filters: window.MARRIED_WOMAN_STAGE_FILTERS || ['全部'],
      currentFilter: '全部',
      selectedId: scenarios[0] ? scenarios[0].id : null,
      query: ''
    };
  },
  computed: {
    featured() {
      return this.scenarios[0] || null;
    },
    stageFilters() {
      return this.filters;
    },
    filteredScenarios() {
      let list = this.scenarios;
      if (this.currentFilter !== '全部') {
        list = list.filter(item => item.stage === this.currentFilter);
      }
      const q = this.query.trim().toLowerCase();
      if (q) {
        list = list.filter(item =>
          (item.title || '').toLowerCase().includes(q) ||
          (item.pain || '').toLowerCase().includes(q) ||
          (item.risk || '').toLowerCase().includes(q) ||
          (item.stage || '').toLowerCase().includes(q) ||
          item.signals.some(s => s.toLowerCase().includes(q)) ||
          item.betterMove.some(s => s.toLowerCase().includes(q))
        );
      }
      return list;
    },
    selected() {
      return this.scenarios.find(item => item.id === this.selectedId) || this.featured;
    }
  },
  methods: {
    select(id) {
      this.selectedId = id;
      this.$nextTick(() => {
        const el = document.querySelector('.wiki-mw-detail');
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
