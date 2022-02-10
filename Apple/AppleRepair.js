// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: wrench;
/**
 * Author: GideonSenku
 * Github: https://github.com/GideonSenku
 */

 const $ = importModule("Env")

 const title = 'AppleRepair'
 const preview = 'medium' // 预览大小 可选:small,medium,large
 const spacing = 5 // 间隙大小
 
 const repairId = 'xxxx'
 const serialNumber = 'xxxxx'


 const repairMetaData = await getinfo()
 await render()
 
 async function render() {
   // create and show widget
   if (config.runsInWidget) {
     let widget = await createWidget(repairMetaData)
     Script.setWidget(widget)
     Script.complete()
   } else {
     await createWidget(repairMetaData)
   }
 }
 
 async function createWidget(repairMetaData) {
   const texts = {}

   repairMetaData.repairDetails.forEach((detail, idx) => {
    const date = $.time('MM-dd HH:mm', detail?.time)
    const labelName = detail?.status
    const Line = `• ${date} ${labelName}`
     texts[`text${idx}`] = Line
   })

   texts.battery = 'true'

   const opts = {
     title,
     texts,
     preview,
     spacing
   }
   let widget = await $.createWidget(opts)
   return widget
 }
 
 async function getinfo() {
   const url = {
     url: `https://mysupport.apple.com/api/v1/supportaccount/getRepairStatus?repairId=${repairId}&serialNumber=${serialNumber}`,
     headers: {
       'Cookie': 'SA-Locale=zh_CN;'
    },
   }
   const { data } = await $.get(url)
   return data?.repairMetaData
 }