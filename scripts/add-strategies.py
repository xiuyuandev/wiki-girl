import re

with open('data/female-types.js', 'r', encoding='utf-8') as f:
    content = f.read()

strategies_map = {
    'rational-boundary': [
        { 'title': '表达具体', 'desc': '邀约给时间地点退路，不模糊试探。', 'example': '周六下午三点，XX咖啡店，不方便就改天。' },
        { 'title': '尊重时间', 'desc': '提前约、准时、说到做到。', 'example': '我周三晚上有空，提前跟你确认周六安排。' },
        { 'title': '简洁表达', 'desc': '好感表达简洁有分寸，不夸张。', 'example': '我挺欣赏你的清楚，也想认真了解你。' },
        { 'title': '守住边界', 'desc': '自己也保留边界，不讨好不纠缠。', 'example': '我理解你的安排，我也有自己的节奏。' },
        { 'title': '事实先行', 'desc': '冲突时先讲事实再讲感受。', 'example': '事实是……我的感受是……你怎么看？' }
    ],
    'social-bright': [
        { 'title': '不查岗', 'desc': '观察单独投入，不审问社交关系。', 'example': '你和朋友们玩得开心，改天我们单独去那家店。' },
        { 'title': '有生活', 'desc': '展示自己的社交和生活半径。', 'example': '这周我也和朋友去爬山了，下次可以一起去。' },
        { 'title': '轻松邀约', 'desc': '设计有体验感的活动邀约。', 'example': '听说有个沉浸式展览，要不要一起去体验？' },
        { 'title': '观察投入', 'desc': '看是否愿意单独花时间。', 'example': '群里聊得开心，改天我们单独喝杯咖啡？' },
        { 'title': '不嫉妒', 'desc': '不因她对别人热情而吃醋。', 'example': '你对朋友挺热情的，我欣赏这点。' }
    ],
    'career-independent': [
        { 'title': '提前约', 'desc': '尊重她的时间，提前安排。', 'example': '下周三晚上你有空吗？想约你吃个轻松的晚饭。' },
        { 'title': '展示规划', 'desc': '分享你的目标和秩序感。', 'example': '我最近在做这个项目，挺有挑战的，想听听你的看法。' },
        { 'title': '并肩感', 'desc': '提供支持而不是指导人生。', 'example': '你这个项目听起来很有野心，需要支持的话我在。' },
        { 'title': '不黏人', 'desc': '高质量短互动，不占用她节奏。', 'example': '你先忙，不用急着回，有空了再聊。' },
        { 'title': '补约意识', 'desc': '她忙时主动提出补约。', 'example': '这周你忙，我们改到下周，我提前安排。' }
    ],
    'security-seeking': [
        { 'title': '稳定一致', 'desc': '不忽冷忽热，保持可预期。', 'example': '我每天晚上十点后回消息，不是故意消失。' },
        { 'title': '提前说明', 'desc': '做不到的事提前说，不临时变卦。', 'example': '这周可能会忙，提前跟你说，不是疏远你。' },
        { 'title': '接住情绪', 'desc': '她不安时先确认感受。', 'example': '我理解你会不安，我的想法是继续认真了解你。' },
        { 'title': '不随口承诺', 'desc': '承诺前想清楚能否做到。', 'example': '这个我现在不能保证，但我会尽力。' },
        { 'title': '边界清楚', 'desc': '安抚同时说明自己的边界。', 'example': '我会给你安全感，但也希望我们都别互相测试。' }
    ],
    'emotion-sensitive': [
        { 'title': '复述感受', 'desc': '先确认她的感受，不急着讲道理。', 'example': '我听到你不是纠结这件事，而是觉得自己没被重视。' },
        { 'title': '稳定语气', 'desc': '不讽刺不冷暴力，语气平和。', 'example': '我愿意认真聊，但我们都别用攻击的话。' },
        { 'title': '暂停升级', 'desc': '情绪高时暂停，降温后再聊。', 'example': '我们先缓十分钟，情绪下来了再继续。' },
        { 'title': '事后复盘', 'desc': '冲突后给出可执行的改进点。', 'example': '这次冲突我的问题是……下次我会……' },
        { 'title': '不讨好', 'desc': '理解情绪但不接受越界行为。', 'example': '我理解你的感受，但辱骂我不能接受。' }
    ],
    'romantic-experience': [
        { 'title': '记偏好', 'desc': '记住她具体喜好，不是泛泛讨好。', 'example': '你上次说喜欢手冲，这家店豆子是自家烘的。' },
        { 'title': '轻安排', 'desc': '提前做一点安排但保留轻松感。', 'example': '我查了这个展周日下午人少一点，要不要去？' },
        { 'title': '具体赞美', 'desc': '赞美具体细节，不油腻。', 'example': '你今天选的这首歌，副歌那段编曲挺特别的。' },
        { 'title': '共同体验', 'desc': '把约会做成共同参与的体验。', 'example': '我们可以一起做这道菜，比外面吃有意思。' },
        { 'title': '不用钱代替', 'desc': '用心比花钱更重要。', 'example': '我手写了这个歌单，不是买的，是我想分享给你的。' }
    ],
    'avoidant-pull': [
        { 'title': '设期限', 'desc': '给观察期限，不看情绪峰值。', 'example': '接下来两三周正常相处，如果没有更清楚的方向，我先收回投入。' },
        { 'title': '不追逐', 'desc': '她退时你也退，回到自己生活。', 'example': '我理解你需要空间，我先忙自己的，你想聊了再找我。' },
        { 'title': '清晰表达', 'desc': '用清楚但不施压的方式说需求。', 'example': '我对你有好感，但忽近忽远让我不舒服。' },
        { 'title': '看一致性', 'desc': '观察行动是否稳定，不看瞬间热情。', 'example': '我不看你某句话多热情，我看两周内你是否主动找我。' },
        { 'title': '不浪漫化', 'desc': '不把拉扯当高级吸引。', 'example': '不确定不是浪漫，我需要更清楚的信号。' }
    ],
    'high-standard': [
        { 'title': '真实展示', 'desc': '不包装，展示真实优势和短板。', 'example': '我的情况是……短板是……正在这样改善。' },
        { 'title': '用行动证明', 'desc': '长期稳定比短期热度更有说服力。', 'example': '我不会说大话，但我会用行动让你看到我的稳定。' },
        { 'title': '双向筛选', 'desc': '也判断她是否适配你。', 'example': '你的标准我理解了，我也想看看我们的节奏是否合适。' },
        { 'title': '不跪舔', 'desc': '不为了通过筛选失去自我。', 'example': '我欣赏你的标准，但我不会为了迎合失去自己。' },
        { 'title': '展示执行', 'desc': '用具体成果展示执行力。', 'example': '这是我最近做的项目，我想让你了解真实的我。' }
    ],
    'passive-response': [
        { 'title': '轻选择', 'desc': '给具体选项，降低她的心理成本。', 'example': '周六下午咖啡或周日中午散步，你哪个方便？' },
        { 'title': '看质量', 'desc': '不看回复速度，看回应内容质量。', 'example': '她回复慢但内容认真，比秒回哈哈有价值。' },
        { 'title': '邀约验证', 'desc': '用现实邀约测试真实兴趣。', 'example': '聊了这么久，不如线下喝杯东西，现实里更容易判断。' },
        { 'title': '不单方表演', 'desc': '不长期单方面带动话题。', 'example': '感觉一直是我在开话题，你如果也想了解，可以多给我一点反馈。' },
        { 'title': '及时止损', 'desc': '三次无进展后降低投入。', 'example': '三次互动后她没有新增信息，我先收回来。' }
    ],
    'direct-expressive': [
        { 'title': '坦诚回应', 'desc': '不玩欲擒故纵，真诚回应她的主动。', 'example': '我喜欢你直接说，我也愿意认真回应。' },
        { 'title': '同步节奏', 'desc': '确认双方节奏，不被推着走。', 'example': '我对你也有好感，但节奏上我希望自然一点。' },
        { 'title': '保持边界', 'desc': '她主动不代表可以省略尊重。', 'example': '我喜欢你主动，但我也希望我们都舒服。' },
        { 'title': '看稳定性', 'desc': '观察她的主动是否持续。', 'example': '我不只看你现在多热情，我看一个月后你是否还这样。' },
        { 'title': '行动跟上', 'desc': '让行动跟上表达，不只用嘴说。', 'example': '你说喜欢我，我也用行动让你感受到我的认真。' }
    ],
    'pragmatic-realistic': [
        { 'title': '谈计划', 'desc': '坦诚说明现状和具体计划。', 'example': '我现在收入是……三年内目标是……' },
        { 'title': '做实事', 'desc': '展示解决问题能力，不画饼。', 'example': '这个问题我这样处理，你看是否可行？' },
        { 'title': '双向建设', 'desc': '确认她是否愿意共同承担。', 'example': '我们可以把期待说清楚，看看能不能共同承担。' },
        { 'title': '不自卑', 'desc': '不夸大也不自卑，真实表达。', 'example': '我条件一般，但我有规划，也在行动。' },
        { 'title': '不画饼', 'desc': '不用空话承诺未来。', 'example': '我不说以后一定怎样，但我可以告诉你我现在在做什么。' }
    ],
    'artistic-feeling': [
        { 'title': '具体表达', 'desc': '真诚分享感受，不装懂。', 'example': '这段我挺有画面感的，我理解的是……不知道对不对。' },
        { 'title': '共同体验', 'desc': '一起做有审美的轻体验。', 'example': '这个小展氛围不错，看完我们可以散步聊聊。' },
        { 'title': '赞美细节', 'desc': '赞美具体细节，不泛泛夸。', 'example': '你选的这首歌，前奏那段钢琴挺抓人的。' },
        { 'title': '现实稳定', 'desc': '用行动保持稳定，不只谈感受。', 'example': '我喜欢和你聊这些，但我也希望我们的关系能落地。' },
        { 'title': '不装懂', 'desc': '不懂就诚实说，不硬撑。', 'example': '这个我不太了解，你能给我讲讲你喜欢它的点吗？' }
    ],
    'mature-stable': [
        { 'title': '稳定沟通', 'desc': '遇事不逃，稳定表达。', 'example': '这件事我想和你认真聊聊，不是争输赢。' },
        { 'title': '承担行动', 'desc': '犯错后不只道歉，给改进方案。', 'example': '我的问题是……我会这样改……你觉得呢？' },
        { 'title': '长期建设', 'desc': '展示长期主义，不追求刺激。', 'example': '我更看重我们能一起把日子过稳。' },
        { 'title': '不冷战', 'desc': '不用冷战测试对方。', 'example': '我不玩消失，有问题我们直接说。' },
        { 'title': '共同解决', 'desc': '遇事一起想办法，不互相指责。', 'example': '这个问题我们一起看看怎么解决，不是谁对谁错。' }
    ],
    'high-sensitive-boundary': [
        { 'title': '给退路', 'desc': '每句话都给拒绝空间。', 'example': '如果你不舒服，我们随时换地方，不用硬撑。' },
        { 'title': '尊重提醒', 'desc': '被提醒后立刻调整，不辩解。', 'example': '抱歉，我没意识到。我调整，你随时提醒我。' },
        { 'title': '低压力推进', 'desc': '避免身体越界和隐私追问。', 'example': '这个问题如果你不想聊，我们就不聊。' },
        { 'title': '温和表达', 'desc': '语气平和，不强势。', 'example': '我的想法是……但你觉得怎么舒服怎么来。' },
        { 'title': '提前说明', 'desc': '提前告知安排，不突然袭击。', 'example': '下周六我想约你，提前跟你说，你可以慢慢考虑。' }
    ],
    'people-pleasing': [
        { 'title': '给选项', 'desc': '给具体选项并允许拒绝。', 'example': '两个选择你更想要哪个？也可以都不选，我们换别的。' },
        { 'title': '鼓励表达', 'desc': '主动询问真实偏好。', 'example': '你真实想法对我很重要，哪怕和我不一样也没关系。' },
        { 'title': '尊重拒绝', 'desc': '她说不的时候真心接纳。', 'example': '你说不，我尊重。不用为了照顾我说都行。' },
        { 'title': '不利用弱点', 'desc': '不利用她不好意思占便宜。', 'example': '我知道你不好拒绝，但我希望你是真的想做。' },
        { 'title': '确认偏好', 'desc': '约会中多次确认她真实感受。', 'example': '这个安排你真的觉得舒服吗？不舒服我们可以改。' }
    ],
    'friendship-first': [
        { 'title': '逐步表达', 'desc': '逐渐增加单独相处和好感表达。', 'example': '和你相处挺舒服的，我也有超过朋友的好感。' },
        { 'title': '看独特性', 'desc': '观察是否有双向独特投入。', 'example': '我们之间的这些互动，是普通朋友不会有的。' },
        { 'title': '不隐藏太久', 'desc': '不要隐藏意图超过两个月。', 'example': '我不想一直以朋友名义相处，我想让你知道我的真实想法。' },
        { 'title': '尊重拒绝', 'desc': '表达后被拒，尊重边界。', 'example': '我理解你的想法，我们还是朋友，我尊重你的决定。' },
        { 'title': '不道德绑架', 'desc': '不用付出换内疚感。', 'example': '我对你好是因为我想，不是要你回报。' }
    ],
    'blind-date-evaluator': [
        { 'title': '透明真诚', 'desc': '坦诚基本情况，不隐瞒。', 'example': '我的基本情况是……也想听听你最看重什么。' },
        { 'title': '双向提问', 'desc': '也提出你的关键问题。', 'example': '你问了我很多，我也想了解你对家庭的看法。' },
        { 'title': '保留温度', 'desc': '在现实清楚里保留人的温度。', 'example': '这些可以聊清楚，但也希望我们能看看相处舒服不舒服。' },
        { 'title': '不防御', 'desc': '被问到现实问题不攻击。', 'example': '这个问题我可以回答，也想听听你的想法。' },
        { 'title': '展示人格', 'desc': '不只展示条件，展示人格。', 'example': '除了工作，我周末喜欢做这些……' }
    ],
    'playful-teasing': [
        { 'title': '接梗有度', 'desc': '轻松但不冒犯，有分寸。', 'example': '你这个梗我接了，但如果我哪句让你不舒服，告诉我。' },
        { 'title': '认真时认真', 'desc': '适时转入真实表达。', 'example': '玩笑归玩笑，我认真说一句：我确实挺想继续了解你。' },
        { 'title': '看投入', 'desc': '观察是否有现实投入。', 'example': '玩笑聊得开心，改天我们单独见面聊聊？' },
        { 'title': '调整尺度', 'desc': '被提醒后立刻调整玩笑。', 'example': '抱歉，我玩笑过头了。我注意，你随时提醒我。' },
        { 'title': '不低俗', 'desc': '不开黄腔，不羞辱式幽默。', 'example': '幽默可以，但我不拿你开玩笑，也不开黄腔。' }
    ],
    'family-oriented': [
        { 'title': '说清边界', 'desc': '坦诚表达家庭观和边界。', 'example': '我尊重家庭，但最终决定由我们共同做。' },
        { 'title': '承担行动', 'desc': '用行动体现责任感。', 'example': '这个我来安排，你不用担心。' },
        { 'title': '共同协调', 'desc': '一起面对家庭现实问题。', 'example': '这个问题我们一起想办法，不是谁单方面承担。' },
        { 'title': '不盲从', 'desc': '尊重但不盲从双方家庭。', 'example': '我理解你父母的想法，但我们的决定更重要。' },
        { 'title': '不逃避', 'desc': '不逃避长期和家庭议题。', 'example': '家庭和责任我们可以慢慢聊，我不逃避。' }
    ],
    'healing-recovery': [
        { 'title': '尊重节奏', 'desc': '不逼她讲过去，不追问。', 'example': '你不需要现在讲完，按你舒服的节奏来。' },
        { 'title': '支持不替代', 'desc': '支持但不扮演治疗师。', 'example': '我愿意支持你，但专业的事交给专业的人。' },
        { 'title': '守住边界', 'desc': '温柔不是无限承受。', 'example': '我理解你的感受，但我也需要被尊重。' },
        { 'title': '不给压力', 'desc': '不急着要她信任你。', 'example': '你不用证明什么，我按你的节奏来。' },
        { 'title': '鼓励系统', 'desc': '鼓励她建立健康支持系统。', 'example': '除了我，你也可以和信任的朋友聊聊。' }
    ],
    'exploratory-uncertain': [
        { 'title': '设期限', 'desc': '给观察期限，不无限等待。', 'example': '接下来两三周正常相处，如果没有更清楚的方向，我先收回投入。' },
        { 'title': '轻验证', 'desc': '用低压力约会验证适配。', 'example': '我们先正常相处看看，不用急着定义关系。' },
        { 'title': '保留生活', 'desc': '不把生活都压在这段关系上。', 'example': '我也继续我的生活，我们互相了解但不互相绑定。' },
        { 'title': '到期退出', 'desc': '期限到了仍不清楚，果断退出。', 'example': '三周后如果没有进展，我会把投入收回来。' },
        { 'title': '不证明', 'desc': '不用加码证明自己。', 'example': '我不需要证明什么，你也需要想清楚自己想要什么。' }
    ]
}

