// subpackages/pages/picturesimg/picturesimg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  img:[],
  imgs:''
  },
// 预览图片
previewImg: function (e) {
  console.log(e)
  //获取当前图片的下标
 var index = 0;
  //所有图片
 var imgs = this.data.img;
 wx.previewImage({
  //当前显示图片
  current: imgs[index],
  //所有图片
  urls: imgs
 })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
     this.data.img.push(options.img)
     console.log(this.data.img)
     this.setData({
       imgs:options.img
     })
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