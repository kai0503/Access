// subpackages/pages/frequency/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:Number,
  },
  radioChange(e){
  console.log(e.detail.value)
  this.setData({
    value:e.detail.value
  })
  },
  btn(){
    wx.request({
      url:app.globalData.url+'api/user/getSetUp',
      method:'POST',
      data:{
        testnum:this.data.value,
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: res.data.msg,
            icon:'success'
          })
        }
      }
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