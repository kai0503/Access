//const { TextSchema } = require("XrFrame/components");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
     values:'',
     message:'',
     img:'',
     data:'',
     imgs:[],
     userid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userid=wx.getStorageSync('userid')
    this.setData({
      userid:userid
    })
    console.log(this.data.userid)
this.getinfo()
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
  radioChange(e){
  //  console.log(e.detail.detail.value)
    this.setData({
      values:e.detail.detail.value
    })
  },
  btns(){
    var that=this
    let data=this.data.values
    wx.showModal({
      title: '提示',
      content: '确认是否发起通知?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url:app.globalData.url+"api/pubproject/messageDown",
            method:'POST',
            data:{
              userid:wx.getStorageSync('userid'),
              message:data
            },
            success:(res)=>{
             // console.log(res)
              if(res.data.code==0){
                that.setData({
                  message:res.data.data.message,
                  id:res.data.data.id
                })
                wx.showToast({
                  title: '发起成功',
                  icon:'success'
                })
           
              }
            }
          })

        } else if (res.cancel) {
        //  console.log('用户点击取消')
        }
      }
    })
  },
  btnss(){
    var that=this
   if(that.data.id==''){
    wx.showToast({
      title: '暂无信息可以取消',
      icon:'none'
    })
   }else{
    wx.showModal({
      title: '提示', 
      content: '确认取消发起通知?',
      success: function (res) {
        if (res.confirm) {
         // console.log('用户点击确定')
          wx.request({
            url:app.globalData.url+"api/pubproject/messageDown",
            method:'POST',
            data:{
              msgid:that.data.id,
              type:"1"
            },
            success:(res)=>{
             // console.log(res.data.code)
              if(res.data.code==0){
                wx.showToast({
                  title: res.data.msg,
                  icon:'success'
                })
                 that.setData({
                   message:'',
                   values:'',
                 })
              }
            }
          })
        } else if (res.cancel) {
         // console.log('用户点击取消')
        }
      }
    })
   }
  },
  getinfo(){
     wx.request({
       url: app.globalData.url+"api/pubproject/messageDown",
       method:'POST',
       data:{
         info:'1'
       },
       success:(res)=>{
       //  console.log(res)
         if(res.data.code==0){
         if(res.data.data!=null){
          this.setData({
            message:res.data.data.message,
            id:res.data.data.id
          })
         }
         // console.log(this.data.id)
         }
       }
     })
  },
  btn_one(){
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
               console.log(result.data)
         
              that.setData({
                  data:result.data.substring(result.data.lastIndexOf("/",result.data.lastIndexOf("/")-1)+1)
              });
           console.log(that.data.data)
          that.jdimg()
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
  jdimg(){
      wx.request({
        url: app.globalData.url+'api/user/upScreen',
        method:'POST',
        data:{
          jdimgpath:this.data.data,
          userid:this.data.userid
        },
        success:(res)=>{
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              icon:"success",
                title: '二维码上传成功',
              }) 
          }else{
            wx.showToast({
              icon:"error",
                title: '二维码上传失败',
              }) 
          }
        }
      })
  },
  btn_two(){
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
               console.log(result.data)
         
              that.setData({
                  data:result.data.substring(result.data.lastIndexOf("/",result.data.lastIndexOf("/")-1)+1)
              });
           console.log(that.data.data)
          that.jdimgs()
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
  jdimgs(){
    wx.request({
      url: app.globalData.url+'api/user/upScreen',
      method:'POST',
      data:{
        pximgpath:this.data.data,
        userid:this.data.userid
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            icon:"success",
              title: '二维码上传成功',
            }) 
        }else{
          wx.showToast({
            icon:"error",
              title: '二维码上传失败',
            }) 
        }
      }
    })
},
})