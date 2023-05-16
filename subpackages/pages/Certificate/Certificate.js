// subpackages/pages/Certificate/Certificate.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:null,
     data:'',
     zsid:'',
     imgs:[]
  },
  getzhengshu(){
      wx.request({
        url: app.globalData.url+"api/wx/getZsInfo",
       method:'POST',
       data:{
         userid:wx.getStorageSync('userid')
       },
       success:(res)=>{
       console.log(res)
        if(res.data.code==0){
          res.data.data.forEach(item=>{
            if(item.img!=null){
              item.img=app.globalData.url.concat(item.img)
            }
          })
          this.setData({
            list:res.data.data
          })
        //  console.log(this.data.list)
        }else if(res.data.code==-1){
          this.setData({
            list:[]
          })
        }
       }
      })
  },
  chooseImg: function (e) {
  //  console.log(e.currentTarget.dataset.bean.id)
    this.setData({
      zsid:e.currentTarget.dataset.bean.id
    })
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      var imgs = that.data.imgs;
      // console.log(tempFilePaths + '----');
      for (var i = 0; i < tempFilePaths.length; i++) {
       if (imgs.length >= 9) {
        that.setData({
         imgs: imgs
        });
        return false;
       } else {
        imgs.push(tempFilePaths[i]);
      //  console.log(tempFilePaths[i]);
       }
      }
      that.setData({
       imgs: imgs
      });
        wx.uploadFile({
            url: app.globalData.url+'api/upload/importImg', //接受图片的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
                'user': 'test'
            },
            success(res) {
              var result = JSON.parse(res.data);
            //  console.log(result.data.slice(8))
              if(result.code==0){
                // 上传完成需要更新 fileList
              // 将图片信息添加到fileList数字中
              // 更新存放图片的数组

              that.setData({
                  data:result.data.slice(8)
              });
         //  console.log(that.data.data)
           that.update()
          // that.data.fileList.push(file.url)
              wx.hideLoading();//停止loading
             }else{
              wx.hideLoading();//停止loading
              wx.showToast({
                icon:"error",
                  title: '请上传正确的图片',
                }) 
    
             }
                //do something
            }
        })
  
     }
    });
   },
   update(){
      wx.request({
        url: app.globalData.url+"api/wx/myZsInfo",
        method:'POST',
        data:{
          img:this.data.data,
          zsid:this.data.zsid,
          type:'U'
        },
        success:(res)=>{
         // console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: '证书照片修改成功',
              icon:'success',
            })
            this.getzhengshu()
          }
        }
      })
   },
  goDetails(){
    wx.navigateTo({
      url: '../Details/Details',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     
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
    this.getzhengshu()
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