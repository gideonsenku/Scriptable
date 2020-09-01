// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
const targetDay = new Date(2020, 12, 22) //设置目标日期（年，月，日，时，分，秒）

const leftTime = await leftTimer()
if (config.runsInWidget) {
  let widget = createWidget(leftTime)
  Script.setWidget(widget)
  Script.complete()
}

function createWidget(leftTime) { 

  const w = new ListWidget()
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#1c1c1c"), new Color("#29323c")]
  bgColor.locations = [0.0, 1.0]
  w.backgroundGradient = bgColor
  w.presentSmall()
  w.spacing = 5

  const line0 = w.addText(`距离`)
  line0.textColor = Color.white()
  line0.textSize = 12 
  line0.textOpacity = 0.7
  
  const line1 = w.addText(`重要的日子`)
  line1.textColor = Color.white()
  line1.textSize = 15

  const line2 = w.addText(`还有`)
  line2.textColor = Color.white()
  line2.textSize = 12
  line2.textOpacity = 0.7
  
  const line3 = w.addText(`${leftTime[0]}天`)
  line3.textColor = Color.white()
  line3.textSize = 28
  
  return w
}

function leftTimer(){ 
  var leftTime = (new Date(targetDay)) - (new Date()); //计算剩余的毫秒数 
  var days = parseInt(leftTime / 1000 / 60 / 60 / 24 - 31, 10); //计算剩余的天数 
  var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
  var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
  var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 

  var leftTime=new Array();
  leftTime[0] = checkTime(days); 
  leftTime[1] = checkTime(hours); 
  leftTime[2] = checkTime(minutes); 
  leftTime[3] = checkTime(seconds); 
  
  log(leftTime)
  return leftTime
} 

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
	if(i<10) { 
 		i = "0" + i; 
 	}
 	return i; 
} 