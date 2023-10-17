// subpackages/pages/coal/coal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jdqnum:'',
    parthnum:'',
    state:'',
    jdqname:'',
    list:[]
  },
  getid(item){
       console.log(item.currentTarget.dataset.bean.jdqnum,item.currentTarget.dataset.bean.parthnum,this.data.state)
       this.setData({
        jdqnum:item.currentTarget.dataset.bean.jdqnum,
        parthnum:item.currentTarget.dataset.bean.parthnum,
        jdqname:item.currentTarget.dataset.bean.jdqname
       })
       wx.request({
         url: app.globalData.url+'api/pub/updateJdq',
         method:'POST',
         data:{
           jdqnum:this.data.jdqnum,
           pathnum:this.data.parthnum,
           state:this.data.state
         },
         success:res=>{
           console.log(res)
           if(res.data.msg=='ON修改成功'){
             wx.showToast({
               title:this.data.jdqname+'关闭成功',
               icon:'none'
             })
           }else if(res.data.msg=='OFF修改成功'){
            wx.showToast({
              title:this.data.jdqname+'开启成功',
              icon:'none'
            })
           }
         }
       })
  },
 off(){
    this.setData({
      state:'ON'
    })
 },
 open(){
  this.setData({
    state:'OFF'
  })
 },
  getlist(){
      wx.request({
        url: app.globalData.url+'api/pub/getJdqdata',
        method:'POST',
        data:{
          userid:wx.getStorageSync('userid')
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