from pathlib import Path

path = Path('data/content.js')
text = path.read_text(encoding='utf-8')
start = text.index("  'ch20': {")
end = text.index("  'ch21': {", start)
new_block = r'''  'ch20': {
    title: '失败复盘室',
    lead: '专为直男设计的失败复盘专栏：不甩锅、不自责、不纠缠，把每一次没聊成、没约成、没推进，拆成下一次能改的具体动作。',
    chapterNum: '20',
    html: `
<article class="ch20-review-room">
  <section class="ch20-hero-card">
    <p class="ch20-eyebrow">REVIEW ROOM · 直男专用复盘系统</p>
    <h2>先记住一句话：失败不是你不配，而是你的动作需要升级</h2>
    <p>很多直男追女生失败后，会走两个极端：要么觉得“女人都现实”“我没钱没颜没戏”，要么疯狂反省到自卑，觉得自己每句话都错。真正成熟的复盘不是骂自己，也不是怪女生，而是把过程当成一次数据回放：哪里太急、哪里没看懂反馈、哪里越界、哪里没有展示价值、哪里该收住却继续追。</p>
    <div class="ch20-hero-grid">
      <div><strong>不复盘的人</strong><span>下次换一个女生，继续同样失败。</span></div>
      <div><strong>乱复盘的人</strong><span>越想越自卑，最后不敢主动。</span></div>
      <div><strong>会复盘的人</strong><span>每次只改一个动作，慢慢变稳。</span></div>
    </div>
  </section>

  <section>
    <h2>一、失败复盘的底层原则</h2>
    <div class="ch20-principle-grid">
      <div><h3>1. 只复盘可控项</h3><p>女生喜不喜欢你、她有没有前任、她最近忙不忙，这些你控制不了。你能控制的是：开场方式、聊天频率、邀约清晰度、情绪稳定度、边界感、生活状态。</p></div>
      <div><h3>2. 不把拒绝等于羞辱</h3><p>她不喜欢你，不代表你低价值；只能说明当前吸引、时机、匹配度或相处体验不够。直男最容易把拒绝理解成“我被否定了”，于是解释、证明、纠缠，反而更掉分。</p></div>
      <div><h3>3. 用事实替代脑补</h3><p>不要复盘“她是不是嫌我穷”“她是不是故意吊我”。先看事实：她回复频率如何？有没有主动提问？是否接受见面？是否愿意投入时间？事实比猜测可靠。</p></div>
      <div><h3>4. 每次只改一个关键动作</h3><p>别一次给自己列二十条缺点。真正有效的升级是：下一次不连续发三条、下一次邀约给具体时间、下一次被拒后体面收住。动作越小，越容易改变。</p></div>
    </div>
    <div class="box box-tip"><h3>直男特别提醒</h3><p>你不是来学“套路女人”的，你是来修正自己的表达、节奏、判断和边界。你越稳定、越清晰、越有生活，女生越容易感到舒服和安全。</p></div>
  </section>

  <section>
    <h2>二、直男失败总模型：事实 → 判断 → 动作 → 结果</h2>
    <p>很多失败不是输在某一句话，而是输在连续动作。复盘时按四步拆，不要直接给自己贴标签。</p>
    <div class="ch20-flow">
      <div><b>事实</b><span>她说了什么？做了什么？回复频率怎样？有没有明确拒绝？</span></div>
      <div><b>判断</b><span>这是积极反馈、普通礼貌、冷淡、拒绝，还是边界信号？</span></div>
      <div><b>动作</b><span>你当时是推进、收住、解释、追问、讨好，还是越界？</span></div>
      <div><b>结果</b><span>关系升温、持平、降温、断联，还是你自己情绪失控？</span></div>
    </div>
    <div class="template-box"><div class="template-box-title">复盘句式</div><p>这次失败的事实是：____；我当时的判断是：____；我做出的动作是：____；结果是：____；下次我只改一个动作：____。</p></div>
  </section>

  <section>
    <h2>三、10种高频失败类型：错误动作 vs 升级动作</h2>

    <div class="ch20-case-card">
      <div class="ch20-case-num">01</div>
      <div class="ch20-case-body"><h3>刚认识就高频轰炸</h3><p><strong>典型表现：</strong>刚加微信就早安晚安、连续发日常、她没回就补一句“在忙吗”、再补一句“是不是我说错了”。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>把焦虑包装成热情，用消息数量证明喜欢。</p></div><div class="compare-card good"><h4>升级动作</h4><p>每天一到两次轻量互动，先建立舒服感；她回复短，就降频。</p></div></div><p><strong>可直接改：</strong>“今天路过一家店想起你说喜欢甜品，随手分享一下，不用急着回。”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">02</div>
      <div class="ch20-case-body"><h3>第一次邀约太含糊</h3><p><strong>典型表现：</strong>“有空出来玩啊”“哪天吃饭？”“你什么时候有时间？”看似尊重，其实把决策压力都丢给女生。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>邀约没有时间、地点、理由，对方不知道怎么接。</p></div><div class="compare-card good"><h4>升级动作</h4><p>给低压力具体选项，并允许对方拒绝或改期。</p></div></div><p><strong>可直接改：</strong>“周六下午我会去那家新开的咖啡店，你如果刚好有空，可以一起坐一小时；不方便也没关系。”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">03</div>
      <div class="ch20-case-body"><h3>表白太早，用结果压迫关系</h3><p><strong>典型表现：</strong>只聊了几天、见了一两次，就说“我喜欢你，能不能做我女朋友”。女生还没建立安全感，你已经要结果。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>用表白代替吸引，用承诺代替相处。</p></div><div class="compare-card good"><h4>升级动作</h4><p>先增加见面、共同体验、轻度暧昧，再确认关系。</p></div></div><p><strong>可直接改：</strong>“和你相处我挺放松的，想多了解你一些。下次我们再去试试那家店？”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">04</div>
      <div class="ch20-case-body"><h3>开玩笑越界，以为幽默就是冒犯</h3><p><strong>典型表现：</strong>拿身材、年龄、前任、收入、隐私开玩笑；女生不舒服了，还说“你怎么这么开不起玩笑”。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>把冒犯当幽默，把对方不舒服当矫情。</p></div><div class="compare-card good"><h4>升级动作</h4><p>幽默先自嘲、调侃场景，不碰身体、隐私、伤口。</p></div></div><p><strong>可直接改：</strong>“刚才那个玩笑有点过了，我收回。换个轻松点的话题。”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">05</div>
      <div class="ch20-case-body"><h3>被拒后纠缠解释</h3><p><strong>典型表现：</strong>她说“不太合适”，你开始长篇解释：“我其实人很好”“你再给我一次机会”“是不是我哪里做得不好”。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>把拒绝当辩论题，试图说服对方改变感受。</p></div><div class="compare-card good"><h4>升级动作</h4><p>体面接住，停止施压，保留尊严。</p></div></div><p><strong>可直接改：</strong>“明白，谢谢你直接说。相处这段时间我也挺开心的，祝你之后顺利。”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">06</div>
      <div class="ch20-case-body"><h3>只会讲自己，不会接住对方</h3><p><strong>典型表现：</strong>她说工作累，你讲自己更累；她说喜欢旅行，你马上讲你去过哪里；聊天变成个人演讲。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>急着展示价值，忽略对方感受。</p></div><div class="compare-card good"><h4>升级动作</h4><p>先回应情绪，再延展问题，最后轻轻带出自己。</p></div></div><p><strong>可直接改：</strong>“听起来你这周压力挺大。你一般是靠睡觉回血，还是出去走走会好点？”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">07</div>
      <div class="ch20-case-body"><h3>把礼貌当好感</h3><p><strong>典型表现：</strong>女生回复“哈哈”“谢谢”“下次吧”，你就以为她对你有意思，开始加码投入。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>只看一句友好回复，不看整体投入。</p></div><div class="compare-card good"><h4>升级动作</h4><p>判断是否有主动提问、主动分享、愿意见面、愿意改期。</p></div></div><p><strong>可直接改：</strong>如果连续三次都是短回复、不提问、不接邀约，就降频，把注意力放回自己生活。</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">08</div>
      <div class="ch20-case-body"><h3>过度付出，想用好换喜欢</h3><p><strong>典型表现：</strong>还没确定关系就接送、送贵礼物、随叫随到、帮她解决所有问题，最后被当成工具人。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>用牺牲换安全感，嘴上说愿意，心里期待回报。</p></div><div class="compare-card good"><h4>升级动作</h4><p>付出要匹配关系阶段，有来有回才继续加码。</p></div></div><p><strong>可直接改：</strong>“这个我可以帮你看一下，但今晚我还有自己的安排，明天给你建议。”</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">09</div>
      <div class="ch20-case-body"><h3>需求感太重，生活围着她转</h3><p><strong>典型表现：</strong>她一回消息你就秒回，她一冷淡你就失眠，她朋友圈一更新你就分析半天。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>把女生当成情绪开关，自己的生活完全失控。</p></div><div class="compare-card good"><h4>升级动作</h4><p>保持工作、运动、朋友、兴趣，让关系只是生活的一部分。</p></div></div><p><strong>可直接改：</strong>给自己设规则：不盯在线状态；不连续追问；每天至少完成一件和她无关的正事。</p></div>
    </div>

    <div class="ch20-case-card">
      <div class="ch20-case-num">10</div>
      <div class="ch20-case-body"><h3>失败后立刻否定自己</h3><p><strong>典型表现：</strong>一次没约成，就想“我太差了”“再也不主动了”。这不是复盘，是情绪化退缩。</p><div class="compare-grid"><div class="compare-card bad"><h4>错误动作</h4><p>把单次结果上升成人生结论。</p></div><div class="compare-card good"><h4>升级动作</h4><p>承认难受，但只提炼一个可改动作。</p></div></div><p><strong>可直接改：</strong>“这次没成，我难受是正常的。但我只改一件事：下次邀约说清时间地点，不再含糊。”</p></div>
    </div>
  </section>

  <section>
    <h2>四、失败信号分级：什么时候该推进，什么时候该收住</h2>
    <div class="ch20-signal-grid">
      <div class="green"><h3>绿灯：可以轻推</h3><ul><li>她会主动问你问题。</li><li>她会分享生活细节。</li><li>她拒绝一次但主动给替代时间。</li><li>见面后仍愿意继续聊天。</li></ul><p><strong>动作：</strong>轻度邀约、增加共同体验。</p></div>
      <div class="yellow"><h3>黄灯：先观察</h3><ul><li>回复还算礼貌，但很少主动。</li><li>聊天能接住，但不延展。</li><li>邀约说“最近忙”，没有替代方案。</li><li>她情绪不稳定或刚结束关系。</li></ul><p><strong>动作：</strong>降频，不急着表态，观察一到两轮。</p></div>
      <div class="red"><h3>红灯：必须收住</h3><ul><li>明确说“不合适”“不想发展”。</li><li>多次不回、敷衍、回避见面。</li><li>已有稳定伴侣或身份关系不对等。</li><li>你开始失控、焦虑、想纠缠。</li></ul><p><strong>动作：</strong>体面退出，停止证明自己。</p></div>
    </div>
  </section>

  <section>
    <h2>五、失败后的三种体面收尾话术</h2>
    <p>直男最需要练的不是“如何让她回头”，而是失败后还能稳住、不丢人、不消耗。下面三类话术可以直接用。</p>
    <div class="ch20-script-list">
      <div><h3>1. 对方明确拒绝</h3><p>“明白，谢谢你直接告诉我。我尊重你的想法，也祝你之后顺利。”</p><span>重点：不追问原因，不求机会。</span></div>
      <div><h3>2. 对方冷淡但没说死</h3><p>“感觉你最近状态比较忙，我就不一直打扰了。之后有机会再轻松聊。”</p><span>重点：降频，给空间，也给自己台阶。</span></div>
      <div><h3>3. 自己说错话越界</h3><p>“刚才那句话不太合适，我道歉。不是想让你马上原谅，只是把这件事说清楚。”</p><span>重点：承认具体错误，不用道歉继续索取回应。</span></div>
      <div><h3>4. 约会后对方反馈一般</h3><p>“今天谢谢你出来。我感觉有些地方自己节奏有点急，之后我会注意。你不用有压力。”</p><span>重点：承认体验，不逼对方表态。</span></div>
    </div>
  </section>

  <section>
    <h2>六、直男复盘表：每次失败只填这12项</h2>
    <div class="ch20-review-table">
      <table>
        <thead><tr><th>复盘项</th><th>你要写下来的内容</th><th>判断标准</th></tr></thead>
        <tbody>
          <tr><td>1. 关系阶段</td><td>刚认识 / 聊天中 / 第一次见面 / 暧昧 / 表白后</td><td>阶段越早，越不能重投入。</td></tr>
          <tr><td>2. 她的真实反馈</td><td>主动、礼貌、冷淡、回避、拒绝</td><td>看行动，不只看语气。</td></tr>
          <tr><td>3. 我的情绪</td><td>上头、焦虑、自卑、讨好、稳定</td><td>情绪失控时先暂停。</td></tr>
          <tr><td>4. 我的错误动作</td><td>追问 / 解释 / 秒回 / 表白早 / 玩笑越界</td><td>必须写具体动作。</td></tr>
          <tr><td>5. 是否尊重边界</td><td>有没有继续施压、打探隐私、强行推进</td><td>边界一破，吸引下降。</td></tr>
          <tr><td>6. 是否展示生活</td><td>有没有自己的工作、运动、朋友和安排</td><td>没有生活，就容易显得饥渴。</td></tr>
          <tr><td>7. 邀约是否清晰</td><td>时间、地点、理由、低压力退路</td><td>模糊邀约成功率低。</td></tr>
          <tr><td>8. 聊天比例</td><td>我讲自己多，还是也接住她</td><td>别把聊天变演讲。</td></tr>
          <tr><td>9. 是否过度付出</td><td>钱、时间、情绪劳动是否超出阶段</td><td>付出要看回馈。</td></tr>
          <tr><td>10. 退出是否体面</td><td>有没有纠缠、拉黑威胁、阴阳怪气</td><td>失败后的人品也会被看见。</td></tr>
          <tr><td>11. 下一次只改什么</td><td>写一个动作，不写一堆大道理</td><td>越具体越有效。</td></tr>
          <tr><td>12. 今日建设动作</td><td>运动、整理形象、工作推进、社交活动</td><td>把注意力拉回自己。</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <h2>七、30天失败复盘训练计划</h2>
    <div class="ch20-training">
      <div><h3>第1周：停止情绪化追问</h3><p>目标：她没回时不补刀、不问“怎么不理我”。每天练一次延迟回复，把注意力放回现实生活。</p></div>
      <div><h3>第2周：练清晰邀约</h3><p>目标：所有邀约都包含时间、地点、理由和退路。拒绝后不解释，只说“没事，下次有机会”。</p></div>
      <div><h3>第3周：练反馈判断</h3><p>目标：把女生反馈分成绿灯、黄灯、红灯。黄灯降频，红灯退出，不再靠脑补硬推。</p></div>
      <div><h3>第4周：练体面收尾</h3><p>目标：面对拒绝不崩、不怨、不纠缠。每次失败后完成复盘表，并做一件自我建设动作。</p></div>
    </div>
  </section>

  <section>
    <h2>八、最后的复盘心法</h2>
    <div class="ch20-final-card">
      <h3>真正有魅力的男人，不是从不失败，而是失败后不变形</h3>
      <p>你可以难受，但不要失控；你可以喜欢，但不要跪着；你可以主动，但不要压迫；你可以复盘，但不要自我羞辱。对直男来说，最重要的升级不是学会一句神回复，而是建立一种稳定的关系能力：看懂反馈、尊重边界、清晰表达、持续建设自己。</p>
      <ul>
        <li>失败后不骂女生，这是格局。</li>
        <li>失败后不贬低自己，这是自尊。</li>
        <li>失败后能改一个动作，这是成长。</li>
      </ul>
    </div>
  </section>
</article>
`,
  },
'''
path.write_text(text[:start] + new_block + text[end:], encoding='utf-8')
print('updated ch20 block')
