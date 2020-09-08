// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: keyboard;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */

const { createWidget } = require("./Env")

// init
// importModule all of Env
const $ = importModule('Env')
/**
 * importModule part of Env
 * example:
 * get(opts) for HTTP GET Methods
 */
const { get, post, msg } = importModule('Env')

msg('title','message','option')

// require some file,if file is JS and support module you can use it dirtctly
const opts = {
  moduleName: "vue",
  url: "https://cdn.jsdelivr.net/npm/vue@2.6.11"
  /** option:foreceDownload type:bool
  */
}

const Vue = await $.require(opts)


const fileName = $.initFile('Env')
log(fileName)
// wirteFile
$.writeFile('nihao.txt',`
const name = Senku,
const age = 18
const height = 1.88
`)
// readFile
const filedata = $.readFile('nihao.txt')
log(filedata)

// getStr and callback headers
const url = `https://github.com/GideonSenku/Scriptable/blob/master/READMEEN.md`
const res = $.getStr({url},(headers) => {
  log(headers)
})

log(res)


// input, value为input的默认值,可选,默认为null

const inputValue = await $.input('title', 'message', 'placehoder','value')
const inputValue1 = await $.input('title', 'message', 'placehoder')


/**
 *
 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
 *    :$.time('yyyyMMddHHmmssS')
 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
 * @param {*} fmt 格式化参数
 * @param {*} ts 时间戳 13位
 */
const time = $.time('yyyy-MM-dd HH:mm:ss')
const time = $.time('MMdd HH:mm:ss',1599124137000)
console.log(time)

// create wiget
createWidget('pretitle','title')
createWidget('pretitle','title','subtitle')