/* 人设叙事 —— 专栏视图 */
window.PersonaView = {
  template: `
    <div class="persona-shell">
      <!-- 英雄区 -->
      <section class="persona-hero">
        <div class="persona-hero__glow persona-hero__glow--one"></div>
        <div class="persona-hero__glow persona-hero__glow--two"></div>
        <div class="persona-hero__content">
          <span class="persona-eyebrow">Identity Story</span>
          <h1>{{ data.title }}</h1>
          <p class="persona-hero__lead">{{ data.lead }}</p>
          <div class="persona-hero__quote" v-if="data.heroQuote">
            <span class="persona-hero__quote-mark">"</span>
            <p>{{ data.heroQuote.text }}</p>
          </div>
          <div class="persona-stats">
            <div v-for="stat in data.stats" :key="stat.label">
              <strong>{{ stat.num }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="persona-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="persona-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >{{ tab.name }}</button>
      </div>

      <!-- Tab 1: 核心人设定位 -->
      <section v-show="activeTab === 'identity'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.identitySection.title }}</h2>
          <p>{{ data.identitySection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.identitySection.intro }}</div>
        <div v-for="(cat, i) in data.identitySection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 2: 故事重塑技巧 -->
      <section v-show="activeTab === 'story'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.storySection.title }}</h2>
          <p>{{ data.storySection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.storySection.intro }}</div>
        <div v-for="(cat, i) in data.storySection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 3: 场景话术手册 -->
      <section v-show="activeTab === 'scene'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.sceneSection.title }}</h2>
          <p>{{ data.sceneSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.sceneSection.intro }}</div>
        <div v-for="(cat, i) in data.sceneSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 4: 零恋爱经验逆袭 -->
      <section v-show="activeTab === 'newbie'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.newbieSection.title }}</h2>
          <p>{{ data.newbieSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.newbieSection.intro }}</div>
        <div v-for="(cat, i) in data.newbieSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 5: 朋友圈人设 -->
      <section v-show="activeTab === 'social'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.socialSection.title }}</h2>
          <p>{{ data.socialSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.socialSection.intro }}</div>
        <div v-for="(cat, i) in data.socialSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 6: 7天自我认知训练 -->
      <section v-show="activeTab === 'training'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.trainingSection.title }}</h2>
          <p>{{ data.trainingSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.trainingSection.intro }}</div>
        <div v-for="(cat, i) in data.trainingSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 7: 实战案例分析 -->
      <section v-show="activeTab === 'case'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.caseSection.title }}</h2>
          <p>{{ data.caseSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.caseSection.intro }}</div>
        <div v-for="(cat, i) in data.caseSection.tips" :key="i" class="persona-case">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j"
            :class="{
              'persona-case__scene': item.startsWith('场景：'),
              'persona-case__bad': item.startsWith('❌'),
              'persona-case__analysis': item.startsWith('🔍'),
              'persona-case__good': item.startsWith('✅'),
              'persona-case__insight': item.startsWith('💡')
            }"
          >{{ item }}</div>
        </div>
      </section>

      <!-- Tab 8: 深度关系维护 -->
      <section v-show="activeTab === 'depth'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.depthSection.title }}</h2>
          <p>{{ data.depthSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.depthSection.intro }}</div>
        <div v-for="(cat, i) in data.depthSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 9: 浪子回头人设 -->
      <section v-show="activeTab === 'rebirth'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.rebirthSection.title }}</h2>
          <p>{{ data.rebirthSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.rebirthSection.intro }}</div>
        <div v-for="(cat, i) in data.rebirthSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 10: 困境应对话术 -->
      <section v-show="activeTab === 'hardship'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.hardshipSection.title }}</h2>
          <p>{{ data.hardshipSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.hardshipSection.intro }}</div>
        <div v-for="(cat, i) in data.hardshipSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 11: 翻身实战计划 -->
      <section v-show="activeTab === 'climb'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.climbSection.title }}</h2>
          <p>{{ data.climbSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.climbSection.intro }}</div>
        <div v-for="(cat, i) in data.climbSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>

      <!-- Tab 12: 浪子回头实战案例 -->
      <section v-show="activeTab === 'rebirthCase'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.rebirthCaseSection.title }}</h2>
          <p>{{ data.rebirthCaseSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.rebirthCaseSection.intro }}</div>
        <div v-for="(cat, i) in data.rebirthCaseSection.tips" :key="i" class="persona-case">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j"
            :class="{
              'persona-case__scene': item.startsWith('场景：'),
              'persona-case__bad': item.startsWith('❌'),
              'persona-case__analysis': item.startsWith('🔍'),
              'persona-case__good': item.startsWith('✅'),
              'persona-case__insight': item.startsWith('💡')
            }"
          >{{ item }}</div>
        </div>
      </section>

      <!-- Tab 13: 从谷底出发 -->
      <section v-show="activeTab === 'psych'" class="persona-section">
        <div class="persona-section__head">
          <h2>{{ data.psychSection.title }}</h2>
          <p>{{ data.psychSection.subtitle }}</p>
        </div>
        <div class="persona-intro">{{ data.psychSection.intro }}</div>
        <div v-for="(cat, i) in data.psychSection.tips" :key="i" class="persona-category">
          <h3>{{ cat.category }}</h3>
          <div v-for="(item, j) in cat.items" :key="j" class="persona-item">
            <span class="persona-item__num">{{ j + 1 }}</span>
            <span class="persona-item__text">{{ item }}</span>
          </div>
        </div>
      </section>
    </div>
  `,
  data() {
    return {
      data: window.PERSONA_DATA,
      activeTab: 'identity',
      tabs: [
        { id: 'identity', name: '人设定位' },
        { id: 'story', name: '故事重塑' },
        { id: 'scene', name: '场景话术' },
        { id: 'newbie', name: '零经验逆袭' },
        { id: 'social', name: '朋友圈人设' },
        { id: 'training', name: '7天训练' },
        { id: 'case', name: '实战案例' },
        { id: 'depth', name: '深度关系' },
        { id: 'rebirth', name: '浪子人设' },
        { id: 'hardship', name: '困境话术' },
        { id: 'climb', name: '翻身计划' },
        { id: 'rebirthCase', name: '浪子案例' },
        { id: 'psych', name: '谷底心法' }
      ]
    };
  }
};
