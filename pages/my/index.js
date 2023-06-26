// pages/my/index.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    stafftype:'',
    ID:'',
    isChecked1:false,
    isCheckedvideo:false,
  },
  changeSwitch1(e){
    console.log(e.detail.value)
    wx.setStorageSync('check', e.detail.value)
    this.setData({
      isChecked1:e.detail.value
    })
    if(e.detail.value==true){
      e.detail.value=0
    }else{
      e.detail.value=1
    }
    console.log(e.detail.value)
    wx.request({
      url:app.globalData.url+'api/user/getSetUp',
      method:'POST',
      data:{
        isopen:e.detail.value,
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '设置成功',
            icon:'success'
          })
        }
      }
    })
  },
  changeSwitchvideo(e){
    console.log(e.detail.value)
    wx.setStorageSync('check', e.detail.value)
    this.setData({
      isCheckedvideo:e.detail.value
    })
    if(e.detail.value==true){
      e.detail.value=1
    }else{
      e.detail.value=0
    }
    console.log(e.detail.value)
    wx.request({
      url:app.globalData.url+'api/user/openVideo',
      method:'POST',
      data:{
        open:e.detail.value,
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '设置成功',
            icon:'success'
          })
        }
      }
    })
  },
  chagepass(){
   wx.navigateTo({
   url:'../../subpackages/pages/changpass/index'
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
  shangchuan(){

 console.log('111')
  },
  logOut(){
    wx.clearStorage()
  wx.redirectTo({
    url: '/pages/login/index',
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var n = wx.getStorageSync("userinfo");
    let ischeck=wx.getStorageSync('setup').isopen
   let ischeckvideo=wx.getStorageSync('open')
    if(ischeck==1){
      this.setData({
        ischeck:false
      })
    }else if(ischeck==0){
      ischeck:true
    }
    if(ischeckvideo==0){
      this.setData({
        isCheckedvideo:false
      })
    }else if(ischeckvideo==1){
      isCheckedvideo:true
    }
   // console.log(n)
    this.setData({
      nickName:n.nickName,
      isChecked1:ischeck,
      //isCheckedvideo:isCheckedvideo
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
      let list =wx.getStorageSync('list')
      this.setData({
        username:list,
        stafftype:wx.getStorageSync('wxuser').stafftype
      })
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