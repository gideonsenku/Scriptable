// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: shoe-prints;
/**
 * Author: GideonSenku  evilbutcher
 * Github: https://github.com/GideonSenku
 */

const $ = importModule("Env")

const title = 'SNKRS'
const preview = 'medium' // 预览大小 可选:small,medium,large
const spacing = 5 // 间隙大小

const res = await getinfo()
await render()

async function render() {
  // create and show widget
  if (config.runsInWidget) {
    let widget = await createWidget(res)
    Script.setWidget(widget)
    Script.complete()
  } else {
    await createWidget(res)
  }
}

async function createWidget(res) {
  // 标签: res[0].productInfo[0].merchProduct.labelName
  // 价格: res[0].productInfo[0].merchPrice.currentPrice
  // 发布时间: res[0].productInfo[0].launchView.startEntryDate.substr(0, 10)
  const infoLine = []
  for (const product of res) {
    const date = product.productInfo[0].launchView.startEntryDate.slice(5, 10)
    const labelName = product.productInfo[0].merchProduct.labelName
    const price = product.productInfo[0].merchPrice.currentPrice
    const Line = `•  ${date} ${labelName} ¥${price}`
    infoLine.push(Line)
  }
  const opts = {
    title,
    texts: {
      Line0: infoLine[0],
      Line1: infoLine[1],
      Line2: infoLine[2],
      Line3: infoLine[3],
      Line4: infoLine[4],
      Line5: infoLine[5],
      battery: 'true'
    },
    preview,
    spacing
  }
  let widget = await $.createWidget(opts)
  return widget
}

async function getinfo() {
  const url = {
    url: `https://api.nike.com/product_feed/threads/v2/?anchor=0&count=36&filter=marketplace%28CN%29&filter=language%28zh-Hans%29&filter=upcoming%28true%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&sort=effectiveStartSellDateAsc&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.subType%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title`,
  }
  const res = await $.get(url)
  return res.objects
}