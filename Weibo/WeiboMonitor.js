// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: fire;
/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 * 本脚本使用了@Gideon_Senku的Env.scriptable，感谢！
 */
const goupdate = true;
const $ = importModule("Env");
var num = 6; //自定义显示数量
var rancolor = true; //true为开启随机颜色

try {
  var { wbnum, wbrancolor } = importModule("Config");
  num = wbnum();
  rancolor = wbrancolor();
  console.log("将使用配置文件内微博配置");
} catch (e) {
  console.log("将使用脚本内微博配置");
}

const res = await getinfo();

let widget = createWidget(res);
Script.setWidget(widget);
Script.complete();

function createWidget(res) {
  if (res.data.cards[0].title == "实时热点，每分钟更新一次") {
    var group = res.data.cards[0]["card_group"];
    items = [];
    for (var i = 0; i < num; i++) {
      var item = group[i].desc;
      items.push(item);
    }
    console.log(items);

    const w = new ListWidget();
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")];
    bgColor.locations = [0.0, 1.0];
    w.backgroundGradient = bgColor;
    w.centerAlignContent();

    const firstLine = w.addText(`[📣]微博热搜`);
    firstLine.textSize = 15;
    firstLine.textColor = Color.white();
    firstLine.textOpacity = 0.7;

    const top1Line = w.addText(`📌 ${items[0]}`);
    top1Line.textSize = 12;
    top1Line.textColor = Color.white();

    for (var i = 1; i < items.length; i++) {
      addTextToListWidget(`• ${items[i]}`, w);
    }

    w.presentSmall();
    return w;
  }
}

async function getinfo() {
  const url = {
    url:
      "https://m.weibo.cn/api/container/getIndex?containerid=106003%26filter_type%3Drealtimehot",
  };
  const res = await $.get(url);
  log(res);
  return res;
}

function addTextToListWidget(text, listWidget) {
  let item = listWidget.addText(text);
  if (rancolor == true) {
    item.textColor = new Color(color16());
  } else {
    item.textColor = Color.white();
  }
  item.textSize = 12;
}

function color16() {
  var r = Math.floor(Math.random() * 256);
  if (r + 50 < 255) {
    r = r + 50;
  }
  if (r > 230 && r < 255) {
    r = r - 50;
  }
  var g = Math.floor(Math.random() * 256);
  if (g + 50 < 255) {
    g = g + 50;
  }
  if (g > 230 && g < 255) {
    g = g - 50;
  }
  var b = Math.floor(Math.random() * 256);
  if (b + 50 < 255) {
    b = b + 50;
  }
  if (b > 230 && b < 255) {
    b = b - 50;
  }
  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

//更新代码
function update() {
  log("🔔更新脚本开始!");
  scripts.forEach(async (script) => {
    await $.getFile(script);
  });
  log("🔔更新脚本结束!");
}

const scripts = [
  {
    moduleName: "WeiboMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/WeiboMonitor.js",
  },
];
if (goupdate == true) update();
