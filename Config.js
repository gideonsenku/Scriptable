// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: plus;
/*
 * Author: evilbutcher
 * Github: https://github.com/evilbutcher
 */

module.exports = {
  bilibili: () => 0, //👈就改这个数字。B站榜单对应关系：0全站，1动画，3音乐，4游戏，5娱乐，36科技，119鬼畜，129舞蹈。
  blnum: () => 6, //自定义B站显示数量
  blrancolor: () => true, //是否开启B站随机颜色
  dbnum: () => 6, //自定义豆瓣显示数量
  dbrancolor: () => true, //是否开启豆瓣随机颜色
  rrnum: () => 6, //自定义人人影视显示数量
  rrrancolor: () => true, //是否开启人人影视随机颜色
  rsslink: () => "https://github.com/GideonSenku/Scriptable/commits/master.atom", //👈就改引号里的链接。
  rssnum: () => 6, //自定义RSS显示数量
  rssrancolor: () => true, //是否开启RSS随机颜色
  wbnum: () => 6, //自定义微博显示数量
  wbrancolor: () => true, //是否开启微博随机颜色
  zhnum: () => 6, //自定义知乎显示数量
  zhrancolor: () => true, //是否开启知乎随机颜色
  nasaapi: () => "", //填写NASA API Key
  imglink: () => "http://api.btstu.cn/sjbz/zsy.php", //NASA备用图片地址，可自定义
  checkintitle: () => "", //填写签到标题
  checkinloginurl: () => "", //填写签到登陆链接
  checkinemail: () => "", //填写签到邮箱
  checkinpwd: () => "", //填写签到密码
};
