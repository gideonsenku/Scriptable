module.exports = () => {
  return new(class {
    constructor() {
      this.request = new Request('')
      this.defaultHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }

    async get({
      url,
      headers = {}
    }) {
      this.request.url = url
      this.request.method = 'GET'
      this.request.headers = {
        ...headers,
        ...this.defaultHeaders
      }
      return await this.request.loadJSON()
    }

    async getStr({
      url,
      headers = {}
    }) {
      this.request.url = url
      this.request.method = 'GET'
      this.request.headers = {
        ...headers,
        ...this.defaultHeaders
      }
      return await this.request.loadString()
    }

    async post({
      url,
      body,
      headers = {}
    }) {
      this.request.url = url
      this.request.body = body ? JSON.stringify(body) : `{}`
      this.request.method = 'POST'
      this.request.headers = {
        ...headers,
        ...this.defaultHeaders
      }
      return await this.request.loadJSON()
    }

  })()
}