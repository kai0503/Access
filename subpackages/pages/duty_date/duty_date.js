// subpackages/pages/duty_date/duty_date.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageNum:1
  },
  getlist(){
  wx.request({
    url: app.globalData.url+'api/getAddressCount',
    method:'POST',
    data:{
      userid:wx.getStorageSync('userid'),
      type:0,
      pageSize:20,
      pageNum:this.data.pageNum
    },
    success:res=>{
      console.log(res)
      if(res.data.code==0){
        this.setData({
          list:res.data.data
        })
      }
    }
  })
  },
  getlists(){
    this.setData({
      pageNum:this.data.pageNum+1
    })
    console.log(this.data.pageNum)
    wx.showLoading({
      title: '加载中',
      icon:'loading'
    })
    wx.request({
      url: app.globalData.url+'api/getAddressCount',
      method:'POST',
      data:{
        userid:wx.getStorageSync('userid'),
        type:0,
        pageSize:10,
        pageNum:this.data.pageNum
      },
      success:res=>{
        console.log(res)
      }
    })



  },
  jump_sort(e){
    console.log('111')
   console.log(e)
   wx.navigateTo({
     url: '../Location_photo/Location_photo',
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
   this.getlist()
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
  // onReachBottom: function () {
  //   this.getlists()
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})