/* 信念改写训练系统：30天打卡 + 每日任务 + 进度追踪 */
window.BELIEF_TRAINING = {
  // 30天训练计划
  plan: [
    { day: 1,  theme: '识别', topic: 'ch44',   task: '写出最近最常出现的10句自我否定', action: '用笔记本或手机备忘录记录', hint: '不要评判，只记录' },
    { day: 2,  theme: '识别', topic: 'ch44',   task: '给每句旧信念标注触发场景', action: '标注时间、地点、人物', hint: '找到规律' },
    { day: 3,  theme: '改写', topic: 'ch44',   task: '把3句旧信念改写成可行动句', action: '用"我可以通过...提高概率"句式', hint: '避免空泛口号' },
    { day: 4,  theme: '改写', topic: 'ch44-1', task: '为金钱信念设计一个10分钟动作', action: '记录今天每一笔支出', hint: '不评价，只记录' },
    { day: 5,  theme: '行动', topic: 'ch44-2', task: '写3个今天没有坏掉的部分', action: '睡前写在备忘录', hint: '具体小事' },
    { day: 6,  theme: '行动', topic: 'ch44-3', task: '把拖延任务拆到5分钟版本', action: '用计时器只做5分钟', hint: '5分钟后允许停' },
    { day: 7,  theme: '复盘', topic: 'ch44',   task: '第一周复盘：哪句新信念最有效', action: '选出1句继续验证', hint: '不要贪多' },
    { day: 8,  theme: '识别', topic: 'ch44-4', task: '写下恋爱中最常出现的恐惧句', action: '诚实面对', hint: '不掩饰' },
    { day: 9,  theme: '改写', topic: 'ch44-5', task: '为健康信念建立睡前流程', action: '提前30分钟放下手机', hint: '从小调整开始' },
    { day: 10, theme: '行动', topic: 'ch44-6', task: '主动联系一个弱连接', action: '发一条低压问候', hint: '不索取，只更新' },
    { day: 11, theme: '行动', topic: 'ch44-7', task: '写一个已有项目案例', action: '背景+动作+结果+复盘', hint: '不求完美' },
    { day: 12, theme: '行动', topic: 'ch44-8', task: '表达一个小偏好', action: '对任何人说"我更喜欢..."', hint: '从小事开始' },
    { day: 13, theme: '复盘', topic: 'ch44-9', task: '记录5条自我价值证据', action: '写在备忘录', hint: '无需他人批准' },
    { day: 14, theme: '复盘', topic: 'ch44',   task: '第二周复盘：恢复速度是否变快', action: '对比第一周', hint: '看行为不看情绪' },
    { day: 15, theme: '识别', topic: 'ch44-10', task: '写下5个高频情绪触发点', action: '标注身体反应', hint: '觉察是第一步' },
    { day: 16, theme: '改写', topic: 'ch44-11', task: '确定一个30天主线技能', action: '只选一个', hint: '避免开太多坑' },
    { day: 17, theme: '行动', topic: 'ch44-1', task: '练习一次报价或预算边界', action: '从小场景开始', hint: '具体+有依据' },
    { day: 18, theme: '行动', topic: 'ch44-4', task: '停止一次焦虑追问', action: '20分钟后再决定', hint: '延迟反应' },
    { day: 19, theme: '行动', topic: 'ch44-5', task: '做一次5分钟呼吸或拉伸', action: '身体降温', hint: '不追求完美' },
    { day: 20, theme: '复盘', topic: 'ch44-6', task: '建立机会日志模板', action: '记录来源+触发+准备度', hint: '可复制' },
    { day: 21, theme: '复盘', topic: 'ch44',   task: '第三周复盘：哪个动作最容易保留', action: '确定3个长期动作', hint: '少即是多' },
    { day: 22, theme: '识别', topic: 'ch44-7', task: '收集5个招聘JD，拆能力差距', action: '列出目标岗位能力', hint: '具体可执行' },
    { day: 23, theme: '改写', topic: 'ch44-8', task: '写一句身份声明', action: '"我是一个会...的人"', hint: '连接行动' },
    { day: 24, theme: '行动', topic: 'ch44-9', task: '完成一个修复或负责动作', action: '不解释，只行动', hint: '证据说话' },
    { day: 25, theme: '行动', topic: 'ch44-10', task: '建立20分钟暂停规则', action: '情绪峰值时先暂停', hint: '保护结果' },
    { day: 26, theme: '行动', topic: 'ch44-11', task: '学20分钟并输出100字', action: '输入后必须输出', hint: '不求完美' },
    { day: 27, theme: '复盘', topic: 'ch44-12', task: '把证据动作教给别人', action: '分享你的方法', hint: '教是最好的学' },
    { day: 28, theme: '复盘', topic: 'ch44',   task: '第四周复盘：保留3个动作', action: '删除低效动作', hint: '聚焦' },
    { day: 29, theme: '改写', topic: 'ch44-12', task: '写下下个月继续训练的主题', action: '选一个最需要的', hint: '持续迭代' },
    { day: 30, theme: '复盘', topic: 'ch44-12', task: '月末验收：确认你的新证据', action: '对照指标检查', hint: '行为证据>情绪感受' }
  ],

  // 每日复盘模板
  reviewTemplate: {
    questions: [
      { id: 'old', label: '今天哪个旧信念最想控制我？', placeholder: '例如：我肯定做不到...' },
      { id: 'fact', label: '事实是？（把解释和事实分开）', placeholder: '例如：对方只是没回消息，不是不喜欢我' },
      { id: 'new', label: '更准确的新解释是？', placeholder: '例如：他可能很忙，我可以先做自己的事' },
      { id: 'action', label: '我完成的证据动作是？', placeholder: '例如：去散步15分钟，没有追问' },
      { id: 'score', label: '今天给自己打几分？（1-10）', placeholder: '5' }
    ]
  },

  // 信念改写工具
  rewriteTool: {
    title: '旧信念改写器',
    steps: [
      { id: 'catch', label: '抓住旧信念', placeholder: '当情绪突然下坠时，问：我刚刚相信了哪句话？' },
      { id: 'separate', label: '拆事实和解释', placeholder: '事实是"对方没回"，解释才是"我不值得"' },
      { id: 'rewrite', label: '改写成可行动句', placeholder: '不要写"我很棒"，要写"我可以通过某个动作提高概率"' },
      { id: 'evidence', label: '做证据动作', placeholder: '动作必须小、具体、当天能完成' }
    ]
  },

  // 获取今日任务
  getTodayTask() {
    const completed = this.getCompletedDays();
    const nextDay = completed.length + 1;
    if (nextDay > 30) return null;
    return { ...this.plan[nextDay - 1], isCompleted: false };
  },

  // 获取已完成天数
  getCompletedDays() {
    try {
      return JSON.parse(localStorage.getItem('belief_completed_days') || '[]');
    } catch (e) { return []; }
  },

  // 标记完成
  markCompleted(day) {
    const completed = this.getCompletedDays();
    if (!completed.includes(day)) {
      completed.push(day);
      localStorage.setItem('belief_completed_days', JSON.stringify(completed));
    }
  },

  // 保存复盘
  saveReview(day, answers) {
    try {
      const reviews = JSON.parse(localStorage.getItem('belief_reviews') || '{}');
      reviews[day] = answers;
      localStorage.setItem('belief_reviews', JSON.stringify(reviews));
    } catch (e) {}
  },

  // 获取复盘
  getReview(day) {
    try {
      const reviews = JSON.parse(localStorage.getItem('belief_reviews') || '{}');
      return reviews[day] || null;
    } catch (e) { return null; }
  },

  // 获取进度统计
  getStats() {
    const completed = this.getCompletedDays();
    const reviews = JSON.parse(localStorage.getItem('belief_reviews') || '{}');
    const reviewDays = Object.keys(reviews).length;
    const scores = Object.values(reviews).map(r => parseInt(r.score) || 0).filter(s => s > 0);
    const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
    return {
      completedDays: completed.length,
      completionRate: Math.round((completed.length / 30) * 100),
      reviewDays,
      avgScore,
      streak: this.getStreak(completed),
      currentDay: completed.length + 1
    };
  },

  // 计算连续打卡天数
  getStreak(completed) {
    if (!completed.length) return 0;
    const sorted = [...completed].sort((a, b) => b - a);
    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] - 1) streak++;
      else break;
    }
    return streak;
  }
};
