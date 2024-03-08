// pages/faceRegister/faceRegister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName : "",
    src : "",//图片的链接
    token: "",
    base64: "",
    msg:"",
    data:'',
    flag:true,
    pd:''
  },
  uploadFimg(){
     wx.request({
       url: app.globalData.url+"api/user/imgUp",
       method:'POST',
       data:{
          userid:wx.getStorageSync('userid'),
          imgurl:this.data.data
       },
       success:(res)=>{
         console.log(res,'11111111111')
         if(res.data.code==0){

            wx.switchTab({
              url: '/pages/index/index',
             })
        
         }else{
           wx.showToast({
             title: res.data.msg,
             icon:'none'
           })
         }

       }
     })
  },
  afterRead() {
    let Authorization = wx.getStorageSync('key')
    let headers = {
     'content-type': '',
     'client_id': 'webApp',
     'client_secret': '123456',
 }
 if (Authorization) {
     headers.Authorization = 'Bearer ' + Authorization
 }
 console.log(this.data.src,'111111111111111111111111')
    wx.uploadFile({
     url: app.globalData.url+"api/upload/importImg",
     method: 'POST',
     header: headers,
     filePath: this.data.src, 
     name: 'file',
     formData: {
         user: 'test'
     },
     success:(res)=>{
         // JSON.parse()方法是将JSON格 式字符串转换为js对象
         var result = JSON.parse(res.data);
         console.log(result,'222222222222222222')
      if(result.code==0){
        // 上传完成需要更新 fileList
      if(this.data.pd==0){
       this.setData({
       data:result.data.substring(result.data.lastIndexOf("/",result.data.lastIndexOf("/")-1)+1)
       //data:result.data.substr(result.data.lastIndexOf("/") + 1)
      })
      console.log(result.data.substring(result.data.lastIndexOf("/",result.data.lastIndexOf("/")-1)+1,))
      }else{
       this.setData({
        data:result.data.substr(result.data.lastIndexOf("/") + 1)
      })
      console.log(result.data.substr(result.data.lastIndexOf("/") + 1))
      }
    // 
    //
    
   if(this.data.pd==0){
    this.update()
   }else{
    console.log('uploadFimg')
    this.uploadFimg()
   }
      
    //  this.data.fileList.push(file.url)
      wx.hideLoading();//停止loading
     }else{
      wx.hideLoading();//停止loading
      wx.showToast({
        icon:"error",
          title: '请上传正确的图片',
        }) 

     }
     }
    })
},
  //拍照
  takePhoto(){  
  var that=this
   //拍照
   const ctx=wx.createCameraContext()
   ctx.takePhoto({
     quality: 'high',
     success: (res)=>{
      console.log(res)
       this.setData({
         src:res.tempImagePath //获取图片
       })

      console.log(res.tempImagePath)
       if(this.data.flag==true){
       
        this.setData({
          flag:false,
        })
       }
       //图片base64编码
       wx.getFileSystemManager().readFile({
         filePath:this.data.src, //选择图片返回的相对路径
         encoding: 'base64', //编码格式返回
         success: res=>{  //成功回调
          this.setData({
            base64: res.data
          })
         }
       })
     }//拍照成功结束
   })//调用相机结束
   that.afterRead()
  // acess_token获取，qs:需要多次尝试
  //  wx.request({
  //    url: 'https://aip.baidubce.com/oauth/2.0/token',//是真实的接口地址
  //    data: {
  //     grant_type: 'client_credentials',
  //     client_id: 'vHkqSXRqFYC1j5qMZHBKFFKD',//用你创建的应用的API Key
  //     client_secret: 'kfE83zidc6lFlNTuHoAghbzTZa5DWKDC'//用你创建的应用的Secret Key
  //    },
  //    header: {
  //     'Content-Type': 'application/json' // 默认值
  //    },
  //    success(res){
  //        console.log(res)
  //      that.setData({
  //       token: res.data.access_token//获取到token
  //      })
  //      console.log(res.data.access_token)
  //    }
  //  })
  // console.log(this.data.nickName)
   //上传人脸进行注册-----
  // console.log(this.data.base64)
  //  wx.request({
  //   url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + this.data.token,
  //   method: 'POST',
  //   data: {
  //     image: this.data.base64,
  //     image_type: 'BASE64',
  //     group_id: 'xjmj_xcx',//用户组id
  //     user_id:wx.getStorageSync('userid'),//这里设置每张人脸的昵称
  //     liveness_control:'HIGH'
  //    },
  //    header: {
  //     'Content-Type': 'application/json' // 默认值
  //    },
  //    success(res){
  //     that.setData({
  //       msg:res.data.error_msg
  //     })
  //     console.log(res)  
  //     //做成功判断
  //     if(that.data.msg == 'SUCCESS'){ 
  //       that.afterRead()
  //       wx.showToast({
  //         title: '注册成功',
  //         icon: 'success',
  //         duration: 2000
  //        })
  //      setTimeout(()=>{
  //        wx.setStorageSync('comein', true)
  //      },2000)
  //     }else {
  //       wx.showToast({
  //         title: '请再次录取人脸',
  //         icon: 'loading',
  //         duration: 500
  //       })
  //     }
  //    }
  //  }),
    // 失败尝试
     wx.showToast({
      title: '请继续录取',
      icon: 'loading',
      duration: 500
     })
  },
   error(e){
   // console.log(e.detail)
   },

  btnreg:function(){
    wx.showModal({
      title: '注册须知',
      content: '先授权登陆，再拍照注册哦！网络可能故障，如果不成功，请再试一下！',
    })
  },
  update(){
    console.log(this.data.data,'测试中1')
   wx.request({
     url: app.globalData.url+"api/user/userImgUp",
     method:'POST',
     data:{
       imgpath:this.data.data,
       userid:wx.getStorageSync('userid'),
     },
     success:(res)=>{
       console.log(res,'22222222222')
       if(res.data.code==0){
       wx.showToast({
         title: '更换成功',
         icon:'success'
       })
       setTimeout(()=>{
        wx.switchTab({
          url: '/pages/index/index',
         })
       },2000)
       }
       // if(res.data.code==0){
       //   wx.showToast({
       //     title: '人脸照片修改成功',
       //     icon:'success',
       //   })
       //   //this.getpersonal()
       // }else{ 
       //  wx.showToast({
       //   title: '人脸照片修改失败',
       //   icon:'error',
       // })
       // }  
     }
   })
},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
         console.log(options.pd)
         this.setData({
          pd:options.pd
         })
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
