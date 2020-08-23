module.exports =  () => {
    return new(class {
      constructor() {
        this.request = new Request('')
        this.defaultHeaders = {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
  
      async get(opts) {
        this.request.url = opts.url
        this.request.headers = {
          ...opts.headers,
          ...this.defaultHeaders
        }
        return await this.request.loadJSON()
      }
  
      async post(opts) {
        const request = new Request(url)
        request.body = JSON.stringify(body)
        request.method = methods.post
        this.request.headers = {
          ...opts.headers,
          ...this.defaultHeaders
        }
        return await request.loadJSON()
      }
      
    })()
  }