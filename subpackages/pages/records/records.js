// subpackages/pages/safety/safety.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       list:[],
       imgs:[],
       pageNum:1,
       keyword:''
  },
  getkeyword(e){
     console.log(e)
     this.setData({
       keyword:e.detail.value
     })
  },
  sousuo(){
       this.setData({
         pageNum:1
       })
       this.getlist()
  },
getlist(){
       wx.request({
        url: app.globalData.url+'api/safe/getProblemByuserid',
        method:'POST',
        data:{
          userid:wx.getStorageSync('userid'),
          keyword:this.data.keyword,
          pageSize:10,
          pageNum:this.data.pageNum
        },
        success:res=>{
          console.log(res)
          if(res.data.code==0){
            
            res.data.data.forEach(item=>{
              item.proimgurl=app.globalData.url.concat(item.proimgurl)
            })
            console.log(res.data.data)
            this.setData({
              list:res.data.data
            })
          }
        }
       })
},
getlists(){
  this.setData({
    pageNum:this.data.pageNum+1
  })
  console.log(this.data.pageNum)
  wx.showLoading({
    title: '加载中',
    icon:'loading'
  })
  wx.request({
   url: app.globalData.url+'api/safe/getProblemByuserid',
   method:'POST',
   data:{
     userid:wx.getStorageSync('userid'),
     keyword:this.data.keyword,
     pageSize:10,
     pageNum:this.data.pageNum
   },
   success:res=>{
     console.log(res)
     if(res.data.code==0){
       
       res.data.data.forEach(item=>{
         item.proimgurl=app.globalData.url.concat(item.proimgurl)
       })
       console.log(res.data.data)
       this.setData({
         list:[...this.data.list,...res.data.data]
       })
       wx.hideLoading({
         success: (res) => {},
       })
     }
   }
  })
},
previewImg(e){
  console.log(e.currentTarget.dataset.index)
 var index = e.currentTarget.dataset.index;
 this.data.imgs[0]=this.data.list[e.currentTarget.dataset.index].proimgurl
  //所有图片
 var imgs = this.data.imgs;
 console.log(imgs)
 wx.previewImage({
  //当前显示图片
  current: imgs[index],
  //所有图片
  urls: imgs
 })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getlists()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})