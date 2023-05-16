// pages/results/results.js
const app = getApp();


Page({
  data: {
    show:'',
    score:'',
    zql:''

  },

  onLoad(options) {
    // 查看答题成绩
    //console.log(options)
    this.setData({
      score:options.score
    })
    if(options.qualified==0){
      this.setData({
        zql:'不合格',
        show:true
      })
    }else if(options.qualified==1){
      this.setData({
        zql:'合格',
        show:false
      })
    }
  },

  toDoTestAgain(){
    wx.reLaunch({
      url: '/pages/examination/index'
    })
  },

  // 返回模拟试卷列表
  toIndex(){
    wx.reLaunch({
      url: '/pages/papar/papar'
    })
  },
})