let app=getApp()
import btnClick from '../../utils/btn_click';
Page({
  data: {
   gongsi:'',
   bumen:'',
   banzu:'',
   flag:''
  },
   getks(userid,exam){
         wx.request({
           url: app.globalData.url+'api/paper/getinfo',
           method:'POST',
           data:{
            userid:userid,
            examlevel:exam
           },
           success:(res)=>{
            console.log(res)
            
            this.setData({
             gongsi:res.data.code,
             bumen:res.data.code,
             banzu:res.data.code
            })
            console.log(this.data.gongsi,this.data.bumen)
           }
         })
   },
  yiji(){
    if (btnClick.preventDuplicateClicks()) {
      return
    }else{
      console.log('11111')
      wx.request({
       url: app.globalData.url+'api/paper/getinfo',
       method:'POST',
       data:{
        userid:wx.getStorageSync('userid'),
        examlevel:0
       },
       success:(res)=>{
        if(res.data.code==1){
         wx.showToast({
           title: '请去学习资料，暂时还未达到学习时长',
           icon:'none'
         })
        }else{
         wx.navigateTo({
          url: '/pages/papar/papar?examlevel='+0,
        })
        }
       }
     })
    }
 
  
  
  },
  erji(){
   wx.request({
    url: app.globalData.url+'api/paper/getinfo',
    method:'POST',
    data:{
     userid:wx.getStorageSync('userid'),
     examlevel:1
    },
    success:(res)=>{
     if(res.data.code==1){
      wx.showToast({
       title: '请去学习资料，暂时还未达到学习时长',
       icon:'none'
     })
     }else{
      wx.navigateTo({
       url: '/pages/papar/papar?examlevel='+1,
     })
     }
    }
  })
   
  
},
sanji(){
 wx.request({
  url: app.globalData.url+'api/paper/getinfo',
  method:'POST',
  data:{
   userid:wx.getStorageSync('userid'),
   examlevel:2
  },
  success:(res)=>{
   if(res.data.code==1){
    wx.showToast({
     title: '请去学习资料，暂时还未达到学习时长',
     icon:'none'
   })
   }else{
    wx.navigateTo({
     url: '/pages/papar/papar?examlevel='+2,
   })
   }
  }
})
},
siji(){
  wx.request({
    url: app.globalData.url+'api/paper/getinfo',
    method:'POST',
    data:{
     userid:wx.getStorageSync('userid'),
     examlevel:3
    },
    success:(res)=>{
     if(res.data.code==1){
      wx.showToast({
       title: '请去学习资料，暂时还未达到学习时长',
       icon:'none'
     })
     }else{
      wx.navigateTo({
       url: '/pages/papar/papar?examlevel='+3,
     })
     }
    }
  })
},
gocuoti(){
wx.navigateTo({
  url: '../../subpackages/pages/Wrong/index',
})
},
golianxi(){
  wx.navigateTo({
    url: '../../subpackages/pages/practice/index',
  })
},
  onLoad: function () {
         
  },
  onShow(){
    this.getzt()
    this.setData({
      flag:wx.getStorageSync('setup').isopen
    })
    console.log(this.data.flag)
  },
  getzt(){
    console.log('111')
    wx.request({
      url:app.globalData.url+'api/user/getSetUp',
      method:'POST',
      data:{
       
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
         this.setData({
           flag:res.data.data.isopen
         })
         console.log(this.data.flag)
        }
      }
    })
  }
})