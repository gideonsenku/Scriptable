/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */


const request = new Request('')
const dict = FileManager.iCloud().documentsDirectory()
const defaultHeaders = {
  "Accept": "*/*",
  "Content-Type": "application/json"
}
/**
 * @description GET，返回String数据
 * @param {*} param0 request信息
 * @param {*} callback 回调返回response和JSON对象
 */
const get = async ({ url, headers = {} }, callback = () => {} ) => {
  request.url = url
  request.method = 'GET'
  request.headers = {
    ...headers,
    ...defaultHeaders
  }
  const data = await request.loadJSON()
  callback(request.response, data)
  return data
}

/**
 * @description GET，返回String数据
 * @param {*} param0 request信息
 * @param {*} callback 回调返回response和String对象
 */
const getStr = async ({ url, headers = {} }, callback = () => {} ) => {
  request.url = url
  request.method = 'GET'
  request.headers = {
    ...headers,
    ...defaultHeaders
  }
  const data = await request.loadString()
  callback(request.response, data)
  return data
}

/**
 * @description POST，返回String数据
 * @param {*} param0 request信息
 * @param {*} callback 回调返回response和String
 */
const post = async ({ url, body, headers = {} }, callback = () => {} ) => {
    request.url = url
    request.body = body
    request.method = 'POST'
    request.headers = {
      ...defaultHeaders,
      ...headers
    }
  const data = await request.loadString()
  callback(request.response, data)
  return data
}

/**
 * @description POST，返回JSON数据
 * @param {*} param0 request信息
 * @param {*} callback 回调返回response和JSON
 */
const _post = async ({ url, body, headers = {} }, callback = () => {} ) => {
  request.url = url
  request.body = body
  request.method = 'POST'
  request.headers = {
    ...defaultHeaders,
    ...headers
  }
const data = await request.loadJSON()
callback(request.response, data)
return data
}

/**
 * @description 下载文件
 * @param {*} param0 
 */
const getFile = async ({moduleName, url}) => {
  log(`开始下载文件: 🌝 ${moduleName}`)
  const header = `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: file-code;\n`;
  const content = await getStr({url})
  const fileHeader = content.includes('icon-color') ? `` : header
  write(`${moduleName}`, `${fileHeader}${content}`)
  log(`文件下载完成: 🌚 ${moduleName}`)
}

/**
 * 
 * @description 导入模块，不存在即下载模块，也可传入forceDownload: true 强制更新模块
 * @param {*} param0 
 */
const require = ({
  moduleName,
  url = '',
  forceDownload = false
}) => {
  if (isFileExists(moduleName) && !forceDownload) {
    log(`导入模块: 🪐${moduleName}`)
    return importModule(moduleName)
  } else {
    getFile({ moduleName, url })
    log(`导入模块: 🪐${moduleName}`)
    return importModule(moduleName)
  }
}
/**
 * 
 * @description 将数据写入文件
 * @param {*} fileName 要写入的文件名，默认JS文件，可选其他，加上文件名后缀即可
 * @param {*} content 要写入的文件内容
 */
const write = (fileName, content) => {
  let file = initFile(fileName)
  const filePath = `${dict}/${file}`
  FileManager.iCloud().writeString(filePath, content)
  return true
}

/**
 * 
 * @description 判断文件是否存在
 * @param {*} fileName 
 */
const isFileExists = (fileName) => {
  let file = initFile(fileName)
  return FileManager.iCloud().fileExists(`${dict}/${file}`)
}

const initFile = (fileName) => {
  const hasSuffix = fileName.lastIndexOf('.') + 1
  return !hasSuffix ? `${fileName}.js` : fileName
}

/**
 * 
 * @description 读取文件内容
 * @param {*} fileName 要读取的文件名，默认JS文件，可选其他，加上文件名后缀即可
 * @return 返回文件内容，字符串形式
 */
const read = (fileName) => {
  const file = initFile(fileName)
  return FileManager.iCloud().readString(`${dict}/${file}`)
}

/**
 * 
 * @description 提示框
 * @param {*} title 提示框标题
 * @param {*} message 提示框内容
 * @param {*} btnMes 提示框按钮标题，默认Cancel
 */
const msg = (title, message, btnMes = 'Cancel') => {
  if (!config.runsInWidget) {
    const alert = new Alert()
    alert.title = title
    alert.message = message
    alert.addAction(btnMes)
    alert.present()
  }
}

const setdata = (Val, Key) => {
  Keychain.set(Val, Key)
  return true
}

const getdata = (Key) => {
  return Keychain.get(Key)
}

const hasdata = (Key) => {
  return Keychain.contains(Key)
}

const rmdata = (Key) => {
  Keychain.remove(Key)
  return true
}

// Presents an alert where the user can enter a value in a text field.
// Returns the entered value.
const input = async(title, message, placeholder, value = null) => {
  if (!config.runsInWidget) {
    let alert = new Alert()
    alert.title = title
    alert.message = message
    alert.addTextField(placeholder, value)
    alert.addAction("OK")
    alert.addCancelAction("Cancel")
    let idx = await alert.present()
    if (idx != -1) {
      return alert.textFieldValue(0)
    } else {
      throw new Error("Cancelled entering value")
    }
  }
}

/**
 *
 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
 *    :$.time('yyyyMMddHHmmssS')
 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
 * @param {*} fmt 格式化参数
 * @param {*} ts 时间戳 13位
 */
const time = (fmt, ts = null) => {
  const date = ts ? new Date(ts) : new Date()
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}

/**
 * @description create wiget
 * @param {*} pretitle required
 * @param {*} title required
 * @param {*} subtitle option
 * @param {*} other option
 */
const createWidget = (pretitle, title, subtitle = '', other = '') => {
  let w = new ListWidget()
  
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#a1c4fd"), new Color("#c2e9fb")]
  bgColor.locations = [0.0, 1.0]
  w.backgroundGradient = bgColor
  w.addSpacer();
  w.spacing = 5;
  
  let preTxt = w.addText(pretitle)
  preTxt.textColor = Color.black()
  preTxt.applyHeadlineTextStyling()
  
  let titleTxt = w.addText(title)
  titleTxt.textSize = 12
  titleTxt.textColor = Color.black()
  
  
  let subTxt = w.addText(subtitle)
  subTxt.textColor = Color.black()
  subTxt.textSize = 12  
  
  let otherTxt = w.addText(other)
  otherTxt.textColor = Color.black()
  otherTxt.textSize = 12 

  const updateLine = w.addText(`[更新] ${time('MM-dd HH:mm')}`)
  updateLine.textSize = 12
  updateLine.textColor = Color.black()
  
  w.presentSmall()
  return w
}


const logErr = (e, messsage) => {
  console.error(e)
}

module.exports = {
  dict,
  get,
  getStr,
  post,
  _post,
  getFile,
  require,
  write,
  isFileExists,
  initFile,
  read,
  setdata,
  getdata,
  hasdata,
  rmdata,
  msg,
  input,
  time,
  createWidget,
  logErr
}
