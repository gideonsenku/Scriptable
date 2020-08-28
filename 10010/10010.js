// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: mobile-alt;
/**
 * Author: GideonSenku  evilbutcher
 * Github: https://github.com/GideonSenku
 */

const $ = importModule('Env')

const prefix = 'boxjs.net' //修改成你用的域名

// option1 manual
const tel = `填入你的电话号码`
const VAL_loginheader = `填入来自BoxJs的数据`


// option2 auto getdata from BoxJS
$.KEY_signheader = 'chavy_signheader_10010'
$.KEY_loginheader = 'chavy_tokenheader_10010'

$.Val_signheader = await getdata($.KEY_signheader)
$.Val_loginheader = await getdata($.KEY_loginheader)


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
    w.presentSmall()
    return w
  }
}


async function getinfo() {
  const telNum = $.VAL_signheader ? gettel() : tel
  const loginheader = $.Val_loginheader ? $.Val_loginheader : VAL_loginheader
  const url = {
    url: `https://m.client.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0403&desmobiel=${telNum}&showType=3`,
    headers: {
      "Cookie": JSON.parse(loginheader)["Cookie"]
    }
  }
  const res = await $.get(url)
  return res
}

function gettel() {
    const reqheaders = JSON.parse($.VAL_signheader)
    const reqreferer = reqheaders.Referer
    const reqCookie = reqheaders.Cookie
    let tel = ''
    if (reqreferer.indexOf(`desmobile=`) >= 0) tel = reqreferer.match(/desmobile=(.*?)(&|$)/)[1]
    if (tel == '' && reqCookie.indexOf(`u_account=`) >= 0) tel = reqCookie.match(/u_account=(.*?);/)[1]
    return tel
}


async function getdata(key){
  const url = `http://${prefix}/query/boxdata`
  const boxdata = await $.get({url})
  if (boxdata.datas[key]) {
    return boxdata.datas[key]
  } else {
    return undefined
  }
}