chat_cases_map = {
    'rational-boundary': [
        {
            'title': '她直接指出你的问题',
            'context': '她对你某件事表达不满',
            'messages': [
                { 'sender': 'girl', 'text': '你上次答应的事没做到' },
                { 'sender': 'me', 'text': '你说得对，是我没做到。我下周会补上，具体时间我们确认一下。', 'score': '+10', 'note': '承认事实+给方案' },
                { 'sender': 'me', 'text': '你怎么这么较真，小事而已。', 'score': '-12', 'note': 'dismiss她的感受', 'isWrong': True }
            ]
        },
        {
            'title': '邀约时她问具体时间',
            'context': '她需要清楚的安排',
            'messages': [
                { 'sender': 'me', 'text': '周末有空吗？' },
                { 'sender': 'girl', 'text': '周六还是周日？几点？' },
                { 'sender': 'me', 'text': '周六下午三点，XX咖啡店，如果你不方便就改周日。', 'score': '+10', 'note': '具体+给退路' },
                { 'sender': 'me', 'text': '到时候再说呗。', 'score': '-10', 'note': '太模糊，让她没安全感', 'isWrong': True }
            ]
        }
    ],
    'social-bright': [
        {
            'title': '她对别人也很热情',
            'context': '你看到她对其他男生也很热情',
            'messages': [
                { 'sender': 'girl', 'text': '今晚和朋友聚会，挺开心的' },
                { 'sender': 'me', 'text': '听起来不错。改天我们单独去那家新开的店，我也想和你单独聊聊。', 'score': '+8', 'note': '不嫉妒+邀约单独相处' },
                { 'sender': 'me', 'text': '你对谁都这么热情吗？', 'score': '-10', 'note': '吃醋审问，让她反感', 'isWrong': True }
            ]
        },
        {
            'title': '她想带你见朋友',
            'context': '她邀请你参加朋友聚会',
            'messages': [
                { 'sender': 'girl', 'text': '下周朋友聚会，你要不要来？' },
                { 'sender': 'me', 'text': '好啊，我也想认识你的朋友。不过之后我们单独约一次，我想有更多时间了解你。', 'score': '+10', 'note': '接受+争取单独时间' },
                { 'sender': 'me', 'text': '我只想你单独陪我。', 'score': '-8', 'note': '拒绝她的社交，显得控制', 'isWrong': True }
            ]
        }
    ],
    'career-independent': [
        {
            'title': '她连续加班',
            'context': '她工作很忙，回复变慢',
            'messages': [
                { 'sender': 'girl', 'text': '这周要赶项目，可能回复慢' },
                { 'sender': 'me', 'text': '理解，你先忙。等你方便了告诉我，我们约个轻松的时间。', 'score': '+10', 'note': '尊重+预留补约' },
                { 'sender': 'me', 'text': '你总是这么忙，是不是不想理我？', 'score': '-12', 'note': '抱怨+质疑，增加压力', 'isWrong': True }
            ]
        },
        {
            'title': '她谈到职业目标',
            'context': '她分享自己的职业规划',
            'messages': [
                { 'sender': 'girl', 'text': '我想三年内做到总监' },
                { 'sender': 'me', 'text': '挺有野心的。需要支持的话我在，但也别把自己逼太紧。', 'score': '+10', 'note': '支持+关心平衡' },
                { 'sender': 'me', 'text': '女生不用这么拼吧。', 'score': '-15', 'note': '否定她的事业心', 'isWrong': True }
            ]
        }
    ],
    'security-seeking': [
        {
            'title': '她问你在不在乎她',
            'context': '她反复确认你的态度',
            'messages': [
                { 'sender': 'girl', 'text': '你是不是对我不认真？' },
                { 'sender': 'me', 'text': '我理解你会不安。我的想法是继续认真了解你，但我也希望我们都别互相测试。', 'score': '+10', 'note': '确认+设边界' },
                { 'sender': 'me', 'text': '你怎么又这么想？', 'score': '-12', 'note': 'dismiss她的不安', 'isWrong': True }
            ]
        },
        {
            'title': '你临时取消约会',
            'context': '你有事需要改时间',
            'messages': [
                { 'sender': 'me', 'text': '抱歉，临时有急事，周六约会要改期。下周六同一时间可以吗？' },
                { 'sender': 'girl', 'text': '……好吧' },
                { 'sender': 'me', 'text': '我知道临时改期不好。下周六我提前确认，不会再变。', 'score': '+8', 'note': '道歉+具体补救+承诺' },
                { 'sender': 'me', 'text': '有事没办法，下次再说。', 'score': '-10', 'note': '太随意，没补救', 'isWrong': True }
            ]
        }
    ],
    'emotion-sensitive': [
        {
            'title': '她突然情绪低落',
            'context': '她因为小事突然难过',
            'messages': [
                { 'sender': 'girl', 'text': '你是不是觉得我很烦？' },
                { 'sender': 'me', 'text': '我听到你不是纠结这件事，而是觉得自己没被重视，对吗？', 'score': '+10', 'note': '复述感受' },
                { 'sender': 'me', 'text': '你别想太多。', 'score': '-12', 'note': '否定她的感受', 'isWrong': True }
            ]
        },
        {
            'title': '冲突时她想暂停',
            'context': '情绪高涨时她要求暂停',
            'messages': [
                { 'sender': 'girl', 'text': '我现在不想聊了' },
                { 'sender': 'me', 'text': '好，我们先缓一缓。十分钟后如果你愿意，我们再继续。', 'score': '+10', 'note': '尊重暂停+给时间' },
                { 'sender': 'me', 'text': '不行，必须把话说清楚。', 'score': '-12', 'note': '逼迫继续，情绪升级', 'isWrong': True }
            ]
        }
    ],
    'romantic-experience': [
        {
            'title': '约会没灵感',
            'context': '她暗示想有特别的约会',
            'messages': [
                { 'sender': 'girl', 'text': '周末有什么安排？' },
                { 'sender': 'me', 'text': '我查了两个地方：一个是手作陶艺，一个是小众展览。你更喜欢哪个？', 'score': '+10', 'note': '具体选择+用心安排' },
                { 'sender': 'me', 'text': '随便，你定吧。', 'score': '-10', 'note': '敷衍，让她失望', 'isWrong': True }
            ]
        },
        {
            'title': '她提到想去的店',
            'context': '她之前提过想去的餐厅',
            'messages': [
                { 'sender': 'girl', 'text': '那家日料店听说不错' },
                { 'sender': 'me', 'text': '你上次提过，我查了周四晚上有位子，要不要去？', 'score': '+12', 'note': '记住偏好+主动安排' },
                { 'sender': 'me', 'text': '哦，那改天去吧。', 'score': '-5', 'note': '没行动，只是敷衍', 'isWrong': True }
            ]
        }
    ],
    'avoidant-pull': [
        {
            'title': '她忽冷忽热',
            'context': '前几天热情，突然冷淡',
            'messages': [
                { 'sender': 'girl', 'text': '（已读不回，持续两天）' },
                { 'sender': 'me', 'text': '感觉你最近需要空间，我先忙自己的。如果你想聊了，随时找我。', 'score': '+10', 'note': '给空间+不追逐' },
                { 'sender': 'me', 'text': '你怎么又不回我？是不是我做错什么了？', 'score': '-15', 'note': '焦虑追问，她更想逃', 'isWrong': True }
            ]
        },
        {
            'title': '她回避定义关系',
            'context': '你想确认关系，她回避',
            'messages': [
                { 'sender': 'me', 'text': '我们这样算什么关系？' },
                { 'sender': 'girl', 'text': '我觉得现在这样挺好的' },
                { 'sender': 'me', 'text': '我理解你不想急。但我也需要更清楚的信号，不然我会先收回一些投入。', 'score': '+10', 'note': '表达需求+设边界' },
                { 'sender': 'me', 'text': '你到底喜不喜欢我？', 'score': '-12', 'note': '逼迫表态，她更回避', 'isWrong': True }
            ]
        }
    ],
    'high-standard': [
        {
            'title': '她问你的规划',
            'context': '她想知道你的长期目标',
            'messages': [
                { 'sender': 'girl', 'text': '你对未来有什么规划？' },
                { 'sender': 'me', 'text': '三年内想做到项目经理，也在学新技能。短期更想把我们的相处过稳。', 'score': '+10', 'note': '真实具体+回归关系' },
                { 'sender': 'me', 'text': '以后肯定会很好的，你放心。', 'score': '-10', 'note': '空话画饼', 'isWrong': True }
            ]
        },
        {
            'title': '她指出你的缺点',
            'context': '她直接说你的某个不足',
            'messages': [
                { 'sender': 'girl', 'text': '你有时候不太守时' },
                { 'sender': 'me', 'text': '你说得对，这是我的问题。我已经设了提醒，下次会提前到。', 'score': '+10', 'note': '承认+改进方案' },
                { 'sender': 'me', 'text': '你要求也太高了吧。', 'score': '-10', 'note': '防御攻击', 'isWrong': True }
            ]
        }
    ],
    'passive-response': [
        {
            'title': '她只回表情',
            'context': '你发了一段话，她只回表情',
            'messages': [
                { 'sender': 'me', 'text': '这周看了个挺有意思的纪录片，讲咖啡文化的。' },
                { 'sender': 'girl', 'text': '👍' },
                { 'sender': 'me', 'text': '感觉你最近挺忙的，先忙你的。有空了我们线下聊聊，比打字轻松。', 'score': '+8', 'note': '不追问+转邀约' },
                { 'sender': 'me', 'text': '你就回个表情？是不是不想聊？', 'score': '-12', 'note': '施压追问', 'isWrong': True }
            ]
        },
        {
            'title': '邀约时她犹豫',
            'context': '你约她，她说再看看',
            'messages': [
                { 'sender': 'me', 'text': '周六有个小展，一起去吗？' },
                { 'sender': 'girl', 'text': '我看看……' },
                { 'sender': 'me', 'text': '没关系，你先考虑。周六中午前给我答复就行，不方便就改天。', 'score': '+8', 'note': '给空间+设期限' },
                { 'sender': 'me', 'text': '你到底来不来？', 'score': '-10', 'note': '逼迫确认', 'isWrong': True }
            ]
        }
    ],
    'direct-expressive': [
        {
            'title': '她直接表白',
            'context': '她明确表达喜欢你',
            'messages': [
                { 'sender': 'girl', 'text': '我喜欢你' },
                { 'sender': 'me', 'text': '我也喜欢你。但我们不用急，慢慢了解，让行动跟上感觉。', 'score': '+10', 'note': '回应+稳节奏' },
                { 'sender': 'me', 'text': '（故意冷淡）哦，知道了。', 'score': '-10', 'note': '欲擒故纵，伤害信任', 'isWrong': True }
            ]
        },
        {
            'title': '她想加快节奏',
            'context': '她想更快推进关系',
            'messages': [
                { 'sender': 'girl', 'text': '我们什么时候确认关系？' },
                { 'sender': 'me', 'text': '我也在想这个问题。但我觉得再相处一个月，看看现实里是否合拍，再决定更稳。', 'score': '+10', 'note': '认可+设观察期' },
                { 'sender': 'me', 'text': '好啊，那就在一起吧。', 'score': '-5', 'note': '太草率，可能后悔', 'isWrong': True }
            ]
        }
    ],
    'pragmatic-realistic': [
        {
            'title': '她问收入',
            'context': '她直接问你的收入情况',
            'messages': [
                { 'sender': 'girl', 'text': '你收入多少？' },
                { 'sender': 'me', 'text': '目前到手一万二，三年内目标是两万。消费观是……你觉得呢？', 'score': '+10', 'note': '坦诚+反问她的标准' },
                { 'sender': 'me', 'text': '你问这个干嘛，是不是太现实了？', 'score': '-12', 'note': '防御攻击', 'isWrong': True }
            ]
        },
        {
            'title': '她谈未来安排',
            'context': '她想知道你的长期生活计划',
            'messages': [
                { 'sender': 'girl', 'text': '你打算什么时候买房？' },
                { 'sender': 'me', 'text': '目前在攒首付，预计三年后。你的计划呢？我想看看我们是否能对齐。', 'score': '+10', 'note': '具体计划+双向对齐' },
                { 'sender': 'me', 'text': '以后肯定会有的，别担心。', 'score': '-10', 'note': '空话画饼', 'isWrong': True }
            ]
        }
    ],
    'artistic-feeling': [
        {
            'title': '她分享小众音乐',
            'context': '她发了一首你不熟悉的歌',
            'messages': [
                { 'sender': 'girl', 'text': '这首歌最近单曲循环' },
                { 'sender': 'me', 'text': '我去听了，前奏那段钢琴挺特别的。你喜欢它哪一点？', 'score': '+10', 'note': '真实感受+请她分享' },
                { 'sender': 'me', 'text': '哦，挺好听的。', 'score': '-5', 'note': '敷衍，没共鸣', 'isWrong': True }
            ]
        },
        {
            'title': '她想去展览',
            'context': '她提到想看某个展览',
            'messages': [
                { 'sender': 'girl', 'text': '这个展好像不错' },
                { 'sender': 'me', 'text': '我查了下，周日下午人少一点。看完我们可以找个地方聊聊感受。', 'score': '+10', 'note': '主动安排+延续话题' },
                { 'sender': 'me', 'text': '那你去吧。', 'score': '-8', 'note': '没参与感', 'isWrong': True }
            ]
        }
    ],
    'mature-stable': [
        {
            'title': '她指出你的问题',
            'context': '她成熟地表达不满',
            'messages': [
                { 'sender': 'girl', 'text': '你上次答应的事没做到，我需要你更靠谱。' },
                { 'sender': 'me', 'text': '你说得对。我的问题是……我会这样改：设提醒+提前确认。你觉得这样可以吗？', 'score': '+10', 'note': '承认+具体改进' },
                { 'sender': 'me', 'text': '你怎么像我妈一样。', 'score': '-12', 'note': '贬低她的成熟', 'isWrong': True }
            ]
        },
        {
            'title': '冲突时她想解决',
            'context': '她希望一起解决问题',
            'messages': [
                { 'sender': 'girl', 'text': '我们聊聊上次的事吧' },
                { 'sender': 'me', 'text': '好。我不想争输赢，我想知道你的感受，然后我们看看怎么避免下次。', 'score': '+10', 'note': '合作态度' },
                { 'sender': 'me', 'text': '又提这事，有完没完。', 'score': '-15', 'note': '逃避+攻击', 'isWrong': True }
            ]
        }
    ],
    'high-sensitive-boundary': [
        {
            'title': '她说不舒服',
            'context': '她表达某个话题让她不适',
            'messages': [
                { 'sender': 'girl', 'text': '这个话题我不太舒服' },
                { 'sender': 'me', 'text': '抱歉，我没意识到。我们不聊这个。你觉得怎么自在怎么来。', 'score': '+10', 'note': '道歉+尊重+给空间' },
                { 'sender': 'me', 'text': '这有什么不舒服的，你太敏感了。', 'score': '-15', 'note': '否定她的边界', 'isWrong': True }
            ]
        },
        {
            'title': '约会她想换地方',
            'context': '她对约会地点感到不安',
            'messages': [
                { 'sender': 'girl', 'text': '这家店有点吵，我不太习惯' },
                { 'sender': 'me', 'text': '那我们换一家，你选。不用勉强，舒服最重要。', 'score': '+10', 'note': '立刻调整+给她选择权' },
                { 'sender': 'me', 'text': '来都来了，将就一下吧。', 'score': '-10', 'note': '忽视她的感受', 'isWrong': True }
            ]
        }
    ],
    'people-pleasing': [
        {
            'title': '她总说随便',
            'context': '问她想吃什么，她说随便',
            'messages': [
                { 'sender': 'me', 'text': '今晚想吃什么？' },
                { 'sender': 'girl', 'text': '随便，你定吧' },
                { 'sender': 'me', 'text': '我选了两个：日料或火锅。你更想哪个？也可以都不选，我们换别的。', 'score': '+10', 'note': '给选项+允许拒绝' },
                { 'sender': 'me', 'text': '那就日料吧。', 'score': '-5', 'note': '直接决定，没确认她真实想法', 'isWrong': True }
            ]
        },
        {
            'title': '她勉强答应',
            'context': '她答应了但语气犹豫',
            'messages': [
                { 'sender': 'me', 'text': '周末去看电影？' },
                { 'sender': 'girl', 'text': '……好吧' },
                { 'sender': 'me', 'text': '你听起来不太想。如果你不想，我们改天，不用勉强。', 'score': '+10', 'note': '察觉+给退路' },
                { 'sender': 'me', 'text': '那就说定了，周六见。', 'score': '-8', 'note': '忽视她的勉强', 'isWrong': True }
            ]
        }
    ],
    'friendship-first': [
        {
            'title': '她想保持朋友关系',
            'context': '你表达好感后她说做朋友',
            'messages': [
                { 'sender': 'girl', 'text': '我觉得我们还是做朋友比较好' },
                { 'sender': 'me', 'text': '我理解。认识你这段时间挺开心的，我尊重你的决定。', 'score': '+10', 'note': '体面接受+尊重' },
                { 'sender': 'me', 'text': '我对你这么好，你怎么能这样？', 'score': '-15', 'note': '道德绑架', 'isWrong': True }
            ]
        },
        {
            'title': '她把你当朋友倾诉',
            'context': '她经常找你倾诉情感问题',
            'messages': [
                { 'sender': 'girl', 'text': '我今天又遇到那个男生了……' },
                { 'sender': 'me', 'text': '我理解你想分享。但我想让你知道，我对你不只是朋友的感觉。如果你没这个意思，我也可以调整。', 'score': '+8', 'note': '表达意图+给选择' },
                { 'sender': 'me', 'text': '（默默倾听， hoping she will notice）', 'score': '-5', 'note': '隐藏意图，浪费双方时间', 'isWrong': True }
            ]
        }
    ],
    'blind-date-evaluator': [
        {
            'title': '她问婚育观',
            'context': '第一次见面她就问婚育',
            'messages': [
                { 'sender': 'girl', 'text': '你对结婚怎么看？' },
                { 'sender': 'me', 'text': '我想先认真相处，节奏到了自然结。我也想知道你对长期关系最看重什么。', 'score': '+10', 'note': '回应+双向提问' },
                { 'sender': 'me', 'text': '第一次见面就问这个，是不是太急了？', 'score': '-10', 'note': '防御攻击', 'isWrong': True }
            ]
        },
        {
            'title': '她问家庭情况',
            'context': '她了解你的家庭背景',
            'messages': [
                { 'sender': 'girl', 'text': '你父母是做什么的？' },
                { 'sender': 'me', 'text': '普通工薪阶层，家庭关系简单。你的家庭氛围怎么样？', 'score': '+8', 'note': '坦诚+反问' },
                { 'sender': 'me', 'text': '问这个干嘛，查户口吗？', 'score': '-10', 'note': '防御攻击', 'isWrong': True }
            ]
        }
    ],
    'playful-teasing': [
        {
            'title': '她拿你开玩笑',
            'context': '她经常调侃你',
            'messages': [
                { 'sender': 'girl', 'text': '你今天穿得像个程序员' },
                { 'sender': 'me', 'text': '哈哈被你发现了。不过如果你哪句让我不舒服，我也会直接说。', 'score': '+8', 'note': '接住+设边界' },
                { 'sender': 'me', 'text': '你怎么老损我？', 'score': '-8', 'note': '玻璃心，破坏轻松氛围', 'isWrong': True }
            ]
        },
        {
            'title': '她想认真聊聊',
            'context': '玩笑后她想转入认真话题',
            'messages': [
                { 'sender': 'girl', 'text': '玩笑归玩笑，我想认真问你一件事' },
                { 'sender': 'me', 'text': '好，我认真听。刚才的玩笑我收住，你说。', 'score': '+10', 'note': '立刻转入认真' },
                { 'sender': 'me', 'text': '怎么突然严肃了，继续开玩笑呗。', 'score': '-10', 'note': '逃避认真话题', 'isWrong': True }
            ]
        }
    ],
    'family-oriented': [
        {
            'title': '她提到父母意见',
            'context': '她说父母对她恋爱有看法',
            'messages': [
                { 'sender': 'girl', 'text': '我爸妈觉得我应该早点定下来' },
                { 'sender': 'me', 'text': '我理解他们的关心。但最重要的是你自己的想法，我们的节奏由我们决定。', 'score': '+10', 'note': '尊重+强调自主' },
                { 'sender': 'me', 'text': '你爸妈管得也太多了。', 'score': '-10', 'note': '贬低她的家庭', 'isWrong': True }
            ]
        },
        {
            'title': '她谈家庭责任',
            'context': '她说需要照顾家人',
            'messages': [
                { 'sender': 'girl', 'text': '周末要陪我妈去医院' },
                { 'sender': 'me', 'text': '应该的。如果需要帮忙，我在。但也别把自己累坏了。', 'score': '+10', 'note': '支持+关心她' },
                { 'sender': 'me', 'text': '那你又没时间陪我了。', 'score': '-10', 'note': '自私，不顾她的责任', 'isWrong': True }
            ]
        }
    ],
    'healing-recovery': [
        {
            'title': '她提到过去受伤',
            'context': '她谨慎地分享过去的经历',
            'messages': [
                { 'sender': 'girl', 'text': '我之前那段关系……不太愉快' },
                { 'sender': 'me', 'text': '谢谢你愿意告诉我。你不需要现在讲完，按你舒服的节奏来。', 'score': '+10', 'note': '感谢+尊重节奏' },
                { 'sender': 'me', 'text': '他做了什么？详细说说。', 'score': '-12', 'note': '追问细节，像审问', 'isWrong': True }
            ]
        },
        {
            'title': '她突然退缩',
            'context': '关系推进时她突然冷淡',
            'messages': [
                { 'sender': 'girl', 'text': '（突然不回消息，持续三天）' },
                { 'sender': 'me', 'text': '我注意到你最近有点退缩。我理解你可能需要空间，我尊重你的节奏。', 'score': '+10', 'note': '察觉+给空间' },
                { 'sender': 'me', 'text': '你怎么又不理我了？是不是不信任我？', 'score': '-12', 'note': '逼迫+质疑', 'isWrong': True }
            ]
        }
    ],
    'exploratory-uncertain': [
        {
            'title': '她说不确定',
            'context': '她说还不知道想要什么',
            'messages': [
                { 'sender': 'girl', 'text': '我还没想清楚要不要谈恋爱' },
                { 'sender': 'me', 'text': '我理解。我们可以再了解两三周，如果你还是不确定，我会先把投入收回来。', 'score': '+10', 'note': '接受+设期限' },
                { 'sender': 'me', 'text': '我会等你，不管多久。', 'score': '-10', 'note': '无限承诺，自我消耗', 'isWrong': True }
            ]
        },
        {
            'title': '她想保持模糊',
            'context': '她享受陪伴但不想定义',
            'messages': [
                { 'sender': 'girl', 'text': '现在这样挺好的，不用急着定义' },
                { 'sender': 'me', 'text': '我理解你喜欢现在的状态。但我需要更清楚的方向，不然我会先回到自己的生活。', 'score': '+10', 'note': '表达需求+设边界' },
                { 'sender': 'me', 'text': '好吧，那就这样吧。', 'score': '-5', 'note': '被动接受，没有底线', 'isWrong': True }
            ]
        }
    ]
}

