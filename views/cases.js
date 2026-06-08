/* 案例库控制台 —— 升级视图组件 */
window.CasesView = {
  template: `
    <div class="wiki-cases-shell case-console">
      <!-- Hero -->
      <section class="wiki-cases-hero case-console-hero">
        <span>Case Training Console</span>
        <h1>真实案例库</h1>
        <p>200 个普通男性真实场景，按"问题—信号—动作—复盘"重写。先筛出你最常卡住的场景，再进入对应 20 个案例深读。</p>
        <div class="wiki-cases-hero__actions">
          <router-link to="/a/ch8" class="wiki-btn wiki-btn--primary">阅读案例库导读</router-link>
          <button class="wiki-btn" @click="toggleFav">{{ favorite ? '已收藏案例库' : '收藏案例库' }}</button>
        </div>
      </section>

      <!-- 学习进度 -->
      <section class="wiki-case-progress">
        <div class="wiki-case-progress__header">
          <h3>我的学习进度</h3>
          <span class="wiki-case-progress__summary">已读 {{ readCount }} / {{ cases.length }} 个案例 · 已收藏 {{ favCount }} 个案例</span>
        </div>
        <div class="wiki-case-progress__groups">
          <div v-for="g in groupProgress" :key="g.groupId" class="wiki-case-progress__bar">
            <div class="wiki-case-progress__label">
              <b>{{ g.title }}</b>
              <span>{{ g.read }} / {{ g.total }}</span>
            </div>
            <div class="wiki-case-progress__track">
              <div class="wiki-case-progress__fill" :style="{width: g.pct + '%'}"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- 统计 -->
      <section class="case-console-stats">
        <div><b>{{ cases.length }}</b><span>增强案例</span></div>
        <div><b>{{ groups.length }}</b><span>主题分组</span></div>
        <div><b>{{ filteredCases.length }}</b><span>当前匹配</span></div>
        <div><b>4</b><span>决策动作：推进 / 保持 / 降级 / 退出</span></div>
      </section>

      <!-- 学习路径 -->
      <section class="case-learning-paths">
        <button v-for="path in learningPaths" :key="path.issue" @click="applyIssue(path.issue)">
          <b>{{ path.title }}</b><span>{{ path.desc }}</span>
        </button>
      </section>

      <!-- 筛选面板 -->
      <section class="case-console-panel">
        <div class="case-filter-row">
          <label>大类</label>
          <button v-for="f in filters" :key="f" :class="{ active: current === f }" @click="current = f">{{ f }}</button>
        </div>
        <div class="case-filter-row">
          <label>阶段</label>
          <button v-for="s in stageFilters" :key="s" :class="{ active: currentStage === s }" @click="currentStage = s">{{ s }}</button>
        </div>
        <div class="case-filter-row">
          <label>结果</label>
          <button v-for="r in resultFilters" :key="r" :class="{ active: currentResult === r }" @click="currentResult = r">{{ r }}</button>
        </div>
        <div class="case-filter-row">
          <label>问题</label>
          <button v-for="i in issueFilters" :key="i" :class="{ active: currentIssue === i }" @click="currentIssue = i">{{ i }}</button>
        </div>
        <div class="case-search-line">
          <div class="case-search-box">
            <input v-model.trim="keyword" type="search" placeholder="搜索：冷场、职场、邀约、拒绝、礼貌、约会后..." @focus="searchFocus = true" @blur="onSearchBlur">
            <button v-if="keyword" class="case-search-clear" @click="keyword = ''">×</button>
          </div>
          <button v-if="hasFilters" @click="resetFilters">清空筛选</button>
        </div>
        <!-- 搜索历史 + 热门 -->
        <div v-if="searchFocus && !keyword" class="case-search-dropdown">
          <div v-if="searchHistory.length" class="case-search-section">
            <h4>搜索历史</h4>
            <div class="case-search-tags">
              <span v-for="h in searchHistory" :key="h" @click="keyword = h">{{ h }}</span>
            </div>
          </div>
          <div class="case-search-section">
            <h4>热门搜索</h4>
            <div class="case-search-tags">
              <span v-for="t in hotTags" :key="t" @click="keyword = t">{{ t }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 分组卡片 -->
      <section class="wiki-cases-grid case-group-grid">
        <article v-for="group in filteredGroups" :key="group.id" class="wiki-cases-card">
          <div class="wiki-cases-card__meta"><span>{{ group.category }}</span><b>{{ group.range }}</b></div>
          <h2>{{ group.title }}</h2>
          <p>{{ group.summary }}</p>
          <div class="wiki-chip-row"><span v-for="tag in group.focus" :key="tag">{{ tag }}</span></div>
          <router-link :to="'/a/' + group.articleId" class="wiki-card-link">进入这一组深读 →</router-link>
        </article>
      </section>

      <!-- 案例卡片 -->
      <section class="case-card-grid">
        <article v-for="item in visibleCases" :key="item.num" class="case-console-card" @click="openDetail(item)">
          <div class="case-console-card__top">
            <div class="case-console-card__scene">
              <span class="wiki-case-scene-icon">{{ sceneIcon(item.scene) }}</span>
              <b>#{{ item.num }}</b>
              <span class="case-console-card__scene-name">{{ item.scene }}</span>
            </div>
            <span :class="resultClass(item.result)">{{ item.result }}</span>
          </div>

          <h3 v-html="highlight(item.title)"></h3>

          <div class="case-console-card__profile">
            <span class="wiki-case-avatar">{{ avatarName(item.femaleProfile) }}</span>
            <span class="wiki-case-profile-text" v-html="highlight(item.femaleProfile)"></span>
          </div>

          <div class="case-console-card__compare">
            <div class="case-console-card__wrong">
              <dt>常见误区</dt>
              <dd v-html="highlight(item.wrongMove)"></dd>
            </div>
            <div class="case-console-card__right">
              <dt>更好动作</dt>
              <dd v-html="highlight(item.rightMove)"></dd>
            </div>
          </div>

          <div v-if="item.scripts && item.scripts.length" class="case-console-card__scripts">
            <div class="case-console-card__scripts-label">话术参考</div>
            <ul>
              <li v-for="(s, idx) in item.scripts.slice(0, 2)" :key="idx" v-html="highlight(s)"></li>
            </ul>
          </div>

          <div class="wiki-chip-row">
            <span>{{ item.group }}</span>
            <span>{{ item.stage }}</span>
            <span>{{ item.issue }}</span>
          </div>

          <div class="case-console-card__actions">
            <button class="wiki-case-btn-fav" :class="{ active: isCaseFav(item.num) }" @click.stop="toggleCaseFav(item)">
              {{ isCaseFav(item.num) ? '★ 已收藏' : '☆ 收藏' }}
            </button>
            <span class="wiki-case-read-badge" v-if="isCaseRead(item.num)">已读</span>
          </div>
        </article>
      </section>

      <!-- 加载更多 -->
      <div v-if="filteredCases.length > visibleCases.length" class="case-load-more">
        <button class="wiki-btn" @click="limit += 24">再显示 24 个案例</button>
      </div>
      <section v-if="!filteredCases.length" class="case-empty">没有匹配案例，试试清空筛选或换一个关键词。</section>

      <!-- 你可能也想看 -->
      <section v-if="recommendCases.length" class="wiki-case-recommend">
        <h3>你可能也想看</h3>
        <div class="case-card-grid case-card-grid--compact">
          <article v-for="item in recommendCases" :key="'rec-' + item.num" class="case-console-card" @click="openDetail(item)">
            <div class="case-console-card__top">
              <div class="case-console-card__scene">
                <span class="wiki-case-scene-icon">{{ sceneIcon(item.scene) }}</span>
                <b>#{{ item.num }}</b>
              </div>
              <span :class="resultClass(item.result)">{{ item.result }}</span>
            </div>
            <h3>{{ item.scene }}</h3>
            <p class="case-console-card__profile">{{ item.femaleProfile }}</p>
            <div class="wiki-chip-row"><span>{{ item.group }}</span><span>{{ item.issue }}</span></div>
          </article>
        </div>
      </section>

      <!-- 案例详情弹窗 -->
      <teleport to="body">
        <div v-if="detailCase" class="wiki-case-modal-overlay" @click.self="closeDetail">
          <div class="wiki-case-modal">
            <button class="wiki-case-modal__close" @click="closeDetail">×</button>
            <div class="wiki-case-modal__header">
              <div class="case-num-badge">{{ detailCase.num }}</div>
              <div class="wiki-case-modal__meta">
                <h2>{{ detailCase.scene }}</h2>
                <div class="case-meta-bar">
                  <span class="label label-scene">{{ detailCase.scene }}</span>
                  <span class="label label-girl">{{ detailCase.femaleProfile }}</span>
                  <span :class="'label label-result label-result--' + resultClassSuffix(detailCase.result)">{{ detailCase.result }}</span>
                </div>
              </div>
            </div>

            <div class="case-profile">
              <h4>真实背景</h4>
              <p><strong>男方状态：</strong>{{ detailCase.maleContext }}</p>
              <p><strong>女方画像：</strong>{{ detailCase.femaleProfile }}</p>
              <p><strong>核心阻力：</strong>{{ detailCase.conflict }}</p>
            </div>

            <div class="case-compare">
              <div><b>直男常见误区</b><p>{{ detailCase.wrongMove }}</p></div>
              <div><b>更成熟的动作</b><p>{{ detailCase.rightMove }}</p></div>
            </div>

            <div class="chat-block">
              <h4>真实对话节奏</h4>
              <p v-for="(line, idx) in detailCase.dialogue" :key="idx" :class="'chat-' + (line.who === '阿强' ? 'male' : 'female')">
                <strong>{{ line.who }}：</strong>{{ line.text }}
              </p>
            </div>

            <div class="case-analysis">
              <h4>反馈判断</h4>
              <p class="wiki-case-signal wiki-case-signal--green"><strong>绿灯：</strong>{{ detailCase.signals.green.join(' / ') }}</p>
              <p class="wiki-case-signal wiki-case-signal--yellow"><strong>黄灯：</strong>{{ detailCase.signals.yellow.join(' / ') }}</p>
              <p class="wiki-case-signal wiki-case-signal--red"><strong>红灯：</strong>{{ detailCase.signals.red.join(' / ') }}</p>
              <p><strong>决策规则：</strong>{{ detailCase.decisionRule }}</p>
              <p><strong>风险提醒：</strong>{{ detailCase.risk }}</p>
            </div>

            <div class="case-takeaway">
              <h4>话术参考</h4>
              <ul>
                <li v-for="(s, idx) in detailCase.scripts" :key="idx">{{ s }}</li>
              </ul>
            </div>

            <div class="case-takeaway case-takeaway--review">
              <h4>复盘问题</h4>
              <ol>
                <li v-for="(q, idx) in detailCase.reviewQuestions" :key="idx">{{ q }}</li>
              </ol>
            </div>

            <div class="wiki-case-modal__footer">
              <button class="wiki-btn" @click="closeDetail">关闭</button>
              <router-link :to="'/a/' + detailCase.articleId" class="wiki-btn wiki-btn--primary" @click="closeDetail">深读完整文章 →</router-link>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  `,

  data() {
    var lib = window.CASE_LIBRARY || { filters: ['全部'], groups: [] };
    var upgrade = window.CASE_UPGRADE || { cases: [], groups: [] };
    return {
      filters: lib.filters || ['全部'],
      groups: lib.groups || [],
      cases: upgrade.cases || [],
      current: '全部',
      currentStage: '全部',
      currentResult: '全部',
      currentIssue: '全部',
      keyword: '',
      favorite: false,
      limit: 36,
      searchFocus: false,
      detailCase: null,
      learningPaths: [
        { title: '我不会开场', issue: '不会自然开场', desc: '先练一句话破冰和主动收尾' },
        { title: '我分不清礼貌和好感', issue: '分不清礼貌和好感', desc: '用绿灯/黄灯/红灯判断' },
        { title: '我不会从工作聊到生活', issue: '不知道怎么从工作聊到生活', desc: '职场转场必须低压可拒绝' },
        { title: '冷场后我容易追问', issue: '冷场后容易追问', desc: '降频、轻修复、一次测试' },
        { title: '被拒后我会上头', issue: '被拒后容易上头', desc: '停止推进，体面退出' }
      ],
      hotTags: ['开场', '冷场', '职场', '邀约', '拒绝', '礼貌', '约会后', '微信', '边界', '兴趣'],
      searchHistory: []
    };
  },

  computed: {
    stageFilters() {
      return ['全部'].concat(Array.from(new Set(this.cases.map(c => c.stage))).filter(Boolean));
    },
    resultFilters() {
      return ['全部'].concat(Array.from(new Set(this.cases.map(c => c.result))).filter(Boolean));
    },
    issueFilters() {
      return ['全部'].concat(Array.from(new Set(this.cases.map(c => c.issue))).filter(Boolean));
    },
    filteredGroups() {
      return this.current === '全部' ? this.groups : this.groups.filter(g => g.category === this.current);
    },
    filteredCases() {
      var kw = this.keyword.toLowerCase();
      return this.cases.filter(c => {
        var okCategory = this.current === '全部' || c.category === this.current;
        var okStage = this.currentStage === '全部' || c.stage === this.currentStage;
        var okResult = this.currentResult === '全部' || c.result === this.currentResult;
        var okIssue = this.currentIssue === '全部' || c.issue === this.currentIssue;
        var haystack = [c.scene, c.title, c.group, c.stage, c.issue, c.result, c.femaleProfile, c.wrongMove, c.rightMove, c.decisionRule].join(' ').toLowerCase();
        var okKeyword = !kw || haystack.indexOf(kw) >= 0;
        return okCategory && okStage && okResult && okIssue && okKeyword;
      });
    },
    visibleCases() {
      return this.filteredCases.slice(0, this.limit);
    },
    hasFilters() {
      return this.current !== '全部' || this.currentStage !== '全部' || this.currentResult !== '全部' || this.currentIssue !== '全部' || !!this.keyword;
    },
    readCases() {
      var state = window.WikiUserState ? window.WikiUserState.getState() : {};
      return state.completed || {};
    },
    favCases() {
      var state = window.WikiUserState ? window.WikiUserState.getState() : {};
      return (state.favorites || []).filter(f => f.key && String(f.key).startsWith('case:')).map(f => {
        var m = String(f.key).match(/case:(\d+)/);
        return m ? parseInt(m[1], 10) : null;
      }).filter(Boolean);
    },
    readCount() {
      return Object.keys(this.readCases).length;
    },
    favCount() {
      return this.favCases.length;
    },
    groupProgress() {
      var self = this;
      return this.groups.map(function(g) {
        var groupCases = self.cases.filter(c => c.groupId === g.id);
        var total = groupCases.length;
        var read = groupCases.filter(c => self.isCaseRead(c.num)).length;
        return {
          groupId: g.id,
          title: g.title,
          total: total,
          read: read,
          pct: total ? Math.round((read / total) * 100) : 0
        };
      });
    },
    recommendCases() {
      if (!this.filteredCases.length) return [];
      var pool = this.cases.filter(c => !this.visibleCases.some(v => v.num === c.num));
      if (!pool.length) return [];
      var currentIssue = this.currentIssue !== '全部' ? this.currentIssue : null;
      var currentCategory = this.current !== '全部' ? this.current : null;
      var scored = pool.map(function(c) {
        var score = Math.random() * 2;
        if (currentIssue && c.issue === currentIssue) score += 5;
        if (currentCategory && c.category === currentCategory) score += 3;
        if (c.result === '成功') score += 1;
        return { case: c, score: score };
      });
      scored.sort(function(a, b) { return b.score - a.score; });
      return scored.slice(0, 3).map(function(s) { return s.case; });
    }
  },

  watch: {
    current() { this.limit = 36; },
    currentStage() { this.limit = 36; },
    currentResult() { this.limit = 36; },
    currentIssue() { this.limit = 36; },
    keyword(newVal, oldVal) {
      this.limit = 36;
      if (newVal && newVal !== oldVal) {
        this.addSearchHistory(newVal);
      }
    }
  },

  mounted() {
    this.favorite = window.WikiUserState && window.WikiUserState.isFavorite('route:/cases');
    this.loadSearchHistory();
  },

  methods: {
    applyIssue(issue) {
      this.keyword = issue;
      this.current = '全部';
      this.currentStage = '全部';
      this.currentResult = '全部';
      this.currentIssue = '全部';
    },
    resetFilters() {
      this.current = '全部';
      this.currentStage = '全部';
      this.currentResult = '全部';
      this.currentIssue = '全部';
      this.keyword = '';
      this.limit = 36;
    },
    resultClass(result) {
      return 'case-result case-result--' + String(result).replace(/\s+/g, '-');
    },
    resultClassSuffix(result) {
      return String(result).replace(/\s+/g, '-');
    },
    toggleFav() {
      if (!window.WikiUserState) return;
      this.favorite = window.WikiUserState.toggleFavorite({ key: 'route:/cases', path: '/cases', title: '真实案例库', type: '工具页' });
    },
    isCaseRead(num) {
      if (!window.WikiUserState) return false;
      var state = window.WikiUserState.getState();
      return !!(state.completed && state.completed['case:' + num]);
    },
    isCaseFav(num) {
      return this.favCases.indexOf(num) >= 0;
    },
    toggleCaseFav(item) {
      if (!window.WikiUserState) return;
      var key = 'case:' + item.num;
      var isFav = window.WikiUserState.toggleFavorite({
        key: key,
        path: '/cases',
        title: '案例 #' + item.num + ' · ' + item.scene,
        type: '案例'
      });
      this.$forceUpdate();
    },
    openDetail(item) {
      this.detailCase = item;
      document.body.style.overflow = 'hidden';
      this.recordRead(item.num);
    },
    closeDetail() {
      this.detailCase = null;
      document.body.style.overflow = '';
    },
    recordRead(num) {
      if (!window.WikiUserState) return;
      var key = 'case:' + num;
      window.WikiUserState.setProgress(key, 100);
    },
    copyScripts(scripts) {
      if (!scripts || !scripts.length) return;
      var text = scripts.join('\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function() {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    },
    highlight(text) {
      var kw = this.keyword.trim();
      if (!kw || !text) return this.escapeHtml(text);
      var re = new RegExp('(' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return this.escapeHtml(text).replace(re, '<mark class="wiki-case-highlight">$1</mark>');
    },
    escapeHtml(str) {
      return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    sceneIcon(scene) {
      var map = {
        '便利店': '🏪', '早餐': '🍜', '地铁': '🚇', '电梯': '🛗', '商场': '🏬',
        '宠物': '🐱', '社区': '🏘️', '书店': '📚', '健身': '🏋️', '水果': '🍊',
        '会议': '💼', '项目': '📊', '培训': '🎓', '沙龙': '🎤', '客户': '🤝',
        '团建': '🚌', '加班': '💻', '招聘': '📝', '签约': '✍️',
        '生日': '🎂', '桌游': '🎲', '羽毛球': '🏸', '读书会': '📖', '徒步': '🥾',
        '摄影': '📷', '烘焙': '🧁', '公益': '❤️', '剧本杀': '🎭', '旅行': '✈️',
        '微信': '💬', '朋友圈': '📱', '软件': '💘', '社群': '👥', '短视频': '🎬',
        '咖啡': '☕', '约会': '🌹', '餐厅': '🍽️', '电影': '🎬', '散步': '🚶',
        '拒绝': '🚫', '拉黑': '⛔', '送礼': '🎁', '喝酒': '🍺'
      };
      for (var k in map) {
        if (scene && scene.indexOf(k) >= 0) return map[k];
      }
      return '📌';
    },
    avatarName(profile) {
      if (!profile) return '?';
      var m = profile.match(/^(.+?)[，,]/);
      return m ? m[1].charAt(0) : profile.charAt(0);
    },
    loadSearchHistory() {
      try {
        var raw = localStorage.getItem('wikiCaseSearchHistory');
        this.searchHistory = raw ? JSON.parse(raw) : [];
      } catch (e) {
        this.searchHistory = [];
      }
    },
    addSearchHistory(kw) {
      if (!kw) return;
      var list = [kw].concat(this.searchHistory.filter(function(h) { return h !== kw; })).slice(0, 8);
      this.searchHistory = list;
      try { localStorage.setItem('wikiCaseSearchHistory', JSON.stringify(list)); } catch (e) {}
    },
    onSearchBlur() {
      var self = this;
      setTimeout(function() { self.searchFocus = false; }, 200);
    }
  }
};
