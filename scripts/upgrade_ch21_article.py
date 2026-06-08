from pathlib import Path
p = Path('data/female-types-article.js')
text = p.read_text(encoding='utf-8')
start = text.index('  const html = `')
end = text.index('`;', start) + 2
new_html = r'''  const html = `
<div class="ch21-article">
  <section class="article-hero ch21-hero">
    <p class="eyebrow">Female Communication Atlas</p>
    <h1>女性沟通倾向 Atlas</h1>
    <p class="lead">先理解，再验证；先尊重，再推进；不适配时体面退出。</p>
    <div class="hero-actions">
      <a class="hero-link" href="#/female-types">打开完整图鉴</a>
    </div>
  </section>

  <section class="article-section ch21-map-intro">
    <h2>这不是标签库，而是沟通地图</h2>
    <p>女性图鉴不用于“识破女性”，也不用于把人简化成固定类型。它帮助你把注意力从脑补、试探和上头，转回长期行为、边界、同意、适配与退出能力。</p>
    <p>真正有用的判断，不是“她是哪一类”，而是：她是否持续投入？你们的节奏是否舒服？边界是否被尊重？如果不适配，能不能体面退出？</p>
    <div class="ch21-atlas-cta"><span>完整工具页包含 22 类沟通倾向、筛选、搜索、绿黄红灯和话术库。</span><a href="#/female-types">进入完整 Atlas</a></div>
  </section>

  <section class="article-section">
    <h2>一、22类地图入口：先找“倾向”，不要急着下结论</h2>
    <div class="ch21-type-grid">
      <div><b>慢热观察</b><span>回应不快，但会持续看你的稳定性。</span></div>
      <div><b>理性边界</b><span>重视清晰、尊重和不越界。</span></div>
      <div><b>社交外放</b><span>互动热，但不等于默认暧昧。</span></div>
      <div><b>事业独立</b><span>时间稀缺，更看重效率和质量。</span></div>
      <div><b>安全感需求</b><span>需要稳定信号，但不适合被轰炸。</span></div>
      <div><b>情绪敏感</b><span>能感知细节，也容易被压迫感劝退。</span></div>
      <div><b>回避拉扯</b><span>靠近会紧张，推进必须慢且可退出。</span></div>
      <div><b>高标准筛选</b><span>看现实匹配，也看你是否尊重她的标准。</span></div>
    </div>
    <p>这些入口只是帮助你减少误判。一个真实的人可能同时有几种倾向，也会随阶段、压力和信任变化。</p>
  </section>

  <section class="article-section">
    <h2>二、绿灯 / 黄灯 / 红灯：用行为判断，不靠脑补</h2>
    <div class="ch21-light-grid">
      <div class="green"><h3>绿灯：可以温和推进</h3><ul><li>会主动补充信息、延续话题。</li><li>忙完会解释或提出替代时间。</li><li>线下见面后仍愿意继续互动。</li></ul><p><b>动作：</b>保持节奏，给具体低压力邀约。</p></div>
      <div class="yellow"><h3>黄灯：放慢观察</h3><ul><li>回复忽冷忽热，见面意愿不稳定。</li><li>只在需要情绪支持时找你。</li><li>说忙但不给任何替代方案。</li></ul><p><b>动作：</b>停止加码，给一次清晰选择，再看行动。</p></div>
      <div class="red"><h3>红灯：停止推进</h3><ul><li>明确拒绝、表达不舒服。</li><li>长期不回应或只索取资源。</li><li>涉及借钱、隐瞒关系状态、诱导越界。</li></ul><p><b>动作：</b>体面退出，不绕过拒绝。</p></div>
    </div>
  </section>

  <section class="article-section">
    <h2>三、常见误用：直男最容易栽在这里</h2>
    <div class="ch21-mistake-grid">
      <div><h3>把类型当标签</h3><p>“她是回避型，所以我得刺激她。”错。类型只能提示沟通风险，不能替你越界。</p></div>
      <div><h3>过度推断</h3><p>一次不回、一个表情、一次冷淡，不足以说明她在考验你或喜欢你。</p></div>
      <div><h3>把冷淡当挑战</h3><p>冷淡更常见的含义是没空、没兴趣、没舒适感。先降频，不要追杀。</p></div>
      <div><h3>合理化纠缠</h3><p>“她只是慢热”不能成为连发、堵人、找共同好友施压的理由。</p></div>
    </div>
  </section>

  <section class="article-section">
    <h2>四、沟通验证话术：低压力确认，不逼答案</h2>
    <div class="ch21-script-list">
      <div><b>确认节奏</b><p>“我感觉你最近节奏比较满，我们可以慢一点。你如果想聊的时候再回就好。”</p></div>
      <div><b>轻邀约</b><p>“如果你这周方便，我们可以喝杯咖啡，时间不用太长。不方便也没关系。”</p></div>
      <div><b>观察意愿</b><p>“我对你有好感，也愿意继续了解。但我也想确认一下，我们是不是都有这个意愿？”</p></div>
      <div><b>体面退出</b><p>“我感觉我们的节奏和意愿可能不太一致，我就先不继续推进了。谢谢这段时间的交流。”</p></div>
    </div>
  </section>

  <section class="article-section">
    <h2>五、使用完整图鉴的正确姿势</h2>
    <ol>
      <li>先看长期行为：连续 2-3 次互动，比单次回复更可靠。</li>
      <li>再看阶段信号：刚认识、暧昧、约会后，判断标准不同。</li>
      <li>最后用低压力话术验证：不测试、不冷暴力、不用套路逼她表态。</li>
      <li>如果出现红灯，停止推进；如果只是黄灯，降低投入并观察行动。</li>
    </ol>
    <div class="ch21-atlas-cta strong"><span>想看完整 22 类、标签筛选、案例和复盘清单：</span><a href="#/female-types">打开完整图鉴</a></div>
  </section>

  <section class="article-section highlight-box">
    <h2>最重要的边界</h2>
    <p>如果对方已经明确拒绝、长期不回应、表达不舒服，或者你发现自己必须靠操控、刺激、贬低、冷处理才能维持互动，这段关系就不值得继续推进。成熟的吸引力不是让别人失去判断，而是让彼此在清醒和安全里做选择。</p>
  </section>
</div>
`;'''
text = text[:start] + new_html + text[end:]
p.write_text(text, encoding='utf-8')
print('updated female-types-article.js')
