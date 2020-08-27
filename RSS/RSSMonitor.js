// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: rss;
/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 * 本脚本使用了@Gideon_Senku的Env.scriptable，感谢！
 */
const goupdate = true; //默认关闭，需要更新时请手动打开
const $ = importModule("Env");
// 填写RSS订阅链接,默认为仓库的最近Commit
// Fill in the RSS subscription link, the default is the latest Commit of the Repo
var rsslink = "https://github.com/GideonSenku/Scriptable/commits/master.atom";
try {
  const con = importModule("Config");
  var rsslink = con.rsslink();
  console.log("将使用配置文件内订阅链接");
} catch (e) {
  console.log("将使用脚本内订阅链接");
}

const res = await getinfo();

let widget = createWidget(res);
Script.setWidget(widget);
Script.complete();

function createWidget(res) {
  if (res.status == "ok") {
    var titlerss = res.feed.title;
    var group = res.items;
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

    const firstLine = w.addText(`[📣]${titlerss}`);
    firstLine.textSize = 14;
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
}

async function getinfo() {
  const rssRequest = {
    url:
      "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent(rsslink),
  };

  const res = await $.get(rssRequest);
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
    moduleName: "RSSMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/RSSMonitor.js",
  },
];
if (goupdate == true) update();
