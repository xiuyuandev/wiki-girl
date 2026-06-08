# 提取 pages/*.html 中的正文,生成 data/content.js
# 用法 (在项目根目录,即 "woman - 副本" 下执行):
#   powershell -ExecutionPolicy Bypass -File "wiki\scripts\extract-content.ps1"

# 通过脚本所在位置反推根目录,避免路径中文字符编码问题
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$src  = Join-Path $root 'pages'
$dst  = Join-Path (Join-Path $root 'wiki') (Join-Path 'data' 'content.js')

# 源 HTML 是 UTF-8(无 BOM)
$SrcEnc = [System.Text.Encoding]::UTF8

# 数据子目录如不存在则创建
$dstDir = Split-Path -Parent $dst
if (-not (Test-Path -LiteralPath $dstDir)) {
    New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
}

# 反引号在单引号字符串里是字面量,这里我们用 [char]96 拼接
$BT = [char]96

function Escape-JS([string]$s) {
    $s = $s.Replace('\', '\\')
    $s = $s.Replace($BT, '\' + $BT)
    $s = $s.Replace('${', '\${')
    return $s
}

$files = Get-ChildItem -LiteralPath $src -Filter '*.html' -ErrorAction Stop | Sort-Object Name

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('/* Auto-generated from pages/*.html */')
[void]$sb.AppendLine('/* DO NOT EDIT. Re-run wiki/scripts/extract-content.ps1 to regenerate. */')
[void]$sb.AppendLine('/* Loaded as global script (no ES modules), so assigned to window.ARTICLES. */')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('window.ARTICLES = { articles: {')

foreach ($f in $files) {
    $id = $f.BaseName
    $raw = [System.IO.File]::ReadAllText($f.FullName, $SrcEnc)

    $bodyStart = $raw.IndexOf('<body>') + 6
    if ($bodyStart -lt 6) { Write-Warning "no <body> in $($f.Name)"; continue }

    $footerIdx = $raw.IndexOf('<footer', $bodyStart)
    $scriptIdx = $raw.IndexOf('<script', $bodyStart)
    $cands = @($footerIdx, $scriptIdx) | Where-Object { $_ -gt 0 } | Sort-Object
    if ($cands.Count -gt 0) { $bodyEnd = $cands[0] } else { $bodyEnd = $raw.IndexOf('</body>') }
    if ($bodyEnd -lt 0) { $bodyEnd = $raw.Length }

    $slice = $raw.Substring($bodyStart, $bodyEnd - $bodyStart)

    $slice = [regex]::Replace($slice, '<div class="progress-bar"[^>]*></div>\s*', '')
    $slice = [regex]::Replace($slice, '<nav class="topnav"[\s\S]*?</nav>\s*', '')
    $slice = [regex]::Replace($slice, '<button class="scroll-top"[\s\S]*?</button>\s*', '')
    $slice = [regex]::Replace($slice, '<aside class="sidebar"[\s\S]*?</aside>\s*', '')
    # 去掉 article-header:Vue 视图自己渲染 title / chapterNum / lead
    # 用 "到 </p></div>" 作为收尾标记,避免被内部嵌套 div 提前截断
    $slice = [regex]::Replace($slice, '<div class="article-header">[\s\S]*?</p>\s*</div>\s*', '')
    # 去掉外层包装(多余的开 div 标签;多余的关闭 div 浏览器会忽略)
    $slice = $slice.Replace('<div class="book">', '')
    $slice = $slice.Replace('<div class="chapter-main">', '')

    $titleMatch = [regex]::Match($raw, '<title>([^<]+)</title>')
    $rawTitle = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { $id }
    # 清理:去掉 "第X章 " 前缀和 " — 直男蜕变指南" 后缀
    $title = $rawTitle
    $title = $title -replace '^第\S+章\s*', ''
    $title = $title -replace '\s*[—\-]\s*直男蜕变指南\s*$', ''
    if (-not $title) { $title = $rawTitle }
    $title = $title.Replace('\', '\\').Replace("'", "\'")

    $leadMatch = [regex]::Match($slice, '<p class="lead">([\s\S]*?)</p>')
    $lead = if ($leadMatch.Success) { $leadMatch.Groups[1].Value.Trim() } else { '' }
    $lead = [regex]::Replace($lead, '<[^>]+>', '')
    $lead = $lead.Replace('\', '\\').Replace("'", "\'")

    $numMatch = [regex]::Match($slice, '<div class="chapter-num">(\d+)</div>')
    $num = if ($numMatch.Success) { $numMatch.Groups[1].Value } else { '' }

    $escaped = Escape-JS $slice.Trim()

    [void]$sb.AppendLine("  '$id': {")
    [void]$sb.AppendLine("    title: '$title',")
    if ($num) { [void]$sb.AppendLine("    chapterNum: '$num',") }
    if ($lead) { [void]$sb.AppendLine("    lead: '$lead',") }
    [void]$sb.AppendLine('    html: ' + $BT)
    [void]$sb.AppendLine($escaped)
    [void]$sb.AppendLine($BT + ',')
    [void]$sb.AppendLine('  },')
    Write-Host ('  extracted ' + $f.Name)
}

[void]$sb.AppendLine('  } };')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('window.ARTICLES.getArticle = function(id) { return window.ARTICLES.articles[id] || null; };')
[void]$sb.AppendLine('window.ARTICLES.getAllIds = function() { return Object.keys(window.ARTICLES.articles); };')

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($dst, $sb.ToString(), $utf8NoBom)
Write-Host ('Done -> ' + $dst)
Write-Host ('Articles: ' + $files.Count)
