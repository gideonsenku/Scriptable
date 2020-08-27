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
  logErr
}
