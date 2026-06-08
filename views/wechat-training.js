/* 微信聊天训练场 - 沉浸式对话模拟 + 案例卡片 */
window.WechatTrainingView = {
  template: `
    <div class="wechat-training">
      <!-- Hero -->
      <section class="wechat-training__hero">
        <span>Wechat Training Console</span>
        <h1>微信聊天训练场</h1>
        <p>10 个真实对话场景，像玩游戏一样练习微信聊天。每个选择都有即时反馈，练出直觉。</p>
        <div class="wechat-training__hero-actions">
          <button class="wiki-btn wiki-btn--primary" @click="scrollToScenarios">开始训练</button>
          <button class="wiki-btn" @click="toggleFav">{{ favorite ? '已收藏' : '收藏训练场' }}</button>
        </div>
      </section>

      <!-- 统计 -->
      <section class="wechat-training__stats">
        <div><b>{{ scenarios.length }}</b><span>对话场景</span></div>
        <div><b>{{ completedCount }}</b><span>已完成</span></div>
        <div><b>{{ totalScore }}</b><span>累计得分</span></div>
        <div><b>{{ avgScore }}</b><span>平均分</span></div>
      </section>

      <!-- 模式切换 -->
      <section class="wechat-training__tabs">
        <button :class="{ active: mode === 'simulator' }" @click="mode = 'simulator'">🎮 对话模拟</button>
        <button :class="{ active: mode === 'cards' }" @click="mode = 'cards'">📚 案例卡片 (200条)</button>
      </section>

      <!-- 对话模拟模式 -->
      <template v-if="mode === 'simulator'">
        <!-- 场景列表 -->
        <section v-if="simMode === 'list'" class="wechat-training__scenarios" id="scenarios">
          <div class="wechat-training__filters">
            <label>难度</label>
            <button v-for="d in difficultyFilters" :key="d" :class="{ active: currentDifficulty === d }" @click="currentDifficulty = d">{{ d }}</button>
          </div>
          <div class="wechat-training__scenario-grid">
            <article v-for="s in filteredScenarios" :key="s.id" :class="['wechat-training__scenario-card', 'wechat-training__scenario-card--' + s.difficulty]" @click="startScenario(s.id)">
              <div class="wechat-training__scenario-top">
                <span class="wechat-training__scenario-avatar">{{ s.avatar || '👤' }}</span>
                <span class="wechat-training__scenario-difficulty" :data-level="s.difficulty">{{ s.difficulty === 'easy' ? '简单' : s.difficulty === 'medium' ? '中等' : '困难' }}</span>
              </div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.context }}</p>
              <div class="wechat-training__scenario-tags">
                <em v-for="tag in s.tags" :key="tag">{{ tag }}</em>
              </div>
              <div class="wechat-training__scenario-meta">
                <span>{{ s.completedCount }} 人已完成</span>
                <span v-if="isCompleted(s.id)" class="wechat-training__scenario-done">✓ 已完成</span>
              </div>
            </article>
          </div>
        </section>

        <!-- 聊天界面 -->
        <section v-if="simMode === 'chat'" class="wechat-sim">
          <div class="wechat-sim__header">
            <button class="wechat-sim__header-back" @click="exitChat">←</button>
            <span class="wechat-sim__header-avatar">{{ currentScene.avatar }}</span>
            <span class="wechat-sim__header-name">{{ currentScene.girlName }}</span>
            <span class="wechat-sim__header-score">{{ currentScore }}分</span>
          </div>
          <div class="wechat-sim__chat" ref="chatArea">
            <div v-for="msg in chatMessages" :key="msg.id" :class="['wechat-sim__msg', 'wechat-sim__msg--' + msg.sender]">
              <div v-if="msg.sender === 'girl'" class="wechat-sim__avatar">{{ currentScene.avatar }}</div>
              <div :class="['wechat-sim__bubble', 'wechat-sim__bubble--' + msg.sender, msg.type === 'time' ? 'wechat-sim__bubble--time' : '']">
                <template v-if="msg.type === 'image'">[图片]</template>
                <template v-else>{{ msg.content }}</template>
              </div>
            </div>
          </div>
          <div class="wechat-sim__choices">
            <p class="wechat-sim__choices-label">选择你的回复：</p>
            <button v-for="choice in currentChoices" :key="choice.id" class="wechat-sim__choice-btn" @click="sendChoice(choice)">
              {{ choice.text }}
            </button>
          </div>
        </section>

        <!-- 反馈弹窗 -->
        <div v-if="showFeedback" class="wechat-sim__feedback" @click.self="closeFeedback">
          <div :class="['wechat-sim__feedback-box', 'wechat-sim__feedback-box--' + feedbackData.type]">
            <div class="wechat-sim__feedback-score">{{ feedbackData.score > 0 ? '+' + feedbackData.score : feedbackData.score }}</div>
            <div class="wechat-sim__feedback-text">{{ feedbackData.text }}</div>
            <div class="wechat-sim__feedback-tip">
              <b>💡 技巧：</b>{{ feedbackData.tip }}
            </div>
            <button class="wiki-btn wiki-btn--primary" @click="closeFeedback">继续</button>
          </div>
        </div>

        <!-- 结局 -->
        <section v-if="simMode === 'result'" class="wechat-sim__result" :class="'wechat-sim__result--' + resultData.level">
          <div class="wechat-sim__result-emoji">{{ resultData.emoji }}</div>
          <h2>{{ resultData.title }}</h2>
          <p>{{ resultData.desc }}</p>
          <div class="wechat-sim__result-score">
            <b>本次得分：{{ currentScore }}</b>
            <span>历史最高：{{ getBestScore(currentScene.id) }}</span>
          </div>
          <div class="wechat-sim__result-actions">
            <button class="wiki-btn wiki-btn--primary" @click="restartScenario">再练一次</button>
            <button class="wiki-btn" @click="simMode = 'list'">返回列表</button>
          </div>
        </section>
      </template>

      <!-- 案例卡片模式 -->
      <template v-if="mode === 'cards'">
        <section class="wechat-training__cards-panel">
          <div class="wechat-training__filters">
            <label>专题</label>
            <button v-for="m in moduleFilters" :key="m.id" :class="{ active: currentModule === m.id }" @click="currentModule = m.id">{{ m.name }}</button>
          </div>
          <div class="wechat-training__filters">
            <label>阶段</label>
            <button v-for="s in stageFilters" :key="s" :class="{ active: currentStage === s }" @click="currentStage = s">{{ s }}</button>
          </div>
          <div class="wechat-training__search">
            <input v-model.trim="keyword" type="search" placeholder="搜索：开场、慢回、已读不回、朋友圈、情绪、邀约、相亲、拒绝...">
            <button v-if="hasFilters" @click="resetFilters">清空筛选</button>
          </div>
        </section>
        <section class="wechat-training__card-grid">
          <article v-for="item in visibleItems" :key="item.num" class="wechat-training__card">
            <div class="wechat-training__card-top"><b>#{{ item.num }}</b><span>{{ item.category }}</span></div>
            <h3>{{ item.scene }}</h3>
            <p class="wechat-training__card-signal"><strong>她的信号：</strong>{{ item.girlSignal }}</p>
            <div class="wechat-training__card-compare">
              <div class="wechat-training__card-wrong"><b>❌ 错误</b><p>{{ item.wrongMessage }}</p></div>
              <div class="wechat-training__card-better"><b>✅ 更好</b><p>{{ item.betterMessage }}</p></div>
            </div>
            <dl class="wechat-training__card-dl">
              <div><dt>为什么更好</dt><dd>{{ item.whyBetter }}</dd></div>
              <div><dt>下一步</dt><dd>{{ item.nextMove }}</dd></div>
              <div><dt>别踩雷</dt><dd>{{ item.avoid }}</dd></div>
            </dl>
            <div class="wechat-training__card-flags">
              <span class="wechat-training__card-flag--green">🟢 {{ item.greenFlag }}</span>
              <span class="wechat-training__card-flag--yellow">🟡 {{ item.yellowFlag }}</span>
              <span class="wechat-training__card-flag--red">🔴 {{ item.redFlag }}</span>
            </div>
            <blockquote class="wechat-training__card-copy">{{ item.copyScript }}</blockquote>
            <p class="wechat-training__card-review"><strong>复盘：</strong>{{ item.reviewQuestion }}</p>
            <div class="wechat-training__card-actions">
              <router-link :to="'/a/' + item.articleId + '#wechat-' + item.num" class="wiki-btn">深读 →</router-link>
            </div>
          </article>
        </section>
        <div v-if="filteredItems.length > visibleItems.length" class="wechat-training__load-more">
          <button class="wiki-btn" @click="limit += 24">再显示 24 条</button>
        </div>
        <section v-if="!filteredItems.length" class="wechat-training__empty">没有匹配训练，试试清空筛选或换一个关键词。</section>
      </template>

      <!-- Toast -->
      <transition name="wechat-training__fade">
        <div v-if="toast.show" class="wechat-training__toast">{{ toast.text }}</div>
      </transition>
    </div>
  `,

  data() {
    const simData = window.WECHAT_SIMULATOR || { scenarios: [], getSceneData: () => null };
    const cardData = window.WECHAT_TRAINING || { modules: [], items: [] };
    return {
      mode: 'simulator',
      // 模拟器状态
      simMode: 'list',
      currentScene: null,
      chatMessages: [],
      currentChoices: [],
      currentScore: 0,
      showFeedback: false,
      feedbackData: { score: 0, text: '', tip: '', type: 'green' },
      resultData: { level: 'neutral', title: '', desc: '', emoji: '' },
      scenarios: simData.scenarios || [],
      currentDifficulty: '全部',
      completedScenarios: JSON.parse(localStorage.getItem('wechat_completed') || '[]'),
      bestScores: JSON.parse(localStorage.getItem('wechat_best_scores') || '{}'),
      // 卡片状态
      modules: cardData.modules || [],
      items: cardData.items || [],
      currentModule: '全部',
      currentStage: '全部',
      keyword: '',
      limit: 36,
      favorite: false,
      toast: { show: false, text: '' }
    };
  },

  computed: {
    difficultyFilters() { return ['全部', '简单', '中等', '困难']; },
    filteredScenarios() {
      if (this.currentDifficulty === '全部') return this.scenarios;
      const map = { '简单': 'easy', '中等': 'medium', '困难': 'hard' };
      return this.scenarios.filter(s => s.difficulty === map[this.currentDifficulty]);
    },
    completedCount() { return this.completedScenarios.length; },
    totalScore() {
      return Object.values(this.bestScores).reduce((a, b) => a + Math.max(0, b), 0);
    },
    avgScore() {
      const keys = Object.keys(this.bestScores);
      if (!keys.length) return 0;
      return Math.round(this.totalScore / keys.length);
    },
    moduleFilters() {
      return [{ id: '全部', name: '全部' }].concat(this.modules.map(m => ({ id: m.id, name: m.shortTitle })));
    },
    stageFilters() {
      return ['全部'].concat(Array.from(new Set(this.items.map(item => item.stage))).filter(Boolean));
    },
    filteredItems() {
      const tokens = this.keyword.toLowerCase().split(/[\s,，、]+/).filter(Boolean);
      return this.items.filter(item => {
        const okModule = this.currentModule === '全部' || item.articleId === this.currentModule;
        const okStage = this.currentStage === '全部' || item.stage === this.currentStage;
        const haystack = [item.scene, item.category, item.stage, item.girlSignal, item.wrongMessage, item.betterMessage, item.whyBetter, item.nextMove, item.avoid, item.greenFlag, item.yellowFlag, item.redFlag].join(' ').toLowerCase();
        const okKeyword = !tokens.length || tokens.every(token => haystack.indexOf(token) >= 0);
        return okModule && okStage && okKeyword;
      });
    },
    visibleItems() { return this.filteredItems.slice(0, this.limit); },
    hasFilters() { return this.currentModule !== '全部' || this.currentStage !== '全部' || !!this.keyword; }
  },

  watch: {
    currentModule() { this.limit = 36; },
    currentStage() { this.limit = 36; },
    keyword() { this.limit = 36; }
  },

  mounted() {
    this.favorite = window.WikiUserState && window.WikiUserState.isFavorite('route:/wechat-training');
  },

  methods: {
    scrollToScenarios() {
      const el = document.getElementById('scenarios');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    isCompleted(id) { return this.completedScenarios.includes(id); },
    getBestScore(id) { return this.bestScores[id] || 0; },

    startScenario(id) {
      const sim = window.WECHAT_SIMULATOR;
      if (!sim) return;
      const scene = sim.getSceneData(id);
      if (!scene) return;
      this.currentScene = scene;
      this.currentScore = 0;
      this.chatMessages = [];
      this.simMode = 'chat';

      // 加载初始消息
      scene.startChoices.forEach(choiceId => {
        const choice = scene.choices[choiceId];
        if (choice && choice.girlReplyId) {
          const msg = scene.messages[choice.girlReplyId];
          if (msg && !this.chatMessages.find(m => m.id === msg.id)) {
            this.chatMessages.push(msg);
          }
        }
      });

      // 设置初始选项
      this.currentChoices = scene.startChoices.map(cid => scene.choices[cid]).filter(Boolean);
      this.$nextTick(() => this.scrollChat());
    },

    sendChoice(choice) {
      // 添加我的消息
      this.chatMessages.push({
        id: 'me-' + choice.id,
        sender: 'me',
        type: 'text',
        content: choice.text,
        timestamp: ''
      });

      // 显示反馈
      this.feedbackData = {
        score: choice.score,
        text: choice.feedback,
        tip: choice.tip,
        type: choice.feedbackType
      };
      this.currentScore += choice.score;
      this.showFeedback = true;

      // 保存选择
      this.pendingChoice = choice;
      this.$nextTick(() => this.scrollChat());
    },

    closeFeedback() {
      this.showFeedback = false;
      const choice = this.pendingChoice;
      if (!choice) return;

      const scene = this.currentScene;

      // 添加女生回复
      if (choice.girlReplyId && scene.messages[choice.girlReplyId]) {
        const reply = scene.messages[choice.girlReplyId];
        if (!this.chatMessages.find(m => m.id === reply.id)) {
          this.chatMessages.push(reply);
        }
      }

      // 检查是否结束
      if (!choice.nextChoices || !choice.nextChoices.length) {
        this.endScenario();
        return;
      }

      // 设置下一轮选项
      this.currentChoices = choice.nextChoices.map(cid => scene.choices[cid]).filter(Boolean);
      this.pendingChoice = null;
      this.$nextTick(() => this.scrollChat());
    },

    endScenario() {
      const scene = this.currentScene;
      const endings = scene.endings;
      let result = endings.bad;
      if (this.currentScore >= endings.excellent.min) result = endings.excellent;
      else if (this.currentScore >= endings.good.min) result = endings.good;
      else if (this.currentScore >= endings.neutral.min) result = endings.neutral;

      this.resultData = {
        level: result === endings.excellent ? 'excellent' : result === endings.good ? 'good' : result === endings.neutral ? 'neutral' : 'bad',
        title: result.title,
        desc: result.desc,
        emoji: result.emoji
      };

      // 保存进度
      if (!this.completedScenarios.includes(scene.id)) {
        this.completedScenarios.push(scene.id);
        localStorage.setItem('wechat_completed', JSON.stringify(this.completedScenarios));
      }
      const prevBest = this.bestScores[scene.id] || -999;
      if (this.currentScore > prevBest) {
        this.bestScores[scene.id] = this.currentScore;
        localStorage.setItem('wechat_best_scores', JSON.stringify(this.bestScores));
      }

      this.simMode = 'result';
    },

    restartScenario() {
      this.startScenario(this.currentScene.id);
    },

    exitChat() {
      this.simMode = 'list';
      this.currentScene = null;
      this.chatMessages = [];
      this.currentChoices = [];
      this.currentScore = 0;
    },

    scrollChat() {
      const area = this.$refs.chatArea;
      if (area) area.scrollTop = area.scrollHeight;
    },

    // 卡片模式方法
    resetFilters() {
      this.currentModule = '全部';
      this.currentStage = '全部';
      this.keyword = '';
      this.limit = 36;
    },

    copyText(text) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => this.showToast('已复制到剪贴板'));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        this.showToast('已复制到剪贴板');
      }
    },

    showToast(text) {
      this.toast = { show: true, text };
      setTimeout(() => { this.toast.show = false; }, 2000);
    },

    toggleFav() {
      if (!window.WikiUserState) return;
      this.favorite = window.WikiUserState.toggleFavorite({ key: 'route:/wechat-training', path: '/wechat-training', title: '微信聊天训练场', type: '工具页' });
    }
  }
};
