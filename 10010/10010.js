// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: mobile-alt;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */
const tel = `填入你的电话号码`
const VAL_loginheader = `填入来自BoxJs的数据`

const $ = importModule('Env')
const res = await getinfo()
if (config.runsInWidget) {
  let widget = createWidget(res)
  Script.setWidget(widget)
  Script.complete()
}

function createWidget(res) {
  const signinfo = res
  if (signinfo.code == 'Y') {
    // 基本信息

    const traffic = signinfo.data.dataList[0]
    const flow = signinfo.data.dataList[1]
    const voice = signinfo.data.dataList[2]
    const credit = signinfo.data.dataList[3]
    const back = signinfo.data.dataList[4]
    const money = signinfo.data.dataList[5]


    const w = new ListWidget()
    const bgColor = new LinearGradient()
    bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
    bgColor.locations = [0.0, 1.0]
    w.backgroundGradient = bgColor
    w.centerAlignContent()

    const firstLine = w.addText(`[📱]中国联通`)
    firstLine.textSize = 12
    firstLine.textColor = Color.white()
    firstLine.textOpacity = 0.7

    const trafficLine = w.addText(`[${traffic.remainTitle}]${traffic.number}${traffic.unit}`)
    trafficLine.textSize = 12
    trafficLine.textColor = Color.white()

    const flowLine = w.addText(`[${flow.remainTitle}]${flow.number}${flow.unit}`)
    flowLine.textSize = 12
    flowLine.textColor = new Color("#6ef2ae")

    const voiceLine = w.addText(`[${voice.remainTitle}]${voice.number}${voice.unit}`)
    voiceLine.textSize = 12
    voiceLine.textColor = new Color("#7dbbae")

    const creditLine = w.addText(`[${credit.remainTitle}]${credit.number}${credit.unit}`)
    creditLine.textSize = 12
    creditLine.textColor = new Color("#ff9468")

    const backLine = w.addText(`[${back.remainTitle}]${back.number}${back.unit}`)
    backLine.textSize = 12
    backLine.textColor = new Color("#ffcc66")

    const moneyLine = w.addText(`[${money.remainTitle}]${money.number}${money.unit}`)
    moneyLine.textSize = 12
    moneyLine.textColor = new Color("#ffa7d3")
    return w
  }
}


async function getinfo() {
  const url = {
    url: `https://m.client.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0403&desmobiel=${tel}&showType=3`,
    headers: {
      "Cookie": JSON.parse(VAL_loginheader)["Cookie"]
    }
  }
  const res = await $.get(url)
  log(res)
  return res
}
