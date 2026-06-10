/* 生活方式探索 —— 专栏视图 */
window.LifestyleView = {
  template: `
    <div class="wiki-lifestyle-shell">
      <!-- 英雄区 -->
      <section class="wiki-lifestyle-hero">
        <div class="wiki-lifestyle-hero__glow wiki-lifestyle-hero__glow--one"></div>
        <div class="wiki-lifestyle-hero__glow wiki-lifestyle-hero__glow--two"></div>
        <div class="wiki-lifestyle-hero__content">
          <span class="wiki-lifestyle-eyebrow">Lifestyle Exploration</span>
          <h1>{{ data.title }}</h1>
          <p class="wiki-lifestyle-hero__lead">{{ data.lead }}</p>
          <div class="wiki-lifestyle-hero__quote" v-if="data.heroQuote">
            <span class="wiki-lifestyle-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
            <div class="wiki-lifestyle-hero__quote-source">
              <strong>{{ data.heroQuote.author }}</strong>
              <span>{{ data.heroQuote.source }}</span>
            </div>
          </div>
          <div class="wiki-lifestyle-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="wiki-lifestyle-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="wiki-lifestyle-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- ═══════════════════════════════════════════
           Tab 1: 认知重塑
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'mindset'" class="wiki-lifestyle-section">
        <div class="wiki-lifestyle-section__head">
          <h2>{{ data.mindsetSection.title }}</h2>
          <p>{{ data.mindsetSection.subtitle }}</p>
        </div>
        <div class="wiki-lifestyle-intro"><p>{{ data.mindsetSection.intro }}</p></div>

        <div class="wiki-lifestyle-section__head">
          <h2>打破四个生活误区</h2>
          <p>这些观念是很多男人生活单调的根源</p>
        </div>
        <div class="wiki-lifestyle-myths">
          <div v-for="(m, i) in data.mindsetSection.myths" :key="i" class="wiki-lifestyle-myth-card">
            <h4>{{ m.myth }}</h4>
            <p class="wiki-lifestyle-myth-reality">{{ m.reality }}</p>
            <div class="wiki-lifestyle-myth-action"><strong>今日行动：</strong>{{ m.action }}</div>
          </div>
        </div>

        <div class="wiki-lifestyle-section__head">
          <h2>四大生活原则</h2>
          <p>让生活方式变得有趣的核心逻辑</p>
        </div>
        <div class="wiki-lifestyle-principles">
          <div v-for="(p, i) in data.mindsetSection.principles" :key="i" class="wiki-lifestyle-principle-card">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="wiki-lifestyle-principle-example">{{ p.example }}</div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 2: 生活方案库
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'activities'" class="wiki-lifestyle-section">
        <div class="wiki-lifestyle-section__head">
          <h2>{{ data.activitiesSection.title }}</h2>
          <p>{{ data.activitiesSection.subtitle }}</p>
        </div>
        <div class="wiki-lifestyle-intro"><p>{{ data.activitiesSection.intro }}</p></div>

        <div class="wiki-lifestyle-categories">
          <div
            v-for="cat in data.activitiesSection.categories"
            :key="cat.name"
            class="wiki-lifestyle-cat-card"
          >
            <div class="wiki-lifestyle-cat__head" @click="toggleCategory(cat.name)">
              <span>{{ cat.icon }}</span>
              <h3>{{ cat.name }}</h3>
            </div>
            <div v-show="selectedCategory === cat.name" class="wiki-lifestyle-cat__body">
              <div
                v-for="(act, j) in cat.activities"
                :key="act.name"
                class="wiki-lifestyle-activity-card"
              >
                <h4>{{ act.name }}</h4>
                <div class="wiki-lifestyle-activity-meta">
                  <span>{{ act.cost }}</span>
                  <span>{{ act.scene }}</span>
                </div>
                <p>{{ act.desc }}</p>
                <div v-if="act.detail" class="wiki-lifestyle-activity-detail">{{ act.detail }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 3: 精力恢复
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'recovery'" class="wiki-lifestyle-section">
        <div class="wiki-lifestyle-section__head">
          <h2>{{ data.recoverySection.title }}</h2>
          <p>{{ data.recoverySection.subtitle }}</p>
        </div>
        <div class="wiki-lifestyle-intro"><p>{{ data.recoverySection.intro }}</p></div>

        <div class="wiki-lifestyle-section__head">
          <h2>五个替代方案</h2>
          <p>把耗精力的习惯，换成真正恢复精力的方式</p>
        </div>
        <div class="wiki-lifestyle-comparisons">
          <div v-for="(c, i) in data.recoverySection.comparisons" :key="i" class="wiki-lifestyle-compare-card">
            <div class="wiki-lifestyle-compare-bad">
              <h4>❌ {{ c.activity }}</h4>
              <p>{{ c.whyTiring }}</p>
            </div>
            <div class="wiki-lifestyle-compare-good">
              <h4>✓ {{ c.alternative }}</h4>
              <p>{{ c.whyBetter }}</p>
            </div>
          </div>
        </div>

        <div class="wiki-lifestyle-section__head">
          <h2>下班后理想流程</h2>
          <p>用新的节奏替代刷手机循环</p>
        </div>
        <div class="wiki-lifestyle-routine">
          <div v-for="(r, i) in data.recoverySection.routine" :key="i" class="wiki-lifestyle-routine-item">
            <span class="wiki-lifestyle-routine-time">{{ r.time }}</span>
            <div class="wiki-lifestyle-routine-content">
              <h4>{{ r.activity }}</h4>
              <p>{{ r.tip }}</p>
            </div>
          </div>
        </div>

        <div class="wiki-lifestyle-section__head">
          <h2>5分钟快速恢复术</h2>
          <p>不需要大块时间，几分钟就能切换状态</p>
        </div>
        <div class="wiki-lifestyle-quick-relief">
          <div v-for="(q, i) in data.recoverySection.quickRelief" :key="i" class="wiki-lifestyle-relief-card">
            <h4>{{ q.name }}</h4>
            <p>{{ q.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 4: 30天计划
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'plan'" class="wiki-lifestyle-section">
        <div class="wiki-lifestyle-section__head">
          <h2>{{ data.planSection.title }}</h2>
          <p>{{ data.planSection.subtitle }}</p>
        </div>
        <div class="wiki-lifestyle-intro"><p>{{ data.planSection.intro }}</p></div>

        <div class="wiki-lifestyle-weeks">
          <div
            v-for="week in data.planSection.weeks"
            :key="week.week"
            class="wiki-lifestyle-week-card"
            :class="{ 'active-week': selectedWeek === week.week }"
          >
            <div class="wiki-lifestyle-week__head" @click="selectWeek(week.week)">
              <span>Week {{ week.week }}</span>
              <div>
                <h3>{{ week.title }}</h3>
                <p>{{ week.focus }}</p>
              </div>
              <span class="wiki-lifestyle-week-focus">{{ week.days.length }} 天</span>
            </div>
            <div v-show="selectedWeek === week.week" class="wiki-lifestyle-week__body">
              <div class="wiki-lifestyle-days">
                <div v-for="day in week.days" :key="day.day" class="wiki-lifestyle-day">
                  <span class="wiki-lifestyle-day-num">{{ day.day }}</span>
                  <div class="wiki-lifestyle-day-content">
                    <p>{{ day.task }}</p>
                    <span class="wiki-lifestyle-day-tip">{{ day.tip }}</span>
                  </div>
                </div>
              </div>
              <div class="wiki-lifestyle-week-insight">
                <strong>核心洞察</strong>
                <p>{{ week.insight }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 5: 谈资积累
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'topics'" class="wiki-lifestyle-section">
        <div class="wiki-lifestyle-section__head">
          <h2>{{ data.topicsSection.title }}</h2>
          <p>{{ data.topicsSection.subtitle }}</p>
        </div>
        <div class="wiki-lifestyle-intro"><p>{{ data.topicsSection.intro }}</p></div>

        <div class="wiki-lifestyle-section__head">
          <h2>三个积累方法</h2>
          <p>让生活变成源源不断的话题来源</p>
        </div>
        <div class="wiki-lifestyle-methods">
          <div v-for="(m, i) in data.topicsSection.methods" :key="i" class="wiki-lifestyle-method-card">
            <h4>{{ m.name }}</h4>
            <p>{{ m.desc }}</p>
            <div class="wiki-lifestyle-method-example">
              <p v-for="(ex, j) in (Array.isArray(m.example) ? m.example : [m.example])" :key="j">{{ ex }}</p>
            </div>
          </div>
        </div>

        <div class="wiki-lifestyle-section__head">
          <h2>话题开场白库</h2>
          <p>按类别准备的开场白模板</p>
        </div>
        <div class="wiki-lifestyle-topic-bank">
          <div v-for="(t, i) in data.topicsSection.topicBank" :key="i" class="wiki-lifestyle-topic-card">
            <h4>{{ t.category }}</h4>
            <ul>
              <li v-for="(s, j) in t.starters" :key="j">{{ s }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 6: 常见问题
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'faq'" class="wiki-lifestyle-section">
        <div class="wiki-lifestyle-section__head">
          <h2>常见问题</h2>
          <p>提前解答你的顾虑</p>
        </div>
        <div class="wiki-lifestyle-faq">
          <div v-for="(item, i) in data.faq" :key="i" class="wiki-lifestyle-faq-item">
            <h4>{{ item.q }}</h4>
            <p>{{ item.a }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="wiki-lifestyle-cta">
        <h2>从今晚开始</h2>
        <p>不需要等周末，不需要等明天。今晚下班回家，先不打开手机，做一件小事。<br>有趣的生活，从第一个行动开始。</p>
        <div class="wiki-lifestyle-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/storytelling" class="wiki-btn wiki-btn--primary">学习故事与幽默</router-link>
        </div>
      </section>
    </div>
  `,

  data() {
    return {
      data: window.LIFESTYLE_DATA || {},
      activeTab: 'mindset',
      selectedCategory: null,
      selectedWeek: 1,
      tabs: [
        { id: 'mindset', name: '认知重塑' },
        { id: 'activities', name: '生活方案库' },
        { id: 'recovery', name: '精力恢复' },
        { id: 'plan', name: '30天计划' },
        { id: 'topics', name: '谈资积累' },
        { id: 'faq', name: '常见问题' }
      ]
    };
  },

  methods: {
    toggleCategory(name) {
      this.selectedCategory = this.selectedCategory === name ? null : name;
    },
    selectWeek(week) {
      this.selectedWeek = this.selectedWeek === week ? null : week;
    }
  }
};
