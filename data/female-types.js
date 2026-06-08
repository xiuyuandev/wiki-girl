/* 女性沟通倾向 Atlas：结构化观察数据
 * 说明：类型不是标签或攻略，只用于降低误判、提升尊重与适配判断。
 */
(function() {
  const article = id => ({ id, name: (window.WIKI && window.WIKI.titles && window.WIKI.titles[id]) || id });
  const byId = Object.create(null);

  function normalize(item) {
    const normalized = Object.assign({
      riskLevel: '中风险',
      bestStage: '了解期',
      core: [],
      signals: [],
      misreads: [],
      betterMoves: [],
      mistakes: [],
      scripts: [],
      boundaries: [],
      confusedWith: [],
      greenFlags: [],
      yellowFlags: [],
      redFlags: [],
      stageSignals: [],
      doDont: { dont: [], do: [] },
      scriptsByStage: [],
      scenarios: [],
      fitFor: [],
      notFitFor: [],
      training: [],
      reviewChecklist: [],
      observationWindow: [],
      decisionRule: '',
      antiPattern: [],
      repair: [],
      evidence: [],
      related: []
    }, item);

    normalized.summary = normalized.summary || normalized.subtitle;
    normalized.watchFirst = normalized.watchFirst || normalized.signals.slice(0, 3).join('；');
    normalized.fit = normalized.fit || normalized.fitFor.join('；');
    normalized.observationWindow = normalized.observationWindow.length ? normalized.observationWindow : [
      `连续观察 2-3 周：${normalized.watchFirst || normalized.subtitle}`,
      `至少结合聊天质量、现实邀约、边界回应三类证据，不用一次冷淡或一次热情定性。`,
      `如果${normalized.riskLevel === '高风险' ? '持续让你焦虑、失衡或模糊' : '长期只有你单向投入'}，优先降低投入而不是加码证明。`
    ];
    normalized.decisionRule = normalized.decisionRule || `先看${normalized.bestStage}里的稳定行动：绿灯不少于 2 条且没有红灯时，可以低压力继续；出现红灯或长期没有现实投入，就停止加码。`;
    normalized.antiPattern = normalized.antiPattern.length ? normalized.antiPattern : (normalized.mistakes.length ? normalized.mistakes : normalized.misreads).slice(0, 3);
    normalized.repair = normalized.repair.length ? normalized.repair : (normalized.betterMoves.length ? normalized.betterMoves : normalized.scripts).slice(0, 3);
    normalized.evidence = normalized.evidence.length ? normalized.evidence : []
      .concat((normalized.greenFlags || []).slice(0, 2).map(text => `正向证据：${text}`))
      .concat((normalized.yellowFlags || []).slice(0, 1).map(text => `待验证：${text}`))
      .concat((normalized.redFlags || []).slice(0, 1).map(text => `停止信号：${text}`));
    normalized.exit = normalized.exit || '如果长期只有你在投入、对方没有清晰回应或明确拒绝，请尊重结果，停止推进。';
    normalized.boundaries = normalized.boundaries.length ? normalized.boundaries : ['任何类型都不代表默许越界；明确拒绝、沉默、退缩都应该被尊重。'];
    normalized.confusedWith = normalized.confusedWith.map(id => typeof id === 'string' ? (byId[id] ? byId[id].name : id) : id);
    byId[normalized.id] = normalized;
    return normalized;
  }

  window.FEMALE_TYPES = [
    normalize({
      id: 'slow-warm', name: '慢热观察型', icon: '🌿', subtitle: '不是没兴趣，而是需要时间确认安全感和真实感。',
      tags: ['慢热', '观察', '低压力'], difficulty: '中', pace: '慢节奏', riskLevel: '低风险', bestStage: '初识期',
      summary: '她不会因为你猛烈推进而更快信任，只会因为你稳定、真实、可拒绝而逐渐放松。', watchFirst: '看她是否愿意持续接话、记住细节、接受轻量邀约，而不是只看回复速度。', confusedWith: ['回避拉扯型', '被动回应型'],
      core: ['回复不一定快，但愿意认真接话', '更看重长期一致，而不是短期热烈', '对突然暧昧、连续追问和强推进敏感', '熟悉之后会明显更放松、更愿意分享'],
      signals: ['会记住你说过的小事', '愿意接受轻松、可拒绝的邀约', '聊天不热烈但不敷衍', '稳定互动后开始主动补充近况'],
      greenFlags: ['慢但有来有回', '会解释忙碌或补回应', '愿意从线上走到线下', '对你的真实生活有好奇'], yellowFlags: ['总说忙但偶尔热情', '只在低成本聊天里停留', '你推进一点她就退一点'], redFlags: ['长期不接话不见面', '明确说只当朋友', '只在需要帮助时出现'],
      stageSignals: [{ stage: '初识', text: '愿意轻松接话，但对高频暧昧敏感。' }, { stage: '熟悉', text: '开始分享近况、偏好和生活碎片。' }, { stage: '推进', text: '能接受具体邀约，但仍需要可拒绝空间。' }],
      misreads: ['把回复慢等同于完全没兴趣', '以为只要猛追就能打动她', '她一谨慎就开始自我否定或逼问答案'], betterMoves: ['保持稳定但不过量的联系频率', '用具体、轻松、可拒绝的方式邀约', '多展示真实生活，不急着要关系定义', '对冷淡反馈及时收住，给彼此空间'], mistakes: ['连续追问“你是不是不喜欢我”', '用长篇解释证明自己真诚', '刚熟一点就突然高强度暧昧'],
      doDont: { dont: ['逼问态度', '刷屏证明', '突然表白'], do: ['稳定出现', '轻量邀约', '允许她慢一点'] }, scripts: ['你不用急着回，我只是看到这个想到你，分享一下。', '这周我会去那家咖啡店坐会儿，你有空可以一起，不方便也没事。'], scriptsByStage: [{ stage: '邀约', text: '周末我想去看这个展，如果你也感兴趣可以一起；没空也没关系。' }, { stage: '降压', text: '我们先按舒服的节奏了解，不需要马上给答案。' }],
      scenarios: [{ title: '她隔很久才回', wrong: '追问为什么不回。', better: '分享轻松内容后转回自己的生活。' }, { title: '她答应但犹豫', wrong: '立刻要求确认关系。', better: '给清楚安排和退路。' }],
      strategies: [
        { title: '轻量开场', desc: '不追问、不查岗，用日常小事自然开启话题。', example: '刚路过那家书店，想起你说想读这本，拍给你看看。' },
        { title: '稳定推进', desc: '保持固定频率出现，让她习惯你的存在。', example: '每周三晚上分享一首歌，不期待秒回，只是想到你。' },
        { title: '轻量邀约', desc: '给足拒绝空间，降低她的心理负担。', example: '周末我会去那家咖啡店，你有空可以来，不方便也没事。' },
        { title: '冲突降温', desc: '她退缩时不追问原因，给空间后再温和出现。', example: '感觉你最近挺忙的，先忙你的，有空了再聊。' },
        { title: '不定义关系', desc: '不急于确认关系，用行动让她自己感到安全。', example: '我们先按舒服的节奏了解，不需要马上给答案。' }
      ],
      chatCases: [
        {
          title: '她隔很久才回消息',
          context: '慢热型女生回复慢',
          messages: [
            { sender: 'girl', text: '不好意思，刚看到' },
            { sender: 'me', text: '没事，我也刚忙完。你上次说的那本书我看完了，结尾挺意外的。', score: '+8', note: '不追问、继续话题' },
            { sender: 'me', text: '你怎么这么久才回？是不是不想聊了？', score: '-10', note: '施压追问，触发防御', isWrong: true }
          ]
        },
        {
          title: '她对你的邀约犹豫',
          context: '邀约时她态度模糊',
          messages: [
            { sender: 'me', text: '周末有个小展，如果你有兴趣可以一起去，没空就改天。' },
            { sender: 'girl', text: '我周末可能有点事……' },
            { sender: 'me', text: '没关系，你先忙。下次有合适的再约，不用勉强。', score: '+8', note: '给退路，降低压力' },
            { sender: 'me', text: '你到底来不来？给个准话。', score: '-10', note: '逼迫确认，让她更想逃', isWrong: true }
          ]
        }
      ],
      boundaries: ['慢热不是默许你无限等待或无限付出；长期没有回应和投入，就要把注意力收回。'], fitFor: ['情绪稳定', '能长期建设自己', '不急着索取反馈'], notFitFor: ['需要秒回确认', '容易患得患失', '把追逐当证明'], training: ['连续两周只做低压力互动，记录她是否主动增加投入。'], reviewChecklist: ['她是否主动补充信息？', '她是否接受现实见面？', '你是否在尊重边界？'], related: [article('ch4'), article('ch19')]
    }),
    normalize({
      id: 'rational-boundary', name: '理性边界型', icon: '🧭', subtitle: '重视清晰、尊重和分寸，不喜欢被情绪裹挟。',
      tags: ['理性', '边界', '清晰'], difficulty: '中', pace: '稳推进', riskLevel: '低风险', bestStage: '了解期', summary: '她更欣赏可靠、清楚、守边界的人；模糊试探和情绪施压会快速扣分。', watchFirst: '看她是否愿意对清晰邀约给清晰回应，而不是看她是否甜。', confusedWith: ['高标准筛选型', '事业独立型'],
      core: ['表达直接，讨厌猜来猜去', '对时间、承诺和边界比较敏感', '不喜欢油腻话术和过度表演', '更欣赏有自我管理能力的人'], signals: ['会明确说自己的安排和偏好', '接受清楚的邀请，反感含糊试探', '对靠谱、守时、说到做到有好感', '认可具体行动多于夸张情绪价值'],
      greenFlags: ['明确回应邀约', '愿意讨论边界', '对守时守信有正反馈'], yellowFlags: ['礼貌但距离固定', '只谈事务不谈感受', '频繁强调自己很忙'], redFlags: ['明确拒绝后仍被纠缠', '对你不守信明显失望', '开始减少解释'], stageSignals: [{ stage: '初识', text: '倾向于看表达是否清楚。' }, { stage: '约会', text: '看你是否准时、尊重安排。' }, { stage: '关系', text: '看双方边界是否被稳定执行。' }],
      misreads: ['把她的冷静理解成高冷或看不起人', '用暧昧试探代替明确表达', '用卖惨、吃醋、施压让她给反馈'], betterMoves: ['说话具体，邀约给时间地点和退路', '尊重她的安排，不临时强塞计划', '表达好感时简洁、有分寸', '自己也保留边界，不讨好不纠缠'], mistakes: ['你怎么这么理性，一点都不浪漫', '临时变卦、迟到、说到做不到', '用情绪逼她解释或安抚你'], doDont: { dont: ['含糊试探', '迟到失约', '卖惨施压'], do: ['表达具体', '尊重时间', '说到做到'] }, scripts: ['我对你有好感，但不想给你压力。我们可以先按舒服的节奏多了解。', '这周六下午三点我有空，如果你也方便，我们可以喝杯咖啡；不方便就改天。'], scriptsByStage: [{ stage: '表达好感', text: '我挺欣赏你的清楚和稳定，也想继续认真了解你。' }, { stage: '冲突', text: '我先说事实，再说感受，我们别互相猜。' }], scenarios: [{ title: '她直接指出问题', wrong: '辩解或说她冷血。', better: '先承认事实，再给调整方案。' }],       strategies: [
        { title: '表达具体', desc: '邀约给时间地点退路，不模糊试探。', example: '周六下午三点，XX咖啡店，不方便就改天。' },
        { title: '尊重时间', desc: '提前约、准时、说到做到。', example: '我周三晚上有空，提前跟你确认周六安排。' },
        { title: '简洁表达', desc: '好感表达简洁有分寸，不夸张。', example: '我挺欣赏你的清楚，也想认真了解你。' },
        { title: '守住边界', desc: '自己也保留边界，不讨好不纠缠。', example: '我理解你的安排，我也有自己的节奏。' },
        { title: '事实先行', desc: '冲突时先讲事实再讲感受。', example: '事实是……我的感受是……你怎么看？' },
      ],
      chatCases: [
        {
          title: '她直接指出你的问题',
          context: '她对你某件事表达不满',
          messages: [
            { sender: 'girl', text: '你上次答应的事没做到', score: '', note: '', isWrong: false },
            { sender: 'me', text: '你说得对，是我没做到。我下周会补上，具体时间我们确认一下。', score: '+10', note: '承认事实+给方案', isWrong: false },
            { sender: 'me', text: '你怎么这么较真，小事而已。', score: '-12', note: 'dismiss她的感受', isWrong: true },
          ]
        },
        {
          title: '邀约时她问具体时间',
          context: '她需要清楚的安排',
          messages: [
            { sender: 'me', text: '周末有空吗？', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '周六还是周日？几点？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '周六下午三点，XX咖啡店，如果你不方便就改周日。', score: '+10', note: '具体+给退路', isWrong: false },
            { sender: 'me', text: '到时候再说呗。', score: '-10', note: '太模糊，让她没安全感', isWrong: true },
          ]
        },
      ],
      boundaries: ['尊重边界不是冷漠；如果她明确拒绝，就停止推进，不要继续辩论。'], fitFor: ['成熟守信', '能把话说清楚', '不靠情绪操控'], notFitFor: ['喜欢暧昧拉扯', '承诺随口说', '把边界当挑战'], training: ['每次邀约都写清时间、地点、备选和退路。'], reviewChecklist: ['我有没有具体表达？', '有没有临时打乱她安排？', '有没有把情绪丢给她负责？'], related: [article('ch6'), article('ch19')]
    }),
    normalize({
      id: 'social-bright', name: '社交外放型', icon: '✨', subtitle: '热情不等于喜欢你，她只是更擅长表达和连接。', tags: ['外放', '社交', '体验'], difficulty: '中', pace: '自然推进', riskLevel: '中风险', bestStage: '暧昧期', summary: '重点不是她有多热情，而是她是否愿意给你单独、稳定、现实的投入。', watchFirst: '区分普遍社交热情与对你的单独投入。', confusedWith: ['主动直球型', '浪漫体验型'], core: ['聊天热情，社交能量高', '朋友和活动较多，不会只围着你转', '喜欢轻松、有趣、有生活感的互动', '对无聊、控制欲和酸味很敏感'], signals: ['会主动分享活动和见闻', '愿意把你纳入现实活动', '对你的生活状态也有好奇', '单独见面时投入度比群体场合更关键'], greenFlags: ['愿意单独约见', '主动介绍现实圈子', '对你的状态持续好奇'], yellowFlags: ['只在群体里热情', '私下很少回应', '常用玩笑回避具体推进'], redFlags: ['把你当情绪陪聊', '拒绝所有单独相处', '用暧昧换资源'], stageSignals: [{ stage: '社交场', text: '看她是否把注意力从群体转向你。' }, { stage: '私聊', text: '看她是否愿意延续话题。' }, { stage: '单独约会', text: '看投入度和后续反馈。' }], misreads: ['把她对所有人的热情当成只对你特殊', '因为她社交多就吃醋、审问、控制', '试图用冷淡或忽视制造吸引'], betterMoves: ['你也要有自己的生活和社交半径', '邀约设计轻松、有体验感', '观察她是否愿意单独投入时间', '少查岗，多展示稳定和有趣'], mistakes: ['你是不是对谁都这样？', '反复问她和异性朋友的关系', '为了显得特别而故意打压她的热情'], doDont: { dont: ['查岗吃醋', '贬低她社交', '冷处理博关注'], do: ['提升生活感', '邀约具体活动', '观察单独投入'] }, scripts: ['你这个活动听起来挺有意思，下次有适合的我也想试试。', '和你聊天挺轻松的。改天我们单独去吃那家店，看看现实里是不是也这么合拍。'], scriptsByStage: [{ stage: '转线下', text: '群里聊你挺有趣的，改天我们单独喝杯咖啡。' }], scenarios: [{ title: '她对别人也热情', wrong: '吃醋审问。', better: '观察她是否为你留出单独时间。' }],       strategies: [
        { title: '不查岗', desc: '观察单独投入，不审问社交关系。', example: '你和朋友们玩得开心，改天我们单独去那家店。' },
        { title: '有生活', desc: '展示自己的社交和生活半径。', example: '这周我也和朋友去爬山了，下次可以一起去。' },
        { title: '轻松邀约', desc: '设计有体验感的活动邀约。', example: '听说有个沉浸式展览，要不要一起去体验？' },
        { title: '观察投入', desc: '看是否愿意单独花时间。', example: '群里聊得开心，改天我们单独喝杯咖啡？' },
        { title: '不嫉妒', desc: '不因她对别人热情而吃醋。', example: '你对朋友挺热情的，我欣赏这点。' },
      ],
      chatCases: [
        {
          title: '她对别人也很热情',
          context: '你看到她对其他男生也很热情',
          messages: [
            { sender: 'girl', text: '今晚和朋友聚会，挺开心的', score: '', note: '', isWrong: false },
            { sender: 'me', text: '听起来不错。改天我们单独去那家新开的店，我也想和你单独聊聊。', score: '+8', note: '不嫉妒+邀约单独相处', isWrong: false },
            { sender: 'me', text: '你对谁都这么热情吗？', score: '-10', note: '吃醋审问，让她反感', isWrong: true },
          ]
        },
        {
          title: '她想带你见朋友',
          context: '她邀请你参加朋友聚会',
          messages: [
            { sender: 'girl', text: '下周朋友聚会，你要不要来？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '好啊，我也想认识你的朋友。不过之后我们单独约一次，我想有更多时间了解你。', score: '+10', note: '接受+争取单独时间', isWrong: false },
            { sender: 'me', text: '我只想你单独陪我。', score: '-8', note: '拒绝她的社交，显得控制', isWrong: true },
          ]
        },
      ],
      boundaries: ['外放不代表没有边界。不要因为她热情就默认可以越界或亲密推进。'], fitFor: ['心态开放', '有自己生活', '不靠控制获得安全感'], notFitFor: ['占有欲强', '容易比较', '害怕社交型伴侣'], training: ['把判断标准从聊天热度改为现实投入。'], reviewChecklist: ['她是否愿意单独见面？', '你有没有控制欲上头？'], related: [article('ch3'), article('ch17')]
    }),
    normalize({
      id: 'career-independent', name: '事业独立型', icon: '🏙️', subtitle: '她需要的是并肩感，不是被安排或被拯救。', tags: ['独立', '事业', '并肩'], difficulty: '高', pace: '稳推进', riskLevel: '中风险', bestStage: '了解期', summary: '关系必须成为加分项；你越焦虑地争夺注意力，越容易被视为额外负担。', watchFirst: '看她忙碌时是否仍愿意提前说明、补约和保持质量。', confusedWith: ['理性边界型', '高标准筛选型'], core: ['时间密度高，重视效率和目标', '不喜欢被说教、被安排、被否定野心', '看重你是否稳定、上进、有规划', '关系要成为加分项，而不是额外负担'], signals: ['忙但会提前说明或补约', '对你的规划、工作态度有关注', '更喜欢高质量短互动', '尊重彼此时间时反而更愿意投入'], greenFlags: ['忙但不失联', '会补偿性安排', '欣赏你的秩序和目标'], yellowFlags: ['总把关系排到最后', '只在压力大时找你', '不愿讨论未来节奏'], redFlags: ['长期没有时间投入', '否定你的价值', '把你当后勤资源'], stageSignals: [{ stage: '邀约', text: '更适合提前约、高质量短约。' }, { stage: '深入', text: '会看价值观、时间管理和长期目标。' }], misreads: ['把忙当借口，开始抱怨她不重视你', '用“女生别太拼”否定她', '用频繁联系证明存在感'], betterMoves: ['尊重她的时间，提前约、准时、守信', '展示你的生活秩序和长期规划', '提供支持而不是指导人生', '少消耗，多创造高质量相处'], mistakes: ['临时约她还怪她没空', '把她的成就当压力，然后阴阳怪气', '用低价值陪伴打扰她的节奏'], doDont: { dont: ['否定事业心', '临时强约', '用黏人证明爱'], do: ['提前计划', '并肩支持', '展示自我建设'] }, scripts: ['你这段时间节奏挺满的，先忙你的。等你方便，我们约个轻松的晚饭。', '我挺欣赏你对目标的投入，也想听听你最近最有成就感的一件事。'], scriptsByStage: [{ stage: '忙碌期', text: '我不占用你工作节奏，我们找一个双方都轻松的时间。' }], scenarios: [{ title: '她连续加班', wrong: '抱怨她不重视你。', better: '尊重节奏，但观察是否有补约意愿。' }],       strategies: [
        { title: '提前约', desc: '尊重她的时间，提前安排。', example: '下周三晚上你有空吗？想约你吃个轻松的晚饭。' },
        { title: '展示规划', desc: '分享你的目标和秩序感。', example: '我最近在做这个项目，挺有挑战的，想听听你的看法。' },
        { title: '并肩感', desc: '提供支持而不是指导人生。', example: '你这个项目听起来很有野心，需要支持的话我在。' },
        { title: '不黏人', desc: '高质量短互动，不占用她节奏。', example: '你先忙，不用急着回，有空了再聊。' },
        { title: '补约意识', desc: '她忙时主动提出补约。', example: '这周你忙，我们改到下周，我提前安排。' },
      ],
      chatCases: [
        {
          title: '她连续加班',
          context: '她工作很忙，回复变慢',
          messages: [
            { sender: 'girl', text: '这周要赶项目，可能回复慢', score: '', note: '', isWrong: false },
            { sender: 'me', text: '理解，你先忙。等你方便了告诉我，我们约个轻松的时间。', score: '+10', note: '尊重+预留补约', isWrong: false },
            { sender: 'me', text: '你总是这么忙，是不是不想理我？', score: '-12', note: '抱怨+质疑，增加压力', isWrong: true },
          ]
        },
        {
          title: '她谈到职业目标',
          context: '她分享自己的职业规划',
          messages: [
            { sender: 'girl', text: '我想三年内做到总监', score: '', note: '', isWrong: false },
            { sender: 'me', text: '挺有野心的。需要支持的话我在，但也别把自己逼太紧。', score: '+10', note: '支持+关心平衡', isWrong: false },
            { sender: 'me', text: '女生不用这么拼吧。', score: '-15', note: '否定她的事业心', isWrong: true },
          ]
        },
      ],
      boundaries: ['支持不是牺牲自己。你也需要自己的节奏，不要把等待变成怨气。'], fitFor: ['有目标感', '能独立生活', '尊重女性事业'], notFitFor: ['需要随叫随到', '自尊依赖对方崇拜', '把伴侣当生活中心'], training: ['建立自己的周计划，避免把空白时间都压给她。'], reviewChecklist: ['我是否也有自己的目标？', '她是否有实际投入？'], related: [article('ch18'), article('ch13')]
    }),
    normalize({
      id: 'security-seeking', name: '安全感需求型', icon: '🫶', subtitle: '她在意的不是你多会说，而是你是否稳定一致。', tags: ['安全感', '一致性', '稳定'], difficulty: '中', pace: '慢节奏', riskLevel: '中风险', bestStage: '暧昧期', summary: '稳定能建立信任，但安全感不能靠查岗和无限证明维持。', watchFirst: '看她是否能在被安抚后回到事实沟通。', confusedWith: ['情绪敏感型', '讨好压抑型'], core: ['对忽冷忽热特别敏感', '在意承诺是否兑现、表达是否一致', '容易通过细节判断你是否认真', '需要稳定，但不等于需要你无底线供给'], signals: ['会确认你的想法和关系状态', '对突然消失、临时取消反应明显', '被认真回应后会变得柔和', '愿意在稳定关系里投入很多'], greenFlags: ['被解释后能理解', '愿意一起制定沟通方式', '投入稳定'], yellowFlags: ['频繁确认关系', '对小变化高度紧张', '需要较多解释'], redFlags: ['查岗控制', '威胁测试', '把所有情绪归咎于你'], stageSignals: [{ stage: '暧昧', text: '最在意你是否稳定一致。' }, { stage: '冲突', text: '先需要情绪被接住，再谈事实。' }], misreads: ['把她的不安当作作、麻烦、控制欲', '用冷处理惩罚她的情绪', '为了安抚随口承诺做不到的事'], betterMoves: ['表达清楚，行动一致', '做不到的事不要承诺', '情绪出现时先接住，再讨论事实', '同时说明你的边界和能力范围'], mistakes: ['你怎么又想多了？', '前一天热情，后一天消失', '用甜言蜜语临时灭火，之后继续失约'], doDont: { dont: ['忽冷忽热', '随口承诺', '冷暴力'], do: ['提前说明', '行动一致', '边界清楚'] }, scripts: ['我理解你会不安。我的想法是继续了解你，但我也希望我们都不要用猜测折磨彼此。', '我今晚会忙到十点，之后看到会回你，不是故意消失。'], scriptsByStage: [{ stage: '安抚', text: '我听到了你的不安，我会说明情况，但也希望我们不要用反复测试解决问题。' }], scenarios: [{ title: '她反复问你在不在乎', wrong: '不耐烦讽刺。', better: '先确认感受，再说明边界。' }],       strategies: [
        { title: '稳定一致', desc: '不忽冷忽热，保持可预期。', example: '我每天晚上十点后回消息，不是故意消失。' },
        { title: '提前说明', desc: '做不到的事提前说，不临时变卦。', example: '这周可能会忙，提前跟你说，不是疏远你。' },
        { title: '接住情绪', desc: '她不安时先确认感受。', example: '我理解你会不安，我的想法是继续认真了解你。' },
        { title: '不随口承诺', desc: '承诺前想清楚能否做到。', example: '这个我现在不能保证，但我会尽力。' },
        { title: '边界清楚', desc: '安抚同时说明自己的边界。', example: '我会给你安全感，但也希望我们都别互相测试。' },
      ],
      chatCases: [
        {
          title: '她问你在不在乎她',
          context: '她反复确认你的态度',
          messages: [
            { sender: 'girl', text: '你是不是对我不认真？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解你会不安。我的想法是继续认真了解你，但我也希望我们都别互相测试。', score: '+10', note: '确认+设边界', isWrong: false },
            { sender: 'me', text: '你怎么又这么想？', score: '-12', note: 'dismiss她的不安', isWrong: true },
          ]
        },
        {
          title: '你临时取消约会',
          context: '你有事需要改时间',
          messages: [
            { sender: 'me', text: '抱歉，临时有急事，周六约会要改期。下周六同一时间可以吗？', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '……好吧', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我知道临时改期不好。下周六我提前确认，不会再变。', score: '+8', note: '道歉+具体补救+承诺', isWrong: false },
            { sender: 'me', text: '有事没办法，下次再说。', score: '-10', note: '太随意，没补救', isWrong: true },
          ]
        },
      ],
      boundaries: ['安全感不能靠控制和查岗解决。你可以安抚，但不需要接受情绪勒索。'], fitFor: ['表达稳定', '愿意沟通', '能守住边界'], notFitFor: ['经常失联', '害怕沟通', '用冷处理解决问题'], training: ['把“做不到不承诺”作为一周练习。'], reviewChecklist: ['我是否行动一致？', '她是否尊重我的边界？'], related: [article('ch13'), article('ch19')]
    }),
    normalize({
      id: 'emotion-sensitive', name: '情绪敏感型', icon: '🌙', subtitle: '她更容易捕捉语气和细节，需要被理解，也需要健康边界。', tags: ['敏感', '共情', '情绪'], difficulty: '高', pace: '慢节奏', riskLevel: '高风险', bestStage: '关系期', summary: '共情是入口，边界是底盘；只哄不沟通会把关系拖成高消耗。', watchFirst: '看她情绪过后是否愿意复盘和调整。', confusedWith: ['安全感需求型', '高敏边界型'], core: ['对语气、态度和氛围变化敏锐', '被忽视时容易退缩或情绪化', '真正需要的是理解，不是被教育', '情绪过后也需要清晰沟通和边界'], signals: ['会在意你有没有听懂她的感受', '对敷衍回应很失望', '被认真理解后信任提升很快', '冲突时可能先情绪化，后面再讲道理'], greenFlags: ['能说清感受', '愿意为情绪负责', '复盘后关系更清楚'], yellowFlags: ['经常因为语气受伤', '需要较多安抚', '冲突后冷一阵'], redFlags: ['辱骂威胁', '反复情绪审判', '拒绝任何复盘'], stageSignals: [{ stage: '日常', text: '对态度细节敏锐。' }, { stage: '冲突', text: '先共情，再讨论事实。' }], misreads: ['急着讲道理、纠正她', '把所有情绪都当成无理取闹', '为了避免冲突什么都答应'], betterMoves: ['先复述感受，再讨论事实', '用稳定语气，不讽刺不冷暴力', '区分理解情绪和接受越界行为', '冲突后给出可执行的改进点'], mistakes: ['你别想太多。', '她表达难受时你立刻反驳', '把安抚变成讨好，最后自己爆炸'], doDont: { dont: ['立刻辩论', '讽刺冷暴力', '无底线讨好'], do: ['复述感受', '暂停升级', '事后复盘'] }, scripts: ['我听到你不是在纠结这件小事，而是觉得自己没被重视，对吗？', '我愿意认真聊，但我们都先别用攻击的话。十分钟后再继续。'], scriptsByStage: [{ stage: '冲突暂停', text: '我不是不聊，是不想在情绪最高的时候互相伤害，我们缓十分钟。' }], scenarios: [{ title: '她突然情绪低落', wrong: '说“你又来了”。', better: '先确认感受和触发点。' }],       strategies: [
        { title: '复述感受', desc: '先确认她的感受，不急着讲道理。', example: '我听到你不是纠结这件事，而是觉得自己没被重视。' },
        { title: '稳定语气', desc: '不讽刺不冷暴力，语气平和。', example: '我愿意认真聊，但我们都别用攻击的话。' },
        { title: '暂停升级', desc: '情绪高时暂停，降温后再聊。', example: '我们先缓十分钟，情绪下来了再继续。' },
        { title: '事后复盘', desc: '冲突后给出可执行的改进点。', example: '这次冲突我的问题是……下次我会……' },
        { title: '不讨好', desc: '理解情绪但不接受越界行为。', example: '我理解你的感受，但辱骂我不能接受。' },
      ],
      chatCases: [
        {
          title: '她突然情绪低落',
          context: '她因为小事突然难过',
          messages: [
            { sender: 'girl', text: '你是不是觉得我很烦？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我听到你不是纠结这件事，而是觉得自己没被重视，对吗？', score: '+10', note: '复述感受', isWrong: false },
            { sender: 'me', text: '你别想太多。', score: '-12', note: '否定她的感受', isWrong: true },
          ]
        },
        {
          title: '冲突时她想暂停',
          context: '情绪高涨时她要求暂停',
          messages: [
            { sender: 'girl', text: '我现在不想聊了', score: '', note: '', isWrong: false },
            { sender: 'me', text: '好，我们先缓一缓。十分钟后如果你愿意，我们再继续。', score: '+10', note: '尊重暂停+给时间', isWrong: false },
            { sender: 'me', text: '不行，必须把话说清楚。', score: '-12', note: '逼迫继续，情绪升级', isWrong: true },
          ]
        },
      ],
      boundaries: ['共情不是无限承受攻击。辱骂、威胁、反复越界时要暂停沟通。'], fitFor: ['耐心共情', '情绪稳定', '能设边界'], notFitFor: ['一冲突就逃', '把情绪都当麻烦', '不会表达感受'], training: ['练习“感受复述 + 事实确认 + 下一步”。'], reviewChecklist: ['我有没有先理解？', '有没有接受越界？'], related: [article('ch11'), article('ch13')]
    }),
    normalize({
      id: 'romantic-experience', name: '浪漫体验型', icon: '🎬', subtitle: '她重视感受和仪式，但不等于只看花钱。', tags: ['浪漫', '体验', '感受'], difficulty: '中', pace: '自然推进', riskLevel: '低风险', bestStage: '约会期', summary: '她在意“你有没有观察和用心”，不是机械套模板或用价格代替诚意。', watchFirst: '看她是否也为体验投入，而不是只索取安排。', confusedWith: ['社交外放型', '文艺感受型'], core: ['喜欢有记忆点的相处体验', '在意你是否用心观察她的偏好', '讨厌敷衍、直男式省事和复制粘贴', '浪漫来自细节，不是昂贵表演'], signals: ['会分享想去的店、电影、展览或旅行', '对你记住她偏好反应很好', '喜欢相处中的小惊喜', '对粗糙安排和临时凑合失望'], greenFlags: ['会回应你的用心', '也会照顾你的偏好', '相处后愿意复盘喜欢什么'], yellowFlags: ['对体验要求高但反馈少', '容易因小粗糙失望', '常拿别人比较'], redFlags: ['只接受消费不投入', '把浪漫当考核羞辱', '用礼物衡量价值'], stageSignals: [{ stage: '约会', text: '安排的细节和记忆点很重要。' }, { stage: '关系', text: '长期浪漫来自持续观察。' }], misreads: ['以为浪漫就是砸钱', '嫌她“事多”“矫情”', '用土味情话代替真实用心'], betterMoves: ['提前做一点安排，但保留轻松感', '记住她具体偏好，而不是泛泛讨好', '把约会做成共同体验', '表达欣赏要具体，不油腻'], mistakes: ['每次都问“随便，你定”', '复制网上模板制造惊喜', '用贵礼物掩盖不用心'], doDont: { dont: ['复制模板', '用价格压人', '全程让她决定'], do: ['记偏好', '做轻安排', '共同体验'] }, scripts: ['你上次说想看这个展，我查了周日下午人少一点，要不要一起去？', '我记得你不太能吃辣，所以这家应该更合适。'], scriptsByStage: [{ stage: '邀约', text: '我按你之前提过的偏好选了两个地方，你看看哪个更舒服。' }], scenarios: [{ title: '约会没灵感', wrong: '说“你定吧”。', better: '给两个备选并说明理由。' }],       strategies: [
        { title: '记偏好', desc: '记住她具体喜好，不是泛泛讨好。', example: '你上次说喜欢手冲，这家店豆子是自家烘的。' },
        { title: '轻安排', desc: '提前做一点安排但保留轻松感。', example: '我查了这个展周日下午人少一点，要不要去？' },
        { title: '具体赞美', desc: '赞美具体细节，不油腻。', example: '你今天选的这首歌，副歌那段编曲挺特别的。' },
        { title: '共同体验', desc: '把约会做成共同参与的体验。', example: '我们可以一起做这道菜，比外面吃有意思。' },
        { title: '不用钱代替', desc: '用心比花钱更重要。', example: '我手写了这个歌单，不是买的，是我想分享给你的。' },
      ],
      chatCases: [
        {
          title: '约会没灵感',
          context: '她暗示想有特别的约会',
          messages: [
            { sender: 'girl', text: '周末有什么安排？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我查了两个地方：一个是手作陶艺，一个是小众展览。你更喜欢哪个？', score: '+10', note: '具体选择+用心安排', isWrong: false },
            { sender: 'me', text: '随便，你定吧。', score: '-10', note: '敷衍，让她失望', isWrong: true },
          ]
        },
        {
          title: '她提到想去的店',
          context: '她之前提过想去的餐厅',
          messages: [
            { sender: 'girl', text: '那家日料店听说不错', score: '', note: '', isWrong: false },
            { sender: 'me', text: '你上次提过，我查了周四晚上有位子，要不要去？', score: '+12', note: '记住偏好+主动安排', isWrong: false },
            { sender: 'me', text: '哦，那改天去吧。', score: '-5', note: '没行动，只是敷衍', isWrong: true },
          ]
        },
      ],
      boundaries: ['体验感不是单方面消费义务。对方只索取、不投入，也要重新判断适配。'], fitFor: ['愿意观察细节', '生活不粗糙', '能制造轻松体验'], notFitFor: ['极度省事', '用钱替代用心', '反感仪式感'], training: ['建立“她的偏好清单”：食物、节奏、禁忌、想体验。'], reviewChecklist: ['我是否记住具体偏好？', '她是否也照顾我的感受？'], related: [article('ch6'), article('ch11')]
    }),
    normalize({
      id: 'avoidant-pull', name: '回避拉扯型', icon: '🪁', subtitle: '靠近时退、你退时又靠近，关键是看长期一致性。', tags: ['回避', '拉扯', '边界'], difficulty: '高', pace: '慢节奏', riskLevel: '高风险', bestStage: '暧昧期', summary: '不要把不确定性浪漫化。你需要观察稳定行动，而不是沉迷情绪峰值。', watchFirst: '看她是否愿意在清晰表达后给出更稳定的行动。', confusedWith: ['慢热观察型', '高敏边界型'], core: ['亲近时容易退缩，失去时又会靠近', '不一定是坏人，但会让关系消耗很大', '短期热度不能代表稳定意愿', '你需要看行动一致性，而不是只看情绪瞬间'], signals: ['暧昧时热，谈清楚时退', '你停止投入后她又回来试探', '关系定义长期模糊', '对承诺和稳定安排回避'], greenFlags: ['能承认自己的回避', '愿意一起调整节奏', '行动逐渐稳定'], yellowFlags: ['忽近忽远', '回避定义', '只在你后撤时靠近'], redFlags: ['反复吊着你', '拒绝沟通又要求你等待', '让你长期焦虑失衡'], stageSignals: [{ stage: '暧昧', text: '热度波动大，不要立刻加码。' }, { stage: '表达', text: '看她是否愿意面对清晰需求。' }], misreads: ['把拉扯当成高级吸引', '越不确定越上头，持续加码', '用表白、证明、牺牲逼出答案'], betterMoves: ['降低追逐，回到自己的生活', '用清晰但不施压的方式表达需求', '设观察期限，看行动是否稳定', '不把忽冷忽热浪漫化'], mistakes: ['她一回来就立刻满血投入', '为了换确定性不断降低底线', '反复逼问“我们到底算什么”但不行动退出'], doDont: { dont: ['追逐上头', '用牺牲换答案', '以拉扯对拉扯'], do: ['设期限', '看一致性', '回到生活'] }, scripts: ['我对你有好感，但忽近忽远会让我不舒服。如果我们继续了解，我希望节奏更稳定。', '我尊重你需要空间，但我也不会长期停在不清楚的位置。'], scriptsByStage: [{ stage: '设边界', text: '我可以慢一点，但不能一直模糊。如果我们没有更清楚的行动，我会先收回投入。' }], scenarios: [{ title: '你退她又热', wrong: '立刻加倍投入。', better: '保持稳定，观察是否有具体行动。' }],       strategies: [
        { title: '设期限', desc: '给观察期限，不看情绪峰值。', example: '接下来两三周正常相处，如果没有更清楚的方向，我先收回投入。' },
        { title: '不追逐', desc: '她退时你也退，回到自己生活。', example: '我理解你需要空间，我先忙自己的，你想聊了再找我。' },
        { title: '清晰表达', desc: '用清楚但不施压的方式说需求。', example: '我对你有好感，但忽近忽远让我不舒服。' },
        { title: '看一致性', desc: '观察行动是否稳定，不看瞬间热情。', example: '我不看你某句话多热情，我看两周内你是否主动找我。' },
        { title: '不浪漫化', desc: '不把拉扯当高级吸引。', example: '不确定不是浪漫，我需要更清楚的信号。' },
      ],
      chatCases: [
        {
          title: '她忽冷忽热',
          context: '前几天热情，突然冷淡',
          messages: [
            { sender: 'girl', text: '（已读不回，持续两天）', score: '', note: '', isWrong: false },
            { sender: 'me', text: '感觉你最近需要空间，我先忙自己的。如果你想聊了，随时找我。', score: '+10', note: '给空间+不追逐', isWrong: false },
            { sender: 'me', text: '你怎么又不回我？是不是我做错什么了？', score: '-15', note: '焦虑追问，她更想逃', isWrong: true },
          ]
        },
        {
          title: '她回避定义关系',
          context: '你想确认关系，她回避',
          messages: [
            { sender: 'me', text: '我们这样算什么关系？', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '我觉得现在这样挺好的', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解你不想急。但我也需要更清楚的信号，不然我会先收回一些投入。', score: '+10', note: '表达需求+设边界', isWrong: false },
            { sender: 'me', text: '你到底喜不喜欢我？', score: '-12', note: '逼迫表态，她更回避', isWrong: true },
          ]
        },
      ],
      boundaries: ['不要用拉扯对付拉扯。健康关系靠清晰和尊重，不靠互相折磨。'], fitFor: ['情绪很稳', '边界清楚', '不会被不确定性拖走'], notFitFor: ['容易上头', '害怕失去', '用自我牺牲换确定性'], training: ['设定观察期限：两周看行动，不看情绪峰值。'], reviewChecklist: ['她是否行动更稳定？', '我是否失去生活重心？'], related: [article('ch7'), article('ch20')]
    }),
    normalize({
      id: 'high-standard', name: '高标准筛选型', icon: '🏅', subtitle: '她不是故意难搞，而是认真筛选长期适配。', tags: ['标准', '筛选', '长期'], difficulty: '高', pace: '稳推进', riskLevel: '中风险', bestStage: '了解期', summary: '她会看价值观、生活秩序、情绪稳定和未来规划；包装感很快会露馅。', watchFirst: '看她的问题是否围绕长期适配，而不是单纯挑刺。', confusedWith: ['理性边界型', '相亲评估型'], core: ['对长期伴侣有明确标准', '不轻易被短期热度打动', '会观察细节一致性', '尊重强者但反感装腔'], signals: ['会问你的规划和价值观', '看重情绪稳定和执行力', '不会因为你讨好就降低标准', '对真诚自洽有好感'], greenFlags: ['标准清楚且自己也匹配', '愿意给了解机会', '认可你的真实进步'], yellowFlags: ['问题很多但反馈少', '容易比较', '对缺点敏感'], redFlags: ['只有要求没有投入', '贬低测试', '把你当备选池'], stageSignals: [{ stage: '初识', text: '会观察基本面和表达方式。' }, { stage: '深入', text: '会问长期规划与价值观。' }], misreads: ['把筛选当作拜金或高冷', '用讨好试图过关', '夸大自己条件'], betterMoves: ['真实展示优势和短板', '用行动证明长期稳定', '别急着迎合所有标准', '也判断她是否适配你'], mistakes: ['吹牛包装', '为了通过筛选失去自我', '被问到规划就防御'], doDont: { dont: ['装成功', '跪舔过关', '贬低她标准'], do: ['真实清楚', '展示执行', '双向筛选'] }, scripts: ['我理解你看重长期适配，我也希望我们能真实了解，而不是互相包装。'], scriptsByStage: [{ stage: '价值观', text: '这个问题我现在的想法是……也想听听你的标准从哪里来。' }], scenarios: [{ title: '她问很多现实问题', wrong: '觉得被审判。', better: '平静回答，同时观察她是否同样开放。' }],       strategies: [
        { title: '真实展示', desc: '不包装，展示真实优势和短板。', example: '我的情况是……短板是……正在这样改善。' },
        { title: '用行动证明', desc: '长期稳定比短期热度更有说服力。', example: '我不会说大话，但我会用行动让你看到我的稳定。' },
        { title: '双向筛选', desc: '也判断她是否适配你。', example: '你的标准我理解了，我也想看看我们的节奏是否合适。' },
        { title: '不跪舔', desc: '不为了通过筛选失去自我。', example: '我欣赏你的标准，但我不会为了迎合失去自己。' },
        { title: '展示执行', desc: '用具体成果展示执行力。', example: '这是我最近做的项目，我想让你了解真实的我。' },
      ],
      chatCases: [
        {
          title: '她问你的规划',
          context: '她想知道你的长期目标',
          messages: [
            { sender: 'girl', text: '你对未来有什么规划？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '三年内想做到项目经理，也在学新技能。短期更想把我们的相处过稳。', score: '+10', note: '真实具体+回归关系', isWrong: false },
            { sender: 'me', text: '以后肯定会很好的，你放心。', score: '-10', note: '空话画饼', isWrong: true },
          ]
        },
        {
          title: '她指出你的缺点',
          context: '她直接说你的某个不足',
          messages: [
            { sender: 'girl', text: '你有时候不太守时', score: '', note: '', isWrong: false },
            { sender: 'me', text: '你说得对，这是我的问题。我已经设了提醒，下次会提前到。', score: '+10', note: '承认+改进方案', isWrong: false },
            { sender: 'me', text: '你要求也太高了吧。', score: '-10', note: '防御攻击', isWrong: true },
          ]
        },
      ],
      boundaries: ['高标准不等于可以贬低你；双向尊重才有继续必要。'], fitFor: ['自我建设强', '真实稳定', '能接受双向筛选'], notFitFor: ['靠包装吸引', '害怕现实问题', '低自尊讨好'], training: ['写出你的长期基本盘：工作、生活、情绪、关系目标。'], reviewChecklist: ['我是否真实？', '她是否也有投入？'], related: [article('ch18'), article('ch19')]
    }),
    normalize({
      id: 'passive-response', name: '被动回应型', icon: '💬', subtitle: '她不太主动，但被动不一定等于喜欢或不喜欢。', tags: ['被动', '观察', '低压力'], difficulty: '中', pace: '慢节奏', riskLevel: '中风险', bestStage: '初识期', summary: '关键看回应质量、现实投入和是否逐渐增加主动，而不是你能不能一直带动。', watchFirst: '看她是否只接不投，还是慢慢给出更多信息。', confusedWith: ['慢热观察型', '讨好压抑型'], core: ['主动性较低', '习惯让对方带节奏', '可能是谨慎，也可能只是兴趣不足', '需要用投入质量判断'], signals: ['你抛话题她会接', '很少主动开启话题', '对轻松邀约可能愿意尝试', '对强推进容易沉默'], greenFlags: ['回应有内容', '会接受合理邀约', '逐渐主动补充'], yellowFlags: ['永远只回表情', '不主动也不拒绝', '话题都靠你撑'], redFlags: ['只索取陪聊', '从不见面', '明确回避推进'], stageSignals: [{ stage: '聊天', text: '看回应质量。' }, { stage: '邀约', text: '看是否愿意现实投入。' }], misreads: ['以为只要你够努力就能带热', '把礼貌回复当暧昧', '因她不主动就立刻攻击'], betterMoves: ['给轻量选择题', '降低聊天成本', '用现实邀约验证', '别长期单方表演'], mistakes: ['每天硬找话题', '追问为什么不主动', '把她的被动合理化太久'], doDont: { dont: ['单方表演', '逼她主动', '无限陪聊'], do: ['轻选择', '看质量', '用邀约验证'] }, scripts: ['我感觉一直是我在开话题，可能我们节奏还没那么合适。你如果也想了解，可以多给我一点反馈。'], scriptsByStage: [{ stage: '验证', text: '我们线下喝杯东西吧，现实相处比一直聊天更容易判断。' }], scenarios: [{ title: '她只回“哈哈”', wrong: '继续长篇输出。', better: '收住，隔段时间用具体邀约验证。' }],       strategies: [
        { title: '轻选择', desc: '给具体选项，降低她的心理成本。', example: '周六下午咖啡或周日中午散步，你哪个方便？' },
        { title: '看质量', desc: '不看回复速度，看回应内容质量。', example: '她回复慢但内容认真，比秒回哈哈有价值。' },
        { title: '邀约验证', desc: '用现实邀约测试真实兴趣。', example: '聊了这么久，不如线下喝杯东西，现实里更容易判断。' },
        { title: '不单方表演', desc: '不长期单方面带动话题。', example: '感觉一直是我在开话题，你如果也想了解，可以多给我一点反馈。' },
        { title: '及时止损', desc: '三次无进展后降低投入。', example: '三次互动后她没有新增信息，我先收回来。' },
      ],
      chatCases: [
        {
          title: '她只回表情',
          context: '你发了一段话，她只回表情',
          messages: [
            { sender: 'me', text: '这周看了个挺有意思的纪录片，讲咖啡文化的。', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '👍', score: '', note: '', isWrong: false },
            { sender: 'me', text: '感觉你最近挺忙的，先忙你的。有空了我们线下聊聊，比打字轻松。', score: '+8', note: '不追问+转邀约', isWrong: false },
            { sender: 'me', text: '你就回个表情？是不是不想聊？', score: '-12', note: '施压追问', isWrong: true },
          ]
        },
        {
          title: '邀约时她犹豫',
          context: '你约她，她说再看看',
          messages: [
            { sender: 'me', text: '周六有个小展，一起去吗？', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '我看看……', score: '', note: '', isWrong: false },
            { sender: 'me', text: '没关系，你先考虑。周六中午前给我答复就行，不方便就改天。', score: '+8', note: '给空间+设期限', isWrong: false },
            { sender: 'me', text: '你到底来不来？', score: '-10', note: '逼迫确认', isWrong: true },
          ]
        },
      ],
      boundaries: ['礼貌回应不是关系承诺；长期单向投入要及时止损。'], fitFor: ['能观察投入', '不急着索取', '愿意验证现实适配'], notFitFor: ['需要高主动', '容易自我欺骗', '害怕退出'], training: ['三次互动后记录：她是否新增信息、提问或接受邀约。'], reviewChecklist: ['是礼貌还是投入？', '我是否长期单方带动？'], related: [article('ch4'), article('ch7')]
    }),
    normalize({
      id: 'direct-expressive', name: '主动直球型', icon: '🚀', subtitle: '她表达直接，不代表你可以省略尊重和节奏。', tags: ['主动', '直球', '清晰'], difficulty: '中', pace: '自然推进', riskLevel: '低风险', bestStage: '初识期', summary: '直球会让关系更清楚，但你仍要判断稳定性、边界和长期适配。', watchFirst: '看主动是否持续、是否尊重你的节奏。', confusedWith: ['社交外放型', '浪漫体验型'], core: ['好感表达较直接', '讨厌拖泥带水', '愿意共同推进关系', '也可能热得快冷得快'], signals: ['主动邀约或表达欣赏', '会直接问你的想法', '不喜欢过度猜测', '对坦诚回应很加分'], greenFlags: ['主动且稳定', '尊重你边界', '愿意共同计划'], yellowFlags: ['热度起伏大', '进展过快', '想迅速确认关系'], redFlags: ['不尊重拒绝', '用强烈表达压迫你', '短期强热后消失'], stageSignals: [{ stage: '初识', text: '会更快表达兴趣。' }, { stage: '推进', text: '看是否能稳住节奏。' }], misreads: ['以为她主动就可以随便推进亲密', '被强烈表达冲昏头', '为了显得酷而故意冷淡'], betterMoves: ['真诚回应，不玩欲擒故纵', '确认双方节奏', '保持边界和判断', '让行动跟上表达'], mistakes: ['端着不回应', '过快越界', '把主动当低价值'], doDont: { dont: ['故意冷她', '默认亲密', '被热度绑架'], do: ['坦诚回应', '同步节奏', '看稳定性'] }, scripts: ['我喜欢你的直接，我对你也有好感。我们可以继续了解，但节奏上我希望自然一点。'], scriptsByStage: [{ stage: '回应主动', text: '谢谢你直接说，我也愿意认真回应，而不是吊着你。' }], scenarios: [{ title: '她很快表达喜欢', wrong: '立刻失去边界。', better: '回应好感，同时保持现实观察。' }],       strategies: [
        { title: '坦诚回应', desc: '不玩欲擒故纵，真诚回应她的主动。', example: '我喜欢你直接说，我也愿意认真回应。' },
        { title: '同步节奏', desc: '确认双方节奏，不被推着走。', example: '我对你也有好感，但节奏上我希望自然一点。' },
        { title: '保持边界', desc: '她主动不代表可以省略尊重。', example: '我喜欢你主动，但我也希望我们都舒服。' },
        { title: '看稳定性', desc: '观察她的主动是否持续。', example: '我不只看你现在多热情，我看一个月后你是否还这样。' },
        { title: '行动跟上', desc: '让行动跟上表达，不只用嘴说。', example: '你说喜欢我，我也用行动让你感受到我的认真。' },
      ],
      chatCases: [
        {
          title: '她直接表白',
          context: '她明确表达喜欢你',
          messages: [
            { sender: 'girl', text: '我喜欢你', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我也喜欢你。但我们不用急，慢慢了解，让行动跟上感觉。', score: '+10', note: '回应+稳节奏', isWrong: false },
            { sender: 'me', text: '（故意冷淡）哦，知道了。', score: '-10', note: '欲擒故纵，伤害信任', isWrong: true },
          ]
        },
        {
          title: '她想加快节奏',
          context: '她想更快推进关系',
          messages: [
            { sender: 'girl', text: '我们什么时候确认关系？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我也在想这个问题。但我觉得再相处一个月，看看现实里是否合拍，再决定更稳。', score: '+10', note: '认可+设观察期', isWrong: false },
            { sender: 'me', text: '好啊，那就在一起吧。', score: '-5', note: '太草率，可能后悔', isWrong: true },
          ]
        },
      ],
      boundaries: ['主动不等于可以被轻视；你也不必因为她主动就被推着走。'], fitFor: ['表达清楚', '不玩套路', '能稳住节奏'], notFitFor: ['喜欢追逐感', '用冷淡建立优越', '容易被热度冲昏'], training: ['练习直接但不压迫的回应。'], reviewChecklist: ['她是否持续稳定？', '我是否尊重她主动表达？'], related: [article('ch11'), article('ch7')]
    }),
    normalize({
      id: 'pragmatic-realistic', name: '现实务实型', icon: '📌', subtitle: '她看重生活能否落地，不吃空泛承诺。', tags: ['现实', '务实', '稳定'], difficulty: '中', pace: '稳推进', riskLevel: '低风险', bestStage: '关系期', summary: '她不是不浪漫，而是需要看到关系能在真实生活中运行。', watchFirst: '看她现实问题背后是共同建设，还是单向索取。', confusedWith: ['相亲评估型', '事业独立型'], core: ['重视经济观、生活习惯和责任感', '讨厌画饼和空话', '会观察你处理问题的能力', '喜欢可持续的踏实感'], signals: ['会聊消费观和生活安排', '对你的责任感有关注', '不喜欢夸张承诺', '认可踏实行动'], greenFlags: ['愿意共同分担', '标准清楚但不贬低', '能一起解决问题'], yellowFlags: ['现实问题问得早', '对条件比较敏感', '不太会表达浪漫'], redFlags: ['只谈条件不谈人', '把你当资源', '用现实羞辱你'], stageSignals: [{ stage: '了解', text: '会观察基本生活能力。' }, { stage: '关系', text: '更关注共同运行成本。' }], misreads: ['把务实都理解成物质', '用空话承诺未来', '回避现实问题'], betterMoves: ['坦诚说明现状和计划', '展示解决问题能力', '不夸大不自卑', '也确认她是否愿意共同建设'], mistakes: ['以后我肯定会很好这种画饼', '一谈钱就破防', '用浪漫逃避责任'], doDont: { dont: ['画饼', '自卑攻击', '逃避现实'], do: ['谈计划', '做实事', '双向建设'] }, scripts: ['我现在的情况是这样，短板我知道，也在这样改善。长期我更看重一起把生活过稳。'], scriptsByStage: [{ stage: '现实讨论', text: '我们可以把期待说清楚，看看是不是能共同承担，而不是只让一方负责。' }], scenarios: [{ title: '她问收入规划', wrong: '觉得她拜金。', better: '说明现状、计划和边界。' }],       strategies: [
        { title: '谈计划', desc: '坦诚说明现状和具体计划。', example: '我现在收入是……三年内目标是……' },
        { title: '做实事', desc: '展示解决问题能力，不画饼。', example: '这个问题我这样处理，你看是否可行？' },
        { title: '双向建设', desc: '确认她是否愿意共同承担。', example: '我们可以把期待说清楚，看看能不能共同承担。' },
        { title: '不自卑', desc: '不夸大也不自卑，真实表达。', example: '我条件一般，但我有规划，也在行动。' },
        { title: '不画饼', desc: '不用空话承诺未来。', example: '我不说以后一定怎样，但我可以告诉你我现在在做什么。' },
      ],
      chatCases: [
        {
          title: '她问收入',
          context: '她直接问你的收入情况',
          messages: [
            { sender: 'girl', text: '你收入多少？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '目前到手一万二，三年内目标是两万。消费观是……你觉得呢？', score: '+10', note: '坦诚+反问她的标准', isWrong: false },
            { sender: 'me', text: '你问这个干嘛，是不是太现实了？', score: '-12', note: '防御攻击', isWrong: true },
          ]
        },
        {
          title: '她谈未来安排',
          context: '她想知道你的长期生活计划',
          messages: [
            { sender: 'girl', text: '你打算什么时候买房？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '目前在攒首付，预计三年后。你的计划呢？我想看看我们是否能对齐。', score: '+10', note: '具体计划+双向对齐', isWrong: false },
            { sender: 'me', text: '以后肯定会有的，别担心。', score: '-10', note: '空话画饼', isWrong: true },
          ]
        },
      ],
      boundaries: ['务实不是交易。只看资源、不尊重人，就不是健康适配。'], fitFor: ['责任感强', '能落地行动', '不逃避现实'], notFitFor: ['只会画饼', '害怕谈钱', '生活混乱'], training: ['整理自己的消费观、储蓄计划和生活责任。'], reviewChecklist: ['她是否也愿意承担？', '我是否用行动代替空话？'], related: [article('ch18'), article('ch13')]
    }),
    normalize({
      id: 'artistic-feeling', name: '文艺感受型', icon: '🎧', subtitle: '她更在意精神共鸣、审美和细腻表达。', tags: ['文艺', '感受', '共鸣'], difficulty: '中', pace: '自然推进', riskLevel: '低风险', bestStage: '约会期', summary: '不要假装高级；真实的感受、具体的观察和共同体验更重要。', watchFirst: '看共鸣是否能落到现实相处，而不是只停在氛围。', confusedWith: ['浪漫体验型', '情绪敏感型'], core: ['喜欢审美、表达和精神交流', '对粗糙、功利、油腻表达敏感', '容易被细腻观察打动', '需要现实稳定托住感受'], signals: ['分享音乐、电影、书和展览', '喜欢谈感受而不只是事实', '对具体赞美反应好', '讨厌装懂和摆谱'], greenFlags: ['愿意分享私人审美', '能欣赏你的真实感受', '共同体验后更靠近'], yellowFlags: ['沉迷氛围不落地', '现实安排能力弱', '容易理想化'], redFlags: ['用文艺包装不负责', '贬低你的审美', '只要情绪不要承诺'], stageSignals: [{ stage: '聊天', text: '共鸣和表达质量重要。' }, { stage: '约会', text: '适合展览、散步、音乐等体验。' }], misreads: ['硬装懂她的爱好', '用土味套路破坏氛围', '以为精神共鸣可以代替现实行动'], betterMoves: ['真诚分享你的感受', '赞美具体细节', '一起做有审美的轻体验', '用行动保持稳定'], mistakes: ['假装读过看过', '评价她太矫情', '只会问“在干嘛”'], doDont: { dont: ['装懂', '油腻夸赞', '功利推进'], do: ['具体表达', '共同体验', '现实稳定'] }, scripts: ['你刚才说那段我挺有画面感的，我理解的是……不知道对不对。'], scriptsByStage: [{ stage: '邀约', text: '这个小展可能不大，但氛围应该不错。我们可以看完散步聊聊。' }], scenarios: [{ title: '她分享小众作品', wrong: '硬装专家。', better: '说真实感受并请她分享喜欢的点。' }],       strategies: [
        { title: '具体表达', desc: '真诚分享感受，不装懂。', example: '这段我挺有画面感的，我理解的是……不知道对不对。' },
        { title: '共同体验', desc: '一起做有审美的轻体验。', example: '这个小展氛围不错，看完我们可以散步聊聊。' },
        { title: '赞美细节', desc: '赞美具体细节，不泛泛夸。', example: '你选的这首歌，前奏那段钢琴挺抓人的。' },
        { title: '现实稳定', desc: '用行动保持稳定，不只谈感受。', example: '我喜欢和你聊这些，但我也希望我们的关系能落地。' },
        { title: '不装懂', desc: '不懂就诚实说，不硬撑。', example: '这个我不太了解，你能给我讲讲你喜欢它的点吗？' },
      ],
      chatCases: [
        {
          title: '她分享小众音乐',
          context: '她发了一首你不熟悉的歌',
          messages: [
            { sender: 'girl', text: '这首歌最近单曲循环', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我去听了，前奏那段钢琴挺特别的。你喜欢它哪一点？', score: '+10', note: '真实感受+请她分享', isWrong: false },
            { sender: 'me', text: '哦，挺好听的。', score: '-5', note: '敷衍，没共鸣', isWrong: true },
          ]
        },
        {
          title: '她想去展览',
          context: '她提到想看某个展览',
          messages: [
            { sender: 'girl', text: '这个展好像不错', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我查了下，周日下午人少一点。看完我们可以找个地方聊聊感受。', score: '+10', note: '主动安排+延续话题', isWrong: false },
            { sender: 'me', text: '那你去吧。', score: '-8', note: '没参与感', isWrong: true },
          ]
        },
      ],
      boundaries: ['共鸣不等于关系承诺；精神亲近也需要现实尊重和清晰边界。'], fitFor: ['表达细腻', '有真实爱好', '能把感受落地'], notFitFor: ['只讲功利', '粗暴否定感受', '装腔作势'], training: ['练习用三句话描述一个真实感受，而不是评价高低。'], reviewChecklist: ['我真实吗？', '共鸣是否落到行动？'], related: [article('ch11'), article('ch6')]
    }),
    normalize({
      id: 'mature-stable', name: '成熟稳定型', icon: '🌳', subtitle: '她更看重稳定人格、责任和长期相处质量。', tags: ['成熟', '稳定', '长期'], difficulty: '中', pace: '稳推进', riskLevel: '低风险', bestStage: '关系期', summary: '少一点戏剧化，多一点可靠、尊重和共同解决问题。', watchFirst: '看她是否用成熟方式沟通，而不是只是要求你成熟。', confusedWith: ['理性边界型', '现实务实型'], core: ['不喜欢幼稚拉扯', '看重情绪稳定和责任感', '愿意沟通解决问题', '对长期质量要求高'], signals: ['冲突时愿意讲清楚', '不轻易被套路打动', '看重你处理问题的方式', '尊重双方生活'], greenFlags: ['沟通清楚', '情绪稳定', '愿意共同承担'], yellowFlags: ['容错率不高', '对幼稚行为很快失望', '不太吃激情表达'], redFlags: ['把成熟当压制你', '只要求你负责', '拒绝情感表达'], stageSignals: [{ stage: '了解', text: '看人格稳定性。' }, { stage: '冲突', text: '看解决问题能力。' }], misreads: ['觉得她没激情', '用幼稚吃醋测试', '把成熟当成不需要关心'], betterMoves: ['稳定表达关心', '遇事一起解决', '不玩消失和试探', '尊重她也照顾自己'], mistakes: ['用冷战证明重要', '犯错后只道歉不改', '把她当情绪保姆'], doDont: { dont: ['冷战测试', '逃避责任', '幼稚拉扯'], do: ['稳定沟通', '承担行动', '长期建设'] }, scripts: ['这件事我有做得不好的地方，我会这样改；也想听听你希望我们怎么处理更好。'], scriptsByStage: [{ stage: '修复', text: '我不想争输赢，想把问题解决。我们各退一步看看可行方案。' }], scenarios: [{ title: '她指出你不成熟', wrong: '反击她像老师。', better: '听具体问题，判断是否可调整。' }],       strategies: [
        { title: '稳定沟通', desc: '遇事不逃，稳定表达。', example: '这件事我想和你认真聊聊，不是争输赢。' },
        { title: '承担行动', desc: '犯错后不只道歉，给改进方案。', example: '我的问题是……我会这样改……你觉得呢？' },
        { title: '长期建设', desc: '展示长期主义，不追求刺激。', example: '我更看重我们能一起把日子过稳。' },
        { title: '不冷战', desc: '不用冷战测试对方。', example: '我不玩消失，有问题我们直接说。' },
        { title: '共同解决', desc: '遇事一起想办法，不互相指责。', example: '这个问题我们一起看看怎么解决，不是谁对谁错。' },
      ],
      chatCases: [
        {
          title: '她指出你的问题',
          context: '她成熟地表达不满',
          messages: [
            { sender: 'girl', text: '你上次答应的事没做到，我需要你更靠谱。', score: '', note: '', isWrong: false },
            { sender: 'me', text: '你说得对。我的问题是……我会这样改：设提醒+提前确认。你觉得这样可以吗？', score: '+10', note: '承认+具体改进', isWrong: false },
            { sender: 'me', text: '你怎么像我妈一样。', score: '-12', note: '贬低她的成熟', isWrong: true },
          ]
        },
        {
          title: '冲突时她想解决',
          context: '她希望一起解决问题',
          messages: [
            { sender: 'girl', text: '我们聊聊上次的事吧', score: '', note: '', isWrong: false },
            { sender: 'me', text: '好。我不想争输赢，我想知道你的感受，然后我们看看怎么避免下次。', score: '+10', note: '合作态度', isWrong: false },
            { sender: 'me', text: '又提这事，有完没完。', score: '-15', note: '逃避+攻击', isWrong: true },
          ]
        },
      ],
      boundaries: ['成熟不是单方面忍耐；如果只有你承担，也要重新判断。'], fitFor: ['愿意成长', '能沟通负责', '长期主义'], notFitFor: ['沉迷刺激', '习惯冷战', '逃避责任'], training: ['每次冲突写下：事实、感受、责任、下一步。'], reviewChecklist: ['我有没有行动修复？', '她是否也愿意承担？'], related: [article('ch13'), article('ch20')]
    }),
    normalize({
      id: 'high-sensitive-boundary', name: '高敏边界型', icon: '🛡️', subtitle: '她对压力、冒犯和越界反应很快，需要更清晰的安全边界。', tags: ['高敏', '边界', '安全'], difficulty: '高', pace: '慢节奏', riskLevel: '高风险', bestStage: '初识期', summary: '尊重边界不是慢一点套路，而是你真的愿意不越界、不施压、不惩罚拒绝。', watchFirst: '看她表达边界后，你们是否还能舒服互动。', confusedWith: ['慢热观察型', '情绪敏感型'], core: ['对压力和冒犯高度敏感', '需要明确可拒绝空间', '不喜欢突然亲密或强开玩笑', '边界被尊重后会更放松'], signals: ['会提前说明不喜欢什么', '对冒犯玩笑反应明显', '需要较多确认安全感', '愿意在安全氛围里交流'], greenFlags: ['能清楚表达边界', '被尊重后更信任', '也尊重你的边界'], yellowFlags: ['很容易退缩', '对小压力敏感', '试探安全性'], redFlags: ['把边界变成单向控制', '任何沟通都被视为冒犯', '拒绝承担自己的表达责任'], stageSignals: [{ stage: '初识', text: '避免过度玩笑和身体推进。' }, { stage: '约会', text: '确认她舒服，给退路。' }], misreads: ['把谨慎当矫情', '用玩笑测试底线', '被拒绝后阴阳怪气'], betterMoves: ['提前说明选择权', '避免身体和隐私越界', '用温和清楚的表达', '被提醒后立刻调整'], mistakes: ['我开玩笑而已你别认真', '继续追问隐私', '用不高兴惩罚拒绝'], doDont: { dont: ['冒犯测试', '身体越界', '惩罚拒绝'], do: ['给退路', '尊重提醒', '低压力推进'] }, scripts: ['如果这个问题让你不舒服，我们可以不聊。你觉得自在最重要。'], scriptsByStage: [{ stage: '约会', text: '这家店如果你觉得不舒服，我们随时换地方，不用硬撑。' }], scenarios: [{ title: '她说不喜欢这个玩笑', wrong: '说她开不起玩笑。', better: '道歉并调整边界。' }],       strategies: [
        { title: '给退路', desc: '每句话都给拒绝空间。', example: '如果你不舒服，我们随时换地方，不用硬撑。' },
        { title: '尊重提醒', desc: '被提醒后立刻调整，不辩解。', example: '抱歉，我没意识到。我调整，你随时提醒我。' },
        { title: '低压力推进', desc: '避免身体越界和隐私追问。', example: '这个问题如果你不想聊，我们就不聊。' },
        { title: '温和表达', desc: '语气平和，不强势。', example: '我的想法是……但你觉得怎么舒服怎么来。' },
        { title: '提前说明', desc: '提前告知安排，不突然袭击。', example: '下周六我想约你，提前跟你说，你可以慢慢考虑。' },
      ],
      chatCases: [
        {
          title: '她说不舒服',
          context: '她表达某个话题让她不适',
          messages: [
            { sender: 'girl', text: '这个话题我不太舒服', score: '', note: '', isWrong: false },
            { sender: 'me', text: '抱歉，我没意识到。我们不聊这个。你觉得怎么自在怎么来。', score: '+10', note: '道歉+尊重+给空间', isWrong: false },
            { sender: 'me', text: '这有什么不舒服的，你太敏感了。', score: '-15', note: '否定她的边界', isWrong: true },
          ]
        },
        {
          title: '约会她想换地方',
          context: '她对约会地点感到不安',
          messages: [
            { sender: 'girl', text: '这家店有点吵，我不太习惯', score: '', note: '', isWrong: false },
            { sender: 'me', text: '那我们换一家，你选。不用勉强，舒服最重要。', score: '+10', note: '立刻调整+给她选择权', isWrong: false },
            { sender: 'me', text: '来都来了，将就一下吧。', score: '-10', note: '忽视她的感受', isWrong: true },
          ]
        },
      ],
      boundaries: ['她的边界必须尊重，你的边界也同样重要；单向审判不是健康互动。'], fitFor: ['细心尊重', '低压力推进', '能接受慢节奏'], notFitFor: ['喜欢测试底线', '自尊脆弱', '急于亲密'], training: ['每次互动前问自己：这句话是否给了对方拒绝空间？'], reviewChecklist: ['我是否让她有退路？', '她是否也尊重我？'], related: [article('ch19'), article('ch6')]
    }),
    normalize({
      id: 'people-pleasing', name: '讨好压抑型', icon: '🕊️', subtitle: '她可能习惯说“都可以”，但内心未必真的舒服。', tags: ['讨好', '压抑', '安全感'], difficulty: '高', pace: '慢节奏', riskLevel: '高风险', bestStage: '关系期', summary: '不要利用她的不好意思拒绝；你要帮助建立真实表达，而不是占便宜。', watchFirst: '看她是否能逐步表达真实偏好和不满。', confusedWith: ['被动回应型', '安全感需求型'], core: ['不太会拒绝', '容易照顾别人感受而压抑自己', '冲突中可能先忍后爆', '需要被鼓励真实表达'], signals: ['经常说“都行”', '明明不舒服还配合', '不满积累后突然冷淡', '被认真询问偏好会放松'], greenFlags: ['愿意慢慢说真实想法', '被尊重后更主动', '能学习表达边界'], yellowFlags: ['总迎合你', '不表达不满', '事后情绪低落'], redFlags: ['长期压抑后报复性爆发', '用牺牲换控制', '拒绝任何真实沟通'], stageSignals: [{ stage: '约会', text: '不要把“都行”当真同意。' }, { stage: '关系', text: '鼓励她说不舒服的地方。' }], misreads: ['把她的配合理解成你魅力很强', '默认她没有需求', '等她爆发才说她变了'], betterMoves: ['给具体选项并允许拒绝', '主动询问真实偏好', '感谢她表达不同意见', '不要用亏欠感推进亲密'], mistakes: ['你都答应了怎么又不开心', '用她不好拒绝来占便宜', '把她的沉默当同意'], doDont: { dont: ['利用不好意思', '默认同意', '制造亏欠'], do: ['鼓励表达', '给选项', '尊重拒绝'] }, scripts: ['你不用为了照顾我说都行。你真实想法对我很重要，哪怕和我不一样也没关系。'], scriptsByStage: [{ stage: '确认偏好', text: '两个选择你更想要哪个？也可以都不选，我们换别的。' }], scenarios: [{ title: '她总说随便', wrong: '完全按自己来。', better: '给选项并确认她真实感受。' }],       strategies: [
        { title: '给选项', desc: '给具体选项并允许拒绝。', example: '两个选择你更想要哪个？也可以都不选，我们换别的。' },
        { title: '鼓励表达', desc: '主动询问真实偏好。', example: '你真实想法对我很重要，哪怕和我不一样也没关系。' },
        { title: '尊重拒绝', desc: '她说不的时候真心接纳。', example: '你说不，我尊重。不用为了照顾我说都行。' },
        { title: '不利用弱点', desc: '不利用她不好意思占便宜。', example: '我知道你不好拒绝，但我希望你是真的想做。' },
        { title: '确认偏好', desc: '约会中多次确认她真实感受。', example: '这个安排你真的觉得舒服吗？不舒服我们可以改。' },
      ],
      chatCases: [
        {
          title: '她总说随便',
          context: '问她想吃什么，她说随便',
          messages: [
            { sender: 'me', text: '今晚想吃什么？', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '随便，你定吧', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我选了两个：日料或火锅。你更想哪个？也可以都不选，我们换别的。', score: '+10', note: '给选项+允许拒绝', isWrong: false },
            { sender: 'me', text: '那就日料吧。', score: '-5', note: '直接决定，没确认她真实想法', isWrong: true },
          ]
        },
        {
          title: '她勉强答应',
          context: '她答应了但语气犹豫',
          messages: [
            { sender: 'me', text: '周末去看电影？', score: '', note: '', isWrong: false },
            { sender: 'girl', text: '……好吧', score: '', note: '', isWrong: false },
            { sender: 'me', text: '你听起来不太想。如果你不想，我们改天，不用勉强。', score: '+10', note: '察觉+给退路', isWrong: false },
            { sender: 'me', text: '那就说定了，周六见。', score: '-8', note: '忽视她的勉强', isWrong: true },
          ]
        },
      ],
      boundaries: ['不好意思拒绝不是同意。任何亲密推进都需要清晰、自由的同意。'], fitFor: ['尊重细腻', '不利用弱点', '能鼓励真实表达'], notFitFor: ['喜欢主导控制', '把顺从当喜欢', '缺少同意意识'], training: ['约会中至少两次邀请她表达真实偏好。'], reviewChecklist: ['她是否真的舒服？', '我有没有利用她不好拒绝？'], related: [article('ch19'), article('ch13')]
    }),
    normalize({
      id: 'friendship-first', name: '朋友慢转型', icon: '🤝', subtitle: '她更容易从信任和熟悉里长出好感。', tags: ['朋友', '慢热', '长期'], difficulty: '中', pace: '慢节奏', riskLevel: '中风险', bestStage: '初识期', summary: '朋友起步可以降低压力，但不能用“朋友”伪装长期追求或道德绑架。', watchFirst: '看互动是否从普通朋友逐步增加独特性和单独投入。', confusedWith: ['慢热观察型', '被动回应型'], core: ['需要先建立信任', '对突然表白敏感', '日常陪伴容易加分', '但也容易停在朋友区'], signals: ['愿意分享生活细节', '接受单独相处但节奏慢', '会在熟悉后开更多玩笑', '对稳定陪伴有好感'], greenFlags: ['单独互动增加', '分享更私人的信息', '愿意接受轻微暧昧'], yellowFlags: ['只把你当安全朋友', '回避所有暧昧', '只在需要帮助时找你'], redFlags: ['明确说没有可能', '用朋友身份索取', '你表达后她继续吊着'], stageSignals: [{ stage: '朋友', text: '先看信任和舒适度。' }, { stage: '转向', text: '需要轻微、可退的暧昧试探。' }], misreads: ['长期做好朋友就一定能转正', '突然重磅表白', '用付出换她内疚'], betterMoves: ['逐渐增加单独相处', '适度表达欣赏和好感', '不要隐藏意图太久', '被拒绝后尊重关系边界'], mistakes: ['以朋友名义无限付出', '表白失败后指责她利用你', '她一示好就过度推进'], doDont: { dont: ['伪装朋友', '道德绑架', '突然轰炸表白'], do: ['逐步表达', '看独特性', '尊重拒绝'] }, scripts: ['和你相处我越来越觉得不只是普通朋友的感觉。但我不想给你压力，也尊重你的节奏。'], scriptsByStage: [{ stage: '试探', text: '我们单独相处挺舒服的，我也会有一点超过朋友的好感。' }], scenarios: [{ title: '她把你当朋友倾诉', wrong: '以为机会来了加倍付出。', better: '保持边界，看是否有双向独特性。' }],       strategies: [
        { title: '逐步表达', desc: '逐渐增加单独相处和好感表达。', example: '和你相处挺舒服的，我也有超过朋友的好感。' },
        { title: '看独特性', desc: '观察是否有双向独特投入。', example: '我们之间的这些互动，是普通朋友不会有的。' },
        { title: '不隐藏太久', desc: '不要隐藏意图超过两个月。', example: '我不想一直以朋友名义相处，我想让你知道我的真实想法。' },
        { title: '尊重拒绝', desc: '表达后被拒，尊重边界。', example: '我理解你的想法，我们还是朋友，我尊重你的决定。' },
        { title: '不道德绑架', desc: '不用付出换内疚感。', example: '我对你好是因为我想，不是要你回报。' },
      ],
      chatCases: [
        {
          title: '她想保持朋友关系',
          context: '你表达好感后她说做朋友',
          messages: [
            { sender: 'girl', text: '我觉得我们还是做朋友比较好', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解。认识你这段时间挺开心的，我尊重你的决定。', score: '+10', note: '体面接受+尊重', isWrong: false },
            { sender: 'me', text: '我对你这么好，你怎么能这样？', score: '-15', note: '道德绑架', isWrong: true },
          ]
        },
        {
          title: '她把你当朋友倾诉',
          context: '她经常找你倾诉情感问题',
          messages: [
            { sender: 'girl', text: '我今天又遇到那个男生了……', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解你想分享。但我想让你知道，我对你不只是朋友的感觉。如果你没这个意思，我也可以调整。', score: '+8', note: '表达意图+给选择', isWrong: false },
            { sender: 'me', text: '（默默倾听， hoping she will notice）', score: '-5', note: '隐藏意图，浪费双方时间', isWrong: true },
          ]
        },
      ],
      boundaries: ['朋友身份不能用来绕过同意和拒绝；她不喜欢你不是欠你。'], fitFor: ['耐心真实', '能承受结果', '不道德绑架'], notFitFor: ['付出求回报', '害怕表达', '被拒绝就翻脸'], training: ['记录你们是否有“只属于你们”的互动，而不是普通朋友服务。'], reviewChecklist: ['她是否对我有独特投入？', '我是否诚实表达了意图？'], related: [article('ch7'), article('ch20')]
    }),
    normalize({
      id: 'blind-date-evaluator', name: '相亲评估型', icon: '📋', subtitle: '她进入关系更像做长期项目评估，节奏清楚但压力也更高。', tags: ['相亲', '评估', '现实'], difficulty: '高', pace: '稳推进', riskLevel: '中风险', bestStage: '了解期', summary: '相亲不是面试通关，也不是条件交换；要在现实清楚里保留人的温度。', watchFirst: '看她是否既谈条件，也愿意了解你这个人。', confusedWith: ['现实务实型', '高标准筛选型'], core: ['目标导向强', '关注婚恋基本盘', '不喜欢长期暧昧拖延', '需要效率也需要温度'], signals: ['会问家庭、工作、城市、婚育观', '希望尽快判断方向', '对拖延和模糊不耐烦', '认可真诚透明'], greenFlags: ['问题清楚但尊重', '愿意双向透明', '也关注相处感'], yellowFlags: ['问题像审问', '节奏压力大', '情感连接不足'], redFlags: ['只看条件清单', '隐瞒重要信息', '用淘汰感羞辱你'], stageSignals: [{ stage: '初见', text: '基本盘和相处感同时被评估。' }, { stage: '二三次见面', text: '会期待方向更清晰。' }], misreads: ['把所有现实问题当冒犯', '为了通过评估隐瞒信息', '只展示条件不展示人格'], betterMoves: ['坦诚基本情况', '表达自己的婚恋观', '保留轻松和幽默', '也提出你的关键问题'], mistakes: ['夸大收入和家庭情况', '逃避关键问题', '把她当HR防御'], doDont: { dont: ['隐瞒包装', '防御攻击', '只谈条件'], do: ['透明真诚', '双向提问', '保留温度'] }, scripts: ['这些现实问题我觉得可以聊清楚，也希望我们不只是对条件，还能看看相处舒服不舒服。'], scriptsByStage: [{ stage: '初见', text: '我的基本情况是……我也想知道你对长期关系最看重什么。' }], scenarios: [{ title: '她上来问婚育观', wrong: '嘲讽她太急。', better: '坦诚回答，同时把话题带回相处感。' }],       strategies: [
        { title: '透明真诚', desc: '坦诚基本情况，不隐瞒。', example: '我的基本情况是……也想听听你最看重什么。' },
        { title: '双向提问', desc: '也提出你的关键问题。', example: '你问了我很多，我也想了解你对家庭的看法。' },
        { title: '保留温度', desc: '在现实清楚里保留人的温度。', example: '这些可以聊清楚，但也希望我们能看看相处舒服不舒服。' },
        { title: '不防御', desc: '被问到现实问题不攻击。', example: '这个问题我可以回答，也想听听你的想法。' },
        { title: '展示人格', desc: '不只展示条件，展示人格。', example: '除了工作，我周末喜欢做这些……' },
      ],
      chatCases: [
        {
          title: '她问婚育观',
          context: '第一次见面她就问婚育',
          messages: [
            { sender: 'girl', text: '你对结婚怎么看？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我想先认真相处，节奏到了自然结。我也想知道你对长期关系最看重什么。', score: '+10', note: '回应+双向提问', isWrong: false },
            { sender: 'me', text: '第一次见面就问这个，是不是太急了？', score: '-10', note: '防御攻击', isWrong: true },
          ]
        },
        {
          title: '她问家庭情况',
          context: '她了解你的家庭背景',
          messages: [
            { sender: 'girl', text: '你父母是做什么的？', score: '', note: '', isWrong: false },
            { sender: 'me', text: '普通工薪阶层，家庭关系简单。你的家庭氛围怎么样？', score: '+8', note: '坦诚+反问', isWrong: false },
            { sender: 'me', text: '问这个干嘛，查户口吗？', score: '-10', note: '防御攻击', isWrong: true },
          ]
        },
      ],
      boundaries: ['相亲也需要尊重和同意；效率不代表可以审问、隐瞒或交易化。'], fitFor: ['目标清楚', '现实透明', '能谈长期议题'], notFitFor: ['害怕承诺', '信息不透明', '只想暧昧'], training: ['提前准备三类信息：基本盘、价值观、边界。'], reviewChecklist: ['她是否尊重我？', '我们是否有相处温度？'], related: [article('ch13'), article('ch18')]
    }),
    normalize({
      id: 'playful-teasing', name: '轻松玩笑型', icon: '😄', subtitle: '她喜欢轻松互动，但玩笑必须有分寸。', tags: ['玩笑', '轻松', '社交'], difficulty: '中', pace: '自然推进', riskLevel: '中风险', bestStage: '暧昧期', summary: '幽默能拉近距离，冒犯会迅速扣分；关键是能不能让彼此都舒服。', watchFirst: '看她是否在玩笑后仍愿意认真交流，而不是只停在打闹。', confusedWith: ['社交外放型', '主动直球型'], core: ['喜欢轻松、有来有回的互动', '对沉重、说教和过度正经敏感', '会用玩笑试探默契', '认真议题仍需要被认真对待'], signals: ['会接梗和制造轻松氛围', '愿意用玩笑表达亲近', '对自嘲和分寸感有好感', '不喜欢被低俗冒犯'], greenFlags: ['玩笑后能认真沟通', '愿意单独相处', '尊重你的边界'], yellowFlags: ['总用玩笑回避问题', '关系长期不落地', '容易让你误判暧昧'], redFlags: ['拿羞辱当幽默', '用玩笑掩盖越界', '拒绝认真沟通'], stageSignals: [{ stage: '聊天', text: '幽默和接梗能加分。' }, { stage: '暧昧', text: '需要把玩笑转为清晰行动。' }], misreads: ['把玩笑都当暗示', '用低俗梗测试亲密', '为了搞笑贬低她或自己'], betterMoves: ['保持轻松但不冒犯', '适时转入真实表达', '观察是否有现实投入', '被提醒后立刻调整玩笑尺度'], mistakes: ['开黄腔试探', '她不舒服还说开不起玩笑', '一直嬉皮笑脸逃避认真话题'], doDont: { dont: ['低俗冒犯', '羞辱玩笑', '永远打哈哈'], do: ['接梗有度', '认真时认真', '看现实投入'] }, scripts: ['和你开玩笑很轻松，但如果我哪句让你不舒服，你可以直接提醒我。', '玩笑归玩笑，我认真说一句：我确实挺想继续了解你。'], scriptsByStage: [{ stage: '转认真', text: '刚才是玩笑，但我对这件事的真实想法是……' }], scenarios: [{ title: '她常拿你开玩笑', wrong: '过度解读为喜欢。', better: '轻松接住，同时看她是否有具体投入。' }],       strategies: [
        { title: '接梗有度', desc: '轻松但不冒犯，有分寸。', example: '你这个梗我接了，但如果我哪句让你不舒服，告诉我。' },
        { title: '认真时认真', desc: '适时转入真实表达。', example: '玩笑归玩笑，我认真说一句：我确实挺想继续了解你。' },
        { title: '看投入', desc: '观察是否有现实投入。', example: '玩笑聊得开心，改天我们单独见面聊聊？' },
        { title: '调整尺度', desc: '被提醒后立刻调整玩笑。', example: '抱歉，我玩笑过头了。我注意，你随时提醒我。' },
        { title: '不低俗', desc: '不开黄腔，不羞辱式幽默。', example: '幽默可以，但我不拿你开玩笑，也不开黄腔。' },
      ],
      chatCases: [
        {
          title: '她拿你开玩笑',
          context: '她经常调侃你',
          messages: [
            { sender: 'girl', text: '你今天穿得像个程序员', score: '', note: '', isWrong: false },
            { sender: 'me', text: '哈哈被你发现了。不过如果你哪句让我不舒服，我也会直接说。', score: '+8', note: '接住+设边界', isWrong: false },
            { sender: 'me', text: '你怎么老损我？', score: '-8', note: '玻璃心，破坏轻松氛围', isWrong: true },
          ]
        },
        {
          title: '她想认真聊聊',
          context: '玩笑后她想转入认真话题',
          messages: [
            { sender: 'girl', text: '玩笑归玩笑，我想认真问你一件事', score: '', note: '', isWrong: false },
            { sender: 'me', text: '好，我认真听。刚才的玩笑我收住，你说。', score: '+10', note: '立刻转入认真', isWrong: false },
            { sender: 'me', text: '怎么突然严肃了，继续开玩笑呗。', score: '-10', note: '逃避认真话题', isWrong: true },
          ]
        },
      ],
      boundaries: ['幽默不能绕过尊重；任何让对方不舒服的玩笑都该停止。'], fitFor: ['有幽默感', '自尊稳定', '能把轻松转认真'], notFitFor: ['玻璃心', '喜欢低俗冒犯', '只会嬉皮笑脸'], training: ['记录三次玩笑互动后是否有更真实的信息交换。'], reviewChecklist: ['她是否舒服？', '玩笑是否推动了理解？'], related: [article('ch3'), article('ch11')]
    }),
    normalize({
      id: 'family-oriented', name: '家庭责任型', icon: '🏡', subtitle: '她重视家庭观、责任和关系能否进入现实生活。', tags: ['家庭', '责任', '长期'], difficulty: '中', pace: '稳推进', riskLevel: '低风险', bestStage: '关系期', summary: '她看重的不是空泛承诺，而是你能否尊重家庭边界并承担现实责任。', watchFirst: '看她谈家庭时是否有边界，而不是把家庭压力全部转嫁给你。', confusedWith: ['现实务实型', '相亲评估型'], core: ['重视家庭关系和长期稳定', '会关注责任感和生活能力', '希望关系能被现实环境承托', '不喜欢逃避承诺和玩票心态'], signals: ['会聊家庭观和未来安排', '在意你对长辈和责任的态度', '重视稳定见面和计划', '对轻浮暧昧耐心较低'], greenFlags: ['家庭观清楚但有边界', '愿意共同协调现实问题', '尊重双方原生家庭差异'], yellowFlags: ['很早引入家庭压力', '容易用家人意见替代自己判断', '对长期承诺焦虑'], redFlags: ['让你无条件承担她家庭问题', '完全没有个人边界', '用孝顺绑架关系'], stageSignals: [{ stage: '了解', text: '会观察责任感和家庭观。' }, { stage: '关系', text: '会讨论现实安排和长期稳定。' }], misreads: ['把家庭责任都当传统束缚', '用空话承诺未来', '忽视她对稳定的需求'], betterMoves: ['坦诚表达家庭观', '尊重但不盲从双方家庭', '把长期问题说具体', '用行动体现责任感'], mistakes: ['一谈家庭就逃', '为了讨好随口承诺', '贬低她的家庭重视'], doDont: { dont: ['空口承诺', '贬低家庭', '盲目背锅'], do: ['说清边界', '承担行动', '共同协调'] }, scripts: ['我尊重家庭的重要性，也希望我们先把自己的边界和想法说清楚，再一起面对现实问题。'], scriptsByStage: [{ stage: '长期讨论', text: '我对家庭和伴侣关系的理解是：尊重父母，但最终由我们共同做决定。' }], scenarios: [{ title: '她提到父母意见', wrong: '立刻反感或全盘迎合。', better: '了解她自己的想法和边界。' }],       strategies: [
        { title: '说清边界', desc: '坦诚表达家庭观和边界。', example: '我尊重家庭，但最终决定由我们共同做。' },
        { title: '承担行动', desc: '用行动体现责任感。', example: '这个我来安排，你不用担心。' },
        { title: '共同协调', desc: '一起面对家庭现实问题。', example: '这个问题我们一起想办法，不是谁单方面承担。' },
        { title: '不盲从', desc: '尊重但不盲从双方家庭。', example: '我理解你父母的想法，但我们的决定更重要。' },
        { title: '不逃避', desc: '不逃避长期和家庭议题。', example: '家庭和责任我们可以慢慢聊，我不逃避。' },
      ],
      chatCases: [
        {
          title: '她提到父母意见',
          context: '她说父母对她恋爱有看法',
          messages: [
            { sender: 'girl', text: '我爸妈觉得我应该早点定下来', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解他们的关心。但最重要的是你自己的想法，我们的节奏由我们决定。', score: '+10', note: '尊重+强调自主', isWrong: false },
            { sender: 'me', text: '你爸妈管得也太多了。', score: '-10', note: '贬低她的家庭', isWrong: true },
          ]
        },
        {
          title: '她谈家庭责任',
          context: '她说需要照顾家人',
          messages: [
            { sender: 'girl', text: '周末要陪我妈去医院', score: '', note: '', isWrong: false },
            { sender: 'me', text: '应该的。如果需要帮忙，我在。但也别把自己累坏了。', score: '+10', note: '支持+关心她', isWrong: false },
            { sender: 'me', text: '那你又没时间陪我了。', score: '-10', note: '自私，不顾她的责任', isWrong: true },
          ]
        },
      ],
      boundaries: ['家庭重要，但不能替代个人同意；长期关系应由两个人共同决定。'], fitFor: ['责任感强', '愿意谈长期', '尊重家庭但有边界'], notFitFor: ['只想短期暧昧', '逃避现实责任', '害怕长期议题'], training: ['写下你的家庭观、婚恋观和不可妥协边界。'], reviewChecklist: ['她有自己的判断吗？', '我是否真实表达责任和边界？'], related: [article('ch13'), article('ch18')]
    }),
    normalize({
      id: 'healing-recovery', name: '疗愈恢复型', icon: '🩹', subtitle: '她可能经历过受伤，需要安全和时间，而不是被你拯救。', tags: ['疗愈', '安全', '慢热'], difficulty: '高', pace: '慢节奏', riskLevel: '高风险', bestStage: '了解期', summary: '你可以温柔，但不要把自己放进拯救者位置；健康关系不是创伤修复项目。', watchFirst: '看她是否愿意为自己的恢复负责，而不是把你当唯一解药。', confusedWith: ['高敏边界型', '情绪敏感型'], core: ['对信任建立谨慎', '可能对某些情境高度敏感', '需要稳定和可拒绝空间', '也需要自己承担疗愈责任'], signals: ['会谨慎分享过去经历', '对压力和承诺反应敏感', '被尊重边界后逐渐放松', '愿意讨论怎样相处更安全'], greenFlags: ['能表达触发点', '愿意慢慢建立信任', '不把你当唯一支撑'], yellowFlags: ['经常因过去经验预判你', '需要较多安全确认', '关系推进很慢'], redFlags: ['把所有伤害投射给你', '拒绝任何自我修复', '用创伤要求你无限让步'], stageSignals: [{ stage: '初识', text: '需要低压力和清晰边界。' }, { stage: '深入', text: '看她是否愿意共同建立安全相处方式。' }], misreads: ['把她的受伤当作你表现英雄感的机会', '急着证明自己和别人不同', '用付出换她依赖'], betterMoves: ['尊重她的节奏和边界', '不追问细节，不扮演治疗师', '鼓励健康支持系统', '同时守住自己的承受范围'], mistakes: ['我来拯救你', '逼她讲过去', '用牺牲换信任'], doDont: { dont: ['拯救者心态', '追问创伤', '无限承受'], do: ['尊重节奏', '支持但不替代', '守住边界'] }, scripts: ['你不需要现在讲完，也不需要证明什么。我们按你舒服的节奏来。', '我愿意支持你，但我也希望我们都用健康的方式面对。'], scriptsByStage: [{ stage: '触发时', text: '我看到这件事让你不舒服。我们可以先暂停，等你准备好了再说。' }], scenarios: [{ title: '她突然退缩', wrong: '逼问是不是不信任你。', better: '给空间并说明你尊重她的节奏。' }],       strategies: [
        { title: '尊重节奏', desc: '不逼她讲过去，不追问。', example: '你不需要现在讲完，按你舒服的节奏来。' },
        { title: '支持不替代', desc: '支持但不扮演治疗师。', example: '我愿意支持你，但专业的事交给专业的人。' },
        { title: '守住边界', desc: '温柔不是无限承受。', example: '我理解你的感受，但我也需要被尊重。' },
        { title: '不给压力', desc: '不急着要她信任你。', example: '你不用证明什么，我按你的节奏来。' },
        { title: '鼓励系统', desc: '鼓励她建立健康支持系统。', example: '除了我，你也可以和信任的朋友聊聊。' },
      ],
      chatCases: [
        {
          title: '她提到过去受伤',
          context: '她谨慎地分享过去的经历',
          messages: [
            { sender: 'girl', text: '我之前那段关系……不太愉快', score: '', note: '', isWrong: false },
            { sender: 'me', text: '谢谢你愿意告诉我。你不需要现在讲完，按你舒服的节奏来。', score: '+10', note: '感谢+尊重节奏', isWrong: false },
            { sender: 'me', text: '他做了什么？详细说说。', score: '-12', note: '追问细节，像审问', isWrong: true },
          ]
        },
        {
          title: '她突然退缩',
          context: '关系推进时她突然冷淡',
          messages: [
            { sender: 'girl', text: '（突然不回消息，持续三天）', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我注意到你最近有点退缩。我理解你可能需要空间，我尊重你的节奏。', score: '+10', note: '察觉+给空间', isWrong: false },
            { sender: 'me', text: '你怎么又不理我了？是不是不信任我？', score: '-12', note: '逼迫+质疑', isWrong: true },
          ]
        },
      ],
      boundaries: ['温柔不是治疗义务；如果关系让你长期失衡，也需要退出。'], fitFor: ['温和稳定', '边界清楚', '不沉迷拯救感'], notFitFor: ['需要快速确认', '喜欢追问隐私', '容易自我牺牲'], training: ['练习支持性表达：我在、我尊重、你可以选择。'], reviewChecklist: ['我是否想拯救她？', '她是否也在为自己负责？'], related: [article('ch19'), article('ch20')]
    }),
    normalize({
      id: 'exploratory-uncertain', name: '探索不确定型', icon: '🧩', subtitle: '她还在确认自己想要什么，不确定本身就是重要信息。', tags: ['探索', '不确定', '观察'], difficulty: '高', pace: '慢节奏', riskLevel: '高风险', bestStage: '初识期', summary: '不要把她的不确定当作你加码证明的机会；你需要期限、边界和现实判断。', watchFirst: '看不确定是否逐步变清楚，还是长期让你停在消耗里。', confusedWith: ['回避拉扯型', '朋友慢转型'], core: ['对关系方向还在探索', '可能有好感但不确定投入能力', '容易让互动停在模糊区', '需要清晰但不施压的沟通'], signals: ['会说不知道、再看看', '对亲近有兴趣但回避定义', '状态随生活阶段波动', '需要更多现实体验确认'], greenFlags: ['不确定但诚实', '愿意一起验证现实相处', '逐渐给出更清楚反馈'], yellowFlags: ['长期模糊', '只享受陪伴不承担反馈', '你越投入她越摇摆'], redFlags: ['把你当备选', '拒绝清晰还要求你等待', '利用不确定索取资源'], stageSignals: [{ stage: '初识', text: '可以低压力了解。' }, { stage: '暧昧', text: '需要设定观察期限，避免长期悬空。' }], misreads: ['以为努力越多越能让她确定', '把模糊当浪漫', '害怕失去而不敢表达需求'], betterMoves: ['承认不确定但设边界', '用低压力约会验证适配', '保留自己的生活和选择', '到期仍不清楚就退出'], mistakes: ['无限等待', '不断证明自己', '逼她立刻承诺又不敢退出'], doDont: { dont: ['无限加码', '逼迫承诺', '自我悬空'], do: ['设期限', '轻验证', '保留生活'] }, scripts: ['我理解你还不确定。我们可以再了解一段时间，但我不适合长期停在完全模糊的位置。'], scriptsByStage: [{ stage: '设期限', text: '接下来两三周我们正常相处看看，如果还是没有更清楚的方向，我会先把投入收回来。' }], scenarios: [{ title: '她说再看看', wrong: '立刻加倍付出。', better: '接受不确定，同时设观察期限。' }],       strategies: [
        { title: '设期限', desc: '给观察期限，不无限等待。', example: '接下来两三周正常相处，如果没有更清楚的方向，我先收回投入。' },
        { title: '轻验证', desc: '用低压力约会验证适配。', example: '我们先正常相处看看，不用急着定义关系。' },
        { title: '保留生活', desc: '不把生活都压在这段关系上。', example: '我也继续我的生活，我们互相了解但不互相绑定。' },
        { title: '到期退出', desc: '期限到了仍不清楚，果断退出。', example: '三周后如果没有进展，我会把投入收回来。' },
        { title: '不证明', desc: '不用加码证明自己。', example: '我不需要证明什么，你也需要想清楚自己想要什么。' },
      ],
      chatCases: [
        {
          title: '她说不确定',
          context: '她说还不知道想要什么',
          messages: [
            { sender: 'girl', text: '我还没想清楚要不要谈恋爱', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解。我们可以再了解两三周，如果你还是不确定，我会先把投入收回来。', score: '+10', note: '接受+设期限', isWrong: false },
            { sender: 'me', text: '我会等你，不管多久。', score: '-10', note: '无限承诺，自我消耗', isWrong: true },
          ]
        },
        {
          title: '她想保持模糊',
          context: '她享受陪伴但不想定义',
          messages: [
            { sender: 'girl', text: '现在这样挺好的，不用急着定义', score: '', note: '', isWrong: false },
            { sender: 'me', text: '我理解你喜欢现在的状态。但我需要更清楚的方向，不然我会先回到自己的生活。', score: '+10', note: '表达需求+设边界', isWrong: false },
            { sender: 'me', text: '好吧，那就这样吧。', score: '-5', note: '被动接受，没有底线', isWrong: true },
          ]
        },
      ],
      boundaries: ['不确定可以被尊重，但不能成为让你无限等待和消耗的理由。'], fitFor: ['能承受不确定', '边界稳定', '不靠追逐证明价值'], notFitFor: ['容易上头', '害怕退出', '自我价值依赖回应'], training: ['给模糊关系设置观察期限和退出条件。'], reviewChecklist: ['不确定是否在变清楚？', '我是否把生活都压上去了？'], related: [article('ch7'), article('ch20')]
    })
  ];

  window.FEMALE_TYPE_FILTERS = {
    tags: ['全部', '慢热', '边界', '社交', '独立', '安全感', '情绪', '体验', '回避', '标准', '被动', '主动', '现实', '文艺', '成熟', '高敏', '讨好', '朋友', '相亲', '玩笑', '家庭', '疗愈', '探索'],
    difficulties: ['全部', '中', '高'],
    paces: ['全部', '慢节奏', '稳推进', '自然推进'],
    risks: ['全部', '低风险', '中风险', '高风险'],
    stages: ['全部', '初识期', '了解期', '暧昧期', '约会期', '关系期']
  };
})();
