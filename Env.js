/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */

var locationData, sunData
const currentDate = new Date()
const request = new Request('')
const files = FileManager.iCloud()
const dict = files.documentsDirectory()
files.isDirectory(`${dict}/Env`) ? `` : files.createDirectory(`${dict}/Env`)
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
 * @param {*} title required
 * @param {*} texts required
 * @param {*} preview option
 */
const createWidget = async({ title, texts = { },spacing = 5, preview = '' }) => {
  const SFMono = { size: 12, color: "ffffff", font: "SF Mono" }
  let w = new ListWidget()
  w.spacing = spacing
  let gradient = new LinearGradient()
  let gradientSettings = await setupGradient()
  
  gradient.colors = gradientSettings.color()
  gradient.locations = gradientSettings.position()
  
  w.backgroundGradient = gradient
  texts['battery'] ? battery(w, title) : ``
  for (const text in texts) {
    if (text != 'battery' && text != 'updateTime' && texts.hasOwnProperty(text)) {
      const element = texts[text]
      provideText(element, w, SFMono)
    }
  }
  texts['updateTime'] ? provideText(`[更新] ${time('MM-dd HH:mm')}`, w, SFMono) : ``  
  
  widgetPreview = preview ? preview: 'small'
  
  if(widgetPreview == "small") { w.presentSmall() }
  else if (widgetPreview == "medium") { w.presentMedium() }
  else if (widgetPreview == "large") { w.presentLarge() }
  return w
}


/**
 * @description Provide a font based on the input.
 * @param {*} fontName 
 * @param {*} fontSize 
 */
const provideFont = (fontName, fontSize) => {
  const fontGenerator = {
    "ultralight": function() { return Font.ultraLightSystemFont(fontSize) },
    "light": function() { return Font.lightSystemFont(fontSize) },
    "regular": function() { return Font.regularSystemFont(fontSize) },
    "medium": function() { return Font.mediumSystemFont(fontSize) },
    "semibold": function() { return Font.semiboldSystemFont(fontSize) },
    "bold": function() { return Font.boldSystemFont(fontSize) },
    "heavy": function() { return Font.heavySystemFont(fontSize) },
    "black": function() { return Font.blackSystemFont(fontSize) },
    "italic": function() { return Font.italicSystemFont(fontSize) }
  }
  
  const systemFont = fontGenerator[fontName]
  if (systemFont) { return systemFont() }
  return new Font(fontName, fontSize)
}
 

/**
 * @description Add formatted text to a container.
 * @param {*} string 
 * @param {*} container widget container
 * @param {*} format Object: size, color, font
 */
const provideText = (string, container, format) => {
  const textFormat = {
    defaultText: { size: 14, color: "ffffff", font: "regular" }
  }
  const textItem = container.addText(string)
  const textFont = format.font || textFormat.defaultText.font
  const textSize = format.size || textFormat.defaultText.size
  const textColor = format.color || textFormat.defaultText.color
  
  textItem.font = provideFont(textFont, textSize)
  textItem.textColor = new Color(textColor)
  return textItem
}

// Set up the gradient for the widget background.
const setupGradient = async() => {
  
  // Requirements: sunrise
  if (!sunData) { await setupSunrise() }

  let gradient = {
    dawn: {
      color() { return [new Color("142C52"), new Color("1B416F"), new Color("62668B")] },
      position() { return [0, 0.5, 1] },
    },

    sunrise: {
      color() { return [new Color("274875"), new Color("766f8d"), new Color("f0b35e")] },
      position() { return [0, 0.8, 1.5] },
    },

    midday: {
      color() { return [new Color("3a8cc1"), new Color("90c0df")] },
      position() { return [0, 1] },
    },

    noon: {
      color() { return [new Color("b2d0e1"), new Color("80B5DB"), new Color("3a8cc1")] },
      position() { return [-0.2, 0.2, 1.5] },
    },

    sunset: {
      color() { return [new Color("32327A"), new Color("662E55"), new Color("7C2F43")] },
      position() { return [0.1, 0.9, 1.2] },
    },

    twilight: {
      color() { return [new Color("021033"), new Color("16296b"), new Color("414791")] },
      position() { return [0, 0.5, 1] },
    },

    night: {
      color() { return [new Color("16296b"), new Color("021033"), new Color("021033"), new Color("113245")] },
      position() { return [-0.5, 0.2, 0.5, 1] },
    },
  }

  const sunrise = sunData.sunrise
  const sunset = sunData.sunset
  const utcTime = currentDate.getTime()

  function closeTo(time,mins) {
    return Math.abs(utcTime - time) < (mins * 60000)
  }

  // Use sunrise or sunset if we're within 30min of it.
  if (closeTo(sunrise,15)) { return gradient.sunrise }
  if (closeTo(sunset,15)) { return gradient.sunset }

  // In the 30min before/after, use dawn/twilight.
  if (closeTo(sunrise,45) && utcTime < sunrise) { return gradient.dawn }
  if (closeTo(sunset,45) && utcTime > sunset) { return gradient.twilight }

  // Otherwise, if it's night, return night.
  if (isNight(currentDate)) { return gradient.night }

  // If it's around noon, the sun is high in the sky.
  if (currentDate.getHours() == 12) { return gradient.noon }
  // Otherwise, return the "typical" theme.
  return gradient.midday
}

