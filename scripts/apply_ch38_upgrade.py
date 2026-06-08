from pathlib import Path
root = Path.cwd()
extra = root / 'data' / 'extra-columns.js'
css = root / 'css' / 'extra-columns.css'
index = root / 'index.html'

js = extra.read_text(encoding='utf-8')
marker = "  function richPracticeHtml(id) {\n"
if "function richCh38Html()" not in js:
    insert = r'''  function richCh38Html() {
    return '' +
      '<div class="ch38-mobile-nav"><a href="#概念澄清">概念澄清</a><a href="#表达成本">表达成本</a><a href="#安全框架">安全框架</a><a href="#信号灯">信号灯</a><a href="#场景库">场景库</a><a href="#话术实验室">话术实验室</a></div>' +
      '<article class="ch38-article"><section class="ch38-hero"><div><span class="ch38-kicker">CH38 · 安全主动表达</span><h2>反荡妇羞辱与主动表达</h2><p class="ch38-lead">女性愿不愿意主动，往往不只取决于“喜不喜欢”，更取决于主动之后是否会被评价、被误读、被传播或被推进过快。真正成熟的吸引力，是让对方知道：她可以表达兴趣，也依然拥有边界和尊严。</p><div class="ch38-hero-actions"><a href="#安全框架">建立安全空间</a><a href="#话术实验室">练回应话术</a></div></div><aside class="ch38-hero-card"><strong>核心闭环</strong><span>去羞耻 → 降成本 → 尊重边界 → 接住主动</span></aside></section>' +
      '<div class="ch38-dashboard"><div><b>5类</b><span>羞辱机制拆解</span></div><div><b>5维</b><span>安全表达空间</span></div><div><b>3色</b><span>边界信号灯</span></div><div><b>8个</b><span>高频场景演练</span></div></div>' +
      '<section id="概念澄清" class="ch38-section"><div class="ch38-section-banner"><span>01</span><div><h2>一、概念澄清：什么是荡妇羞辱</h2><p>荡妇羞辱不是只存在于粗暴骂人里。它也可能藏在玩笑、双标、暗示、传播隐私和“你怎么这么主动”的评价里。</p></div></div><div class="ch38-card-grid">' +
      '<div class="ch38-card"><h3>显性羞辱</h3><p>直接用“随便、不检点、不矜持”等词否定女性的主动和欲望，让对方为正常表达感到羞耻。</p></div>' +
      '<div class="ch38-card"><h3>隐性羞辱</h3><p>嘴上说“不介意”，行动上却轻视她、降低认真程度，默认主动的人更廉价。</p></div>' +
      '<div class="ch38-card"><h3>玩笑式羞辱</h3><p>用“你这么会”“看来经验不少”包装成玩笑，本质是在把她推回防御和沉默。</p></div>' +
      '<div class="ch38-card"><h3>道德审判</h3><p>把女性是否主动、是否谈亲密话题，和人品、价值、是否值得被尊重错误绑定。</p></div>' +
      '<div class="ch38-card"><h3>双标式评价</h3><p>男性主动被称为有魅力，女性主动却被怀疑动机；这种双标会直接压低真实表达。</p></div>' +
      '<div class="ch38-card"><h3>隐私传播</h3><p>把暧昧细节、聊天截图、亲密经历拿去炫耀，是最破坏安全感的行为之一。</p></div>' +
      '</div></section>' +
      '<section id="表达成本" class="ch38-section"><div class="ch38-section-banner"><span>02</span><div><h2>二、女性为什么不主动：主动表达的五种成本</h2><p>很多“不主动”不是冷漠，而是风险评估。她需要确认主动之后不会失去尊重和选择权。</p></div></div><div class="ch38-flow-map"><div><b>被评价</b><span>担心一句主动邀约被贴上不矜持的标签。</span></div><div><b>被误读</b><span>担心普通好感被理解成可以快速越界。</span></div><div><b>被传播</b><span>担心聊天截图、约会细节成为别人谈资。</span></div><div><b>被反咬</b><span>担心拒绝升级后被说“是你先主动的”。</span></div><div><b>被推进</b><span>担心一旦表达兴趣，就被要求立刻进入更亲密阶段。</span></div></div><div class="ch38-summary"><strong>关键判断：</strong>如果主动的代价是失去尊重，沉默就是理性选择；如果主动之后仍然安全，关系才会更自然流动。</div></section>' +
      '<section id="安全框架" class="ch38-section"><div class="ch38-section-banner"><span>03</span><div><h2>三、安全表达空间框架：让她敢表达，也敢拒绝</h2><p>安全不是口头保证，而是由语言、节奏、隐私、拒绝和反馈共同组成的稳定体验。</p></div></div><div class="ch38-card-grid">' +
      '<div class="ch38-card"><h3>语言安全</h3><p>不用羞辱词、不拿主动开玩笑、不把欲望和人品绑定。她表达兴趣时，先感谢和接住。</p></div>' +
      '<div class="ch38-card"><h3>节奏安全</h3><p>表达好感不等于同意快速升级。推进前确认舒适度，允许慢一点、停一下、改天再说。</p></div>' +
      '<div class="ch38-card"><h3>隐私安全</h3><p>不截图传播、不和朋友炫耀细节、不拿亲密经历证明自己厉害。</p></div>' +
      '<div class="ch38-card"><h3>拒绝安全</h3><p>她可以改变主意、可以拒绝下一步。成熟回应是尊重，而不是追问、冷脸或报复。</p></div>' +
      '<div class="ch38-card"><h3>反馈安全</h3><p>她说不舒服时，你能调整动作，而不是辩论“我又没恶意”。</p></div>' +
      '<div class="ch38-card"><h3>口碑安全</h3><p>你平时如何评价女性，会决定她是否相信你能尊重她的主动。</p></div>' +
      '</div></section>' +
      '<section id="信号灯" class="ch38-section"><div class="ch38-section-banner"><span>04</span><div><h2>四、边界信号灯：什么时候可以推进，什么时候必须停</h2><p>主动表达不是无限许可。判断边界，要看持续、清晰、舒适的反馈。</p></div></div><div class="ch38-signal-grid"><div class="ch38-signal-green"><h3>绿灯：可以自然延续</h3><ul><li>她主动提出时间、地点或下一次见面。</li><li>她回应放松，会补充自己的想法和偏好。</li><li>你确认舒适度时，她给出清晰正向反馈。</li></ul></div><div class="ch38-signal-yellow"><h3>黄灯：放慢确认</h3><ul><li>她有兴趣，但反复强调慢一点、别太晚、别太私密。</li><li>她身体或语言有犹豫，回答变短。</li><li>她主动后又收回，需要更多安全感。</li></ul></div><div class="ch38-signal-red"><h3>红灯：立刻停止</h3><ul><li>她明确说不、不要、不方便、不舒服。</li><li>她沉默、躲避、僵住或试图离开。</li><li>她拒绝后你想用情绪、道德或关系压力逼她改变。</li></ul></div></div></section>' +
      '<section id="场景库" class="ch38-section"><div class="ch38-section-banner"><span>05</span><div><h2>五、高频场景库：接住主动，但不制造压力</h2><p>下面的重点不是背台词，而是训练一种姿态：我看见你的主动，也保护你的边界。</p></div></div><div class="ch38-scene-grid">' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">01</span><h3>她主动开启话题</h3><p><b>错误：</b>立刻调侃“怎么突然想我了？”让她尴尬。</p><p><b>成熟：</b>“刚好我也想跟你聊会儿。你今天状态怎么样？”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">02</span><h3>她主动邀约</h3><p><b>错误：</b>自我膨胀，暗示她很迫不及待。</p><p><b>成熟：</b>“好，我挺开心你提出来。我们找个舒服的地方，时间你也方便为主。”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">03</span><h3>她表达好感</h3><p><b>错误：</b>马上要求确认关系或更亲密承诺。</p><p><b>成熟：</b>“听到你这样说我很开心。我也对你有好感，我们可以慢慢把相处变得更清楚。”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">04</span><h3>她靠近但保持边界</h3><p><b>错误：</b>觉得她都主动了，就应该继续升级。</p><p><b>成熟：</b>“这样你舒服吗？如果想慢一点我们就慢一点。”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">05</span><h3>她谈亲密/性话题</h3><p><b>错误：</b>用下流玩笑测试底线，或把话题截图给朋友。</p><p><b>成熟：</b>保持尊重和私密：“这个话题我们可以聊，但我会注意分寸，你不想继续也可以停。”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">06</span><h3>她主动后又犹豫</h3><p><b>错误：</b>追问“你到底什么意思？”</p><p><b>成熟：</b>“没关系，你不用马上决定。我们按你舒服的节奏来。”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">07</span><h3>她拒绝进一步升级</h3><p><b>错误：</b>冷脸、阴阳怪气，或说“不是你先主动的吗？”</p><p><b>成熟：</b>“没问题，谢谢你直接说。我们停在你舒服的位置。”</p></div>' +
      '<div class="ch38-scene-card"><span class="ch38-scene-index">08</span><h3>她试探你是否尊重她</h3><p><b>错误：</b>急着证明“我不是那种人”，却继续开越界玩笑。</p><p><b>成熟：</b>“你的担心有道理。你主动表达不会影响我尊重你，我也不会把我们的事拿出去说。”</p></div>' +
      '</div></section>' +
      '<section id="话术实验室" class="ch38-section"><div class="ch38-section-banner"><span>06</span><div><h2>六、话术实验室：把羞辱性反应改成成熟回应</h2><p>真正有吸引力的回应，是既表达兴趣，又不让对方承担压力。</p></div></div><div class="ch38-compare"><div class="ch38-box-wrong"><h3>错误示范</h3><ul><li>“你这么主动啊，看来挺会。”</li><li>“都约我了，别装矜持了。”</li><li>“你放心，我不会跟别人说太多。”</li><li>“你拒绝就没意思了，刚才不是你先撩的吗？”</li></ul></div><div class="ch38-box-right"><h3>成熟回应</h3><ul><li>“你主动说这个我挺开心，也谢谢你信任我。”</li><li>“我们可以往前走一点，但任何时候你不舒服都可以停。”</li><li>“我们的聊天和相处我会保护隐私，不会拿出去当谈资。”</li><li>“你可以改变主意，我尊重你的节奏。”</li></ul></div></div><div class="ch38-script-list"><div class="ch38-script-card"><h3>接住邀约</h3><p>“好，我来安排一个舒服、方便回家的地方。你如果想早点结束也没问题。”</p></div><div class="ch38-script-card"><h3>确认边界</h3><p>“我对你有兴趣，但我不想让你有压力。这样继续你舒服吗？”</p></div><div class="ch38-script-card"><h3>回应拒绝</h3><p>“没关系，谢谢你直接说。我们停一下，照顾你的感受更重要。”</p></div><div class="ch38-script-card"><h3>保护隐私</h3><p>“我们的互动只属于我们，不会变成我和别人炫耀的内容。”</p></div></div></section>' +
      '<section class="ch38-section"><div class="ch38-section-banner"><span>07</span><div><h2>七、自测与训练：把尊重变成稳定习惯</h2><p>反羞辱不是政治正确口号，而是日常动作训练。</p></div></div><div class="ch38-card-grid"><div class="ch38-card"><h3>羞辱词自查</h3><p>列出你曾经用过的“随便、装、不矜持、经验多”等词，改写成不评价人格的描述。</p></div><div class="ch38-card"><h3>话术改写</h3><p>把一句调侃式羞辱改成“感谢主动 + 表达兴趣 + 给边界”的三段式回应。</p></div><div class="ch38-card"><h3>隐私边界检查</h3><p>检查自己是否传播过截图、细节或评价；从今天起建立“不把亲密当战绩”的规则。</p></div><div class="ch38-card"><h3>拒绝后反应训练</h3><p>模拟三次被拒绝后的体面回应，重点是不追问、不冷脸、不惩罚。</p></div><div class="ch38-card"><h3>口碑建设清单</h3><p>在朋友局里停止贬低女性主动，遇到他人传播隐私时不附和、不扩散。</p></div><div class="ch38-card"><h3>复盘问题</h3><p>她在我面前能不能表达喜欢？能不能说不？说不之后我是否依然尊重她？</p></div></div></section>' +
      '<section class="ch38-section"><div class="ch38-summary"><h2>延伸阅读</h2><p>把本章和这些章节一起看，会形成更完整的关系底盘：<a href="#/a/ch33">亲密关系中的边界与尊重</a>、<a href="#/a/ch34">男性沟通表达能力</a>、<a href="#/a/ch19">浪漫升级与肢体接触边界</a>、<a href="#/a/ch31">聊天素材与话题库</a>、<a href="#/a/ch32">案例拆解</a>。</p><strong>最终原则：</strong>让女性更主动，不是诱导她放下边界，而是证明她表达兴趣后仍然会被认真、温柔、体面地对待。</div></section></article>';
  }

'''
    js = js.replace(marker, insert + marker)
