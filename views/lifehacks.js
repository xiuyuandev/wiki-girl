/* 生活妙招 —— 专栏视图（5倍扩充版） */
window.LifehacksView = {
  template: `
    <div class="lifehacks-shell">
      <!-- 英雄区 -->
      <section class="lifehacks-hero">
        <div class="lifehacks-hero__glow lifehacks-hero__glow--one"></div>
        <div class="lifehacks-hero__glow lifehacks-hero__glow--two"></div>
        <div class="lifehacks-hero__content">
          <span class="lifehacks-eyebrow">Life Wisdom</span>
          <h1>{{ data.title }}</h1>
          <p class="lifehacks-hero__lead">{{ data.lead }}</p>
          <div class="lifehacks-hero__quote" v-if="data.heroQuote">
            <span class="lifehacks-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
          </div>
          <div class="lifehacks-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="lifehacks-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="lifehacks-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- Tab 1: 形象品味 -->
      <section v-show="activeTab === 'image'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.imageSection.title }}</h2>
          <p>{{ data.imageSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.imageSection.intro }}</div>
        <div v-for="(cat, i) in data.imageSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 2: 生活美学 -->
      <section v-show="activeTab === 'aesthetic'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.aestheticSection.title }}</h2>
          <p>{{ data.aestheticSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.aestheticSection.intro }}</div>
        <div v-for="(cat, i) in data.aestheticSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 3: 饮食智慧 -->
      <section v-show="activeTab === 'food'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.foodSection.title }}</h2>
          <p>{{ data.foodSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.foodSection.intro }}</div>
        <div v-for="(cat, i) in data.foodSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 4: 社交礼仪 -->
      <section v-show="activeTab === 'etiquette'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.etiquetteSection.title }}</h2>
          <p>{{ data.etiquetteSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.etiquetteSection.intro }}</div>
        <div v-for="(cat, i) in data.etiquetteSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 5: 健康管理 -->
      <section v-show="activeTab === 'health'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.healthSection.title }}</h2>
          <p>{{ data.healthSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.healthSection.intro }}</div>
        <div v-for="(cat, i) in data.healthSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 6: 财务智慧 -->
      <section v-show="activeTab === 'finance'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.financeSection.title }}</h2>
          <p>{{ data.financeSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.financeSection.intro }}</div>
        <div v-for="(cat, i) in data.financeSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 7: 精神修养 -->
      <section v-show="activeTab === 'spirit'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.spiritSection.title }}</h2>
          <p>{{ data.spiritSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.spiritSection.intro }}</div>
        <div v-for="(cat, i) in data.spiritSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 8: 实用技能 -->
      <section v-show="activeTab === 'skills'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.skillsSection.title }}</h2>
          <p>{{ data.skillsSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.skillsSection.intro }}</div>
        <div v-for="(cat, i) in data.skillsSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 9: 沟通谈资 -->
      <section v-show="activeTab === 'talk'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.talkSection.title }}</h2>
          <p>{{ data.talkSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.talkSection.intro }}</div>
        <div v-for="(cat, i) in data.talkSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 10: 约会场景 -->
      <section v-show="activeTab === 'date'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.dateSection.title }}</h2>
          <p>{{ data.dateSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.dateSection.intro }}</div>
        <div v-for="(cat, i) in data.dateSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 11: 数字生活 -->
      <section v-show="activeTab === 'digital'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.digitalSection.title }}</h2>
          <p>{{ data.digitalSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.digitalSection.intro }}</div>
        <div v-for="(cat, i) in data.digitalSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 12: 职场智慧 -->
      <section v-show="activeTab === 'work'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.workSection.title }}</h2>
          <p>{{ data.workSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.workSection.intro }}</div>
        <div v-for="(cat, i) in data.workSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 13: 季节生活 -->
      <section v-show="activeTab === 'season'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.seasonSection.title }}</h2>
          <p>{{ data.seasonSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.seasonSection.intro }}</div>
        <div v-for="(cat, i) in data.seasonSection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 14: 生活应急 -->
      <section v-show="activeTab === 'emergency'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.emergencySection.title }}</h2>
          <p>{{ data.emergencySection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.emergencySection.intro }}</div>
        <div v-for="(cat, i) in data.emergencySection.tips" :key="i" class="lifehacks-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="lifehacks-item">
            <span class="lifehacks-item__num">{{ j + 1 }}</span>
            <span class="lifehacks-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 15: 90天养成计划 -->
      <section v-show="activeTab === 'plan'" class="lifehacks-section">
        <div class="lifehacks-section__head">
          <h2>{{ data.planSection.title }}</h2>
          <p>{{ data.planSection.subtitle }}</p>
        </div>
        <div class="lifehacks-intro">{{ data.planSection.intro }}</div>
        <div v-for="(phase, i) in data.planSection.phases" :key="i" class="lifehacks-phase">
          <h3 class="lifehacks-phase__title">{{ phase.phase }}</h3>
          <p class="lifehacks-phase__desc">{{ phase.desc }}</p>
          <div v-for="(day, j) in phase.days" :key="j" class="lifehacks-day">
            <span class="lifehacks-day-label">{{ day.day }}</span>
            <span class="lifehacks-day-task">{{ day.task }}</span>
          </div>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      data: window.LIFEHACKS_DATA,
      activeTab: 'image',
      tabs: [
        { id: 'image', name: '形象品味' },
        { id: 'aesthetic', name: '生活美学' },
        { id: 'food', name: '饮食智慧' },
        { id: 'etiquette', name: '社交礼仪' },
        { id: 'health', name: '健康管理' },
        { id: 'finance', name: '财务智慧' },
        { id: 'spirit', name: '精神修养' },
        { id: 'skills', name: '实用技能' },
        { id: 'talk', name: '沟通谈资' },
        { id: 'date', name: '约会场景' },
        { id: 'digital', name: '数字生活' },
        { id: 'work', name: '职场智慧' },
        { id: 'season', name: '季节生活' },
        { id: 'emergency', name: '生活应急' },
        { id: 'plan', name: '90天计划' }
      ]
    };
  }
};
