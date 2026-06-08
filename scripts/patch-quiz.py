with open('views/female-types.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add quiz data and UI to the template
quiz_section = """      <section class="wiki-type-quiz">
        <h3>快速判断问卷</h3>
        <p>5 道题，帮你快速判断她可能的沟通倾向。这不是标签，而是降低误判的起点。</p>
        <div v-if="quizMode === 'question'" class="wiki-type-quiz__question">
          <p class="wiki-type-quiz__progress">第 {{ quizCurrent + 1 }} / {{ quizQuestions.length }} 题</p>
          <h4>{{ quizQuestions[quizCurrent].text }}</h4>
          <div class="wiki-type-quiz__options">
            <button v-for="(opt, oi) in quizQuestions[quizCurrent].options" :key="oi" @click="answerQuiz(opt)">
              {{ opt.text }}
            </button>
          </div>
        </div>
        <div v-if="quizMode === 'result'" class="wiki-type-quiz__result">
          <h4>判断结果</h4>
          <p>她可能是以下类型（按匹配度排序）：</p>
          <div class="wiki-type-quiz__results">
            <article v-for="(r, ri) in quizResults" :key="ri" @click="select(r.id); quizMode = 'question'; quizAnswers = []; quizCurrent = 0;">
              <span>{{ typeById(r.id).icon }}</span>
              <b>{{ typeById(r.id).name }}</b>
              <em>{{ r.score }} 分匹配</em>
              <p>{{ typeById(r.id).subtitle }}</p>
            </article>
          </div>
          <button class="wiki-btn" @click="quizMode = 'question'; quizAnswers = []; quizCurrent = 0;">重新测试</button>
        </div>
      </section>

"""

# Insert after principles section
marker = '<section id="type-finder"'
idx = content.find(marker)
if idx >= 0:
    content = content[:idx] + quiz_section + content[idx:]
    print('Inserted quiz section')
else:
    print('WARNING: quiz marker not found')

# Update data() to include quiz state
old_data = """  data() {
    const types = window.FEMALE_TYPES || [];
    return {
      types,"""

new_data = """  data() {
    const types = window.FEMALE_TYPES || [];
    const quiz = window.FEMALE_TYPE_QUIZ || { questions: [] };
    return {
      types,
      quizQuestions: quiz.questions || [],
      quizMode: 'question',
      quizCurrent: 0,
      quizAnswers: [],
      quizResults: [],"""

content = content.replace(old_data, new_data)
print('Updated data()')

# Add quiz methods
old_methods = """  methods: {
    initialTypeId(types) {"""

new_methods = """  methods: {
    typeById(id) {
      return this.types.find(t => t.id === id) || { icon: '', name: id, subtitle: '' };
    },
    answerQuiz(option) {
      this.quizAnswers.push(option);
      if (this.quizCurrent < this.quizQuestions.length - 1) {
        this.quizCurrent++;
      } else {
        this.finishQuiz();
      }
    },
    finishQuiz() {
      const scores = {};
      this.quizAnswers.forEach(ans => {
        Object.entries(ans.scores).forEach(([typeId, score]) => {
          scores[typeId] = (scores[typeId] || 0) + score;
        });
      });
      this.quizResults = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id, score]) => ({ id, score }));
      this.quizMode = 'result';
    },
    initialTypeId(types) {"""

content = content.replace(old_methods, new_methods)
print('Updated methods')

with open('views/female-types.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
