// subpackages/pages/practice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 gd(){
 wx.navigateTo({
   url: '../questions/index?examlevel=0&pattern=0',
 })
 },
 gx(){
  wx.navigateTo({
    url: '../questions/index?examlevel=0&pattern=1',
  })
 },
 gp(){
  wx.navigateTo({
    url: '../questions/index?examlevel=0&pattern=2',
  })
 },
 bd(){
  wx.navigateTo({
    url: '../questions/index?examlevel=1&pattern=0',
  })
 },
 bx(){
  wx.navigateTo({
    url: '../questions/index?examlevel=1&pattern=1',
  })
 },
 bp(){
  wx.navigateTo({
    url: '../questions/index?examlevel=1&pattern=2',
  })
 },
 zd(){
  wx.navigateTo({
    url: '../questions/index?examlevel=2&pattern=0',
  })
 },
 zx(){
  wx.navigateTo({
    url: '../questions/index?examlevel=2&pattern=1',
  })
 },
 zp(){
  wx.navigateTo({
    url: '../questions/index?examlevel=2&pattern=2',
  })
 },
 ad(){
  wx.navigateTo({
    url: '../questions/index?examlevel=3&pattern=0',
  })
 },
 ax(){
  wx.navigateTo({
    url: '../questions/index?examlevel=3&pattern=1',
  })
 },
 ap(){
  wx.navigateTo({
    url: '../questions/index?examlevel=3&pattern=2',
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})