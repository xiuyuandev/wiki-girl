/* 信念改写训练仪表盘 */
window.BeliefTrainingView = {
  template: `
    <div class="belief-dashboard">
      <!-- Hero -->
      <section class="belief-dashboard__hero">
        <span>Belief Rewrite · 30天训练</span>
        <h1>信念改写训练场</h1>
        <p>不是喊口号，而是每天把"旧解释—旧行为—旧结果"改成"新解释—小动作—新证据"。30天，每天一个任务。</p>
        <div class="belief-dashboard__hero-actions">
          <button class="wiki-btn wiki-btn--primary" @click="scrollToToday">今日任务</button>
          <button class="wiki-btn" @click="showRewriteTool = true">旧信念改写器</button>
        </div>
      </section>

      <!-- 统计卡片 -->
      <section class="belief-dashboard__stats">
        <div><b>{{ stats.completedDays }}</b><span>已完成天数</span></div>
        <div><b>{{ stats.completionRate }}%</b><span>总进度</span></div>
        <div><b>{{ stats.streak }}</b><span>连续打卡</span></div>
        <div><b>{{ stats.avgScore }}</b><span>平均自评分</span></div>
      </section>

      <!-- 进度条 -->
      <section class="belief-dashboard__progress">
        <div class="belief-dashboard__progress-bar">
          <div class="belief-dashboard__progress-fill" :style="{ width: stats.completionRate + '%' }"></div>
        </div>
        <p>{{ stats.completedDays }} / 30 天 · 第 {{ stats.currentDay }} 天</p>
      </section>

      <!-- 今日任务 -->
      <section id="today-task" class="belief-dashboard__today" v-if="todayTask">
        <div class="belief-dashboard__today-header">
          <span class="belief-dashboard__day-badge">Day {{ todayTask.day }}</span>
          <span class="belief-dashboard__theme">{{ todayTask.theme }}</span>
        </div>
        <h3>{{ todayTask.task }}</h3>
        <p class="belief-dashboard__action">{{ todayTask.action }}</p>
        <p class="belief-dashboard__hint">💡 {{ todayTask.hint }}</p>
        <div class="belief-dashboard__today-actions">
          <button class="wiki-btn wiki-btn--primary" @click="completeToday" :disabled="isTodayCompleted">
            {{ isTodayCompleted ? '✓ 今日已完成' : '完成今日任务' }}
          </button>
          <router-link :to="'/a/' + todayTask.topic" class="wiki-btn">阅读相关文章 →</router-link>
        </div>
      </section>

      <section v-else class="belief-dashboard__today belief-dashboard__today--done">
        <h3>🎉 30天训练全部完成！</h3>
        <p>你已经完成了信念改写30天训练。真正的改变不是30天结束，而是这些动作已经成为你生活的一部分。</p>
        <button class="wiki-btn" @click="resetProgress">重新开始</button>
      </section>

      <!-- 每日复盘 -->
      <section class="belief-dashboard__review" v-if="todayTask && !showReviewForm">
        <h3>今日复盘</h3>
        <p v-if="!todayReview">完成任务后，花3分钟复盘今天的信念变化。</p>
        <div v-else class="belief-dashboard__review-summary">
          <p><strong>旧信念：</strong>{{ todayReview.old }}</p>
          <p><strong>证据动作：</strong>{{ todayReview.action }}</p>
          <p><strong>自评分：</strong>{{ todayReview.score }}/10</p>
        </div>
        <button class="wiki-btn" @click="showReviewForm = true">
          {{ todayReview ? '修改复盘' : '写复盘' }}
        </button>
      </section>

      <section class="belief-dashboard__review-form" v-if="showReviewForm">
        <h3>今日复盘</h3>
        <div v-for="q in reviewQuestions" :key="q.id" class="belief-dashboard__review-field">
          <label>{{ q.label }}</label>
          <textarea v-model="reviewForm[q.id]" :placeholder="q.placeholder" rows="2"></textarea>
        </div>
        <div class="belief-dashboard__review-actions">
          <button class="wiki-btn wiki-btn--primary" @click="saveReview">保存复盘</button>
          <button class="wiki-btn" @click="showReviewForm = false">取消</button>
        </div>
      </section>

      <!-- 30天日历 -->
      <section class="belief-dashboard__calendar">
        <h3>30天训练日历</h3>
        <div class="belief-dashboard__calendar-grid">
          <article v-for="day in 30" :key="day"
            :class="[
              'belief-dashboard__calendar-day',
              isCompleted(day) ? 'belief-dashboard__calendar-day--done' : '',
              day === stats.currentDay ? 'belief-dashboard__calendar-day--current' : ''
            ]"
            @click="showDayDetail(day)"
          >
            <span>{{ day }}</span>
            <small v-if="plan[day-1]">{{ plan[day-1].theme }}</small>
          </article>
        </div>
      </section>

      <!-- 旧信念改写器弹窗 -->
      <div v-if="showRewriteTool" class="belief-dashboard__modal" @click.self="showRewriteTool = false">
        <div class="belief-dashboard__modal-box">
          <h3>旧信念改写器</h3>
          <div v-for="step in rewriteSteps" :key="step.id" class="belief-dashboard__rewrite-step">
            <label>{{ step.label }}</label>
            <textarea v-model="rewriteForm[step.id]" :placeholder="step.placeholder" rows="2"></textarea>
          </div>
          <div class="belief-dashboard__rewrite-result" v-if="rewriteComplete">
            <h4>你的新信念</h4>
            <p><strong>旧信念：</strong>{{ rewriteForm.catch }}</p>
            <p><strong>事实：</strong>{{ rewriteForm.separate }}</p>
            <p><strong>新信念：</strong>{{ rewriteForm.rewrite }}</p>
            <p><strong>证据动作：</strong>{{ rewriteForm.evidence }}</p>
          </div>
          <div class="belief-dashboard__modal-actions">
            <button class="wiki-btn wiki-btn--primary" @click="saveRewrite">保存</button>
            <button class="wiki-btn" @click="showRewriteTool = false">关闭</button>
          </div>
        </div>
      </div>

      <!-- 日详情弹窗 -->
      <div v-if="dayDetail" class="belief-dashboard__modal" @click.self="dayDetail = null">
        <div class="belief-dashboard__modal-box">
          <h3>Day {{ dayDetail.day }} · {{ dayDetail.theme }}</h3>
          <p><strong>任务：</strong>{{ dayDetail.task }}</p>
          <p><strong>行动：</strong>{{ dayDetail.action }}</p>
          <p><strong>提示：</strong>{{ dayDetail.hint }}</p>
          <div v-if="dayReview" class="belief-dashboard__review-summary">
            <h4>当日复盘</h4>
            <p><strong>旧信念：</strong>{{ dayReview.old }}</p>
            <p><strong>事实：</strong>{{ dayReview.fact }}</p>
            <p><strong>新解释：</strong>{{ dayReview.new }}</p>
            <p><strong>证据动作：</strong>{{ dayReview.action }}</p>
            <p><strong>自评分：</strong>{{ dayReview.score }}/10</p>
          </div>
          <div class="belief-dashboard__modal-actions">
            <button v-if="!isCompleted(dayDetail.day)" class="wiki-btn wiki-btn--primary" @click="completeDay(dayDetail.day); dayDetail = null;">标记完成</button>
            <router-link :to="'/a/' + dayDetail.topic" class="wiki-btn">阅读文章 →</router-link>
            <button class="wiki-btn" @click="dayDetail = null">关闭</button>
          </div>
        </div>
      </div>
    </div>
  `,

  data() {
    const training = window.BELIEF_TRAINING || {};
    return {
      plan: training.plan || [],
      reviewQuestions: (training.reviewTemplate || {}).questions || [],
      rewriteSteps: (training.rewriteTool || {}).steps || [],
      stats: training.getStats ? training.getStats() : { completedDays: 0, completionRate: 0, streak: 0, avgScore: 0, currentDay: 1 },
      todayTask: training.getTodayTask ? training.getTodayTask() : null,
      isTodayCompleted: false,
      showReviewForm: false,
      showRewriteTool: false,
      dayDetail: null,
      reviewForm: { old: '', fact: '', new: '', action: '', score: '' },
      rewriteForm: { catch: '', separate: '', rewrite: '', evidence: '' },
      todayReview: null,
      dayReview: null
    };
  },

  computed: {
    rewriteComplete() {
      return this.rewriteForm.catch && this.rewriteForm.separate && this.rewriteForm.rewrite && this.rewriteForm.evidence;
    }
  },

  mounted() {
    this.refreshData();
  },

  methods: {
    refreshData() {
      const training = window.BELIEF_TRAINING;
      if (!training) return;
      this.stats = training.getStats();
      this.todayTask = training.getTodayTask();
      this.isTodayCompleted = this.todayTask ? this.isCompleted(this.todayTask.day) : false;
      if (this.todayTask) {
        this.todayReview = training.getReview(this.todayTask.day);
      }
    },

    isCompleted(day) {
      const training = window.BELIEF_TRAINING;
      return training ? training.getCompletedDays().includes(day) : false;
    },

    completeToday() {
      const training = window.BELIEF_TRAINING;
      if (!training || !this.todayTask) return;
      training.markCompleted(this.todayTask.day);
      this.isTodayCompleted = true;
      this.refreshData();
    },

    completeDay(day) {
      const training = window.BELIEF_TRAINING;
      if (!training) return;
      training.markCompleted(day);
      this.refreshData();
    },

    saveReview() {
      const training = window.BELIEF_TRAINING;
      if (!training || !this.todayTask) return;
      training.saveReview(this.todayTask.day, { ...this.reviewForm });
      this.todayReview = training.getReview(this.todayTask.day);
      this.showReviewForm = false;
      this.refreshData();
    },

    saveRewrite() {
      try {
        const rewrites = JSON.parse(localStorage.getItem('belief_rewrites') || '[]');
        rewrites.push({ ...this.rewriteForm, date: new Date().toISOString() });
        localStorage.setItem('belief_rewrites', JSON.stringify(rewrites));
      } catch (e) {}
      this.rewriteForm = { catch: '', separate: '', rewrite: '', evidence: '' };
      this.showRewriteTool = false;
    },

    showDayDetail(day) {
      this.dayDetail = this.plan[day - 1] || null;
      if (this.dayDetail) {
        const training = window.BELIEF_TRAINING;
        this.dayReview = training ? training.getReview(day) : null;
      }
    },

    resetProgress() {
      if (!confirm('确定要重置所有进度吗？复盘记录也会被清除。')) return;
      localStorage.removeItem('belief_completed_days');
      localStorage.removeItem('belief_reviews');
      localStorage.removeItem('belief_rewrites');
      this.refreshData();
    },

    scrollToToday() {
      const el = document.getElementById('today-task');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
