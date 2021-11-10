// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: film;
/*
 * Author: recall704
 * Github: https://github.com/recall704/Scriptable
 * 本脚本使用了@Gideon_Senku的Env.scriptable，感谢！
 */
const goupdate = false;
const $ = importModule("Env");
const title = `📖 v2ex最新`;
const preview = "medium";
const spacing = 5;

const res = await getinfo();

let widget = await createWidget(res);
Script.setWidget(widget);
Script.complete();

async function createWidget(res) {
  var group = res.data;
  items = [];
  urls = [];
  for (var i = 0; i < 6; i++) {
    var item = res[i].title;
    var v2exUrl = res[i].url;
    items.push(item);
    urls.push(v2exUrl);
  }
  console.log(items);

  const opts = {
    title,
    texts: {
      text1: { text : `• ${items[0]}`, url: urls[0] },
      text2: { text : `• ${items[1]}`, url: urls[1] },
      text3: { text : `• ${items[2]}`, url: urls[2] },
      text4: { text : `• ${items[3]}`, url: urls[3] },
      text5: { text : `• ${items[4]}`, url: urls[4] },
      text6: { text : `• ${items[5]}`, url: urls[5] },
      battery: "true"
    },
    preview,
    spacing,
  };

  let widget = await $.createWidget(opts);
  return widget;
}

async function getinfo() {
  const url = {
    url: `https://www.v2ex.com/api/topics/latest.json`,
  };
  const res = await $.get(url);
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
    moduleName: "v2ex_latest",
    url:
      "https://raw.githubusercontent.com/recall704/Scriptable/master/v2ex/latest.js",
  },
];
if (goupdate == true) update();
