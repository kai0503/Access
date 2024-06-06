// subpackages/pages/Location_photo/Location_photo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_form:[],
    user:'',
    addressid:''
  },
  getAddressDetail(){
    wx.request({
      url: app.globalData.url+'api/getAddressDetail',
      method:'POST',
      data:{
        userid:wx.getStorageSync('userid'),
        addressid:this.data.addressid
      },
      success:res=>{
        console.log(res,'1111111111111')
        if(res.data.code==0){
          res.data.data.forEach(item=>{
            console.log(item.photo)
           item.photo=item.photo.split(',').filter(item=>
            item.length!=0,
           
            );
            console.log(item.photo)
          })
          this.setData({
            list_form:res.data.data
          })
          console.log(this.data.list_form)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.addressid)
    this.setData({
      addressid:options.addressid,
      user:app.globalData.url
    })
  this.getAddressDetail()
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