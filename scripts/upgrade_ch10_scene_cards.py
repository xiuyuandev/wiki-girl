from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
p = root / 'data' / 'content.js'
text = p.read_text(encoding='utf-8')
ch10 = text.index("  'ch10': {")
start = text.index('  <section id="scenes">', ch10)
end = text.index('  </section>\n\n  <section id="mistakes">', start) + len('  </section>\n')
section = text[start:end]

card_re = re.compile(
    r'    <div class="ch10-scene-card">\n'
    r'      <div class="ch10-scene-index">(\d+)</div>\n'
    r'      <div class="ch10-scene-content">\n'
    r'        <div class="ch10-scene-head"><h3>(.*?)</h3><span>(.*?)</span></div>\n'
    r'        <div class="ch10-scene-tags"><span>(.*?)</span><span>(.*?)</span></div>\n'
    r'        <div class="ch10-scene-why"><b>她表面在问：</b>(.*?)<br><b>她真正想确认：</b>(.*?)</div>\n'
    r'        <div class="ch10-scene-mind"><b>直男先这样想：</b>(.*?)</div>\n'
    r'        <div class="test-compare"><div class="test-box wrong"><div class="test-label">❌ 直男常犯错误</div><p>(.*?)</p><small>.*?</small></div><div class="test-box right"><div class="test-label">✅ 成熟回应核心</div><p>(.*?)</p><small>.*?</small></div></div>\n'
    r'        <div class="ch10-copy-box">.*?</div>\n'
    r'        <div class="ch10-action-grid"><div><b>表情 / 语气</b><p>(.*?)</p></div><div><b>下一步动作</b><p>(.*?)</p></div></div>\n'
    r'        <p class="ch10-tip"><b>记住：</b>(.*?)</p>\n'
    r'      </div>\n'
    r'    </div>',
    re.S
)

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def clean(s):
    return re.sub(r'\s+', ' ', re.sub(r'<.*?>', '', s)).strip()

def ensure_period(s):
    s = clean(s)
    return s if s.endswith(('。','！','？')) else s + '。'

def trigger(title, cat):
    mapping = [
        (['收入'], '“你一个月赚多少？” / “你收入稳定吗？” / “以后生活压力你怎么想？”'),
        (['房车'], '“你有房有车吗？” / “你以后会买房吗？” / “你怎么看这些现实条件？”'),
        (['为什么还单身'], '“你条件也不差，怎么一直单身？” / “是不是有什么问题？”'),
        (['很会撩'], '“你是不是对女生都这样？” / “你是不是很会撩？”'),
        (['只想玩玩'], '“你是不是只想暧昧？” / “你是不是不想认真？”'),
        (['不回消息'], '她几个小时不回 / 只读不回 / 话题突然断掉'),
        (['冷淡'], '“嗯。” / “哦。” / 回复变慢、变短、没表情'),
        (['取消约会'], '“今天不太方便。” / “我临时有事。” / “下次吧。”'),
        (['接她'], '“你来接我吧。” / “我不想自己过去。”'),
        (['买礼物'], '“别人男朋友都会送。” / “你怎么没表示？”'),
        (['红包'], '“发个红包看看诚意。” / “节日你不表示一下吗？”'),
        (['前任'], '“你前任是什么样的人？” / “你们为什么分手？”'),
        (['异性朋友'], '“你身边女生多吗？” / “你和她只是朋友？”'),
        (['查手机'], '“手机给我看看。” / “你是不是有什么不能让我看的？”'),
        (['分手'], '“那就分手吧。” / “你不这样做就是不爱我。”'),
        (['工作'], '“你工作这么忙，还有时间谈恋爱吗？”'),
        (['未来'], '“你以后有什么打算？” / “你是过一天算一天的人吗？”'),
        (['父母'], '“你父母会不会管很多？” / “以后你听谁的？”'),
        (['彩礼'], '“你怎么看彩礼？” / “你愿意为结婚付出多少？”'),
        (['AA'], '“你是不是想 AA？” / “约会谁付钱？”'),
        (['借钱'], '“你能不能先借我一点？” / “我最近周转不开。”'),
        (['情绪'], '她语气变重 / 抱怨很多 / 明显不开心'),
        (['没事'], '“没事。” / “随便。” / “你不用管我。”'),
        (['秒回'], '“你为什么不秒回？” / “你是不是不重视我？”'),
        (['报备'], '“你去哪都要告诉我。” / “你跟谁在一起？”'),
        (['美女'], '“你刚刚是不是看她了？” / “她好看吗？”'),
    ]
    for keys, val in mapping:
        if any(k in title for k in keys):
            return val
    if '微信' in cat:
        return '她回复变短、变慢，或者突然丢出一句带情绪的话。'
    if '现实' in cat:
        return '她开始问工作、钱、生活规划、消费习惯、家庭条件。'
    if '异性' in cat:
        return '她开始问前任、异性朋友、社交边界、你对其他女生的态度。'
    if '红线' in cat:
        return '她用威胁、羞辱、控制、冷暴力等方式逼你让步。'
    return '她丢出一句让你紧张、想解释、想证明自己的话。'

