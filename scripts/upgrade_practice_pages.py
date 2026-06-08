from pathlib import Path

path = Path('data/extra-columns.js')
text = path.read_text(encoding='utf-8')
if 'function richCh28Html()' in text:
    raise SystemExit('richCh28Html already exists')

start = text.index('      ch37:')
end = text.index('      ch28:', start)
ch37_entry = text[start:end].rstrip()
if ch37_entry.endswith(','):
    ch37_entry = ch37_entry[:-1]

builders = r'''
  function richCh28Html() {
    return `
      <div class="practice-mobile-nav"><a href="#环境矩阵">环境矩阵</a><a href="#入场路径">入场路径</a><a href="#开场话术">开场话术</a><a href="#30天计划">30天计划</a></div>
      <article class="practice-article practice-ch28">
        <section class="practice-hero"><div><span class="practice-kicker">CH28 · 脱单环境</span><h2>社交圈建设与脱单环境</h2><p>脱单不是每天盯着聊天框，而是把自己放进更容易自然认识人的生活结构里：共同任务、重复出现、低压力连接、体面筛选。</p></div><div class="practice-hero-card"><strong>本章闭环</strong><span>选场景 → 稳定出现 → 建普通连接 → 低压邀约</span></div></section>
        <div class="practice-dashboard"><div><b>8类</b><span>高质量场景</span></div><div><b>4步</b><span>入场路径</span></div><div><b>18句</b><span>自然开场</span></div><div><b>30天</b><span>环境搭建</span></div></div>
        <section id="环境矩阵" class="practice-section"><h2>一、环境矩阵：优先去这些地方</h2><p class="practice-lead">不要只问“哪里女生多”，要问：这里有没有共同任务、能不能重复出现、是否方便普通互动、拒绝后是否仍能体面相处。</p><div class="practice-scenario-grid">
          <div class="practice-card"><h3>朋友局</h3><p><b>适合：</b>饭局、桌游、羽毛球、露营。<b>打法：</b>先照顾全场，不要锁死一个人。</p><ul><li>加分：会组织、会接梗、会照顾新人。</li><li>扣分：只对漂亮女生热情。</li></ul></div>
          <div class="practice-card"><h3>运动课</h3><p><b>适合：</b>攀岩、飞盘、舞蹈、瑜伽体验。<b>打法：</b>先把项目玩明白，再自然交流。</p><ul><li>开场：规则、装备、动作反馈。</li><li>边界：不碰身体、不当教练压人。</li></ul></div>
          <div class="practice-card"><h3>兴趣社群</h3><p><b>适合：</b>摄影、徒步、咖啡、读书、城市探索。<b>打法：</b>持续出现，贡献内容。</p><ul><li>任务：每周发一次有价值分享。</li><li>转场：从活动资源到下次同去。</li></ul></div>
          <div class="practice-card"><h3>学习班</h3><p><b>适合：</b>语言、烘焙、乐器、职场技能。<b>打法：</b>围绕作业、练习和反馈建立连接。</p><ul><li>优点：天然重复见面。</li><li>提醒：别把课堂变搭讪现场。</li></ul></div>
          <div class="practice-card"><h3>城市活动</h3><p><b>适合：</b>展览、市集、讲座、公益。<b>打法：</b>先了解主题，再轻松交换体验。</p><ul><li>开场：你最喜欢哪一部分？</li><li>收尾：下次类似活动可以一起。</li></ul></div>
          <div class="practice-card"><h3>职场外延</h3><p><b>适合：</b>行业活动、校友会、公开课。<b>打法：</b>专业交流优先，关系推进要更慢。</p><ul><li>底线：不追同事、不越职场边界。</li><li>重点：靠谱比会撩更重要。</li></ul></div>
        </div></section>
        <section id="入场路径" class="practice-section"><h2>二、低目的感入场：从“找对象”变成“有生活”</h2><div class="practice-flow"><div><b>01 列清单</b><span>把城市里每周可参加的活动列出10个，优先选你真的愿意长期去的。</span></div><div><b>02 固定出现</b><span>连续4次以上出现在同一类场景，先成为圈子里稳定、正常、靠谱的人。</span></div><div><b>03 普通连接</b><span>先和多人建立普通熟悉感，再对有好感的人多一点关注。</span></div><div><b>04 轻邀约</b><span>从“下次活动一起”“我把资料发你”过渡到咖啡、散步或小活动。</span></div></div></section>
        <section id="开场话术" class="practice-section"><h2>三、自然开场与延续话术</h2><div class="practice-script-grid"><div class="practice-script-card"><h3>环境切入</h3><p>“这个地方我第一次来，比想象中热闹，你之前来过吗？”</p><p>“刚才那个环节挺有意思，你觉得难点在哪？”</p></div><div class="practice-script-card"><h3>共同任务</h3><p>“你刚才那个方法挺省力的，我学一下。”</p><p>“我们这一组好像都慢热，先把任务完成再说。”</p></div><div class="practice-script-card"><h3>低压加微信</h3><p>“我把刚才那个活动链接发你，方便加一下吗？”</p><p>“下次如果还有这种活动，我可以喊你。不方便也没事。”</p></div><div class="practice-script-card"><h3>从群体到单独约</h3><p>“你上次说想试那家咖啡，我也感兴趣。如果你这周方便，可以一起去坐会儿。”</p></div></div></section>
        <section class="practice-section"><h2>四、圈内口碑：长期机会来自稳定可信</h2><div class="practice-compare"><div class="bad"><h3>扣分动作</h3><ul><li>刚认识就高频私聊、早晚安、查行程。</li><li>被拒绝后在群里阴阳怪气。</li><li>每次活动都只盯着一个女生。</li></ul></div><div class="good"><h3>加分动作</h3><ul><li>能组织，也能配合；能照顾人，也不讨好。</li><li>对所有人基本礼貌，不把女生当目标清单。</li><li>喜欢可以表达，被拒绝也能正常相处。</li></ul></div></div></section>
        <section id="30天计划" class="practice-section"><h2>五、30天脱单环境搭建计划</h2><div class="practice-plan-grid"><div><b>第1周</b><span>整理头像、衣着、作息；找10个活动，报名1个可持续场景。</span></div><div><b>第2周</b><span>参加2次活动，和至少3个人做普通连接，不急着锁定目标。</span></div><div><b>第3周</b><span>组织一次小局或转发一个有价值活动，建立“靠谱组织者”印象。</span></div><div><b>第4周</b><span>对有好感的人做一次低压力延续：资源、活动、咖啡或散步。</span></div></div></section>
        <div class="practice-warning"><strong>边界提醒：</strong>社交圈不是狩猎场。尊重活动本身、尊重拒绝、保护隐私和圈内口碑，才会有长期机会。</div>
      </article>`;
  }

  function richCh29Html() {
    return `
      <div class="practice-mobile-nav"><a href="#主页建设">主页</a><a href="#开场破冰">开场</a><a href="#节奏转场">节奏</a><a href="#风险复盘">风险</a></div>
      <article class="practice-article practice-ch29">
        <section class="practice-hero"><div><span class="practice-kicker">CH29 · 线上闭环</span><h2>线上社交与相亲软件</h2><p>线上社交的核心不是包装成另一个人，而是用真实可信的展示降低陌生感，用轻松互动尽快进入线下判断。</p></div><div class="practice-hero-card"><strong>闭环路径</strong><span>主页可信 → 低压开场 → 节奏稳定 → 线下见面</span></div></section>
        <div class="practice-dashboard"><div><b>6张</b><span>照片配置</span></div><div><b>12类</b><span>开场模板</span></div><div><b>3-5轮</b><span>邀约窗口</span></div><div><b>8项</b><span>风险识别</span></div></div>
        <section id="主页建设" class="practice-section"><h2>一、主页建设：真实、干净、有生活</h2><div class="practice-checklist"><h3>照片六件套</h3><ul><li>清晰正脸：自然表情、光线干净、衣服合身。</li><li>半身/全身：展示体态，不用怼脸自拍堆满主页。</li><li>生活场景：咖啡、做饭、城市散步，别炫富摆拍。</li><li>兴趣活动：运动、阅读、摄影、看展，证明你有生活。</li><li>社交活动：最多一张，注意打码和隐私。</li><li>干净空间：房间、书桌、厨房，展示基本秩序。</li></ul></div><div class="practice-template"><h3>简介模板</h3><p>“在杭州做产品，平时运动、咖啡和周末小旅行。希望认识一个沟通舒服、生活稳定、愿意一起体验新东西的人。”</p><p>“工作日认真搬砖，周末打球、做饭、看展。慢热但真诚，合适的话更想线下见面了解。”</p></div></section>
        <section id="开场破冰" class="practice-section"><h2>二、开场公式：观察 + 共鸣 + 轻问题</h2><div class="practice-script-grid"><div class="practice-script-card"><h3>资料细节</h3><p>“你照片里那家店我好像刷到过，是甜品比较出名吗？”</p></div><div class="practice-script-card"><h3>兴趣共鸣</h3><p>“你也周末徒步？我最近刚开始，最怕第二天腿废。”</p></div><div class="practice-script-card"><h3>生活方式</h3><p>“看你像是会认真生活的人，周末更偏出门还是宅家恢复？”</p></div><div class="practice-script-card"><h3>相亲承接</h3><p>“介绍人说你挺真诚，我先打个招呼。你最近工作节奏还好吗？”</p></div></div><div class="practice-compare"><div class="bad"><h3>别这样开场</h3><ul><li>“美女，在吗？”</li><li>“你这么漂亮肯定很多人追吧？”</li><li>连续复制粘贴土味情话。</li></ul></div><div class="good"><h3>更好开场</h3><ul><li>看资料里的具体细节。</li><li>问题轻，不让对方写小作文。</li><li>给一点自己的信息，避免审问感。</li></ul></div></div></section>
        <section id="节奏转场" class="practice-section"><h2>三、聊天节奏与线下转场</h2><div class="practice-flow"><div><b>01 前两轮</b><span>确认对方愿意互动：能接话、有细节、不是纯应付。</span></div><div><b>02 第3-5轮</b><span>聊到咖啡、展览、散步、城市活动等真实场景时轻邀约。</span></div><div><b>03 邀约表达</b><span>“如果你这周方便，我们可以喝杯咖啡，见面聊会更真实。不方便也没关系。”</span></div><div><b>04 被拒后</b><span>接受一次拒绝，不追问、不补偿、不阴阳怪气。对方若有意愿会给替代时间。</span></div></div><div class="practice-template"><h3>低反馈处理</h3><p>她回“还好”： “这个还好听起来像60分，不差但也没惊喜。最近有没有一件能到80分的小事？”</p><p>她很久不回： “你先忙，等你空一点再聊。我也去处理点事。”</p><p>连续两次低投入：降低频率，把注意力回收到自己的生活。</p></div></section>
        <section id="风险复盘" class="practice-section"><h2>四、风险识别与失败复盘</h2><div class="practice-card-grid"><div class="practice-card"><h3>高风险账号</h3><ul><li>长期不愿语音/见面，却持续索取情绪和资源。</li><li>很快谈投资、借钱、消费、充值。</li><li>身份信息前后矛盾，照片过度精修。</li></ul></div><div class="practice-card"><h3>相亲雷区</h3><ul><li>第一次聊天就审问收入、房车、前任。</li><li>把介绍人当施压工具。</li><li>不确认意愿就频繁打电话。</li></ul></div><div class="practice-card"><h3>失败复盘</h3><ul><li>主页是否真实可信？</li><li>开场是否具体轻松？</li><li>是否无限陪聊不邀约？</li><li>是否被拒后还继续施压？</li></ul></div></div><div class="practice-warning"><strong>底线：</strong>不伪造身份、收入、情感状态；不骚扰、不轰炸；第一次见面选公共场所，双方都有随时离开的空间。</div></section>
      </article>`;
  }

  function richCh30Html() {
    return `
      <div class="practice-mobile-nav"><a href="#阶段选场">阶段</a><a href="#十二场景">场景库</a><a href="#现场流程">流程</a><a href="#应急收尾">应急</a></div>
      <article class="practice-article practice-ch30">
        <section class="practice-hero"><div><span class="practice-kicker">CH30 · 约会场景库</span><h2>约会场景库</h2><p>好约会不是贵，而是低压力、有共同体验、有转场余地，并且双方都能舒服退出。</p></div><div class="practice-hero-card"><strong>选场景原则</strong><span>公共安全 · 能聊天 · 可转场 · 可收尾</span></div></section>
        <div class="practice-dashboard"><div><b>4阶</b><span>关系阶段</span></div><div><b>12个</b><span>约会方案</span></div><div><b>5步</b><span>现场流程</span></div><div><b>8类</b><span>应急预案</span></div></div>
        <section id="阶段选场" class="practice-section"><h2>一、按关系阶段选场景</h2><div class="practice-card-grid"><div class="practice-card"><h3>初见</h3><p>咖啡、轻食、散步、展览。关键词：公共、短时、可退出、方便聊天。</p></div><div class="practice-card"><h3>第二次升温</h3><p>市集、手作、运动体验、轻徒步。关键词：共同体验、轻微协作。</p></div><div class="practice-card"><h3>暧昧期</h3><p>夜景散步、livehouse、特色餐厅、周边短途。关键词：氛围、记忆点、边界确认。</p></div><div class="practice-card"><h3>确认关系前</h3><p>认真晚餐、城市一日路线、共同计划。关键词：稳定投入、清晰表达、现实感。</p></div></div></section>
        <section id="十二场景" class="practice-section"><h2>二、12个约会场景数据库</h2><div class="practice-scenario-grid">
          <div class="practice-card"><h3>咖啡 + 散步</h3><p><b>适合：</b>初见。<b>优点：</b>低成本、可聊天。<b>收尾：</b>“今天聊得挺轻松，下次可以换个更有体验感的地方。”</p></div>
          <div class="practice-card"><h3>展览 + 甜品</h3><p><b>适合：</b>初见/二次。<b>切入：</b>“你更喜欢看内容还是看氛围？”</p></div>
          <div class="practice-card"><h3>市集/集章</h3><p><b>优点：</b>轻松、有移动感。<b>流程：</b>逛30分钟，买小吃，找地方坐。</p></div>
          <div class="practice-card"><h3>羽毛球/飞盘</h3><p><b>适合：</b>双方愿意运动。<b>原则：</b>体验优先，不要秀优越。</p></div>
          <div class="practice-card"><h3>书店 + 轻食</h3><p><b>适合：</b>慢热型。<b>玩法：</b>互相挑一本觉得对方会喜欢的书。</p></div>
          <div class="practice-card"><h3>雨天室内路线</h3><p><b>方案：</b>商场咖啡、展览、桌游、陶艺。<b>重点：</b>提前备伞和交通方案。</p></div>
          <div class="practice-card"><h3>低预算路线</h3><p><b>方案：</b>公园散步、城市骑行、免费展、夜市小吃。<b>重点：</b>干净、有安排，不寒酸抱怨。</p></div>
          <div class="practice-card"><h3>夜间约会</h3><p><b>适合：</b>已有信任。<b>底线：</b>公共路线、尊重回家时间，不暗示施压。</p></div>
          <div class="practice-card"><h3>做饭/手作</h3><p><b>适合：</b>熟悉后。<b>优点：</b>协作感。<b>边界：</b>不把私密空间作为第一次见面。</p></div>
          <div class="practice-card"><h3>城市一日路线</h3><p><b>适合：</b>稳定升温。<b>结构：</b>主体验 + 轻餐 + 散步，别排满打卡。</p></div>
          <div class="practice-card"><h3>音乐/演出</h3><p><b>优点：</b>记忆点强。<b>风险：</b>太吵难聊天，结束后安排短聊天。</p></div>
          <div class="practice-card"><h3>宠物/公益活动</h3><p><b>优点：</b>展示责任感。<b>提醒：</b>认真参与，不把活动当追人道具。</p></div>
        </div></section>
        <section id="现场流程" class="practice-section"><h2>三、约会现场五步流程</h2><div class="practice-flow"><div><b>01 见面热身</b><span>聊路程、状态、环境，不急着深聊或评价对方。</span></div><div><b>02 共同体验</b><span>让场景提供话题：作品、食物、活动、路上的发现。</span></div><div><b>03 自我分享</b><span>每问一个问题，就给一点自己的经历，避免面试感。</span></div><div><b>04 观察舒适度</b><span>看她是否主动延续、身体朝向、回应质量，而不是强行升级。</span></div><div><b>05 体面收尾</b><span>“今天挺开心，你到家跟我说一声。”不逼问结果。</span></div></div></section>
        <section id="应急收尾" class="practice-section"><h2>四、应急与二次邀约</h2><div class="practice-script-grid"><div class="practice-script-card"><h3>冷场</h3><p>“这个地方还挺适合放空的，你平时周末会出来走走吗？”</p></div><div class="practice-script-card"><h3>地点踩雷</h3><p>“这里确实比想象中吵，我们换到旁边那家安静点的。”</p></div><div class="practice-script-card"><h3>对方疲惫</h3><p>“那今天别安排太满，坐会儿就好。”</p></div><div class="practice-script-card"><h3>她想早点走</h3><p>“没关系，你先回去休息，今天见到你已经挺好。”</p></div><div class="practice-script-card"><h3>二次邀约</h3><p>“你上次提到那家店我记下了，下周如果你方便，我们可以去试试。”</p></div></div><div class="practice-warning"><strong>安全底线：</strong>第一次见面选公共地点，不劝酒、不灌酒、不把对方带到私密空间；任何升级都以对方舒适和同意为前提。</div></section>
      </article>`;
  }

  function richCh31Html() {
    return `
      <div class="practice-mobile-nav"><a href="#接话四步">四步</a><a href="#低反馈库">低反馈</a><a href="#话题素材">话题库</a><a href="#邀约铺垫">邀约</a></div>
      <article class="practice-article practice-ch31">
        <section class="practice-hero"><div><span class="practice-kicker">CH31 · 聊天训练库</span><h2>聊天素材与话题库</h2><p>会聊天不是话多，而是能接住对方、延展情绪、分享自己，并在合适时机自然转向见面。</p></div><div class="practice-hero-card"><strong>聊天核心</strong><span>接住 → 延展 → 分享 → 收束</span></div></section>
        <div class="practice-dashboard"><div><b>4步</b><span>接话流程</span></div><div><b>6类</b><span>低反馈处理</span></div><div><b>40+</b><span>素材句</span></div><div><b>7天</b><span>训练清单</span></div></div>
        <section id="接话四步" class="practice-section"><h2>一、聊天四步法：别审问，别自嗨</h2><div class="practice-flow"><div><b>01 接住</b><span>先回应她说了什么，不急着换话题或自我表现。</span></div><div><b>02 延展</b><span>抓关键词，加感受、画面或轻问题。</span></div><div><b>03 分享</b><span>给一点自己的经历，让聊天不是单向审问。</span></div><div><b>04 收束</b><span>话题有热度时转场、邀约或自然结束，不硬撑。</span></div></div><div class="practice-template"><h3>通用公式</h3><p>关键词 + 感受判断 + 轻问题 + 一点自我分享。</p><p>她说“今天累死了” → “听起来今天被工作榨干了。是事情多，还是人比较消耗？我今天也开了几个会，最想做的事就是回家瘫着。”</p></div></section>
        <section id="低反馈库" class="practice-section"><h2>二、低反馈接话库：接一次，不追杀</h2><div class="practice-script-grid"><div class="practice-script-card"><h3>哈哈哈</h3><p>“你这个哈哈有点幸灾乐祸，我合理怀疑你也干过类似的事。”</p></div><div class="practice-script-card"><h3>嗯嗯</h3><p>“收到一个很乖但信息量不大的嗯嗯，那我换个轻松点的问题。”</p></div><div class="practice-script-card"><h3>还好</h3><p>“这个还好像60分，不差但也没惊喜。最近有什么能到80分的事吗？”</p></div><div class="practice-script-card"><h3>随便</h3><p>“随便是最难的选择题。我给两个选项：咖啡散步，或者吃点热的。”</p></div><div class="practice-script-card"><h3>不知道</h3><p>“那先不急着想答案，我们从简单的来：你更想安静点还是热闹点？”</p></div><div class="practice-script-card"><h3>很久不回</h3><p>“你先忙，等你空了再说。我也去处理点事。”</p></div></div><div class="practice-warning"><strong>规则：</strong>低反馈只接一次。连续两次低投入，就降频，不用追问“你是不是不喜欢我”。</div></section>
        <section id="话题素材" class="practice-section"><h2>三、阶段化话题库</h2><div class="practice-scenario-grid"><div class="practice-card"><h3>初识：轻松打开</h3><ul><li>最近让你放松的一件小事是什么？</li><li>周末你更偏充电还是放电？</li><li>你是计划型还是临场发挥型？</li><li>最近有没有一个你觉得还不错的店/电影/歌？</li></ul></div><div class="practice-card"><h3>熟悉：生活质感</h3><ul><li>你最近想养成的小习惯是什么？</li><li>给现在生活打分，你会打几分？</li><li>你喜欢热闹朋友局，还是两三个人深聊？</li><li>你压力大时通常怎么恢复？</li></ul></div><div class="practice-card"><h3>情绪回应</h3><ul><li>她吐槽：先站在她感受里，再轻问细节。</li><li>她开心：放大画面，不急着抢话。</li><li>她焦虑：先承认难受，再给可选帮助。</li><li>她沉默：给空间，不逼她马上解释。</li></ul></div><div class="practice-card"><h3>暧昧边界</h3><ul><li>你会被哪种细节打动？</li><li>你觉得相处舒服最重要的是什么？</li><li>如果喜欢一个人，你会明显表达还是慢慢观察？</li><li>边界：不黄腔、不施压、不拿暧昧逼承诺。</li></ul></div></div></section>
        <section id="邀约铺垫" class="practice-section"><h2>四、从聊天到邀约：给选择，不给压力</h2><div class="practice-flow"><div><b>01 找场景</b><span>聊到咖啡、展览、散步、运动、城市活动时，不要无限陪聊。</span></div><div><b>02 轻联想</b><span>“你说的那家我也想试，听起来适合周末放空。”</span></div><div><b>03 给选项</b><span>“如果你方便，我们可以周末去坐会儿；你更想咖啡还是散步？”</span></div><div><b>04 允许拒绝</b><span>“不方便也没关系，按你节奏来。”</span></div></div><div class="practice-compare"><div class="bad"><h3>禁用话术</h3><ul><li>“你怎么又不回？”</li><li>“我都这么主动了你还这样。”</li><li>“你是不是在考验我？”</li><li>过早黄腔、情史追问、收入审问。</li></ul></div><div class="good"><h3>替代动作</h3><ul><li>把质问换成给空间。</li><li>把索取答案换成具体邀约。</li><li>把证明自己换成真实分享。</li><li>把上头冲动换成延迟发送。</li></ul></div></div></section>
        <section class="practice-section"><h2>五、7天聊天训练清单</h2><div class="practice-plan-grid"><div><b>D1</b><span>把10句审问句改成分享 + 轻问题。</span></div><div><b>D2</b><span>练习从对方一句话里抓3个关键词。</span></div><div><b>D3</b><span>写20个生活素材：工作、运动、朋友、城市、食物。</span></div><div><b>D4</b><span>练习低反馈只接一次，然后降频。</span></div><div><b>D5</b><span>练3句低压力邀约。</span></div><div><b>D6</b><span>整理禁用话术，删除油腻、施压、审判表达。</span></div><div><b>D7</b><span>复盘一段聊天：接住、延展、分享、收束各得几分。</span></div></div></section>
      </article>`;
  }

  function richCh32Html() {
    return `
      <div class="practice-mobile-nav"><a href="#复盘框架">框架</a><a href="#案例库">案例库</a><a href="#评分表">评分</a><a href="#复盘模板">模板</a></div>
      <article class="practice-article practice-ch32">
        <section class="practice-hero"><div><span class="practice-kicker">CH32 · 错误复盘库</span><h2>案例拆解：错误示范 vs 正确示范</h2><p>复盘不是骂自己，也不是审判女生，而是把失败拆成下一次能调整的具体动作。</p></div><div class="practice-hero-card"><strong>复盘公式</strong><span>场景 → 原话 → 感受 → 替代动作</span></div></section>
        <div class="practice-dashboard"><div><b>8类</b><span>高频错误</span></div><div><b>4维</b><span>动作评分</span></div><div><b>16句</b><span>成熟改写</span></div><div><b>1套</b><span>复盘模板</span></div></div>
        <section id="复盘框架" class="practice-section"><h2>一、错误动作复盘框架</h2><div class="practice-flow"><div><b>01 场景</b><span>发生在刚认识、聊天、邀约、见面、暧昧、约会后还是退出阶段。</span></div><div><b>02 原话</b><span>还原你说了什么、做了什么，不用“我很真诚”替代事实。</span></div><div><b>03 对方感受</b><span>她可能感到压力、审问、被控制、被否定，还是不被尊重。</span></div><div><b>04 替代动作</b><span>下次具体改成哪句话、哪种节奏、哪条边界。</span></div></div></section>
        <section id="案例库" class="practice-section"><h2>二、高频案例拆解</h2>
          <div class="practice-case-card"><h3>案例1：第一次邀约太重</h3><div class="practice-compare"><div class="bad"><h5>错误示范</h5><p>“我订了很贵的餐厅，你一定要来，我真的很期待。”</p><ul><li>压力大，成本高。</li><li>让对方不好拒绝。</li></ul></div><div class="good"><h5>成熟改写</h5><p>“这周如果你有空，我们可以喝杯咖啡或者散个步，时间不用太长，见面聊会更真实。”</p><ul><li>低成本，可退出。</li><li>尊重对方节奏。</li></ul></div></div></div>
          <div class="practice-case-card"><h3>案例2：对方冷淡后追问</h3><div class="practice-compare"><div class="bad"><h5>错误示范</h5><p>“你是不是不想理我？你能不能直接说？”</p><ul><li>把焦虑丢给对方。</li><li>制造审判感。</li></ul></div><div class="good"><h5>成熟改写</h5><p>“感觉你最近比较忙，那你先处理自己的事。等你状态轻松点我们再聊。”</p><ul><li>给空间。</li><li>保留体面，也观察投入。</li></ul></div></div></div>
          <div class="practice-case-card"><h3>案例3：第一次见面查户口</h3><div class="practice-compare"><div class="bad"><h5>错误示范</h5><p>连续问工作、收入、家庭、前任、买房计划。</p><ul><li>像面试，不像约会。</li><li>让对方进入防御。</li></ul></div><div class="good"><h5>成熟改写</h5><p>先聊生活节奏、兴趣、城市体验，再逐步了解现实情况。</p><ul><li>先建立舒适感。</li><li>现实问题以后可以清晰谈。</li></ul></div></div></div>
          <div class="practice-case-card"><h3>案例4：约会后逼问结果</h3><div class="practice-compare"><div class="bad"><h5>错误示范</h5><p>“你今天到底对我什么感觉？我还有机会吗？”</p></div><div class="good"><h5>成熟改写</h5><p>“今天和你聊天挺轻松的，到家跟我说一声。下次有机会可以去你提到的那家店。”</p></div></div></div>
          <div class="practice-case-card"><h3>案例5：表白失败后纠缠</h3><div class="practice-compare"><div class="bad"><h5>错误示范</h5><p>“你再考虑一下，我可以等，我哪里不好你告诉我。”</p></div><div class="good"><h5>成熟改写</h5><p>“谢谢你直接告诉我。我会尊重你的想法，也会把自己的节奏收回来。祝你顺利。”</p></div></div></div>
          <div class="practice-case-card"><h3>案例6：相亲谈崩</h3><div class="practice-compare"><div class="bad"><h5>错误示范</h5><p>“你们女生是不是都这么现实？”</p></div><div class="good"><h5>成熟改写</h5><p>“我们对节奏和现实条件的期待可能不太一致。没关系，早点说清也挺好。”</p></div></div></div>
        </section>
        <section id="评分表" class="practice-section"><h2>三、四维评分：快速定位问题</h2><div class="practice-mini-table"><table><thead><tr><th>维度</th><th>自查问题</th><th>改法</th></tr></thead><tbody><tr><td>需求感</td><td>我是不是急着要答案、要承诺、要证明？</td><td>降低频率，回到具体邀约和生活建设。</td></tr><tr><td>压力感</td><td>对方是否觉得拒绝我会有负担？</td><td>给选择，允许拒绝，不用贵重投入绑架。</td></tr><tr><td>边界感</td><td>我是否尊重隐私、时间、拒绝和舒适度？</td><td>不追问、不窥探、不绕过拒绝。</td></tr><tr><td>节奏感</td><td>关系阶段是否匹配我的投入和表达？</td><td>刚认识轻投入，互有好感再加深。</td></tr></tbody></table></div></section>
        <section id="复盘模板" class="practice-section"><h2>四、复盘模板</h2><div class="practice-template"><ol><li>场景：当时处于哪个阶段？</li><li>原始动作：我说了什么、做了什么？</li><li>我的目的：我是想推进、确认、证明，还是缓解焦虑？</li><li>对方反馈：她的具体回应是什么？</li><li>错误点：需求感、压力感、边界感、节奏感哪一项超标？</li><li>替代动作：下次我具体改成哪句话或哪种行为？</li><li>退出判断：如果对方明确拒绝，我是否能停止推进？</li></ol></div><div class="practice-warning"><strong>底线：</strong>复盘是提升自己的互动质量，不是把失败归咎于女性、标签化对方，或研究如何让别人无法拒绝。</div></section>
      </article>`;
  }
'''

marker = '  function richPracticeHtml(id) {'
text = text.replace(marker, builders + '\n\n' + marker, 1)

rp_start = text.index('  function richPracticeHtml(id) {')
cf = text.index('  columns.forEach(function (item) {', rp_start)
new_rich = '''  function richPracticeHtml(id) {
    if (id === 'ch28') return richCh28Html();
    if (id === 'ch29') return richCh29Html();
    if (id === 'ch30') return richCh30Html();
    if (id === 'ch31') return richCh31Html();
    if (id === 'ch32') return richCh32Html();
    if (id === 'ch34') return richCh34Html();
    if (id === 'ch38') return richCh38Html();
    if (id === 'ch39') return richCh39Html();
    if (id === 'ch35') return richCh35Html();
    if (id === 'ch36') return richCh36Html();
    var pages = {
''' + ch37_entry + '''
    };
    return pages[id] || '';
  }

'''
text = text[:rp_start] + new_rich + text[cf:]
path.write_text(text, encoding='utf-8')
print('updated extra-columns.js')
