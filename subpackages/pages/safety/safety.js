// subpackages/pages/safety/safety.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       list:[]
  },
  gopdf(e){
   console.log(e.currentTarget.dataset.bean.fileurl)
   wx.navigateTo({
     url: '../files/files?wj='+e.currentTarget.dataset.bean.fileurl,
   })
  },
getlist(){
       wx.request({
        url: app.globalData.url+'api/pub/getSafedata',
        method:'POST',
        data:{
          datatype:'0'
        },
        success:res=>{
          console.log(res)
          if(res.data.code==0){
            let arr=[]
            res.data.data.detail[0].file.forEach(item=>{
              if(item.filetype!='image'){
                item.fileurl=app.globalData.url.concat(item.fileurl)
                 arr.push(item)
              }
            })
            this.setData({
              list:arr
            })
          }
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})