def why_text(title, cat):
    if '红线' in cat:
        return '这类回应不是为了哄好她，而是先保护自己的尊严和安全。你越卑微退让，对方越可能继续越界。'
    if '现实' in cat:
        return '成熟感来自“真实 + 稳定 + 有计划”。你不需要装富，也不要把现实问题都理解成攻击。'
    if '微信' in cat:
        return '你没有追问、连发、求关注，而是把节奏放稳。稳定的人不会因为一条消息就崩盘。'
    if '情绪' in cat:
        return '先接情绪会让对方感觉被理解；再表达边界，能避免你变成无底线情绪垃圾桶。'
    if '异性' in cat:
        return '你既没有心虚乱解释，也没有反咬她多疑，而是把异性边界说清楚。'
    if '邀约' in cat:
        return '你表达了理解，也保护了自己的时间。这样的回应比讨好式“都可以”更有分寸。'
    return '这句话的重点不是漂亮，而是顺序正确：先承认她的感受，再表达你的立场，最后给出下一步。'

def variants(title, cat, right):
    right = ensure_period(right)
    if '红线' in cat:
        return (
            '我能理解你有情绪，但威胁、羞辱或伤害不是解决问题的方式。',
            right,
            '如果我们现在都很激动，先暂停；等能好好说话再继续。'
        )
    if '现实' in cat:
        return (
            right,
            '我现在不一定完美，但工作、消费和未来规划都比较稳定，也愿意把日子越过越好。',
            '具体隐私我不想刚认识就全摊开，但我的态度是真实、不装、不乱承诺。'
        )
    if '微信' in cat:
        return (
            '你先忙，等你有空我们再聊。',
            right,
            '如果你最近状态不太想聊也没关系，我们不用硬聊。'
        )
    if '异性' in cat:
        return (
            right,
            '我能理解你会在意边界，我也会注意分寸，不做让关系不舒服的事。',
            '正常朋友可以有，但暧昧、隐瞒、越界我不会接受，也不会去做。'
        )
    if '情绪' in cat:
        return (
            '我听出来你现在不太舒服，我先不急着反驳。',
            right,
            '我愿意听你说，但如果变成指责和发泄，我们先停一下。'
        )
    if '邀约' in cat:
        return (
            right,
            '我可以配合合理安排，但我的时间也需要被尊重，我们提前确认会更好。',
            '如果临时变动太频繁，我会重新安排自己的计划。'
        )
    return (
        right,
        '我理解你为什么会这样问，我的态度是认真了解，不靠嘴上保证。',
        '这个问题我们可以慢慢看，不用靠一句话定生死。'
    )

