/* 女性沟通倾向 Atlas 独立页 */
window.FemaleTypesView = {
  template: `
    <div class="wiki-type-shell wiki-type-atlas">
      <section class="wiki-type-hero wiki-type-hero--atlas">
        <div class="wiki-type-hero__main">
          <span class="wiki-type-kicker">Female Communication Atlas</span>
          <h1>女性沟通倾向图鉴</h1>
          <p>
            这不是给女性贴标签，也不是追求“拿下”的攻略。它帮助你把注意力从脑补、试探和上头，
            转回长期行为、边界、同意、适配与体面退出。
          </p>
          <div class="wiki-type-actions">
            <button class="wiki-btn wiki-btn--primary" type="button" @click="scrollToFinder">开始筛选</button>
            <button class="wiki-btn wiki-btn--ghost" type="button" @click="resetFilters">重置判断</button>
            <router-link to="/a/ch21" class="wiki-btn wiki-btn--ghost">阅读导读</router-link>
          </div>
        </div>
        <aside class="wiki-type-hero__card wiki-type-compass">
          <strong>Atlas 使用原则</strong>
          <ul>
            <li>同一个人可能混合多种倾向，不要单次定性。</li>
            <li>绿灯看投入，黄灯看节奏，红灯要停止推进。</li>
            <li>任何明确拒绝、沉默、退缩，都优先按“不推进”处理。</li>
          </ul>
          <div class="wiki-type-formula">
            <span>观察公式</span>
            <b>行为 × 时间 × 边界回应</b>
            <p>至少用 2-3 周、多场景证据判断，不用一次热情或冷淡给人定性。</p>
          </div>
        </aside>
      </section>

      <section class="wiki-type-dashboard" aria-label="栏目概览">
        <div><b>{{ types.length }}</b><span>沟通倾向</span></div>
        <div><b>{{ highRiskCount }}</b><span>高风险误判</span></div>
        <div><b>5</b><span>验证维度</span></div>
        <div><b>0</b><span>操控套路</span></div>
      </section>

      <section class="wiki-type-principles wiki-type-principles--atlas">
        <div><b>先理解</b><span>观察长期行为、回应质量和现实投入，不用单次情绪下结论。</span></div>
        <div><b>再验证</b><span>用低压力邀约和清晰表达验证适配，不用逼问、冷暴力或测试。</span></div>
        <div><b>能退出</b><span>不合适不是失败。停止消耗、尊重拒绝，是成熟的一部分。</span></div>
      </section>

            <section class="wiki-type-quiz">
        <h3>快速判断问卷</h3>
        <p>5 道题，帮你快速判断她可能的沟通倾向。这不是标签，而是降低误判的起点。</p>
        <div v-if="quizMode === 'question'" class="wiki-type-quiz__question">
          <p class="wiki-type-quiz__progress">第 {{ quizCurrent + 1 }} / {{ quizQuestions.length }} 题</p>
          <h4>{{ quizQuestions[quizCurrent].text }}</h4>
          <div class="wiki-type-quiz__options">
            <button v-for="(opt, oi) in quizQuestions[quizCurrent].options" :key="oi" @click="answerQuiz(opt)">
              {{ opt.text }}
            </button>
          </div>
        </div>
        <div v-if="quizMode === 'result'" class="wiki-type-quiz__result">
          <h4>判断结果</h4>
          <p>她可能是以下类型（按匹配度排序）：</p>
          <div class="wiki-type-quiz__results">
            <article v-for="(r, ri) in quizResults" :key="ri" @click="select(r.id); quizMode = 'question'; quizAnswers = []; quizCurrent = 0;">
              <span>{{ typeById(r.id).icon }}</span>
              <b>{{ typeById(r.id).name }}</b>
              <em>{{ r.score }} 分匹配</em>
              <p>{{ typeById(r.id).subtitle }}</p>
            </article>
          </div>
          <button class="wiki-btn" @click="quizMode = 'question'; quizAnswers = []; quizCurrent = 0;">重新测试</button>
        </div>
      </section>

<section id="type-finder" class="wiki-type-filter wiki-type-filter--sticky">
        <div>
          <label>倾向标签</label>
          <div class="wiki-type-chips">
            <button v-for="tag in filters.tags" :key="tag" type="button" :class="{ active: selectedTag === tag }" @click="selectedTag = tag">{{ tag }}</button>
          </div>
        </div>
        <div>
          <label>相处难度</label>
          <div class="wiki-type-chips">
            <button v-for="level in filters.difficulties" :key="level" type="button" :class="{ active: selectedDifficulty === level }" @click="selectedDifficulty = level">{{ level }}</button>
          </div>
        </div>
        <div>
          <label>推进节奏</label>
          <div class="wiki-type-chips">
            <button v-for="pace in filters.paces" :key="pace" type="button" :class="{ active: selectedPace === pace }" @click="selectedPace = pace">{{ pace }}</button>
          </div>
        </div>
        <div>
          <label>误判风险</label>
          <div class="wiki-type-chips">
            <button v-for="risk in filters.risks" :key="risk" type="button" :class="{ active: selectedRisk === risk }" @click="selectedRisk = risk">{{ risk }}</button>
          </div>
        </div>
        <div>
          <label>适用阶段</label>
          <div class="wiki-type-chips">
            <button v-for="stage in filters.stages" :key="stage" type="button" :class="{ active: selectedStage === stage }" @click="selectedStage = stage">{{ stage }}</button>
          </div>
        </div>
      </section>

      <section class="wiki-type-layout wiki-type-layout--atlas">
        <div class="wiki-type-list">
          <div class="wiki-type-list__head">
            <div><strong>Atlas Finder</strong><span>{{ filteredTypes.length }} / {{ types.length }} 个结果</span></div>
            <button type="button" @click="resetFilters">清空筛选</button>
          </div>

          <div v-if="!filteredTypes.length" class="wiki-type-empty">
            <b>没有匹配的倾向</b>
            <p>减少筛选条件，或先回到“全部”。不要为了匹配某个类型而扭曲现实行为。</p>
            <button type="button" @click="resetFilters">查看全部类型</button>
          </div>

          <div v-else class="wiki-type-grid wiki-type-grid--atlas">
            <button
              v-for="item in filteredTypes"
              :key="item.id"
              class="wiki-type-card wiki-type-card--atlas"
              :class="{ active: selectedId === item.id }"
              type="button"
              @click="select(item.id)"
            >
              <div class="wiki-type-card__head">
                <span>{{ item.icon }}</span>
                <div><h3>{{ item.name }}</h3><p>{{ item.subtitle }}</p></div>
              </div>
              <p class="wiki-type-card__summary">{{ item.summary }}</p>
              <p class="wiki-type-card__rule"><b>判断：</b>{{ item.decisionRule }}</p>
              <p class="wiki-type-card__rule"><b>窗口：</b>{{ firstObservation(item) }}</p>
              <div class="wiki-type-card__tags">
                <em v-for="tag in item.tags" :key="tag">{{ tag }}</em>
              </div>
              <dl>
                <div><dt>难度</dt><dd>{{ item.difficulty }}</dd></div>
                <div><dt>节奏</dt><dd>{{ item.pace }}</dd></div>
                <div><dt>风险</dt><dd>{{ item.riskLevel }}</dd></div>
                <div><dt>阶段</dt><dd>{{ item.bestStage }}</dd></div>
              </dl>
            </button>
          </div>
        </div>

        <article v-if="selected" id="type-detail" class="wiki-type-detail wiki-type-detail--atlas">
          <div class="wiki-type-detail__head wiki-type-detail__head--atlas">
            <span>{{ selected.icon }}</span>
            <div>
              <p>当前查看 · {{ selected.bestStage }} · {{ selected.riskLevel }}</p>
              <h2>{{ selected.name }}</h2>
              <small>{{ selected.summary || selected.subtitle }}</small>
            </div>
          </div>

          <section class="wiki-type-watch">
            <h3>先看什么</h3>
            <p>{{ selected.watchFirst }}</p>
            <div v-if="selected.confusedWith && selected.confusedWith.length" class="wiki-type-confused">
              <span>容易混淆</span><em v-for="name in selected.confusedWith" :key="name">{{ name }}</em>
            </div>
          </section>

          <section class="wiki-type-decision">
            <article>
              <h3>观察窗口</h3>
              <ul><li v-for="text in selected.observationWindow" :key="text">{{ text }}</li></ul>
            </article>
            <article>
              <h3>判断规则</h3>
              <p>{{ selected.decisionRule }}</p>
            </article>
          </section>

          <section class="wiki-type-evidence">
            <h3>证据看板</h3>
            <div>
              <span v-for="text in selected.evidence" :key="text">{{ text }}</span>
            </div>
          </section>

          <div class="wiki-type-signal-board">
            <section><h3>绿灯：可以继续观察</h3><ul><li v-for="text in selected.greenFlags" :key="text">{{ text }}</li></ul></section>
            <section><h3>黄灯：放慢验证</h3><ul><li v-for="text in selected.yellowFlags" :key="text">{{ text }}</li></ul></section>
            <section><h3>红灯：停止加码</h3><ul><li v-for="text in selected.redFlags" :key="text">{{ text }}</li></ul></section>
          </div>

          <div class="wiki-type-panels wiki-type-panels--atlas">
            <section class="wiki-type-panel"><h3>核心特征</h3><ul><li v-for="text in selected.core" :key="text">{{ text }}</li></ul></section>
            <section class="wiki-type-panel"><h3>识别信号</h3><ul><li v-for="text in selected.signals" :key="text">{{ text }}</li></ul></section>
            <section class="wiki-type-panel wiki-type-panel--warn"><h3>常见误判</h3><ul><li v-for="text in selected.misreads" :key="text">{{ text }}</li></ul></section>
            <section class="wiki-type-panel"><h3>更稳动作</h3><ul><li v-for="text in selected.betterMoves" :key="text">{{ text }}</li></ul></section>
            <section class="wiki-type-panel wiki-type-panel--danger"><h3>反模式</h3><ul><li v-for="text in selected.antiPattern" :key="text">{{ text }}</li></ul></section>
            <section class="wiki-type-panel wiki-type-panel--repair"><h3>修复方式</h3><ul><li v-for="text in selected.repair" :key="text">{{ text }}</li></ul></section>
          </div>

          <section class="wiki-type-stage-map">
            <h3>阶段信号</h3>
            <div><article v-for="item in selected.stageSignals" :key="item.stage"><b>{{ item.stage }}</b><p>{{ item.text }}</p></article></div>
          </section>

          <section class="wiki-type-dodont">
            <div><h3>先别做</h3><span v-for="text in selected.doDont.dont" :key="text">{{ text }}</span></div>
            <div><h3>更稳动作</h3><span v-for="text in selected.doDont.do" :key="text">{{ text }}</span></div>
          </section>

          <section class="wiki-type-scenario-grid">
            <h3>高频场景</h3>
            <div>
              <article v-for="item in selected.scenarios" :key="item.title">
                <b>{{ item.title }}</b>
                <p><span>误区</span>{{ item.wrong }}</p>
                <p><span>更稳</span>{{ item.better }}</p>
              </article>
            </div>
          </section>

          <section v-if="selected.strategies && selected.strategies.length" class="wiki-type-strategies">
            <h3>攻心策略</h3>
            <div class="wiki-type-strategies__grid">
              <article v-for="(s, i) in selected.strategies" :key="i">
                <b><span>{{ i + 1 }}</span>{{ s.title }}</b>
                <p>{{ s.desc }}</p>
                <blockquote>&ldquo;{{ s.example }}&rdquo;</blockquote>
              </article>
            </div>
          </section>

          <section v-if="selected.chatCases && selected.chatCases.length" class="wiki-type-chatcases">
            <h3>实战对话案例</h3>
            <div class="wiki-type-chatcases__list">
              <article v-for="(c, ci) in selected.chatCases" :key="ci">
                <h4>{{ c.title }} <small>{{ c.context }}</small></h4>
                <div class="wiki-type-chatcases__chat">
                  <div v-for="(msg, mi) in c.messages" :key="mi" :class="['wiki-type-chatcases__msg', 'wiki-type-chatcases__msg--' + msg.sender, msg.isWrong ? 'wiki-type-chatcases__msg--wrong' : '']">
                    <div class="wiki-type-chatcases__bubble">
                      <span class="wiki-type-chatcases__sender">{{ msg.sender === 'girl' ? '她' : '你' }}</span>
                      <p>{{ msg.text }}</p>
                      <span v-if="msg.score" class="wiki-type-chatcases__score" :class="msg.score.startsWith('+') ? 'wiki-type-chatcases__score--good' : 'wiki-type-chatcases__score--bad'">{{ msg.score }}</span>
                      <span v-if="msg.note" class="wiki-type-chatcases__note">{{ msg.note }}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section class="wiki-type-script wiki-type-script--atlas">
            <h3>可以这样表达</h3>
            <p v-for="text in selected.scripts" :key="text">“{{ text }}”</p>
            <div class="wiki-type-script-grid" v-if="selected.scriptsByStage && selected.scriptsByStage.length">
              <article v-for="item in selected.scriptsByStage" :key="item.stage"><b>{{ item.stage }}</b><p>“{{ item.text }}”</p></article>
            </div>
          </section>

          <section class="wiki-type-boundary wiki-type-boundary--atlas">
            <h3>边界提醒</h3>
            <ul><li v-for="text in selected.boundaries" :key="text">{{ text }}</li></ul>
          </section>

          <div class="wiki-type-fit wiki-type-fit--atlas">
            <section><h3>适合你，如果</h3><ul><li v-for="text in selected.fitFor" :key="text">{{ text }}</li></ul></section>
            <section><h3>不适合你，如果</h3><ul><li v-for="text in selected.notFitFor" :key="text">{{ text }}</li></ul></section>
            <section><h3>体面退出</h3><p>{{ selected.exit }}</p></section>
          </div>

          <section class="wiki-type-training">
            <div><h3>训练任务</h3><ul><li v-for="text in selected.training" :key="text">{{ text }}</li></ul></div>
            <div><h3>复盘清单</h3><ul><li v-for="text in selected.reviewChecklist" :key="text">{{ text }}</li></ul></div>
          </section>

          <section class="wiki-type-related">
            <h3>相关补课</h3>
            <router-link v-for="link in selected.related" :key="link.id" :to="'/a/' + link.id">{{ link.name }}</router-link>
          </section>
        </article>
      </section>
    </div>
  `,
  data() {
    const types = window.FEMALE_TYPES || [];
    const quiz = window.FEMALE_TYPE_QUIZ || { questions: [] };
    return {
      types,
      quizQuestions: quiz.questions || [],
      quizMode: 'question',
      quizCurrent: 0,
      quizAnswers: [],
      quizResults: [],
      filters: window.FEMALE_TYPE_FILTERS || { tags: ['全部'], difficulties: ['全部'], paces: ['全部'], risks: ['全部'], stages: ['全部'] },
      selectedTag: '全部',
      selectedDifficulty: '全部',
      selectedPace: '全部',
      selectedRisk: '全部',
      selectedStage: '全部',
      selectedId: this.initialTypeId(types)
    };
  },
  computed: {
    filteredTypes() {
      return this.types.filter(item => {
        const tagOk = this.selectedTag === '全部' || (item.tags || []).some(tag => tag.includes(this.selectedTag) || this.selectedTag.includes(tag));
        const difficultyOk = this.selectedDifficulty === '全部' || item.difficulty === this.selectedDifficulty;
        const paceOk = this.selectedPace === '全部' || item.pace === this.selectedPace;
        const riskOk = this.selectedRisk === '全部' || item.riskLevel === this.selectedRisk;
        const stageOk = this.selectedStage === '全部' || item.bestStage === this.selectedStage;
        return tagOk && difficultyOk && paceOk && riskOk && stageOk;
      });
    },
    selected() {
      return this.types.find(item => item.id === this.selectedId) || null;
    },
    highRiskCount() {
      return this.types.filter(item => item.riskLevel === '高风险').length;
    }
  },
  watch: {
    filteredTypes(next) {
      if (!next.length) {
        this.selectedId = '';
        return;
      }
      if (!next.find(item => item.id === this.selectedId)) this.select(next[0].id, { scroll: false });
    },
    '$route.query.type'(id) {
      if (id && this.types.find(item => item.id === id)) this.selectedId = id;
      if (!id && this.types.length && !this.filteredTypes.find(item => item.id === this.selectedId)) {
        this.selectedId = (this.filteredTypes[0] && this.filteredTypes[0].id) || this.types[0].id;
      }
    }
  },
  methods: {
    typeById(id) {
      return this.types.find(t => t.id === id) || { icon: '', name: id, subtitle: '' };
    },
    answerQuiz(option) {
      this.quizAnswers.push(option);
      if (this.quizCurrent < this.quizQuestions.length - 1) {
        this.quizCurrent++;
      } else {
        this.finishQuiz();
      }
    },
    finishQuiz() {
      const scores = {};
      this.quizAnswers.forEach(ans => {
        Object.entries(ans.scores).forEach(([typeId, score]) => {
          scores[typeId] = (scores[typeId] || 0) + score;
        });
      });
      this.quizResults = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id, score]) => ({ id, score }));
      this.quizMode = 'result';
    },
    initialTypeId(types) {
      const id = this.$route && this.$route.query && this.$route.query.type;
      if (id && types.find(item => item.id === id)) return id;
      return (types[0] && types[0].id) || '';
    },
    firstObservation(item) {
      return (item.observationWindow && item.observationWindow[0]) || item.watchFirst || item.subtitle;
    },
    select(id, options) {
      this.selectedId = id;
      if (this.$router) this.$router.replace({ path: '/female-types', query: { type: id } });
      if (!options || options.scroll !== false) this.$nextTick(this.scrollToDetail);
    },
    resetFilters() {
      this.selectedTag = '全部';
      this.selectedDifficulty = '全部';
      this.selectedPace = '全部';
      this.selectedRisk = '全部';
      this.selectedStage = '全部';
      this.selectedId = (this.types[0] && this.types[0].id) || '';
      if (this.$router) this.$router.replace({ path: '/female-types', query: this.selectedId ? { type: this.selectedId } : {} });
    },
    scrollToFinder() {
      const el = document.getElementById('type-finder');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    scrollToDetail() {
      const el = document.getElementById('type-detail');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};
