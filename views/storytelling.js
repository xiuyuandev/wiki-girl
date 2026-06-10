/* 故事叙述与幽默能力 —— 专栏视图（丰富版） */
window.StorytellingView = {
  template: `
    <div class="wiki-story-shell">
      <!-- 英雄区 -->
      <section class="wiki-story-hero">
        <div class="wiki-story-hero__glow wiki-story-hero__glow--one"></div>
        <div class="wiki-story-hero__glow wiki-story-hero__glow--two"></div>
        <div class="wiki-story-hero__content">
          <span class="wiki-story-eyebrow">Storytelling & Humor System</span>
          <h1>{{ data.title }}</h1>
          <p class="wiki-story-hero__lead">{{ data.lead }}</p>
          <div class="wiki-story-hero__quote" v-if="data.heroQuote">
            <span class="wiki-story-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
            <div class="wiki-story-hero__quote-source">
              <strong>{{ data.heroQuote.author }}</strong>
              <span>{{ data.heroQuote.source }}</span>
            </div>
          </div>
          <div class="wiki-story-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="wiki-story-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="wiki-story-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- ═══════════════════════════════════════════
           Tab 1: 故事叙述系统
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'story'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>{{ data.storySection.title }}</h2>
          <p>{{ data.storySection.subtitle }}</p>
        </div>
        <div class="wiki-story-intro"><p>{{ data.storySection.intro }}</p></div>

        <!-- 六大原则 -->
        <div class="wiki-story-section__head">
          <h2>故事六大黄金原则</h2>
          <p>所有好故事都遵循这六条底层逻辑</p>
        </div>
        <div class="wiki-story-principles">
          <div v-for="(p, i) in data.storySection.principles" :key="i" class="wiki-story-principle-card">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="wiki-story-principle-example">{{ p.example }}</div>
          </div>
        </div>

        <!-- 八大模板 -->
        <div class="wiki-story-section__head">
          <h2>八大故事架构模板</h2>
          <p>点击展开每个模板，学习结构、示例和练习方法</p>
        </div>
        <div class="wiki-story-templates">
          <div
            v-for="t in data.storySection.templates"
            :key="t.id"
            class="wiki-story-template-card"
            :class="{ active: selectedTemplate === t.id }"
          >
            <div class="wiki-story-template__head" @click="selectTemplate(t.id)">
              <span>{{ t.icon }}</span>
              <div><h3>{{ t.name }}</h3></div>
              <span class="wiki-story-template-tag">{{ t.tag }}</span>
            </div>
            <div v-show="selectedTemplate === t.id" class="wiki-story-template__body">
              <p>{{ t.desc }}</p>
              <div class="wiki-story-structure">
                <span v-for="(step, i) in t.structure" :key="i">{{ i + 1 }}. {{ step }}</span>
              </div>
              <div v-for="(ex, i) in t.examples" :key="i" class="wiki-story-example">
                <span class="wiki-story-example-label">{{ ex.scene }}</span>
                <p>{{ ex.story }}</p>
              </div>
              <div class="wiki-story-template-meta">
                <div><strong>练习：</strong><span>{{ t.practice }}</span></div>
                <div><strong>适用：</strong><span>{{ t.usage }}</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 素材收集系统 -->
        <div class="wiki-story-section__head">
          <h2>{{ data.storySection.collectionSystem.title }}</h2>
          <p>{{ data.storySection.collectionSystem.desc }}</p>
        </div>
        <div class="wiki-story-collection">
          <div class="wiki-story-categories">
            <div v-for="cat in data.storySection.collectionSystem.categories" :key="cat.name" class="wiki-story-category">
              <h4>{{ cat.name }}</h4>
              <ul><li v-for="(prompt, i) in cat.prompts" :key="i">{{ prompt }}</li></ul>
            </div>
          </div>
          <div class="wiki-story-method">
            <h4>操作方法</h4>
            <ol><li v-for="(step, i) in data.storySection.collectionSystem.method" :key="i">{{ step }}</li></ol>
          </div>
        </div>

        <!-- 场景应用指南 -->
        <div class="wiki-story-section__head">
          <h2>场景应用实战指南</h2>
          <p>不同场景下的故事选择策略和具体示例</p>
        </div>
        <div class="wiki-story-scenes">
          <div v-for="(scene, i) in data.storySection.sceneGuide" :key="i" class="wiki-story-scene-card">
            <header>
              <span>场景 {{ String(i + 1).padStart(2, '0') }}</span>
              <h3>{{ scene.scene }}</h3>
            </header>
            <div class="wiki-story-scene-goal">目标：{{ scene.goal }}</div>
            <ul class="wiki-story-scene-tips">
              <li v-for="(tip, j) in scene.tips" :key="j">{{ tip }}</li>
            </ul>
            <div class="wiki-story-scene-example">
              <strong>示例</strong>
              <p>{{ scene.example.story }}</p>
              <p>{{ scene.example.followUp }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 2: 幽默能力系统
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'humor'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>{{ data.humorSection.title }}</h2>
          <p>{{ data.humorSection.subtitle }}</p>
        </div>
        <div class="wiki-story-intro"><p>{{ data.humorSection.intro }}</p></div>

        <!-- 幽默四大原理 -->
        <div class="wiki-story-section__head">
          <h2>幽默四大底层原理</h2>
          <p>所有幽默技术都建立在这四个认知机制之上</p>
        </div>
        <div class="wiki-story-principles">
          <div v-for="(p, i) in data.humorSection.principles" :key="i" class="wiki-story-principle-card">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="wiki-story-principle-example">公式：{{ p.formula }}</div>
          </div>
        </div>

        <!-- 十二大技术 -->
        <div class="wiki-story-section__head">
          <h2>十二大幽默核心技术</h2>
          <p>点击展开学习每种技术的公式、示例和练习方法</p>
        </div>
        <div class="wiki-humor-techniques">
          <div
            v-for="t in data.humorSection.techniques"
            :key="t.id"
            class="wiki-humor-card"
            :class="{ active: selectedHumor === t.id }"
          >
            <div class="wiki-humor__head" @click="selectHumor(t.id)">
              <span>{{ t.icon }}</span>
              <h3>{{ t.name }}</h3>
              <span class="wiki-humor-level" :class="'wiki-humor-level--' + (t.level === '入门' ? 'entry' : t.level === '进阶' ? 'advanced' : 'master')">{{ t.level }}</span>
            </div>
            <div v-show="selectedHumor === t.id" class="wiki-humor__body">
              <p>{{ t.desc }}</p>
              <div class="wiki-humor-formula">{{ t.formula }}</div>
              <div v-for="(ex, i) in t.examples" :key="i" class="wiki-humor-example">
                <span class="wiki-humor-example-label">{{ ex.context }}</span>
                <p>{{ ex.line }}</p>
              </div>
              <div class="wiki-humor-practice"><strong>练习</strong><p>{{ t.practice }}</p></div>
              <div class="wiki-humor-avoid"><strong>避雷：</strong><p>{{ t.avoid }}</p></div>
            </div>
          </div>
        </div>

        <!-- 避雷指南 -->
        <div class="wiki-story-section__head">
          <h2>幽默避雷指南</h2>
          <p>知道什么不该说，比知道什么该说更重要</p>
        </div>
        <div class="wiki-humor-avoid-section">
          <div v-for="(cat, i) in data.humorSection.avoidGuide" :key="i" class="wiki-humor-avoid-card" :class="{ danger: cat.category === '绝对禁区', warning: cat.category.includes('灰色'), safe: cat.category === '安全区' }">
            <h4>{{ cat.category }}</h4>
            <ul><li v-for="(item, j) in cat.items" :key="j">{{ item }}</li></ul>
          </div>
        </div>

        <!-- 场景幽默速查 -->
        <div class="wiki-story-section__head">
          <h2>场景幽默速查手册</h2>
          <p>不同场景下的幽默策略和可直接使用的话术</p>
        </div>
        <div class="wiki-humor-scenes">
          <div v-for="(scene, i) in data.humorSection.sceneHumor" :key="i" class="wiki-humor-scene-card">
            <h4>{{ scene.scene }}</h4>
            <div class="wiki-humor-scene-tech">
              <span v-for="(tech, j) in scene.techniques" :key="j">{{ tech }}</span>
            </div>
            <ul class="wiki-humor-scene-examples">
              <li v-for="(line, j) in scene.examples" :key="j">{{ line }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 3: 实战训练系统
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'practice'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>{{ data.practiceSection.title }}</h2>
          <p>{{ data.practiceSection.subtitle }}</p>
        </div>
        <div class="wiki-story-intro"><p>{{ data.practiceSection.intro }}</p></div>

        <!-- 每日微练习 -->
        <div class="wiki-story-section__head">
          <h2>每日微练习</h2>
          <p>不需要大块时间，每天几分钟就能积累进步</p>
        </div>
        <div class="wiki-story-drills">
          <div v-for="drill in data.practiceSection.dailyDrills" :key="drill.name" class="wiki-story-drill-card">
            <h4>{{ drill.name }}</h4>
            <span class="wiki-story-drill-time">⏱ {{ drill.time }}</span>
            <p>{{ drill.desc }}</p>
            <div v-if="drill.template" class="wiki-story-drill-template">{{ drill.template }}</div>
            <div v-if="drill.example" class="wiki-story-drill-template">{{ drill.example }}</div>
            <div v-if="drill.checklist" class="wiki-story-drill-template"><div v-for="(item, i) in drill.checklist" :key="i">• {{ item }}</div></div>
            <div v-if="drill.tip" class="wiki-story-drill-tip">💡 {{ drill.tip }}</div>
            <div v-if="drill.categories" class="wiki-story-drill-tip">📁 {{ drill.categories }}</div>
          </div>
        </div>

        <!-- 30天计划 -->
        <div class="wiki-story-section__head">
          <h2>30天进阶计划</h2>
          <p>从刻意练习到自然流露的四周蜕变</p>
        </div>
        <div class="wiki-story-weeks">
          <div
            v-for="week in data.practiceSection.weeklyPlan"
            :key="week.week"
            class="wiki-story-week-card"
            :class="{ 'active-week': selectedWeek === week.week }"
          >
            <div class="wiki-story-week__head" @click="selectWeek(week.week)">
              <span>Week {{ String(week.week).padStart(2, '0') }}</span>
              <div>
                <h3>{{ week.title }}</h3>
                <p>{{ week.focus }}</p>
              </div>
              <span class="wiki-story-week-focus">{{ week.days.length }} 天训练</span>
            </div>
            <div v-show="selectedWeek === week.week" class="wiki-story-week__body">
              <div class="wiki-story-days">
                <div v-for="day in week.days" :key="day.day" class="wiki-story-day">
                  <span class="wiki-story-day-num">{{ day.day }}</span>
                  <div class="wiki-story-day-content">
                    <p>{{ day.task }}</p>
                    <span class="wiki-story-day-tool">{{ day.tool }}</span>
                  </div>
                </div>
              </div>
              <div class="wiki-story-week-insight">
                <strong>核心洞察</strong>
                <p>{{ week.insight }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 开场白库 -->
        <div class="wiki-story-section__head">
          <h2>场景开场白库</h2>
          <p>不同场景下的开场白模板，直接可用</p>
        </div>
        <div class="wiki-story-openers">
          <div v-for="opener in data.practiceSection.openers" :key="opener.scene" class="wiki-story-opener-card">
            <h4>{{ opener.scene }}</h4>
            <span class="wiki-story-opener-type">{{ opener.type }}</span>
            <ul class="wiki-story-opener-lines">
              <li v-for="(line, i) in opener.lines" :key="i">{{ line }}</li>
            </ul>
          </div>
        </div>

        <!-- 等级检查点 -->
        <div class="wiki-story-section__head">
          <h2>成长等级检查点</h2>
          <p>对照这些标准，知道自己到了哪个阶段</p>
        </div>
        <div class="wiki-story-checkpoints">
          <div v-for="cp in data.practiceSection.checkpoints" :key="cp.level" class="wiki-story-checkpoint-card">
            <h4>{{ cp.level }}</h4>
            <ul><li v-for="(c, i) in cp.criteria" :key="i">{{ c }}</li></ul>
            <div class="wiki-story-checkpoint-test">{{ cp.test }}</div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 4: 真实案例
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'cases'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>真实案例库</h2>
          <p>从知道到做到的 bridging——看案例，理解技巧如何在真实对话中落地</p>
        </div>
        <div class="wiki-story-cases">
          <div v-for="(c, i) in data.cases" :key="i" class="wiki-story-case-card">
            <div class="wiki-story-case__head" @click="toggleCase(i)">
              <h3>{{ c.title }}</h3>
              <p class="wiki-story-case-situation">{{ c.situation }}</p>
            </div>
            <div v-show="selectedCase === i" class="wiki-story-case__body">
              <div class="wiki-story-case-comparison">
                <div v-if="c.before && Array.isArray(c.before)" class="wiki-story-case-before">
                  <strong>错误示范</strong>
                  <ul class="wiki-story-case-dialogue"><li v-for="(line, j) in c.before" :key="j">{{ line }}</li></ul>
                </div>
                <div v-else-if="c.before" class="wiki-story-case-before">
                  <strong>错误回应</strong>
                  <p style="font-size:13px;color:var(--text-secondary);margin:0;">{{ c.before }}</p>
                </div>
                <div v-if="c.after && Array.isArray(c.after)" class="wiki-story-case-after">
                  <strong>正确示范</strong>
                  <ul class="wiki-story-case-dialogue"><li v-for="(line, j) in c.after" :key="j">{{ line }}</li></ul>
                </div>
                <div v-else-if="c.after" class="wiki-story-case-after">
                  <strong>正确回应</strong>
                  <p style="font-size:13px;color:var(--text-secondary);margin:0;">{{ c.after }}</p>
                </div>
              </div>
              <div class="wiki-story-case-meta">
                <div v-if="c.technique"><strong>技术解析</strong><p>{{ c.technique }}</p></div>
                <div v-if="c.result"><strong>结果</strong><p>{{ c.result }}</p></div>
                <div v-if="c.takeaway"><strong>核心 takeaway</strong><p>{{ c.takeaway }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 5: 错误与修正
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'mistakes'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>常见错误与修正</h2>
          <p>提前知道这些坑，少走三个月弯路</p>
        </div>
        <div class="wiki-story-mistakes">
          <div v-for="(m, i) in data.mistakes" :key="i" class="wiki-story-mistake-card">
            <h4>{{ m.mistake }}</h4>
            <p class="wiki-story-mistake-cause"><strong>原因：</strong>{{ m.cause }}</p>
            <div class="wiki-story-mistake-fix"><strong>修正：</strong>{{ m.fix }}</div>
          </div>
        </div>

        <!-- 快速参考卡片 -->
        <div class="wiki-story-section__head">
          <h2>快速参考卡片</h2>
          <p>收藏这一节，关键时刻翻出来看</p>
        </div>
        <div class="wiki-story-quick-cards">
          <div v-for="card in data.quickCards" :key="card.title" class="wiki-story-quick-card">
            <h4><span>{{ card.icon }}</span>{{ card.title }}</h4>
            <ol v-if="card.items"><li v-for="(item, i) in card.items" :key="i">{{ item }}</li></ol>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 6: 讲述技巧（声音/节奏/肢体）
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'skills'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>{{ data.tellingSkills.title }}</h2>
          <p>{{ data.tellingSkills.subtitle }}</p>
        </div>
        <div class="wiki-story-intro"><p>{{ data.tellingSkills.intro }}</p></div>

        <!-- 声音技巧 -->
        <div class="wiki-story-section__head">
          <h2>声音技巧</h2>
          <p>让你的声音成为故事的一部分</p>
        </div>
        <div class="wiki-telling-grid">
          <div v-for="(s, i) in data.tellingSkills.voiceSkills" :key="i" class="wiki-telling-card">
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
            <div v-if="s.example" class="wiki-telling-example">
              <strong>示例</strong>
              <p>{{ s.example }}</p>
            </div>
            <div v-if="s.exercise" class="wiki-telling-exercise">
              <strong>练习</strong>
              <p>{{ s.exercise }}</p>
            </div>
            <div v-if="s.tip" class="wiki-telling-tip">
              <strong>提示</strong>
              <p>{{ s.tip }}</p>
            </div>
          </div>
        </div>

        <!-- 节奏技巧 -->
        <div class="wiki-story-section__head">
          <h2>节奏技巧</h2>
          <p>好故事像音乐，有起伏有留白</p>
        </div>
        <div class="wiki-telling-grid">
          <div v-for="(s, i) in data.tellingSkills.rhythmSkills" :key="i" class="wiki-telling-card">
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
            <div v-if="s.timing" class="wiki-telling-example">
              <strong>时机参考</strong>
              <p>{{ s.timing }}</p>
            </div>
            <div v-if="s.example" class="wiki-telling-example">
              <strong>示例</strong>
              <p>{{ s.example }}</p>
            </div>
            <div v-if="s.tip" class="wiki-telling-tip">
              <strong>提示</strong>
              <p>{{ s.tip }}</p>
            </div>
          </div>
        </div>

        <!-- 肢体语言 -->
        <div class="wiki-story-section__head">
          <h2>肢体语言</h2>
          <p>你的身体也在讲故事</p>
        </div>
        <div class="wiki-telling-grid">
          <div v-for="(s, i) in data.tellingSkills.bodySkills" :key="i" class="wiki-telling-card">
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
            <div v-if="s.note" class="wiki-telling-tip">
              <strong>注意</strong>
              <p>{{ s.note }}</p>
            </div>
            <div v-if="s.warning" class="wiki-humor-avoid">
              <strong>警告</strong>
              <p>{{ s.warning }}</p>
            </div>
            <div v-if="s.exercise" class="wiki-telling-exercise">
              <strong>练习</strong>
              <p>{{ s.exercise }}</p>
            </div>
          </div>
        </div>

        <!-- 练习清单 -->
        <div class="wiki-story-method" style="margin-top:24px;">
          <h4>每日讲述练习清单</h4>
          <ol><li v-for="(step, i) in data.tellingSkills.practiceRoutine" :key="i">{{ step }}</li></ol>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 7: 关系阶段策略
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'stages'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>{{ data.relationshipStages.title }}</h2>
          <p>{{ data.relationshipStages.subtitle }}</p>
        </div>
        <div class="wiki-story-intro"><p>{{ data.relationshipStages.intro }}</p></div>

        <div v-for="(stage, i) in data.relationshipStages.stages" :key="i" class="wiki-stage-card">
          <div class="wiki-stage__head">
            <span>阶段 {{ i + 1 }}</span>
            <h3>{{ stage.stage }}</h3>
            <p>目标：{{ stage.goal }}</p>
          </div>
          <div class="wiki-stage__body">
            <div class="wiki-stage-do">
              <h4>✅ 应该做的</h4>
              <ul><li v-for="(item, j) in stage.doList" :key="j">{{ item }}</li></ul>
            </div>
            <div class="wiki-stage-dont">
              <h4>❌ 不应该做的</h4>
              <ul><li v-for="(item, j) in stage.dontList" :key="j">{{ item }}</li></ul>
            </div>
            <div v-if="stage.examples" class="wiki-stage-examples">
              <h4>💬 话术示例</h4>
              <p v-for="(ex, j) in stage.examples" :key="j">{{ ex }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════
           Tab 8: 微信话术专区
           ═══════════════════════════════════════════ -->
      <section v-show="activeTab === 'wechat'" class="wiki-story-section">
        <div class="wiki-story-section__head">
          <h2>{{ data.wechatPhrases.title }}</h2>
          <p>{{ data.wechatPhrases.subtitle }}</p>
        </div>
        <div class="wiki-story-intro"><p>{{ data.wechatPhrases.intro }}</p></div>

        <!-- 话术分类 -->
        <div v-for="(cat, i) in data.wechatPhrases.categories" :key="i" class="wiki-wechat-category">
          <div class="wiki-wechat-cat__head">
            <h3>{{ cat.name }}</h3>
            <p>模板：{{ cat.template }}</p>
          </div>
          <div class="wiki-wechat-cat__body">
            <div v-for="(ex, j) in cat.examples" :key="j" class="wiki-wechat-example">
              <p>{{ ex }}</p>
            </div>
          </div>
        </div>

        <!-- 使用技巧 -->
        <div class="wiki-story-section__head">
          <h2>微信故事话术使用技巧</h2>
        </div>
        <div class="wiki-story-method">
          <ul style="list-style:none;padding:0;">
            <li v-for="(tip, i) in data.wechatPhrases.tips" :key="i" style="padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text-secondary);">
              <strong style="color:var(--accent);">{{ i + 1 }}.</strong> {{ tip }}
            </li>
          </ul>
        </div>
      </section>

      <!-- CTA -->
      <section class="wiki-story-cta">
        <h2>从今天开始</h2>
        <p>不需要读完所有内容。选择一个你最感兴趣的模板或技术，今天就在真实对话中试一次。<br>故事和幽默不是天赋，是每一次开口的积累。</p>
        <div class="wiki-story-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/a/ch4" class="wiki-btn wiki-btn--primary">阅读高情商聊天章节</router-link>
        </div>
      </section>
    </div>
  `,

  data() {
    return {
      data: window.STORYTELLING_DATA || {},
      activeTab: 'story',
      selectedTemplate: null,
      selectedHumor: null,
      selectedWeek: 1,
      selectedCase: null,
      tabs: [
        { id: 'story', name: '故事叙述' },
        { id: 'humor', name: '幽默技术' },
        { id: 'practice', name: '实战训练' },
        { id: 'cases', name: '真实案例' },
        { id: 'mistakes', name: '错误修正' },
        { id: 'skills', name: '讲述技巧' },
        { id: 'stages', name: '阶段策略' },
        { id: 'wechat', name: '微信话术' }
      ]
    };
  },

  methods: {
    selectTemplate(id) {
      this.selectedTemplate = this.selectedTemplate === id ? null : id;
    },
    selectHumor(id) {
      this.selectedHumor = this.selectedHumor === id ? null : id;
    },
    selectWeek(week) {
      this.selectedWeek = this.selectedWeek === week ? null : week;
    },
    toggleCase(i) {
      this.selectedCase = this.selectedCase === i ? null : i;
    }
  }
};
