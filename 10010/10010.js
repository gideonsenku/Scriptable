// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: mobile-alt;
/**
 * Author: GideonSenku  evilbutcher
 * Github: https://github.com/GideonSenku
 */

const $ = importModule("Env");

const prefix = "boxjs.net"; //修改成你用的域名

const title = '联通5G'
const preview = 'small' // 预览大小 可选:small,medium,large
const spacing = 5 // 间隙大小
// option1 manual

const tel = `` // 填入你的电话号码

const VAL_loginheader = `` // 填入来自BoxJs的数据

// option2 auto getdata from BoxJS
$.KEY_signheader = "chavy_signheader_10010";
$.KEY_loginheader = "chavy_tokenheader_10010";

$.Val_signheader = await getdata($.KEY_signheader);
$.Val_loginheader = await getdata($.KEY_loginheader);

const res = await getinfo()
await render()

async function render() {
  // create and show widget
  if (config.runsInWidget) {
    let widget = await createWidget(res)
    Script.setWidget(widget)
    Script.complete()
  } else {
    await createWidget(res)
  }
}

async function createWidget(res) {
  const signinfo = res;
  if (signinfo.code == "Y") {
    // 基本信息
    const traffic = signinfo.data.dataList[0];
    const flow = signinfo.data.dataList[1];
    const voice = signinfo.data.dataList[2];
    const credit = signinfo.data.dataList[3];
    const back = signinfo.data.dataList[4];
    const money = signinfo.data.dataList[5];


    $.traffic = `[${traffic.remainTitle}]${traffic.number}${traffic.unit}`
    $.flow = `[${flow.remainTitle}]${flow.number}${flow.unit}`
    $.voice = `[${voice.remainTitle}]${voice.number}${voice.unit}`
    $.credit = `[${credit.remainTitle}]${credit.number}${credit.unit}`
    $.back = `[${back.remainTitle}]${back.number}${back.unit}`
    const opts = {
      title,
      texts: {
        traffic: $.traffic,
        flow: $.flow,
        voice: $.voice,
        credit: $.credit,
        back: $.back,
        updateTime: 'true',
        battery: 'true'
      },
      preview,
      spacing
    }
    let widget = await $.createWidget(opts);
    return widget

  }
}

async function getinfo() {
  const telNum = $.VAL_signheader ? gettel() : tel;
  const loginheader = $.Val_loginheader ? $.Val_loginheader : VAL_loginheader;
  const url = {
    url: `https://m.client.10010.com/mobileService/home/queryUserInfoSeven.htm?version=iphone_c@7.0403&desmobiel=${telNum}&showType=3`,
    headers: {
      Cookie: JSON.parse(loginheader)["Cookie"],
    },
  };
  const res = await $.get(url);
  return res;
}

function gettel() {
  const reqheaders = JSON.parse($.VAL_signheader);
  const reqreferer = reqheaders.Referer;
  const reqCookie = reqheaders.Cookie;
  let tel = "";
  if (reqreferer.indexOf(`desmobile=`) >= 0)
    tel = reqreferer.match(/desmobile=(.*?)(&|$)/)[1];
  if (tel == "" && reqCookie.indexOf(`u_account=`) >= 0)
    tel = reqCookie.match(/u_account=(.*?);/)[1];
  return tel;
}

async function getdata(key) {
  const url = `http://${prefix}/query/boxdata`;
  const boxdata = await $.get({ url });
  if (boxdata.datas[key]) {
    return boxdata.datas[key];
  } else {
    return undefined;
  }
}
