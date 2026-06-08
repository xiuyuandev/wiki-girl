from pathlib import Path

path = Path('data/content.js')
text = path.read_text(encoding='utf-8')
start = text.index("  'ch14': {")
end = text.index("  'ch15': {", start)
new_block = r'''  'ch14': {
    title: '分手与挽回',
    lead: '分手后最重要的不是立刻求复合，而是先稳住情绪、判断关系性质、停止错误动作。能修复就用行动修复，不能修复就体面结束，把自己重新带回正轨。',
    chapterNum: '14',
    html: `
<article class="ch14-article">
<section class="ch14-hero">
<div class="ch14-eyebrow">BREAKUP RECOVERY</div>
<h2>先记住一句话：分手后最值钱的是稳定</h2>
<p>很多直男一分手就慌：不停解释、连环消息、深夜电话、求她再给一次机会，甚至找共同朋友去劝。你以为这是深情，她感受到的往往是压力、失控和麻烦。分手后第一目标不是立刻挽回，而是先把局面从“更糟”拉回“可控”。</p>
<p>真正成熟的处理方式是：先停手，判断这次分手的性质，再决定是修复、复合还是体面退出。挽回不是把她拽回来，而是看这段关系还有没有信任基础、问题能不能被解决、双方是否还愿意重新相处。</p>
<div class="ch14-rule-grid">
<div class="ch14-rule-card"><strong>不轰炸</strong><span>消息越多，压力越大。先让关系降温。</span></div>
<div class="ch14-rule-card"><strong>不跪求</strong><span>求来的不是爱，是负担和愧疚。</span></div>
<div class="ch14-rule-card"><strong>不操控</strong><span>不卖惨、不威胁、不用礼物绑架。</span></div>
<div class="ch14-rule-card"><strong>不自毁</strong><span>睡觉、吃饭、工作、运动先保住。</span></div>
</div>
<div class="ch14-alert"><strong>直男提醒：</strong>你现在最该证明的不是“我有多爱你”，而是“我能不能稳定、尊重、承担责任”。情绪失控会把仅剩的好感消耗掉。</div>
</section>

<section>
<h2>一、分手后直男最容易犯的 10 个错误</h2>
<p>分手不是最可怕的，最可怕的是分手后连续做错动作，把本来还有余地的关系推到彻底反感。下面这些动作，先停住一半，你就已经比大多数人稳。</p>
<div class="ch14-mistake-grid">
<div class="ch14-mistake-card"><h3>1. 连环消息</h3><p>“在吗”“你回我一下”“我真的知道错了”连续轰炸，只会让她更想逃。</p><b>改法：</b><span>最多发一次体面表达，然后停。</span></div>
<div class="ch14-mistake-card"><h3>2. 深夜电话</h3><p>半夜情绪上来打电话，容易把对方拖进你的崩溃里。</p><b>改法：</b><span>先睡觉，第二天清醒再决定要不要说。</span></div>
<div class="ch14-mistake-card"><h3>3. 找朋友施压</h3><p>让共同朋友劝她，会让她感觉私人边界被侵犯。</p><b>改法：</b><span>你们的问题由你们处理，不拉第三方站队。</span></div>
<div class="ch14-mistake-card"><h3>4. 朋友圈卖惨</h3><p>发伤感歌、酒瓶、失眠文案，看似难过，实际像情绪勒索。</p><b>改法：</b><span>社交平台先安静，别公开表演痛苦。</span></div>
<div class="ch14-mistake-card"><h3>5. 送礼物补偿</h3><p>问题没解决就送礼物，容易变成“拿东西换原谅”。</p><b>改法：</b><span>先承认具体问题，再看她是否愿意沟通。</span></div>
<div class="ch14-mistake-card"><h3>6. 追问哪里不好</h3><p>“你说啊，我改还不行吗？”会把她逼成你的心理老师。</p><b>改法：</b><span>自己先复盘事实，不把责任都丢给她解释。</span></div>
<div class="ch14-mistake-card"><h3>7. 承诺式挽回</h3><p>“我以后一定改”如果没有具体动作，只是情绪口号。</p><b>改法：</b><span>说你已经开始做什么，而不是空喊保证。</span></div>
<div class="ch14-mistake-card"><h3>8. 偷看动态脑补</h3><p>她点赞谁、和谁吃饭、头像变没变，你越看越失控。</p><b>改法：</b><span>减少查看频率，把注意力拉回生活。</span></div>
<div class="ch14-mistake-card"><h3>9. 用新欢刺激</h3><p>故意晒异性、装不在乎，只会显得幼稚和报复。</p><b>改法：</b><span>真放下再开始新关系，不拿别人当工具。</span></div>
<div class="ch14-mistake-card"><h3>10. 把自责变纠缠</h3><p>你说“都是我的错”，但继续打扰她，本质还是只顾自己情绪。</p><b>改法：</b><span>真正的承担，是尊重她现在不想继续的反馈。</span></div>
</div>
</section>

<section>
<h2>二、先判断：这到底是哪一种分手</h2>
<p>不要一分手就问“还能不能挽回”。先判断性质。不同分手，对应的动作完全不一样。判断错了，情绪分手会被你推成真分手，真分手会被你纠缠成拉黑。</p>
<div class="ch14-type-grid">
<div class="ch14-type-card"><h3>情绪型分手</h3><p><strong>表现：</strong>吵架后冲动说分手，语气很重，但仍然回应、仍有情绪。</p><p><strong>核心：</strong>她要的不是你跪求，而是你听见她长期不满的点。</p><p><strong>处理：</strong>先降温，再承认具体问题，别争对错。</p></div>
<div class="ch14-type-card"><h3>耗尽型分手</h3><p><strong>表现：</strong>她很平静，说累了、不想再讲了，之前给过很多提醒。</p><p><strong>核心：</strong>不是一件事，而是长期失望累积。</p><p><strong>处理：</strong>不要急着求复合，先用时间证明你真的改变了生活方式。</p></div>
<div class="ch14-type-card"><h3>原则型分手</h3><p><strong>表现：</strong>出轨、欺骗、暴力、严重不尊重、重大价值观冲突。</p><p><strong>核心：</strong>她受伤的不是情绪，而是安全感和底线。</p><p><strong>处理：</strong>先承担后果。很多情况不该挽回，只该反省和停止伤害。</p></div>
<div class="ch14-type-card"><h3>不合适型分手</h3><p><strong>表现：</strong>没有大冲突，但长期聊不到一起、生活规划差异大。</p><p><strong>核心：</strong>不是谁坏，而是不匹配。</p><p><strong>处理：</strong>体面结束比硬拖更成熟，不要把不合适改名叫“我不够好”。</p></div>
</div>
<div class="ch14-alert"><strong>判断标准：</strong>看事实，不看你舍不舍得。她是否还愿意沟通？问题是否具体？信任是否还在？你是否真能改变？这些比“我很爱她”更重要。</div>
</section>

<section>
<h2>三、分手后 72 小时急救流程</h2>
<p>分手后最容易出错的就是前三天。你情绪最重，判断最差，最想做事。越是这个时候，越要按流程走。</p>
<div class="ch14-timeline">
<div class="ch14-time"><span>0-2 小时</span><h3>停手</h3><p>不要继续争，不要解释，不要打电话。把手机放下，去洗澡、散步、喝水。你的第一任务是别做更糟的事。</p></div>
<div class="ch14-time"><span>2-24 小时</span><h3>保底生活</h3><p>吃一顿正常饭，睡觉，别喝大酒，别刷她动态。可以找一个稳重朋友说事实，不找人一起骂她。</p></div>
<div class="ch14-time"><span>24-48 小时</span><h3>写事实复盘</h3><p>写下分手前一个月发生过什么，她提醒过什么，你哪些动作让关系变重。只写事实，不写“她是不是不爱我”。</p></div>
<div class="ch14-time"><span>48-72 小时</span><h3>一次体面表达</h3><p>如果确实需要说，可以发一次短消息：承认具体问题、尊重她决定、不要求立刻回复。发完就停。</p></div>
<div class="ch14-time"><span>72 小时后</span><h3>进入恢复期</h3><p>恢复工作、运动、朋友、形象和生活秩序。你越能把自己带回来，后续越有判断力。</p></div>
</div>
</section>

<section>
<h2>四、断联不是套路，是停止负面循环</h2>
<p>很多人把断联当技巧：我消失几天，她就会想我。这个想法很危险。断联的真正意义不是操控她，而是停止你们之间的负面循环，让双方从情绪里出来。</p>
<div class="ch14-checklist">
<div><h3>什么时候需要断联</h3><ul><li>她明确说不想再聊。</li><li>你一开口就解释、求、争。</li><li>你们每次沟通都吵得更厉害。</li><li>她已经拉黑或明显回避。</li><li>你控制不住窥探和追问。</li></ul></div>
<div><h3>断联期间别做什么</h3><ul><li>别发仅她可见的朋友圈。</li><li>别找共同朋友打听她。</li><li>别用小号窥探。</li><li>别故意晒异性刺激她。</li><li>别每天倒计时等她回来。</li></ul></div>
<div><h3>断联期间该做什么</h3><ul><li>恢复睡眠、饮食和运动。</li><li>整理自己的错误动作。</li><li>把工作和学习节奏拉回来。</li><li>处理形象、房间、社交状态。</li><li>判断这段关系到底值不值得修复。</li></ul></div>
</div>
<div class="ch14-alert"><strong>一句话：</strong>断联不是冷暴力，也不是欲擒故纵。断联是你承认现在继续说只会更糟，所以先停下来。</div>
</section>

<section>
<h2>五、是否还有机会：用 6 个信号判断</h2>
<p>不要用“她有没有删我”一个指标判断全部。真正的机会来自信任、沟通、问题可修复和双方意愿。</p>
<div class="ch14-rule-grid">
<div class="ch14-rule-card"><strong>还能正常沟通</strong><span>她虽然冷淡，但没有完全拒绝基本交流。</span></div>
<div class="ch14-rule-card"><strong>问题是具体的</strong><span>比如陪伴少、沟通差、忽略感受，而不是根本价值观冲突。</span></div>
<div class="ch14-rule-card"><strong>信任没有彻底破坏</strong><span>没有严重欺骗、暴力、反复背叛。</span></div>
<div class="ch14-rule-card"><strong>她还表达情绪</strong><span>还有失望、委屈、愤怒，说明仍有未完成的沟通。</span></div>
<div class="ch14-rule-card"><strong>你能改具体动作</strong><span>不是嘴上保证，而是生活节奏、沟通方式真的能变。</span></div>
<div class="ch14-rule-card"><strong>复合后问题可解决</strong><span>不是复合三天又回到老样子。</span></div>
</div>
<p>如果这 6 个信号大部分都没有，就不要强行把“不甘心”包装成“挽回”。很多时候你想挽回的不是她，而是失去后的空洞、自尊和习惯。</p>
</section>

<section>
<h2>六、重新联系怎么开口</h2>
<p>重新联系的核心不是感动她，而是降低压力、表达承担、给她选择。话越短越稳，越长越像情绪倾倒。</p>
<div class="ch14-script-list">
<div class="ch14-script-card"><h3>体面收住</h3><p><b>别说：</b>“你别走，我真的不能没有你。”</p><p><b>换成：</b>“我尊重你的决定。之前我有些地方做得不好，我会自己消化，也不继续打扰你。”</p></div>
<div class="ch14-script-card"><h3>承认具体问题</h3><p><b>别说：</b>“我错了，我全都改。”</p><p><b>换成：</b>“我复盘了一下，之前我总是在你表达不舒服时急着解释，这点确实让你更累。”</p></div>
<div class="ch14-script-card"><h3>轻量问候</h3><p><b>别说：</b>“你最近有没有想我？”</p><p><b>换成：</b>“看到你之前提过的那个项目，想起你最近可能挺忙。希望你一切顺利，不用特意回复。”</p></div>
<div class="ch14-script-card"><h3>请求一次沟通</h3><p><b>别说：</b>“出来见一面，不见我就一直等。”</p><p><b>换成：</b>“如果你愿意，我想找个方便的时间，当面把之前的问题好好说清楚。你不方便也没关系。”</p></div>
<div class="ch14-script-card"><h3>被拒后的退场</h3><p><b>别说：</b>“你真的这么狠吗？”</p><p><b>换成：</b>“明白，我尊重你的选择。谢谢你直接告诉我，我后面不会再打扰。”</p></div>
<div class="ch14-script-card"><h3>复合前确认</h3><p><b>别说：</b>“那我们是不是和好了？”</p><p><b>换成：</b>“我不想急着把关系拉回去。我们可以先看看相处是不是比以前更舒服。”</p></div>
</div>
</section>

<section>
<h2>七、哪些情况不该挽回</h2>
<p>不是所有分手都值得修复。有些关系继续下去，只会让两个人更受伤。成熟不是永远追回来，而是知道什么时候该停。</p>
<div class="ch14-redline-grid">
<div class="ch14-redline-card"><h3>反复背叛</h3><p>出轨、欺骗、暧昧边界反复越线，而且没有真实承担。</p></div>
<div class="ch14-redline-card"><h3>暴力和威胁</h3><p>肢体暴力、言语恐吓、自伤威胁、控制行踪，都不是正常关系。</p></div>
<div class="ch14-redline-card"><h3>长期羞辱</h3><p>经常贬低你、否定你、拿你和别人比较，让你越来越自卑。</p></div>
<div class="ch14-redline-card"><h3>价值观严重冲突</h3><p>婚育、金钱、城市、家庭边界完全不一致，且没人愿意妥协。</p></div>
<div class="ch14-redline-card"><h3>她明确拒绝多次</h3><p>已经说得很清楚，不想继续、不想见、不想聊，就该停。</p></div>
<div class="ch14-redline-card"><h3>你只是害怕孤独</h3><p>你想要的不是她，而是有人陪、有人回消息、有人证明你值得。</p></div>
</div>
<div class="ch14-alert"><strong>底线：</strong>如果一段关系需要你放弃尊严、边界、健康和基本生活秩序才能维持，那不是爱情，是消耗。</div>
</section>

<section>
<h2>八、复合后怎么不再次分手</h2>
<p>复合不是大结局，而是重新试运行。很多人复合后只开心三天，然后旧问题原样回来。你要做的不是庆祝“她回来了”，而是把导致分手的问题真正修掉。</p>
<div class="ch14-checklist ch14-two-col">
<div><h3>复合后不要做</h3><ul><li>不要立刻翻旧账：“你当时怎么那么狠？”</li><li>不要每天确认：“你现在还爱我吗？”</li><li>不要用愧疚换顺从：“你都离开过我一次了。”</li><li>不要三天热情，十天后又恢复老样子。</li><li>不要把复合当作她欠你的补偿。</li></ul></div>
<div><h3>复合后要做</h3><ul><li>约定每周一次轻沟通，聊最近舒服和不舒服的点。</li><li>把过去最大的问题改成具体动作。</li><li>冲突时先暂停，不在情绪顶点做决定。</li><li>保持自己的工作、朋友和运动，不把关系当全部。</li><li>三个月后再讨论更长期的承诺。</li></ul></div>
</div>
<p>如果你之前的问题是忽略她，那就固定高质量陪伴；如果是脾气差，那就练暂停和复述；如果是不上进，那就拿出工作、学习、财务的真实变化。复合后最有用的不是情话，是稳定重复的行动。</p>
</section>

<section>
<h2>九、最后的分手复盘表</h2>
<p>每次关系结束，不要只问“她为什么不要我”。用下面这张表，把痛苦变成经验。你写得越具体，下次越不会重复同一种失败。</p>
<div class="ch14-final-sheet">
<h3>每次分手后只填这一张</h3>
<ol>
<li>这次分手的直接导火索是什么？</li>
<li>分手前一个月，她给过哪些提醒或不满？</li>
<li>我当时最错误的动作是什么：解释、逃避、冷战、讨好、控制，还是忽略？</li>
<li>这段关系的核心问题是可修复，还是长期不合适？</li>
<li>如果我要修复，我能拿出哪 3 个具体行动，而不是承诺？</li>
<li>如果她明确拒绝，我要怎样体面退出，不继续打扰？</li>
<li>接下来 30 天，我要恢复哪 3 件事：睡眠、运动、工作、朋友、形象、学习？</li>
</ol>
</div>
<div class="ch14-alert"><strong>最后记住：</strong>真正成熟的男人，不是每段关系都能挽回，而是在关系结束时不失控、不纠缠、不怨恨，也不把自己毁掉。能修复就认真修复，不能修复就带着经验继续成长。</div>
</section>
</article>
`,
  },
'''
path.write_text(text[:start] + new_block + text[end:], encoding='utf-8')
print('updated ch14 block')
