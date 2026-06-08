/* 幸福的科学 —— 耶鲁 The Science of Well-Being 专栏视图 */
window.PositivePsychologyView = {
  template: `
    <div class="wiki-positive-shell">
      <!-- 英雄区 -->
      <section class="wiki-positive-hero">
        <div class="wiki-positive-hero__glow wiki-positive-hero__glow--one"></div>
        <div class="wiki-positive-hero__glow wiki-positive-hero__glow--two"></div>
        <div class="wiki-positive-hero__content">
          <p class="wiki-positive-eyebrow">Yale University · The Science of Well-Being · Laurie Santos</p>
          <h1>{{ data.title }}</h1>
          <p class="wiki-positive-hero__lead">{{ data.lead }}</p>
          <div class="wiki-positive-hero__quote" v-if="data.heroQuote">
            <span class="wiki-positive-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
            <div class="wiki-positive-hero__quote-source">
              <strong>{{ data.heroQuote.author }}</strong>
              <span>{{ data.heroQuote.source }}</span>
            </div>
          </div>
          <div class="wiki-positive-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 直觉陷阱 -->
      <section class="wiki-positive-section">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">Intuition Failures</p>
          <h2>直觉陷阱：为什么你越努力越不幸福</h2>
          <p>Santos 教授说："我们的大脑关于幸福的默认设置，在石器时代管用，在现代社会基本失效。"以下四个陷阱，你中了几个？</p>
        </div>
        <div class="wiki-positive-intuition">
          <article v-for="(item, i) in data.intuitionFailures" :key="i" class="wiki-positive-intuition-card">
            <div class="wiki-positive-intuition-num">0{{ i + 1 }}</div>
            <div class="wiki-positive-intuition-myth">
              <span>我们以为</span>
              <h3>{{ item.title }}</h3>
            </div>
            <div class="wiki-positive-intuition-scenario">
              <span>生活场景</span>
              <p>{{ item.scenario }}</p>
            </div>
            <div class="wiki-positive-intuition-reality">
              <span>科学真相</span>
              <p>{{ item.reality }}</p>
            </div>
            <div class="wiki-positive-intuition-study">
              <span>研究来源</span>
              <p>{{ item.study }}</p>
            </div>
            <div class="wiki-positive-intuition-action">
              <span>具体行动</span>
              <p>{{ item.action }}</p>
            </div>
            <div class="wiki-positive-intuition-realtalk">
              <span>大实话</span>
              <p>{{ item.realTalk }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 核心模块 -->
      <section class="wiki-positive-section wiki-positive-section--alt">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">Core Modules</p>
          <h2>五大核心模块</h2>
          <p>课程围绕五个经过实证研究验证的幸福维度展开。每个模块都有具体的训练工具和可测量的效果。</p>
        </div>
        <div class="wiki-positive-dimensions">
          <article v-for="dim in data.dimensions" :key="dim.id" class="wiki-positive-dimension-card">
            <header>
              <span class="wiki-positive-dim-icon">{{ dim.icon }}</span>
              <h3>{{ dim.name }}</h3>
              <p>{{ dim.desc }}</p>
            </header>
            <div class="wiki-positive-dim-detail">
              <p>{{ dim.detail }}</p>
            </div>
            <div class="wiki-positive-dim-real">
              <span>真实例子</span>
              <p>{{ dim.realLife }}</p>
            </div>
            <div class="wiki-positive-dim-topics">
              <div v-for="(topic, i) in dim.topics" :key="i" class="wiki-positive-topic">
                <strong>{{ topic.title }}</strong>
                <span>{{ topic.desc }}</span>
              </div>
            </div>
            <div class="wiki-positive-dim-action">
              <span>今天就能做</span>
              <p>{{ dim.todayAction }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 生活场景实战 -->
      <section class="wiki-positive-section">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">Real Life Scenarios</p>
          <h2>生活场景实战：把理论用到具体问题上</h2>
          <p>不是抽象的道理，而是你每天可能遇到的具体情境，以及可以直接套用的应对方式。</p>
        </div>
        <div class="wiki-positive-scenarios">
          <article v-for="(scene, i) in data.lifeScenarios" :key="i" class="wiki-positive-scenario-card">
            <header>
              <span>场景 {{ String(i + 1).padStart(2, '0') }}</span>
              <h3>{{ scene.title }}</h3>
            </header>
            <div class="wiki-positive-scenario-before">
              <span>以前的做法</span>
              <p>{{ scene.before }}</p>
            </div>
            <div class="wiki-positive-scenario-arrow">↓ 换成 ↓</div>
            <div class="wiki-positive-scenario-after">
              <span>现在的做法</span>
              <p>{{ scene.after }}</p>
            </div>
            <div class="wiki-positive-scenario-tool">
              <span>用到的工具</span>
              <p>{{ scene.tool }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 12周计划 -->
      <section class="wiki-positive-section wiki-positive-section--alt">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">12-Week ReWirement</p>
          <h2>12周 rewiring 计划</h2>
          <p>Santos 用 "rewirement"（重新布线）而非 "requirement"（要求）来命名——目标是重塑大脑的默认模式，而不是给自己增加压力。</p>
        </div>
        <div class="wiki-positive-weeks">
          <article v-for="week in data.weeklyPlan" :key="week.week" class="wiki-positive-week-card">
            <header>
              <span>Week {{ String(week.week).padStart(2, '0') }}</span>
              <h3>{{ week.title }}</h3>
              <p>{{ week.focus }}</p>
            </header>
            <ul>
              <li v-for="(action, i) in week.actions" :key="i">{{ action }}</li>
            </ul>
            <div class="wiki-positive-week-insight">
              <span>核心洞察</span>
              <p>{{ week.insight }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 科学工具库 -->
      <section class="wiki-positive-section">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">Evidence-Based Tools</p>
          <h2>科学工具库</h2>
          <p>这些工具都有随机对照实验支持。不要一次尝试所有，选择2-3个最适合你的，坚持至少一周。</p>
        </div>
        <div class="wiki-positive-tools">
          <article v-for="tool in data.dailyTools" :key="tool.name" class="wiki-positive-tool-card">
            <header>
              <h3>{{ tool.name }}</h3>
              <span class="wiki-positive-tool-time">⏱ {{ tool.time }}</span>
            </header>
            <p class="wiki-positive-tool-desc">{{ tool.desc }}</p>
            <div class="wiki-positive-tool-example">
              <span>例子</span>
              <p>{{ tool.example }}</p>
            </div>
            <div class="wiki-positive-tool-when">
              <span>什么时候做</span>
              <p>{{ tool.when }}</p>
            </div>
            <div class="wiki-positive-tool-how">
              <span>怎么做</span>
              <p>{{ tool.how }}</p>
            </div>
            <div class="wiki-positive-tool-meta">
              <div><strong>效果：</strong>{{ tool.effect }}</div>
              <div><strong>来源：</strong>{{ tool.source }}</div>
            </div>
          </article>
        </div>
      </section>

      <!-- 幸福误区 -->
      <section class="wiki-positive-section wiki-positive-section--alt">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">Myth Busting</p>
          <h2>幸福误区澄清</h2>
          <p>这些常见信念阻碍了你的幸福。用科学证据替换它们。</p>
        </div>
        <div class="wiki-positive-myths">
          <article v-for="(item, i) in data.myths" :key="i" class="wiki-positive-myth-card">
            <div class="wiki-positive-myth">
              <span>误区</span>
              <p>{{ item.myth }}</p>
            </div>
            <div class="wiki-positive-truth">
              <span>真相</span>
              <p>{{ item.truth }}</p>
            </div>
            <div class="wiki-positive-action">
              <span>行动</span>
              <p>{{ item.action }}</p>
            </div>
            <div class="wiki-positive-source">
              <span>来源</span>
              <p>{{ item.source }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- 延伸阅读 -->
      <section class="wiki-positive-section">
        <div class="wiki-positive-section__head">
          <p class="wiki-positive-eyebrow">Resources</p>
          <h2>延伸阅读与工具</h2>
        </div>
        <div class="wiki-positive-resources">
          <a v-for="res in data.resources" :key="res.name" :href="res.url" target="_blank" rel="noopener" class="wiki-positive-resource-card">
            <h3>{{ res.name }}</h3>
            <p>{{ res.desc }}</p>
            <span>访问链接 →</span>
          </a>
        </div>
      </section>

      <!-- CTA -->
      <section class="wiki-positive-cta">
        <h2>从这周开始</h2>
        <p>不需要读完所有内容。选择本周最想改善的一个维度，做一个微行动。<br>幸福不是终点，而是持续练习的副产品。</p>
        <div class="wiki-positive-cta-buttons">
          <router-link to="/" class="wiki-btn">返回首页</router-link>
          <router-link to="/a/ch41" class="wiki-btn wiki-btn--primary">阅读第41章：哈佛积极心理学实战课</router-link>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      data: window.POSITIVE_PSYCHOLOGY || {}
    };
  }
};
