with open('views/female-types.js', 'r', encoding='utf-8') as f:
    content = f.read()

insert_text = """          <section v-if="selected.strategies && selected.strategies.length" class="wiki-type-strategies">
            <h3>攻心策略</h3>
            <div class="wiki-type-strategies__grid">
              <article v-for="(s, i) in selected.strategies" :key="i">
                <b><span>{{ i + 1 }}</span>{{ s.title }}</b>
                <p>{{ s.desc }}</p>
                <blockquote>&ldquo;{{ s.example }}&rdquo;</blockquote>
              </article>
            </div>
          </section>

          <section v-if="selected.chatCases && selected.chatCases.length" class="wiki-type-chatcases">
            <h3>实战对话案例</h3>
            <div class="wiki-type-chatcases__list">
              <article v-for="(c, ci) in selected.chatCases" :key="ci">
                <h4>{{ c.title }} <small>{{ c.context }}</small></h4>
                <div class="wiki-type-chatcases__chat">
                  <div v-for="(msg, mi) in c.messages" :key="mi" :class="['wiki-type-chatcases__msg', 'wiki-type-chatcases__msg--' + msg.sender, msg.isWrong ? 'wiki-type-chatcases__msg--wrong' : '']">
                    <div class="wiki-type-chatcases__bubble">
                      <span class="wiki-type-chatcases__sender">{{ msg.sender === 'girl' ? '她' : '你' }}</span>
                      <p>{{ msg.text }}</p>
                      <span v-if="msg.score" class="wiki-type-chatcases__score" :class="msg.score.startsWith('+') ? 'wiki-type-chatcases__score--good' : 'wiki-type-chatcases__score--bad'">{{ msg.score }}</span>
                      <span v-if="msg.note" class="wiki-type-chatcases__note">{{ msg.note }}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>

"""

marker = '          <section class="wiki-type-script wiki-type-script--atlas">'
idx = content.find(marker)
if idx >= 0:
    content = content[:idx] + insert_text + content[idx:]
    print('Inserted strategies and chatCases sections')
else:
    print('WARNING: marker not found, trying alternate')
    marker2 = '<section class="wiki-type-script'
    idx2 = content.find(marker2)
    if idx2 >= 0:
        content = content[:idx2] + insert_text + content[idx2:]
        print('Inserted with alternate marker')
    else:
        print('ERROR: Could not find insertion point')

with open('views/female-types.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
