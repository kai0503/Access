// index.js
// const app = getApp()

let app=getApp()

Page({
  data: {
    activeNames: ['1'],
    list:[],
    lists:[],
    userid:null,
    examlevel:'',
    code:'',
    isClick:true,
    msg:''
  },
  
  onLoad: function (options) {
    console.log(options.examlevel)
    this.setData({
      userid:wx.getStorageSync('userid'),
      examlevel:options.examlevel
    })
this.getuser()
},
  onchange(e){
   // console.log(e)
  },
 getuser(){
 wx.request({
   url:app.globalData.url+'api/paper/getinfo',
   method:'POST',
   data:{
    userid:this.data.userid,
    examlevel:this.data.examlevel
   },
   success:res=>{
       console.log(res)
       this.setData({
           lists:res.data.data,
           code:res.data.code
       })
       console.log(this.data.code)
   }
 })
 },
 gethege(){

 },
  govideo(e){
   this.setData({
    isClick:false     //在点击一次后，点击状态变为关闭，默认为开启
  })
  setTimeout(()=>{    //定义一个延时操作setTimeout
    this.setData({
      isClick:true
    })
  },1000)
    wx.setStorageSync('parperid', e.currentTarget.dataset.bean.id)
    wx.request({
     url:app.globalData.url+'api/detail/getinfo',
     method:'POST',
     data:{
          paperid:e.currentTarget.dataset.bean.id,
          userid:this.data.userid,
     },
     success:(res)=>{
      console.log(res)
      if(res.data.code==-1){
       wx.showToast({
         title:res.data.msg,
         icon:'none'
       })
      }else if(res.data.code==0){
       if(res.data.data.qualified){
        wx.showToast({
          title: '该试卷已合格,无需在考试',
          icon:"none"
        })
       }else{
        wx.navigateTo({
      url: '/pages/examination/index?parperid='+e.currentTarget.dataset.bean.id,
    })
       }
      }else if(res.data.code==1){
       wx.showToast({
         title: res.data.msg,
         icon:'none'
       })
      }
      
     }
    })
    // wx.navigateTo({
    //   url: '/pages/examination/index?parperid='+e.currentTarget.dataset.bean.id,
    // })
  },
  onUnload(){
  }
});
