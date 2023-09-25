//app.js
App({
  // onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  //   wx.getSystemInfo({
  //     success: e => {
  //       this.globalData.StatusBar = e.statusBarHeight;
  //       let capsule = wx.getMenuButtonBoundingClientRect();
  //       if (capsule) {
  //         this.globalData.Custom = capsule;
  //         this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
  //       } else {
  //         this.globalData.CustomBar = e.statusBarHeight + 50;
  //       }
  //     }
  //   })
  // },
  globalData: {
  url: "https://zkqx.sdlczq.cn/xjmj/",  
   //  url: "http://192.168.3.250:8013/",
//url: "http://192.168.2.32:8013/",
   //url: "http://192.168.1.11:8013/",
    // userInfo: null,
    wechatId: '',
    sessionCode: '',
    token: '',
    //rand:5 + Math.ceil(Math.random() * 15),
  }
})