// pages/Management/Management.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stafftype:null
  },
  jumpwz(){
   wx.navigateTo({
     url: '../../subpackages/pages/regulations/regulations',
   })
  },
  jumpsjxx(){
   wx.navigateTo({
     url: '../../subpackages/pages/driverimg/driverimg',
   })
  },
  jumpxcjc(){
      // wx.navigateTo({
      //   url: '../../subpackages/pages/inspection/inspection',
      // })
      wx.navigateTo({
        url: '../../subpackages/pages/safeinfo/safeinfo',
      })
  },
  jumprygw(){
  wx.navigateTo({
    url: '../../subpackages/pages/positions/positions',
  })
  },
  jumpyjcz(){
   wx.navigateTo({
     url: '../../subpackages/pages/emergency/emergency',
   })
  },
  jumpsecure(){
       wx.navigateTo({
         url: '../../subpackages/pages/secure/secure',
       })
  },
  jumpcoal(){
  wx.navigateTo({
    url: '../../subpackages/pages/coal/coal',
  })
  },
  jumpsafety(){
     wx.navigateTo({
       url: '../../subpackages/pages/safety/safety',
     })
  },
  QR(){
    wx.scanCode({
      success:(res)=>{
        console.log(res)
        if(res.result!=''){
          this.setData({
            ID:res.result
          })
          // if(res.result.substr(0,1)=='D'){
          //   wx.navigateTo({
          //     url: '../wxindex/wxindex?ID='+this.data.ID,
          //   })
          // }else{
          //   wx.navigateTo({
          //     url: '../../subpackages/pages/sign/index?ID='+this.data.ID,
          //   })
          // }
         
          wx.request({
            url: app.globalData.url+'api/user/scanQrcode',
            method:'POST',
            data:{
               qrcodeId:res.result
            },
            success:(res)=>{
              console.log(res)
              if(res.data.code==0){
                if(res.data.data.codeno!=null&&res.data.data.codeno.substr(0,1)=='D'){
            wx.navigateTo({
              url: '../wxindex/wxindex?ID='+res.data.data.codeno,
            })
          }else{
            wx.navigateTo({
              url: '../../subpackages/pages/sign/index?ID='+res.data.data,
            })
          }
              }else{
                wx.showToast({
                  title:res.data.msg,
                  icon:'error'
                })
              }
            }
          })
    
        }
      }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stafftype:wx.getStorageSync('wxuser').stafftype
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