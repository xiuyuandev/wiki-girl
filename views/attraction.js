/* 主导力与松弛感 —— 专栏视图 */
window.AttractionView = {
  template: `
    <div class="wiki-attraction-shell">
      <!-- 英雄区 -->
      <section class="wiki-attraction-hero">
        <div class="wiki-attraction-hero__glow wiki-attraction-hero__glow--one"></div>
        <div class="wiki-attraction-hero__glow wiki-attraction-hero__glow--two"></div>
        <div class="wiki-attraction-hero__content">
          <span class="wiki-attraction-eyebrow">Leadership & Ease</span>
          <h1>{{ data.title }}</h1>
          <p class="wiki-attraction-hero__lead">{{ data.lead }}</p>
          <div class="wiki-attraction-hero__quote" v-if="data.heroQuote">
            <span class="wiki-attraction-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
          </div>
          <div class="wiki-attraction-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="wiki-attraction-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="wiki-attraction-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- Tab 1: 认知重塑 -->
      <section v-show="activeTab === 'mindset'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.mindsetSection.title }}</h2>
          <p>{{ data.mindsetSection.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.mindsetSection.intro }}</p></div>

        <div class="wiki-attraction-section__head">
          <h2>7个吸引力的底层真相</h2>
          <p>理解这些，比学100句话术更有效</p>
        </div>
        <div class="wiki-attraction-truths">
          <div v-for="(t, i) in data.mindsetSection.truths" :key="i" class="wiki-attraction-truth-card">
            <h4>{{ t.title }}</h4>
            <p>{{ t.content }}</p>
            <div class="wiki-attraction-truth-action"><strong>今日行动：</strong>{{ t.action }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 2: 从别扭到舒展 -->
      <section v-show="activeTab === 'unwind'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.unwindSection.title }}</h2>
          <p>{{ data.unwindSection.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.unwindSection.intro }}</p></div>

        <div v-for="(s, i) in data.unwindSection.shifts" :key="i" class="wiki-attraction-shift-card">
          <div class="wiki-attraction-shift-header">
            <span class="wiki-attraction-shift-from">{{ s.from }}</span>
            <span class="wiki-attraction-shift-arrow">→</span>
            <span class="wiki-attraction-shift-to">{{ s.to }}</span>
          </div>
          <p>{{ s.detail }}</p>
          <div class="wiki-attraction-shift-exercise"><strong>练习：</strong>{{ s.exercise }}</div>
        </div>
      </section>

      <!-- Tab 3: 主导力训练 -->
      <section v-show="activeTab === 'leadership'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.leadershipSection.title }}</h2>
          <p>{{ data.leadershipSection.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.leadershipSection.intro }}</p></div>

        <div class="wiki-attraction-behaviors">
          <div v-for="(b, i) in data.leadershipSection.behaviors" :key="i" class="wiki-attraction-behavior-card">
            <h4>{{ i + 1 }}. {{ b.title }}</h4>
            <p>{{ b.desc }}</p>
            <div class="wiki-attraction-behavior-compare">
              <div class="wiki-attraction-behavior-bad"><strong>错误示范</strong>{{ b.bad }}</div>
              <div class="wiki-attraction-behavior-good"><strong>正确示范</strong>{{ b.good }}</div>
            </div>
            <div class="wiki-attraction-behavior-practice"><strong>练习：</strong>{{ b.practice }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 4: 推拉与投资 -->
      <section v-show="activeTab === 'pushpull'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.pushPullSection.title }}</h2>
          <p>{{ data.pushPullSection.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.pushPullSection.intro }}</p></div>

        <div class="wiki-attraction-section__head">
          <h2>6种推拉技巧</h2>
          <p>让她的情绪像过山车一样起伏</p>
        </div>
        <div class="wiki-attraction-pushes">
          <div v-for="(pp, i) in data.pushPullSection.pushPull" :key="i" class="wiki-attraction-push-card">
            <h4>{{ pp.name }}</h4>
            <p>{{ pp.desc }}</p>
            <div class="wiki-attraction-push-step wiki-attraction-push-push"><strong>拉</strong><p>{{ pp.push }}</p></div>
            <div class="wiki-attraction-push-step"><strong>推</strong><p>{{ pp.pull }}</p></div>
            <div class="wiki-attraction-push-effect">{{ pp.effect }}</div>
          </div>
        </div>

        <div class="wiki-attraction-section__head">
          <h2>{{ data.pushPullSection.investment.title }}</h2>
        </div>
        <div class="wiki-attraction-investment-grid">
          <div v-for="(d, i) in data.pushPullSection.investment.dimensions" :key="i" class="wiki-attraction-invest-card">
            <h4>{{ d.name }}</h4>
            <p>{{ d.desc }}</p>
            <ul><li v-for="(m, j) in d.methods" :key="j">{{ m }}</li></ul>
            <div class="wiki-attraction-invest-warning">{{ d.warning }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 5: 阶段策略 -->
      <section v-show="activeTab === 'stages'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.stagesSection.title }}</h2>
          <p>{{ data.stagesSection.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.stagesSection.intro }}</p></div>

        <div v-for="(stage, i) in data.stagesSection.stages" :key="i" class="wiki-attraction-stage-card">
          <div class="wiki-attraction-stage__head" @click="toggleStage(i)">
            <span>阶段 {{ i + 1 }}</span>
            <h3>{{ stage.name }}</h3>
            <p>核心目标：{{ stage.focus }}</p>
          </div>
          <div v-show="selectedStage === i" class="wiki-attraction-stage__body">
            <div class="wiki-attraction-stage-do">
              <h4>应该做的</h4>
              <ul><li v-for="(item, j) in stage.doList" :key="j">{{ item }}</li></ul>
            </div>
            <div class="wiki-attraction-stage-dont">
              <h4>不应该做的</h4>
              <ul><li v-for="(item, j) in stage.dontList" :key="j">{{ item }}</li></ul>
            </div>
            <div class="wiki-attraction-stage-example">
              <div><strong style="color:#34d399;">正确示范</strong><p>{{ stage.example.good }}</p></div>
              <div><strong style="color:#f87171;">错误示范</strong><p>{{ stage.example.bad }}</p></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 6: 吸引力杀手 -->
      <section v-show="activeTab === 'taboos'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.taboosSection.title }}</h2>
          <p>{{ data.taboosSection.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.taboosSection.intro }}</p></div>

        <div class="wiki-attraction-taboos">
          <div v-for="(t, i) in data.taboosSection.taboos" :key="i" class="wiki-attraction-taboo-card">
            <h4>{{ t.behavior }}</h4>
            <p>{{ t.whyBad }}</p>
            <div class="wiki-attraction-taboo-fix"><strong>改正：</strong>{{ t.fix }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 7: 实战案例 -->
      <section v-show="activeTab === 'cases'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>实战案例</h2>
          <p>从讨好到主导的真实转变</p>
        </div>
        <div class="wiki-attraction-cases">
          <div v-for="(c, i) in data.cases" :key="i" class="wiki-attraction-case-card">
            <div class="wiki-attraction-case__head" @click="toggleCase(i)">
              <h3>{{ c.title }}</h3>
              <p>{{ c.situation }}</p>
            </div>
            <div v-show="selectedCase === i" class="wiki-attraction-case__body">
              <div class="wiki-attraction-case-compare">
                <div class="wiki-attraction-case-before"><strong>错误方式</strong><p>{{ c.before }}</p></div>
                <div class="wiki-attraction-case-after"><strong>正确方式</strong><p>{{ c.after }}</p></div>
              </div>
              <div class="wiki-attraction-case-analysis">
                <p>{{ c.analysis }}</p>
                <div class="wiki-attraction-case-key"><strong>核心要点：</strong>{{ c.keyPoint }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 8: 21天计划 -->
      <section v-show="activeTab === 'plan'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>{{ data.plan.title }}</h2>
          <p>{{ data.plan.subtitle }}</p>
        </div>
        <div class="wiki-attraction-intro"><p>{{ data.plan.intro }}</p></div>

        <div class="wiki-attraction-weeks">
          <div
            v-for="week in data.plan.weeks"
            :key="week.week"
            class="wiki-attraction-week-card"
            :class="{ 'active-week': selectedWeek === week.week }"
          >
            <div class="wiki-attraction-week__head" @click="selectWeek(week.week)">
              <span>Week {{ week.week }}</span>
              <div>
                <h3>{{ week.title }}</h3>
                <p>{{ week.focus }}</p>
              </div>
              <span class="wiki-attraction-week-focus">{{ week.days.length }} 天</span>
            </div>
            <div v-show="selectedWeek === week.week" class="wiki-attraction-week__body">
              <div class="wiki-attraction-days">
                <div v-for="day in week.days" :key="day.day" class="wiki-attraction-day">
                  <span class="wiki-attraction-day-num">{{ day.day }}</span>
                  <div class="wiki-attraction-day-content">
                    <p>{{ day.task }}</p>
                    <span class="wiki-attraction-day-tip">{{ day.tip }}</span>
                  </div>
                </div>
              </div>
              <div class="wiki-attraction-week-insight">
                <strong>核心洞察</strong>
                <p>{{ week.insight }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 9: 快速参考 -->
      <section v-show="activeTab === 'quickref'" class="wiki-attraction-section">
        <div class="wiki-attraction-section__head">
          <h2>快速参考</h2>
          <p>收藏这一页，关键时刻翻出来</p>
        </div>
        <div class="wiki-attraction-quick-cards">
          <div v-for="(card, i) in data.quickRef" :key="i" class="wiki-attraction-quick-card">
            <h4>{{ card.title }}</h4>
            <ul v-if="card.items">
              <li v-for="(item, j) in card.items" :key="j">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="wiki-attraction-cta">
        <h2>从今天开始舒展</h2>
        <p>你不需要变成另一个人。你只需要停止讨好，开始做决定，开始享受过程。<br>当她看到你舒展的样子，她会自己走过来。</p>
        <div class="wiki-attraction-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/lifestyle" class="wiki-btn wiki-btn--primary">探索生活方式</router-link>
        </div>
      </section>
    </div>
  `,

  data() {
    return {
      data: window.ATTRACTION_DATA || {},
      activeTab: 'mindset',
      selectedStage: null,
      selectedCase: null,
      selectedWeek: 1,
      tabs: [
        { id: 'mindset', name: '认知重塑' },
        { id: 'unwind', name: '心态蜕变' },
        { id: 'leadership', name: '主导力训练' },
        { id: 'pushpull', name: '推拉与投资' },
        { id: 'stages', name: '阶段策略' },
        { id: 'taboos', name: '吸引力杀手' },
        { id: 'cases', name: '实战案例' },
        { id: 'plan', name: '21天计划' },
        { id: 'quickref', name: '快速参考' }
      ]
    };
  },

  methods: {
    toggleStage(i) {
      this.selectedStage = this.selectedStage === i ? null : i;
    },
    toggleCase(i) {
      this.selectedCase = this.selectedCase === i ? null : i;
    },
    selectWeek(week) {
      this.selectedWeek = this.selectedWeek === week ? null : week;
    }
  }
};
