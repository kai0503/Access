// subpackages/pages/regulations/regulations.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    imageurl:'',
    safeproblem:'',
    userid:'',
    findtime:'',
    infoid:''
  },
  remarkinput(e){
     console.log(e.detail.value)
     this.setData({
      safeproblem:e.detail.value
     })
  },
  submit(){
    console.log(this.data.imageurl,this.data.safeproblem,this.data.userid,this.data.findtime,this.data.infoid)
    if(this.data.imageurl==''||this.data.safeproblem==''){
      wx.showToast({
        title:'请填写完整的信息',
        icon:'none'
      })
    }else{
      wx.request({
        url: app.globalData.url+'api/safe/saveProblem',
        method:'POST',
        data:{
          userid:this.data.userid,
          safeproblem:this.data.safeproblem,
          findtime:this.data.findtime,
          imageurl:this.data.imageurl,
          infoid:this.data.infoid
        },
        success:res=>{
          console.log(res)
          if(res.data.code==0){
            wx.showToast({
              title: res.data.msg,
              icon:'success'
            })
           setTimeout(() => {
            wx.navigateBack({
              delta:2
            })
           }, 1000);
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'error'
            })
          }
        }
      })
    }
  },
  chooseImg: function (e) {
    var that = this;
    var imgs = this.data.imgs;
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
      var imgs = that.data.imgs;
      // console.log(tempFilePaths + '----');
      for (var i = 0; i < tempFilePaths.length; i++) {
       if (imgs.length >= 9) {
        that.setData({
         imgs: imgs
        });
        return false;
       } else {
       imgs[0]=tempFilePaths[i];
        console.log(tempFilePaths[i]);
       }
      }
      that.setData({
       imgs: imgs
      });
        wx.uploadFile({
            url: app.globalData.url+'api/safe/importsafeImg', //接受图片的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
                'user': 'test'
            },
            success(res) {
              console.log(res)
              var result = JSON.parse(res.data);
              console.log(result.data.slice(17))
              if(result.code==0){
                // 上传完成需要更新 fileList
           
              // 将图片信息添加到fileList数字中
              // 更新存放图片的数组
              console.log(result.data)
              that.setData({
                imageurl:result.data.slice(17)
              });
           console.log(that.data.imageurl)
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
   jumprecords(){
       wx.navigateTo({
         url: '../records/records',
       })
   },
   // 删除图片
 deleteImg: function (e) {
  var imgs = this.data.imgs;
  var index = e.currentTarget.dataset.index;
  imgs.splice(index, 1);
  this.setData({
   imgs: imgs
  });
 },
  previewImg: function (e) {
    //获取当前图片的下标
   var index = e.currentTarget.dataset.index;
    //所有图片
   var imgs = this.data.imgs;
   wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
   })
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
      findtime: year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 console.log(options.id)
 this.setData({
   infoid:options.id
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
      this.setData({
       userid:wx.getStorageSync('userid'),
      })
      this.getNowDate()
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