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
    r'      <div class="ch10-scene-content"><h3>(.*?)</h3><p><b>她可能真正想知道：</b>(.*?)</p>\n'
    r'        <div class="test-compare"><div class="test-box wrong"><div class="test-label">❌ 别这样回</div><p>(.*?)</p></div><div class="test-box right"><div class="test-label">✅ 可以这样回</div><p>(.*?)</p></div></div>\n'
    r'        <p class="ch10-tip"><b>提醒：</b>(.*?)</p>\n'
    r'      </div>\n'
    r'    </div>',
    re.S
)

def strip_tags(s):
    return re.sub(r'<.*?>', '', s).strip()

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def category_from_h3(h3):
    m = re.search(r'<span class="ch10-scene-cat">(.*?)</span>', h3)
    if m:
        return strip_tags(m.group(1))
    title = strip_tags(h3)
    if any(k in title for k in ['收入','房车','存款','工作','未来','彩礼','买房','礼物','红包','借钱','请客']): return '现实价值'
    if any(k in title for k in ['消息','冷淡','秒回','早安','晚安','聊天','嗯哦','半夜']): return '微信聊天'
    if any(k in title for k in ['约会','迟到','邀约','肢体','接她']): return '邀约约会'
    if any(k in title for k in ['前任','女生','异性','美女','吃醋','男生']): return '异性边界'
    if any(k in title for k in ['情绪','哭','抱怨','懂我','没事','安全感']): return '情绪安全感'
    if any(k in title for k in ['手机','报备','朋友','家人','底线','边界','工作安排']): return '边界原则'
    if any(k in title for k in ['分手','自伤','冷暴力','贬低','嘲笑','威胁']): return '红线识别'
    return '关系判断'

def stage_for(title, cat):
    if cat in ['微信聊天', '聊天质量', '真实性', '防御测试', '独特性', '动机确认'] or any(k in title for k in ['消息','聊天','撩','嘴太甜','套路']):
        return '暧昧 / 微信期'
    if cat in ['邀约约会'] or any(k in title for k in ['约会','迟到','肢体','邀约']):
        return '邀约 / 约会期'
    if cat in ['现实价值','金钱观','成长性','长期意图','婚恋价值观'] or any(k in title for k in ['收入','房','车','钱','未来','彩礼','父母']):
        return '认真了解期'
    if cat in ['红线识别','控制红线','尊重红线'] or any(k in title for k in ['威胁','冷暴力','贬低','嘲笑','远离家人']):
        return '关系风险期'
    return '暧昧到关系前'

def level_for(title, cat):
    if any(k in title for k in ['自伤','大额','冷暴力','分手','远离家人','贬低','嘲笑']):
        return '高：要设边界，必要时退出'
    if any(k in title for k in ['查手机','删异性','报备','借钱','比较','情绪爆发']):
        return '中：先稳住，再讲边界'
    return '低：轻松接住，不要过度反应'

def body_cue(title, cat):
    if any(k in title for k in ['不回','冷淡','嗯哦','秒回']):
        return '先别连环追问，停 10 分钟以上，再发一句轻松收尾。'
    if any(k in title for k in ['收入','房车','存款','工作','未来']):
        return '语气平稳，别急着自卑，也别夸大包装。'
    if any(k in title for k in ['情绪','哭','抱怨','没事','懂我']):
        return '先放慢语速，先接情绪，再问她要倾听还是建议。'
    if any(k in title for k in ['迟到','取消','推掉','接她','工作安排']):
        return '先表示理解，再说自己的安排，不要讨好式全答应。'
    if any(k in title for k in ['查手机','删异性','报备','借钱','贬低','威胁']):
        return '语气不要凶，但句子要短，边界要说清楚。'
    return '先停三秒，不解释一大堆，用一句话接住核心。'

def next_step(title, cat):
    if any(k in title for k in ['不回','冷淡','嗯哦','拒绝邀约','多次拒绝']):
        return '发完就停止追问，去做自己的事；对方有回应再继续。'
    if any(k in title for k in ['约会','迟到','取消']):
        return '把下一次时间规则说清楚：提前确认、准时、别临时变卦。'
    if any(k in title for k in ['收入','房车','存款','未来','彩礼']):
        return '补一句自己的具体计划，比继续解释更有说服力。'
    if any(k in title for k in ['情绪','哭','抱怨','没事','懂我']):
        return '等她情绪降下来后，再聊具体发生了什么。'
    if any(k in title for k in ['查手机','删异性','报备','借钱','冷暴力','威胁','贬低']):
        return '观察她是否尊重你的边界；如果反复越界，不要继续加码投入。'
    return '说完不要急着补充，给她反应空间。'

