// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: download;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */
const scripts = [
    {
      moduleName: '10010',
      url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/10010/10010.js'
    },
    {
      moduleName: 'BilibiliMonitor',
      url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Bilibili/BilibiliMonitor.js'
    },
    {
      moduleName: 'RRShareMonitor',
      url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/RRShare/RRShareMonitor.js'
    },
    {
      moduleName: 'RSSMonitor',
      url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/RSS/RSSMonitor.js'
    },
    {
      moduleName: 'WeiboMonitor',
      url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Weibo/WeiboMonitor.js'
    },
    {
        moduleName: 'ZhihuMonitor',
        url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Zhihu/ZhihuMonitor.js'
    },
    {
        moduleName: "DoubanMonitor",
        url: "https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Douban/DoubanMonitor.js",
    },
    {
      moduleName: 'Env',
      url: 'https://raw.githubusercontent.com/GideonSenku/Scriptable/master/Env.js'
    }
  ]
  
const $ = new importModule('Env')()
function update() {
  log('🔔更新脚本开始!')
  scripts.forEach(async(script) => {
    await $.getFile(script)
  })
  log('🔔更新脚本结束!')
}
update()
