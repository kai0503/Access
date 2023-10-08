// subpackages/pages/coal/coal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked1:null,
    list:[
      {
        id:1,
        isChecked:false
      },{
        id:2,
        isChecked:true
      },{
        id:3,
        isChecked:false
      },{
        id:4,
        isChecked:false
      },{
        id:5,
        isChecked:false
      },{
        id:6,
        isChecked:false
      },{
        id:7,
        isChecked:false
      },{
        id:8,
        isChecked:false
      },{
        id:9,
        isChecked:false
      },{
        id:10,
        isChecked:false
      },{
        id:11,
        isChecked:false
      },{
        id:12,
        isChecked:false
      },{
        id:13,
        isChecked:false
      },{
        id:14,
        isChecked:false 
      },{
        id:15,
        isChecked:false
      },{
        id:16,
        isChecked:false
      },
    ]
  },
  getid(item){
       console.log(item.currentTarget.dataset.bean.id,this.data.isChecked1)
  },
  changeSwitch(e){
     console.log(e.detail.value)
     this.setData({
      isChecked1:e.detail.value
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