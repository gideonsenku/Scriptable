// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: keyboard;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */

// init
const $ = new importModule('Env')()
// require some file,if file is JS and support module you can use it dirtctly
const opts = {
  moduleName: "vue",
  url: "https://cdn.jsdelivr.net/npm/vue@2.6.11"
  /** option:foreceDownload type:bool
  */
}
const Vue = await $.require(opts)
new Vue({
  template:`
  <h1>Hello,Vue</h1>
  `,
  data() {
    return {
      name: 'Senku',
      age: 18,
      height: '1.88'
    }
  },
  methods: {
    
  },
  computed: {
    
  },
  beforeCreate() {
    console.log("Vue beforeCreated")
  }
})

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

