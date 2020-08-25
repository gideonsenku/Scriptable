/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */


const request = new Request('')
const dict = FileManager.iCloud().documentsDirectory()
const defaultHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

const get = async ({url, headers = {}}, callback = () => {}) => {
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

const getStr = async ({url, headers = {}}, callback = () => {}) => {
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

const post = async ({url, body, headers = {}}) => {
  request.url = url
  request.body = body ? JSON.stringify(body) : `{}`
  request.method = 'POST'
  request.headers = {
    ...headers,
    ...defaultHeaders
  }
  const data = await request.loadString()
  callback(request.response, data)
  return data
}

const getFile = async ({moduleName, url}) => {
  log(`开始下载文件: 🌝 ${moduleName}`)
  const header = `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: file-code;\n`;
  const content = await getStr({url})
  const fileHeader = content.includes('icon-color') ? `` : header
  writeFile(`${moduleName}`, `${fileHeader}${content}`)
  log(`文件下载完成: 🌚 ${moduleName}`)
}

const require = async ({
  moduleName,
  url = '',
  forceDownload = false
}) => {
  if (isFileExists(moduleName) && !forceDownload) {
    log(`导入模块: 🪐${moduleName}`)
    return importModule(moduleName)
  } else {
    await getFile({
      moduleName,
      url
    })
    log(`导入模块: 🪐${moduleName}`)
    return importModule(moduleName)
  }
}

const writeFile = (fileName, content) => {
  let file = initFile(fileName)
  const filePath = `${dict}/${file}`
  FileManager.iCloud().writeString(filePath, content)
  return true
}

const isFileExists = (fileName) => {
  let file = initFile(fileName)
  return FileManager.iCloud().fileExists(`${dict}/${file}`)
}

const initFile = (fileName) => {
  const hasSuffix = fileName.lastIndexOf('.') + 1
  return !hasSuffix ? `${fileName}.js` : fileName
}

const readFile = (fileName) => {
  const file = initFile(fileName)
  return FileManager.iCloud().readString(`${dict}/${file}`)
}

const msg = (title, message, btnMes = 'Cancel') => {
  if (!config.runsInWidget) {
    const alert = new Alert()
    alert.title = title
    alert.message = message
    alert.addAction(btnMes)
    alert.present()
  }
}

const logErr = (e, messsage) => {
  console.error(e)
}

module.exports = {
  dict,
  get,
  getStr,
  post,
  getFile,
  require,
  writeFile,
  isFileExists,
  initFile,
  readFile,
  msg,
  logErr
}