// subpackages/pages/logon/logon.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    name:'',
    person:'',
    phone:'',
    data:'',
    nickName:'',
    IDS:'',
    password:'',
    passwords:'',
    passwordss:'',
    passwordsss:'',
    Name:'',
    categoryOneIndex: 0,
    categoryOneTxt: "请选择技术工种", 
    categoryOneArrs:[],
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  // console.log(options.type)
   this.setData({
     type:options.type
   })
   if(options.type==2){
     wx.request({
       url: app.globalData.url+"api/pubcust/getCustinfoType",
       method:'GET',
       success:(res)=>{
         console.log(res.data)
         if(res.data.code==0){
           this.setData({
            categoryOneArrs:res.data.data
           })
         }
       }
     })
   }
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

  },
  pickerChange(e) {
    console.log(e)
    let firstMcc = this.data.categoryOneArrs[e.detail.value].name;
    let value=this.data.categoryOneArrs[e.detail.value].value;
   // console.log(firstMcc)
    this.setData({
      categoryOneMcc: firstMcc,
      categoryOneIndex: e.detail.value,
      categoryOneTxt: firstMcc,
      value:value
    }); 
  //  console.log(this.data.value)
},   
  radioChangename(e){
    this.setData({
      name:e.detail.value
    })
   
  
  },
  radioChangeperson(e){
    let reg= /^[\u4E00-\u9FA5]+$/
    if(!reg.test(e.detail.value)){
     wx.showToast({
      title:'请输入中文名字',
      icon:'error'
     })
     this.setData({
      person:''
    })
    }else{
      this.setData({
        person:e.detail.value
      })
    }
  },
  radioChangephone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  radioChangepass(e){
    this.setData({
      passwordss:e.detail.value
    })
  },
  radioChangepassword(e){
    this.setData({
      passwordsss:e.detail.value
    })
  },
  addUser(){
   // console.log(this.data.name,this.data.person,this.data.phone,this.data.passwordss,this.data.passwordsss)
    let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if(this.data.name==''||this.data.person==''||this.data.phone==''||this.data.passwordss==''||this.data.passwordsss==''){
      wx.showToast({
        title: '请把信息填写完整',
        icon:'none'
      })
    }else if(this.data.passwordss!=this.data.passwordsss){
      wx.showToast({
        title: '两次密码不一致',
        icon:'none'
      })
    }else if(this.data.passwordss.length<6||this.data.passwordsss<6){
      wx.showToast({
        title: '请输入6位及6位以上的密码',
        icon:'none'
      })
    }else if(!reg_tel.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
    }else{
      wx.request({
        url: app.globalData.url+"api/user/creatuser",
        method:'POST',
        data:{
          type:this.data.type,
          name:this.data.name,
          phone:this.data.phone,
          juridicalname:this.data.person,
          password:this.data.passwordsss
        },
        success:(res)=>{
         // console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '注册成功',
              icon:'success'
            })
           setTimeout(()=>{
            wx.reLaunch({
              url: '../../../pages/login/index',
            })
           },1000)
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              mask:true
            })
          }
        }
      })
    }
  },
  addUsers(){
    let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    let regex=/^[\u4E00-\u9FA5]+$/;
    let IDSregs=/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if(this.data.nickName==''||this.data.password==''||this.data.passwords==''||this.data.Name==''||this.data.value==''||this.data.IDS==''){
      wx.showToast({
        title: '注册信息不完整',
        icon:'none'
      })
    }else if(this.data.passwords!=this.data.password){
      wx.showToast({
        title: '两次密码不一致',
        icon:'none'
      })
    }else if(this.data.password.length<6||this.data.passwords<6){
      wx.showToast({
        title: '请输入6位及6位以上的密码',
        icon:'none'
      })
    }else if(!reg_tel.test(this.data.nickName)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
    }else if(!regex.test(this.data.Name)){
         wx.showToast({
           title: '请输入中文名称',
           icon:'error'
         })
    }else if(!IDSregs.test(this.data.IDS)){
      wx.showToast({
        title: '请输入正确的身份证号',
        icon:'none'
      })
    }else{
      
      console.log(this.data.type,this.data.Name,this.data.nickName,this.data.password,this.data.value)
      wx.request({
        url: app.globalData.url+"api/user/creatuser",
        method:'POST',
        data:{
          type:this.data.type,
          name:this.data.Name,
          phone:this.data.nickName,
          password:this.data.password,
          value:this.data.value
        },
        success:(res)=>{
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '注册成功',
              icon:'success'
            })
           setTimeout(()=>{
            wx.reLaunch({
              url: '../../../pages/login/index',
            })
           },1000)
          }else if(res.data.code==-1){
            wx.showToast({
              title:res.data.msg,
              icon:'none',
              mask:true
            })
          }
        }
      })
    }
  }
})