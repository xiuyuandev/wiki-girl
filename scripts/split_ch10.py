from pathlib import Path
import re

root = Path('.')
content_path = root / 'data' / 'content.js'
text = content_path.read_text(encoding='utf-8')

start = text.index("  'ch10': {")
end = text.index("  'ch11': {", start)
block = text[start:end]
html = re.search(r"html:\s*`\n(?P<html>.*?)\n`", block, re.S).group('html')

cards = re.findall(r'    <div class="ch10-scene-card">.*?\n    </div>(?=\n\n    <div class="ch10-scene-card">|\n  </section>)', html, re.S)
if len(cards) != 81:
    raise SystemExit(f'Expected 81 scene cards, got {len(cards)}')

indexes = [int(re.search(r'<div class="ch10-scene-index">(\d+)</div>', c).group(1)) for c in cards]
if indexes != list(range(1, 82)):
    raise SystemExit(f'Unexpected scene indexes: {indexes[:5]} ... {indexes[-5:]}')

framework_types = re.search(r'  <section id="framework">.*?\n\n  <section id="templates">', html, re.S).group(0)
framework_types = framework_types.rsplit('\n\n  <section id="templates">', 1)[0]
templates = re.search(r'  <section id="templates">.*?\n  </section>', html, re.S).group(0)
mistakes_to_summary = re.search(r'  <section id="mistakes">.*?\n  </section>\n</article>', html, re.S).group(0).replace('\n</article>', '')

def nav(prev_id, parent=True, next_id=None):
    links = []
    if prev_id:
        links.append(f'<a href="{prev_id}.html" class="btn btn-outline">← 上一节</a>')
    if parent:
        links.append('<a href="ch10.html" class="btn btn-outline">返回测试目录</a>')
    if next_id:
        links.append(f'<a href="{next_id}.html" class="btn btn-primary">下一节 →</a>')
    return '<div class="collection-page-nav">' + ''.join(links) + '</div>'

def scene_section(title, kicker, desc, selected_cards):
    return f'''  <section id="scenes">
    <div class="ch10-section-banner">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>

{chr(10).join(selected_cards)}
  </section>'''

parent_html = r'''
<div class="collection-page collection-page--ch10">
  <section class="collection-hero">
    <p class="collection-kicker">第十章 · 表达工具箱</p>
    <h2>女人的测试：识别、回应与建立健康关系</h2>
    <p>本专栏已拆成 6 个子页面。先用导读页建立判断地图，再按分类、模板和场景逐步查阅，避免一次加载和滚动一整篇超长内容。</p>
    <div class="collection-stats">
      <div><strong>81</strong><span>高频场景</span></div>
      <div><strong>10</strong><span>测试分类</span></div>
      <div><strong>5</strong><span>回应模板</span></div>
      <div><strong>6</strong><span>子页面</span></div>
    </div>
  </section>

  <section class="collection-note">
    <h3>先把方向摆正</h3>
    <p>所谓测试，不是女人故意为难你，也不是让你去破解、反制、拿捏对方。更贴近真实的理解是：在暧昧、约会和关系早期，一个人会通过提问、观察、情绪、边界和价值观互动，判断你是否成熟、稳定、真诚、有边界、值得继续投入。</p>
    <p><strong>你的目标不是赢过她，</strong>而是看懂互动背后的需求，稳定表达自己，同时判断这段关系是否健康。</p>
  </section>

  <section id="visual-map" class="collection-path">
    <h2>阅读路线</h2>
    <div class="collection-steps">
      <div><span>01</span><b>先判断信号</b><p>分清绿色了解、黄色压力、红色越界。</p></div>
      <div><span>02</span><b>再选回应方式</b><p>幽默、真诚、拒绝、边界或退出。</p></div>
      <div><span>03</span><b>按场景查话术</b><p>从触发语、误区、成熟回应到后续动作。</p></div>
      <div><span>04</span><b>观察后续投入</b><p>看她是否尊重你的表达和边界。</p></div>
    </div>
  </section>

  <section id="chapters">
    <h2>子章节目录</h2>
    <div class="collection-grid">
      <a class="collection-card" href="ch10-1.html"><span>01</span><h3>判断框架与十大分类</h3><p>先学“停、辨、选、回”，再看 10 类常见测试。</p><em>框架 / 分类</em></a>
      <a class="collection-card" href="ch10-2.html"><span>02</span><h3>回应模板与基础测试场景 01-20</h3><p>五类万能模板，配合前 20 个基础高频场景。</p><em>模板 / 01-20</em></a>
      <a class="collection-card" href="ch10-3.html"><span>03</span><h3>聊天、约会与关系节奏场景 21-41</h3><p>处理慢一点、不秒回、报备、比较、现实询问等节奏问题。</p><em>21-41</em></a>
      <a class="collection-card" href="ch10-4.html"><span>04</span><h3>边界、异性与情绪支持场景 42-59</h3><p>应对异性边界、情绪支持、冷淡、空间感与投入压力。</p><em>42-59</em></a>
      <a class="collection-card" href="ch10-5.html"><span>05</span><h3>现实价值、尊重与红线场景 60-74</h3><p>看清现实条件、尊重、金钱、威胁和控制等风险信号。</p><em>60-74</em></a>
      <a class="collection-card" href="ch10-6.html"><span>06</span><h3>关系变化、退出判断与训练总结</h3><p>最后 7 个场景，加上错误清单、训练方法和总结。</p><em>75-81 / 训练</em></a>
    </div>
  </section>
</div>
'''.strip()

