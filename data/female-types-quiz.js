/* 女性类型快速判断问卷 */
window.FEMALE_TYPE_QUIZ = {
  title: '她是哪种沟通倾向？',
  subtitle: '5 道题，帮你快速判断对方的沟通类型。这不是标签，而是降低误判的起点。',
  questions: [
    {
      id: 'q1',
      text: '你发消息后，她通常怎么回？',
      options: [
        { text: '认真接话但不一定快', scores: { 'slow-warm': 3, 'rational-boundary': 2, 'passive-response': 2 } },
        { text: '热情活泼，朋友式互动', scores: { 'social-bright': 3, 'playful-teasing': 2, 'direct-expressive': 1 } },
        { text: '直接清晰，不绕弯子', scores: { 'rational-boundary': 3, 'direct-expressive': 2, 'high-standard': 1 } },
        { text: '时冷时热，忽近忽远', scores: { 'avoidant-pull': 3, 'exploratory-uncertain': 2, 'emotion-sensitive': 1 } },
        { text: '经常需要确认你的态度', scores: { 'security-seeking': 3, 'emotion-sensitive': 2, 'people-pleasing': 1 } }
      ]
    },
    {
      id: 'q2',
      text: '聊到关系或未来，她的反应是？',
      options: [
        { text: '需要更多时间了解', scores: { 'slow-warm': 3, 'friendship-first': 2, 'exploratory-uncertain': 2 } },
        { text: '直接问现实条件和规划', scores: { 'blind-date-evaluator': 3, 'pragmatic-realistic': 2, 'high-standard': 2 } },
        { text: '在意相处感受和体验', scores: { 'romantic-experience': 3, 'artistic-feeling': 2, 'social-bright': 1 } },
        { text: '回避定义，保持模糊', scores: { 'avoidant-pull': 3, 'exploratory-uncertain': 2, 'healing-recovery': 1 } },
        { text: '表达清楚但设边界', scores: { 'rational-boundary': 3, 'mature-stable': 2, 'high-sensitive-boundary': 2 } }
      ]
    },
    {
      id: 'q3',
      text: '她情绪不好时，最需要什么？',
      options: [
        { text: '被理解和倾听', scores: { 'emotion-sensitive': 3, 'security-seeking': 2, 'healing-recovery': 2 } },
        { text: '具体解决方案', scores: { 'rational-boundary': 3, 'career-independent': 2, 'pragmatic-realistic': 1 } },
        { text: '陪伴和转移注意力', scores: { 'social-bright': 3, 'romantic-experience': 2, 'playful-teasing': 1 } },
        { text: '空间，自己消化', scores: { 'avoidant-pull': 3, 'high-sensitive-boundary': 2, 'career-independent': 1 } },
        { text: '确认关系不会变', scores: { 'security-seeking': 3, 'people-pleasing': 2, 'friendship-first': 1 } }
      ]
    },
    {
      id: 'q4',
      text: '约会时，她最在意什么？',
      options: [
        { text: '安排是否用心、有记忆点', scores: { 'romantic-experience': 3, 'artistic-feeling': 2, 'social-bright': 1 } },
        { text: '时间是否准时、计划是否清楚', scores: { 'rational-boundary': 3, 'career-independent': 2, 'mature-stable': 1 } },
        { text: '相处是否轻松、没有压力', scores: { 'slow-warm': 3, 'friendship-first': 2, 'playful-teasing': 2 } },
        { text: '现实条件是否匹配', scores: { 'blind-date-evaluator': 3, 'pragmatic-realistic': 2, 'high-standard': 2 } },
        { text: '边界是否被尊重', scores: { 'high-sensitive-boundary': 3, 'rational-boundary': 2, 'healing-recovery': 1 } }
      ]
    },
    {
      id: 'q5',
      text: '她最让你困惑的行为是？',
      options: [
        { text: '回复慢但内容认真', scores: { 'slow-warm': 3, 'career-independent': 2, 'passive-response': 2 } },
        { text: '热情但对谁都一样', scores: { 'social-bright': 3, 'playful-teasing': 2, 'friendship-first': 1 } },
        { text: '靠近时退、退时又靠近', scores: { 'avoidant-pull': 3, 'exploratory-uncertain': 2, 'security-seeking': 1 } },
        { text: '总说"都行"但事后不开心', scores: { 'people-pleasing': 3, 'friendship-first': 2, 'passive-response': 1 } },
        { text: '直接但容错率低', scores: { 'high-standard': 3, 'rational-boundary': 2, 'mature-stable': 2 } }
      ]
    }
  ],

  // 计算结果：返回得分最高的3个类型ID
  calculate(answers) {
    const scores = {};
    answers.forEach(ans => {
      Object.entries(ans.scores).forEach(([typeId, score]) => {
        scores[typeId] = (scores[typeId] || 0) + score;
      });
    });
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, score]) => ({ id, score }));
  }
};
