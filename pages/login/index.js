let app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    password: "",
    userid:'',
    type:'',
    contract:''
  },
  //选择员工类型
  // radioChange(e){
  //   // console.log(e.detail.value)
  //   this.setData({
  //     type:e.detail.value
  //   })
  // },
  ygzc(){
      wx.navigateTo({
        url: '../../subpackages/pages/logon/logon?type='+2,
      })
  },
  wxzc(){
    wx.navigateTo({
      url: '../../subpackages/pages/logon/logon?type='+1,
    })
  },
  getName(e){
    this.setData({
      nickName:e.detail.value
    })
  },
  getpass(e){
    this.setData({
      password:e.detail.value
    })
  },
  addUsers(){
    console.log('111')
     //   console.log(app.globalData.wechatId)
    // console.log(this.data.nickName)
    // console.log(this.data.password)
    if(this.data.nickName==''){
    wx.showToast({
      icon:"none",
      title: '请输入你的用户名',
    })
    }else if(this.data.password==''){
        wx.showToast({
          icon:"none",
            title: '请输入你的密码',
          })
    }else{
      console.log('222')
        wx.request({
          url: app.globalData.url+'api/user/addUser',
          method:'POST',
          data:{
            phone:this.data.nickName,
            password:this.data.password,
            wechatId:app.globalData.wechatId,
          },
          success:(res)=>{
        console.log(res)
              if(res.data.code==0){
                wx.showToast({
                    icon:"success",
                    title: '登录成功',
                  }) 
                  
                 // console.log(res.data.data)
                 wx.setStorageSync('open', res.data.data.open)
                  wx.setStorageSync('setup', res.data.data.setup)
                  wx.setStorageSync('wxuser', res.data.data.userinfo)
                  wx.setStorageSync('userid', res.data.data.userinfo.id)
                  wx.setStorageSync('contract', res.data.data.userinfo.contract)
                  this.setData({
                    userid:res.data.data.userinfo.id
                  })
                 // console.log(res.data.data.userinfo.id,this.data.type,wx.getStorageSync('contract'),'1111111111111')
                this.getUserProfile()
                setTimeout(()=>{
                 //  console.log(wx.getStorageSync('contract'))
                  // wx.redirectTo({
                  //       url: '/pages/my/message/list/index',
                  //     })
            if(wx.getStorageSync('contract')==null){
              wx.redirectTo({
                url: '/pages/my/message/list/index',
              })
            }else{
              wx.switchTab({
                url: '/pages/index/index',
              }) 
            }
                            },500)
              }else{
                wx.showToast({
                    icon:"none",
                    title:res.data.msg,
                    mask:true
                  }) 
              
             }
           
          }
        })
    }
    wx.setStorageSync('userinfo', this.data)
  },
  getWechatId: function () {
    wx.request({
      url: app.globalData.url + 'api/wechat/getWechatId',
      data: {
        "authCode": app.globalData.sessionCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
      // console.log("app.globalData.wechatId：" + res.data.data.openid)
        app.globalData.wechatId = res.data.data.openid
        if(wx.getStorageSync('wxuser')!=''){
          this.checkUserIsBind()
        }
      
      },
      fail:function(){
       wx.showToast({
         title: '接口链接失败',
         icon:'error'
       })
      }
    })
  },
  checkUserIsBind: function () {
    wx.request({
      url: app.globalData.url + 'api/wechat/checkUser',
      data: {
        "wechatId": app.globalData.wechatId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.code == 0) {
          // console.log(res)
          if (res.data.data == null) {
            // console.log("用户不存在");
          } else {
          // console.log(app.globalData.wechatId,)
            wx.setStorageSync('userid', res.data.data.id)
            this.getimg()
            wx.showToast({
              title:wx.getStorageSync('contract'),
              icon:'none'
            })
            wx.showLoading({
              title: '登陆中',
              mask:true
            })
            
          
          setTimeout(()=>{
            wx.hideLoading()
           
          //  console.log(this.data.contract)
           
          if(wx.getStorageSync('contract')==null){
            wx.redirectTo({
              url: '/pages/my/message/list/index',
            })
          }else{
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
          
          },1000)
           
            // TODO 获取车辆信息
            // this.getCarsByDriverAndKey();
          }
        }
      },
      fail: (res) => {
        // console.log("httpRequestFail---", res)
        wx.alert({
          content: JSON.stringify(res)
        });
      }
    })
  },
  w_x(){
    if(wx.getStorageSync('sh')==''){
      wx.navigateTo({
        url: '../../subpackages/pages/visitor/visitor',
      })
    }else{
      wx.navigateTo({
        url: '/pages/my/log/index',
      })
    }
   
  },
  getimg(){
    wx.request({
      url: app.globalData.url+'api/user/addUser',
      method:'POST',
      data:{
        wechatId:app.globalData.wechatId,
        img:'1'
      },
      success:(res)=>{
      //  console.log(res)
        if(res.data.code==0){
       
          wx.setStorageSync('contract',res.data.data.userinfo.contract)
          this.setData({
            contract:res.data.data.userinfo.contract
          })
        //  console.log(this.data.contract)
        }
      }
    })
  },
 getUserProfile(){
  // console.log('222')
    wx.getUserProfile({
      desc: '登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
      //  console.log(res)
        wx.setStorage({    //数据缓存方法
          key: 'yhm',   //关键字，本地缓存中指定的key
          data: res.userInfo.nickName,    //缓存微信用户公开信息，
          success: function() {      //缓存成功后，输出提示
          //  console.log('写入nickName缓存成功')
          },
          fail:(res)=>{        //缓存失败后的提示
            wx.showModal({
              title:'警告',
              content:'您点击拒绝',
              success:(res)=>{
                if(res.confirm){
                  wx.openSetting({
                    success:(res)=>{}
                  })
                }else{
                //  console.log('用户点击了取消')
                }
              }
            })
          },
          
        })
        // wx.setStorage({    //数据缓存方法
        //   key: 'avatarUrl',   //关键字，本地缓存中指定的key
        //   data: res.userInfo.avatarUrl,    //缓存微信用户公开信息，
        //   success: function() {      //缓存成功后，输出提示
        //     console.log('写入avatarUrl缓存成功')
        //   },
        //   fail: function() {        //缓存失败后的提示
        //     console.log('写入avatarUrl发生错误')
        //   }
        // })
      },
      fail:(res)=>{
        wx.showModal({
          title:'警告',
          content:'您拒绝后可能会影响后续考试',
          success:(res)=>{
            if(res.confirm){
              // wx.openSetting({
              //   success:(res)=>{
              //     console.log(res)
              //   }
              // })
            }else{
             this.getUserProfile()
            }
          }
        })
      }
    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
 // console.log(wx.getStorageSync('wxuser'))
    wx.login({
      success: res => {
    //    console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId'
        // var code = res.code
        app.globalData.sessionCode = res.code;
         console.log(app.globalData.sessionCode,'app.globalData.sessionCode')
        this.getWechatId();
      }
    })
  
    // console.log(app.globalData.url+'api/user/addUser','app.globalData.url+')
    //  console.log(app.globalData.wechatId)
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

  },
})