article = lambda title, body: "  'TITLE_PLACEHOLDER': {"

def make_obj(id_, title, body):
    return f"  '{id_}': {{\n    title: '{title}',\n    html: `\n{body}\n`,\n  }},\n"

ch10_1 = f'''<div class="ch10-mobile-nav"><a href="#framework">框架</a><a href="#types">分类</a><a href="ch10-2.html">模板与场景</a></div>
<article class="ch10-article">
{framework_types}
</article>
{nav(None, True, 'ch10-2')}'''

ch10_2 = f'''<div class="ch10-mobile-nav"><a href="#templates">模板</a><a href="#scenes">01-20</a><a href="ch10.html">目录</a></div>
<article class="ch10-article">
{templates}

{scene_section('基础测试场景 01-20', 'SCENES 01-20', '从价值、边界、真诚、情绪和现实了解开始，先练会最基础也最常见的稳定回应。', cards[0:20])}
</article>
{nav('ch10-1', True, 'ch10-3')}'''

ch10_3 = f'''<div class="ch10-mobile-nav"><a href="#scenes">21-41</a><a href="ch10.html">目录</a><a href="ch10-4.html">下一节</a></div>
<article class="ch10-article">
{scene_section('聊天、约会与关系节奏场景 21-41', 'SCENES 21-41', '围绕微信回复、约会边界、慢热推进、比较、过往经历和现实规划，训练你稳住节奏。', cards[20:41])}
</article>
{nav('ch10-2', True, 'ch10-4')}'''

ch10_4 = f'''<div class="ch10-mobile-nav"><a href="#scenes">42-59</a><a href="ch10.html">目录</a><a href="ch10-5.html">下一节</a></div>
<article class="ch10-article">
{scene_section('边界、异性与情绪支持场景 42-59', 'SCENES 42-59', '这一组重点处理异性边界、报备、情绪支持、空间感、冷淡和投入不平衡。', cards[41:59])}
</article>
{nav('ch10-3', True, 'ch10-5')}'''

ch10_5 = f'''<div class="ch10-mobile-nav"><a href="#scenes">60-74</a><a href="ch10.html">目录</a><a href="ch10-6.html">下一节</a></div>
<article class="ch10-article">
{scene_section('现实价值、尊重与红线场景 60-74', 'SCENES 60-74', '这一组更接近现实筛选：金钱、尊重、控制、威胁、冷暴力和底线判断。', cards[59:74])}
</article>
{nav('ch10-4', True, 'ch10-6')}'''

ch10_6 = f'''<div class="ch10-mobile-nav"><a href="#scenes">75-81</a><a href="#mistakes">错误</a><a href="#training">训练</a><a href="#summary">总结</a></div>
<article class="ch10-article">
{scene_section('关系变化、退出判断与投入平衡场景 75-81', 'SCENES 75-81', '最后一组用于判断关系是否还值得继续投入：忽冷忽热、长期单向、工具人风险和退出时机。', cards[74:81])}

{mistakes_to_summary}
</article>
{nav('ch10-5', True, 'ch11')}'''

new_block = ''.join([
    make_obj('ch10', '女人的测试', parent_html),
    make_obj('ch10-1', '女人的测试：判断框架与十大分类', ch10_1),
    make_obj('ch10-2', '女人的测试：回应模板与基础测试场景', ch10_2),
    make_obj('ch10-3', '女人的测试：聊天、约会与关系节奏', ch10_3),
    make_obj('ch10-4', '女人的测试：边界、异性与情绪支持', ch10_4),
    make_obj('ch10-5', '女人的测试：现实价值、尊重与红线', ch10_5),
    make_obj('ch10-6', '女人的测试：关系变化、退出判断与训练总结', ch10_6),
])

new_text = text[:start] + new_block + text[end:]
content_path.write_text(new_text, encoding='utf-8')
print('split ch10 into 7 article records; cards:', len(cards))
