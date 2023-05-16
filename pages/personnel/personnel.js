let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    listss:[],
    listsss:[],
    listssss:[],
    listsssss:[],
    code:'',
    iscomplete:[]
  },
  getuser(){
    wx.request({
      url: app.globalData.url+'api/courseware/getinfo',
      method:'POST',
      data:{
       userid:wx.getStorageSync('userid')
      },
      success:res=>{
      console.log(res)
      let arr=[]
      let arrs=[]
      let arrss=[]
      let arrsss=[]
      if(res.data.code==0){
       res.data.data.kj.forEach(item=>{
         if(item.thumbnail!=null){ 
           item.thumbnail=app.globalData.url.concat((item.thumbnail.replace(/\\/,"/"))) 
         }
         if(item.examlevel==0){
         
          arr.push(item)
         }else if(item.examlevel==1){
          
          arrs.push(item)
         }else if(item.examlevel==2){
         
          arrss.push(item)
         }else if(item.examlevel==3){
          arrsss.push(item)
         }
        })
          this.setData({
              lists:res.data.data,
              listss:arr,
              listsss:arrs,
              listssss:arrss,
              listsssss:arrsss,
              code:res.data.code,
              iscomplete:res.data.data.iscomplete
          })
      }else {
        this.setData({
          code:res.data.code,
          lists:[]
        })
      }
      }
    })
    },
    govideo(e){
     console.log(e.currentTarget.dataset.bean.examlevel)
          wx.navigateTo({
            url: '../../subpackages/pages/zldetails/zldetails?kjid='+e.currentTarget.dataset.bean.id+'&examlevel='+e.currentTarget.dataset.bean.examlevel,
          })
    },
  //   govideo(e){ 
  //     wx.setStorageSync('coursewaretype', e.currentTarget.dataset.bean.coursewaretype)
  //     if(e.currentTarget.dataset.bean.coursewaretype==1){
  //       let img=e.currentTarget.dataset.bean.img.replace(/\\/,"/")
  //      // console.log(e.currentTarget.dataset.bean.id)
  //        wx.setStorageSync('id',e.currentTarget.dataset.bean.id)
  //       wx.setStorageSync('img',app.globalData.url.concat(img))
  //       wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
  //      wx.navigateTo({
  //       url: '/pages/seefile/index',
  //      })
  //     }else if(e.currentTarget.dataset.bean.coursewaretype==2){
  //       //console.log(e.currentTarget.dataset.bean.coursewaretype)
  //       let video=e.currentTarget.dataset.bean.video.replace(/\\/,"/")
  //       // console.log(video)
  //        wx.setStorageSync('id',e.currentTarget.dataset.bean.id)
  //       wx.setStorageSync('video',app.globalData.url.concat(video))
  //      // console.log(app.globalData.url.concat(video))
  //       wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
  //  wx.navigateTo({
  //       url: '/pages/index/video/index?item='+JSON.stringify(e.currentTarget.dataset.bean),
  //      })
  //     } else if(e.currentTarget.dataset.bean.coursewaretype==3){
  //       let img=e.currentTarget.dataset.bean.url
  //       // console.log(e.currentTarget.dataset.bean.id)
  //         wx.setStorageSync('id',e.currentTarget.dataset.bean.id)       
  //        wx.setStorageSync('img',img)
  //        wx.setStorageSync('duration',e.currentTarget.dataset.bean.duration)
  //       wx.navigateTo({
  //        url: '/pages/seefile/index',
  //       })
  //     }
  //   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    this.getuser()
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