// Set up the sunData object.
const setupSunrise = async () => {

  // Requirements: location
  if (!locationData) { await setupLocation() }

  // Set up the sunrise/sunset cache.
  const sunCachePath = files.joinPath(dict, "Env/Env-sun")
  const sunCacheExists = files.fileExists(sunCachePath)
  const sunCacheDate = sunCacheExists ? files.modificationDate(sunCachePath) : 0
  var sunDataRaw

  // If cache exists and it was created today, use cached data.
  if (sunCacheExists && sameDay(currentDate, sunCacheDate)) {
    const sunCache = files.readString(sunCachePath)
    sunDataRaw = JSON.parse(sunCache)

  // Otherwise, use the API to get sunrise and sunset times.
  } else {
    const sunReq = "https://api.sunrise-sunset.org/json?lat=" + locationData.latitude + "&lng=" + locationData.longitude + "&formatted=0&date=" + currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate()
    sunDataRaw = await new Request(sunReq).loadJSON()
    files.writeString(sunCachePath, JSON.stringify(sunDataRaw))
  }

  // Store the timing values.
  sunData = {}
  sunData.sunrise = new Date(sunDataRaw.results.sunrise).getTime()
  sunData.sunset = new Date(sunDataRaw.results.sunset).getTime()
}

const setupLocation = async (lockLocation = true) => {

  locationData = {}
  const locationPath = files.joinPath(dict, "Env/Env-location")

  // If our location is unlocked or cache doesn't exist, ask iOS for location.
  var readLocationFromFile = false
  if (!lockLocation || !files.fileExists(locationPath)) {
    try {
      const location = await Location.current()
      locationData.latitude = location.latitude
      locationData.longitude = location.longitude
      files.writeString(locationPath, location.latitude + "," + location.longitude)
      
    } catch(e) {
      // If we fail in unlocked mode, read it from the cache.
      if (!lockLocation) { readLocationFromFile = true }
      
      // We can't recover if we fail on first run in locked mode.
      else { return }
    }
  }
  
  // If our location is locked or we need to read from file, do it.
  if (lockLocation || readLocationFromFile) {
    const locationStr = files.readString(locationPath).split(",")
    locationData.latitude = locationStr[0]
    locationData.longitude = locationStr[1]
  }
  return locationData
}

// Determines if the provided date is at night.
const isNight = (dateInput) => {
  const timeValue = dateInput.getTime()
  return (timeValue < sunData.sunrise) || (timeValue > sunData.sunset)
}
// Determines if two dates occur on the same day
const sameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}
/**
 * @description 返回电池百分比
 */
const renderBattery = () => {
  const batteryLevel = Device.batteryLevel()
  const batteryAscii = `${Math.round(batteryLevel * 100)}%`
  return batteryAscii
}


// Add a battery element to the widget; consisting of a battery icon and percentage.
function battery(column,title) {
  const textFormat = {
    battery: { size: 10, color: "", font: "bold" },
    title: { size: 16, color: "", font: "semibold" },
  }
  const batteryLevel = Device.batteryLevel()
  // Set up the battery level item
  let batteryStack = column.addStack()
  provideText(title, batteryStack, textFormat.title)
  batteryStack.centerAlignContent()
  
  batteryStack.addSpacer()
  
  let batteryIcon = batteryStack.addImage(provideBatteryIcon())
  batteryIcon.imageSize = new Size(20,20)
  

  // Change the battery icon to red if battery level is <= 20 to match system behavior
  if ( Math.round(batteryLevel * 100) > 20 || Device.isCharging() ) {

    batteryIcon.tintColor = Color.white()

  } else {

    batteryIcon.tintColor = Color.red()

  }

  // Display the battery status
  let batteryInfo = provideText('  '+renderBattery(), batteryStack, textFormat.battery)


}


// Provide the SF Symbols battery icon depending on the battery level.
function provideBatteryIcon() {
  
  // Charging symbol
  if ( Device.isCharging() ) {

    let batIcon = SFSymbol.named("battery.100.bolt")
    batIcon.applyLightWeight()

    return batIcon.image
  }
  
  const batteryLevel = Device.batteryLevel()
  
  // Battery mostly full
  if ( Math.round(batteryLevel * 100) > 65 ) {

    let batIcon = SFSymbol.named("battery.100")
    batIcon.applyLightWeight()

    return batIcon.image
  }
  
  // Battery getting low
  if ( Math.round(batteryLevel * 100) > 30 ) {

    let batIcon = SFSymbol.named("battery.25")
    batIcon.applyLightWeight()

    return batIcon.image
  }
  
  // Low battery
  let batIcon = SFSymbol.named("battery.0")
  batIcon.applySemiboldWeight()

  return batIcon.image
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
  provideText,
  setupLocation,
  renderBattery,
  logErr
}
