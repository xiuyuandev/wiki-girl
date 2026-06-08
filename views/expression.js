/* 微表情与动作管理独立工具页 */
window.ExpressionView = {
  template: `
    <div class="wiki-expression-shell">
      <!-- Hero区 -->
      <section class="wiki-expression-hero">
        <div class="wiki-expression-hero__glow wiki-expression-hero__glow--one"></div>
        <div class="wiki-expression-hero__glow wiki-expression-hero__glow--two"></div>
        <div class="wiki-expression-hero__content">
          <span class="wiki-expression-kicker">Expression & Motion System</span>
          <h1>微表情与动作管理</h1>
          <p>
            从木讷到生动，从僵硬到自然。优质男性的魅力不仅来自长相和穿搭，
            更来自笑容、眼神、手势、体态、声音和社交存在感的综合表达。
            这是一个可以训练的系统。
          </p>
          <div class="wiki-expression-stats">
            <div><strong>7</strong><span>子系统</span></div>
            <div><strong>0</strong><span>元起练</span></div>
            <div><strong>30</strong><span>天周期</span></div>
          </div>
          <div class="wiki-expression-hero__actions">
            <button class="wiki-btn wiki-btn--primary" type="button" @click="scrollToDetail">查看训练模块</button>
            <router-link to="/a/ch2" class="wiki-btn wiki-btn--ghost">阅读外在蜕变原章节</router-link>
          </div>
        </div>
        <div class="wiki-expression-hero__card">
          <strong>进化原则</strong>
          <ul>
            <li>不是改变长相，而是激活面部和身体的表达力。</li>
            <li>不追求完美，先做到"有变化"就比"一成不变"强。</li>
            <li>每天5分钟练习，30天后会有明显不同。</li>
          </ul>
        </div>
      </section>

      <!-- 核心原则 -->
      <section class="wiki-expression-principles">
        <div><b>激活而非改变</b><span>你的面部肌肉和肢体语言本来就会动，只是长期不用退化了。</span></div>
        <div><b>分场景训练</b><span>拍照、社交、约会、职场，不同场景需要不同的表情和动作组合。</span></div>
        <div><b>可量化进步</b><span>通过录像、拍照、朋友反馈，你能清晰看到自己从"木讷"到"生动"的变化。</span></div>
      </section>

      <!-- 筛选区 -->
      <section class="wiki-expression-filter">
        <div>
          <label>改善阶段</label>
          <div class="wiki-expression-chips">
            <button v-for="stage in filters.stages" :key="stage" type="button" :class="{ active: selectedStage === stage }" @click="selectedStage = stage">{{ stage }}</button>
          </div>
        </div>
        <div>
          <label>预算范围</label>
          <div class="wiki-expression-chips">
            <button v-for="budget in filters.budgets" :key="budget" type="button" :class="{ active: selectedBudget === budget }" @click="selectedBudget = budget">{{ budget }}</button>
          </div>
        </div>
        <div>
          <label>使用场景</label>
          <div class="wiki-expression-chips">
            <button v-for="scene in filters.scenes" :key="scene" type="button" :class="{ active: selectedScene === scene }" @click="selectedScene = scene">{{ scene }}</button>
          </div>
        </div>
      </section>

      <!-- 主内容区 -->
      <section class="wiki-expression-layout">
        <div class="wiki-expression-grid">
          <button
            v-for="item in filteredModules"
            :key="item.id"
            class="wiki-expression-card"
            :class="{ active: selectedId === item.id }"
            type="button"
            @click="select(item.id)"
          >
            <div class="wiki-expression-card__head">
              <span>{{ item.icon }}</span>
              <div><h3>{{ item.title }}</h3><p>{{ item.subtitle }}</p></div>
            </div>
            <p class="wiki-expression-card__summary">{{ item.summary }}</p>
            <dl>
              <div><dt>阶段</dt><dd>{{ item.stage }}</dd></div>
              <div><dt>预算</dt><dd>{{ item.budget }}</dd></div>
              <div><dt>场景</dt><dd>{{ item.scene }}</dd></div>
            </dl>
          </button>
        </div>

        <article v-if="selected" id="expression-detail" class="wiki-expression-detail">
          <div class="wiki-expression-detail__head">
            <span>{{ selected.icon }}</span>
            <div>
              <p>当前训练模块</p>
              <h2>{{ selected.title }}</h2>
              <small>{{ selected.subtitle }}</small>
            </div>
          </div>

          <section class="wiki-expression-note">
            <strong>先记住：</strong>
            <span>{{ selected.summary }}</span>
          </section>

          <div class="wiki-expression-panels">
            <section class="wiki-expression-panel">
              <h3>为什么重要</h3>
              <ul><li v-for="text in selected.whyItMatters" :key="text">{{ text }}</li></ul>
            </section>
            <section class="wiki-expression-panel wiki-expression-panel--check">
              <h3>自查清单</h3>
              <ul><li v-for="text in selected.selfCheck" :key="text">{{ text }}</li></ul>
            </section>
            <section class="wiki-expression-panel wiki-expression-panel--action">
              <h3>立刻行动</h3>
              <ul><li v-for="text in selected.actionList" :key="text">{{ text }}</li></ul>
            </section>
            <section class="wiki-expression-panel wiki-expression-panel--warn">
              <h3>避坑提醒</h3>
              <ul><li v-for="text in selected.avoid" :key="text">{{ text }}</li></ul>
            </section>
          </div>

          <div class="wiki-expression-split">
            <section class="wiki-expression-kit">
              <h3>入门准备清单</h3>
              <div><span v-for="text in selected.starterKit" :key="text">{{ text }}</span></div>
            </section>
            <section class="wiki-expression-routine">
              <h3>维护节奏</h3>
              <p v-for="text in selected.routine" :key="text">{{ text }}</p>
            </section>
          </div>

          <section v-if="selected.examples && selected.examples.length" class="wiki-expression-examples">
            <h3>场景示例</h3>
            <div>
              <article v-for="text in selected.examples" :key="text">
                <p>{{ text }}</p>
              </article>
            </div>
          </section>

          <section v-if="selected.related && selected.related.length" class="wiki-expression-related">
            <h3>相关专栏</h3>
            <div>
              <router-link v-for="r in selected.related" :key="r.id" :to="'/a/' + r.id">{{ r.title }}</router-link>
            </div>
          </section>
        </article>
      </section>

      <!-- 底部CTA -->
      <section class="wiki-expression-cta">
        <h2>表情和动作是可以训练的</h2>
        <p>你不是天生木讷，只是长期没有激活这些肌肉和能力。<br>从今天开始，每天5分钟，30天后你会看到一个更有生命力的自己。</p>
        <div class="wiki-expression-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/appearance" class="wiki-btn wiki-btn--primary">查看外在蜕变形象方案</router-link>
        </div>
      </section>
    </div>
  `,

  data() {
    return {
      modules: window.EXPRESSION_MODULES || [],
      selectedId: null,
      selectedStage: '全部',
      selectedBudget: '全部',
      selectedScene: '全部',
      filters: {
        stages: ['全部', '立刻见效', '7天改善', '14天改善', '30天重塑'],
        budgets: ['全部', '零预算', '低预算', '中预算'],
        scenes: ['全部', '日常', '社交', '约会', '职场', '拍照']
      }
    };
  },

  computed: {
    selected() {
      return this.modules.find(m => m.id === this.selectedId) || null;
    },
    filteredModules() {
      return this.modules.filter(m => {
        if (this.selectedStage !== '全部' && m.stage !== this.selectedStage) return false;
        if (this.selectedBudget !== '全部' && m.budget !== this.selectedBudget) return false;
        if (this.selectedScene !== '全部' && !m.scene.includes(this.selectedScene)) return false;
        return true;
      });
    }
  },

  mounted() {
    if (this.modules.length && !this.selectedId) {
      this.selectedId = this.modules[0].id;
    }
  },

  methods: {
    select(id) {
      this.selectedId = id;
      this.$nextTick(() => {
        const el = document.getElementById('expression-detail');
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = window.pageYOffset + rect.top - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    },
    scrollToDetail() {
      const el = document.getElementById('expression-detail');
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - 100;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  }
};
