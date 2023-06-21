// pages/wxindex/wxindex.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeId:'',
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      qrcodeId:options.ID
    })
    console.log(options.ID)
    this.getlist()
  },
   getlist(){
       wx.request({
            url: app.globalData.url+'api/user/scanQrcode',
            method:'POST',
            data:{
               qrcodeId:this.data.qrcodeId
            },
            success:(res)=>{
              console.log(res)
              if(res.data.code==0){
               this.setData({
                 list:res.data.data
               })
              }else{
               
              }
            }
          })
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

  },
 



})