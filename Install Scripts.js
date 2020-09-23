// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: download;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */
const scripts = [
  {
    moduleName: "10010",
    url:
      "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/10010/10010.js",
  },
  {
    moduleName: "10086",
    url:
      "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/10086/10086.js",
  },
  {
    moduleName: "BilibiliMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/BilibiliMonitor.js",
  },
  {
    moduleName: "RRShareMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/RRShareMonitor.js",
  },
  {
    moduleName: "RSSMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/RSSMonitor.js",
  },
  {
    moduleName: "WeiboMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/WeiboMonitor.js",
  },
  {
    moduleName: "ZhihuMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/ZhihuMonitor.js",
  },
  {
    moduleName: "DoubanMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/DoubanMonitor.js",
  },
  {
    moduleName: "Env",
    url:
      "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Env.js",
  },
  {
    moduleName: "Install Scripts",
    url:
      "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Install%20Scripts.js",
  },
  {
    moduleName: "Checkin",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/Checkin.js",
  },
  {
    moduleName: "Dler Cloud",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/Dler%20Cloud.js",
  },
  {
    moduleName: "AppPriceMonitor",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/AppPriceMonitor.js",
  },
  {
    moduleName: "北京尾号限行",
    url:
      "https://raw.githubusercontent.com/evilbutcher/Scriptables/master/%E5%8C%97%E4%BA%AC%E5%B0%BE%E5%8F%B7%E9%99%90%E8%A1%8C.js",
  },
];
// Install Scripts.js
const $ = importModule("Env");
function update() {
  log("🔔更新脚本开始!");
  scripts.forEach((script) => {
    $.getFile(script);
  });
  log("🔔更新脚本结束!");
}
update();
