
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  set_phone(e){
   console.log(e.currentTarget.dataset.bean.phone)
   wx.makePhoneCall({
     phoneNumber: e.currentTarget.dataset.bean.phone,
   })
  },
getlist(){
  wx.request({
    url: app.globalData.url+"api/getLineup",
    method:'POST',
    data:{
     userid:wx.getStorageSync('userid')
    },
    success:(res)=>{
      console.log(res)
      if(res.data.code==0){
        this.setData({
          list:res.data.data
        })
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('1111')
       this.getlist()
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