// index.js
// const app = getApp()

let app=getApp()

Page({
  data: {
   imglist:['http://203.195.156.104:8013/contract/img1.jpg','http://203.195.156.104:8013/contract/img2.jpg','http://203.195.156.104:8013/contract/img3.jpg','http://203.195.156.104:8013/contract/img4.png'],
    flag:'',
    stafftype:0,
    startdate: '',
    enddate: '',
    listsss:[],
    indexs:true,
    activeNames: ['1'],
    list:[],
    userid:null,
    nbnum:'',
    allnum:'',
    wxnum:'',
    vehicleno:'',
    code:null,
    d_num:''
  },
  
  onLoad: function (options) {
  //  console.log(app.globalData.wechatId,)
    this.setData({
      userid:wx.getStorageSync('userid'),
      stafftype:wx.getStorageSync('wxuser').stafftype
    })
   // console.log(this.data.stafftype)
  
  
},
onShow(){
  if(wx.getStorageSync('wxuser').stafftype==1){
    this.getpeople()
    let miao=' 00:00:00'
    let endmiao=' 23:59:59'
    this.setData({
      startdate: this.getToday(),
      enddate: this.getToday(),
    })
    console.log(this.data.startdate)
    let startime=this.getToday().concat(miao)
    let endtime=this.getToday().concat(endmiao)
    this.getAlarm(startime,endtime)
  }else if(wx.getStorageSync('wxuser').stafftype==0||wx.getStorageSync('wxuser').stafftype==2){
    this.getpeople()
    let miao=' 00:00:00'
    let endmiao=' 23:59:59'
    this.setData({
      startdate: this.getToday(),
      enddate: this.getToday(),
    })
    console.log(this.data.startdate)
    let startime=this.getToday().concat(miao)
    let endtime=this.getToday().concat(endmiao)
    this.getAlarm(startime,endtime)
  }
  let len=this.data.listsss.length;
  console.log(len)
if(len>5){
 this.setData({
  d_num:6
})
}else{
 this.setData({
  d_num:len>2?3:len
})
}
},
//轮播图放大
preview(event){
 let index=event.currentTarget.dataset.index
 wx.previewImage({ 
  current:this.data.imglist[index],
  urls:this.data.imglist
})
},
getAlarm(startdate,enddate){
  wx.request({
    url:app.globalData.url+'api/wx/getAlarm',
    method:'POST',
    data:{
      starttime:startdate,
      endtime:enddate
    },
    success:(res)=>{
     console.log(res)
      if(res.data.code==0){
        if(res.data.data.length!=0){
          this.setData({
            listsss:res.data.data,
            flag:false
          })
        }else{
          this.setData({
            listsss:res.data.data,
            flag:true
          })
        }
        let len=this.data.listsss.length;
    console.log(len)
  if(len>5){
   this.setData({
    d_num:6
  })
  }else{
   this.setData({
    d_num:len>2?3:len
  })
  }
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
endDateChange(e) {
  let stmiao=' 00:00:00'
    let miao=' 23:59:59'
    let endtime=e.detail.value.concat(miao)
    this.setData({
      enddate: e.detail.value
    })
   // console.log(e)
   this.getAlarm()
    console.log(this.data.startdate.concat(stmiao),endtime)
    let len=this.data.listsss.length;
    console.log(len)
},
startDateChange(e) {
  let miao=' 00:00:00'
    let startime=e.detail.value.concat(miao)
    this.setData({
      startdate: e.detail.value
    })
    let endmiao=' 23:59:59'
    this.getAlarm(startime,this.data.enddate.concat(endmiao)) 
},
getpeople(){
  wx.request({
    url:app.globalData.url+'api/pubpeoplenum/peopleNum',
    method:'GET',
    success:(res)=>{
      console.log(res)
      if(res.data.code==0){
        if(res.data.data!=''){
          this.setData({
            nbnum:res.data.data.nbnum,
            allnum:res.data.data.allnum,
            wxnum:res.data.data.wxnum,
            vehicleno:res.data.data.vehicleno,
          })
        }
      }
    },
    fail:function(){
     wx.showToast({
       title: '获取人数失败',
       icon:'error'
     })
    }
  })
},
getToday: function () {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  };
  if (day < 10) {
    day = '0' + day;
  };
  // 如果需要时分秒
  // var h = now.getHours();
  // var m = now.getMinutes();
  // var s = now.getSeconds();
  var formatDate = year + '-' + month + '-' + day;
  return formatDate;
},
  
  gopeople(){
    wx.navigateTo({
      url: '/pages/personnel/personnel',
    })
  },
  gobjxx(){
   wx.navigateTo({
      url: '/pages/information/information',
    })
  },
  fqtz(){
    wx.navigateTo({
      url: '/pages/notification/notification',
    })
  },
  gopapar(){
    wx.navigateTo({
      url: '/pages/papar/papar',
    })
  },
  godetail(){
    wx.navigateTo({
      url: '../../subpackages/pages/zldetails/zldetails',
    })
  }
});
