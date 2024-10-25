// subpackages/pages/Company_personnel/Company_personnel.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgid:'',
    pageNum:1,
    list_form:[]
  },
 getlist(){
  wx.request({
    url: app.globalData.url+'api/pubpeoplenum/peopleNumByorgid',
    method:'POST',
    data:{
      orgid:this.data.orgid,
      pageSize:20,
      pageNum:this.data.pageNum
    },
    success:res=>{
      console.log(res.data.code)
    if(res.data.code==0){
     this.setData({
       list_form:res.data.data
     })
    }
    }
   })
 },
 getlists(){
  this.setData({
    pageNum:this.data.pageNum+1
  })
  wx.showLoading({
    title: '加载中',
    icon:'loading'
  })
  wx.request({
    url: app.globalData.url+'api/pubpeoplenum/peopleNumByorgid',
    method:'POST',
    data:{
      orgid:this.data.orgid,
      pageSize:20,
      pageNum:this.data.pageNum
    },
    success:res=>{
    
    if(res.data.code==0){
      this.setData({
        list_form:[...this.data.list_form,...res.data.data]
      })
      wx.hideLoading({
        success: (res) => {},
      })
    }
    }
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.orgid)
  this.setData({
    orgid:options.orgid
  })
  this.getlist()
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
    this.getlists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})