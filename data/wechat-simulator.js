/* 微信聊天沉浸式对话模拟数据 */
window.WECHAT_SIMULATOR = {
  scenarios: [
    { id: 'scene-1', title: '刚加微信，怎么开场不尴尬', difficulty: 'easy', context: '朋友聚会认识，第二天你想发第一条微信。', tags: ['开场', '身份交代'], completedCount: 1247 },
    { id: 'scene-2', title: '她说"今天好累"', difficulty: 'easy', context: '晚上八点，她发来三个字。', tags: ['情绪承接', '日常'], completedCount: 2156 },
    { id: 'scene-3', title: '已读不回，怎么重启', difficulty: 'medium', context: '昨天发的消息她没回，今天你想再试一次。', tags: ['冷场', '重启'], completedCount: 1893 },
    { id: 'scene-4', title: '朋友圈互动转私聊', difficulty: 'easy', context: '她发了咖啡照片，你想从点赞转私聊。', tags: ['朋友圈', '轻互动'], completedCount: 987 },
    { id: 'scene-5', title: '她吐槽领导，怎么接', difficulty: 'medium', context: '她说"我领导太离谱了"，情绪很满。', tags: ['情绪', '倾听'], completedCount: 1567 },
    { id: 'scene-6', title: '暧昧升温测试', difficulty: 'hard', context: '她说"你还挺会说话的"，窗口打开。', tags: ['暧昧', '分寸'], completedCount: 2134 },
    { id: 'scene-7', title: '邀约具体安排', difficulty: 'medium', context: '聊到一家新店，你想约她周末去。', tags: ['邀约', '转线下'], completedCount: 1678 },
    { id: 'scene-8', title: '相亲对象问现实条件', difficulty: 'hard', context: '她问"你对结婚怎么看"，话题突然变重。', tags: ['相亲', '现实'], completedCount: 876 },
    { id: 'scene-9', title: '约会后她到家了', difficulty: 'medium', context: '第一次约会刚结束，她发来"到家了"。', tags: ['约会', '反馈'], completedCount: 1456 },
    { id: 'scene-10', title: '她说"我们还是做朋友吧"', difficulty: 'hard', context: '她明确表达只想做朋友，你怎么收尾。', tags: ['拒绝', '边界'], completedCount: 2341 }
  ],

  getScenario(id) { return this.scenarios.find(s => s.id === id) || null; },

  scene1: {
    id: 'scene-1', title: '刚加微信，怎么开场不尴尬',
    context: '昨晚朋友聚会认识，今天你想发第一条微信。',
    avatar: '👩', girlName: '小雨',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '昨天 22:30', timestamp: '昨天 22:30' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '已通过你的朋友验证请求，现在我们可以开始聊天了', timestamp: '昨天 22:30' },
      'm2': { id: 'm2', sender: 'system', type: 'time', content: '今天 11:20', timestamp: '今天 11:20' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '哈哈是你啊', timestamp: '今天 11:22' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '昨晚聊得挺开心的', timestamp: '今天 11:22' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '你平时也常去那家店吗？', timestamp: '今天 11:23' },
      'm6': { id: 'm6', sender: 'girl', type: 'text', content: '嗯嗯，我也觉得', timestamp: '今天 11:25' },
      'm7': { id: 'm7', sender: 'girl', type: 'text', content: '对了，你朋友圈那张是在哪里拍的？', timestamp: '今天 11:26' },
      'm8': { id: 'm8', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
      'm9': { id: 'm9', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '今天 11:24' },
    },
    choices: {
      'c1-1': { id: 'c1-1', text: '嗨小雨，我是昨晚坐你旁边聊咖啡那个，怕你不知道我是谁😂', score: 8, feedback: '自然、具体、有画面感，好感 +8', feedbackType: 'green', tip: '开场最重要的是"对上号"，让她知道你是谁、从哪来。', girlReplyId: 'm3', nextChoices: ['c1-4','c1-5','c1-6'] },
      'c1-2': { id: 'c1-2', text: '美女你好，在干嘛呢？', score: -15, feedback: '太油腻+查户口，好感 -15', feedbackType: 'red', tip: '刚加微信不要叫"美女"，也不要问"在干嘛"，这是最低效的开场。', girlReplyId: 'm9', nextChoices: ['c1-7','c1-8','c1-9'] },
      'c1-3': { id: 'c1-3', text: '你好，我是朋友介绍的那个，认识一下', score: -5, feedback: '太正式、太干，像面试，好感 -5', feedbackType: 'yellow', tip: '开场要有"钩子"，让对方有东西可接。', girlReplyId: 'm3', nextChoices: ['c1-4','c1-5','c1-6'] },
      'c1-4': { id: 'c1-4', text: '是啊，昨晚聊到那家手冲店，你口味挺挑的', score: 10, feedback: '接住她的话题，还给了认可，好感 +10', feedbackType: 'green', tip: '最好的回复是"接住她的话+给一个小认可"。', girlReplyId: 'm5', nextChoices: ['c1-10','c1-11','c1-12'] },
      'c1-5': { id: 'c1-5', text: '偶尔去，你昨晚说的那家甜品店我还没试过', score: 6, feedback: '自然延续话题，留了话口，好感 +6', feedbackType: 'green', tip: '分享自己的信息+引出她的话题，比例刚刚好。', girlReplyId: 'm5', nextChoices: ['c1-10','c1-11','c1-12'] },
      'c1-6': { id: 'c1-6', text: '哈哈是，你平时喜欢喝什么类型的咖啡？', score: 2, feedback: '有点查户口倾向，但还算温和，好感 +2', feedbackType: 'yellow', tip: '连续提问会让对方感到被审问，先分享再提问更好。', girlReplyId: 'm6', nextChoices: ['c1-10','c1-11','c1-12'] },
      'c1-7': { id: 'c1-7', text: '怎么只回一个字？是不是不想聊？', score: -20, feedback: '质问+焦虑暴露，好感 -20，基本凉了', feedbackType: 'red', tip: '对方冷淡时，追问只会更凉。先降温，改天再试。', girlReplyId: 'm8', nextChoices: [] },
      'c1-8': { id: 'c1-8', text: '那我先不打扰了，改天聊', score: 3, feedback: '有自知之明，但太急着撤退，好感 +3', feedbackType: 'yellow', tip: '可以降温，但不要每次都秒退，显得没自信。', girlReplyId: 'm8', nextChoices: [] },
      'c1-9': { id: 'c1-9', text: '昨晚聊到的那部电影你看了吗？', score: 5, feedback: '用共同话题重启，比追问好，好感 +5', feedbackType: 'green', tip: '对方冷淡时，换一个新话题比解释更有效。', girlReplyId: 'm4', nextChoices: ['c1-4','c1-5','c1-6'] },
      'c1-10': { id: 'c1-10', text: '那家店豆子是自家烘的，下次可以带你去尝尝', score: 12, feedback: '自然邀约+价值展示，好感 +12', feedbackType: 'green', tip: '邀约要自然嵌入话题，不要突兀地"周六出来吧"。', girlReplyId: 'm7', nextChoices: [] },
      'c1-11': { id: 'c1-11', text: '在城西一个老巷子，挺隐蔽的，你居然发现了', score: 7, feedback: '延续话题+轻微好奇，好感 +7', feedbackType: 'green', tip: '回答具体问题+给一点情绪价值，聊天就能延续。', girlReplyId: 'm7', nextChoices: [] },
      'c1-12': { id: 'c1-12', text: '哈哈你观察力挺细的，下次有好看的地方发你', score: 9, feedback: '认可+未来承诺，不压迫，好感 +9', feedbackType: 'green', tip: '不要一次给太多，留一点期待感。', girlReplyId: 'm7', nextChoices: [] },
    },
    startChoices: ['c1-1','c1-2','c1-3'],
    endings: {
      excellent: { min: 20, title: '完美开场', desc: '你给了她安全感、话题、还有期待。这段关系起点很好。', emoji: '🌟' },
      good: { min: 10, title: '顺利开场', desc: '开场自然，她愿意接话。继续保持轻松节奏。', emoji: '👍' },
      neutral: { min: 0, title: '中规中矩', desc: '没有大错，但也没有亮点。下次可以更具体一点。', emoji: '😐' },
      bad: { min: -999, title: '需要重启', desc: '开场太油、太干、或太焦虑。建议冷几天，用朋友圈互动过渡。', emoji: '💤' }
    }
  },

  scene2: {
    id: 'scene-2', title: '她说"今天好累"',
    context: '晚上八点，她发来三个字。',
    avatar: '💃', girlName: '晓晓',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '20:15', timestamp: '20:15' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '今天好累', timestamp: '20:15' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '嗯嗯，今天被领导骂了', timestamp: '20:18' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '就是有个方案改了好几遍', timestamp: '20:19' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '唉，感觉怎么都做不好', timestamp: '20:20' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '谢谢你听我说', timestamp: '20:23' },
      'm6': { id: 'm6', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '20:17' },
      'm7': { id: 'm7', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c2-1': { id: 'c2-1', text: '早点休息，多喝热水', score: -12, feedback: '"多喝热水"是经典雷区，好感 -12', feedbackType: 'red', tip: '女生说累，不是要解决方案，是要被理解。', girlReplyId: 'm6', nextChoices: ['c2-7','c2-8','c2-9'] },
      'c2-2': { id: 'c2-2', text: '怎么了？跟我说说', score: 5, feedback: '表达了关心，但有点干，好感 +5', feedbackType: 'yellow', tip: '可以更好：先承接情绪，再邀请她说。', girlReplyId: 'm2', nextChoices: ['c2-4','c2-5','c2-6'] },
      'c2-3': { id: 'c2-3', text: '这个点还在加班？你们领导也太不做人了', score: 10, feedback: '先站她这边，情绪价值给满，好感 +10', feedbackType: 'green', tip: '她吐槽时，先和她一起吐槽，不要急着给建议。', girlReplyId: 'm2', nextChoices: ['c2-4','c2-5','c2-6'] },
      'c2-4': { id: 'c2-4', text: '改几遍还挑刺，换我也炸', score: 8, feedback: '共情到位，她感到被理解，好感 +8', feedbackType: 'green', tip: '用"换我也..."句式，让她知道你不是旁观者。', girlReplyId: 'm3', nextChoices: ['c2-10','c2-11','c2-12'] },
      'c2-5': { id: 'c2-5', text: '那你现在还在公司吗？要不要吃点东西', score: 6, feedback: '关心具体行动，但可能她只想吐槽，好感 +6', feedbackType: 'green', tip: '关心行动前，先确认她需不需要。', girlReplyId: 'm3', nextChoices: ['c2-10','c2-11','c2-12'] },
      'c2-6': { id: 'c2-6', text: '其实领导可能也有压力，你别太往心里去', score: -8, feedback: '教育+替对方说话，好感 -8', feedbackType: 'red', tip: '永远不要在她吐槽时替"对方"说话。', girlReplyId: 'm4', nextChoices: ['c2-10','c2-11','c2-12'] },
      'c2-7': { id: 'c2-7', text: '怎么只回一个字？是不是不想跟我聊？', score: -20, feedback: '焦虑暴露+质问，好感 -20', feedbackType: 'red', tip: '对方冷淡时，追问是自杀式操作。', girlReplyId: 'm7', nextChoices: [] },
      'c2-8': { id: 'c2-8', text: '那你先忙，我不打扰了', score: 0, feedback: '太急着撤退，显得没底气，好感 0', feedbackType: 'yellow', tip: '可以给她空间，但不要每次都秒退。', girlReplyId: 'm7', nextChoices: [] },
      'c2-9': { id: 'c2-9', text: '累成这样还回我消息，感动', score: 7, feedback: '轻微调侃+认可，缓解气氛，好感 +7', feedbackType: 'green', tip: '用轻松化解沉重，但要注意分寸。', girlReplyId: 'm2', nextChoices: ['c2-4','c2-5','c2-6'] },
      'c2-10': { id: 'c2-10', text: '你已经很努力了，别用领导的标准要求自己', score: 12, feedback: '情绪承接+价值肯定，好感 +12', feedbackType: 'green', tip: '她自我否定时，你的肯定是最好的药。', girlReplyId: 'm5', nextChoices: [] },
      'c2-11': { id: 'c2-11', text: '这种领导就是惯的，你值得更好的团队', score: 6, feedback: '站她这边，但有点过头，好感 +6', feedbackType: 'yellow', tip: '支持她，但不要过度贬低第三方。', girlReplyId: 'm5', nextChoices: [] },
      'c2-12': { id: 'c2-12', text: '现在能回家了吗？我请你喝杯奶茶压压惊', score: 15, feedback: '关心+低压力邀约，好感 +15', feedbackType: 'green', tip: '情绪低谷时的陪伴邀约，成功率最高。', girlReplyId: 'm5', nextChoices: [] },
    },
    startChoices: ['c2-1','c2-2','c2-3'],
    endings: {
      excellent: { min: 25, title: '情绪大师', desc: '你给了她最需要的：被理解、被肯定、还有一个温柔的出口。', emoji: '❤️' },
      good: { min: 12, title: '温暖承接', desc: '她没有感到被教育或忽视，这段对话是加分的。', emoji: '🤝' },
      neutral: { min: 0, title: '无功无过', desc: '没有踩雷，但也没有让她感到特别被理解。', emoji: '😐' },
      bad: { min: -999, title: '踩雷现场', desc: '"多喝热水"、教育她、或焦虑追问。建议复盘《情绪承接》章节。', emoji: '💥' }
    }
  },

  scene3: {
    id: 'scene-3', title: '已读不回，怎么重启',
    context: '昨天发的消息她没回，今天你想再试一次。',
    avatar: '🙋‍♀️', girlName: '阿琳',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '昨天 21:00', timestamp: '昨天 21:00' },
      'm1': { id: 'm1', sender: 'me', type: 'text', content: '周末那家新店你去过吗？', timestamp: '昨天 21:00' },
      'm2': { id: 'm2', sender: 'system', type: 'time', content: '今天 14:30', timestamp: '今天 14:30' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '昨天太忙了忘回了', timestamp: '今天 14:32' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '那家店我还没去过呢', timestamp: '今天 14:33' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '你去了吗？', timestamp: '今天 14:33' },
      'm6': { id: 'm6', sender: 'girl', type: 'text', content: '哈哈可以啊', timestamp: '今天 14:36' },
      'm7': { id: 'm7', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '今天 14:35' },
      'm8': { id: 'm8', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c3-1': { id: 'c3-1', text: '在吗？昨天发的消息看到了吗？', score: -15, feedback: '追问+焦虑，好感 -15', feedbackType: 'red', tip: '已读不回不要追问，给她台阶下。', girlReplyId: 'm7', nextChoices: ['c3-7','c3-8','c3-9'] },
      'c3-2': { id: 'c3-2', text: '没事，我猜你昨天忙。刚看到个东西想发你', score: 10, feedback: '给台阶+新话题，轻松重启，好感 +10', feedbackType: 'green', tip: '重启的关键是"不计较+给新话口"。', girlReplyId: 'm3', nextChoices: ['c3-4','c3-5','c3-6'] },
      'c3-3': { id: 'c3-3', text: '（不发消息，等她回）', score: 3, feedback: '被动等待，没有加分也没有减分，好感 +3', feedbackType: 'yellow', tip: '偶尔可以等，但不要每次都等，显得没主见。', girlReplyId: 'm8', nextChoices: [] },
      'c3-4': { id: 'c3-4', text: '去了，咖啡不错，环境比照片好', score: 8, feedback: '自然延续话题，分享体验，好感 +8', feedbackType: 'green', tip: '用具体体验代替简单回答，更有画面感。', girlReplyId: 'm5', nextChoices: ['c3-10','c3-11','c3-12'] },
      'c3-5': { id: 'c3-5', text: '还没，想等人少的时候去。你周末有空吗？', score: 12, feedback: '自然过渡到邀约，低压力，好感 +12', feedbackType: 'green', tip: '重启后如果反馈好，可以顺势邀约。', girlReplyId: 'm6', nextChoices: [] },
      'c3-6': { id: 'c3-6', text: '去了，不过感觉一般，可能期待太高了', score: 4, feedback: '诚实但略负面，好感 +4', feedbackType: 'yellow', tip: '不要过度负面，容易让对话变沉重。', girlReplyId: 'm5', nextChoices: ['c3-10','c3-11','c3-12'] },
      'c3-7': { id: 'c3-7', text: '是不是不想理我？直说就行', score: -20, feedback: '情绪失控+逼宫，好感 -20，关系基本结束', feedbackType: 'red', tip: '永远不要逼对方表态，尤其在线上。', girlReplyId: 'm8', nextChoices: [] },
      'c3-8': { id: 'c3-8', text: '那我先不打扰了', score: 0, feedback: '太急着撤退，好感 0', feedbackType: 'yellow', tip: '可以降温，但不要每次都主动退场。', girlReplyId: 'm8', nextChoices: [] },
      'c3-9': { id: 'c3-9', text: '哈哈我猜到了，你昨天朋友圈那个加班定位出卖了你', score: 8, feedback: '幽默+观察力，化解尴尬，好感 +8', feedbackType: 'green', tip: '用幽默化解尴尬，但要有真实观察支撑。', girlReplyId: 'm3', nextChoices: ['c3-4','c3-5','c3-6'] },
      'c3-10': { id: 'c3-10', text: '那周末一起去？我请你', score: 10, feedback: '顺势邀约，具体+大方，好感 +10', feedbackType: 'green', tip: '邀约要具体，"一起去"比"有空出来"好十倍。', girlReplyId: 'm6', nextChoices: [] },
      'c3-11': { id: 'c3-11', text: '下次有好店发你，一起探店', score: 7, feedback: '轻松承诺，不压迫，好感 +7', feedbackType: 'green', tip: '不要每次都想一步到位，留点期待。', girlReplyId: 'm6', nextChoices: [] },
      'c3-12': { id: 'c3-12', text: '你平时喜欢什么类型的店？', score: 3, feedback: '又变回提问模式，好感 +3', feedbackType: 'yellow', tip: '不要连续提问，先分享再提问。', girlReplyId: 'm7', nextChoices: [] },
    },
    startChoices: ['c3-1','c3-2','c3-3'],
    endings: {
      excellent: { min: 20, title: '重启大师', desc: '你不计较、不追问，还给了新话题和邀约。她对你的印象反而更好了。', emoji: '🔄' },
      good: { min: 10, title: '顺利重启', desc: '没有让尴尬升级，对话恢复正常节奏。', emoji: '👍' },
      neutral: { min: 0, title: '原地踏步', desc: '没有大错，但也没有抓住机会推进。', emoji: '😐' },
      bad: { min: -999, title: '雪上加霜', desc: '追问、逼宫、或过度消极。建议冷处理一周。', emoji: '❄️' }
    }
  },

  scene4: {
    id: 'scene-4', title: '朋友圈互动转私聊',
    context: '她发了咖啡照片，你想从点赞转私聊。',
    avatar: '👩', girlName: '小雪',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '12:30', timestamp: '12:30' },
      'm1': { id: 'm1', sender: 'system', type: 'system', content: '小雪发布了一条朋友圈', timestamp: '12:30' },
      'm2': { id: 'm2', sender: 'girl', type: 'image', content: '[图片：一杯拉花咖啡]', timestamp: '12:30' },
      'm3': { id: 'm3', sender: 'system', type: 'time', content: '13:15', timestamp: '13:15' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '哈哈你也喜欢这家？', timestamp: '13:17' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '他们家的燕麦拿铁确实不错', timestamp: '13:18' },
      'm6': { id: 'm6', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '13:16' },
      'm7': { id: 'm7', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c4-1': { id: 'c4-1', text: '美女，这咖啡看起来不错啊', score: -10, feedback: '"美女"+评价外貌/生活，油腻感，好感 -10', feedbackType: 'red', tip: '朋友圈互动不要叫"美女"，不要只评价外表。', girlReplyId: 'm6', nextChoices: ['c4-7','c4-8','c4-9'] },
      'c4-2': { id: 'c4-2', text: '这家店的豆子是自家烘的，你挺会挑', score: 10, feedback: '具体信息+认可品味，好感 +10', feedbackType: 'green', tip: '评论要具体，展示你的认知+认可她的选择。', girlReplyId: 'm4', nextChoices: ['c4-4','c4-5','c4-6'] },
      'c4-3': { id: 'c4-3', text: '（只点赞，不发消息）', score: 2, feedback: '安全但无进展，好感 +2', feedbackType: 'yellow', tip: '点赞是起点，不是终点。要转私聊需要话口。', girlReplyId: 'm7', nextChoices: [] },
      'c4-4': { id: 'c4-4', text: '是啊，我上周刚去过。你喜欢深烘还是浅烘？', score: 8, feedback: '分享+提问，自然延续，好感 +8', feedbackType: 'green', tip: '先分享自己的信息，再问对方，比例更舒服。', girlReplyId: 'm5', nextChoices: ['c4-10','c4-11','c4-12'] },
      'c4-5': { id: 'c4-5', text: '我也常去，下次可以一起', score: 6, feedback: '顺势邀约，但有点快，好感 +6', feedbackType: 'yellow', tip: '朋友圈刚互动就邀约，可能有点急。先聊几句。', girlReplyId: 'm5', nextChoices: ['c4-10','c4-11','c4-12'] },
      'c4-6': { id: 'c4-6', text: '这家店环境比咖啡好，适合发呆', score: 7, feedback: '有观点+画面感，好感 +7', feedbackType: 'green', tip: '给一点小观点，让对方有东西可接。', girlReplyId: 'm5', nextChoices: ['c4-10','c4-11','c4-12'] },
      'c4-7': { id: 'c4-7', text: '你每天都喝咖啡吗？', score: -5, feedback: '查户口式提问，好感 -5', feedbackType: 'yellow', tip: '不要从朋友圈直接跳到个人习惯审问。', girlReplyId: 'm6', nextChoices: ['c4-10','c4-11','c4-12'] },
      'c4-8': { id: 'c4-8', text: '那我先不打扰了', score: 0, feedback: '太急着撤退，好感 0', feedbackType: 'yellow', tip: '对方冷淡可以降温，但不要每次都主动退场。', girlReplyId: 'm7', nextChoices: [] },
      'c4-9': { id: 'c4-9', text: '哈哈你朋友圈的咖啡品味挺稳定的', score: 8, feedback: '观察力+认可，好感 +8', feedbackType: 'green', tip: '用"观察+认可"打开话题，比直接提问高级。', girlReplyId: 'm4', nextChoices: ['c4-4','c4-5','c4-6'] },
      'c4-10': { id: 'c4-10', text: '周末有空一起去？我请你试试他们的新品', score: 12, feedback: '具体邀约+理由，好感 +12', feedbackType: 'green', tip: '邀约要有具体理由，"新品"比"出来玩"好。', girlReplyId: 'm7', nextChoices: [] },
      'c4-11': { id: 'c4-11', text: '下次有好店互相安利', score: 7, feedback: '轻松互动，不压迫，好感 +7', feedbackType: 'green', tip: '不要每次都想着邀约，先建立互动习惯。', girlReplyId: 'm7', nextChoices: [] },
      'c4-12': { id: 'c4-12', text: '你平时还喜欢去哪些店？', score: 3, feedback: '又变提问模式，好感 +3', feedbackType: 'yellow', tip: '连续提问会让对方感到被审问。', girlReplyId: 'm7', nextChoices: [] },
    },
    startChoices: ['c4-1','c4-2','c4-3'],
    endings: {
      excellent: { min: 20, title: '社交高手', desc: '你从点赞自然过渡到私聊，还顺势约了线下。', emoji: '🎯' },
      good: { min: 10, title: '顺利转场', desc: '朋友圈互动成功转为私聊，关系推进了一步。', emoji: '👍' },
      neutral: { min: 0, title: '原地踏步', desc: '没有踩雷，但也没有成功转私聊。', emoji: '😐' },
      bad: { min: -999, title: '点赞终结者', desc: '"美女"+查户口，让她对朋友圈互动都怕了。', emoji: '👻' }
    }
  },

  scene5: {
    id: 'scene-5', title: '她吐槽领导，怎么接',
    context: '她说"我领导太离谱了"，情绪很满。',
    avatar: '💃', girlName: '思思',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '18:45', timestamp: '18:45' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '我领导太离谱了', timestamp: '18:45' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '今天开会当众说我方案不行', timestamp: '18:46' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '明明是他自己没讲清楚需求', timestamp: '18:47' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '我现在特别怀疑自己', timestamp: '18:48' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '谢谢你听我说这些', timestamp: '18:52' },
      'm6': { id: 'm6', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '18:50' },
      'm7': { id: 'm7', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c5-1': { id: 'c5-1', text: '别往心里去，领导都这样', score: -10, feedback: '"都这样"否定了她的感受，好感 -10', feedbackType: 'red', tip: '不要说"都这样"，这等于说"你不该难受"。', girlReplyId: 'm6', nextChoices: ['c5-7','c5-8','c5-9'] },
      'c5-2': { id: 'c5-2', text: '这也太过分了，换我也炸', score: 10, feedback: '先站她这边，情绪价值给满，好感 +10', feedbackType: 'green', tip: '她吐槽时，先和她一起吐槽，不要急着给建议。', girlReplyId: 'm2', nextChoices: ['c5-4','c5-5','c5-6'] },
      'c5-3': { id: 'c5-3', text: '那你下次先把需求确认清楚', score: -8, feedback: '教育+解决方案，好感 -8', feedbackType: 'red', tip: '她情绪满的时候，不要给建议。先承接情绪。', girlReplyId: 'm4', nextChoices: ['c5-4','c5-5','c5-6'] },
      'c5-4': { id: 'c5-4', text: '当众说确实过分，他不给人留面子', score: 8, feedback: '具体指出问题，共情到位，好感 +8', feedbackType: 'green', tip: '指出具体行为的问题，比泛泛安慰有效。', girlReplyId: 'm3', nextChoices: ['c5-10','c5-11','c5-12'] },
      'c5-5': { id: 'c5-5', text: '你方案我看过，明明很好啊', score: 6, feedback: '认可她的能力，但可能不了解全貌，好感 +6', feedbackType: 'yellow', tip: '认可可以，但不要过度，显得不真诚。', girlReplyId: 'm3', nextChoices: ['c5-10','c5-11','c5-12'] },
      'c5-6': { id: 'c5-6', text: '领导可能也有压力，你别太敏感', score: -12, feedback: '替对方说话+说她敏感，双重暴击，好感 -12', feedbackType: 'red', tip: '永远不要在她吐槽时替"对方"说话。', girlReplyId: 'm4', nextChoices: ['c5-10','c5-11','c5-12'] },
      'c5-7': { id: 'c5-7', text: '怎么又不回我了？', score: -20, feedback: '焦虑暴露+追问，好感 -20', feedbackType: 'red', tip: '对方冷淡时，追问是自杀式操作。', girlReplyId: 'm7', nextChoices: [] },
      'c5-8': { id: 'c5-8', text: '那你先忙，我不打扰了', score: 0, feedback: '太急着撤退，好感 0', feedbackType: 'yellow', tip: '可以给她空间，但不要每次都秒退。', girlReplyId: 'm7', nextChoices: [] },
      'c5-9': { id: 'c5-9', text: '这种领导就是惯的，你别怀疑自己', score: 8, feedback: '站她这边+肯定她，好感 +8', feedbackType: 'green', tip: '她自我否定时，你的肯定是最好的药。', girlReplyId: 'm2', nextChoices: ['c5-4','c5-5','c5-6'] },
      'c5-10': { id: 'c5-10', text: '你已经很努力了，别用别人的错误惩罚自己', score: 12, feedback: '情绪承接+价值肯定，好感 +12', feedbackType: 'green', tip: '她自我否定时，帮她把问题归位。', girlReplyId: 'm5', nextChoices: [] },
      'c5-11': { id: 'c5-11', text: '下班了吗？我请你喝奶茶压压惊', score: 15, feedback: '关心+低压力邀约，好感 +15', feedbackType: 'green', tip: '情绪低谷时的陪伴邀约，成功率最高。', girlReplyId: 'm5', nextChoices: [] },
      'c5-12': { id: 'c5-12', text: '这种领导不值得你难受', score: 5, feedback: '支持她，但有点空，好感 +5', feedbackType: 'yellow', tip: '支持要有具体内容，不要只给结论。', girlReplyId: 'm5', nextChoices: [] },
    },
    startChoices: ['c5-1','c5-2','c5-3'],
    endings: {
      excellent: { min: 25, title: '情绪避风港', desc: '你给了她最需要的：被理解、被肯定、还有一个温柔的出口。', emoji: '🏠' },
      good: { min: 12, title: '温暖承接', desc: '她没有感到被教育或忽视，这段对话是加分的。', emoji: '🤝' },
      neutral: { min: 0, title: '无功无过', desc: '没有踩雷，但也没有让她感到特别被理解。', emoji: '😐' },
      bad: { min: -999, title: '踩雷现场', desc: '教育她、替对方说话、或焦虑追问。建议复盘《情绪承接》章节。', emoji: '💥' }
    }
  },

  scene6: {
    id: 'scene-6', title: '暧昧升温测试',
    context: '她说"你还挺会说话的"，窗口打开。',
    avatar: '👩', girlName: '婷婷',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '22:00', timestamp: '22:00' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '你还挺会说话的', timestamp: '22:00' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '哈哈那要看对谁了', timestamp: '22:03' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '22:02' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '那你平时也对别人这么会说话吗？', timestamp: '22:04' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '哈哈我不信', timestamp: '22:06' },
      'm6': { id: 'm6', sender: 'girl', type: 'text', content: '（她只回了一个"哦"）', timestamp: '22:05' },
      'm7': { id: 'm7', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c6-1': { id: 'c6-1', text: '那你是不是喜欢上我了？', score: -15, feedback: '太直接+压迫感，好感 -15', feedbackType: 'red', tip: '暧昧期不要直接问"是不是喜欢我"，会吓跑对方。', girlReplyId: 'm3', nextChoices: ['c6-7','c6-8','c6-9'] },
      'c6-2': { id: 'c6-2', text: '分人，和你聊天比较放松', score: 10, feedback: '轻微升温+不压迫，好感 +10', feedbackType: 'green', tip: '暧昧要"轻"，给对方留解读空间。', girlReplyId: 'm2', nextChoices: ['c6-4','c6-5','c6-6'] },
      'c6-3': { id: 'c6-3', text: '哈哈，被你发现了', score: 5, feedback: '轻松回应，不否认不承认，好感 +5', feedbackType: 'yellow', tip: '暧昧期可以用"不否认不承认"策略。', girlReplyId: 'm2', nextChoices: ['c6-4','c6-5','c6-6'] },
      'c6-4': { id: 'c6-4', text: '没有，我平时挺闷的，是你比较好聊', score: 8, feedback: '把原因归给她，认可+暧昧，好感 +8', feedbackType: 'green', tip: '"因为你"比"我本来就"更有暧昧感。', girlReplyId: 'm4', nextChoices: ['c6-10','c6-11','c6-12'] },
      'c6-5': { id: 'c6-5', text: '你这是在试探我吗？', score: 3, feedback: '把球踢回去，但有点防御，好感 +3', feedbackType: 'yellow', tip: '可以反问，但不要显得太防备。', girlReplyId: 'm4', nextChoices: ['c6-10','c6-11','c6-12'] },
      'c6-6': { id: 'c6-6', text: '哈哈，我只对感兴趣的人这么聊', score: 12, feedback: '明确但不压迫，好感 +12', feedbackType: 'green', tip: '"感兴趣"比"喜欢"轻，但意思到了。', girlReplyId: 'm5', nextChoices: [] },
      'c6-7': { id: 'c6-7', text: '怎么又不回了？是不是我说错什么了？', score: -20, feedback: '焦虑暴露+自我怀疑，好感 -20', feedbackType: 'red', tip: '暧昧期最忌焦虑，一旦暴露就前功尽弃。', girlReplyId: 'm7', nextChoices: [] },
      'c6-8': { id: 'c6-8', text: '那我先睡了，晚安', score: 0, feedback: '太急着撤退，好感 0', feedbackType: 'yellow', tip: '可以降温，但不要每次都主动退场。', girlReplyId: 'm7', nextChoices: [] },
      'c6-9': { id: 'c6-9', text: '被你发现了，不过我只对你这样', score: 8, feedback: '轻微升温+专属感，好感 +8', feedbackType: 'green', tip: '"只对你"是暧昧期安全又有效的表达。', girlReplyId: 'm2', nextChoices: ['c6-4','c6-5','c6-6'] },
      'c6-10': { id: 'c6-10', text: '不信的话，下次见面你自己感受', score: 15, feedback: '暧昧+邀约，双重推进，好感 +15', feedbackType: 'green', tip: '"见面感受"比"线上解释"高级一百倍。', girlReplyId: 'm5', nextChoices: [] },
      'c6-11': { id: 'c6-11', text: '哈哈你猜', score: 6, feedback: '保持神秘感，好感 +6', feedbackType: 'green', tip: '暧昧期不要什么都交代，留点悬念。', girlReplyId: 'm5', nextChoices: [] },
      'c6-12': { id: 'c6-12', text: '没有啊，我对谁都这样', score: -8, feedback: '否定了暧昧，好感 -8', feedbackType: 'red', tip: '不要否定对方的暧昧试探，这是窗口。', girlReplyId: 'm6', nextChoices: [] },
    },
    startChoices: ['c6-1','c6-2','c6-3'],
    endings: {
      excellent: { min: 25, title: '暧昧高手', desc: '你轻拿轻放，给了她暧昧的愉悦感，还顺势约了见面。', emoji: '🔥' },
      good: { min: 12, title: '升温成功', desc: '暧昧窗口被成功打开，关系进入新阶段。', emoji: '👍' },
      neutral: { min: 0, title: '原地踏步', desc: '没有踩雷，但也没有抓住升温机会。', emoji: '😐' },
      bad: { min: -999, title: '窗口关闭', desc: '太急、太油、或太焦虑。暧昧窗口被你自己关上了。', emoji: '❄️' }
    }
  },

  scene7: {
    id: 'scene-7', title: '邀约具体安排',
    context: '聊到一家新店，你想约她周末去。',
    avatar: '🙋‍♀️', girlName: '琳琳',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '周三 20:30', timestamp: '周三 20:30' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '那家店我也想去很久了', timestamp: '周三 20:30' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '周末应该可以', timestamp: '周三 20:33' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '周六下午吧，我上午要补觉', timestamp: '周三 20:35' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '好，周六见', timestamp: '周三 20:37' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '周三 20:32' },
      'm6': { id: 'm6', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c7-1': { id: 'c7-1', text: '周六出来吧，我请你', score: -5, feedback: '"出来吧"太命令式，好感 -5', feedbackType: 'yellow', tip: '邀约要给选择权，不要命令式。', girlReplyId: 'm5', nextChoices: ['c7-7','c7-8','c7-9'] },
      'c7-2': { id: 'c7-2', text: '那周末一起去？周六下午或周日中午，你哪个时间方便？', score: 12, feedback: '具体选项+给选择权，好感 +12', feedbackType: 'green', tip: '邀约要具体，给两个选项比开放式问题好。', girlReplyId: 'm2', nextChoices: ['c7-4','c7-5','c7-6'] },
      'c7-3': { id: 'c7-3', text: '好啊，那周六见', score: 5, feedback: '顺势答应，但不够具体，好感 +5', feedbackType: 'yellow', tip: '邀约要确认具体时间地点，不要模糊。', girlReplyId: 'm5', nextChoices: ['c7-7','c7-8','c7-9'] },
      'c7-4': { id: 'c7-4', text: '周六下午两点？我订个位置', score: 10, feedback: '具体时间+主动安排，好感 +10', feedbackType: 'green', tip: '主动安排细节，展示你的靠谱。', girlReplyId: 'm3', nextChoices: ['c7-10','c7-11','c7-12'] },
      'c7-5': { id: 'c7-5', text: '周六下午可以，你想吃什么类型的？', score: 6, feedback: '确认时间+询问偏好，好感 +6', feedbackType: 'green', tip: '询问偏好展示尊重，但不要全部推给她决定。', girlReplyId: 'm3', nextChoices: ['c7-10','c7-11','c7-12'] },
      'c7-6': { id: 'c7-6', text: '那就周六，具体时间你定', score: 3, feedback: '太被动，好感 +3', feedbackType: 'yellow', tip: '可以尊重她的时间，但不要全部让她决定。', girlReplyId: 'm3', nextChoices: ['c7-10','c7-11','c7-12'] },
      'c7-7': { id: 'c7-7', text: '你到底出不出来？', score: -20, feedback: '逼迫+不耐烦，好感 -20', feedbackType: 'red', tip: '邀约被拒绝或犹豫时，逼迫是自杀。', girlReplyId: 'm6', nextChoices: [] },
      'c7-8': { id: 'c7-8', text: '那算了，改天吧', score: -5, feedback: '太轻易放弃，好感 -5', feedbackType: 'yellow', tip: '可以调整，但不要每次都秒退。', girlReplyId: 'm6', nextChoices: [] },
      'c7-9': { id: 'c7-9', text: '没事，你什么时候方便再说', score: 5, feedback: '有耐心的表现，好感 +5', feedbackType: 'green', tip: '给对方空间，但不要无限期等待。', girlReplyId: 'm2', nextChoices: ['c7-4','c7-5','c7-6'] },
      'c7-10': { id: 'c7-10', text: '好，周六下午两点，店门口见', score: 10, feedback: '确认所有细节，靠谱感满满，好感 +10', feedbackType: 'green', tip: '邀约最后要确认时间、地点、联系方式。', girlReplyId: 'm4', nextChoices: [] },
      'c7-11': { id: 'c7-11', text: '那我周五再跟你确认一下', score: 6, feedback: '展示细心，好感 +6', feedbackType: 'green', tip: '提前确认是靠谱的表现。', girlReplyId: 'm4', nextChoices: [] },
      'c7-12': { id: 'c7-12', text: '行，到时候联系', score: 3, feedback: '太模糊，好感 +3', feedbackType: 'yellow', tip: '"到时候联系"太随意，最好确认具体。', girlReplyId: 'm4', nextChoices: [] },
    },
    startChoices: ['c7-1','c7-2','c7-3'],
    endings: {
      excellent: { min: 20, title: '邀约大师', desc: '你给了选择权、确认了细节、还展示了靠谱。她期待这次见面。', emoji: '📅' },
      good: { min: 10, title: '邀约成功', desc: '邀约顺利，时间地点都确认了。', emoji: '👍' },
      neutral: { min: 0, title: '模糊邀约', desc: '约是约了，但时间地点都模糊。容易放鸽子。', emoji: '😐' },
      bad: { min: -999, title: '邀约失败', desc: '命令式、逼迫、或太轻易放弃。她不想见了。', emoji: '❌' }
    }
  },

  scene8: {
    id: 'scene-8', title: '相亲对象问现实条件',
    context: '她问"你对结婚怎么看"，话题突然变重。',
    avatar: '👩', girlName: '静静',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '周四 21:00', timestamp: '周四 21:00' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '你对结婚怎么看？', timestamp: '周四 21:00' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '我觉得两个人节奏一致比较重要', timestamp: '周四 21:03' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '嗯嗯，我也是这么想的', timestamp: '周四 21:05' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '（她只回了一个"哦"）', timestamp: '周四 21:04' },
      'm5': { id: 'm5', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c8-1': { id: 'c8-1', text: '我觉得条件合适就可以结', score: -10, feedback: '太功利，像交易，好感 -10', feedbackType: 'red', tip: '相亲不要谈"条件合适"，要谈"相处舒服"。', girlReplyId: 'm4', nextChoices: ['c8-7','c8-8','c8-9'] },
      'c8-2': { id: 'c8-2', text: '我想先认真相处，节奏到了自然结', score: 10, feedback: '重视过程+不逃避，好感 +10', feedbackType: 'green', tip: '相亲也要先谈相处，不要直接跳到条件。', girlReplyId: 'm2', nextChoices: ['c8-4','c8-5','c8-6'] },
      'c8-3': { id: 'c8-3', text: '你呢？你家里催得紧吗？', score: 3, feedback: '把球踢回去，但有点回避，好感 +3', feedbackType: 'yellow', tip: '可以反问，但不要显得在逃避问题。', girlReplyId: 'm2', nextChoices: ['c8-4','c8-5','c8-6'] },
      'c8-4': { id: 'c8-4', text: '对，我不想为了结婚而结婚', score: 8, feedback: '价值观共鸣，好感 +8', feedbackType: 'green', tip: '"不为了结婚而结婚"是相亲中的安全表达。', girlReplyId: 'm3', nextChoices: ['c8-10','c8-11','c8-12'] },
      'c8-5': { id: 'c8-5', text: '我觉得一年左右了解比较合理', score: 5, feedback: '给具体时间框架，好感 +5', feedbackType: 'yellow', tip: '可以给框架，但不要显得太计划性。', girlReplyId: 'm3', nextChoices: ['c8-10','c8-11','c8-12'] },
      'c8-6': { id: 'c8-6', text: '我其实还没想好要不要结婚', score: -5, feedback: '逃避问题，好感 -5', feedbackType: 'yellow', tip: '相亲中不要显得"还没想好"，要展示认真态度。', girlReplyId: 'm4', nextChoices: ['c8-10','c8-11','c8-12'] },
      'c8-7': { id: 'c8-7', text: '你问这个是不是太急了？', score: -15, feedback: '防御+质疑，好感 -15', feedbackType: 'red', tip: '她问现实问题，不要防御，要真诚回应。', girlReplyId: 'm5', nextChoices: [] },
      'c8-8': { id: 'c8-8', text: '那先不聊这个了', score: -5, feedback: '回避话题，好感 -5', feedbackType: 'yellow', tip: '可以转移话题，但不要显得在逃避。', girlReplyId: 'm5', nextChoices: [] },
      'c8-9': { id: 'c8-9', text: '我觉得相亲也要先相处舒服，条件可以慢慢对齐', score: 10, feedback: '平衡现实和感受，好感 +10', feedbackType: 'green', tip: '"先相处舒服"是相亲中的黄金表达。', girlReplyId: 'm2', nextChoices: ['c8-4','c8-5','c8-6'] },
      'c8-10': { id: 'c8-10', text: '那我们先认真了解，其他的顺其自然', score: 10, feedback: '认真态度+不压迫，好感 +10', feedbackType: 'green', tip: '"认真了解"是相亲中最安全的承诺。', girlReplyId: 'm5', nextChoices: [] },
      'c8-11': { id: 'c8-11', text: '你周末有空吗？见面聊可能比微信更清楚', score: 12, feedback: '从线上转线下，好感 +12', feedbackType: 'green', tip: '相亲聊现实话题，最好转线下。', girlReplyId: 'm5', nextChoices: [] },
      'c8-12': { id: 'c8-12', text: '我觉得你挺靠谱的，想继续了解', score: 8, feedback: '直接表达兴趣，好感 +8', feedbackType: 'green', tip: '相亲中可以比自由恋爱更直接一点。', girlReplyId: 'm5', nextChoices: [] },
    },
    startChoices: ['c8-1','c8-2','c8-3'],
    endings: {
      excellent: { min: 20, title: '相亲高手', desc: '你既回应了现实问题，又没有让对话变功利。她还愿意继续了解。', emoji: '💎' },
      good: { min: 10, title: '顺利应对', desc: '你没有逃避现实话题，展示了认真态度。', emoji: '👍' },
      neutral: { min: 0, title: '模棱两可', desc: '没有大错，但也没有让她感到你的认真。', emoji: '😐' },
      bad: { min: -999, title: '现实翻车', desc: '太功利、太逃避、或太防御。相亲对象对你失去兴趣。', emoji: '💔' }
    }
  },

  scene9: {
    id: 'scene-9', title: '约会后她到家了',
    context: '第一次约会刚结束，她发来"到家了"。',
    avatar: '💃', girlName: '梦梦',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '21:30', timestamp: '21:30' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '到家了', timestamp: '21:30' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '今天挺开心的', timestamp: '21:32' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '哈哈好啊', timestamp: '21:35' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '（她只回了一个"嗯"）', timestamp: '21:34' },
      'm5': { id: 'm5', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c9-1': { id: 'c9-1', text: '我也到了，今天和你待着挺舒服的', score: 10, feedback: '自然反馈+轻微认可，好感 +10', feedbackType: 'green', tip: '约会后反馈要真诚、具体、不油。', girlReplyId: 'm2', nextChoices: ['c9-4','c9-5','c9-6'] },
      'c9-2': { id: 'c9-2', text: '安全到家就好，下次再约', score: 5, feedback: '关心+模糊邀约，好感 +5', feedbackType: 'yellow', tip: '"下次再约"太模糊，最好具体一点。', girlReplyId: 'm2', nextChoices: ['c9-4','c9-5','c9-6'] },
      'c9-3': { id: 'c9-3', text: '今天对你感觉怎么样？', score: -10, feedback: '索要评价，显得不自信，好感 -10', feedbackType: 'red', tip: '约会后不要问"你感觉怎么样"，要分享自己的感受。', girlReplyId: 'm4', nextChoices: ['c9-7','c9-8','c9-9'] },
      'c9-4': { id: 'c9-4', text: '那家店的甜品确实不错，下次带你去另一家', score: 12, feedback: '具体回忆+具体邀约，好感 +12', feedbackType: 'green', tip: '用具体回忆引出下次邀约，自然不油。', girlReplyId: 'm3', nextChoices: [] },
      'c9-5': { id: 'c9-5', text: '今天聊到那个电影，我回去就找来看', score: 8, feedback: '记住她说的话，好感 +8', feedbackType: 'green', tip: '记住她说的细节，是最好的认可。', girlReplyId: 'm3', nextChoices: [] },
      'c9-6': { id: 'c9-6', text: '那你早点休息，晚安', score: 3, feedback: '安全但无进展，好感 +3', feedbackType: 'yellow', tip: '可以关心，但不要每次都只到"晚安"。', girlReplyId: 'm3', nextChoices: [] },
      'c9-7': { id: 'c9-7', text: '是不是我表现不好？', score: -15, feedback: '自我怀疑+索要肯定，好感 -15', feedbackType: 'red', tip: '约会后不要自我怀疑，要自信地分享感受。', girlReplyId: 'm5', nextChoices: [] },
      'c9-8': { id: 'c9-8', text: '那我不打扰你了', score: 0, feedback: '太急着撤退，好感 0', feedbackType: 'yellow', tip: '可以关心她休息，但不要每次都秒退。', girlReplyId: 'm5', nextChoices: [] },
      'c9-9': { id: 'c9-9', text: '哈哈我也觉得今天挺开心的，尤其是聊到那个话题', score: 10, feedback: '共鸣+具体回忆，好感 +10', feedbackType: 'green', tip: '分享具体感受，比泛泛说"开心"好。', girlReplyId: 'm2', nextChoices: ['c9-4','c9-5','c9-6'] },
    },
    startChoices: ['c9-1','c9-2','c9-3'],
    endings: {
      excellent: { min: 20, title: '约会后高手', desc: '你给了真诚的反馈，还顺势约了下次。她期待再见你。', emoji: '✨' },
      good: { min: 10, title: '顺利收尾', desc: '约会后反馈得体，关系自然延续。', emoji: '👍' },
      neutral: { min: 0, title: '安全收尾', desc: '没有大错，但也没有抓住机会推进。', emoji: '😐' },
      bad: { min: -999, title: '收尾翻车', desc: '索要评价、自我怀疑、或太急着撤退。约会的好感被消耗了。', emoji: '💨' }
    }
  },

  scene10: {
    id: 'scene-10', title: '她说"我们还是做朋友吧"',
    context: '她明确表达只想做朋友，你怎么收尾。',
    avatar: '👩', girlName: '小雅',
    messages: {
      'm0': { id: 'm0', sender: 'system', type: 'time', content: '周二 19:00', timestamp: '周二 19:00' },
      'm1': { id: 'm1', sender: 'girl', type: 'text', content: '我想了很久', timestamp: '周二 19:00' },
      'm2': { id: 'm2', sender: 'girl', type: 'text', content: '我觉得我们还是做朋友比较好', timestamp: '周二 19:01' },
      'm3': { id: 'm3', sender: 'girl', type: 'text', content: '你人很好，但我现在不想谈恋爱', timestamp: '周二 19:02' },
      'm4': { id: 'm4', sender: 'girl', type: 'text', content: '谢谢你理解', timestamp: '周二 19:05' },
      'm5': { id: 'm5', sender: 'girl', type: 'text', content: '（她已读不回）', timestamp: '周二 19:04' },
      'm6': { id: 'm6', sender: 'system', type: 'time', content: '对话结束', timestamp: '' },
    },
    choices: {
      'c10-1': { id: 'c10-1', text: '为什么？是我哪里不好吗？', score: -15, feedback: '追问+自我否定，好感 -15', feedbackType: 'red', tip: '被拒绝后不要追问"为什么"，接受就是最大的体面。', girlReplyId: 'm5', nextChoices: ['c10-7','c10-8','c10-9'] },
      'c10-2': { id: 'c10-2', text: '收到，我尊重你的决定。认识你这段时间挺开心的', score: 12, feedback: '体面接受+真诚祝福，好感 +12', feedbackType: 'green', tip: '被拒绝后，体面退出是最好的挽回。', girlReplyId: 'm4', nextChoices: [] },
      'c10-3': { id: 'c10-3', text: '（不回消息）', score: 3, feedback: '沉默，不加分不扣分，好感 +3', feedbackType: 'yellow', tip: '可以沉默，但一句体面的回应更好。', girlReplyId: 'm6', nextChoices: [] },
      'c10-7': { id: 'c10-7', text: '我可以改，你给我一次机会', score: -20, feedback: '卑微+纠缠，好感 -20', feedbackType: 'red', tip: '"我可以改"是最卑微的表达，永远不要。', girlReplyId: 'm6', nextChoices: [] },
      'c10-8': { id: 'c10-8', text: '那你以后别找我了', score: -10, feedback: '情绪失控+威胁，好感 -10', feedbackType: 'red', tip: '不要情绪失控，保持体面。', girlReplyId: 'm6', nextChoices: [] },
      'c10-9': { id: 'c10-9', text: '我理解，谢谢你坦白说。祝你之后顺利', score: 10, feedback: '成熟+祝福，好感 +10', feedbackType: 'green', tip: '成熟的回应，保留了自己的尊严。', girlReplyId: 'm4', nextChoices: [] },
    },
    startChoices: ['c10-1','c10-2','c10-3'],
    endings: {
      excellent: { min: 10, title: '体面退出', desc: '你保留了尊严，也保留了未来的可能性。', emoji: '🕊️' },
      good: { min: 5, title: '成熟应对', desc: '你没有纠缠，也没有失控。这是最好的回应。', emoji: '👍' },
      neutral: { min: 0, title: '沉默处理', desc: '没有回应，不加分不扣分。但一句体面的话更好。', emoji: '😐' },
      bad: { min: -999, title: '纠缠到底', desc: '追问、卑微、情绪失控。连朋友都做不成了。', emoji: '💔' }
    }
  },

  getSceneData(id) {
    const map = {
      'scene-1': this.scene1, 'scene-2': this.scene2, 'scene-3': this.scene3,
      'scene-4': this.scene4, 'scene-5': this.scene5, 'scene-6': this.scene6,
      'scene-7': this.scene7, 'scene-8': this.scene8, 'scene-9': this.scene9,
      'scene-10': this.scene10
    };
    return map[id] || null;
  }
};
