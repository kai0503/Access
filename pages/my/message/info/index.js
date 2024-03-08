// // pages/takephoto/takephoto.js
// const app = getApp()


// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     count: 0, // 设置 计数器 初始为0
//     countTimer: null, // 设置 定时器 初始为null
//     complete:false,
//     querys:0
//   },
   



//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//   //  console.log(options.inittime);
//     this.setData({
//         querys:options.inittime
//     })
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
//     if (wx.createCameraContext()) {
//       this.cameraContext = wx.createCameraContext('myCamera')
//       this.drawProgressbg();
//       // this.drawCircle();
//       this.countInterval();
//     } else {
//       // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
//       wx.showModal({
//         title: '提示',
//         content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
//       })
//     }
//     // this.bindChooiceProduct()
//   },
//   takePhoto(){
//     wx.showLoading({
//       title: '人脸识别中',
//       mask: true
//     })
//     var that=this
//     const ctx=wx.createCameraContext()
//     ctx.takePhoto({
//       quality:'high',
//       success: (res) =>{
//         var imgbase64Url = wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64");
//         that.setData({
//           imgbase64Url:imgbase64Url
//         })
//          this.uploadImg()
//       },
//       fail: () => {
//       },
//       complete: () => {

//       }
//     })
  
//   },
//   error(e) {
//    // console.log(e.detail)
//   },
//   startdrawCanvas(){
//    // console.log('相机初始化成功')
//   },
//   //进行人脸识别
//   uploadImg(){
//     let that=this
//    wx.request({
//     url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
//     data: {
//      grant_type: 'client_credentials',
//      client_id: 'vHkqSXRqFYC1j5qMZHBKFFKD',
//      client_secret: 'kfE83zidc6lFlNTuHoAghbzTZa5DWKDC'//用自己的
//     },
//     header: {
//      'Content-Type': 'application/json' // 默认值
//     },
//     success(res) {
//       that.setData({
//        token: res.data.access_token//获取到token
//       })
//       //上传人脸进行比对
//        wx.request({
//         url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
//         method: 'POST',
//         data: {
//          image: that.data.imgbase64Url,
//          image_type: 'BASE64',
//          group_id_list: 'xjmj_xcx',//自己建的用户组id
//          user_id:wx.getStorageSync('userid')
//         },
//         header: {
//          'Content-Type': 'application/json' // 默认值
//         },
//         success: res=>{
//            console.log(res)
//           wx.hideLoading()
//           if(res.data.error_msg=='pic not has face'){
//             that.goBack('未捕捉到人脸，请重新验证')
//               that.setData({
//                 complete: true
//               });
//           }else{
//             if(res.data.result.user_list[0].score>90){
//               that.goBack('验证成功')
             
//               //验证通过，跳转至管理页面
//               // console.log(this.data.querys)
//               if(wx.getStorageSync('coursewaretype')==2){
//                 wx.redirectTo({
//                   url: '/pages/index/video/index?inittimes='+16,
//                  })
//               }else if(wx.getStorageSync('coursewaretype')==1){
//                 wx.redirectTo({
//                   url: '/pages/seefile/index',
//                  })
//                  wx.setStorageSync('isClose', false)
//               }else if(wx.getStorageSync('coursewaretype')==3){
//                wx.redirectTo({
//                 url: '/pages/wxpersonnel/wxpersonnel?inittimes='+16,
//                })
//               }
//             }else{
//               that.goBack('人脸匹配失败，请重新验证')
//               that.setData({
//                 complete: true
//               });
//             }
//           }
//         }
//        })
//     }

//    })
//   },
   
//    //添加Banner  
//    bindChooiceProduct: function () {
//     var that = this;
//     wx.chooseImage({
//       count: 3, //最多可以选择的图片总数  
//       sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
//       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
//       success: function (res) {
//         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
//         var tempFilePaths = res.tempFilePaths;
//        // console.log(tempFilePaths)
//         //启动上传等待中...  
//         var url = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
//        // console.log(encodeURIComponent(url))
//         that.uploadImg(encodeURIComponent(url))
//       }
//     });
//   },
//   goBack(info){
//     wx.showToast({
//       title: info,
//       icon: 'success',
//       duration: 1000
//      })
//     // setTimeout(function(){
//     //   wx.navigateBack();
//     // },2000)
//   },

//   drawProgressbg: function () {
//     // 使用 wx.createContext 获取绘图上下文 context
//     var ctx = wx.createCanvasContext('canvasProgressbg')
//     ctx.setLineWidth(5); // 设置圆环的宽度
//     ctx.setStrokeStyle('#a9a9a9'); // 设置圆环的颜色
//     ctx.setLineCap('round') // 设置圆环端点的形状
//     ctx.beginPath(); //开始一个新的路径
//     ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);
//     //设置一个原点(100,100)，半径为90的圆的路径到当前路径
//     ctx.stroke(); //对当前路径进行描边
//     ctx.draw();
//   },
//   drawCircle: function (step) {
//     var context = wx.createCanvasContext('canvasProgress');
//     // 设置渐变
//     var gradient = context.createLinearGradient(200, 100, 100, 200);
//     gradient.addColorStop("0", "#2661DD");
//     gradient.addColorStop("0.5", "#2661DD");
//     gradient.addColorStop("1.0", "#2661DD");
//     context.setLineWidth(5);
//     context.setStrokeStyle(gradient);
//     context.setLineCap('round')
//     context.beginPath();
//     // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
//     context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
//     context.stroke();
//     context.draw()
//   },
//   countInterval: function () {
//     // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
//     this.countTimer = setInterval(() => {
//       if (this.data.count <= 60) {
//         /* 绘制彩色圆环进度条
//         注意此处 传参 step 取值范围是0到2，
//         所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
//         */
//         this.drawCircle(this.data.count / (60 / 2))
//         this.data.count++;
//       } else {
//         // this.setData({
//         //   complete: true
//         // });
//          this.takePhoto()
//         clearInterval(this.countTimer);
//       }
//     }, 100)
//   },
//   complateDis(){
//     this.takePhoto()
//   },


//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
       
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
