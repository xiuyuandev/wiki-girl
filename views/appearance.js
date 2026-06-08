/* 外在蜕变独立工具页 */
window.AppearanceView = {
  template: `
    <div class="wiki-appearance-shell">
      <section class="wiki-appearance-hero">
        <div>
          <span class="wiki-appearance-kicker">Appearance Upgrade</span>
          <h1>外在蜕变形象方案</h1>
          <p>
            外在蜕变不是把你变成另一个人，而是把“干净、健康、得体、稳定”做到位。
            先消除扣分项，再建立低成本、可持续、适合普通男性的形象系统。
          </p>
          <div class="wiki-appearance-actions">
            <button class="wiki-btn wiki-btn--primary" type="button" @click="scrollToDetail">查看当前方案</button>
            <router-link to="/a/ch2" class="wiki-btn wiki-btn--ghost">阅读原章节</router-link>
          </div>
        </div>
        <div class="wiki-appearance-hero__card">
          <strong>升级原则</strong>
          <ul>
            <li>干净比昂贵重要，合身比品牌重要。</li>
            <li>不羞辱长相和身材，只改可控习惯。</li>
            <li>今晚能做的先做，长期习惯慢慢建立。</li>
          </ul>
        </div>
      </section>

      <section class="wiki-appearance-principles">
        <div><b>不制造焦虑</b><span>你不需要完美才值得被喜欢，先变得更舒服、更稳定。</span></div>
        <div><b>不盲目消费</b><span>预算优先投向理发、卫生、合身基础款和维护工具。</span></div>
        <div><b>不追求模板</b><span>根据身材、工作、城市、约会场景，建立自己的稳定风格。</span></div>
      </section>

      <section class="wiki-appearance-filter">
        <div>
          <label>改善阶段</label>
          <div class="wiki-appearance-chips">
            <button v-for="stage in filters.stages" :key="stage" type="button" :class="{ active: selectedStage === stage }" @click="selectedStage = stage">{{ stage }}</button>
          </div>
        </div>
        <div>
          <label>预算范围</label>
          <div class="wiki-appearance-chips">
            <button v-for="budget in filters.budgets" :key="budget" type="button" :class="{ active: selectedBudget === budget }" @click="selectedBudget = budget">{{ budget }}</button>
          </div>
        </div>
        <div>
          <label>使用场景</label>
          <div class="wiki-appearance-chips">
            <button v-for="scene in filters.scenes" :key="scene" type="button" :class="{ active: selectedScene === scene }" @click="selectedScene = scene">{{ scene }}</button>
          </div>
        </div>
      </section>

      <section class="wiki-appearance-layout">
        <div class="wiki-appearance-grid">
          <button
            v-for="item in filteredModules"
            :key="item.id"
            class="wiki-appearance-card"
            :class="{ active: selectedId === item.id }"
            type="button"
            @click="select(item.id)"
          >
            <div class="wiki-appearance-card__head">
              <span>{{ item.icon }}</span>
              <div><h3>{{ item.title }}</h3><p>{{ item.subtitle }}</p></div>
            </div>
            <p class="wiki-appearance-card__summary">{{ item.summary }}</p>
            <dl>
              <div><dt>阶段</dt><dd>{{ item.stage }}</dd></div>
              <div><dt>预算</dt><dd>{{ item.budget }}</dd></div>
              <div><dt>场景</dt><dd>{{ item.scene }}</dd></div>
            </dl>
          </button>
        </div>

        <article v-if="selected" id="appearance-detail" class="wiki-appearance-detail">
          <div class="wiki-appearance-detail__head">
            <span>{{ selected.icon }}</span>
            <div>
              <p>当前方案</p>
              <h2>{{ selected.title }}</h2>
              <small>{{ selected.subtitle }}</small>
            </div>
          </div>

          <section class="wiki-appearance-note">
            <strong>先记住：</strong>
            <span>{{ selected.summary }}</span>
          </section>

          <div class="wiki-appearance-panels">
            <section class="wiki-appearance-panel">
              <h3>为什么重要</h3>
              <ul><li v-for="text in selected.whyItMatters" :key="text">{{ text }}</li></ul>
            </section>
            <section class="wiki-appearance-panel wiki-appearance-panel--check">
              <h3>自查清单</h3>
              <ul><li v-for="text in selected.selfCheck" :key="text">{{ text }}</li></ul>
            </section>
            <section class="wiki-appearance-panel wiki-appearance-panel--action">
              <h3>立刻行动</h3>
              <ul><li v-for="text in selected.actionList" :key="text">{{ text }}</li></ul>
            </section>
            <section class="wiki-appearance-panel wiki-appearance-panel--warn">
              <h3>避坑提醒</h3>
              <ul><li v-for="text in selected.avoid" :key="text">{{ text }}</li></ul>
            </section>
          </div>

          <div class="wiki-appearance-split">
            <section class="wiki-appearance-kit">
              <h3>入门准备清单</h3>
              <div><span v-for="text in selected.starterKit" :key="text">{{ text }}</span></div>
            </section>
            <section class="wiki-appearance-routine">
              <h3>维护节奏</h3>
              <p v-for="text in selected.routine" :key="text">{{ text }}</p>
            </section>
          </div>

          <section class="wiki-appearance-examples">
            <h3>场景示例</h3>
            <ul><li v-for="text in selected.examples" :key="text">{{ text }}</li></ul>
          </section>

          <section class="wiki-appearance-related">
            <h3>相关补课</h3>
            <router-link v-for="link in selected.related" :key="link.id" :to="'/a/' + link.id">{{ link.title }}</router-link>
          </section>
        </article>
      </section>

      <section class="wiki-appearance-plan">
        <div>
          <span>Tonight</span>
          <h3>今晚能做</h3>
          <p>洗头、剪指甲、擦鞋、整理一套明天能穿的干净衣服。</p>
        </div>
        <div>
          <span>7 Days</span>
          <h3>7 天改善</h3>
          <p>理发，确定两套基础搭配，建立口气、体味、洗护检查流程。</p>
        </div>
        <div>
          <span>30 Days</span>
          <h3>30 天重塑</h3>
          <p>每周三次运动，补齐场景穿搭，拍照复盘体态和精神度。</p>
        </div>
      </section>
    </div>
  `,
  data() {
    const modules = window.APPEARANCE_MODULES || [];
    return {
      modules,
      filters: window.APPEARANCE_FILTERS || { stages: ['全部'], budgets: ['全部'], scenes: ['全部'] },
      selectedStage: '全部',
      selectedBudget: '全部',
      selectedScene: '全部',
      selectedId: (modules[0] && modules[0].id) || ''
    };
  },
  computed: {
    filteredModules() {
      return this.modules.filter(item => {
        const stageOk = this.selectedStage === '全部' || item.stage === this.selectedStage;
        const budgetOk = this.selectedBudget === '全部' || item.budget === this.selectedBudget;
        const sceneOk = this.selectedScene === '全部' || item.scene === this.selectedScene;
        return stageOk && budgetOk && sceneOk;
      });
    },
    selected() {
      return this.modules.find(item => item.id === this.selectedId) || this.filteredModules[0] || this.modules[0] || null;
    }
  },
  watch: {
    filteredModules(next) {
      if (!next.find(item => item.id === this.selectedId)) {
        this.selectedId = next[0] ? next[0].id : '';
      }
    }
  },
  methods: {
    select(id) {
      this.selectedId = id;
      this.$nextTick(this.scrollToDetail);
    },
    scrollToDetail() {
      const el = document.getElementById('appearance-detail');
      if (el && window.innerWidth < 980) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};
