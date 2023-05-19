// pages/user/info/index.js
const app = getApp()
Page({
  data: {
    userid:null,
    form:null,
   zy:null,
   classname:null,
    img:'',
    imgs:[],
    data:'',
    categoryOneIndex: 0,
    categoryOneMcc:'',
    categoryOneTxt: "请选择所属部门", 
    categoryOneArrs:[],
    value:'',
    tg:'',
    hgFlag:'',
    orgname:''
  },
  onLoad: function() {
    //this.getbm()
    this.setData({
      userid:wx.getStorageSync('userid'),
      orgname:wx.getStorageSync('wxuser').orgname
    })
    this.getpersonal()

  },
  getbm(){
    wx.request({
      url: app.globalData.url+"api/pubcust/getCustinfoType",
      method:'GET',        
      success:(res)=>{
       console.log(res)
        if(res.data.code==0){
          this.setData({
           categoryOneArrs:res.data.data
          })
        }
      },
      fail:function(){
       wx.showToast({
         title: '获取数据失败',
         icon:'error'
       })
      }
    })
  },
  getpersonal(){
       wx.request({
        url:app.globalData.url+'api/wx/myInfo',
        method:'POST',
        data:{
         userid:this.data.userid,
         U:'111'
        },
        success:(res)=>{
          console.log(res)
          if(res.data.code==0){
            let img=app.globalData.url.concat(res.data.data.custinfo.contract)
            if(res.data.data.custinfo.worktype!=null){
             if(res.data.data.custinfo.worktype=='0'){
              res.data.data.custinfo.worktype='安装工'
             }else if(res.data.data.custinfo.worktype=='1'){
              res.data.data.custinfo.worktype='技术工'
             }else if(res.data.data.custinfo.worktype=='1,0'){
              res.data.data.custinfo.worktype='安装工,技术工'
             }
            }
          console.log(res.data.data.worktype)
            this.setData({
              form:res.data.data.custinfo,
              zy:res.data.data.custinfo.zy,
              classname:res.data.data.custinfo.classname,
              img:img.replace(/\\/,"/"),
              categoryOneTxt:res.data.data.custinfo.worktype,
              tg:res.data.data.tg,
              hgFlag:res.data.data.hgFlag
            })
         console.log(this.data.img)
          }
        }
       })
  },
  updateimg(){
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
     url: app.globalData.url+"api/user/userImgUp",
     method:'POST',
     data:{
       imgpath:this.data.data,
       userid:this.data.userid,
     },
     success:(res)=>{
       console.log(res)
       if(res.data.code==0){
         wx.showToast({
           title: '人脸照片修改成功',
           icon:'success',
         })
         this.getpersonal()
       }else{ 
        wx.showToast({
         title: '人脸照片修改失败',
         icon:'error',
       })
       }  
     }
   })
},
  pickerChange(e) {
   // console.log(e)
    let firstMcc = this.data.categoryOneArrs[e.detail.value].name;
    let value=this.data.categoryOneArrs[e.detail.value].value;
    this.setData({
      categoryOneMcc: firstMcc,
      categoryOneIndex: e.detail.value,
      categoryOneTxt: firstMcc,
      value:value
    }); 

},  
radioChangzy(e){
console.log(e)
this.setData({
  classname:e.detail.value
})
},
radioChangzys(e){
 console.log(e)
 this.setData({
  zy:e.detail.value
 })
 },
// radioChangclassname(e){
//   this.setData({
//     classname:e.detail.value
//   })
// },
goCertificate(){
  wx.navigateTo({
    url: '../../../subpackages/pages/Certificate/Certificate',
  })
},
postpersonal(){
  console.log(this.data.zy,this.data.classname)
   if(this.data.zy==''){
    wx.showToast({
      title: '请填写你的工种',
      icon:'none'
    })
  }else if(this.data.classname==''){
    wx.showToast({
      title: '请填写你的班组',
      icon:'none'
    })
  }else{
    wx.request({
      url:app.globalData.url+'api/wx/myInfo',
      method:'POST',
      data:{
       userid:this.data.userid,
       //bm:this.data.zy,
       zy:this.data.zy,
       bz:this.data.classname,
       U:'U'
      },
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            form:res.data.data
          })
          wx.showToast({
            title: '资料修改成功',
            icon:'success'
          })
        }
      }
     })
  }
 
}
})