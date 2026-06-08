window.HomeView = {
  template: `
    <div class="wiki-super-home wiki-super-home--premium">
      <section class="wiki-super-hero wiki-super-hero--command">
        <div class="wiki-super-hero__glow wiki-super-hero__glow--one"></div>
        <div class="wiki-super-hero__glow wiki-super-hero__glow--two"></div>
        <div class="wiki-super-hero__content">
          <p class="wiki-eyebrow">Private Growth Command Center</p>
          <h1>把混乱问题，变成一套清晰的男性成长作战系统。</h1>
          <p class="wiki-super-hero__lead">
            从外在、聊天、约会、关系急救，到幸福训练与信念改写：先定位当前卡点，再进入最短路径训练。
          </p>
          <div class="wiki-super-search" :class="{ 'is-active': query }">
            <span class="wiki-super-search__icon">⌕</span>
            <input
              v-model="query"
              type="search"
              placeholder="搜索你现在的问题：不会聊天、邀约、冷淡、信念、复盘..."
              @keydown.enter="goSearch"
            />
            <button type="button" @click="goSearch">启动搜索</button>
          </div>
          <div v-if="query" class="wiki-super-search__results">
            <router-link
              v-for="item in searchResults"
              :key="item.path || item.id || item.to || item.title || item.name"
              :to="item.path || item.to || ('/a/' + item.id)"
              class="wiki-super-search__result"
            >
              <strong>{{ item.title || item.name }}</strong>
              <span>{{ item.excerpt || item.desc || '进入专栏阅读' }}</span>
            </router-link>
            <p v-if="!searchResults.length" class="wiki-muted">没有找到匹配结果，试试更短的关键词。</p>
          </div>
          <div class="wiki-super-hero__actions">
            <router-link to="/a/ch1" class="wiki-btn wiki-btn--primary">从第 1 章开始</router-link>
            <router-link to="/emergency" class="wiki-btn">先处理当下危机</router-link>
            <router-link to="/a/ch44" class="wiki-btn">升级底层信念</router-link>
          </div>
        </div>
        <aside class="wiki-super-hero__panel wiki-command-panel">
          <div class="wiki-orbit-card wiki-orbit-card--featured">
            <span>今日主线</span>
            <strong>{{ featuredEntry.name }}</strong>
            <p>{{ featuredEntry.desc || '从一个最关键的问题开始，持续推进。' }}</p>
            <router-link :to="featuredEntry.to || ('/a/' + featuredEntry.id)">进入训练 →</router-link>
          </div>
          <div class="wiki-command-stack">
            <router-link to="/emergency"><span>SOS</span><strong>场景急救</strong><small>不会回、冷场、失误修复</small></router-link>
            <router-link to="/female-types"><span>ATLAS</span><strong>女性图鉴</strong><small>识别类型与沟通策略</small></router-link>
            <router-link to="/universal-scripts"><span>SCRIPT</span><strong>万能话术</strong><small>破冰、升温、修复、退出</small></router-link>
          </div>
          <div class="wiki-super-stats">
            <div><strong>{{ totalColumns }}</strong><span>主题专栏</span></div>
            <div><strong>300</strong><span>应急场景</span></div>
            <div><strong>200</strong><span>真实案例</span></div>
          </div>
        </aside>
      </section>

      <section class="wiki-section wiki-home-dashboard wiki-home-dashboard--premium">
        <div class="wiki-section__head">
          <p class="wiki-eyebrow">Personal Console</p>
          <h2>继续区：从你的记录接着走</h2>
        </div>
        <div class="wiki-dashboard-grid">
          <article class="wiki-dashboard-card">
            <span class="wiki-card-kicker">Recent</span>
            <h3>最近阅读</h3>
            <p v-if="!recent.length">还没有阅读记录，建议先打开入门主线或关系急救。</p>
            <router-link v-for="item in recent" :key="item.id" :to="'\/a\/' + item.id">{{ item.title }}</router-link>
          </article>
          <article class="wiki-dashboard-card">
            <span class="wiki-card-kicker">Saved</span>
            <h3>收藏清单</h3>
            <p v-if="!favorites.length">收藏会显示在这里，适合反复复盘关键文章。</p>
            <router-link v-for="item in favorites" :key="item.id" :to="'\/a\/' + item.id">{{ item.title }}</router-link>
          </article>
          <article class="wiki-dashboard-card wiki-dashboard-card--accent">
            <span class="wiki-card-kicker">Start</span>
            <h3>不知道从哪开始？</h3>
            <p>先完成心态、外在、聊天、约会四步，再用案例和急救工具补洞。</p>
            <router-link to="/a/ch1">打开入门主线 →</router-link>
          </article>
        </div>
      </section>

      <section class="wiki-section wiki-premium-portals">
        <div class="wiki-section__head">
          <p class="wiki-eyebrow">Core Modules</p>
          <h2>核心模块矩阵</h2>
          <p>首页先给你最常用、最能解决问题的入口；复杂目录放到下方成长地图。</p>
        </div>
        <div class="wiki-portal-grid">
          <router-link v-for="portal in portals" :key="portal.to" :to="portal.to" class="wiki-tool-card" :class="portal.featured ? 'wiki-tool-card--featured' : ''">
            <span>{{ portal.badge }}</span>
            <h3>{{ portal.title }}</h3>
            <p>{{ portal.desc }}</p>
            <em>进入模块 →</em>
          </router-link>
        </div>
      </section>

      <section class="wiki-section wiki-learning-path wiki-learning-path--premium">
        <div class="wiki-section__head">
          <p class="wiki-eyebrow">Route</p>
          <h2>7 步推荐训练路径</h2>
          <p>如果没有明确问题，就按这条路线推进：先稳住自己，再提升关系能力。</p>
        </div>
        <div class="wiki-path wiki-path--super">
          <router-link v-for="step in starterPath" :key="step.id" :to="step.to || ('/a/' + step.id)">
            <span>{{ step.day }}</span>
            <strong>{{ step.title }}</strong>
            <small>{{ step.desc }}</small>
          </router-link>
        </div>
      </section>

      <section class="wiki-section wiki-column-map wiki-column-map--premium">
        <div class="wiki-section__head">
          <p class="wiki-eyebrow">Growth Atlas</p>
          <h2>44 个专栏成长地图</h2>
          <p>不再把全部信息堆到首屏：按主题分组，从当前阶段进入对应训练区。</p>
        </div>
        <div class="wiki-column-groups">
          <article
            v-for="group in columnGroups"
            :key="group.title"
            class="wiki-column-group"
            :class="[{ 'wiki-column-group--showcase': isShowcaseGroup(group) }, 'wiki-column-group--' + group.tone]"
          >
            <header>
              <span>{{ isShowcaseGroup(group) ? (group.badge || group.items.length) : group.range }}</span>
              <div>
                <h3>{{ group.title }}</h3>
                <p>{{ isShowcaseGroup(group) ? showcaseMeta(group).subtitle : group.desc }}</p>
              </div>
            </header>

            <template v-if="isShowcaseGroup(group)">
              <div class="wiki-column-showcase">
                <router-link :to="showcaseMeta(group).entryTo" class="wiki-column-showcase__entry">
                  <span>{{ showcaseMeta(group).entryBadge }}</span>
                  <strong>{{ showcaseMeta(group).entryTitle }}</strong>
                  <small>{{ showcaseMeta(group).entryDesc }}</small>
                  <em>进入总览 →</em>
                </router-link>
                <div class="wiki-column-topic-grid">
                  <router-link
                    v-for="topic in showcaseTopics(group)"
                    :key="topic.id || topic.to || topic.title"
                    :to="topic.to || ('/a/' + topic.id)"
                    class="wiki-column-topic"
                  >
                    <strong>{{ topic.title }}</strong>
                    <small>{{ topic.desc }}</small>
                  </router-link>
                </div>
              </div>
            </template>

            <div v-else class="wiki-column-links">
              <router-link
                v-for="item in group.items"
                :key="item.id || item.to || item.name"
                :to="item.to || ('/a/' + item.id)"
                class="wiki-column-link"
              >
                <span class="wiki-column-link__num">{{ item.num }}</span>
                <strong>{{ item.name }}</strong>
                <small>{{ item.desc || item.id || '专题入口' }}</small>
              </router-link>
            </div>
          </article>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      query: '',
      recent: [],
      favorites: [],
      portals: [
        { badge: 'Start', title: '开始训练', desc: '从心态、外在、聊天、约会建立基本盘。', to: '/a/ch1', featured: true },
        { badge: 'SOS', title: '关系急救', desc: '吵架、冷淡、失联、误会时的应对脚本。', to: '/relationship' },
        { badge: 'Scene', title: '应急手册', desc: '按具体场景直接拿到行动建议。', to: '/emergency', featured: true },
        { badge: 'Atlas', title: '女性图鉴', desc: '快速识别沟通倾向和相处策略。', to: '/female-types' },
        { badge: 'Case', title: '真实案例库', desc: '从案例里理解错误、修正和复盘方式。', to: '/cases' },
        { badge: 'Look', title: '外在蜕变', desc: '形象、穿搭、体态与第一印象升级。', to: '/appearance' },
        { badge: 'Script', title: '万能话术', desc: '开场、破冰、升温、修复与体面退出。', to: '/universal-scripts' },
        { badge: 'Expression', title: '微表情与动作管理', desc: '笑容、眼神、手势、体态、声音与社交存在感训练。', to: '/expression' },
        { badge: 'Belief', title: '自证预言改写信念', desc: '金钱、幸福、执行力、恋爱、健康等底层信念训练。', to: '/a/ch44', featured: true }
      ],
      starterPath: [
        { day: '01', id: 'ch1', title: '先建立正确心态', desc: '把焦虑转成可执行的问题。' },
        { day: '02', id: 'ch2', title: '外在与生活状态', desc: '先让自己变得可被看见。' },
        { day: '02-1', id: 'expression', title: '微表情与动作管理', desc: '从木讷到生动，激活面部和身体的表达力。' },
        { day: '03', id: 'ch4', title: '开启自然聊天', desc: '减少尬聊，建立轻松连接。' },
        { day: '04', id: 'ch6', title: '推动第一次约会', desc: '从线上过渡到线下。' },
        { day: '05', id: 'ch5', title: '识别关系信号', desc: '看懂反馈，不自我欺骗。' },
        { day: '06', id: 'ch19', title: '处理边界与退出', desc: '稳定表达，不讨好不攻击。' },
        { day: '07', id: 'ch44', title: '改写底层信念', desc: '停止用旧剧本制造旧结果。' }
      ],
      caseTopicMap: {
        'ch8-1': ['聊天失败复盘', '开场、冷场、误读反馈的修正。'],
        'ch8-2': ['邀约推进', '从线上互动过渡到线下见面。'],
        'ch8-3': ['相亲判断', '识别合适度、投入度和现实阻力。'],
        'ch8-4': ['暧昧升温', '处理拉扯、窗口和节奏问题。'],
        'ch8-5': ['关系确认', '从模糊关系走向稳定表达。'],
        'ch8-6': ['冲突修复', '吵架、误会、冷淡后的复盘。'],
        'ch8-7': ['边界退出', '不纠缠、不内耗地结束消耗。'],
        'ch8-8': ['长期维护', '投入、陪伴、沟通的平衡。'],
        'ch8-9': ['自我升级', '把失败案例转成可执行成长。'],
        'ch8-10': ['综合复盘', '复杂场景中的判断与选择。']
      }
    };
  },
  computed: {
    mainColumns() {
      const titles = (window.WIKI && window.WIKI.titles) || {};
      const descMap = this.sidebarDescMap;
      const routeMap = { 2: '/appearance', 8: '/cases', 9: '/emergency', 21: '/female-types' };
      const articleIdMap = { 9: 'ch9-1' };
      const titleMap = { 9: '场景应急手册' };
      return Array.from({ length: 44 }, (_, index) => {
        const num = index + 1;
        const id = 'ch' + num;
        const articleId = articleIdMap[num] || id;
        const route = routeMap[num];
        return {
          id: articleId,
          rawId: id,
          num: String(num).padStart(2, '0'),
          name: titleMap[num] || titles[id] || titles[articleId] || ('第 ' + num + ' 章'),
          desc: descMap[id] || descMap[articleId] || (route ? '进入专题总览' : '进入专栏阅读'),
          to: route || ('/a/' + articleId)
        };
      });
    },
    sidebarDescMap() {
      const map = {};
      ((window.WIKI && window.WIKI.sidebar) || []).forEach(group => {
        (group.items || []).forEach(item => {
          const key = item.articleId || item.id;
          if (key && item.desc && !map[key]) map[key] = item.desc;
        });
      });
      return map;
    },
    columnGroups() {
      const ranges = [
        { title: '基础起步与关系推进', from: 1, to: 7, desc: '心态、形象、聊天、信号、约会，建立第一阶段基本盘。', tone: 'foundation' },
        { title: '案例、应急与工具', from: 8, to: 10, desc: '案例库、应急手册、测试回应，按问题快速查询。', tone: 'tool' },
        { title: '沟通表达进阶', from: 11, to: 16, desc: '赞美、破冰、长期关系、挽回、相亲与微信专项。', tone: 'talk' },
        { title: '自我与长期吸引', from: 17, to: 22, desc: '社交圈、职业金钱、边界、复盘、类型判断与训练。', tone: 'self' },
        { title: '男性底层建设', from: 23, to: 27, desc: '自尊、识人、情绪和底层吸引力。', tone: 'core' },
        { title: '脱单实战场景', from: 28, to: 32, desc: '社交、线上、约会、聊天素材与案例拆解。', tone: 'practice' },
        { title: '长期关系与现实课题', from: 33, to: 41, desc: '边界、表达、生活、现实条件、失恋重建与互惠。', tone: 'longterm' },
        { title: '专题工具与信念成长', from: 42, to: 44, desc: '幸福、复杂关系、万能话术与底层信念改写。', tone: 'belief' }
      ];
      return ranges.map(range => ({
        title: range.title,
        desc: range.desc,
        tone: range.tone,
        range: String(range.from).padStart(2, '0') + '-' + String(range.to).padStart(2, '0'),
        items: this.mainColumns.filter(item => Number(item.num) >= range.from && Number(item.num) <= range.to)
      }));
    },
    totalColumns() {
      return this.mainColumns.length;
    },
    featuredEntry() {
      return { id: 'ch44', name: '自证预言改写信念', desc: '先停止用旧信念制造旧结果，把金钱、幸福、恋爱、执行力改成可训练系统。' };
    },
    searchResults() {
      const q = this.query.trim();
      if (!q) return [];
      if (window.SiteSearch && typeof window.SiteSearch.search === 'function') {
        return window.SiteSearch.search(q, 6);
      }
      const lower = q.toLowerCase();
      return this.columnGroups
        .flatMap(group => group.items)
        .filter(item => (item.name || '').toLowerCase().includes(lower) || (item.id || '').toLowerCase().includes(lower))
        .slice(0, 6);
    }
  },
  mounted() { this.refreshState(); },
  activated() { this.refreshState(); },
  methods: {
    refreshState() {
      if (!window.WikiUserState) return;
      this.recent = window.WikiUserState.getRecent(5);
      this.favorites = window.WikiUserState.getFavorites().slice(0, 5);
    },
    isShowcaseGroup(group) {
      return group && (group.key === 'cases' || group.key === 'emergency' || group.title === '真实案例库' || group.title === '场景应急手册');
    },
    showcaseMeta(group) {
      if (group && (group.key === 'emergency' || group.title === '场景应急手册')) {
        return {
          subtitle: '按真实临场问题分类，先稳住，再回应。',
          entryTo: '/emergency',
          entryBadge: group.badge || '300场景',
          entryTitle: '应急手册总览',
          entryDesc: '不知道怎么回、怎么约、怎么修复时，从这里快速定位场景。'
        };
      }
      return {
        subtitle: '把失败、推进、修复和退出做成可复盘的案例入口。',
        entryTo: '/cases',
        entryBadge: (group && group.badge) || '200案例',
        entryTitle: '案例库总览',
        entryDesc: '不看编号，直接按问题类型进入：聊天、邀约、相亲、修复、退出。'
      };
    },
    showcaseTopics(group) {
      if (!group) return [];
      if (group.key === 'emergency' || group.title === '场景应急手册') {
        return group.items
          .filter(item => !item.entry && item.id)
          .map(item => {
            const title = (item.name || '').replace(/\s*·\s*\d+\s*-\s*\d+\s*$/, '').trim() || item.name;
            return {
              id: item.id,
              title,
              desc: this.emergencyTopicDesc(title)
            };
          });
      }
      return group.items
        .filter(item => !item.entry && item.id && item.id !== 'ch8')
        .map(item => {
          const mapped = this.caseTopicMap[item.id] || [item.name.replace(/^案例\s*/, '案例复盘'), '进入这一组真实案例。'];
          return { id: item.id, title: mapped[0], desc: mapped[1] };
        });
    },
    emergencyTopicDesc(title) {
      const descMap = {
        '微信与消息': '不会回、怕冷场、消息节奏失控。',
        '邀约与约会': '提出见面、安排约会、现场推进。',
        '失误与修复': '说错话、冒犯、尴尬后的补救。',
        '推进与试探': '判断窗口、升级关系、确认反馈。',
        '礼物与边界': '送礼尺度、金钱边界、拒绝压力。',
        '社交场景': '朋友局、聚会、同事圈里的互动。',
        '情绪管理': '焦虑、上头、吃醋时先稳住。',
        '复合恢复': '断联、破冰、重新建立信任。',
        '长期关系': '陪伴、冲突、投入和长期维护。',
        '自我提升': '从当下问题回到自身建设。'
      };
      return descMap[title] || '进入对应场景查看处理方案。';
    },
    goSearch() {
      const q = this.query.trim();
      if (!q) {
        this.$router.push('/search');
        return;
      }
      this.$router.push({ path: '/search', query: { q } });
    }
  }
};