if "if (id === 'ch38') return richCh38Html();" not in js:
    js = js.replace("  function richPracticeHtml(id) {\n", "  function richPracticeHtml(id) {\n    if (id === 'ch38') return richCh38Html();\n")
extra.write_text(js, encoding='utf-8')

css_text = css.read_text(encoding='utf-8')
if "/* ch38 反荡妇羞辱与主动表达 */" not in css_text:
    css_text += r'''

/* ch38 反荡妇羞辱与主动表达 */
.wiki-article__body .ch38-article {
  --ch38-primary: #2f5d50;
  --ch38-accent: #c98a3f;
  --ch38-ink: #263b34;
  --ch38-soft: #f7efe2;
  color: var(--wiki-text);
  min-width: 0;
  overflow-wrap: anywhere;
}

.wiki-article__body .ch38-mobile-nav {
  position: sticky;
  top: 72px;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 22px;
  padding: 10px;
  border: 1px solid rgba(47, 93, 80, .12);
  border-radius: 18px;
  background: rgba(255, 253, 248, .92);
  backdrop-filter: blur(12px);
}

.wiki-article__body .ch38-mobile-nav a,
.wiki-article__body .ch38-hero-actions a {
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(47, 93, 80, .09);
  color: var(--ch38-primary);
  text-decoration: none;
  font-size: 13px;
  font-weight: 800;
}

.wiki-article__body .ch38-hero {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 22px;
  align-items: stretch;
  margin: 0 0 18px;
  padding: clamp(24px, 5vw, 42px);
  border: 1px solid rgba(47, 93, 80, .16);
  border-radius: 30px;
  background:
    radial-gradient(circle at 88% 12%, rgba(201, 138, 63, .24), transparent 34%),
    radial-gradient(circle at 8% 90%, rgba(47, 93, 80, .12), transparent 32%),
    linear-gradient(135deg, rgba(255, 253, 248, .98), rgba(247, 239, 226, .9) 48%, rgba(237, 247, 241, .96));
  box-shadow: 0 22px 56px rgba(47, 39, 27, .09);
}

.wiki-article__body .ch38-hero::after {
  content: 'SAFE EXPRESSION';
  position: absolute;
  right: -18px;
  bottom: 6px;
  color: rgba(47, 93, 80, .055);
  font-size: clamp(40px, 8vw, 88px);
  font-weight: 950;
  letter-spacing: -.08em;
  line-height: 1;
}

.wiki-article__body .ch38-kicker {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(47, 93, 80, .10);
  color: var(--ch38-primary);
  font-size: 13px;
  font-weight: 900;
  letter-spacing: .04em;
}

.wiki-article__body .ch38-hero h2 {
  margin: 0 0 12px;
  color: var(--ch38-ink);
  font-size: clamp(30px, 5vw, 48px);
  line-height: 1.1;
  letter-spacing: -.05em;
}

.wiki-article__body .ch38-lead {
  max-width: 780px;
  margin: 0;
  color: #52635b;
  font-size: 17px;
  line-height: 1.9;
}

.wiki-article__body .ch38-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.wiki-article__body .ch38-hero-card {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 22px;
  border: 1px solid rgba(47, 93, 80, .14);
  border-radius: 24px;
  background: rgba(255, 255, 255, .72);
  box-shadow: 0 16px 36px rgba(47, 39, 27, .07);
}

.wiki-article__body .ch38-hero-card strong {
  color: var(--ch38-primary);
  font-size: 22px;
}

.wiki-article__body .ch38-hero-card span {
  color: #5f6f68;
  line-height: 1.7;
}

.wiki-article__body .ch38-dashboard {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0 28px;
}

.wiki-article__body .ch38-dashboard div,
.wiki-article__body .ch38-card,
.wiki-article__body .ch38-scene-card,
.wiki-article__body .ch38-script-card {
  border: 1px solid rgba(47, 93, 80, .12);
  background: linear-gradient(180deg, rgba(255,255,255,.92), rgba(250,246,238,.82));
  box-shadow: 0 14px 34px rgba(47, 39, 27, .055);
}

.wiki-article__body .ch38-dashboard div {
  padding: 16px;
  border-radius: 20px;
}

.wiki-article__body .ch38-dashboard b {
  display: block;
  color: var(--ch38-primary);
  font-size: 24px;
  line-height: 1;
}

.wiki-article__body .ch38-dashboard span {
  display: block;
  margin-top: 8px;
  color: #64736d;
  font-size: 13px;
}

.wiki-article__body .ch38-section {
  margin: 34px 0;
}

.wiki-article__body .ch38-section h2,
.wiki-article__body .ch38-section h3 {
  color: var(--ch38-ink);
}

.wiki-article__body .ch38-section-banner {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  margin-bottom: 16px;
}

.wiki-article__body .ch38-section-banner > span {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--ch38-primary), #4f7a6d);
  color: white;
  font-weight: 900;
}

.wiki-article__body .ch38-section-banner h2 {
  margin: 0 0 6px;
  font-size: clamp(22px, 3vw, 30px);
}

.wiki-article__body .ch38-section-banner p {
  margin: 0;
  color: #64736d;
  line-height: 1.8;
}

.wiki-article__body .ch38-card-grid,
.wiki-article__body .ch38-scene-grid,
.wiki-article__body .ch38-script-list,
.wiki-article__body .ch38-signal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.wiki-article__body .ch38-card,
.wiki-article__body .ch38-scene-card,
.wiki-article__body .ch38-script-card {
  position: relative;
  padding: 18px;
  border-radius: 22px;
}

.wiki-article__body .ch38-card h3,
.wiki-article__body .ch38-scene-card h3,
.wiki-article__body .ch38-script-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
}

.wiki-article__body .ch38-card p,
.wiki-article__body .ch38-scene-card p,
.wiki-article__body .ch38-script-card p {
  margin: 0 0 8px;
  color: #56665f;
  line-height: 1.78;
}

.wiki-article__body .ch38-flow-map {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  margin: 16px 0;
}

.wiki-article__body .ch38-flow-map div {
  padding: 16px;
  border-radius: 20px;
  background: #fffaf1;
  border: 1px solid rgba(201, 138, 63, .18);
}

.wiki-article__body .ch38-flow-map b {
  display: block;
  margin-bottom: 8px;
  color: #9b6530;
}

.wiki-article__body .ch38-flow-map span {
  color: #62594d;
  font-size: 14px;
  line-height: 1.65;
}

.wiki-article__body .ch38-scene-index {
  display: inline-flex;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(47, 93, 80, .10);
  color: var(--ch38-primary);
  font-size: 12px;
  font-weight: 900;
}

.wiki-article__body .ch38-compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 16px 0;
}

.wiki-article__body .ch38-box-wrong,
.wiki-article__body .ch38-box-right,
.wiki-article__body .ch38-signal-green,
.wiki-article__body .ch38-signal-yellow,
.wiki-article__body .ch38-signal-red,
.wiki-article__body .ch38-summary {
  padding: 20px;
  border-radius: 24px;
  line-height: 1.8;
}

.wiki-article__body .ch38-box-wrong {
  border: 1px solid rgba(190, 70, 58, .20);
  background: #fff3f0;
}

.wiki-article__body .ch38-box-right {
  border: 1px solid rgba(47, 93, 80, .18);
  background: #eef8f2;
}

.wiki-article__body .ch38-box-wrong h3 { color: #9a3c32; }
.wiki-article__body .ch38-box-right h3 { color: var(--ch38-primary); }

.wiki-article__body .ch38-signal-green { border: 1px solid rgba(47, 120, 80, .18); background: #eef8f2; }
.wiki-article__body .ch38-signal-yellow { border: 1px solid rgba(201, 138, 63, .22); background: #fff8e8; }
.wiki-article__body .ch38-signal-red { border: 1px solid rgba(190, 70, 58, .20); background: #fff3f0; }

.wiki-article__body .ch38-signal-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.wiki-article__body .ch38-signal-grid h3 {
  margin-top: 0;
}

.wiki-article__body .ch38-summary {
  margin-top: 16px;
  border: 1px solid rgba(47, 93, 80, .14);
  background:
    radial-gradient(circle at top right, rgba(201, 138, 63, .15), transparent 34%),
    rgba(255, 253, 248, .92);
  color: #4f5f58;
}

.wiki-article__body .ch38-summary h2 {
  margin-top: 0;
}

.wiki-article__body .ch38-summary a {
  color: var(--ch38-primary);
  font-weight: 800;
}

@media (max-width: 980px) {
  .wiki-article__body .ch38-hero,
  .wiki-article__body .ch38-dashboard,
  .wiki-article__body .ch38-flow-map,
  .wiki-article__body .ch38-signal-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .wiki-article__body .ch38-mobile-nav {
    position: static;
  }

  .wiki-article__body .ch38-hero,
  .wiki-article__body .ch38-dashboard,
  .wiki-article__body .ch38-card-grid,
  .wiki-article__body .ch38-scene-grid,
  .wiki-article__body .ch38-script-list,
  .wiki-article__body .ch38-signal-grid,
  .wiki-article__body .ch38-compare,
  .wiki-article__body .ch38-flow-map,
  .wiki-article__body .ch38-section-banner {
    grid-template-columns: 1fr;
  }

  .wiki-article__body .ch38-hero {
    padding: 22px;
    border-radius: 24px;
  }
}
'''
css.write_text(css_text, encoding='utf-8')

idx = index.read_text(encoding='utf-8')
idx = idx.replace('css/extra-columns.css?v=20260608-rich23v2', 'css/extra-columns.css?v=20260608-ch38')
idx = idx.replace('data/extra-columns.js?v=20260608-practice28', 'data/extra-columns.js?v=20260608-ch38')
index.write_text(idx, encoding='utf-8')
