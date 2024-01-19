// pages/faceRegister/faceRegister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:'',
    drivingno:'',
    travelno:'',
    imgss:[],
    imgsss:[]
  },
  submit(){
    console.log(this.data.imgurl,this.data.drivingno,this.data.travelno)
     wx.request({
       url: app.globalData.url+"api/user/imgUp",
       method:'POST',
       data:{
          userid:wx.getStorageSync('userid'),
          imgurl:this.data.imgurl,
          drivingno:this.data.drivingno,
          travelno:this.data.travelno
       },
       success:(res)=>{
         console.log(res,'11111111111')
         if(res.data.code==0){
          wx.showToast({
            icon:"success",
            title: '上传成功',
          }) 
          wx.setStorageSync('drivingno', this.data.drivingno)
          wx.setStorageSync('travelno', this.data.travelno)
           setTimeout(()=>{
            wx.navigateBack({
              delta:1,
            })
           },1000)
        
         }

       }
     })
  },
chooseImgs(){
  var that = this;
  var imgs = this.data.imgss;
  if (imgs.length >= 9) {
   this.setData({
    lenMore: 1
   });
   setTimeout(function () {
    that.setData({
     lenMore: 0
    });
   }, 2500);
   return false;
  }
  wx.chooseImage({
    count: 1, // 默认9
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths;
    var imgs = that.data.imgss;
    // console.log(tempFilePaths + '----');
    for (var i = 0; i < tempFilePaths.length; i++) {
     if (imgs.length >= 9) {
      that.setData({
       imgss: imgs
      });
      return false;
     } else {
     imgs[0]=tempFilePaths[i];
      console.log(tempFilePaths[i]);
      that.setData({
        imgss: imgs
       })
     }
    }
 ;
    wx.showLoading({
      title: '上传中',
      mask:true
    })
      wx.uploadFile({
          url: app.globalData.url+'api/upload/importImg', //接受图片的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
              'user': 'test',
              'type':'0'
          },
          success(res) {
            console.log(res)
            var result = JSON.parse(res.data);
            
          
            if(result.code==0){

              // 上传完成需要更新 fileList
         
            // 将图片信息添加到fileList数字中
            // 更新存放图片的数组
            console.log(result.data)
            that.setData({
              drivingno:result.data.slice(17)
            });

         console.log(that.data.imgss)
        // that.data.fileList.push(file.url)
            wx.hideLoading();//停止loading
           }else{
            wx.hideLoading();//停止loading
            wx.showToast({
                icon:"error",
                title: '请上传正确的图片',
              }) 
              that.setData({
                imgss:[]
              })
           }
              //do something
          }
      })

   }
  });
},
chooseImgss(){
  var that = this;
  var imgs = this.data.imgsss;
  if (imgs.length >= 9) {
   this.setData({
    lenMore: 1
   });
   setTimeout(function () {
    that.setData({
     lenMore: 0
    });
   }, 2500);
   return false;
  }
  wx.chooseImage({
    count: 1, // 默认9
   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
   success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePaths = res.tempFilePaths;
    var imgs = that.data.imgsss;
    // console.log(tempFilePaths + '----');
    for (var i = 0; i < tempFilePaths.length; i++) {
     if (imgs.length >= 9) {
      that.setData({
       imgss: imgs
      });
      return false;
     } else {
     imgs[0]=tempFilePaths[i];
      console.log(tempFilePaths[i]);
      that.setData({
        imgsss: imgs
       })
     }
    }
 ;
    wx.showLoading({
      title: '上传中',
      mask:true
    })
      wx.uploadFile({
          url: app.globalData.url+'api/upload/importImg', //接受图片的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
              'user': 'test',
              'type':'1'
          },
          success(res) {
            console.log(res)
            var result = JSON.parse(res.data);
            
          
            if(result.code==0){

              // 上传完成需要更新 fileList
         
            // 将图片信息添加到fileList数字中
            // 更新存放图片的数组
            console.log(result.data)
            that.setData({
              travelno:result.data.slice(17)
            });

         console.log(that.data.imgss)
        // that.data.fileList.push(file.url)
            wx.hideLoading();//停止loading
           }else{
            wx.hideLoading();//停止loading
            wx.showToast({
                icon:"error",
                title: '请上传正确的图片',
              }) 
              that.setData({
                imgsss:[]
              })
           }
              //do something
          }
      })

   }
  });
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//result.data.substring(result.data.lastIndexOf("/",result.data.lastIndexOf("/")-1)+1)
    console.log(app.globalData.url)
    let str=wx.getStorageSync('contract')
    let arr=str.split('\\')
    let result=arr.pop()
    console.log(result)
         this.setData({
           imgurl:result
         })
        console.log(wx.getStorageSync('wxuser').drivingno.length)
         if(wx.getStorageSync('wxuser').drivingno.length>5){
          let arr=[]
          arr[0]=app.globalData.url.concat(wx.getStorageSync('wxuser').drivingno)
          this.setData({
            drivingno:wx.getStorageSync('wxuser').drivingno,
            imgss:arr
          })
          console.log(this.data.imgss)
         }else{
           
         }
         if(wx.getStorageSync('wxuser').travelno.length>5){
           let arr=[]
           arr[0]=app.globalData.url.concat(wx.getStorageSync('wxuser').travelno)
          this.setData({
            travelno:wx.getStorageSync('wxuser').travelno,
            imgsss:arr
          })
          console.log(this.data.imgsss)
         }
  },
  chakanxs(){
    var imgs = this.data.imgsss;
  wx.previewImage({
   //当前显示图片
   current: imgs[0],
   //所有图片
   urls: imgs
  })
  },
  chakanjs(){
    var imgs = this.data.imgss;
  wx.previewImage({
   //当前显示图片
   current: imgs[0],
   //所有图片
   urls: imgs
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
