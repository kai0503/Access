// pages/item/item.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unit:'',
    item:'',
    person:'',
    phone:'',
    startdate: '',
    enddate: '',
  },
  go(){
      wx.redirectTo({
        url: '../wxpersonnel/wxpersonnel',
      })
  },
  radioChange(e){
     this.setData({
       unit:e.detail.detail.value
     })
  },
  radioChangeitem(e){
    this.setData({
      item:e.detail.detail.value
    })
 },
 radioChangeperson(e){
  this.setData({
    person:e.detail.detail.value
  })
},
radioChangephone(e){
  this.setData({
    phone:e.detail.detail.value
  })
},
  getToday: function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
      month = '0' + month;
    };
    if (day < 10) {
      day = '0' + day;
    };
    
    // 如果需要时分秒
    // var h = now.getHours();
    // var m = now.getMinutes();
    // var s = now.getSeconds();
    var formatDate = year + '-' + month + '-' + day;
    return formatDate;
  },
  startDateChange(e) {
    this.setData({
      startdate: e.detail.value
    })
   // console.log(this.data.startdate)
  },
  endDateChange(e) {
    this.setData({
      enddate: e.detail.value
    })
    //console.log(this.data.enddate)
  },
  getuser(){
    let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    //console.log(this.data.unit,this.data.item,this.data.person,this.data.phone,this.data.startdate,this.data.enddate)
    if(this.data.unit==''||this.data.item==''||this.data.person==''||this.data.phone==''||this.data.startdate==''||this.data.enddate==''){
           wx.showToast({
             title: '请把信息填写完整',
             icon:'none'
           })
    }else if(!reg_tel.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
    }else{
      wx.request({
        url: app.globalData.url+"api/pubproject/projectUp",
        method:'POST',
        data:{
          userid:wx.getStorageSync('userid'),
          name:this.data.item,
          phone:this.data.phone,
          starttime:this.data.startdate,
          endtime:this.data.enddate,
          projectcustinfo:this.data.person
        },
        success:(res)=>{
         // console.log(res.data.code)
          if(res.data.code==0){
            wx.showToast({
              title: res.data.msg,
              mask:true
            })
            setTimeout(()=>{
              wx.navigateBack({ changed: true });//返回上一页
            },1000)
        }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let data=wx.getStorageSync('wxuser')
    this.setData({
      startdate: this.getToday(),
      enddate: this.getToday(),
      unit:data.name
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