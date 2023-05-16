const app = getApp()
Page({
  data: {
    examstatus:null
  },
  onLoad: function(options) {
   this.getinfo()
  },
  getinfo(){
    wx.request({
      url: app.globalData.url+'api/fk/fkSelect',
      method:'POST',
      data:{
        weixinid:app.globalData.wechatId,
      },
      success:(res)=>{
        if(res.data.code==0){
          console.log(res)
          this.setData({
            examstatus:res.data.data.examstatus
          })
        }
      }
    })
  }
})