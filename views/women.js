/* 她世界解码 —— 专栏视图 */
window.WomenView = {
  template: `
    <div class="wiki-women-shell">
      <!-- 英雄区 -->
      <section class="wiki-women-hero">
        <div class="wiki-women-hero__glow wiki-women-hero__glow--one"></div>
        <div class="wiki-women-hero__glow wiki-women-hero__glow--two"></div>
        <div class="wiki-women-hero__content">
          <span class="wiki-women-eyebrow">Understanding Women</span>
          <h1>{{ data.title }}</h1>
          <p class="wiki-women-hero__lead">{{ data.lead }}</p>
          <div class="wiki-women-hero__quote" v-if="data.heroQuote">
            <span class="wiki-women-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
          </div>
          <div class="wiki-women-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="wiki-women-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="wiki-women-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- Tab 1: 认知重塑 -->
      <section v-show="activeTab === 'mindset'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.mindsetSection.title }}</h2>
          <p>{{ data.mindsetSection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.mindsetSection.intro }}</p></div>

        <table class="wiki-women-compare-table">
          <thead>
            <tr>
              <th>维度</th>
              <th>男性思维</th>
              <th>女性思维</th>
              <th>实操建议</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, i) in data.mindsetSection.comparisons" :key="i">
              <td class="wiki-women-dimension">{{ c.dimension }}</td>
              <td class="wiki-women-male">{{ c.male }}</td>
              <td class="wiki-women-female">{{ c.female }}</td>
              <td class="wiki-women-action">{{ c.action }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Tab 2: 心理解码 -->
      <section v-show="activeTab === 'psychology'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.psychologySection.title }}</h2>
          <p>{{ data.psychologySection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.psychologySection.intro }}</p></div>

        <div v-for="(t, i) in data.psychologySection.topics" :key="i" class="wiki-women-topic">
          <h3 class="wiki-women-topic__title">{{ t.name }}</h3>
          <p class="wiki-women-topic__desc">{{ t.desc }}</p>

          <!-- 情绪密码 -->
          <div v-if="t.points" v-for="(pt, j) in t.points" :key="j" class="wiki-women-psych-card">
            <h4>{{ pt.title }}</h4>
            <p v-if="pt.content">{{ pt.content }}</p>
            <ul v-if="pt.items">
              <li v-for="(item, k) in pt.items" :key="k">{{ item }}</li>
            </ul>
            <p v-if="pt.example" style="background:rgba(251,191,36,.06);padding:10px 14px;border-radius:8px;border-left:3px solid #f59e0b;"><strong>示例：</strong>{{ pt.example }}</p>
          </div>

          <!-- 依恋类型 -->
          <div v-if="t.types" v-for="(ty, j) in t.types" :key="j" class="wiki-women-attach-card">
            <h4>{{ ty.type }}</h4>
            <p><strong style="color:#f9a8d4">特征：</strong>{{ ty.traits }}</p>
            <p><strong style="color:#fbbf24">行为表现：</strong>{{ ty.behavior }}</p>
            <p><strong style="color:#6ee7b7">应对方式：</strong>{{ ty.howTo }}</p>
          </div>

          <!-- 安全感支柱 -->
          <div v-if="t.pillars" v-for="(p, j) in t.pillars" :key="j" class="wiki-women-pillar">
            <h4>{{ p.name }}</h4>
            <p>{{ p.desc }}</p>
            <div class="wiki-women-wrong"><strong>误区：</strong>{{ p.wrong }}</div>
            <div class="wiki-women-right"><strong>正解：</strong>{{ p.right }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 3: 谈资库 -->
      <section v-show="activeTab === 'topics'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.topicsSection.title }}</h2>
          <p>{{ data.topicsSection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.topicsSection.intro }}</p></div>

        <div v-for="(a, i) in data.topicsSection.areas" :key="i" class="wiki-women-area">
          <h4>{{ a.name }}</h4>
          <p class="wiki-women-area-why">{{ a.why }}</p>
          <ul>
            <li v-for="(k, j) in a.knowledge" :key="j">{{ k }}</li>
          </ul>
          <div class="wiki-women-opener">
            <strong>开场白示范：</strong>{{ a.opener }}
          </div>
        </div>
      </section>

      <!-- Tab 4: 读懂信号 -->
      <section v-show="activeTab === 'signals'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.signalsSection.title }}</h2>
          <p>{{ data.signalsSection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.signalsSection.intro }}</p></div>

        <div class="wiki-women-section__head">
          <h2>8句「话外之音」解码</h2>
          <p>她说A，意思是B——听懂潜台词</p>
        </div>
        <div v-for="(s, i) in data.signalsSection.verbalSignals" :key="i" class="wiki-women-signal">
          <h4>{{ s.says }}</h4>
          <p><strong style="color:#f9a8d4">真实意思：</strong>{{ s.means }}</p>
          <p><strong style="color:#fbbf24">心理动机：</strong>{{ s.why }}</p>
          <p><strong style="color:#6ee7b7">正确回应：</strong>{{ s.response }}</p>
        </div>

        <div class="wiki-women-section__head" style="margin-top:36px">
          <h2>6个身体语言信号</h2>
          <p>她的身体比她的嘴更诚实</p>
        </div>
        <div v-for="(b, i) in data.signalsSection.bodyLanguage" :key="i" class="wiki-women-signal">
          <h4>{{ b.signal }}</h4>
          <p><strong style="color:#f9a8d4">含义：</strong>{{ b.meaning }}</p>
          <p><strong style="color:#fbbf24">注意：</strong>{{ b.note }}</p>
        </div>
      </section>

      <!-- Tab 5: 共鸣力训练 -->
      <section v-show="activeTab === 'empathy'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.empathySection.title }}</h2>
          <p>{{ data.empathySection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.empathySection.intro }}</p></div>

        <div v-for="(t, i) in data.empathySection.techniques" :key="i" class="wiki-women-emp-card">
          <h4>{{ t.name }}</h4>
          <p>{{ t.desc }}</p>

          <!-- 深度倾听步骤 -->
          <div v-if="t.steps" v-for="(s, j) in t.steps" :key="j" class="wiki-women-step">
            <h5>{{ s.step }}</h5>
            <p>{{ s.detail }}</p>
          </div>

          <!-- 情绪镜像示例 -->
          <div v-if="t.examples" v-for="(ex, j) in t.examples" :key="j" style="padding:10px 14px;background:rgba(255,255,255,.03);border-radius:8px;margin-bottom:8px;">
            <p style="margin:0 0 6px;font-weight:700;color:#fbbf24">{{ ex.situation }}</p>
            <p style="margin:0;font-size:14px;color:var(--text-secondary);line-height:1.68">{{ ex.response }}</p>
          </div>

          <!-- 记忆银行方法 -->
          <div v-if="t.methods" style="margin-top:12px">
            <div v-for="(m, j) in t.methods" :key="j" class="wiki-women-method-item">{{ m }}</div>
          </div>

          <!-- 化解冲突公式 -->
          <div v-if="t.formula" v-for="(f, j) in t.formula" :key="j" class="wiki-women-formula-step">
            <h5>{{ f.step }}</h5>
            <p>{{ f.example }}</p>
          </div>
          <p v-if="t.key" style="margin-top:12px;padding:10px 14px;background:rgba(248,113,113,.06);border-radius:8px;font-size:14px;color:var(--text-secondary)">
            <strong style="color:#f87171">关键原则：</strong>{{ t.key }}
          </p>
          <p v-if="t.wrong" style="margin-top:12px;padding:10px 14px;background:rgba(248,113,113,.06);border-left:3px solid #f87171;border-radius:0 8px 8px 0;font-size:14px;color:var(--text-secondary)">
            <strong style="color:#f87171">错误示范：</strong>{{ t.wrong }}
          </p>
          <p v-if="t.right" style="margin-top:12px;padding:10px 14px;background:rgba(16,185,129,.06);border-left:3px solid #10b981;border-radius:0 8px 8px 0;font-size:14px;color:var(--text-secondary)">
            <strong style="color:#6ee7b7">正确示范：</strong>{{ t.right }}
          </p>
        </div>
      </section>

      <!-- Tab 6: 场景实战 -->
      <section v-show="activeTab === 'scenes'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.scenesSection.title }}</h2>
          <p>{{ data.scenesSection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.scenesSection.intro }}</p></div>

        <div v-for="(s, i) in data.scenesSection.scenes" :key="i" class="wiki-women-scene">
          <h3>{{ s.name }}</h3>
          <p class="wiki-women-scene-context">
            <strong>场景：</strong>{{ s.context }} | <strong>目标：</strong>{{ s.goal }}
          </p>

          <!-- 对话步骤 -->
          <div v-if="s.steps" v-for="(d, j) in s.steps" :key="j" :class="['wiki-women-dialog', d.who === '你' ? 'male' : 'female']">
            <strong>{{ d.who }}：</strong>
            <span>{{ d.text }}</span>
          </div>

          <!-- 保鲜方法 -->
          <div v-if="s.methods" v-for="(m, j) in s.methods" :key="j" class="wiki-women-method-item">{{ m }}</div>

          <!-- 测试题 -->
          <div v-if="s.examples" v-for="(ex, j) in s.examples" :key="j" class="wiki-women-test-item">
            <p>{{ ex.test }}</p>
            <p>{{ ex.good }}</p>
          </div>

          <div v-if="s.principle" class="wiki-women-scene-principle">
            <strong>核心原则：</strong>{{ s.principle }}
          </div>
        </div>
      </section>

      <!-- Tab 7: 30天计划 -->
      <section v-show="activeTab === 'plan'" class="wiki-women-section">
        <div class="wiki-women-section__head">
          <h2>{{ data.planSection.title }}</h2>
          <p>{{ data.planSection.subtitle }}</p>
        </div>
        <div class="wiki-women-intro"><p>{{ data.planSection.intro }}</p></div>

        <div v-for="(w, i) in data.planSection.weeks" :key="i" class="wiki-women-week">
          <h4>{{ w.week }}</h4>
          <div v-for="(d, j) in w.days" :key="j" class="wiki-women-day">
            <span class="wiki-women-day-label">{{ d.day }}</span>
            <span class="wiki-women-day-task">{{ d.task }}</span>
          </div>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      data: window.WOMEN_DATA,
      activeTab: 'mindset',
      tabs: [
        { id: 'mindset', name: '认知重塑' },
        { id: 'psychology', name: '心理解码' },
        { id: 'topics', name: '谈资库' },
        { id: 'signals', name: '读懂信号' },
        { id: 'empathy', name: '共鸣力' },
        { id: 'scenes', name: '场景实战' },
        { id: 'plan', name: '30天计划' }
      ]
    };
  }
};
