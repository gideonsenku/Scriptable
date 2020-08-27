// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: heartbeat;
/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 * 本脚本使用了@Gideon_Senku的Env.scriptable，感谢！
 */
const goupdate = true;
const $ = importModule("Env");
//rid对应不同的B站榜单：0全站，1动画，3音乐，4游戏，5娱乐，36科技，119鬼畜，129舞蹈。
var rid = 0;
try {
  const { bilibili } = importModule("Config");
  var rid = bilibili();
  console.log("将使用配置文件内榜单编号");
} catch (e) {
  console.log("将使用脚本内榜单编号");
}

const res = await getinfo();

let widget = createWidget(res);
Script.setWidget(widget);
Script.complete();

function createWidget(res) {
  var group = res.data;
  items = [];
  for (var i = 0; i < 6; i++) {
    var item = group[i].title;
    items.push(item);
  }
  console.log(items);

  const w = new ListWidget();
  const bgColor = new LinearGradient();
  bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")];
  bgColor.locations = [0.0, 1.0];
  w.backgroundGradient = bgColor;
  w.centerAlignContent();

  const firstLine = w.addText(`[📣]B站榜单`);
  firstLine.textSize = 12;
  firstLine.textColor = Color.white();
  firstLine.textOpacity = 0.7;

  const top1Line = w.addText(`• ${items[0]}`);
  top1Line.textSize = 12;
  top1Line.textColor = Color.white();

  const top2Line = w.addText(`• ${items[1]}`);
  top2Line.textSize = 12;
  top2Line.textColor = new Color("#6ef2ae");

  const top3Line = w.addText(`• ${items[2]}`);
  top3Line.textSize = 12;
  top3Line.textColor = new Color("#7dbbae");

  const top4Line = w.addText(`• ${items[3]}`);
  top4Line.textSize = 12;
  top4Line.textColor = new Color("#ff9468");

  const top5Line = w.addText(`• ${items[4]}`);
  top5Line.textSize = 12;
  top5Line.textColor = new Color("#ffcc66");

  const top6Line = w.addText(`• ${items[5]}`);
  top6Line.textSize = 12;
  top6Line.textColor = new Color("#ffa7d3");
  w.presentMedium();
  return w;
}

async function getinfo() {
  const blRequest = {
    url: `https://app.bilibili.com/x/v2/rank/region?rid=${rid}`,
  };

  const res = await $.get(blRequest);
  log(res);
  return res;
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
    moduleName: "BilibiliMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/BilibiliMonitor.js",
  },
];
if (goupdate == true) update();
