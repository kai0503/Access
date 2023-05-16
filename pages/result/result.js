// pages/results/results.js
const app = getApp();


Page({
  data: {
    score:'',
    zql:''

  },

  onLoad(options) {
    // 查看答题成绩
   // console.log(options)
    this.setData({
      score:options.score
    })
    if(options.qualified==0){
      this.setData({
        zql:'不合格'
      })
    }else{
      this.setData({
        zql:'合格'
      })
    }
  },
  // 返回首页
  toIndex(){
    wx.reLaunch({
      url: '../index/index'
    })
  },
})