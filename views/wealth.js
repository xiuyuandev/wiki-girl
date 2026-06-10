/* 财富建设 —— 专栏视图 */
window.WealthView = {
  template: `
    <div class="wiki-wealth-shell">
      <!-- 英雄区 -->
      <section class="wiki-wealth-hero">
        <div class="wiki-wealth-hero__glow wiki-wealth-hero__glow--one"></div>
        <div class="wiki-wealth-hero__glow wiki-wealth-hero__glow--two"></div>
        <div class="wiki-wealth-hero__content">
          <span class="wiki-wealth-eyebrow">Wealth Building</span>
          <h1>{{ data.title }}</h1>
          <p class="wiki-wealth-hero__lead">{{ data.lead }}</p>
          <div class="wiki-wealth-hero__quote" v-if="data.heroQuote">
            <span class="wiki-wealth-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
          </div>
          <div class="wiki-wealth-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="wiki-wealth-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="wiki-wealth-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- Tab 1: 认知重塑 -->
      <section v-show="activeTab === 'mindset'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.mindsetSection.title }}</h2>
          <p>{{ data.mindsetSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.mindsetSection.intro }}</p></div>

        <div class="wiki-wealth-section__head">
          <h2>12个维度的思维对比</h2>
          <p>打工思维 vs 老板思维，你在哪一边？</p>
        </div>
        <table class="wiki-wealth-compare-table">
          <thead>
            <tr>
              <th>维度</th>
              <th>打工思维</th>
              <th>老板思维</th>
              <th>今日行动</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, i) in data.mindsetSection.comparisons" :key="i">
              <td class="wiki-wealth-dimension">{{ c.dimension }}</td>
              <td class="wiki-wealth-employee">{{ c.employee }}</td>
              <td class="wiki-wealth-boss">{{ c.boss }}</td>
              <td class="wiki-wealth-action">{{ c.action }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Tab 2: 选赛道 -->
      <section v-show="activeTab === 'models'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.modelsSection.title }}</h2>
          <p>{{ data.modelsSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.modelsSection.intro }}</p></div>

        <div v-for="(m, i) in data.modelsSection.models" :key="i" class="wiki-wealth-model-card">
          <div class="wiki-wealth-model-header">
            <h4>{{ m.id }}. {{ m.name }}</h4>
            <span class="wiki-wealth-model-tag">{{ m.tag }}</span>
          </div>
          <div class="wiki-wealth-model-meta">
            <span>启动资金：{{ m.investment }}</span>
            <span>启动时间：{{ m.timeline }}</span>
            <span>收入天花板：{{ m.ceiling }}</span>
          </div>
          <p class="wiki-wealth-model-desc">{{ m.desc }}</p>
          <p style="margin:0 0 12px;font-size:13px;color:var(--text-muted)"><strong>适合人群：</strong>{{ m.forWho }}</p>
          <div class="wiki-wealth-model-steps">
            <h5>操作步骤</h5>
            <ol>
              <li v-for="(step, j) in m.steps" :key="j">{{ step }}</li>
            </ol>
          </div>
          <div v-if="m.pitfalls && m.pitfalls.length" class="wiki-wealth-model-pitfalls">
            <h5>避坑指南</h5>
            <ul>
              <li v-for="(pit, k) in m.pitfalls" :key="k">{{ pit }}</li>
            </ul>
          </div>
          <div class="wiki-wealth-model-case">
            <strong>真实案例：</strong>{{ m.case }}
          </div>
        </div>
      </section>

      <!-- Tab 3: 从0到1启动指南 -->
      <section v-show="activeTab === 'launch'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.launchSection.title }}</h2>
          <p>{{ data.launchSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.launchSection.intro }}</p></div>

        <div v-for="(s, i) in data.launchSection.steps" :key="i" class="wiki-wealth-launch-step">
          <span class="num">{{ s.num }}</span>
          <h4>{{ s.name }}</h4>
          <p>{{ s.desc }}</p>
          <ul>
            <li v-for="(a, j) in s.actions" :key="j">{{ a }}</li>
          </ul>
          <div class="wiki-wealth-checkpoint">{{ s.checkpoint }}</div>
        </div>
      </section>

      <!-- Tab 4: 三阶段增长模型 -->
      <section v-show="activeTab === 'growth'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.growthSection.title }}</h2>
          <p>{{ data.growthSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.growthSection.intro }}</p></div>

        <div v-for="(p, i) in data.growthSection.phases" :key="i" class="wiki-wealth-phase-card">
          <div class="wiki-wealth-phase-header">
            <h4>{{ p.name }}</h4>
            <span class="wiki-wealth-phase-tag" :class="'wiki-wealth-phase-tag--' + p.tag">{{ p.tag }}</span>
          </div>
          <div class="wiki-wealth-phase-info">
            <span><strong>时间：</strong>{{ p.time }}</span>
            <span><strong>目标：</strong>{{ p.goal }}</span>
          </div>
          <div class="wiki-wealth-phase-mindset">{{ p.mindset }}</div>
          <div class="wiki-wealth-phase-do">
            <h5>应该做的</h5>
            <ul>
              <li v-for="(d, j) in p.do" :key="j">{{ d }}</li>
            </ul>
          </div>
          <div class="wiki-wealth-phase-dont">
            <h5>不应该做的</h5>
            <ul>
              <li v-for="(d, j) in p.dont" :key="j">{{ d }}</li>
            </ul>
          </div>
          <div class="wiki-wealth-phase-metric"><strong>核心公式：</strong>{{ p.keyMetric }}</div>
          <div class="wiki-wealth-phase-milestone">{{ p.milestone }}</div>
          <div v-if="p.kpiTable && p.kpiTable.length" class="wiki-wealth-kpi">
            <h5>阶段 KPI 参考</h5>
            <table class="wiki-wealth-kpi-table">
              <thead><tr><th>指标</th><th>目标值</th></tr></thead>
              <tbody>
                <tr v-for="(kpi, idx) in p.kpiTable" :key="idx">
                  <td>{{ kpi.metric }}</td>
                  <td>{{ kpi.target }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Tab 5: 实战案例 -->
      <section v-show="activeTab === 'cases'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.casesSection.title }}</h2>
          <p>{{ data.casesSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.casesSection.intro }}</p></div>

        <div v-for="(c, i) in data.casesSection.cases" :key="i" class="wiki-wealth-case-card" @click="toggleCase(i)">
          <div class="wiki-wealth-case__head">
            <h4>{{ c.name }}</h4>
            <p>{{ c.bg }}</p>
          </div>
          <div v-show="selectedCase === i" class="wiki-wealth-case__body">
            <div class="wiki-wealth-case-meta">
              <span>{{ c.timeline }}</span>
              <span>{{ c.investment }}</span>
            </div>
            <div class="wiki-wealth-case-trigger">
              <strong>触发点：</strong>{{ c.trigger }}
            </div>
            <div class="wiki-wealth-case-actions">
              <h5>行动路径</h5>
              <ol>
                <li v-for="(a, j) in c.action" :key="j">{{ a }}</li>
              </ol>
            </div>
            <div class="wiki-wealth-case-result"><strong>结果：</strong>{{ c.result }}</div>
            <div class="wiki-wealth-case-lesson"><strong>核心启示：</strong>{{ c.lesson }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 6: 30天行动计划 -->
      <section v-show="activeTab === 'plan'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.planSection.title }}</h2>
          <p>{{ data.planSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.planSection.intro }}</p></div>

        <div v-for="(w, i) in data.planSection.weeks" :key="i" class="wiki-wealth-week">
          <h4>{{ w.week }}</h4>
          <div v-for="(d, j) in w.days" :key="j" class="wiki-wealth-day">
            <span class="wiki-wealth-day-label">{{ d.day }}</span>
            <span class="wiki-wealth-day-task">{{ d.task }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 7: 客户沟通与话术 -->
      <section v-show="activeTab === 'communication'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.communicationSection.title }}</h2>
          <p>{{ data.communicationSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.communicationSection.intro }}</p></div>

        <div v-for="(t, i) in data.communicationSection.topics" :key="i" class="wiki-wealth-sub-topic">
          <h3 class="wiki-wealth-sub-topic__title">{{ t.name }}</h3>
          <p class="wiki-wealth-sub-topic__desc">{{ t.desc }}</p>

          <!-- 首次接待步骤 -->
          <div v-if="t.steps" v-for="(s, j) in t.steps" :key="j" class="wiki-wealth-script-card">
            <h4>{{ s.step }}</h4>
            <div class="wiki-wealth-script-bad"><strong>错误示范：</strong>{{ s.bad }}</div>
            <div class="wiki-wealth-script-good"><strong>正确示范：</strong>{{ s.good }}</div>
            <div class="wiki-wealth-script-key"><strong>核心要点：</strong>{{ s.key }}</div>
          </div>

          <!-- 推卡话术 -->
          <div v-if="t.scripts" v-for="(sc, k) in t.scripts" :key="k" class="wiki-wealth-script-card">
            <div class="wiki-wealth-script-header">
              <h4>{{ sc.name }}</h4>
              <span class="wiki-wealth-script-scene">{{ sc.scene }}</span>
            </div>
            <div class="wiki-wealth-script-good"><strong>话术：</strong>{{ sc.script }}</div>
            <div class="wiki-wealth-script-key"><strong>关键：</strong>{{ sc.key }}</div>
          </div>

          <!-- 异议应对 -->
          <div v-if="t.responses" v-for="(r, m) in t.responses" :key="m" class="wiki-wealth-script-card">
            <h4>客户说：{{ r.objection }}</h4>
            <div class="wiki-wealth-script-bad"><strong>错误回应：</strong>{{ r.bad }}</div>
            <div class="wiki-wealth-script-good"><strong>正确回应：</strong>{{ r.good }}</div>
            <div class="wiki-wealth-script-key"><strong>核心要点：</strong>{{ r.key }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 8: 朋友圈与私域运营 -->
      <section v-show="activeTab === 'social'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.socialSection.title }}</h2>
          <p>{{ data.socialSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.socialSection.intro }}</p></div>

        <div v-for="(t, i) in data.socialSection.topics" :key="i" class="wiki-wealth-sub-topic">
          <h3 class="wiki-wealth-sub-topic__title">{{ t.name }}</h3>
          <p v-if="t.desc" class="wiki-wealth-sub-topic__desc">{{ t.desc }}</p>

          <!-- 内容规划 -->
          <div v-if="t.contentRules" class="wiki-wealth-content-rules">
            <div v-for="(cr, j) in t.contentRules" :key="j" class="wiki-wealth-content-rule">
              <h4>{{ cr.rule }}</h4>
              <p>{{ cr.desc }}</p>
              <div v-for="(ex, k) in cr.examples" :key="k" class="wiki-wealth-example">{{ ex }}</div>
            </div>
          </div>
          <div v-if="t.schedule" class="wiki-wealth-schedule">
            <div v-for="(sc, j) in t.schedule" :key="j" class="wiki-wealth-schedule-item">
              <strong>{{ sc.time }}</strong> {{ sc.content }}
              <div class="wiki-wealth-example">{{ sc.example }}</div>
            </div>
          </div>

          <!-- 文案模板 -->
          <div v-if="t.templates" class="wiki-wealth-templates">
            <div v-for="(tp, j) in t.templates" :key="j" class="wiki-wealth-template-item">
              <span class="wiki-wealth-template-type">{{ tp.type }}</span>
              <p>{{ tp.text }}</p>
            </div>
          </div>

          <!-- 客户运营策略 -->
          <div v-if="t.strategies" v-for="(st, j) in t.strategies" :key="j" class="wiki-wealth-strategy">
            <h4>{{ st.name }}</h4>
            <div v-for="(ac, k) in st.actions" :key="k" class="wiki-wealth-action-item">{{ ac }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 9: 定价与产品设计 -->
      <section v-show="activeTab === 'pricing'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.pricingSection.title }}</h2>
          <p>{{ data.pricingSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.pricingSection.intro }}</p></div>

        <div v-for="(t, i) in data.pricingSection.topics" :key="i" class="wiki-wealth-sub-topic">
          <h3 class="wiki-wealth-sub-topic__title">{{ t.name }}</h3>
          <p v-if="t.desc" class="wiki-wealth-sub-topic__desc">{{ t.desc }}</p>

          <!-- 服务项目重新包装 -->
          <div v-if="t.examples" class="wiki-wealth-pricing-examples">
            <div v-for="(ex, j) in t.examples" :key="j" class="wiki-wealth-pricing-ex">
              <div class="wiki-wealth-pricing-old"><strong>旧：</strong>{{ ex.old }}</div>
              <div class="wiki-wealth-pricing-new">
                <strong>新：</strong>{{ ex.newName }} — {{ ex.newDesc }} — <strong>{{ ex.newPrice }}</strong>
              </div>
              <div class="wiki-wealth-script-key">{{ ex.note }}</div>
            </div>
          </div>

          <!-- 定价策略 -->
          <div v-if="t.strategies" v-for="(st, j) in t.strategies" :key="j" class="wiki-wealth-strategy">
            <h4>{{ st.name }}</h4>
            <p>{{ st.desc }}</p>
            <div v-for="(sp, k) in st.steps" :key="k" class="wiki-wealth-action-item">{{ sp }}</div>
          </div>

          <!-- 疗程卡 -->
          <div v-if="t.cards" class="wiki-wealth-cards">
            <div v-for="(cd, j) in t.cards" :key="j" class="wiki-wealth-card-item">
              <div class="wiki-wealth-card-header">
                <h4>{{ cd.name }}</h4>
                <strong>{{ cd.price }}</strong>
              </div>
              <p>{{ cd.content }}</p>
              <div class="wiki-wealth-script-key">{{ cd.purpose }}</div>
              <div class="wiki-wealth-model-pitfalls">{{ cd.note }}</div>
            </div>
          </div>

          <!-- 会员体系 -->
          <div v-if="t.levels" class="wiki-wealth-cards">
            <div v-for="(lv, j) in t.levels" :key="j" class="wiki-wealth-card-item">
              <div class="wiki-wealth-card-header">
                <h4>{{ lv.name }}</h4>
                <span>{{ lv.condition }}</span>
              </div>
              <p><strong>权益：</strong>{{ lv.benefit }}</p>
              <div class="wiki-wealth-script-key">{{ lv.strategy }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 10: 办证与合规 -->
      <section v-show="activeTab === 'legal'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.legalSection.title }}</h2>
          <p>{{ data.legalSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.legalSection.intro }}</p></div>

        <div v-for="(t, i) in data.legalSection.topics" :key="i" class="wiki-wealth-sub-topic">
          <h3 class="wiki-wealth-sub-topic__title">{{ t.name }}</h3>
          <p v-if="t.desc" class="wiki-wealth-sub-topic__desc">{{ t.desc }}</p>

          <!-- 证件清单 -->
          <div v-if="t.certificates" v-for="(cert, j) in t.certificates" :key="j" class="wiki-wealth-cert-card">
            <h4>{{ cert.name }}</h4>
            <div class="wiki-wealth-cert-meta">
              <span><strong>办理地点：</strong>{{ cert.where }}</span>
              <span><strong>费用：</strong>{{ cert.cost }}</span>
              <span><strong>时间：</strong>{{ cert.time }}</span>
            </div>
            <div class="wiki-wealth-cert-materials"><strong>所需材料：</strong>{{ cert.materials }}</div>
            <div class="wiki-wealth-model-pitfalls">{{ cert.note }}</div>
          </div>

          <!-- 法律红线 -->
          <div v-if="t.lines" v-for="(ln, j) in t.lines" :key="j" class="wiki-wealth-legal-line">
            <h4>{{ ln.topic }}</h4>
            <div class="wiki-wealth-script-bad"><strong>为什么不能：</strong>{{ ln.why }}</div>
            <div class="wiki-wealth-script-good"><strong>正确做法：</strong>{{ ln.correct }}</div>
            <div class="wiki-wealth-script-key"><strong>处罚：</strong>{{ ln.punishment }}</div>
          </div>

          <!-- 风险防护 -->
          <div v-if="t.protections" v-for="(pt, j) in t.protections" :key="j" class="wiki-wealth-cert-card">
            <h4>{{ pt.name }}</h4>
            <p>{{ pt.content }}</p>
            <div v-if="pt.template" class="wiki-wealth-script-good"><strong>模板：</strong>{{ pt.template }}</div>
            <div v-if="pt.process" class="wiki-wealth-script-key"><strong>流程：</strong>{{ pt.process }}</div>
            <div v-if="pt.cost" class="wiki-wealth-script-key"><strong>费用：</strong>{{ pt.cost }}</div>
            <div v-if="pt.note" class="wiki-wealth-model-pitfalls">{{ pt.note }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 11: 身体保养与职业防护 -->
      <section v-show="activeTab === 'bodycare'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.bodycareSection.title }}</h2>
          <p>{{ data.bodycareSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.bodycareSection.intro }}</p></div>

        <div v-for="(t, i) in data.bodycareSection.topics" :key="i" class="wiki-wealth-sub-topic">
          <h3 class="wiki-wealth-sub-topic__title">{{ t.name }}</h3>
          <p v-if="t.desc" class="wiki-wealth-sub-topic__desc">{{ t.desc }}</p>

          <!-- 锻炼/保养方法 -->
          <div v-if="t.exercises" v-for="(ex, j) in t.exercises" :key="j" class="wiki-wealth-exercise-card">
            <h4>{{ ex.name }}</h4>
            <div v-if="ex.steps" v-for="(sp, k) in ex.steps" :key="k" class="wiki-wealth-action-item">{{ sp }}</div>
            <div v-if="ex.time" class="wiki-wealth-script-key"><strong>耗时：</strong>{{ ex.time }} | <strong>频率：</strong>{{ ex.frequency }}</div>
            <div v-if="ex.tips" v-for="(tip, k) in ex.tips" :key="k" class="wiki-wealth-action-item">{{ tip }}</div>
            <div v-if="ex.symptoms" class="wiki-wealth-script-bad"><strong>症状：</strong>{{ ex.symptoms }}</div>
            <div v-if="ex.prevention" class="wiki-wealth-script-good"><strong>预防：</strong>{{ ex.prevention }}</div>
            <div v-if="ex.treatment" class="wiki-wealth-model-pitfalls"><strong>治疗：</strong>{{ ex.treatment }}</div>
          </div>

          <!-- 腰部/肩部保养 -->
          <div v-if="t.care" v-for="(cr, j) in t.care" :key="j" class="wiki-wealth-exercise-card">
            <h4>{{ cr.name }}</h4>
            <div v-if="cr.tips" v-for="(tip, k) in cr.tips" :key="k" class="wiki-wealth-action-item">{{ tip }}</div>
            <div v-if="cr.exercises" v-for="(e, k) in cr.exercises" :key="k" class="wiki-wealth-action-item">{{ e }}</div>
            <div v-if="cr.signals" class="wiki-wealth-script-bad"><strong>早期信号：</strong>{{ cr.signals }}</div>
            <div v-if="cr.action" class="wiki-wealth-model-pitfalls"><strong>应对措施：</strong>{{ cr.action }}</div>
          </div>

          <div v-if="t.methods" v-for="(mt, j) in t.methods" :key="j" class="wiki-wealth-exercise-card">
            <h4>{{ mt.name }}</h4>
            <div v-if="mt.steps" v-for="(sp, k) in mt.steps" :key="k" class="wiki-wealth-action-item">{{ sp }}</div>
            <div v-if="mt.tips" v-for="(tip, k) in mt.tips" :key="k" class="wiki-wealth-action-item">{{ tip }}</div>
          </div>

          <!-- 职业生涯规划 -->
          <div v-if="t.stages" v-for="(st, j) in t.stages" :key="j" class="wiki-wealth-career-stage">
            <div class="wiki-wealth-career-header">
              <strong>{{ st.age }}</strong>
              <span>{{ st.focus }}</span>
            </div>
            <p>{{ st.action }}</p>
            <div class="wiki-wealth-script-bad"><strong>警告：</strong>{{ st.warning }}</div>
          </div>
        </div>
      </section>

      <!-- Tab 12: 新手开店90天全流程 -->
      <section v-show="activeTab === 'shopguide'" class="wiki-wealth-section">
        <div class="wiki-wealth-section__head">
          <h2>{{ data.shopGuideSection.title }}</h2>
          <p>{{ data.shopGuideSection.subtitle }}</p>
        </div>
        <div class="wiki-wealth-intro"><p>{{ data.shopGuideSection.intro }}</p></div>

        <!-- 90天数据速览 -->
        <div class="wiki-wealth-summary" v-if="data.shopGuideSection.summary">
          <h3>{{ data.shopGuideSection.summary.title }}</h3>
          <div class="wiki-wealth-summary-grid">
            <div v-for="(item, idx) in data.shopGuideSection.summary.items" :key="idx" class="wiki-wealth-summary-item">
              <strong>{{ item.label }}</strong>
              <span>{{ item.value }}</span>
            </div>
          </div>
        </div>

        <!-- 五大阶段 -->
        <div v-for="(phase, i) in data.shopGuideSection.phases" :key="i" class="wiki-wealth-phase-block">
          <h3 class="wiki-wealth-phase-block__title">{{ phase.name }}</h3>
          <p class="wiki-wealth-phase-block__desc">{{ phase.desc }}</p>

          <!-- 筹备期：checklist -->
          <div v-if="phase.checklist" v-for="(cl, j) in phase.checklist" :key="j" class="wiki-wealth-checklist">
            <h4>{{ cl.title }}</h4>
            <div v-for="(item, k) in cl.items" :key="k" class="wiki-wealth-checklist-item">
              <span class="wiki-wealth-check">☑</span>
              <span>{{ item }}</span>
            </div>
          </div>

          <!-- 冲刺期：days -->
          <div v-if="phase.days" v-for="(d, j) in phase.days" :key="j" class="wiki-wealth-day-card">
            <h4>{{ d.day }}</h4>
            <div v-for="(task, k) in d.tasks" :key="k" class="wiki-wealth-checklist-item">
              <span class="wiki-wealth-check">☑</span>
              <span>{{ task }}</span>
            </div>
          </div>

          <!-- 开业当天：timeline -->
          <div v-if="phase.timeline" class="wiki-wealth-timeline">
            <div v-for="(tl, j) in phase.timeline" :key="j" class="wiki-wealth-timeline-item">
              <span class="wiki-wealth-timeline-time">{{ tl.time }}</span>
              <span class="wiki-wealth-timeline-action">{{ tl.action }}</span>
            </div>
          </div>

          <!-- 生存期：weekly -->
          <div v-if="phase.weekly" v-for="(wk, j) in phase.weekly" :key="j" class="wiki-wealth-weekly">
            <div class="wiki-wealth-weekly-header">
              <h4>{{ wk.week }}</h4>
              <span class="wiki-wealth-weekly-focus">{{ wk.focus }}</span>
              <span class="wiki-wealth-weekly-target">目标：{{ wk.target }}</span>
            </div>
            <div v-for="(ac, k) in wk.actions" :key="k" class="wiki-wealth-checklist-item">
              <span class="wiki-wealth-check">☑</span>
              <span>{{ ac }}</span>
            </div>
          </div>

          <!-- 稳定期：strategies -->
          <div v-if="phase.strategies" v-for="(st, j) in phase.strategies" :key="j" class="wiki-wealth-strategy-card">
            <h4>{{ st.name }}</h4>
            <div v-for="(item, k) in st.items" :key="k" class="wiki-wealth-checklist-item">
              <span class="wiki-wealth-check">☑</span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      data: window.WEALTH_DATA,
      activeTab: 'mindset',
      tabs: [
        { id: 'mindset', name: '认知重塑' },
        { id: 'models', name: '5条路径' },
        { id: 'launch', name: '启动指南' },
        { id: 'growth', name: '增长模型' },
        { id: 'cases', name: '实战案例' },
        { id: 'plan', name: '30天计划' },
        { id: 'communication', name: '话术' },
        { id: 'social', name: '私域运营' },
        { id: 'pricing', name: '定价设计' },
        { id: 'legal', name: '办证合规' },
        { id: 'bodycare', name: '身体保养' },
        { id: 'shopguide', name: '开店全流程' }
      ],
      selectedCase: null
    };
  },
  methods: {
    toggleCase(index) {
      this.selectedCase = this.selectedCase === index ? null : index;
    }
  }
};
