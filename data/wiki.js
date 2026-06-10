/* 站点数据:分类树 + 元信息 */
window.WIKI = {
  brand: '直男蜕变指南',
  tagline: '普通男性的魅力成长知识库',

  sidebar: [
    {
      title: '开始这里',
      desc: '先回到首页总目录，再按连续章节或工具入口学习。',
      items: [
        { type: 'route', name: '首页 · 全站总目录', to: '/', badge: 'Home', desc: '41 个主题专栏的连续入口' },
        { type: 'article', name: '从第 1 章开始', id: 'ch1', badge: '必读', desc: '先建立底层认知与行动系统' },
        { type: 'article', name: '每日训练计划', id: 'ch22', badge: '行动', desc: '把知识变成习惯' }
      ]
    },
    {
      title: '01-07 · 基础起步与关系推进',
      desc: '按章节顺读：心态、形象、吸引、聊天、理解、约会、关系推进。',
      items: [
        { type: 'article', name: '01. 蜕变心法', id: 'ch1', desc: '自卑诊断、稳定自信与行动系统' },
        { type: 'route', name: '02. 外在蜕变', to: '/appearance', articleId: 'ch2', badge: '升级', desc: '发型、穿搭、体态、护肤与形象方案' },
        { type: 'route', name: '02-1. 微表情与动作管理', to: '/expression', articleId: 'ch2', badge: '进化', desc: '笑容、眼神、手势、体态、声音与社交存在感训练' },
        { type: 'route', name: '02-2. 故事叙述与幽默能力', to: '/storytelling', articleId: 'ch4', badge: '表达', desc: '故事架构模板、幽默技术与实战训练系统' },
        { type: 'route', name: '02-3. 生活方式探索', to: '/lifestyle', articleId: 'ch35', badge: '生活', desc: '打破两点一线、低成本有趣生活方案与30天激活计划' },
        { type: 'route', name: '02-4. 主导力与松弛感', to: '/attraction', articleId: 'ch36', badge: '核心', desc: '让男人舒展、让女人沦陷的底层吸引力系统' },
        { type: 'route', name: '02-5. 强者心态锻造', to: '/mindset', articleId: 'ch37', badge: '心态', desc: '从弱者思维到强者内核的完整蜕变系统' },
        { type: 'route', name: '02-6. 财富建设', to: '/wealth', articleId: 'ch45', badge: '搞钱', desc: '普通人从小做起当老板，年收入30-100万实操路径' },
        { type: 'route', name: '02-7. 她世界解码', to: '/women', articleId: 'ch46', badge: '懂她', desc: '懂女人的底层逻辑，做一个有深度谈资的男人' },
        { type: 'route', name: '02-8. 生活妙招', to: '/lifehacks', articleId: 'ch47', badge: '妙招', desc: '形象、生活、饮食、社交、健康、财务、修养与实用技能的人生小窍门' },
        { type: 'route', name: '02-9. 人设叙事', to: '/persona', articleId: 'ch48', badge: '叙事', desc: '有过大起大落的男人，如何真实而有魅力地讲述自己的身份和经历' },
        { type: 'article', name: '03. 魅力磁场', id: 'ch3', desc: '社交雷达、渠道地图与30天行动挑战' },
        { type: 'article', name: '04. 高情商聊天', id: 'ch4', desc: '接话、延续、幽默与邀约' },
        { type: 'article', name: '05. 读懂女人', id: 'ch5', desc: '理解不同类型与信号' },
        { type: 'article', name: '06. 约会实战', id: 'ch6', desc: '从见面到送她回家' },
        { type: 'article', name: '07. 关系推进', id: 'ch7', desc: '从朋友到暧昧' }
      ]
    },
    {
      title: '08-10 · 案例、应急与测试工具',
      desc: '把大体量材料放在一起：案例复盘、临场应急、测试回应。',
      items: [
        { type: 'route', name: '08. 真实案例库', to: '/cases', articleId: 'ch8', badge: '200案例', desc: '成功、失败、待定都能复盘' },
        { type: 'route', name: '09. 场景应急手册', to: '/emergency', articleId: 'ch9-1', badge: '300场景', desc: '微信、邀约、修复、边界等临场处理' },
        { type: 'article', name: '10. 女人的测试', id: 'ch10', desc: '识别安全感、边界、诚意与红线，稳定回应而不被带节奏' }
      ]
    },
    {
      title: '11-16 · 沟通表达进阶',
      desc: '赞美、破冰、长期关系、挽回、相亲与微信专项训练。',
      items: [
        { type: 'article', name: '11. 赞美与表达', id: 'ch11', desc: '说到心里去但不油腻' },
        { type: 'article', name: '12. 破冰与搭讪', id: 'ch12', desc: '安全开口、自然接话与100+实战卡' },
        { type: 'article', name: '13. 长期关系经营', id: 'ch13', desc: '稳定相处与修复' },
        { type: 'article', name: '14. 分手与挽回', id: 'ch14', desc: '判断能否修复，体面处理结束' },
        { type: 'article', name: '15. 相亲实战', id: 'ch15', desc: '现实条件与推进节奏' },
        { type: 'route', name: '16. 微信聊天训练控制台', to: '/wechat-training', articleId: 'ch16', badge: '200训练', desc: '200条微信接话、冷场、邀约与退出训练' },
        { type: 'article', name: '16-1. 微信开场与身份交代', id: 'ch16-1', desc: '1-20：自然开场、身份交代、降低戒备' },
        { type: 'article', name: '16-2. 接话与话题延展', id: 'ch16-2', desc: '21-40：接住信息、开放延展、分享比例' },
        { type: 'article', name: '16-3. 冷场慢回与已读不回', id: 'ch16-3', desc: '41-60：降压、不连环追问、重启话题' },
        { type: 'article', name: '16-4. 朋友圈互动与日常分享', id: 'ch16-4', desc: '61-80：轻互动、日常分享、不越界' },
        { type: 'article', name: '16-5. 情绪回应与倾听承接', id: 'ch16-5', desc: '81-100：共情、承接、不讲大道理' },
        { type: 'article', name: '16-6. 暧昧升温与分寸感', id: 'ch16-6', desc: '101-120：轻暧昧、边界感、观察反馈' },
        { type: 'article', name: '16-7. 邀约测试与线下转场', id: 'ch16-7', desc: '121-140：低压邀约、具体选项、可拒绝' },
        { type: 'article', name: '16-8. 相亲微信与资料型聊天', id: 'ch16-8', desc: '141-160：现实信息、生活感、节奏判断' },
        { type: 'article', name: '16-9. 约会前后消息承接', id: 'ch16-9', desc: '161-180：约前确认、约后反馈、复盘推进' },
        { type: 'article', name: '16-10. 拒绝降频与体面退出', id: 'ch16-10', desc: '181-200：接受拒绝、降频、止损' }
      ]
    },
    {
      title: '17-22 · 自我与长期吸引',
      desc: '社交圈、职业金钱、边界、复盘、类型判断与每日训练。',
      items: [
        { type: 'article', name: '17. 社交圈建设', id: 'ch17', desc: '真实圈层、自然破冰与30天社交训练' },
        { type: 'article', name: '18. 职业与金钱吸引力', id: 'ch18', desc: '稳定工作、健康消费与规划感' },
        { type: 'article', name: '19. 男性边界感', id: 'ch19', desc: '拒绝、降频与体面退出' },
        { type: 'article', name: '20. 失败复盘室', id: 'ch20', desc: '把失败拆成可改动作' },
        { type: 'route', name: '21. 女性类型图鉴', to: '/female-types', articleId: 'ch21', badge: '升级', desc: '识别倾向，减少误判，合适相处' },
        { type: 'article', name: '22. 每日训练计划', id: 'ch22', desc: '7天、14天、21天到60天行动安排' }
      ]
    },
    {
      title: '23-27 · 男性底层建设',
      desc: '自尊、识人、情绪和底层吸引力。',
      items: [
        { type: 'article', name: '23. 男性底层吸引力建设', id: 'ch23', desc: '稳定状态、生活质量与边界感' },
        { type: 'article', name: '24. 反舔狗与自尊建设', id: 'ch24', desc: '停止卑微交换，建立双向投入' },
        { type: 'article', name: '25. 恋爱前的自我盘点', id: 'ch25', desc: '确认自己是否准备好进入关系' },
        { type: 'article', name: '26. 识人避坑与风险预警', id: 'ch26', desc: '用事实观察合适度与风险' },
        { type: 'article', name: '27. 情绪管理与上头急救', id: 'ch27', desc: '焦虑时先稳住，再回应' }
      ]
    },
    {
      title: '28-32 · 脱单实战场景',
      desc: '从社交环境到线上、约会、聊天和案例复盘。',
      items: [
        { type: 'article', name: '28. 社交圈建设与脱单环境', id: 'ch28', desc: '场景矩阵、自然开场与30天环境搭建' },
        { type: 'article', name: '29. 线上社交与相亲软件', id: 'ch29', desc: '主页展示、开场节奏、转微信与线下邀约闭环' },
        { type: 'article', name: '30. 约会场景库', id: 'ch30', desc: '按阶段、预算和天气选择低压力约会方案' },
        { type: 'article', name: '31. 聊天素材与话题库', id: 'ch31', desc: '低反馈接话、话题延展、分享比例与邀约转场' },
        { type: 'article', name: '32. 案例拆解：错误示范 vs 正确示范', id: 'ch32', desc: '高频错误场景、正确示范与复盘模板' }
      ]
    },
    {
      title: '33-41 · 长期关系与现实课题',
      desc: '边界、表达、生活、现实条件、失恋重建与尊重主动。',
      items: [
        { type: 'article', name: '33. 亲密关系中的边界与尊重', id: 'ch33', desc: '清晰同意、边界信号、拒绝回应与亲密修复' },
        { type: 'article', name: '34. 男性沟通表达能力', id: 'ch34', desc: '需求表达、边界拒绝、道歉修复与冲突降级' },
        { type: 'route', name: '35. 男性生活方式建设', to: '/lifestyle', articleId: 'ch35', badge: '生活', desc: '打破两点一线、低成本有趣生活方案与30天激活计划' },
        { type: 'route', name: '36. 经济与现实婚恋认知', to: '/attraction', articleId: 'ch36', badge: '核心', desc: '让男人舒展、让女人沦陷的底层吸引力系统' },
        { type: 'article', name: '37. 分手、失恋与重建', id: 'ch37', desc: '72小时急救、挽回判断与30天重建' },
        { type: 'article', name: '38. 反荡妇羞辱与主动表达', id: 'ch38', desc: '去羞耻、尊重边界，让主动更安全' },
        { type: 'article', name: '39. 双向投入与关系互惠', id: 'ch39', desc: '情感、时间、行动、资源与长期支持的双向投入' },
        { type: 'article', name: '40. 低资源男性的高价值吸引力', id: 'ch40', desc: '没钱没颜值时，用成长、信用、边界与生活力建立长期吸引' },
        { type: 'article', name: '41. 哈佛积极心理学实战课', id: 'ch41', desc: '用幸福感、优势、关系、意义与复原力训练提升人生状态' }
      ]
    },
    {
      title: '心理成长',
      desc: '基于耶鲁《幸福的科学》课程的幸福训练系统。',
      items: [
        { type: 'route', name: '幸福的科学', to: '/positive-psychology', articleId: 'ch41', badge: 'Yale', desc: '耶鲁最受欢迎课程：幸福感、优势、关系、意义与复原力的12周训练' }
      ]
    },
    {
      title: '万能话术',
      desc: '开场、接话、邀约、修复、拒绝、退出的低压力表达框架。',
      items: [
        { type: 'route', name: '万能话术', to: '/universal-scripts', articleId: 'ch43', badge: '话术', desc: '不是背台词，而是按场景组织真实、具体、有边界的表达' }
      ]
    },
    {
      title: '自证预言改写信念',
      desc: '金钱、幸福、执行力、恋爱、健康、运气等底层信念改写训练。',
      items: [
        { type: 'article', name: '44. 自证预言改写信念', id: 'ch44', badge: '信念', desc: '总论、训练地图与全部子专栏入口' },
        { type: 'article', name: '金钱信念', id: 'ch44-1', desc: '资源、收入、消费与价值交换脚本' },
        { type: 'article', name: '感知幸福快乐', id: 'ch44-2', desc: '训练看见快乐、满足和已拥有资源' },
        { type: 'article', name: '执行力与拖延', id: 'ch44-3', desc: '低阻力启动、反馈闭环与持续行动' },
        { type: 'article', name: '恋爱与被爱感', id: 'ch44-4', desc: '主动表达、双向筛选与被爱信念' },
        { type: 'article', name: '健康与身体状态', id: 'ch44-5', desc: '睡眠、运动、饮食和身体掌控感' },
        { type: 'article', name: '运气与机会感', id: 'ch44-6', desc: '提高暴露、准备度和回应机会的能力' },
        { type: 'article', name: '职业成长与能力上限', id: 'ch44-7', desc: '能力拆解、作品积累与反馈迭代' },
        { type: 'article', name: '人际关系与被接纳感', id: 'ch44-8', desc: '真实表达、边界与同频连接' },
        { type: 'article', name: '自我价值与身份认同', id: 'ch44-9', desc: '停止过度证明，用行动建立身份' },
        { type: 'article', name: '情绪安全感与抗挫', id: 'ch44-10', desc: '波动时停手、降温、求助和修复' },
        { type: 'article', name: '学习成长与长期主义', id: 'ch44-11', desc: '小块学习、输出验证与长期复利' },
        { type: 'article', name: '30 天信念改写训练计划', id: 'ch44-12', desc: '每天一个问题、动作和复盘模板' }
      ]
    }
  ],

  topNav: [
    { name: '成长路径', to: '/' },
    { name: '外在蜕变', to: '/appearance' },
    { name: '关系急救', to: '/relationship' },
    { name: '案例库', to: '/cases' },
    { name: '应急手册', to: '/emergency' },
    { name: '女性图鉴', to: '/female-types' },
    { name: '幸福的科学', to: '/positive-psychology' },
    { name: '复杂关系边界', to: '/married-woman' },
    { name: '万能话术', to: '/universal-scripts' },
    { name: '微表情管理', to: '/expression' },
    { name: '故事与幽默', to: '/storytelling' },
    { name: '生活方式', to: '/lifestyle' },
    { name: '主导力', to: '/attraction' },
    { name: '强者心态', to: '/mindset' },
    { name: '财富建设', to: '/wealth' },
    { name: '她世界', to: '/women' },
    { name: '生活妙招', to: '/lifehacks' },
    { name: '人设叙事', to: '/persona' },
    { name: '信念改写', to: '/a/ch44' },
    { name: '边界声明', to: '/principles' }
  ],

  articleOrder: [
    'ch1','ch2','ch3','ch4','ch5','ch6','ch7',
    'ch8','ch8-1','ch8-2','ch8-3','ch8-4','ch8-5',
    'ch8-6','ch8-7','ch8-8','ch8-9','ch8-10',
    'ch9-1','ch9-2','ch9-3','ch9-4','ch9-5','ch9-6','ch9-7','ch9-8','ch9-9','ch9-10',
    'ch10','ch10-1','ch10-2','ch10-3','ch10-4','ch10-5','ch10-6','ch11','ch12','ch13','ch14','ch15','ch16','ch16-1','ch16-2','ch16-3','ch16-4','ch16-5','ch16-6','ch16-7','ch16-8','ch16-9','ch16-10','ch17','ch18','ch19','ch20','ch21','ch22',
    'ch23','ch24','ch25','ch26','ch27','ch28','ch29','ch30',
    'ch31','ch32','ch33','ch34','ch35','ch36','ch37','ch38','ch39','ch40','ch41',
    'ch42','ch43',
    'ch44','ch44-1','ch44-2','ch44-3','ch44-4','ch44-5','ch44-6','ch44-7','ch44-8','ch44-9','ch44-10','ch44-11','ch44-12',
    'ch45','ch46'
  ],

  titles: {
    'ch1': '蜕变心法', 'ch2': '外在蜕变', 'ch3': '魅力磁场',
    'ch4': '高情商聊天', 'ch5': '读懂女人', 'ch6': '约会实战',
    'ch7': '关系推进', 'ch8': '案例库',
    'ch8-1':'案例 1-20', 'ch8-2':'案例 21-40', 'ch8-3':'案例 41-60',
    'ch8-4':'案例 61-80', 'ch8-5':'案例 81-100', 'ch8-6':'案例 101-120',
    'ch8-7':'案例 121-140', 'ch8-8':'案例 141-160', 'ch8-9':'案例 161-180',
    'ch8-10':'案例 181-200',
    'ch9-1': '微信与消息 · 1-30', 'ch9-2': '邀约与约会 · 31-60',
    'ch9-3': '失误与修复 · 61-90', 'ch9-4': '推进与试探 · 91-120',
    'ch9-5': '礼物与边界 · 121-150', 'ch9-6': '社交场景 · 151-180',
    'ch9-7': '情绪管理 · 181-210', 'ch9-8': '复合恢复 · 211-240',
    'ch9-9': '长期关系 · 241-270', 'ch9-10': '自我提升 · 271-300',
    'ch10': '女人的测试',
    'ch10-1': '女人的测试：判断框架与十大分类',
    'ch10-2': '女人的测试：回应模板与基础测试场景',
    'ch10-3': '女人的测试：聊天、约会与关系节奏',
    'ch10-4': '女人的测试：边界、异性与情绪支持',
    'ch10-5': '女人的测试：现实价值、尊重与红线',
    'ch10-6': '女人的测试：关系变化、退出判断与训练总结',
    'ch11': '赞美与表达', 'ch12': '破冰与搭讪',
    'ch13': '长期关系经营', 'ch14': '分手与挽回', 'ch15': '相亲实战',
    'ch16': '微信聊天专项训练 200 条',
    'ch16-1': '微信开场与身份交代 · 1-20',
    'ch16-2': '接话与话题延展 · 21-40',
    'ch16-3': '冷场、慢回与已读不回 · 41-60',
    'ch16-4': '朋友圈互动与日常分享 · 61-80',
    'ch16-5': '情绪回应与倾听承接 · 81-100',
    'ch16-6': '暧昧升温与分寸感 · 101-120',
    'ch16-7': '邀约测试与线下转场 · 121-140',
    'ch16-8': '相亲微信与资料型聊天 · 141-160',
    'ch16-9': '约会前后消息承接 · 161-180',
    'ch16-10': '拒绝、降频与体面退出 · 181-200', 'ch17': '社交圈建设', 'ch18': '职业与金钱吸引力',
    'ch19': '男性边界感', 'ch20': '失败复盘室', 'ch21': '女性类型图鉴', 'ch22': '每日训练计划',
    'ch23': '男性底层吸引力建设', 'ch24': '反舔狗与自尊建设', 'ch25': '恋爱前的自我盘点',
    'ch26': '识人避坑与风险预警', 'ch27': '情绪管理与上头急救', 'ch28': '社交圈建设与脱单环境',
    'ch29': '线上社交与相亲软件', 'ch30': '约会场景库', 'ch31': '聊天素材与话题库',
    'ch32': '案例拆解：错误示范 vs 正确示范', 'ch33': '亲密关系中的边界与尊重',
    'ch34': '男性沟通表达能力', 'ch35': '男性生活方式建设', 'ch36': '经济与现实婚恋认知',
    'ch37': '分手、失恋与重建', 'ch38': '反荡妇羞辱与主动表达', 'ch39': '双向投入与关系互惠', 'ch45': '财富建设', 'ch46': '她世界解码',
    'ch40': '低资源男性的高价值吸引力', 'ch41': '哈佛积极心理学实战课', 'ch47': '生活妙招', 'ch48': '人设叙事',
    'ch42': '复杂关系边界手册', 'ch43': '万能话术',
    'ch44': '自证预言改写信念',
    'ch44-1': '自证预言改写信念：金钱信念',
    'ch44-2': '自证预言改写信念：感知幸福快乐',
    'ch44-3': '自证预言改写信念：执行力与拖延',
    'ch44-4': '自证预言改写信念：恋爱与被爱感',
    'ch44-5': '自证预言改写信念：健康与身体状态',
    'ch44-6': '自证预言改写信念：运气与机会感',
    'ch44-7': '自证预言改写信念：职业成长与能力上限',
    'ch44-8': '自证预言改写信念：人际关系与被接纳感',
    'ch44-9': '自证预言改写信念：自我价值与身份认同',
    'ch44-10': '自证预言改写信念：情绪安全感与抗挫',
    'ch44-11': '自证预言改写信念：学习成长与长期主义',
    'ch44-12': '自证预言改写信念：30 天信念改写训练计划'
  },

  sectionMap: {
    start: { name: '开始这里', ids: ['ch1','ch22'] },
    foundations: { name: '基础起步与关系推进', ids: ['ch1','ch2','ch3','ch4','ch5','ch6','ch7'] },
    caseTools: { name: '案例、应急与测试工具', ids: ['ch8','ch8-1','ch8-2','ch8-3','ch8-4','ch8-5','ch8-6','ch8-7','ch8-8','ch8-9','ch8-10','ch9-1','ch9-2','ch9-3','ch9-4','ch9-5','ch9-6','ch9-7','ch9-8','ch9-9','ch9-10','ch10','ch10-1','ch10-2','ch10-3','ch10-4','ch10-5','ch10-6'] },
    communicateAdvanced: { name: '沟通表达进阶', ids: ['ch11','ch12','ch13','ch14','ch15','ch16','ch16-1','ch16-2','ch16-3','ch16-4','ch16-5','ch16-6','ch16-7','ch16-8','ch16-9','ch16-10'] },
    selfLongTerm: { name: '自我与长期吸引', ids: ['ch17','ch18','ch19','ch20','ch21','ch22'] },
    maleBase: { name: '男性底层建设', ids: ['ch23','ch24','ch25','ch26','ch27'] },
    datingPractice: { name: '脱单实战场景', ids: ['ch28','ch29','ch30','ch31','ch32'] },
    longTermReality: { name: '长期关系与现实课题', ids: ['ch33','ch34','ch35','ch36','ch37','ch38','ch39','ch40','ch41'] },
    beliefRewrite: { name: '自证预言改写信念', ids: ['ch44','ch44-1','ch44-2','ch44-3','ch44-4','ch44-5','ch44-6','ch44-7','ch44-8','ch44-9','ch44-10','ch44-11','ch44-12'] }
  },

  getSectionName(id) {
    const entry = Object.values(this.sectionMap).find(section => section.ids.includes(id));
    return entry ? entry.name : '成长知识库';
  },

  homeCategories: [
    { name: '01-07 · 基础起步与关系推进', desc: '心态、形象、吸引、聊天、理解、约会与关系推进，适合从第 1 章顺读。', id: 'ch1', badge: '01-07' },
    { name: '08. 真实案例库', desc: '200 个普通男性场景，成功、失败、待定都能复盘。', id: 'cases', to: '/cases', articleId: 'ch8', badge: '200 案例' },
    { name: '09. 场景应急手册', desc: '300 条临场问题，按微信、约会、修复、边界等分类。', id: 'emergency', to: '/emergency', articleId: 'ch9-1', badge: '300 场景' },
    { name: '10. 女人的测试', desc: '分类索引与高频场景，另含复盘与类型判断。', id: 'ch10', badge: '81 场景' },
    { name: '11-16 · 沟通表达进阶', desc: '赞美、破冰、长期关系、分手挽回、相亲与微信聊天训练。', id: 'ch11', badge: '11-16' },
    { name: '16. 微信聊天训练控制台', desc: '200 条微信聊天训练，拆成开场、接话、冷场、朋友圈、情绪回应、暧昧、邀约、相亲、约会前后和体面退出 10 个专题。', id: 'wechat-training', to: '/wechat-training', articleId: 'ch16', badge: '200 训练' },
    { name: '17-22 · 自我与长期吸引', desc: '社交圈、职业金钱吸引力、边界、复盘、女性图鉴与每日训练计划。', id: 'ch17', badge: '17-22' },
    { name: '21. 女性类型图鉴', desc: '按沟通倾向查询识别信号、相处方式、雷区和体面退出。', id: 'female-types', to: '/female-types', articleId: 'ch21', badge: 'Atlas' },
    { name: '23-27 · 男性底层建设', desc: '底层吸引力、自尊建设、自我盘点、识人避坑与情绪管理。', id: 'ch23', badge: '23-27' },
    { name: '28-32 · 脱单实战场景', desc: '社交环境、线上社交、约会场景、聊天素材与案例拆解。', id: 'ch28', badge: '28-32' },
    { name: '33-41 · 长期关系与现实课题', desc: '边界尊重、表达能力、生活方式、现实婚恋、分手重建、主动表达、互惠、低资源吸引力与积极心理学。', id: 'ch33', badge: '33-41' },
    { name: '39. 双向投入与关系互惠', desc: '情感、时间、行动、资源与长期支持的双向投入。', id: 'ch39', badge: '安全互惠' },
    { name: '40. 低资源男性的高价值吸引力', desc: '没钱没颜值时，用成长、信用、边界与生活力建立长期吸引。', id: 'ch40', badge: '现实建设' },
    { name: '41. 哈佛积极心理学实战课', desc: '用幸福感、优势、关系、意义与复原力训练提升人生状态。', id: 'ch41', badge: '心理成长' },
    { name: '复杂关系边界手册', desc: '已婚身份、暧昧信号、情绪依赖和体面退出的高风险关系自查。', id: 'married-woman', to: '/married-woman', articleId: 'ch42', badge: '边界' },
    { name: '万能话术', desc: '开场、接话、邀约、修复、拒绝、退出的低压力表达框架库。', id: 'universal-scripts', to: '/universal-scripts', articleId: 'ch43', badge: '话术' },
    { name: '微表情与动作管理', desc: '从木讷到生动：笑容、眼神、手势、体态、声音与社交存在感的系统训练。', id: 'expression', to: '/expression', articleId: 'ch2', badge: '表情进化' },
    { name: '故事叙述与幽默能力', desc: '六大故事模板、八大幽默技术、21天训练系统，从沉默到让人想多听两句。', id: 'storytelling', to: '/storytelling', articleId: 'ch4', badge: '表达进化' },
    { name: '生活方式探索', desc: '打破两点一线、低成本生活方案、下班精力恢复、30天激活计划。', id: 'lifestyle', to: '/lifestyle', articleId: 'ch35', badge: '生活进化' },
    { name: '主导力与松弛感', desc: '让男人舒展、让女人沦陷的底层吸引力系统：主导力、推拉、投资。', id: 'attraction', to: '/attraction', articleId: 'ch36', badge: '核心进化' },
    { name: '强者心态锻造', desc: '弱者vs强者7大维度对比、心态自测、7大支柱、场景实战、21天计划。', id: 'mindset', to: '/mindset', articleId: 'ch37', badge: '心态进化' },
    { name: '生活妙招', desc: '形象品味、生活美学、饮食智慧、社交礼仪、健康管理、财务智慧、精神修养与实用技能的人生小窍门。', id: 'lifehacks', to: '/lifehacks', articleId: 'ch47', badge: '妙招' },
    { name: '人设叙事', desc: '有过大起大落的男人，如何真实而有魅力地讲述自己的身份和经历，把零恋爱经验变成独特优势。', id: 'persona', to: '/persona', articleId: 'ch48', badge: '叙事' },
    { name: '自证预言改写信念', desc: '金钱、幸福、执行力、恋爱、健康、运气等底层信念改写训练。', id: 'ch44', badge: '信念改写' }
  ]
};
