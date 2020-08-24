// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: terminal;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */
module.exports = () => {
  return new(class {
    constructor() {
      this.request = new Request('')
      this.documentDirectory = FileManager.iCloud().documentsDirectory()
      this.defaultHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }

    async get({ url, headers = {} }) {
      this.request.url = url
      this.request.method = 'GET'
      this.request.headers = {
        ...headers,
        ...this.defaultHeaders
      }
      return await this.request.loadJSON()
    }

    async getStr({ url, headers = {} }, callback = () => {}) {
      this.request.url = url
      this.request.method = 'GET'
      this.request.headers = {
        ...headers,
        ...this.defaultHeaders
      }
      const res = await this.request.loadString()
      callback(this.request.response)
      return res
    }

    async post({ url, body, headers = {} }) {
      this.request.url = url
      this.request.body = body ? JSON.stringify(body) : `{}`
      this.request.method = 'POST'
      this.request.headers = {
        ...headers,
        ...this.defaultHeaders
      }
      return await this.request.loadJSON()
    }
    
    async getFile({moduleName, url}) {
      const header = `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: file-code;\n`;
      const content = await this.getStr({ url })
      const fileHeader = content.includes('icon-color') ? `` : header
      this.writeFile(`${moduleName}`, `${fileHeader}${content}`)
    }
    
    async require({ moduleName, url = '', forceDownload = false }) {
      if (this.isFileExists(moduleName) && !forceDownload) {
        return importModule(moduleName)
      } else {
        await this.getFile({moduleName, url})
        return importModule(moduleName)
      }
    }

    writeFile(fileName, content) {
      let file = this.initFile(fileName)
      const filePath = `${this.documentDirectory}/${file}`
      FileManager.iCloud().writeString(filePath, content)
      return true
    }
    
    isFileExists(fileName) {
      let file = this.initFile(fileName)
      return FileManager.iCloud().fileExists(`${this.documentDirectory}/${file}`)
    }

    initFile(fileName) {
      const hasSuffix = fileName.lastIndexOf('.') + 1
      return !hasSuffix ? `${fileName}.js` : fileName
    }
    readFile(fileName) {
      const file = this.initFile(fileName)
      return FileManager.iCloud().readString(`${this.documentDirectory}/${file}`)
    }

  })()
}