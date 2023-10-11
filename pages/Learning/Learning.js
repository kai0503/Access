// pages/Learning/Learning.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    time:5,
    userid:'',
    listss:[],
    xinxi:'',
    stafftype:null
  },
  jumpwdxx(){
      wx.navigateTo({
        url: '../personnel/personnel',
      })
  },
  jumpwdks(){

    wx.request({
      url: app.globalData.url+'api/user/selectSetUp',
      method:'POST',
      data:{
        userid:'1111'
      },
      success:res=>{
        console.log(res)
        if(res.data.data.testisopen==1){
 wx.navigateTo({
       url: '../information/information',
     })
        }else if(res.data.data.testisopen==0){
          wx.showToast({
            title: '考试功能已关闭，请联系管理员开启',
            icon:'none'
          })
        }
      }
    })




    
  },
  jumpksjg(){

   wx.navigateTo({
     url: '../xuexi/index',
   })
  },
  jumpkqlx(){


    wx.request({
      url: app.globalData.url+'api/user/selectSetUp',
      method:'POST',
      data:{
        userid:'1111'
      },
      success:res=>{
        console.log(res)
        if(res.data.data.isopen==1){
          wx.navigateTo({
            url: '../../subpackages/pages/practice/index',
          })
        }else if(res.data.data.isopen==0){
          wx.showToast({
            title: '考前练习功能已关闭，请联系管理员开启',
            icon:'none'
          })
        }
      }
    })


     
  },
  jumpsjpx(){
    console.log(this.data.listss)
    if(this.data.listss==''){
      wx.showToast({
        title: '司机暂无学习资料',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '../../subpackages/pages/Driver/Driver?kjid='+this.data.listss[0].id+'&examlevel='+this.data.listss[0].examlevel,
    })
    // wx.navigateTo({
    //   url: '../../subpackages/pages/Driver/Driver',
    // })
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
      if(res.data.code==0){
       res.data.data.kj.forEach(item=>{
       // console.log(item.duration)
        item.duration=item.duration/60
       // console.log(item.duration)
         if(item.thumbnail!=null){ 
           item.thumbnail=app.globalData.url.concat((item.thumbnail.replace(/\\/,"/"))) 
         }
         if(item.examlevel==5){
          arr.push(item)
         }
        })
       // console.log(res)
          this.setData({
              listss:arr,
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
    getxinxi(){
      wx.request({
        url: app.globalData.url+'api/user/againExam',
       method:'POST',
       data:{
        userid:wx.getStorageSync('userid'),
       },
       success:res=>{
         console.log(res)
         this.setData({
           xinxi:res.data.message
         })
       }
      })
    },
  rypx(){
   this.getxinxi()
   this.setData({
     flag:true,
   })
   var time=setInterval(() => {
      this.setData({
        time:this.data.time-1
      })
      if(this.data.time==0){
        clearInterval(time)
       return
      }
   }, 1000);
  },
  queren(){
   this.setData({
     flag:false
   })
   setTimeout(() => {
      this.setData({
        time:5
      })
   }, 1000);
  },
  getsjks(){
    wx.request({
      url: app.globalData.url+'api/paper/getinfo',
      method:'POST',
      data:{
       userid:wx.getStorageSync('userid'),
       examlevel:5
      },
      success:(res)=>{
       if(res.data.code==1){
        wx.showToast({
         title: '请去学习资料，暂时还未达到学习时长',
         icon:'none'
       })
       }else{
        wx.navigateTo({
         url: '/pages/papar/papar?examlevel='+5,
       })
       }
      }
    })
  },
  sjks(){


    wx.request({
      url: app.globalData.url+'api/user/selectSetUp',
      method:'POST',
      data:{
        userid:'1111'
      },
      success:res=>{
        console.log(res)
        if(res.data.data.testisopen==1){
         this.getsjks()
        }else if(res.data.data.testisopen==0){
          wx.showToast({
            title: '考试功能已关闭，请联系管理员开启',
            icon:'none'
          })
        }
      }
    })





   
    
   
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      stafftype:wx.getStorageSync('wxuser').stafftype
    })
    console.log(this.data.stafftype)
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
    this.getuser()
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