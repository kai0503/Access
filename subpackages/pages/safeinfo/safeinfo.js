// subpackages/pages/safety/safety.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       list:[],
       findtime:''
  },
  goxxjx(e){
     console.log(e.currentTarget.dataset.bean.id)
     // wx.navigateTo({
      //   url: '../../subpackages/pages/inspection/inspection',
      // })
      wx.navigateTo({
        url: '../inspection/inspection?id='+e.currentTarget.dataset.bean.id,
      })
  },
getlist(){
       wx.request({
        url: app.globalData.url+'api/safe/getSafeinfo',
        method:'POST',
        data:{
          userid:'1111111111',
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
getNowDate: function () {
 
 
  var date = new Date();
  var year = date.getFullYear() //年
  var month = date.getMonth() + 1//月
  var day = date.getDate()//日

  var hour = date.getHours()//时
  var minute = date.getMinutes()//分
  var second = date.getSeconds()//秒
if(month<10){
  month="0"+month
}else{
  month=month+""
}
if(day<10){
  day="0"+day
}else{
  day=day+""
}
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
  
  this.setData({
    findtime: year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
  })
console.log(this.data.findtime)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getNowDate()
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})