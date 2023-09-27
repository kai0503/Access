// subpackages/pages/zldetails/zldetails.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kjid:'',
    examlevel:'',
    lists:[],
    code:'',
  },
  govideo(e){ 
        wx.setStorageSync('coursewaretype', e.currentTarget.dataset.bean.coursewaretype)
        if(e.currentTarget.dataset.bean.coursewaretype==1){
          let img=e.currentTarget.dataset.bean.name
         // console.log(e.currentTarget.dataset.bean.id)
           wx.setStorageSync('id',e.currentTarget.dataset.bean.id)
          wx.setStorageSync('img',app.globalData.url.concat('contract/').concat(img))
         // wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
         wx.navigateTo({
          url: '/pages/seefile/index',
         })
        }else if(e.currentTarget.dataset.bean.coursewaretype==2){
          //console.log(e.currentTarget.dataset.bean.coursewaretype)
          let video=e.currentTarget.dataset.bean.name
          // console.log(video)
           wx.setStorageSync('id',e.currentTarget.dataset.bean.id)
          wx.setStorageSync('video',app.globalData.url.concat('contract/').concat(video)) 
         // console.log(app.globalData.url.concat(video))
         // wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
     wx.navigateTo({
          url: '/pages/index/video/index?item='+JSON.stringify(e.currentTarget.dataset.bean),
         })
        } else if(e.currentTarget.dataset.bean.coursewaretype==3){
          // let img=e.currentTarget.dataset.bean.url
          // // console.log(e.currentTarget.dataset.bean.id)
          //   wx.setStorageSync('id',e.currentTarget.dataset.bean.id)       
          //  wx.setStorageSync('img',img)
          //  wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
          // wx.navigateTo({
          //  url: '/pages/wxpersonnel/wxpersonnel',
          // })
          let video=e.currentTarget.dataset.bean.url
          wx.setStorageSync('id',e.currentTarget.dataset.bean.id)
          wx.setStorageSync('video',video) 
        //  wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
          wx.navigateTo({
            url: '/pages/wxpersonnel/wxpersonnel?item='+JSON.stringify(e.currentTarget.dataset.bean),
           })
        }
      },
  getMeans(){
    wx.request({
      url: app.globalData.url+'api/means/getMeans',
      method:'POST',
      data:{
       userid:wx.getStorageSync('userid'),
       kjid:this.data.kjid,
       examlevel:this.data.examlevel
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          this.setData({
            lists:res.data.data,
            code:res.data.code
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      kjid:options.kjid,
      examlevel:options.examlevel
    })
    this.getMeans()
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
         console.log('1111')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
 console.log('111')
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