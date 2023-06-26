// subpackages/pages/changpass/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    userid:'',
    oldpassword:'',
    newpassword:'',
    newpasswords:''
  },
  getoldpass(e){
    console.log(e)
    this.setData({
     oldpassword:e.detail.value
    })
  },
  getnewpass(e){
   console.log(e)
   this.setData({
    newpassword:e.detail.value
   })
 },
 getnewpassw(e){
  console.log(e)
  this.setData({
   newpasswords:e.detail.value
  })
},
submit(){
 console.log(this.data)
 if(this.data.oldpassword==''){
  wx.showToast({
    title: '请输入旧密码',
    icon:'none'
  })
 }else if(this.data.newpassword==''){
  wx.showToast({
   title: '请输入新密码',
   icon:'none'
 })
 }else if(this.data.newpasswords==''){
  wx.showToast({
   title: '请输入确认密码',
   icon:'none'
 })
 }else if(this.data.newpassword!=this.data.newpasswords){
  wx.showToast({
   title: '两次密码不一致',
   icon:'none'
 })
 }else{
    wx.request({
      url:app.globalData.url+"api/pubcustinfo/changePassword",
      method:'POST',
      data:{
       userid:this.data.userid,
       password:this.data.oldpassword,
       passwordNew:this.data.newpassword
      },
      success:res=>{
       console.log(res)
       if(res.data.code==0){
        wx.showToast({
          title: '修改成功',
          icon:'success'
        })
        setTimeout(()=>{
            wx.redirectTo({
              url: '../../../pages/login/index',
            })
        },1000)
       }else {
        wx.showToast({
          title: res.data.msg,
          icon:'error'
        })
       }
      }
    })
 }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
       this.setData({
        phone:wx.getStorageSync('wxuser').phone,
        userid:wx.getStorageSync('userid')
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

  }
})