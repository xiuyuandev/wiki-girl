/* 应急手册工具页 — v2 升级版：紧急程度筛选、搜索、收藏、复制话术、应急模式 */
window.EmergencyView = {
  template: `
    <div class="emergency-shell">
      <!-- ═══════ HERO 区 ═══════ -->
      <section class="emergency-hero">
        <div class="emergency-hero__kicker">Emergency Toolkit</div>
        <h1 class="emergency-hero__title">场景应急手册</h1>
        <p class="emergency-hero__subtitle">临场先稳住：不连环追问、不用情绪逼答案、不越界。先选高频问题，再进入 300 条旧场景正文。</p>

        <div class="emergency-hero__actions">
          <button class="emergency-btn emergency-btn--panic" @click="openPanicMode">
            <span class="emergency-btn__icon">🚨</span>
            <span>我现在就要用</span>
          </button>
          <button class="emergency-btn" :class="{ 'emergency-btn--fav': favorite }" @click="toggleFav">
            <span>{{ favorite ? '⭐ 已收藏应急手册' : '☆ 收藏应急手册' }}</span>
          </button>
        </div>

        <div class="emergency-hero__stats">
          <div><strong>{{ quickCards.length }}</strong><span>高频场景</span></div>
          <div><strong>300</strong><span>完整场景</span></div>
          <div><strong>{{ groups.length }}</strong><span>分组入口</span></div>
        </div>

        <div class="emergency-hero__search">
          <span class="emergency-hero__search-icon">⌕</span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索场景标题、话术、内心OS..."
            @keydown.esc="searchQuery = ''"
          />
          <button v-if="searchQuery" class="emergency-hero__search-clear" @click="searchQuery = ''">✕</button>
        </div>
      </section>

      <!-- ═══════ 紧急程度筛选 ═══════ -->
      <section class="emergency-urgency">
        <button
          v-for="u in urgencyFilters"
          :key="u.key"
          :class="['emergency-urgency__btn', 'emergency-urgency__btn--' + u.key, { active: currentUrgency === u.key }]"
          @click="currentUrgency = u.key"
        >
          <span class="emergency-urgency__dot">{{ u.icon }}</span>
          <span>{{ u.label }}</span>
          <span class="emergency-urgency__count">{{ u.count }}</span>
        </button>
      </section>

      <!-- ═══════ 分类筛选 ═══════ -->
      <section class="emergency-category">
        <button
          v-for="f in filters"
          :key="f"
          :class="{ active: currentCategory === f }"
          @click="currentCategory = f"
        >{{ f }}</button>
      </section>

      <!-- ═══════ 应急卡片网格 ═══════ -->
      <section class="emergency-grid">
        <article
          v-for="card in filteredCards"
          :key="card.id"
          class="emergency-card"
          :class="'emergency-card--' + normalizeUrgency(card.urgency)"
        >
          <!-- 卡片头部 -->
          <div class="emergency-card__head">
            <div class="emergency-card__meta">
              <span class="emergency-card__category">{{ card.category }}</span>
              <span class="emergency-card__level" :class="'emergency-card__level--' + normalizeUrgency(card.urgency)">
                {{ urgencyLabel(card.urgency) }}
              </span>
            </div>
            <button
              class="emergency-card__fav"
              :class="{ active: isCardFav(card.id) }"
              @click="toggleCardFav(card)"
              :title="isCardFav(card.id) ? '取消收藏' : '收藏场景'"
            >
              {{ isCardFav(card.id) ? '⭐' : '☆' }}
            </button>
          </div>

          <h2 class="emergency-card__title">{{ card.title }}</h2>

          <!-- 先别做 -->
          <div class="emergency-card__section emergency-card__section--dont">
            <h3><span class="emergency-card__icon">✕</span>先别做</h3>
            <ul>
              <li v-for="(x, i) in card.dont" :key="'d'+i">{{ x }}</li>
            </ul>
          </div>

          <!-- 更稳的动作 -->
          <div class="emergency-card__section emergency-card__section--do">
            <h3><span class="emergency-card__icon">✓</span>更稳的动作</h3>
            <ul>
              <li v-for="(x, i) in card.do" :key="'o'+i">{{ x }}</li>
            </ul>
          </div>

          <!-- 话术列表 -->
          <div class="emergency-card__scripts">
            <h3>💬 可用话术</h3>
            <div
              v-for="(s, i) in (card.scripts || [{text: card.script}])"
              :key="'s'+i"
              class="emergency-script"
            >
              <p class="emergency-script__text">{{ s.text }}</p>
              <div v-if="s.when" class="emergency-script__when">{{ s.when }}</div>
              <div v-if="s.note" class="emergency-script__note">{{ s.note }}</div>
            </div>
          </div>

          <!-- 展开区：她还是不理我怎么办 -->
          <div v-if="card.ifStillNoReply" class="emergency-card__expand">
            <button class="emergency-card__expand-toggle" @click="toggleExpand(card.id)">
              <span>她还是不理我怎么办？</span>
              <span class="emergency-card__expand-arrow" :class="{ open: expanded[card.id] }">▼</span>
            </button>
            <div v-show="expanded[card.id]" class="emergency-card__expand-body">
              <p>{{ card.ifStillNoReply }}</p>
            </div>
          </div>

          <!-- 内心OS -->
          <div v-if="card.innerOS" class="emergency-card__inneros">
            💭 {{ card.innerOS }}
          </div>

          <!-- 底部链接 -->
          <router-link :to="'/a/' + card.articleId" class="emergency-card__link">
            查看对应 30 条场景 →
          </router-link>
        </article>

        <!-- 空状态 -->
        <div v-if="filteredCards.length === 0" class="emergency-empty">
          <div class="emergency-empty__icon">🔍</div>
          <p>没有找到匹配的场景</p>
          <button class="emergency-btn" @click="resetFilters">清除筛选</button>
        </div>
      </section>

      <!-- ═══════ 300 场景分组 ═══════ -->
      <section class="emergency-section">
        <div class="emergency-section__head">
          <span>All Scenarios</span>
          <h2>300 条应急场景分组</h2>
        </div>
        <div class="emergency-groups">
          <router-link
            v-for="g in groups"
            :key="g.articleId"
            :to="'/a/' + g.articleId"
            class="emergency-group"
          >
            <strong>{{ g.title }}</strong>
            <p>{{ g.summary }}</p>
          </router-link>
        </div>
      </section>

      <!-- ═══════ 应急模式全屏遮罩 ═══════ -->
      <transition name="emergency-fade">
        <div v-if="panicMode" class="emergency-panic" @click.self="closePanicMode">
          <div class="emergency-panic__header">
            <h2>🚨 应急模式</h2>
            <p>只显示「现在就要用」的紧急场景，话术已放大</p>
            <button class="emergency-panic__close" @click="closePanicMode">✕ 关闭</button>
          </div>

          <div class="emergency-panic__list">
            <div
              v-for="card in panicCards"
              :key="card.id"
              class="emergency-panic__card"
            >
              <div class="emergency-panic__card-title">{{ card.title }}</div>
              <div class="emergency-panic__scripts">
                <div
                  v-for="(s, i) in (card.scripts || [{text: card.script}])"
                  :key="i"
                  class="emergency-panic__script"
                >
                  <span class="emergency-panic__script-text">{{ s.text }}</span>
                </div>
              </div>
              <div class="emergency-panic__dont">
                <strong>先别做：</strong>{{ (card.dont || []).join('、') }}
              </div>
            </div>
          </div>
        </div>
      </transition>


    </div>
  `,

  data() {
    return {
      filters: window.EMERGENCY_TOOLKIT.filters,
      quickCards: window.EMERGENCY_TOOLKIT.quickCards || [],
      groups: window.EMERGENCY_TOOLKIT.groups || [],
      currentCategory: '全部',
      currentUrgency: 'all',
      searchQuery: '',
      favorite: false,
      cardFavorites: {},
      expanded: {},
      panicMode: false,
      copiedId: null,
      showToast: false,
      toastMsg: '',
      toastTimer: null,
      copyTimer: null
    };
  },

  computed: {
    urgencyFilters() {
      const counts = { red: 0, yellow: 0, green: 0 };
      this.quickCards.forEach(c => {
        const u = this.normalizeUrgency(c.urgency);
        if (counts[u] !== undefined) counts[u]++;
      });
      return [
        { key: 'all', label: '全部紧急度', icon: '●', count: this.quickCards.length },
        { key: 'red', label: '现在就要用', icon: '🔴', count: counts.red },
        { key: 'yellow', label: '今晚处理', icon: '🟡', count: counts.yellow },
        { key: 'green', label: '明天再说', icon: '🟢', count: counts.green }
      ];
    },

    filteredCards() {
      let list = this.quickCards;

      // 分类筛选
      if (this.currentCategory !== '全部') {
        list = list.filter(c => c.category === this.currentCategory);
      }

      // 紧急度筛选
      if (this.currentUrgency !== 'all') {
        list = list.filter(c => this.normalizeUrgency(c.urgency) === this.currentUrgency);
      }

      // 搜索
      const q = this.searchQuery.trim().toLowerCase();
      if (q) {
        list = list.filter(c => {
          const inTitle = (c.title || '').toLowerCase().includes(q);
          const inCategory = (c.category || '').toLowerCase().includes(q);
          const inDont = (c.dont || []).some(x => x.toLowerCase().includes(q));
          const inDo = (c.do || []).some(x => x.toLowerCase().includes(q));
          const inScripts = (c.scripts || [{ text: c.script }]).some(s => (s.text || '').toLowerCase().includes(q));
          const inNote = (c.scripts || []).some(s => ((s.note || '') + (s.when || '')).toLowerCase().includes(q));
          const inInner = (c.innerOS || '').toLowerCase().includes(q);
          const inIfStill = (c.ifStillNoReply || '').toLowerCase().includes(q);
          return inTitle || inCategory || inDont || inDo || inScripts || inNote || inInner || inIfStill;
        });
      }

      return list;
    },

    panicCards() {
      return this.quickCards.filter(c => this.normalizeUrgency(c.urgency) === 'red');
    }
  },

  mounted() {
    this.favorite = window.WikiUserState && window.WikiUserState.isFavorite('route:/emergency');
    this.loadCardFavorites();
    document.addEventListener('keydown', this.onKeydown);
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    if (this.copyTimer) clearTimeout(this.copyTimer);
  },

  methods: {
    normalizeUrgency(u) {
      if (!u) return 'green';
      const s = String(u).toLowerCase().replace(/[\s\uFE0F]/g, '');
      if (s.includes('red') || s.includes('🔴') || s.includes('现在就要用')) return 'red';
      if (s.includes('yellow') || s.includes('🟡') || s.includes('今晚')) return 'yellow';
      if (s.includes('green') || s.includes('🟢') || s.includes('明天')) return 'green';
      return 'green';
    },

    urgencyLabel(u) {
      const map = {
        red: '🔴 现在就要用',
        yellow: '🟡 今晚处理',
        green: '🟢 明天再说',
        '🔴现在就要用': '🔴 现在就要用',
        '🟡今晚用': '🟡 今晚处理',
        '🟢明天再说': '🟢 明天再说'
      };
      return map[u] || map[this.normalizeUrgency(u)] || map.green;
    },

    toggleFav() {
      if (window.WikiUserState) {
        this.favorite = window.WikiUserState.toggleFavorite({
          key: 'route:/emergency',
          path: '/emergency',
          title: '场景应急手册',
          type: '工具页'
        });
      }
    },

    loadCardFavorites() {
      try {
        const raw = localStorage.getItem('wikiEmergencyCardFavs');
        if (raw) this.cardFavorites = JSON.parse(raw);
      } catch (e) {
        this.cardFavorites = {};
      }
    },

    saveCardFavorites() {
      try {
        localStorage.setItem('wikiEmergencyCardFavs', JSON.stringify(this.cardFavorites));
      } catch (e) {}
    },

    isCardFav(id) {
      return !!this.cardFavorites[id];
    },

    toggleCardFav(card) {
      if (this.cardFavorites[card.id]) {
        delete this.cardFavorites[card.id];
      } else {
        this.cardFavorites[card.id] = {
          id: card.id,
          title: card.title,
          category: card.category,
          at: Date.now()
        };
      }
      this.saveCardFavorites();
    },

    toggleExpand(id) {
      this.expanded[id] = !this.expanded[id];
    },

    openPanicMode() {
      this.panicMode = true;
      document.body.style.overflow = 'hidden';
    },

    closePanicMode() {
      this.panicMode = false;
      document.body.style.overflow = '';
    },

    onKeydown(e) {
      if (e.key === 'Escape') {
        if (this.panicMode) this.closePanicMode();
        else if (this.searchQuery) this.searchQuery = '';
      }
    },

    async copyText(text, id) {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        // 降级方案
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      this.copiedId = id;
      this.showToastMsg('已复制到剪贴板');
      if (this.copyTimer) clearTimeout(this.copyTimer);
      this.copyTimer = setTimeout(() => { this.copiedId = null; }, 2000);
    },

    showToastMsg(msg) {
      this.toastMsg = msg;
      this.showToast = true;
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => { this.showToast = false; }, 2000);
    },

    resetFilters() {
      this.currentCategory = '全部';
      this.currentUrgency = 'all';
      this.searchQuery = '';
    }
  }
};
