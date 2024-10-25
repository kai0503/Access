// pages/my/index.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    stafftype:'',
    ID:'',
    imgs:[],
    isChecked1:false,
    isCheckedvideo:false,
    testisopen:false,
    fg:1,
    dzgk:'',
    orgname:'',
    image:'',
    hgFlag:'',
    userid:''
  },
  qhdz(){
   this.setData({
     fg:2
   })
  },
  qhtz(){
  this.setData({
    fg:1
  })
  },
  changeSwitch1(e){
    console.log(e.detail.value)
    wx.setStorageSync('check', e.detail.value)
    this.setData({
      isChecked1:e.detail.value
    })
    if(e.detail.value==true){
      e.detail.value=1
    }else{
      e.detail.value=0
    }
    console.log(e.detail.value)
    wx.request({
      url:app.globalData.url+'api/user/getSetUp',
      method:'POST',
      data:{
        isopen:e.detail.value,
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '设置成功',
            icon:'success'
          })
        }
      }
    })
  },
  changeSwitchvideo(e){
    console.log(e.detail.value)
    wx.setStorageSync('check', e.detail.value)
    this.setData({
      isCheckedvideo:e.detail.value
    })
    if(e.detail.value==true){
      e.detail.value=1
    }else{
      e.detail.value=0
    }
    console.log(e.detail.value)
    wx.request({
      url:app.globalData.url+'api/user/openVideo',
      method:'POST',
      data:{
        open:e.detail.value,
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '设置成功',
            icon:'success'
          })
        }
      }
    })
  },
  changeSwitch2(e){
    console.log(e.detail.value)
    wx.setStorageSync('check', e.detail.value)
    this.setData({
      testisopen:e.detail.value
    })
    if(e.detail.value==true){
      e.detail.value=1
    }else{
      e.detail.value=0
    }
    console.log(e.detail.value)
    wx.request({
      url:app.globalData.url+'api/user/updateSetUp',
      method:'POST',
      data:{
        testisopen:e.detail.value,
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '设置成功',
            icon:'success'
          })
        }
      }
    })
  },
  jumpdriver(){
  wx.navigateTo({
    url: '../../subpackages/pages/driverimg/driverimg',
  })
  },
  jumppeople(){
  wx.navigateTo({
    url: '../../subpackages/pages/Personnel_information/Personnel_information',
  })
  },
  jumpdgfk(){
      wx.navigateTo({
        url: '../../subpackages/pages/Problem_feedback/Problem_feedback',
      })
  },
  chagepass(){
   wx.navigateTo({
   url:'../../subpackages/pages/changpass/index'
  })
  },
  SC(){
//     console.log('123')
//     var that = this;
//  wx.chooseImage({
//      count: 1, // 默认9
//     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//     success: function (res) {
//      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//      var tempFilePaths = res.tempFilePaths;
//      var imgs = that.data.imgs;
//      // console.log(tempFilePaths + '----');
//      for (var i = 0; i < tempFilePaths.length; i++) {
//       if (imgs.length >= 9) {
//        that.setData({
//         imgs: imgs
//        });
//        return false;
//       } else {
//        imgs.push(tempFilePaths[i]);
//      //  console.log(tempFilePaths[i]);
//       }
//      }
//      that.setData({
//       imgs: imgs
//      });
//       wx.showToast({
//         title: '该健康码无效',
//         icon:'none',
//         duration:2000
//       })
//     }
//    });
wx.scanCode({
  success:(res)=>{
   wx.showToast({
     title: '该二维码无效',
     icon:'none',
     duration:2000
   })
  },
  fail:error=>{
    console.log(error)
    wx.showToast({
      title: '该二维码无效',
      icon:'none',
      duration:2000
    })
  }
}) 
  },
  QR(){
    wx.scanCode({
      success:(res)=>{
        console.log(res)
        if(res.result!=''){
          this.setData({
            ID:res.result
          })
          // if(res.result.substr(0,1)=='D'){
          //   wx.navigateTo({
          //     url: '../wxindex/wxindex?ID='+this.data.ID,
          //   })
          // }else{
          //   wx.navigateTo({
          //     url: '../../subpackages/pages/sign/index?ID='+this.data.ID,
          //   })
          // }
         
          wx.request({
            url: app.globalData.url+'api/user/scanQrcode',
            method:'POST',
            data:{
               qrcodeId:res.result
            },
            success:(res)=>{
              console.log(res)
              if(res.data.code==0){
                if(res.data.data.codeno!=null&&res.data.data.codeno.substr(0,1)=='D'){
            wx.navigateTo({
              url: '../wxindex/wxindex?ID='+res.data.data.codeno,
            })
          }else{
            wx.navigateTo({
              url: '../../subpackages/pages/sign/index?ID='+res.data.data,
            })
          }
              }else{
                wx.showToast({
                  title:res.data.msg,
                  icon:'error'
                })
              }
            }
          })
    
        }
      }
     })
  },
  jumpdgdw(){
    wx.navigateTo({
      url: '../../subpackages/pages/duty_date/duty_date',
    })
  },
  jumpgrzl(){
 wx.navigateTo({
   url: '/pages/my/info/index',
 })
  },
  jumpfqtz(){
    wx.navigateTo({
      url: '/pages/notification/notification',
    })
     },
     jumpkscs(){
      wx.navigateTo({
        url: '../../subpackages/pages/frequency/index',
      })
       },
  shangchuan(){

 console.log('111')
  },
  logOut(){
    wx.clearStorage()
  wx.redirectTo({
    url: '/pages/login/index',
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var n = wx.getStorageSync("userinfo");
    let ischeck=wx.getStorageSync('setup').isopen
   let ischeckvideo=wx.getStorageSync('open')
   let ksopen=wx.getStorageSync('setup').testisopen
   let dzgl=wx.getStorageSync('wxuser').codeno
   console.log(app.globalData.url.concat(wx.getStorageSync('wxuser').contract))
   let img=app.globalData.url.concat(wx.getStorageSync('wxuser').contract)
   this.setData({
    dzgk:dzgl,
    orgname:wx.getStorageSync('wxuser').orgname,
    //image:img.replace(/\\/,"/"),
    hgFlag:wx.getStorageSync('HG'),
  })
    if(ischeck==1){
      this.setData({
        isChecked1:true
      })
    }else if(ischeck==0){
      this.setData({
        isChecked1:false
      })
    }

    if(ksopen==1){
      this.setData({
        testisopen:true
      })
    }else if(ksopen==0){
      this.setData({
        testisopen:false
      })
    }


    if(ischeckvideo==0){
      this.setData({
        isCheckedvideo:false
      })
    }else if(ischeckvideo==1){
      this.setData({
        isCheckedvideo:true
      })
    }
   // console.log(n)
  console.log(this.data.isChecked1,this.data.testisopen,this.data.isCheckedvideo)
    this.setData({
      nickName:n.nickName,
      //isChecked1:ischeck,
      //isCheckedvideo:isCheckedvideo
    })
    console.log(this.data.isChecked1)
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
      let list =wx.getStorageSync('list')
      this.setData({
        username:list,
        userid:wx.getStorageSync('userid'),
        stafftype:wx.getStorageSync('wxuser').stafftype
      })
      this.getpersonal()
  },
  getpersonal(){
    wx.request({
     url:app.globalData.url+'api/wx/myInfo',
     method:'POST',
     data:{
      userid:wx.getStorageSync('userid'),
      U:'111'
     },
     success:(res)=>{
       console.log(res,'getpersonal')
     if(res.data.code==0){
      let img=app.globalData.url.concat(res.data.data.custinfo.contract)
      this.setData({
        image:img.replace(/\\/,"/"),
      })
      if(wx.getStorageSync('contract')!=res.data.data.custinfo.contract){
        console.log('111')
        wx.setStorageSync('contract', res.data.data.custinfo.contract)
      }
       
     }
     }
    })
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