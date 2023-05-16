// subpackages/pages/visitor/visitor.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    Name:'',
    phone:'',
    Receptionist:'',
    information:"",
    imgs: [],
  },
 // 上传图片
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
      wx.uploadFile({
          url: app.globalData.url+'api/upload/importImg', //接受图片的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
              'user': 'test'
          },
          success(res) {
            var result = JSON.parse(res.data);
            console.log(result)
            if(result.code==0){
              // 上传完成需要更新 fileList
         
            // 将图片信息添加到fileList数字中
            // 更新存放图片的数组
            that.setData({
                data:result.data
            });
          //  console.log(that.data.fileList)
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
// 照片
// afterRead(event) {
//   // loading加载
//   wx.showLoading({
//       title: '上传中...'
//   });
//   const {file} = event.detail;//获取图片详细信息
//   let that = this;//防止this指向问题
//   // 设置请求头，根据项目需求变换
//   let Authorization = wx.getStorageSync('key')
//   let headers = {
//       'content-type': '',
//       'client_id': 'webApp',
//       'client_secret': '123456',
//   }
//   if (Authorization) {
//       headers.Authorization = 'Bearer ' + Authorization
//   }
//   // 调用wx.uploadFile上传图片方法

  
//   wx.uploadFile({
//       url: app.globalData.url+"api/upload/importImg",
//       method: 'POST',
//       header: headers,
//       filePath: file.url, 
//       name: 'file',
//       formData: {
//           user: 'test'
//       },
//       // 成功回调
//       success(res) {
        
//           // JSON.parse()方法是将JSON格 式字符串转换为js对象
//           var result = JSON.parse(res.data);
//         //  console.log(result)
//          if(result.code==0){
//             // 上传完成需要更新 fileList
//           const {fileList = []} = that.data;
//           // 将图片信息添加到fileList数字中
//           fileList.push({
//               ...file,
//               url: result.data
//           });
//           // 更新存放图片的数组
//           that.setData({
//               fileList,
//               data:result.data
//           });
//         //  console.log(that.data.fileList)
//       // that.data.fileList.push(file.url)
//           wx.hideLoading();//停止loading
//          }else{
//           wx.hideLoading();//停止loading
//           wx.showToast({
//             icon:"error",
//               title: '请上传正确的图片',
//             }) 

//          }
//       },
//   });
// },
addUsers(){
  let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/; 
 let data=this.data.data.substr(this.data.data.lastIndexOf("/") + 1);
 if(this.data.Name==''||this.data.phone==''||this.data.Receptionist==''){
wx.showToast({
  title: '请输入完整的信息',
  icon:'none'
})
 }else if(this.data.information!=''&&!express.test(this.data.information)){
   wx.showToast({
     title: '车牌格式不正确',
     icon:'none'
   })
 }else if(!reg_tel.test(this.data.phone)){
  wx.showToast({
    title: '请输入正确的手机号',
    icon:'none'
  })
 }else if(this.data.data==''){
  wx.showToast({
    title: '请先上传人脸照片',
    icon:'none'
  })
 }else{
   wx.request({
     url: app.globalData.url+"api/fk/fkAdd",
     method:'POST',
    data:{
      name:this.data.Name,
      phone:this.data.phone,
      receivername:this.data.Receptionist,
      imgurl:data,
      weixinid:app.globalData.wechatId,
      vehicleno:this.data.information
    },
    success:(res)=>{
     console.log(res)
     if(res.data.data.examstatus==1){
       wx.showToast({
         title: '提交成功请等待审核',
         icon:'none'
       })
       wx.setStorageSync('sh',true)
     }else if(res.data.data.examstatus==2){
      wx.showToast({
        title: '审核成功',
        icon:'none'
      })
     }
    }
   })
 // console.log(this.data.Name,this.data.phone,this.data.Receptionist,data,app.globalData.wechatId,this.data.information)
 }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   console.log(app.globalData.wechatId)
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