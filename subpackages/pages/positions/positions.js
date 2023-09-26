// subpackages/pages/positions/positions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0
  },
 jian(){
  if(this.data.num<=0){
    wx.showToast({
      title: '满意分数最低为0分',
      icon:'none'
    })
    return
  }
  this.setData({
    num:this.data.num-1
  })
 },
 jia(){
   if(this.data.num>=10){
     wx.showToast({
       title: '满意分数最高为10分',
       icon:'none'
     })
     return
   }
  this.setData({
    num:this.data.num+1
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