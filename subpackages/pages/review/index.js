// subpackages/pages/review/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:null,
      papername:'',
      username:'',
      questionList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(options.id)
      this.setData({
        id:options.id
      })
      this.getreview()
  },
    getreview(){
      wx.request({
        url: app.globalData.url+'api/user/errorPaper',
        method:'POST',
        data:{
          paperid:this.data.id,
          userid:wx.getStorageSync('userid')
        },
        success:(res)=>{
          console.log(res)
          let  reg=RegExp(/jpg|png/)
        res.data.data.paper.forEach(item=>{
          if(item.answer!=item.erroranswer){
            item.yj=true
          }else{
            item.yj=false
          }
          if(reg.test(item.questionstem)){
            item.options= item.options.replaceAll('{',app.globalData.url.concat('tm/')).replaceAll('}','').split('^')
            const lastIndexOfSpace =item.questionstem.replace('{',app.globalData.url.concat('tm/')).replace('}','').indexOf('h');
            item['url']=item.questionstem.replace('{',app.globalData.url.concat('tm/')).replace('}','').substring(lastIndexOfSpace);
           const lastWord = item.questionstem.substring(0,lastIndexOfSpace);
            item.questionstem=lastWord
            item['bs']=true
            
           }else{
            item.options= item.options.split('^')
            item['bs']=false
           }
          })
          this.setData({
            questionList:res.data.data.paper,
            papername:res.data.data.papername,
            username:res.data.data.username
          })
        }
    })
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

  }
})