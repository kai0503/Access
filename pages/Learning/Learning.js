// pages/Learning/Learning.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    time:5
  },
  jumpwdxx(){
      wx.navigateTo({
        url: '../personnel/personnel',
      })
  },
  jumpwdks(){
     wx.navigateTo({
       url: '../information/information',
     })
  },
  jumpksjg(){
   wx.navigateTo({
     url: '../xuexi/index',
   })
  },
  jumpkqlx(){
      wx.navigateTo({
        url: '../../subpackages/pages/practice/index',
      })
  },
  rypx(){
   this.setData({
     flag:true,
   })
   var time=setInterval(() => {
      this.setData({
        time:this.data.time-1
      })
      if(this.data.time==0){
        clearInterval(time)
       return
      }
   }, 1000);
  },
  queren(){
   this.setData({
     flag:false
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})