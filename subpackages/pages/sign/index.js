// subpackages/pages/sign/index.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive:null,
    isActives:null,
    isActivess:null,
    isActivesss:null,
    isActivessss:null,
    value:'',
    name:'',
    ID:'',
    issign:'',
    creattime:'',
    imgs: [],
    data:'',
    nowTime:'',
    orgname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let name=wx.getStorageSync('wxuser').name
    let orgname=wx.getStorageSync('wxuser').orgname
   // console.log(this.data.issign)
    //console.log(options)
   
      this.setData({
        ID:options.ID,
        name:name,
        orgname:orgname
      })

   
  },
  xm_d(){
   // console.log('111')
    this.setData({
      isActive:'0'
    })
  },
  xm_c(){
    //console.log('222')
    this.setData({
      isActive:'1'
    })
  },
  xm_ds(){
   // console.log('111')
    this.setData({
      isActives:'0'
    })
  },
  xm_cs(){
   // console.log('222')
    this.setData({
      isActives:'1'
    })
  },
  xm_dss(){
   // console.log('111')
    this.setData({
      isActivess:'0'
    })
  },
  xm_css(){
   // console.log('222')
    this.setData({
      isActivess:'1'
    })
  },
  xm_dsss(){
   // console.log('111')
    this.setData({
      isActivesss:'0'
    })
  },
  xm_csss(){
   // console.log('222')
    this.setData({
      isActivesss:'1'
    })
  },
  xm_dssss(){
    //console.log('111')
    this.setData({
      isActivessss:'0'
    })
  },
  xm_cssss(){
   // console.log('222')
    this.setData({
      isActivessss:'1'
    })
  },
  getval(e){
 // console.log(e.detail.value) 
  this.setData({
    value:e.detail.value
  })
  },
  postval(){
       console.log(this.data.isActive,this.data.isActives,this.data.isActivess,this.data.isActivesss,this.data.isActivessss,this.data.value)
       if(this.data.isActive==null||this.data.isActives==null||this.data.isActivess==null||this.data.isActivesss==null||this.data.isActivessss==null){
        wx.showToast({
         title: '请完善检查项目选项',
         icon:'none'
       })
       }else{
        wx.request({
          url: app.globalData.url+'api/user/scanQrcode',
          method:'POST',
          data:{
           userid:wx.getStorageSync('userid'),
           qrcodeId:this.data.ID,
           isdevice:this.data.isActive,
           isfighting:this.data.isActives,
           issafety:this.data.isActivess,
           ishealth:this.data.isActivesss,
           istemperature:this.data.isActivessss,
           contment:this.data.value
          },
          success:(res)=>{
          // console.log(res.data)
           if(res.data.code==0){
           // console.log('111')
            wx.showToast({
             title:res.data.msg,
             icon:'success'
           })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            })
          },2000)
           }
          }
        })
       }
  },
  getqd(){
    console.log('111')
    wx.request({
      url: app.globalData.url+'api/user/scanQrcode',
      method:'POST',
      data:{
         userid:wx.getStorageSync('userid'),
         qrcodeId:this.data.ID,
         type:'1'
      },
      success:(res)=>{
        console.log(res.data)
        if(res.data.code==0){
          this.setData({
            creattime:res.data.data.createtime,
            issign:res.data.data.issign
          })
          console.log(this.data.creattime,this.data.issign)
        }
      }
    })
  },
 qd(){
   console.log(this.data.ID)
    wx.request({
      url: app.globalData.url+'api/user/scanQrcode',
      method:'POST',
      data:{
         userid:wx.getStorageSync('userid'),
         qrcodeId:this.data.ID
      },
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title:res.data.msg,
            icon:'success'
          })
          this.setData({
            creattime:res.data.data.createtime,
            issign:res.data.data.issign
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'success'
          })
        }
      }
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
    console.log(year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao);
    this.setData({
        nowTime: year + '-' + month + '-' + day + ' ' + xiaoshi + ':' + fenzhong + ':' + miao
    })

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
  // count: 1, // 默认9
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
     console.log(tempFilePaths[i]);
    }
   }
   that.setData({
    imgs: imgs
   });
   console.log(that.data.imgs)
     wx.uploadFile({
         url: app.globalData.url+'api/upload/importImg', //接受图片的接口地址
         filePath: that.data.imgs,
         name: 'file',
         formData: {
             'user': 'test'
         },
         success(res) {
           console.log(res)
           var result = JSON.parse(res.data);
           console.log(result.data.slice(8))
           if(result.code==0){
             // 上传完成需要更新 fileList
        
           // 将图片信息添加到fileList数字中
           // 更新存放图片的数组
           console.log(result.data)
           that.setData({
               data:result.data.slice(8)
           });
        console.log(that.data.data)
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
  // 删除图片
  deleteImg: function (e) {
   var imgs = this.data.imgs;
   var index = e.currentTarget.dataset.index;
   imgs.splice(index, 1);
   this.setData({
    imgs: imgs
   });
  },
  // 预览图片
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   // this.getqd()
   this.getNowDate()
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