def follow_question(title, cat):
    if '现实' in cat:
        return '“你更看重现在的条件，还是一个人的规划、稳定和消费习惯？”'
    if '微信' in cat:
        return '“你最近是比较忙，还是对我们的聊天节奏不太舒服？”'
    if '异性' in cat:
        return '“你觉得恋爱里什么样的异性边界会让你安心？”'
    if '情绪' in cat:
        return '“你现在更想让我听你说，还是想一起想办法？”'
    if '邀约' in cat:
        return '“那我们下次提前一天确认时间，可以吗？”'
    if '红线' in cat:
        return '“我们能不能用不伤害彼此的方式把话说清楚？”'
    return '“你问这个，是更在意态度，还是更在意结果？”'

cards=[]
for m in card_re.finditer(section):
    idx,title,cat,stage,level,surface,wants,mind,wrong,right,tone,next_action,tip = [clean(x) for x in m.groups()]
    v1,v2,v3 = variants(title, cat, right)
    card=f'''    <div class="ch10-scene-card">
      <div class="ch10-scene-index">{idx}</div>
      <div class="ch10-scene-content">
        <div class="ch10-scene-head"><h3>{esc(title)}</h3><span>{esc(cat)}</span></div>
        <div class="ch10-scene-tags"><span>{esc(stage)}</span><span>{esc(level)}</span></div>
        <div class="ch10-trigger"><b>她可能这样说：</b><p>{esc(trigger(title, cat))}</p></div>
        <div class="ch10-scene-why"><b>她表面在问：</b>{esc(surface)}<br><b>她真正想确认：</b>{esc(wants)}</div>
        <div class="ch10-scene-mind"><b>直男先这样想：</b>{esc(mind)}</div>
        <div class="test-compare"><div class="test-box wrong"><div class="test-label">❌ 直男常犯错误</div><p>{esc(wrong)}</p><small>问题：一紧张就解释、讨好、反击或过度承诺，让自己显得不稳。</small></div><div class="test-box right"><div class="test-label">✅ 成熟回应核心</div><p>{esc(right)}</p><small>关键：先接住她在意的点，再表达自己，最后留一个合理选择。</small></div></div>
        <div class="ch10-copy-box"><b>三种可直接套用的话术：</b><ol><li><strong>轻松版：</strong>{esc(v1)}</li><li><strong>真诚版：</strong>{esc(v2)}</li><li><strong>边界版：</strong>{esc(v3)}</li></ol></div>
        <p class="ch10-explain"><b>为什么这样回：</b>{esc(why_text(title, cat))}</p>
        <div class="ch10-action-grid"><div><b>表情 / 语气</b><p>{esc(tone)}</p></div><div><b>后续怎么接一句</b><p>{esc(follow_question(title, cat))}</p></div><div><b>下一步动作</b><p>{esc(next_action)}</p></div><div><b>禁忌提醒</b><p>{esc(tip)}</p></div></div>
        <p class="ch10-tip"><b>使用条件：</b>如果她只是正常了解，你稳稳回应；如果她持续羞辱、控制、威胁，就不要把这当“考验”，要设边界甚至退出。</p>
      </div>
    </div>'''
    cards.append(card)

if len(cards) != 81:
    raise SystemExit(f'parsed {len(cards)} cards')
new_section='''  <section id="scenes">
    <h2>80 个高频实战场景手册</h2>
    <div class="ch10-note"><strong>使用方法：</strong>这版不是让直男“看懂道理”就完了，而是让他能直接模仿。每张卡都按：触发语 → 她真正想确认什么 → 直男容易想错什么 → 错误示范 → 三种可照抄话术 → 为什么这样回 → 后续怎么接。先照抄，再慢慢内化。</div>

'''+'\n\n'.join(cards)+'\n  </section>\n'
text=text[:start]+new_section+text[end:]
p.write_text(text, encoding='utf-8')
print('ok', len(cards))
