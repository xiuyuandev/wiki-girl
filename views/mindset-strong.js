/* 强者心态锻造 —— 专栏视图 */
window.MindsetStrongView = {
  template: `
    <div class="wiki-mindset-shell">
      <!-- 英雄区 -->
      <section class="wiki-mindset-hero">
        <div class="wiki-mindset-hero__glow wiki-mindset-hero__glow--one"></div>
        <div class="wiki-mindset-hero__glow wiki-mindset-hero__glow--two"></div>
        <div class="wiki-mindset-hero__content">
          <span class="wiki-mindset-eyebrow">Strong Mindset Forge</span>
          <h1>{{ data.title }}</h1>
          <p class="wiki-mindset-hero__lead">{{ data.lead }}</p>
          <div class="wiki-mindset-hero__quote" v-if="data.heroQuote">
            <span class="wiki-mindset-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
          </div>
          <div class="wiki-mindset-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="wiki-mindset-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="wiki-mindset-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- Tab 1: 7大维度对比 -->
      <section v-show="activeTab === 'compare'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>{{ data.compareSection.title }}</h2>
          <p>{{ data.compareSection.subtitle }}</p>
        </div>
        <div class="wiki-mindset-intro"><p>{{ data.compareSection.intro }}</p></div>

        <div v-for="(dim, i) in data.compareSection.dimensions" :key="i" class="wiki-mindset-compare-card">
          <div class="wiki-mindset-compare__head" @click="toggleCompare(i)">
            <span>{{ dim.icon }}</span>
            <h3>{{ dim.name }}</h3>
          </div>
          <div v-show="selectedCompare === i" class="wiki-mindset-compare__body">
            <div class="wiki-mindset-mode wiki-mindset-mode--weak">
              <span class="wiki-mindset-mode-label">{{ dim.weak.label }}</span>
              <h5>内心想法</h5>
              <ul><li v-for="(t, j) in dim.weak.thoughts" :key="j">{{ t }}</li></ul>
              <h5>行为表现</h5>
              <p>{{ dim.weak.behavior }}</p>
              <div class="wiki-mindset-mode-core">核心驱动：{{ dim.weak.core }}</div>
            </div>
            <div class="wiki-mindset-mode wiki-mindset-mode--strong">
              <span class="wiki-mindset-mode-label">{{ dim.strong.label }}</span>
              <h5>内心想法</h5>
              <ul><li v-for="(t, j) in dim.strong.thoughts" :key="j">{{ t }}</li></ul>
              <h5>行为表现</h5>
              <p>{{ dim.strong.behavior }}</p>
              <div class="wiki-mindset-mode-core">核心驱动：{{ dim.strong.core }}</div>
            </div>
            <div class="wiki-mindset-compare-shift">
              <strong>转变方法</strong>
              <p>{{ dim.shift }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 2: 自测 -->
      <section v-show="activeTab === 'test'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>{{ data.diagnoseSection.title }}</h2>
          <p>{{ data.diagnoseSection.subtitle }}</p>
        </div>
        <div class="wiki-mindset-intro"><p>{{ data.diagnoseSection.intro }}</p></div>

        <div class="wiki-mindset-test-intro">
          <p>以下30个问题，请诚实回答「是」或「否」。「是」代表你存在该弱者模式。这不是评判，是诊断的起点。</p>
        </div>

        <div class="wiki-mindset-questions">
          <div v-for="(q, i) in data.diagnoseSection.questions" :key="i" class="wiki-mindset-question">
            <span class="wiki-mindset-question-num">{{ i + 1 }}</span>
            <div class="wiki-mindset-question-text">
              <p>{{ q.q }}</p>
              <span class="wiki-mindset-question-tag">{{ q.category }}</span>
            </div>
          </div>
        </div>

        <div class="wiki-mindset-section__head">
          <h2>自测结果解读</h2>
          <p>统计你的「是」的数量，对照下面的结果</p>
        </div>
        <div class="wiki-mindset-results">
          <div v-for="(r, i) in data.diagnoseSection.results" :key="i" class="wiki-mindset-result-card">
            <h4>{{ r.range }}</h4>
            <div class="wiki-mindset-result-level">{{ r.level }}</div>
            <p>{{ r.desc }}</p>
            <div class="wiki-mindset-result-focus">{{ r.focus }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 3: 7大支柱 -->
      <section v-show="activeTab === 'pillars'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>{{ data.pillarsSection.title }}</h2>
          <p>{{ data.pillarsSection.subtitle }}</p>
        </div>
        <div class="wiki-mindset-intro"><p>{{ data.pillarsSection.intro }}</p></div>

        <div class="wiki-mindset-pillars">
          <div v-for="(p, i) in data.pillarsSection.pillars" :key="i" class="wiki-mindset-pillar-card">
            <div class="wiki-mindset-pillar__head" @click="togglePillar(i)">
              <span class="wiki-mindset-pillar-num">{{ p.num }}</span>
              <h3>{{ p.name }}</h3>
            </div>
            <div v-show="selectedPillar === i" class="wiki-mindset-pillar__body">
              <p>{{ p.desc }}</p>
              <ul class="wiki-mindset-practice-list">
                <li v-for="(step, j) in p.practice" :key="j">{{ step }}</li>
              </ul>
              <div class="wiki-mindset-daily">
                <strong>今日行动</strong>
                <p>{{ p.daily }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 4: 场景实战 -->
      <section v-show="activeTab === 'scenes'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>{{ data.scenesSection.title }}</h2>
          <p>{{ data.scenesSection.subtitle }}</p>
        </div>
        <div class="wiki-mindset-intro"><p>{{ data.scenesSection.intro }}</p></div>

        <div class="wiki-mindset-scenes">
          <div v-for="(s, i) in data.scenesSection.scenes" :key="i" class="wiki-mindset-scene-card">
            <div class="wiki-mindset-scene__head" @click="toggleScene(i)">
              <h4>{{ s.scene }}</h4>
            </div>
            <div v-show="selectedScene === i" class="wiki-mindset-scene__body">
              <div class="wiki-mindset-scene-weak">
                <strong>弱者反应</strong>
                <p>{{ s.weak }}</p>
              </div>
              <div class="wiki-mindset-scene-strong">
                <strong>强者反应</strong>
                <p>{{ s.strong }}</p>
              </div>
              <div class="wiki-mindset-scene-key">
                <strong>核心要点</strong>
                <p>{{ s.key }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 5: 转变训练 -->
      <section v-show="activeTab === 'training'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>{{ data.trainingSection.title }}</h2>
          <p>{{ data.trainingSection.subtitle }}</p>
        </div>
        <div class="wiki-mindset-intro"><p>{{ data.trainingSection.intro }}</p></div>

        <div class="wiki-mindset-train-grid">
          <div v-for="(m, i) in data.trainingSection.methods" :key="i" class="wiki-mindset-train-card">
            <h4>{{ m.name }}</h4>
            <p>{{ m.desc }}</p>
            <ul class="wiki-mindset-train-steps">
              <li v-for="(step, j) in (m.steps || m.levels || m.statements)" :key="j">{{ step }}</li>
            </ul>
            <div class="wiki-mindset-train-freq">频率：{{ m.frequency }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 6: 21天计划 -->
      <section v-show="activeTab === 'plan'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>{{ data.plan.title }}</h2>
          <p>{{ data.plan.subtitle }}</p>
        </div>
        <div class="wiki-mindset-intro"><p>{{ data.plan.intro }}</p></div>

        <div class="wiki-mindset-weeks">
          <div
            v-for="week in data.plan.weeks"
            :key="week.week"
            class="wiki-mindset-week-card"
            :class="{ 'active-week': selectedWeek === week.week }"
          >
            <div class="wiki-mindset-week__head" @click="selectWeek(week.week)">
              <span>Week {{ week.week }}</span>
              <div>
                <h3>{{ week.title }}</h3>
                <p>{{ week.focus }}</p>
              </div>
              <span class="wiki-mindset-week-focus">{{ week.days.length }} 天</span>
            </div>
            <div v-show="selectedWeek === week.week" class="wiki-mindset-week__body">
              <div class="wiki-mindset-days">
                <div v-for="day in week.days" :key="day.day" class="wiki-mindset-day">
                  <span class="wiki-mindset-day-num">{{ day.day }}</span>
                  <div class="wiki-mindset-day-content">
                    <p>{{ day.task }}</p>
                    <span class="wiki-mindset-day-tip">{{ day.tip }}</span>
                  </div>
                </div>
              </div>
              <div class="wiki-mindset-week-insight">
                <strong>核心洞察</strong>
                <p>{{ week.insight }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 7: 常见陷阱 -->
      <section v-show="activeTab === 'traps'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>转变过程中的5个陷阱</h2>
          <p>提前知道这些坑，少走三个月弯路</p>
        </div>

        <div class="wiki-mindset-traps">
          <div v-for="(t, i) in data.traps" :key="i" class="wiki-mindset-trap-card">
            <h4>{{ t.trap }}</h4>
            <p>{{ t.desc }}</p>
            <div class="wiki-mindset-trap-fix"><strong>修正：</strong>{{ t.fix }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 8: 快速参考 -->
      <section v-show="activeTab === 'quick'" class="wiki-mindset-section">
        <div class="wiki-mindset-section__head">
          <h2>快速参考</h2>
          <p>收藏这一页，关键时刻翻出来看</p>
        </div>
        <div class="wiki-mindset-quick-cards">
          <div v-for="(card, i) in data.quickRef" :key="i" class="wiki-mindset-quick-card">
            <h4>{{ card.title }}</h4>
            <ol v-if="card.items">
              <li v-for="(item, j) in card.items" :key="j">{{ item }}</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="wiki-mindset-cta">
        <h2>强者不是天生的</h2>
        <p>每一个强者都曾经是一个弱者。区别只在于：强者决定不再做弱者。<br>从今天开始，做一个决定。</p>
        <div class="wiki-mindset-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/attraction" class="wiki-btn wiki-btn--primary">学习主导力与松弛感</router-link>
        </div>
      </section>
    </div>
  `,

  data() {
    return {
      data: window.MINDSET_STRONG_DATA || {},
      activeTab: 'compare',
      selectedCompare: null,
      selectedPillar: null,
      selectedScene: null,
      selectedWeek: 1,
      tabs: [
        { id: 'compare', name: '7大维度对比' },
        { id: 'test', name: '心态自测' },
        { id: 'pillars', name: '7大支柱' },
        { id: 'scenes', name: '场景实战' },
        { id: 'training', name: '转变训练' },
        { id: 'plan', name: '21天计划' },
        { id: 'traps', name: '常见陷阱' },
        { id: 'quick', name: '快速参考' }
      ]
    };
  },

  methods: {
    toggleCompare(i) {
      this.selectedCompare = this.selectedCompare === i ? null : i;
    },
    togglePillar(i) {
      this.selectedPillar = this.selectedPillar === i ? null : i;
    },
    toggleScene(i) {
      this.selectedScene = this.selectedScene === i ? null : i;
    },
    selectWeek(week) {
      this.selectedWeek = this.selectedWeek === week ? null : week;
    }
  }
};
