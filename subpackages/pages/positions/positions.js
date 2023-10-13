// subpackages/pages/positions/positions.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['周评','月评','季评'],
    index:0,
    findtime:'',
    userid:'',
    orgid:'',
    pjtype:0,
    pjdate:'',
    zrkou:'',
    zrreason:'',
    fjkou:'',
    fjreason:'',
    name:'',
    fjfile:'',
    gwfile:'',
    jds:'',
    months:'',
    orgname:'',
    sjdf:100,
    id:''
  },
  bindPickerChange(e){
   console.log(e)
   this.setData({
    index: e.detail.value,
    zrkou:'',
    zrreason:'',
    fjkou:'',
    fjreason:''
  })
  if(e.detail.value==0){
    this.setData({
      pjtype:0
    })
  }else if(e.detail.value==1){
    this.setData({
      pjtype:1
    })
  }else if(e.detail.value==2){
    this.setData({
      pjtype:2
    })
  }
  // this.getupdate()
  },
  getzrkou(e){
  console.log(e)
  this.setData({
    zrkou:e.detail.value
  })
  
 
  if(this.data.sjdf<0){
    this.setData({
      sjdf:100-this.data.zrkou-this.data.fjkou
    })
  }else{
    this.setData({
      sjdf:100-e.detail.value-this.data.fjkou
    })
  }
  },
  getzrreason(e){
    this.setData({
      zrreason:e.detail.value
    })
  },
  getfjkou(e){
 console.log(e)
 this.setData({
  fjkou:e.detail.value
})
if(this.data.sjdf<0){
  this.setData({
    sjdf:100-this.data.zrkou-this.data.fjkou
  })
}else{
  this.setData({
    sjdf:100-e.detail.value-this.data.zrkou
  })
}
console.log(this.data.sjdf)
  },
  getreason(e){
    this.setData({
      fjreason:e.detail.value
    })
  },
  getxinxi(){
     wx.request({
      url: app.globalData.url+'api/pub/getBefore',
      method:'POST',
      data:{
        userid:this.data.userid,
        pjdate:this.data.pjdate
      },
      success:res=>{
        console.log(res)
        if(res.data.code==0){
          this.setData({
            orgname:res.data.data.orgname,
            fjfile:app.globalData.url.concat(res.data.data.fjfile),
            gwfile:app.globalData.url.concat(res.data.data.gwfile),
            jds:res.data.data.jds,
            months:res.data.data.months
          })
        }
      }
     })
  },
  gwpf(){
    console.log(this.data.gwfile)
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: this.data.gwfile,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: "docx",
          success: function (res) {
            console.log('打开文档成功')
            wx.hideLoading({
              success: (res) => {},
            })
          }
        })
      }
    })
  },
  fjbz(){
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: this.data.fjfile,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: "docx",
          success: function (res) {
            console.log('打开文档成功')
            wx.hideLoading({
              success: (res) => {},
            })
          }
        })
      }
    })
  },
  submit(){
    console.log(this.data.userid,this.data.orgid,this.data.pjtype,this.data.pjdate,this.data.zrkou,this.data.zrreason,this.data.fjkou,this.data.fjreason,this.data.id)
    if(this.data.zrkou==''||this.data.zrreason==''||this.data.fjkou==''||this.data.fjreason==''){
      wx.showToast({
        title: '请填写完整信息',
        icon:'none'
      })
    }else{
      wx.request({
        url: app.globalData.url+'api/people/saveAssess',
        method:'POST',
        data:{
          userid:this.data.userid,
          orgid:this.data.orgid,
          pjtype:this.data.pjtype,
          pjdate:this.data.pjdate,
          zrkou:this.data.zrkou,
          zrreason:this.data.zrreason,
          fjkou:this.data.fjkou,
          fjreason:this.data.fjreason,
          id:this.data.id
        },
        success:res=>{
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '员工评价上传成功',
              icon:'none'
            })
            setTimeout(()=>{
              wx.navigateBack({
                delta:1
              })
            },500)
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        }
      })
    }
  },
  getNowDate: function () {
    var date = new Date();
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1//月
    var day = date.getDate()//日
  
    var hour = date.getHours()//时
    var minute = date.getMinutes()//分
    var second = date.getSeconds()//秒
  if(month<10){
    month="0"+month
  }else{
    month=month+""
  }
  if(day<10){
    day="0"+day
  }else{
    day=day+""
  }
    var xiaoshi = "";
    if (hour < 10) {
        xiaoshi = "0" + hour;
    } else {
        xiaoshi = hour + "";
    }
  
    var fenzhong = "";
    if (minute < 10) {
        fenzhong = "0" + minute;
    } else {
        fenzhong = minute + "";
    }
  
    var miao = "";
    if (second < 10) {
        miao = "0" + second;
    } else {
        miao = second + "";
    }
    this.setData({
      pjdate: year + '-' + month + '-' + day
    })
  
  },
  getupdate(){
   wx.request({
    url: app.globalData.url+'api/pub/getPjList',
    method:'POST',
    data:{
      userid:this.data.userid,
      pjtype:this.data.pjtype
    },
    success:res=>{
      console.log(res)
      if(res.data.code==0){
        console.log(res.data.data.pjdate)
        this.setData({
          pjdate:res.data.data[0].pjdate,
          zrkou:res.data.data[0].fjkou,
          zrreason:res.data.data[0].zrreason,
          fjkou:res.data.data[0].fjkou,
          fjreason:res.data.data[0].fjreason,
          id:res.data.data[0].id
        })
      }else{
       
      }
    }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getNowDate()
     this.setData({
       userid:wx.getStorageSync('userid'),
       name:wx.getStorageSync('wxuser').name,
       orgid:wx.getStorageSync('wxuser').orgid
     })
     this.getxinxi()
    //  this.getupdate()
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