def escape_js(s):
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")

def make_insert(type_id):
    strategies = strategies_map.get(type_id, [])
    chat_cases = chat_cases_map.get(type_id, [])
    
    lines = []
    lines.append('      strategies: [')
    for s in strategies:
        lines.append(f"        {{ title: '{escape_js(s['title'])}', desc: '{escape_js(s['desc'])}', example: '{escape_js(s['example'])}' }},")
    lines.append('      ],')
    
    lines.append('      chatCases: [')
    for case in chat_cases:
        lines.append(f"        {{")
        lines.append(f"          title: '{escape_js(case['title'])}',")
        lines.append(f"          context: '{escape_js(case['context'])}',")
        lines.append(f"          messages: [")
        for msg in case['messages']:
            is_wrong = 'true' if msg.get('isWrong') else 'false'
            lines.append(f"            {{ sender: '{msg['sender']}', text: '{escape_js(msg['text'])}', score: '{msg.get('score', '')}', note: '{escape_js(msg.get('note', ''))}', isWrong: {is_wrong} }},")
        lines.append(f"          ]")
        lines.append(f"        }},")
    lines.append('      ],')
    
    return '\n'.join(lines)

# Process each type
for type_id in list(strategies_map.keys()):
    # Find the position of this type's boundaries line
    marker = f"id: '{type_id}'"
    idx = content.find(marker)
    if idx < 0:
        print(f"WARNING: Could not find {type_id}")
        continue
    
    # Find 'boundaries:' after this type's id
    boundaries_pos = content.find('boundaries:', idx)
    if boundaries_pos < 0:
        print(f"WARNING: Could not find boundaries for {type_id}")
        continue
    
    insert_text = make_insert(type_id)
    content = content[:boundaries_pos] + insert_text + '\n      ' + content[boundaries_pos:]
    print(f"Added to {type_id}")

with open('data/female-types.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
