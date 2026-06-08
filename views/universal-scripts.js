/* 万能话术 —— 第3轮最终打磨版 */
window.UniversalScriptsView = {
  template: `
    <div class="wiki-universal-container">
      <!-- 骨架屏 Loading -->
      <div v-if="isLoading" class="wiki-universal-skeleton">
        <div class="wiki-universal-skeleton-hero">
          <div class="wiki-universal-skeleton-line wiki-universal-skeleton-line--lg"></div>
          <div class="wiki-universal-skeleton-line wiki-universal-skeleton-line--md"></div>
          <div class="wiki-universal-skeleton-line wiki-universal-skeleton-line--sm"></div>
          <div class="wiki-universal-skeleton-search"></div>
        </div>
        <div class="wiki-universal-skeleton-filter">
          <div v-for="n in 6" :key="n" class="wiki-universal-skeleton-pill"></div>
        </div>
        <div v-for="n in 3" :key="n" class="wiki-universal-skeleton-card">
          <div class="wiki-universal-skeleton-line wiki-universal-skeleton-line--md"></div>
          <div class="wiki-universal-skeleton-line"></div>
          <div class="wiki-universal-skeleton-line"></div>
        </div>
      </div>

      <!-- 庆祝动画 -->
      <div v-if="showCelebration" class="wiki-universal-celebration">
        <div v-for="n in 30" :key="n" class="wiki-universal-confetti" :style="confettiStyle(n)"></div>
      </div>

      <!-- 首次访问引导 -->
      <transition name="wiki-universal-fade">
        <div v-if="showGuide" class="wiki-universal-guide-overlay" @click.self="dismissGuide">
          <div class="wiki-universal-guide-modal">
            <div class="wiki-universal-guide-icon">🎯</div>
            <h3>欢迎使用万能话术</h3>
            <p>这里汇集了即拿即用的话术模板，帮你把心里想的话说出口。</p>
            <div class="wiki-universal-guide-features">
              <div><span>🔍</span><b>搜索话术</b>输入场景或关键词，快速找到对应模板</div>
              <div><span>⭐</span><b>收藏常用</b>收藏你最喜欢的话术，随时查阅</div>
              <div><span>🚨</span><b>应急模式</b>紧急时刻快速找到最短、最通用的话术</div>
            </div>
            <button class="wiki-universal-guide-btn" @click="dismissGuide">开始使用</button>
          </div>
        </div>
      </transition>

      <!-- 应急模式遮罩 -->
      <transition name="wiki-universal-fade">
        <div v-if="emergencyMode" class="wiki-universal-emergency-overlay" @click.self="emergencyMode = false">
          <div class="wiki-universal-emergency-modal">
            <header>
              <div>
                <h2>🚨 应急速查</h2>
                <p>只显示最短、最通用的话术</p>
              </div>
              <button class="wiki-universal-close" @click="emergencyMode = false">✕</button>
            </header>
            <!-- 应急搜索 -->
            <div class="wiki-universal-emergency-search">
              <input v-model="emergencyQuery" type="text" placeholder="在应急话术中搜索..." />
              <span class="wiki-universal-emergency-search-icon">🔍</span>
              <button v-if="emergencyQuery" class="wiki-universal-emergency-search-clear" @click="emergencyQuery = ''">✕</button>
            </div>
            <!-- 应急分类筛选 -->
            <div v-if="emergencyCategories.length > 1" class="wiki-universal-emergency-categories">
              <button
                v-for="cat in emergencyCategories"
                :key="cat"
                :class="['wiki-universal-emergency-cat-btn', { active: activeEmergencyCat === cat }]"
                @click="activeEmergencyCat = cat"
              >{{ cat }}</button>
            </div>
            <div class="wiki-universal-emergency-body">
              <div v-if="filteredEmergencyGroups.length === 0" class="wiki-universal-emergency-empty">
                <span>🔍</span>
                <p>没有找到匹配的应急话术</p>
              </div>
              <div v-for="(group, gi) in filteredEmergencyGroups" :key="gi" class="wiki-universal-emergency-category">
                <h3 class="wiki-universal-emergency-category-title">{{ group.category }}</h3>
                <div
                  v-for="(line, li) in group.lines"
                  :key="li"
                  class="wiki-universal-emergency-item"
                >
                  <span class="wiki-universal-emergency-text" v-html="highlight(line.text, emergencyQuery)"></span>
                  <span v-if="line.tag" class="wiki-universal-difficulty-tag" :class="line.tag === '直接复制' ? 'easy' : 'adapt'">{{ line.tag }}</span>
                  <span
                    class="wiki-universal-star"
                    :class="{ active: isFav(line.text) }"
                    @click.stop="toggleFav(line.text)"
                    :title="isFav(line.text) ? '取消收藏' : '收藏'"
                  >{{ isFav(line.text) ? '⭐' : '☆' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Hero区 -->
      <section class="wiki-universal-hero">
        <div class="wiki-universal-hero__glow wiki-universal-hero__glow--one"></div>
        <div class="wiki-universal-hero__glow wiki-universal-hero__glow--two"></div>
        <div class="wiki-universal-hero__content">
          <h1 class="wiki-universal-hero-title">{{ data.hero.title }}</h1>
          <p class="wiki-universal-hero-subtitle">{{ data.hero.subtitle }}</p>
          <p class="wiki-universal-hero-lead">{{ data.hero.lead }}</p>
          <div class="wiki-universal-hero-search">
            <input v-model="searchQuery" type="text" placeholder="搜索话术、场景、关键词..." @input="onSearchInput" />
            <span class="wiki-universal-hero-search-icon">🔍</span>
            <button v-if="searchQuery" class="wiki-universal-search__clear" @click="clearSearch">✕</button>
          </div>
          <button class="wiki-universal-emergency-btn" @click="emergencyMode = true">🚨 我现在就要用</button>
          <div v-if="data.hero.stats" class="wiki-universal-stats">
            <div v-for="stat in data.hero.stats" :key="stat.label" class="wiki-universal-stat-item">
              <div class="wiki-universal-stat-number">{{ stat.num }}</div>
              <div class="wiki-universal-stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 场景筛选栏 -->
      <section class="wiki-universal-filter-bar" :class="{ 'wiki-universal-filter-bar--sticky': isSticky }">
        <span class="wiki-universal-filter-label">场景筛选</span>
        <div class="wiki-universal-filter-tags">
          <button
            v-for="scene in sceneFilters"
            :key="scene"
            :class="['wiki-universal-filter-tag', { active: activeScene === scene }]"
            @click="activeScene = scene"
          >{{ scene }}</button>
        </div>
      </section>

      <!-- 搜索无结果 -->
      <section v-if="searchQuery && isSearchEmpty" class="wiki-universal-empty-state">
        <div class="wiki-universal-empty-state-icon">🔍</div>
        <b>没有找到匹配的话术</b>
        <p>试试换个关键词，或者切换到"全部"场景筛选</p>
        <div class="wiki-universal-empty-actions">
          <button class="wiki-universal-btn" @click="clearSearch">清空搜索</button>
          <button class="wiki-universal-btn wiki-universal-btn--secondary" @click="emergencyMode = true">打开应急速查</button>
        </div>
        <!-- 推荐内容 -->
        <div v-if="recommendations.length" class="wiki-universal-recommend">
          <h4>你可能想找的 👇</h4>
          <div class="wiki-universal-recommend-list">
            <div
              v-for="(rec, i) in recommendations"
              :key="i"
              class="wiki-universal-recommend-item"
              @click="applyRecommend(rec)"
            >
              <span class="wiki-universal-recommend-text">{{ rec.text }}</span>
              <span class="wiki-universal-recommend-tag">{{ rec.tag }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心心法区 -->
      <section v-if="shouldShowSection('mindset')" id="section-mindset" class="wiki-universal-section">
        <h2 class="wiki-universal-section-title">核心心法</h2>
        <div class="wiki-universal-mindset-list">
          <article
            v-for="(item, i) in filteredMindset"
            :key="i"
            :class="['wiki-universal-mindset-card', { open: expandedMindset === i }]"
            :style="{ animationDelay: (i * 0.05) + 's' }"
          >
            <div class="wiki-universal-mindset-header" @click="toggleMindset(i)">
              <div class="wiki-universal-mindset-icon">0{{ i + 1 }}</div>
              <div class="wiki-universal-mindset-title-wrap">
                <h3 class="wiki-universal-mindset-title" v-html="highlight(item.title)"></h3>
                <p class="wiki-universal-mindset-summary" v-html="highlight(item.summary)"></p>
              </div>
              <span class="wiki-universal-mindset-toggle">▼</span>
            </div>
            <div class="wiki-universal-mindset-body">
              <p v-if="item.detail" class="wiki-universal-mindset-detail" v-html="highlight(item.detail)"></p>
              <div v-if="item.myth" class="wiki-universal-mindset-pitfall">
                <span class="wiki-universal-mindset-pitfall-icon">⚠️</span>
                <span>常见误区：{{ item.myth }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 填空模板区（重点） -->
      <section v-if="shouldShowSection('templates')" id="section-templates" class="wiki-universal-section">
        <h2 class="wiki-universal-section-title">填空模板 <span v-if="filteredTemplates.length" class="wiki-universal-count">({{ filteredTemplates.length }})</span></h2>
        <div class="wiki-universal-template-list">
          <article
            v-for="(tpl, i) in filteredTemplates"
            :key="tpl.name + '_' + i"
            class="wiki-universal-template-card"
            :style="{ animationDelay: (i * 0.05) + 's' }"
          >
            <div class="wiki-universal-template-header">
              <div class="wiki-universal-template-scene-icon">{{ tpl.icon || '📝' }}</div>
              <div class="wiki-universal-template-meta">
                <h3 class="wiki-universal-template-name" v-html="highlight(tpl.name)"></h3>
                <p v-if="tpl.timing" class="wiki-universal-template-timing">{{ tpl.timing }}</p>
              </div>
              <div class="wiki-universal-template-actions">
                <span class="wiki-universal-difficulty-tag" :class="tpl.difficulty === '直接复制' ? 'easy' : 'adapt'">{{ tpl.difficulty || '需要改编' }}</span>
                <button
                  class="wiki-universal-template-btn wiki-universal-fav-btn"
                  :class="{ favorited: isFav(tpl.name) }"
                  @click.stop="toggleFav(tpl.name)"
                  :title="isFav(tpl.name) ? '取消收藏' : '收藏'"
                >{{ isFav(tpl.name) ? '⭐' : '☆' }}</button>
              </div>
            </div>

            <!-- 模板句式 -->
            <div class="wiki-universal-template-formula">
              <div class="wiki-universal-template-formula-label">模板句式</div>
              <p v-html="highlightSlots(tpl.template)"></p>
            </div>

            <!-- 保守版/进阶版 -->
            <div v-if="tpl.conservative || tpl.advanced" class="wiki-universal-variant-row">
              <div v-if="tpl.conservative" class="wiki-universal-variant-card conservative">
                <span class="wiki-universal-variant-label">保守版</span>
                <p class="wiki-universal-variant-text" v-html="highlight(tpl.conservative)"></p>
              </div>
              <div v-if="tpl.advanced" class="wiki-universal-variant-card advanced">
                <span class="wiki-universal-variant-label">进阶版</span>
                <p class="wiki-universal-variant-text" v-html="highlight(tpl.advanced)"></p>
              </div>
            </div>

            <!-- 示例区域 -->
            <div v-if="tpl.examples && tpl.examples.length" class="wiki-universal-template-section">
              <h4 class="wiki-universal-template-section-title">
                示例
                <span class="wiki-universal-template-section-count">{{ visibleExampleCount(tpl) }}/{{ tpl.examples.length }}</span>
              </h4>
              <div class="wiki-universal-example-list" :class="{ expanded: isExpandedExamples(tpl.name) }">
                <div
                  v-for="(ex, j) in visibleExamples(tpl)"
                  :key="j"
                  class="wiki-universal-example-item"
                >
                  <span v-if="ex.situation" class="wiki-universal-example-tag">{{ ex.situation }}</span>
                  <p class="wiki-universal-example-text" v-html="highlight(ex.text)"></p>
                </div>
              </div>
              <button
                v-if="tpl.examples.length > 3"
                class="wiki-universal-expand-btn"
                :class="{ expanded: isExpandedExamples(tpl.name) }"
                @click="toggleExpandExamples(tpl.name)"
              >
                <span>{{ isExpandedExamples(tpl.name) ? '收起 ▲' : '展开更多 (' + (tpl.examples.length - 3) + ') ▼' }}</span>
              </button>
            </div>

            <!-- 关键要点 -->
            <div v-if="tpl.tips && tpl.tips.length" class="wiki-universal-template-section">
              <h4 class="wiki-universal-template-section-title">关键要点</h4>
              <div class="wiki-universal-tips-list">
                <div v-for="(tip, k) in tpl.tips" :key="k" class="wiki-universal-tip-item">
                  <span class="wiki-universal-check">✓</span>
                  <span v-html="highlight(tip)"></span>
                </div>
              </div>
            </div>

            <!-- 翻车版本 -->
            <div v-if="tpl.wrong" class="wiki-universal-fail-version">
              <div class="wiki-universal-fail-version-header">❌ 错误示范</div>
              <p class="wiki-universal-fail-version-text" v-html="highlight(tpl.wrong)"></p>
            </div>

            <!-- 不回复应对 -->
            <div v-if="tpl.ifNoReply" class="wiki-universal-template-section">
              <h4 class="wiki-universal-template-section-title">💬 她不回复怎么办</h4>
              <div class="wiki-universal-noreply-box">
                <p class="wiki-universal-variant-text" v-html="highlight(tpl.ifNoReply)"></p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- 应急速查卡 -->
      <section v-if="shouldShowSection('cheatsheet')" id="section-cheatsheet" class="wiki-universal-section">
        <h2 class="wiki-universal-section-title">应急速查卡</h2>
        <div class="wiki-universal-emergency-grid">
          <div v-for="(group, gi) in filteredCheatsheet" :key="gi" class="wiki-universal-emergency-category">
            <h3 class="wiki-universal-emergency-category-title">{{ group.category }}</h3>
            <div
              v-for="(line, li) in group.lines"
              :key="li"
              class="wiki-universal-emergency-item"
            >
              <span class="wiki-universal-emergency-text" v-html="highlight(line.text)"></span>
              <span v-if="line.tag" class="wiki-universal-difficulty-tag" :class="line.tag === '直接复制' ? 'easy' : 'adapt'">{{ line.tag }}</span>
              <span
                class="wiki-universal-star"
                :class="{ active: isFav(line.text) }"
                @click.stop="toggleFav(line.text)"
                :title="isFav(line.text) ? '取消收藏' : '收藏'"
              >{{ isFav(line.text) ? '⭐' : '☆' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 对比案例区 -->
      <section v-if="shouldShowSection('beforeAfter')" id="section-beforeafter" class="wiki-universal-section">
        <h2 class="wiki-universal-section-title">对比案例</h2>
        <div class="wiki-universal-compare-list">
          <article
            v-for="(item, i) in filteredBeforeAfter"
            :key="i"
            class="wiki-universal-compare-card"
            :style="{ animationDelay: (i * 0.05) + 's' }"
          >
            <h3 v-html="highlight(item.title)"></h3>
            <p v-if="item.background" class="wiki-universal-compare-bg">{{ item.background }}</p>
            <div class="wiki-universal-compare-pair">
              <div class="wiki-universal-compare-block before">
                <div class="wiki-universal-compare-label">❌ Before</div>
                <p v-html="highlight(item.wrongDialog || item.wrong || item.before)"></p>
              </div>
              <div class="wiki-universal-compare-block after">
                <div class="wiki-universal-compare-label">✅ After</div>
                <p v-html="highlight(item.rightDialog || item.right || item.after)"></p>
              </div>
            </div>
            <div v-if="item.keyPoint || item.why || item.analysis" class="wiki-universal-compare-insight">
              <div class="wiki-universal-compare-insight-title">💡 关键要点</div>
              <p class="wiki-universal-compare-insight-text">{{ item.keyPoint || item.why || item.analysis }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 每日训练区 -->
      <section v-if="shouldShowSection('dailyDrill')" id="section-daily" class="wiki-universal-section">
        <h2 class="wiki-universal-section-title">每日一练</h2>
        <div class="wiki-universal-training-section">
          <div class="wiki-universal-progress-bar">
            <div class="wiki-universal-progress-fill" :style="{ width: dailyProgress + '%' }"></div>
          </div>
          <div class="wiki-universal-progress-text">已完成 {{ completedDays.length }} / {{ (data.dailyDrill || []).length }} 天</div>

          <!-- 今日任务 -->
          <div class="wiki-universal-task-card" v-if="todayTask" :class="{ done: isDayCompleted(todayTask.day) }">
            <div class="wiki-universal-task-day">Day {{ todayTask.day }}</div>
            <div v-if="isDayCompleted(todayTask.day)" class="wiki-universal-task-done-badge">✓ 已完成</div>
            <p class="wiki-universal-task-desc" v-html="highlight(todayTask.task)"></p>
            <p v-if="todayTask.action" class="wiki-universal-task-action-text">{{ todayTask.action }}</p>
            <div v-if="todayTask.example" class="wiki-universal-daily-example">
              <span>示例</span>
              <p v-html="highlight(todayTask.example)"></p>
            </div>
            <button
              class="wiki-universal-task-action"
              :class="{ done: isDayCompleted(todayTask.day) }"
              @click="toggleDayComplete(todayTask.day)"
            >{{ isDayCompleted(todayTask.day) ? '已完成 ✓' : '标记完成' }}</button>
          </div>

          <!-- 历史记录切换 -->
          <div class="wiki-universal-history-toggle">
            <button @click="showHistory = !showHistory">
              {{ showHistory ? '隐藏历史记录 ▲' : '查看历史训练记录 ▼' }}
            </button>
          </div>

          <!-- 历史训练记录 -->
          <transition name="wiki-universal-slide">
            <div v-if="showHistory" class="wiki-universal-history-list">
              <div
                v-for="item in historyDays"
                :key="item.day"
                class="wiki-universal-history-item"
                :class="{ done: item.done, today: item.today }"
              >
                <div class="wiki-universal-history-day">Day {{ item.day }}</div>
                <div class="wiki-universal-history-task">{{ item.task }}</div>
                <div class="wiki-universal-history-status">
                  <span v-if="item.done" class="wiki-universal-history-done">✓ 已完成</span>
                  <span v-else-if="item.today" class="wiki-universal-history-today">📍 今日</span>
                  <span v-else class="wiki-universal-history-pending">○ 待完成</span>
                </div>
                <button
                  v-if="!item.today"
                  class="wiki-universal-history-btn"
                  :class="{ done: item.done }"
                  @click="toggleDayComplete(item.day)"
                >{{ item.done ? '取消' : '完成' }}</button>
              </div>
            </div>
          </transition>

          <!-- 日历 -->
          <div class="wiki-universal-calendar">
            <div v-for="item in calendarDays" :key="item.day" class="wiki-universal-calendar-day">
              <div
                :class="['wiki-universal-calendar-dot', { done: item.done, today: item.today }]"
                @click="scrollToDay(item.day)"
                :title="item.task"
              >{{ item.day }}</div>
              <span class="wiki-universal-calendar-label">Day {{ item.day }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 收藏列表 -->
      <section v-if="favorites.length" class="wiki-universal-section">
        <h2 class="wiki-universal-section-title">我的收藏 <span class="wiki-universal-count">({{ favorites.length }})</span></h2>
        <div class="wiki-universal-fav-grid">
          <div
            v-for="(text, i) in favorites"
            :key="i"
            class="wiki-universal-fav-line"
          >
            <span v-html="highlight(text)"></span>
            <button class="wiki-universal-fav-remove" @click.stop="toggleFav(text)" title="移除">✕</button>
          </div>
        </div>
      </section>

      <!-- CTA区 -->
      <section class="wiki-universal-cta">
        <h2>话术是工具，真诚是底色</h2>
        <p>所有话术都服务于真实的连接，而非操控。先理解原则，再灵活运用。<br>建议收藏本页，实战中随时查阅。</p>
        <div class="wiki-universal-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/a/ch38" class="wiki-btn wiki-btn--primary">阅读第38章：聊天系统方法论</router-link>
        </div>
      </section>

      <!-- 滚动到顶部按钮 -->
      <button
        v-show="showScrollTop"
        class="wiki-universal-scroll-top"
        @click="scrollToTop"
        title="回到顶部"
      >▲</button>

      <!-- 移动端底部快捷按钮 -->
      <div class="wiki-universal-fab" @click="emergencyMode = true">
        <span>🚨</span>
      </div>
    </div>
  `,

  data() {
    const raw = window.UNIVERSAL_SCRIPTS || {};
    const data = this.normalizeData(raw);
    return {
      data,
      isLoading: true,
      searchQuery: '',
      activeScene: '全部',
      expandedMindset: null,
      emergencyMode: false,
      emergencyQuery: '',
      activeEmergencyCat: '全部',
      copyFeedback: '',
      copyFeedbackTimer: null,
      favorites: this.loadFavorites(),
      completedDays: this.loadCompletedDays(),
      todayDay: this.calcTodayDay(data.dailyDrill),
      isSticky: false,
      showScrollTop: false,
      showHistory: false,
      showGuide: false,
      showCelebration: false,
      expandedExamples: {},
      useFrequency: this.loadUseFrequency(),
      searchDebounceTimer: null
    };
  },

  computed: {
    sceneFilters() {
      const scenes = ['全部', '开场', '延续', '好感', '邀约', '暧昧', '冷淡', '化解', '结束', '拒绝应对'];
      const extra = [];
      // 从模板中提取场景标签
      (this.data.templates || []).forEach(tpl => {
        const scene = this.getTemplateScene(tpl.name);
        if (scene && !scenes.includes(scene) && !extra.includes(scene)) extra.push(scene);
      });
      // 从应急速查中提取
      (this.data.cheatsheet || []).forEach(g => {
        if (g.category && !scenes.includes(g.category) && !extra.includes(g.category)) extra.push(g.category);
      });
      (this.data.quickCopy || []).forEach(g => {
        if (g.category && !scenes.includes(g.category) && !extra.includes(g.category)) extra.push(g.category);
      });
      return [...scenes, ...extra];
    },

    emergencyCategories() {
      const groups = this.emergencyGroupsRaw;
      const cats = ['全部'];
      groups.forEach(g => {
        if (g.category && !cats.includes(g.category)) cats.push(g.category);
      });
      return cats;
    },

    emergencyGroupsRaw() {
      if (this.data.quickCopy && this.data.quickCopy.length) {
        return this.data.quickCopy;
      }
      const groups = (this.data.cheatsheet || []).map(g => ({
        category: g.category,
        lines: (g.lines || []).filter(l => (l.text || '').length <= 40)
      })).filter(g => g.lines.length);
      return groups.length ? groups : (this.data.cheatsheet || []);
    },

    filteredEmergencyGroups() {
      let groups = this.emergencyGroupsRaw;
      // 分类筛选
      if (this.activeEmergencyCat !== '全部') {
        groups = groups.filter(g => g.category === this.activeEmergencyCat);
      }
      // 搜索
      const q = this.emergencyQuery.trim();
      if (q) {
        const low = q.toLowerCase();
        groups = groups.map(g => ({
          category: g.category,
          lines: (g.lines || []).filter(l => (l.text || '').toLowerCase().includes(low))
        })).filter(g => g.lines.length);
      }
      // 按使用频率排序（高频在前）
      return groups.map(g => ({
        category: g.category,
        lines: [...(g.lines || [])].sort((a, b) => {
          const freqA = this.useFrequency[a.text] || 0;
          const freqB = this.useFrequency[b.text] || 0;
          return freqB - freqA;
        })
      }));
    },

    filteredMindset() {
      return this.filterList(this.data.mindset || []);
    },

    filteredTemplates() {
      return this.filterList(this.data.templates || []);
    },

    filteredCheatsheet() {
      const list = this.data.cheatsheet || [];
      return this.filterList(list);
    },

    filteredBeforeAfter() {
      return this.filterList(this.data.beforeAfter || []);
    },

    todayTask() {
      const list = this.data.dailyDrill || [];
      return list.find(d => d.day === this.todayDay) || list[0] || null;
    },

    historyDays() {
      const list = this.data.dailyDrill || [];
      return list.map(d => ({
        day: d.day,
        task: d.task,
        done: this.completedDays.includes(d.day),
        today: d.day === this.todayDay
      }));
    },

    calendarDays() {
      const list = this.data.dailyDrill || [];
      return list.map(d => ({
        day: d.day,
        done: this.completedDays.includes(d.day),
        today: d.day === this.todayDay,
        task: d.task
      }));
    },

    dailyProgress() {
      const total = (this.data.dailyDrill || []).length || 1;
      return Math.round((this.completedDays.length / total) * 100);
    },

    isSearchEmpty() {
      return !this.filteredMindset.length && !this.filteredTemplates.length && !this.filteredCheatsheet.length && !this.filteredBeforeAfter.length;
    },

    recommendations() {
      // 搜索无结果时推荐相关内容
      const q = this.searchQuery.trim().toLowerCase();
      if (!q) return [];
      const recs = [];
      // 从所有模板示例中找相关
      (this.data.templates || []).forEach(tpl => {
        (tpl.examples || []).forEach(ex => {
          const text = (ex.text || '').toLowerCase();
          const sit = (ex.situation || '').toLowerCase();
          if (text.includes(q) || sit.includes(q)) {
            recs.push({ text: ex.text, tag: tpl.name, type: 'example' });
          }
        });
      });
      // 从应急速查中找相关
      (this.data.cheatsheet || []).forEach(g => {
        (g.lines || []).forEach(l => {
          if ((l.text || '').toLowerCase().includes(q)) {
            recs.push({ text: l.text, tag: g.category, type: 'cheatsheet' });
          }
        });
      });
      // 去重并限制数量
      const seen = new Set();
      return recs.filter(r => {
        if (seen.has(r.text)) return false;
        seen.add(r.text);
        return true;
      }).slice(0, 6);
    }
  },

  mounted() {
    // 模拟加载完成
    this._loadTimer = setTimeout(() => { this.isLoading = false; }, 400);
    this._scrollHandler = this.onScroll.bind(this);
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
    // 检查首次访问
    this.checkFirstVisit();
  },

  beforeUnmount() {
    if (this._loadTimer) clearTimeout(this._loadTimer);
    if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
    if (this.copyFeedbackTimer) clearTimeout(this.copyFeedbackTimer);
    window.removeEventListener('scroll', this._scrollHandler);
  },

  methods: {
    normalizeData(raw) {
      const data = { ...raw };
      if (!data.hero) {
        data.hero = {
          title: data.title || '万能话术',
          subtitle: data.subtitle || '',
          lead: data.lead || '',
          stats: data.stats || []
        };
      }
      if (!data.mindset) data.mindset = [];
      if (!data.templates) data.templates = [];
      if (!data.cheatsheet) data.cheatsheet = [];
      if (!data.beforeAfter) data.beforeAfter = [];
      if (!data.dailyDrill) data.dailyDrill = [];
      if (!data.quickCopy) data.quickCopy = [];
      return data;
    },

    // 获取模板的场景分类，用于筛选标签
    getTemplateScene(name) {
      const sceneMap = {
        '开场破冰': '开场',
        '具体夸奖': '好感',
        '情绪共鸣': '延续',
        '自然邀约': '邀约',
        '朋友圈互动': '延续',
        '应对敷衍词': '化解',
        '应对灵魂拷问': '化解',
        '升温暧昧': '暧昧',
        '应对冷淡': '冷淡',
        '结束对话': '结束',
        '处理拒绝': '拒绝应对',
        '女生发照片评论': '好感',
        '女生问你在干嘛': '延续',
        '女生说困了累了': '结束',
        '女生说你懂女生': '化解'
      };
      return sceneMap[name] || '';
    },

    filterList(list) {
      if (!Array.isArray(list)) return [];
      let result = list;
      // 场景筛选
      if (this.activeScene !== '全部') {
        result = result.filter(item => {
          const hay = [item.category, item.name, item.title, item.scene, item.timing, item.situation].join(' ');
          // 对模板使用场景映射
          if (item.name) {
            const mappedScene = this.getTemplateScene(item.name);
            if (mappedScene === this.activeScene) return true;
          }
          return hay.includes(this.activeScene);
        });
      }
      // 搜索（带相关性排序）
      const q = this.searchQuery.trim();
      if (q) {
        const low = q.toLowerCase();
        result = result.map(item => {
          const text = JSON.stringify(item).toLowerCase();
          const score = this.calcRelevance(item, low);
          return { item, score, match: text.includes(low) };
        }).filter(r => r.match).sort((a, b) => b.score - a.score).map(r => r.item);
      }
      return result;
    },

    calcRelevance(item, query) {
      let score = 0;
      const q = query;
      // 标题匹配权重最高
      const title = String(item.title || item.name || '').toLowerCase();
      if (title.includes(q)) score += 10;
      if (title === q) score += 20;
      // 场景/时机匹配
      const timing = String(item.timing || item.scene || '').toLowerCase();
      if (timing.includes(q)) score += 5;
      // 内容匹配
      const content = JSON.stringify(item).toLowerCase();
      const matches = (content.match(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      score += matches;
      return score;
    },

    shouldShowSection(name) {
      if (this.searchQuery) return true;
      const map = {
        mindset: () => (this.data.mindset || []).length,
        templates: () => (this.data.templates || []).length,
        cheatsheet: () => (this.data.cheatsheet || this.data.quickCopy || []).length,
        beforeAfter: () => (this.data.beforeAfter || []).length,
        dailyDrill: () => (this.data.dailyDrill || []).length
      };
      return map[name] ? map[name]() > 0 : true;
    },

    onSearchInput() {
      // 防抖搜索，减少重渲染
      if (this.searchDebounceTimer) clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = setTimeout(() => {
        this.searchDebounceTimer = null;
      }, 150);
    },

    clearSearch() {
      this.searchQuery = '';
    },

    toggleMindset(i) {
      this.expandedMindset = this.expandedMindset === i ? null : i;
    },

    highlight(text, overrideQuery) {
      if (!text) return '';
      const q = (overrideQuery !== undefined ? overrideQuery : this.searchQuery).trim();
      let safe = String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (!q) return safe;
      const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return safe.replace(re, '<mark class="wiki-universal-mark">$1</mark>');
    },

    highlightSlots(text) {
      if (!text) return '';
      let html = this.highlight(text);
      html = html.replace(/【([^】]+)】/g, '<span class="wiki-universal-slot">【$1】</span>');
      return html;
    },

    // 示例展开/收起
    visibleExamples(tpl) {
      const examples = tpl.examples || [];
      if (this.isExpandedExamples(tpl.name)) return examples;
      return examples.slice(0, 3);
    },

    visibleExampleCount(tpl) {
      return this.visibleExamples(tpl).length;
    },

    toggleExpandExamples(name) {
      this.expandedExamples[name] = !this.expandedExamples[name];
    },

    isExpandedExamples(name) {
      return !!this.expandedExamples[name];
    },

    copyText(text) {
      if (!text) return;
      // 记录使用频率
      this.recordUse(text);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => this.showCopyFeedback('已复制 ✓'))
          .catch(() => this.fallbackCopy(text));
      } else {
        this.fallbackCopy(text);
      }
    },

    fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        this.showCopyFeedback('已复制 ✓');
      } catch (err) {
        this.showCopyFeedback('复制失败，请手动复制');
      }
      document.body.removeChild(ta);
    },

    showCopyFeedback(msg) {
      if (this.copyFeedbackTimer) clearTimeout(this.copyFeedbackTimer);
      this.copyFeedback = msg;
      this.copyFeedbackTimer = setTimeout(() => { this.copyFeedback = ''; this.copyFeedbackTimer = null; }, 2000);
    },

    recordUse(text) {
      const key = text.slice(0, 50);
      this.useFrequency[key] = (this.useFrequency[key] || 0) + 1;
      this.saveUseFrequency();
    },

    loadUseFrequency() {
      try {
        return JSON.parse(localStorage.getItem('wiki_universal_frequency') || '{}');
      } catch (e) {
        return {};
      }
    },

    saveUseFrequency() {
      try {
        localStorage.setItem('wiki_universal_frequency', JSON.stringify(this.useFrequency));
      } catch (e) {}
    },

    isFav(text) {
      return this.favorites.includes(text);
    },

    toggleFav(text) {
      const idx = this.favorites.indexOf(text);
      if (idx >= 0) {
        this.favorites.splice(idx, 1);
      } else {
        this.favorites.push(text);
      }
      this.saveFavorites();
    },

    loadFavorites() {
      try {
        return JSON.parse(localStorage.getItem('wiki_universal_favorites') || '[]');
      } catch (e) {
        return [];
      }
    },

    saveFavorites() {
      try {
        localStorage.setItem('wiki_universal_favorites', JSON.stringify(this.favorites));
      } catch (e) {}
    },

    calcTodayDay(list) {
      if (!list || !list.length) return 1;
      const day = new Date().getDate();
      return ((day - 1) % list.length) + 1;
    },

    isDayCompleted(day) {
      return this.completedDays.includes(day);
    },

    toggleDayComplete(day) {
      const idx = this.completedDays.indexOf(day);
      const wasCompleted = idx >= 0;
      if (wasCompleted) {
        this.completedDays.splice(idx, 1);
      } else {
        this.completedDays.push(day);
        // 如果是今日任务且首次完成，触发庆祝动画
        if (day === this.todayDay) {
          this.triggerCelebration();
        }
      }
      this.saveCompletedDays();
    },

    triggerCelebration() {
      this.showCelebration = true;
      if (this._celebrationTimer) clearTimeout(this._celebrationTimer);
      this._celebrationTimer = setTimeout(() => { this.showCelebration = false; }, 3000);
    },

    confettiStyle(n) {
      const colors = ['#2f5d50', '#b9803a', '#3f7d5a', '#e8a94d', '#5a9e7a', '#d4a76a'];
      const left = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = 1.5 + Math.random() * 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        left: left + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
        backgroundColor: color
      };
    },

    loadCompletedDays() {
      try {
        return JSON.parse(localStorage.getItem('wiki_universal_completed_days') || '[]');
      } catch (e) {
        return [];
      }
    },

    saveCompletedDays() {
      try {
        localStorage.setItem('wiki_universal_completed_days', JSON.stringify(this.completedDays));
      } catch (e) {}
    },

    onScroll() {
      this.isSticky = window.scrollY > 200;
      this.showScrollTop = window.scrollY > 600;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    scrollToDay(day) {
      const list = this.data.dailyDrill || [];
      const task = list.find(d => d.day === day);
      if (task && day !== this.todayDay) {
        this.todayDay = day;
      }
    },

    checkFirstVisit() {
      try {
        const visited = localStorage.getItem('wiki_universal_visited');
        if (!visited) {
          this.showGuide = true;
        }
      } catch (e) {}
    },

    dismissGuide() {
      this.showGuide = false;
      try {
        localStorage.setItem('wiki_universal_visited', '1');
      } catch (e) {}
    },

    applyRecommend(rec) {
      this.searchQuery = '';
      this.copyText(rec.text);
    }
  }
};
