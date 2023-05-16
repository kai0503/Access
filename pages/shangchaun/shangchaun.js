//获取应用实例
var app = getApp();
Page({
    data: {
      imgs:[],
      userid:'',
       name:'',
       person:'',
       phone:'',
       data:'',
        fileList: [], //图片存放的数组
    },
    onLoad(options){
      let data=wx.getStorageSync('wxuser')
      this.setData({
        userid:wx.getStorageSync('userid'),
        name:data.name,
        person:data.juridicalname,
        phone:data.phone
      })
     // console.log(wx.getStorageSync('userid'))
    },
    radioChangename(e){
    // console.log(e.detail.detail.value)
     this.setData({
       name:e.detail.detail.value
     })
    },
    radioChangeperson(e){
     // console.log(e.detail.detail.value)
      this.setData({
        person:e.detail.detail.value
      })
     },
     radioChangephone(e){
    //  console.log(e.detail.detail.value)
      this.setData({
        phone:e.detail.detail.value
      })
     },
    // 删除照片
    deleteClick(event) {
        var imgData = this.data.fileList;
        // 通过splice方法删除图片
        imgData.splice(event.detail.index, 1);
        // 更新图片数组
        that.setData({
            fileList: imgData
        })
       
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
          url:app.globalData.url+'api/upload/importImg', //接受图片的接口地址
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
    upload(){
      let userid=this.data.userid;
     let name=this.data.name;
     let person=this.data.person;
     let phone=this.data.phone;
    // console.log(this.data.data)
     let data=this.data.data.substr(this.data.data.lastIndexOf("/") + 1);
     let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    // console.log(this.data.name,this.data.person,this.data.phone,data)
     if(name==''||person==''||phone==''){
       wx.showToast({
         title: '请输入完整的信息',
         icon:'none'
       })
     }else if(!reg_tel.test(phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon:'none'
      })
     }else if(data==''){
      wx.showToast({
        title: '请上传资质照片',
        icon:'none'
      })
     }else{
        wx.request({
          url: app.globalData.url+'api/pubcompany/companyUp',
          method:'POST',
          data:{
            userid:userid,
            name:name,
            juridicalname:person,
            phone:phone,
            data:data
          },
          success:(res)=>{
           // console.log(res)
           if(res.data.code==0){
             wx.showToast({
               title: '单位信息上传成功',
               mask:true
             })
            setTimeout(()=>{
              wx.navigateBack({ changed: true });//返回上一页
            },1000)
           }
          }
        })
     }
    }
})
