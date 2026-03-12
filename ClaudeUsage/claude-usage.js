// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: robot;

const $ = importModule("Env")

const preview = 'medium' // small, medium, large, accessoryRectangular, accessoryCircular, accessoryInline
const spacing = 4

// ── Configuration ──
const CLAUDE_ORG_ID = ''
const CLAUDE_COOKIE = ''

// ── Fetch Usage ──

async function fetchUsage() {
  if (!CLAUDE_COOKIE) throw new Error('Missing claude_cookie')

  const url = `https://claude.ai/api/organizations/${CLAUDE_ORG_ID}/usage`
  const req = new Request(url)
  req.method = 'GET'
  req.headers = {
    'accept': '*/*',
    'content-type': 'application/json',
    'anthropic-client-platform': 'web_claude_ai',
    'anthropic-client-version': '1.0.0',
    'cookie': CLAUDE_COOKIE,
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
  }
  return await req.loadJSON()
}

// ── Format Reset Time ──

function formatReset(resetsAt) {
  const diff = new Date(resetsAt) - Date.now()
  if (diff <= 0) return 'just now'
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

// ── Build Widget ──

async function createUsageWidget(usage) {
  let w = new ListWidget()
  w.spacing = spacing

  w.backgroundColor = Color.white()

  // Title
  const titleStack = w.addStack()
  titleStack.centerAlignContent()
  const titleText = titleStack.addText('Claude Usage')
  titleText.font = Font.semiboldSystemFont(16)
  titleText.textColor = Color.black()

  titleStack.addSpacer()

  const updateText = titleStack.addText($.time('HH:mm'))
  updateText.font = new Font('SF Mono', 10)
  updateText.textColor = new Color('000000', 0.4)

  w.addSpacer(2)

  // Usage sections
  if (usage.five_hour) {
    addUsageBar(w, '5h Limit', usage.five_hour.utilization, usage.five_hour.resets_at)
  }

  if (usage.seven_day) {
    addUsageBar(w, 'Weekly', usage.seven_day.utilization, usage.seven_day.resets_at)
  }

  w.addSpacer()

  return w
}

function addUsageBar(widget, label, utilization, resetsAt) {
  const pct = Math.round(utilization)
  const resetStr = formatReset(resetsAt)

  // Label row
  const labelStack = widget.addStack()
  labelStack.centerAlignContent()

  const labelText = labelStack.addText(label)
  labelText.font = new Font('SF Mono', 12)
  labelText.textColor = new Color('000000', 0.7)

  labelStack.addSpacer()

  const pctText = labelStack.addText(`${pct}%`)
  pctText.font = new Font('SF Mono', 12)
  pctText.textColor = pct >= 80 ? new Color('e74c3c') : pct >= 50 ? new Color('f39c12') : new Color('27ae60')

  // Progress bar
  const barStack = widget.addStack()
  barStack.layoutHorizontally()
  barStack.cornerRadius = 4
  barStack.size = new Size(0, 8)
  barStack.backgroundColor = new Color('000000', 0.08)

  if (pct > 0) {
    const fillColor = pct >= 80 ? 'e74c3c' : pct >= 50 ? 'f39c12' : '27ae60'
    const barWidth = Math.round(pct * 2.8)
    const fill = barStack.addImage(createBarImage(fillColor, barWidth))
    fill.imageSize = new Size(barWidth, 8)
  }

  barStack.addSpacer()

  // Reset time
  const resetStack = widget.addStack()
  resetStack.addSpacer()
  const resetText = resetStack.addText(`resets in ${resetStr}`)
  resetText.font = new Font('SF Mono', 10)
  resetText.textColor = new Color('000000', 0.35)

  widget.addSpacer(2)
}

function createBarImage(hexColor, width) {
  const ctx = new DrawContext()
  ctx.opaque = false
  ctx.respectScreenScale = true
  ctx.size = new Size(width, 8)
  const barPath = new Path()
  barPath.addRoundedRect(new Rect(0, 0, width, 8), 4, 4)
  ctx.addPath(barPath)
  ctx.setFillColor(new Color(hexColor))
  ctx.fillPath()
  return ctx.getImage()
}

// ── Accessory Widgets (Lock Screen) ──

function createAccessoryRectangular(usage) {
  let w = new ListWidget()
  w.spacing = 2

  const titleText = w.addText('Claude Usage')
  titleText.font = Font.semiboldSystemFont(12)
  titleText.minimumScaleFactor = 0.8

  if (usage.five_hour) {
    const pct = Math.round(usage.five_hour.utilization)
    const row = w.addStack()
    row.centerAlignContent()
    const label = row.addText(`5h: ${pct}%`)
    label.font = new Font('SF Mono', 11)
    row.addSpacer(4)
    const reset = row.addText(formatReset(usage.five_hour.resets_at))
    reset.font = new Font('SF Mono', 9)
    reset.textOpacity = 0.6
  }

  if (usage.seven_day) {
    const pct = Math.round(usage.seven_day.utilization)
    const row = w.addStack()
    row.centerAlignContent()
    const label = row.addText(`7d: ${pct}%`)
    label.font = new Font('SF Mono', 11)
    row.addSpacer(4)
    const reset = row.addText(formatReset(usage.seven_day.resets_at))
    reset.font = new Font('SF Mono', 9)
    reset.textOpacity = 0.6
  }

  return w
}

function createAccessoryCircular(usage) {
  let w = new ListWidget()
  w.setPadding(0, 0, 0, 0)

  const data = usage.five_hour || usage.seven_day
  if (!data) {
    w.addText('--')
    return w
  }

  const pct = Math.round(data.utilization)

  // Draw circular gauge
  const size = 76
  const ctx = new DrawContext()
  ctx.opaque = false
  ctx.respectScreenScale = true
  ctx.size = new Size(size, size)

  const center = size / 2
  const radius = size / 2 - 6
  const lineWidth = 5
  const startAngle = -Math.PI / 2
  const endAngle = startAngle + (2 * Math.PI * pct / 100)

  // Background ring
  ctx.setStrokeColor(new Color('ffffff', 0.3))
  ctx.setLineWidth(lineWidth)
  drawArc(ctx, center, center, radius, 0, 2 * Math.PI, lineWidth, new Color('ffffff', 0.3))

  // Fill ring
  drawArc(ctx, center, center, radius, startAngle, endAngle, lineWidth, Color.white())

  const img = w.addImage(ctx.getImage())
  img.centerAlignImage()

  // Center text overlay
  const overlay = w.addStack()
  overlay.addSpacer()
  const txt = overlay.addText(`${pct}%`)
  txt.font = Font.boldSystemFont(14)
  txt.centerAlignText()
  overlay.addSpacer()

  return w
}

function drawArc(ctx, cx, cy, r, start, end, width, color) {
  const steps = 60
  const range = end - start
  for (let i = 0; i < steps; i++) {
    const a1 = start + (range * i / steps)
    const a2 = start + (range * (i + 1) / steps)
    const x1 = cx + r * Math.cos(a1)
    const y1 = cy + r * Math.sin(a1)
    const x2 = cx + r * Math.cos(a2)
    const y2 = cy + r * Math.sin(a2)
    const p = new Path()
    p.move(new Point(x1, y1))
    p.addLine(new Point(x2, y2))
    ctx.addPath(p)
    ctx.setStrokeColor(color)
    ctx.setLineWidth(width)
    ctx.strokePath()
  }
}

function createAccessoryInline(usage) {
  let w = new ListWidget()
  const data = usage.five_hour || usage.seven_day
  if (!data) {
    w.addText('Claude: --')
    return w
  }
  const pct = Math.round(data.utilization)
  w.addText(`Claude ${pct}%`)
  return w
}

// ── Main ──

try {
  const usage = await fetchUsage()
  const family = config.widgetFamily || preview

  let widget
  if (family === 'accessoryRectangular') {
    widget = createAccessoryRectangular(usage)
  } else if (family === 'accessoryCircular') {
    widget = createAccessoryCircular(usage)
  } else if (family === 'accessoryInline') {
    widget = createAccessoryInline(usage)
  } else {
    widget = await createUsageWidget(usage)
  }

  if (config.runsInWidget) {
    Script.setWidget(widget)
    Script.complete()
  } else {
    const presentMap = {
      small: () => widget.presentSmall(),
      medium: () => widget.presentMedium(),
      large: () => widget.presentLarge(),
      accessoryRectangular: () => widget.presentAccessoryRectangular(),
      accessoryCircular: () => widget.presentAccessoryCircular(),
      accessoryInline: () => widget.presentAccessoryInline(),
    }
    const present = presentMap[preview] || presentMap.medium
    await present()
  }
} catch (e) {
  const w = new ListWidget()
  w.backgroundColor = Color.white()
  const errText = w.addText(`Error: ${e.message}`)
  errText.font = Font.regularSystemFont(12)
  errText.textColor = Color.red()

  if (config.runsInWidget) {
    Script.setWidget(w)
    Script.complete()
  } else {
    w.presentMedium()
  }
}
