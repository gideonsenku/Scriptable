# Scriptable


## China Unicom Info

> 2020.08.23 第一次实现联通信息脚本

### 食用方式
0. 前提你需要一个`Scriptable` [TestFlight地址](https://testflight.apple.com/join/uN1vTqxk)
1. 文件问题(任意选一个作为方案)
   - 下载本仓库的`Env.js`和`10010.js`保存到`Scriptable`(记得将脚本命名为Env和10010)
   - 下载本仓库的`Env.scriptable`和`10010.scriptable`直接导入到`Scriptable`
   - 以上两种区别在于图标和文件名是否需要手动重命名
2. 修改`10010`脚本的个人数据
   - tel: 你的联通电话号码
   - VAL_loginheader: 来自BoxJs的数据`chavy_tokenheader_10010`

3. 小组件样式参考[@spencerwooo](https://gist.github.com/spencerwooo/7955aefc4ffa5bc8ae7c83d85d05e7a4)
4. 添加小组件并选取`10010`脚本即可