def make_versions(right):
    base = right.strip()
    soft = base
    if not soft.endswith(('。','！','？')):
        soft += '。'
    short = soft
    if len(short) > 42:
        short = short[:42].rstrip('，。；') + '。'
    follow = '如果你愿意，也可以直接告诉我你最在意的点。'
    return short, soft, follow

cards = []
for m in card_re.finditer(section):
    idx, h3, wants, wrong, right, tip = [x.strip() for x in m.groups()]
    title = strip_tags(re.sub(r'<span class="ch10-scene-cat">.*?</span>', '', h3)).strip()
    cat = category_from_h3(h3)
    stage = stage_for(title, cat)
    level = level_for(title, cat)
    short, full, follow = make_versions(strip_tags(right))
    mindset_wrong = '她不是在等你辩赢，也不是要你跪舔。你要做的是听懂需求、稳住姿态、说清边界。'
    if '红线' in level or '退出' in level:
        mindset_wrong = '这不是靠哄就能解决的普通测试。先保证安全和尊重，再判断这段关系还能不能继续。'
    elif '现实' in cat or any(k in title for k in ['收入','房车','存款','工作','未来']):
        mindset_wrong = '不要把现实问题理解成“她嫌弃我”。她更多是在看你是否靠谱、诚实、有计划。'
    elif '微信' in cat or any(k in title for k in ['消息','聊天','冷淡','秒回']):
        mindset_wrong = '不要把每条消息都当生死局。聊天的核心是节奏，不是秒回和解释。'
    elif '情绪' in cat or any(k in title for k in ['哭','抱怨','没事','懂我']):
        mindset_wrong = '她此刻大概率不是要你讲道理，而是要你先听懂她的感受。'
    card = f'''    <div class="ch10-scene-card">
      <div class="ch10-scene-index">{idx}</div>
      <div class="ch10-scene-content">
        <div class="ch10-scene-head"><h3>{esc(title)}</h3><span>{esc(cat)}</span></div>
        <div class="ch10-scene-tags"><span>{esc(stage)}</span><span>{esc(level)}</span></div>
        <div class="ch10-scene-why"><b>她表面在问：</b>{esc(title)}<br><b>她真正想确认：</b>{esc(strip_tags(wants))}</div>
        <div class="ch10-scene-mind"><b>直男先这样想：</b>{esc(mindset_wrong)}</div>
        <div class="test-compare"><div class="test-box wrong"><div class="test-label">❌ 直男常犯错误</div><p>{esc(strip_tags(wrong))}</p><small>问题：急着解释、讨好、反击或过度承诺，会让你显得不稳。</small></div><div class="test-box right"><div class="test-label">✅ 成熟回应核心</div><p>{esc(strip_tags(right))}</p><small>关键：先接住，再表达自己，最后留一个合理选择。</small></div></div>
        <div class="ch10-copy-box"><b>三句可照抄：</b><ol><li>{esc(short)}</li><li>{esc(full)}</li><li>{esc(follow)}</li></ol></div>
        <div class="ch10-action-grid"><div><b>表情 / 语气</b><p>{esc(body_cue(title, cat))}</p></div><div><b>下一步动作</b><p>{esc(next_step(title, cat))}</p></div></div>
        <p class="ch10-tip"><b>记住：</b>{esc(strip_tags(tip))}</p>
      </div>
    </div>'''
    cards.append(card)

if len(cards) < 80:
    raise SystemExit(f'only parsed {len(cards)} cards')

new_section = '''  <section id="scenes">
    <h2>80 个高频实战场景手册</h2>
    <div class="ch10-note"><strong>使用方法：</strong>这版不是让直男“看懂道理”就完了，而是让他能直接模仿。每张卡都按：她真正想确认什么 → 直男容易想错什么 → 错误示范 → 成熟回应 → 三句照抄 → 下一步动作。先照抄，再慢慢内化。</div>

''' + '\n\n'.join(cards) + '\n  </section>\n'

text = text[:start] + new_section + text[end:]
p.write_text(text, encoding='utf-8')
print('rebuilt detailed cards:', len(cards))
