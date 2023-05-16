// subpackages/pages/sign/index.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:'',
    isActives:'',
    isActivess:'',
    isActivesss:'',
    isActivessss:'',
    value:'',
    name:'',
    ID:'',
    issign:'',
    creattime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let name=wx.getStorageSync('wxuser').name
    console.log(this.data.issign)
    console.log(options)
      this.setData({
        ID:options.ID,
        name:name
      })

   
  },
  xm_d(){
    console.log('111')
    this.setData({
      isActive:'1'
    })
  },
  xm_c(){
    console.log('222')
    this.setData({
      isActive:'2'
    })
  },
  xm_ds(){
    console.log('111')
    this.setData({
      isActives:'1'
    })
  },
  xm_cs(){
    console.log('222')
    this.setData({
      isActives:'2'
    })
  },
  xm_dss(){
    console.log('111')
    this.setData({
      isActivess:'1'
    })
  },
  xm_css(){
    console.log('222')
    this.setData({
      isActivess:'2'
    })
  },
  xm_dsss(){
    console.log('111')
    this.setData({
      isActivesss:'1'
    })
  },
  xm_csss(){
    console.log('222')
    this.setData({
      isActivesss:'2'
    })
  },
  xm_dssss(){
    console.log('111')
    this.setData({
      isActivessss:'1'
    })
  },
  xm_cssss(){
    console.log('222')
    this.setData({
      isActivessss:'2'
    })
  },
  getval(e){
  console.log(e.detail.value) 
  this.setData({
    value:e.detail.value
  })
  },
  postval(){
       console.log(this.data.isActive,this.data.isActives,this.data.isActivess,this.data.isActivesss,this.data.isActivessss,this.data.value)
  },
  getqd(){
    console.log('111')
    wx.request({
      url: app.globalData.url+'api/user/scanQrcode',
      method:'POST',
      data:{
         userid:wx.getStorageSync('userid'),
         qrcodeId:this.data.ID,
         type:'1'
      },
      success:(res)=>{
        console.log(res.data)
        if(res.data.code==0){
          this.setData({
            creattime:res.data.data.createtime,
            issign:res.data.data.issign
          })
          console.log(this.data.creattime,this.data.issign)
        }
      }
    })
  },
 qd(){
   console.log(this.data.ID)
    wx.request({
      url: app.globalData.url+'api/user/scanQrcode',
      method:'POST',
      data:{
         userid:wx.getStorageSync('userid'),
         qrcodeId:this.data.ID
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title:res.data.msg,
            icon:'success'
          })
          this.setData({
            creattime:res.data.data.createtime,
            issign:res.data.data.issign
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'success'
          })
        }
      }
    })
 },
  getNowDate: function () {
 
 
    var date = new Date();
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1//月
    var day = date.getDate()//日

    var hour = date.getHours()//时
    var minute = date.getMinutes()//分
    var second = date.getSeconds()//秒

    var xiaoshi = "";
    if (hour < 10) {
        xiaoshi = "0" + hour;
    } else {
        xiaoshi = hour + "";
    }

    var fenzhong = "";
    if (minute < 10) {
        fenzhong = "0" + minute;
    } else {
        fenzhong = minute + "";
    }

    var miao = "";
    if (second < 10) {
        miao = "0" + second;
    } else {
        miao = second + "";
    }
    console.log(year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao);
    this.setData({
        nowTime: year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
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
    this.getqd()
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