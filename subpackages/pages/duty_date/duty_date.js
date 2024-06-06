// subpackages/pages/duty_date/duty_date.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[
      {
          id:0,
          name:'到岗到位日表',
          checked:true
      },
      {
          id:1,
          name:'到岗到位月表',
      }
  ],
  type:0,
  isActive:0,
    list:[],
    pageNum:1
  },
  chenked(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    console.log(id)
    for (let i = 0; i < this.data.category.length; i++) {
      if (this.data.category[i].id == id) {
        //当前点击的位置为true即选中
        this.data.category[i].checked = true;    
      }
      else {
        //其他的位置为false
      this.data.category[i].checked = false;
      }
    }
    this.setData({
      category: this.data.category,
      type:id
    });
    this.getlist()
  },
  getlist(){
  wx.request({
    url: app.globalData.url+'api/getAddressCount',
    method:'POST',
    data:{
      userid:wx.getStorageSync('userid'),
      type:this.data.type,
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
  jump_sort(e){
    console.log('111')
   console.log(e.currentTarget.dataset.bean.addressid)
   wx.navigateTo({
     url: '../Location_photo/Location_photo?addressid='+e.currentTarget.dataset.bean.addressid,
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
  // onReachBottom: function () {
  //   this.getlists()
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})