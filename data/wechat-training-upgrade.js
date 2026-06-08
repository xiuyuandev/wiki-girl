/* 微信聊天训练升级：200 条结构化训练 + 10 个专题文章 */
(function () {
  const modules = [
    { id: 'ch16-1', title: '微信开场与身份交代 · 1-20', shortTitle: '开场身份', range: '1-20', focus: ['自然开场', '身份交代', '降低戒备'], intro: '练习第一次发微信时如何说清楚自己、给对方安全感，并留下可接的话口。' },
    { id: 'ch16-2', title: '接话与话题延展 · 21-40', shortTitle: '接话延展', range: '21-40', focus: ['接住信息', '开放延展', '分享比例'], intro: '练习从一句普通回复里找到关键词，不查户口、不尬问，把聊天延续到生活感。' },
    { id: 'ch16-3', title: '冷场、慢回与已读不回 · 41-60', shortTitle: '冷场慢回', range: '41-60', focus: ['降压', '不连环追问', '重启话题'], intro: '练习对低反馈保持稳定，不用质问、阴阳怪气和小作文破坏关系。' },
    { id: 'ch16-4', title: '朋友圈互动与日常分享 · 61-80', shortTitle: '朋友圈日常', range: '61-80', focus: ['轻互动', '日常分享', '不越界'], intro: '练习把朋友圈和日常变成自然连接，而不是点赞轰炸、评价外貌或强行刷存在。' },
    { id: 'ch16-5', title: '情绪回应与倾听承接 · 81-100', shortTitle: '情绪承接', range: '81-100', focus: ['共情', '承接', '不讲大道理'], intro: '练习女生表达累、烦、委屈时，先接情绪再谈建议，避免教育、比较和抢话。' },
    { id: 'ch16-6', title: '暧昧升温与分寸感 · 101-120', shortTitle: '升温分寸', range: '101-120', focus: ['轻暧昧', '边界感', '观察反馈'], intro: '练习在有反馈时轻微升温，在没反馈时及时收住，主动但不油腻。' },
    { id: 'ch16-7', title: '邀约测试与线下转场 · 121-140', shortTitle: '邀约转场', range: '121-140', focus: ['低压邀约', '具体选项', '可拒绝'], intro: '练习把线上聊天自然转到线下，用低压力、可拒绝、可替代的邀约方式测试窗口。' },
    { id: 'ch16-8', title: '相亲微信与资料型聊天 · 141-160', shortTitle: '相亲微信', range: '141-160', focus: ['现实信息', '生活感', '节奏判断'], intro: '练习相亲微信里既不审问条件，也不空泛尬聊，在现实信息和生活感之间取得平衡。' },
    { id: 'ch16-9', title: '约会前后消息承接 · 161-180', shortTitle: '约会承接', range: '161-180', focus: ['约前确认', '约后反馈', '复盘推进'], intro: '练习约会前确认不焦虑、约会后承接不油腻，让线下体验自然延续到微信。' },
    { id: 'ch16-10', title: '拒绝、降频与体面退出 · 181-200', shortTitle: '体面退出', range: '181-200', focus: ['接受拒绝', '降频', '止损'], intro: '练习看见冷淡和拒绝后及时收手，保留体面、边界和自尊。' }
  ];

  const scenes = [
    ['刚加上微信，对方只发了一个“你好”。','朋友局认识后第一次发消息。','活动结束后加了微信，不知道怎么开场。','同事介绍认识，对方还不熟。','线下聊过十分钟，回家后想延续。','她通过好友申请但没有说话。','你想提醒她你是谁。','共同朋友拉群后单独加上。','展会/课程后交换微信。','健身房或咖啡店自然认识后加上。','她回复“你是哪位？”','你们只见过一面，怕开场唐突。','她头像/昵称没有明显话题。','她朋友圈很少，不知道切入点。','你想从共同场景开头。','她说“刚看到”。','她问“找我有什么事吗？”','你想避免像推销。','你想让第一句轻松一点。','刚加微信第二天想自然续上。'],
    ['她说“今天好累”。','她说“刚下班”。','她回复“哈哈”。','她说“周末在家躺着”。','她说“最近在减肥”。','她发来一张咖啡照片。','她说“我不太会聊天”。','她说“看剧去了”。','她提到猫或狗。','她说“今天堵车堵疯了”。','她说“我喜欢安静一点”。','她说“最近在学新东西”。','她说“刚运动完”。','她说“在外面吃饭”。','她说“这家店还不错”。','她只回一个表情。','她说“随便看看”。','她提到旅行。','她说“我朋友也这么说”。','她问“你平时都干嘛？”'],
    ['她三个小时后才回。','她已读后没有回复。','你连续发了两句后她没接。','聊天突然冷掉。','她只回“嗯嗯”。','她说“最近有点忙”。','你想二次开启话题。','她一天后回复“忘回了”。','你发的梗她没接住。','她回复变短。','你想问她是不是不想聊。','你发邀约后她没回。','她说“改天吧”后沉默。','她朋友圈更新但没回你。','你发现自己想连环追问。','你想用幽默重启。','你想给自己台阶。','你想停止尬聊。','她只点赞不说话。','你想隔天再发一条。'],
    ['她发了咖啡朋友圈。','她晒了加班照片。','她发旅行风景。','她分享一首歌。','她发自拍但你不想油腻夸。','她发健身打卡。','她晒宠物。','她吐槽天气。','她发美食。','她发读书/展览。','你想分享自己的日常。','你路过她提过的店。','你想用照片开话题。','她朋友圈文案很丧。','她发工作成就。','她发和朋友聚会。','她发“想摆烂”。','她晒新发型。','她发夜景。','你想从点赞转私聊。'],
    ['她说“我今天真的很烦”。','她说“领导太离谱了”。','她说“我感觉自己很差”。','她说“家里催得烦”。','她说“有点emo”。','她说“我不想说话”。','她说“我被朋友鸽了”。','她说“最近压力好大”。','她说“我又失眠了”。','她说“今天被客户骂”。','她说“我不知道怎么办”。','她说“算了，不说了”。','她说“没人懂我”。','她说“我是不是太敏感”。','她说“我心情不好”。','她说“我想一个人待会”。','她说“我做错了吗？”','她说“我真的累了”。','她说“我有点想哭”。','她说“谢谢你听我说”。'],
    ['她主动分享小秘密。','她说“你还挺会说话”。','她开玩笑说你欠她一杯奶茶。','她晚安后加了表情。','她问你喜欢什么类型。','她说“你是不是对谁都这样”。','她夸你照片不错。','她说“跟你聊天还挺轻松”。','她发了可爱的表情包。','她调侃你。','她问你有没有想她。','她说“你今天怎么这么乖”。','她主动报备行程。','她说“你猜”。','她说“那你哄哄我”。','她问你会不会做饭。','她说“你这人还挺有意思”。','她用昵称叫你。','她说“你别太得意”。','她突然靠近又撤回。'],
    ['聊到一家新开的店。','她说周末还没安排。','她提到想喝咖啡。','她说最近想看电影。','她说喜欢散步。','她说想吃火锅。','她说下班后很无聊。','她问你周末做什么。','她说很久没去展览。','她说想找人探店。','你想把聊天转线下。','她说“有机会吧”。','她说“再说”。','她担心第一次见面尴尬。','你们已经聊了两周。','她主动问你住哪片。','你想约但怕太突然。','她说最近忙到月底。','她问你推荐什么地方。','你想提出两个时间选项。'],
    ['相亲对象刚加微信。','媒人刚介绍完双方情况。','她问你的工作。','她问你平时忙不忙。','她问你为什么相亲。','她说父母催得紧。','她问你对结婚怎么看。','她说自己慢热。','她问你房车情况。','她说先聊聊看。','你想了解她的生活节奏。','她问你兴趣爱好。','她说不想浪费时间。','她回复很礼貌但不热。','你想从资料聊到日常。','她问你择偶标准。','她说工作很稳定。','她问你介意异地吗。','她说周末要陪家人。','你想邀约第一次见面。'],
    ['约会前一天确认时间。','她说可能会迟到十分钟。','约会当天她问穿什么。','你到店比她早。','约会后刚分开。','她到家后给你发消息。','约会中聊到的梗想延续。','约会后她说今天挺开心。','她说回去有点累。','你想表达好感但不油。','第二天想继续联系。','她约后回复变慢。','她说下次可以再去。','她说今天谢谢你。','约会前她临时改时间。','她说路上堵车。','你想确认她是否安全到家。','约会后你想复盘自己的表现。','她提到下次想吃某家店。','约会后你想推进下一次。'],
    ['她明确说只想做朋友。','她说最近不想谈恋爱。','她说你人很好但不合适。','她多次拒绝邀约。','她持续只在需要帮忙时找你。','她说“别对我太好”。','她回复越来越敷衍。','她说有喜欢的人了。','她不愿意单独见面。','她把话题停在礼貌层。','你想最后确认一次。','她说“我们节奏不一样”。','她说“你别误会”。','她只接受群体活动。','她说最近想专注自己。','她拉开距离但没明说。','你发现自己投入失衡。','你想停止每天早安晚安。','你想体面收尾。','她拒绝后又偶尔找你聊天。']
  ];

  const wrongPatterns = [
    ['你好美女，在干嘛？','终于加到你了，聊聊呗。','你怎么不主动说话？','我看你挺漂亮的，认识一下。'],
    ['然后呢？','哈哈，是吗？','多喝热水。','你平时还有什么爱好？'],
    ['怎么不回我？','你是不是不想理我？','我又哪里说错了吗？','看到朋友圈了，怎么有空发动态没空回我？'],
    ['你真漂亮。','这自拍绝了，女神。','你每天生活好精致啊。','我也想和你一起去。'],
    ['别想太多。','这有什么好烦的。','你应该这样做。','我比你更惨。'],
    ['那你是不是喜欢我？','宝贝你真可爱。','你这么说我会当真的。','亲一个。'],
    ['周六出来。','你到底有没有空？','我都安排好了。','不出来就是不给面子。'],
    ['你工资多少？','你家里催婚吗？','你有房吗？','你想什么时候结婚？'],
    ['今天对我感觉怎么样？','我是不是表现不好？','下次什么时候见？快定吧。','我已经开始想你了。'],
    ['行吧，那算了。','你早说啊，浪费时间。','我对你这么好你还这样。','那以后别联系了。']
  ];

  const betterPatterns = [
    ['我是刚才在{{place}}和你聊过的{{role}}，刚才说到{{hook}}还挺有意思，先来打个招呼。','刚加上，我是{{role}}。不急着尬聊，先把人对上号：刚才我们聊到{{hook}}。','我是刚才那个{{role}}，你说的{{hook}}我记住了，感觉你观察还挺细。'],
    ['听起来今天能量被榨干了。你是想先放空，还是吐槽两句我接着？','这个点刚下班确实容易只剩半格电。你今天是忙到没停，还是被某件事卡住？','我接住了：你不是没话说，是今天太耗电。先慢慢回，不用赶节奏。'],
    ['收到，你先忙。我这边先不追问，晚点如果你还有兴致，再接着聊刚才那个话题。','那我先把聊天放轻一点：今天不考勤，等你有空再回。','我撤回一点存在感，给你留个轻松入口：刚看到个和你之前说的很像的小事。'],
    ['这张图有生活感，比单纯好看更有意思。你是偶然路过，还是专门去的？','我喜欢这条动态的氛围，不打扰夸一句：有点松弛。','这个场景让我想到你上次说的{{hook}}，感觉你的审美挺稳定。'],
    ['听起来你不是要答案，是今天真的被消耗到了。我先站你这边，慢慢说。','这事换谁都会烦。你先不用证明自己没问题，我听你把最堵的那一段说完。','我不急着给建议。你现在更想被理解，还是想一起想个处理办法？'],
    ['你这样说我会有点开心，但我先稳住，不乱接戏。','这句话有点可爱，我接一半，另一半留到见面再验证。','可以，我感受到一点好感，但我不急着放大，慢慢来更舒服。'],
    ['听起来你对这家店有兴趣。要不周六下午或周日傍晚选一个，喝杯咖啡，时间控制在一小时？','如果你这周有一段轻松时间，我们可以去试试。没空也没关系，我先给你一个可拒绝选项。','我们线上聊得差不多了，不如找个低压力场景见一面：咖啡/散步二选一？'],
    ['我理解相亲要看现实，也不想查户口。简单说下我的节奏：工作稳定，生活规律，想认真认识但不催进度。','这个问题可以聊。我更希望先确认相处舒服，再慢慢对齐现实条件。','我不是来完成任务的，是真想看看两个人生活节奏合不合。'],
    ['今天和你待着挺舒服的，尤其是聊到{{hook}}那段。你到家跟我说一声就好。','安全到家就行，今天谢谢你出来。后面不用急着复盘，先好好休息。','今天的线下感受不错，我先不急着推进，等你休息好我们再接着聊。'],
    ['收到，我尊重你的判断。谢谢你说清楚，我这边会把节奏收回来。','明白，那我不继续推进了。认识你这段时间挺开心，祝你之后顺利。','谢谢你坦白。我们都不用尴尬，我会保持合适距离。']
  ];

  const places = ['咖啡店', '朋友聚会', '课程活动', '展览现场', '公司楼下', '读书会', '健身房', '共同朋友饭局'];
  const roles = ['那个聊咖啡的人', '坐你旁边的人', '一起排队的人', '刚才聊到电影的人', '朋友介绍的我', '刚才问路线的人'];
  const hooks = ['那家小店', '你说的电影', '你提到的猫', '周末安排', '最近看的展', '那杯咖啡', '工作里的趣事', '旅行计划'];
  const stages = ['初识', '熟悉', '低反馈', '升温', '邀约', '边界'];
  const signals = ['礼貌但信息少', '愿意补充细节', '回复慢但有解释', '主动分享生活', '有一点玩笑感', '明确表达边界'];
  const avoid = ['不要连环追问，不要用质问证明自己焦虑。','不要把一句话放大成关系判断，先看连续反馈。','不要急着评价外貌或索取承诺。','不要写小作文解释自己有多认真。','不要把帮助、请客、秒回当成交换。'];

  function pick(list, index) { return list[index % list.length]; }
  function fill(text, index) {
    return String(text)
      .replace(/{{place}}/g, pick(places, index))
      .replace(/{{role}}/g, pick(roles, index + 2))
      .replace(/{{hook}}/g, pick(hooks, index + 4));
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  const items = [];
  modules.forEach((module, moduleIndex) => {
    for (let i = 0; i < 20; i += 1) {
      const num = moduleIndex * 20 + i + 1;
      const scene = scenes[moduleIndex][i];
      const better = fill(pick(betterPatterns[moduleIndex], i), num);
      items.push({
        num,
        articleId: module.id,
        moduleTitle: module.title,
        category: module.shortTitle,
        stage: pick(stages, moduleIndex + i),
        scene,
        girlSignal: pick(signals, i + moduleIndex),
        wrongMessage: pick(wrongPatterns[moduleIndex], i),
        betterMessage: better,
        whyBetter: '先承接对方当下状态，再给一个轻松、可拒绝、可延续的话口；重点是降低压力，而不是证明自己多会聊。',
        greenFlag: pick(['她补充细节并反问你。','她解释慢回原因，愿意继续话题。','她开始主动分享日常。','她接受轻松玩笑并延展。'], i),
        yellowFlag: pick(['回复礼貌但很短，需要降频观察。','只回答问题不反问，不要继续加码。','她说忙但没有新话口，先暂停。','她接受聊天但回避见面，继续看一致性。'], i),
        redFlag: pick(['明确说不想聊或不方便，立刻停止推进。','多次拒绝邀约且不提供替代时间。','只在需要帮忙时出现，投入失衡。','对方表达边界后仍继续试探。'], i),
        nextMove: pick(['发出后等对方自然回应，不补第二条解释。','如果她接话，再围绕她的关键词聊两轮。','如果反馈偏低，隔天再换一个轻话题，不追问原因。','出现绿灯后再给一次低压力邀约测试。'], i + moduleIndex),
        avoid: pick(avoid, i),
        copyScript: better,
        reviewQuestion: pick(['我这句话有没有给对方选择权？','我是在接她的话，还是只想推进自己的目的？','如果她慢回，我能不能不追问？','这条消息是否真实、具体、低压力？'], i)
      });
    }
  });

  function renderTrainingCard(item) {
    return `
      <section class="wechat-drill-card" id="wechat-${item.num}">
        <div class="wechat-drill-card__top"><span>#${item.num}</span><b>${escapeHtml(item.stage)}</b></div>
        <h3>${escapeHtml(item.scene)}</h3>
        <p class="wechat-signal"><strong>她的信号：</strong>${escapeHtml(item.girlSignal)}</p>
        <div class="wechat-compare">
          <div class="wechat-wrong"><b>错误示范</b><p>${escapeHtml(item.wrongMessage)}</p></div>
          <div class="wechat-better"><b>更好回复</b><p>${escapeHtml(item.betterMessage)}</p></div>
        </div>
        <dl class="wechat-drill-dl">
          <div><dt>为什么更好</dt><dd>${escapeHtml(item.whyBetter)}</dd></div>
          <div><dt>下一步</dt><dd>${escapeHtml(item.nextMove)}</dd></div>
          <div><dt>不要做</dt><dd>${escapeHtml(item.avoid)}</dd></div>
        </dl>
        <div class="wechat-flags">
          <span class="green">绿灯：${escapeHtml(item.greenFlag)}</span>
          <span class="yellow">黄灯：${escapeHtml(item.yellowFlag)}</span>
          <span class="red">红灯：${escapeHtml(item.redFlag)}</span>
        </div>
        <blockquote>可复制：${escapeHtml(item.copyScript)}</blockquote>
        <p class="wechat-review"><strong>复盘问题：</strong>${escapeHtml(item.reviewQuestion)}</p>
      </section>`;
  }

  function renderArticle(module, list) {
    return `
      <article class="wechat-article wechat-upgraded">
        <section class="wechat-article-hero">
          <span>WECHAT TRAINING · ${escapeHtml(module.range)}</span>
          <h1>${escapeHtml(module.title)}</h1>
          <p>${escapeHtml(module.intro)}</p>
          <div class="wechat-chip-row">${module.focus.map(tag => `<em>${escapeHtml(tag)}</em>`).join('')}</div>
          <a href="#/wechat-training" class="wiki-btn wiki-btn--primary">进入微信训练控制台</a>
        </section>
        <nav class="wechat-anchor-grid">${list.map(item => `<a href="#wechat-${item.num}">#${item.num} ${escapeHtml(item.scene).slice(0, 18)}</a>`).join('')}</nav>
        ${list.map(renderTrainingCard).join('')}
      </article>`;
  }

  function renderIndex() {
    return `
      <article class="wechat-article wechat-index">
        <section class="wechat-article-hero">
          <span>WECHAT TRAINING CONSOLE</span>
          <h1>微信聊天专项训练 200 条</h1>
          <p>把微信开场、接话、冷场、朋友圈、情绪承接、暧昧、邀约、相亲、约会前后和体面退出拆成 10 个专题。每条都包含错误示范、更好回复、反馈判断和下一步动作。</p>
          <div class="wechat-index-actions">
            <a href="#/wechat-training" class="wiki-btn wiki-btn--primary">打开训练控制台</a>
            <a class="wiki-btn" href="#wechat-modules">查看 10 个专题</a>
          </div>
        </section>
        <section class="wechat-principles">
          <h2>训练原则</h2>
          <ul>
            <li>真实具体：不要背油腻话术，用自己的生活接住对方信息。</li>
            <li>低压力：每次推进都给对方选择权，不逼回复、不逼见面。</li>
            <li>看反馈：绿灯推进，黄灯降频，红灯退出。</li>
            <li>有边界：不操控、不纠缠、不用付出换关系。</li>
          </ul>
        </section>
        <section id="wechat-modules" class="wechat-module-grid">
          ${modules.map(module => `<article><span>${escapeHtml(module.range)}</span><h2>${escapeHtml(module.shortTitle)}</h2><p>${escapeHtml(module.intro)}</p><div class="wechat-chip-row">${module.focus.map(tag => `<em>${escapeHtml(tag)}</em>`).join('')}</div><a href="#/a/${module.id}">进入 ${escapeHtml(module.range)} →</a></article>`).join('')}
        </section>
      </article>`;
  }

  window.WECHAT_TRAINING = { modules, items };
  if (!window.ARTICLES) window.ARTICLES = { articles: {} };
  if (!window.ARTICLES.articles) window.ARTICLES.articles = {};

  window.ARTICLES.articles.ch16 = {
    title: '微信聊天专项训练 200 条',
    lead: '10 个专题、200 条微信训练，练会开场、接话、冷场修复、邀约与体面退出。',
    chapterNum: '16',
    html: renderIndex()
  };

  modules.forEach(module => {
    const list = items.filter(item => item.articleId === module.id);
    window.ARTICLES.articles[module.id] = {
      title: module.title,
      lead: module.intro,
      html: renderArticle(module, list)
    };
  });
})();
