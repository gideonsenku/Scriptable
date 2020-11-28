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
const title = `📖 v2ex热榜`;
const preview = "medium";
const spacing = 5;

const res = await getinfo();

let widget = await createWidget(res);
Script.setWidget(widget);
Script.complete();

async function createWidget(res) {
  var group = res.data;
  items = [];
  for (var i = 0; i < 6; i++) {
    var item = res[i].title;
    items.push(item);
  }
  console.log(items);

  const opts = {
    title,
    texts: {
      text1: `• ${items[0]}`,
      text2: `• ${items[1]}`,
      text3: `• ${items[2]}`,
      text4: `• ${items[3]}`,
      text5: `• ${items[4]}`,
      text6: `• ${items[5]}`,
      battery: "true",
    },
    preview,
    spacing,
  };

  let widget = await $.createWidget(opts);
  return widget;
}

async function getinfo() {
  const url = {
    url: `https://www.v2ex.com/api/topics/hot.json`,
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
    moduleName: "v2ex_hot",
    url:
      "https://raw.githubusercontent.com/recall704/Scriptable/master/v2ex/hot.js",
  },
];
if (goupdate == true) update();
