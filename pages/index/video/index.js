// pages/index/video/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rand:'',
    rands:'',
    question:false,
    query:null,
    video:null,
  aa:true,
  id:null,
  hidetime:0,
  },
  radioChange(e) {
  // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  },

  bianhua(e){
// console.log(parseInt(e.detail.currentTime))
this.setData({
 hidetime:parseInt(e.detail.currentTime)
})
//     if(e.detail.currentTime>this.data.rand&&e.detail.currentTime<this.data.rands&&this.data.aa){
//       //console.log('成功啦')
//       this.setData({
//         query:e.detail.currentTime
//     })
//     //console.log(this.data.aa,'测试过后')
//     wx.redirectTo
//     ({
//        url: '/pages/my/message/info/index?inittime='+e.detail.currentTime,
//      })
//     }
   },
   play(e) {
    //执行全屏方法  
    var videoContext = wx.createVideoContext('myvideo', this);
    videoContext.requestFullScreen();
    this.setData({
        fullScreen:true
    })
 },
 /**关闭视屏 */
 closeVideo() {
   //执行退出全屏方法
   var videoContext = wx.createVideoContext('myvideo', this);
   videoContext.exitFullScreen();
 },
 /**视屏进入、退出全屏 */
 fullScreen(e){
   var isFull = e.detail.fullScreen;
   //视屏全屏时显示加载video，非全屏时，不显示加载video
   this.setData({
     fullScreen:isFull
   })
 },
 toexamin(){
  wx.redirectTo({
    url: '/pages/papar/papar',
  })
 },
 getinfo(){
  console.log(this.data.hidetime)
  wx.request({
    url: app.globalData.url+'api/kj/getinfo',
    method:'POST',
    data:{
     userid:wx.getStorageSync('userid'),
     meansid:this.data.id,
     wxname:wx.getStorageSync('yhm'),
     time:this.data.hidetime
    },
    success:(res)=>{
      console.log(res)
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   // console.log(app.globalData.rand)
   
    //let rand = app.globalData.rand;
    let rand=Math.floor(Math.random() * (90-60+1)) + 60
    let rands=rand+0.29
    this.setData({
      rand:rand,
      rands:rands,
      id:wx.getStorageSync('id')
    })
   console.log(this.data.rand,this.data.rands)
    this.setData({
      video:wx.getStorageSync('video'),
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
    let pages = getCurrentPages();
    // 数组中索引最大的页面--当前页面
    let currentPage = pages[pages.length-1];
    // 打印出当前页面中的 options
    //console.log(currentPage.options.inittimes)
    this.setData({
        query:currentPage.options.inittimes
    })
   if(currentPage.options.inittimes){
    this.setData({
        aa:false
    })
   }
   // console.log(this.data.query) 
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
   this.getinfo()
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