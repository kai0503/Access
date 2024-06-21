import * as echarts from '../../components/ec-canvas/echarts';
var dataList = [];
let app=getApp()
Page({
	/**
   * 页面的初始数据
   */
  data: {
    peoplelist:{},
    list_form:[],
    message:'',
    pjdate:'',
    time:null,
    stafftype:'',
    ec: {
      lazyLoad: true // 延迟加载
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  QR(){
    wx.scanCode({
      success:(res)=>{
        console.log(res)
        if(res.result!=''){
          this.setData({
            ID:res.result
          })
          // if(res.result.substr(0,1)=='D'){
          //   wx.navigateTo({
          //     url: '../wxindex/wxindex?ID='+this.data.ID,
          //   })
          // }else{
          //   wx.navigateTo({
          //     url: '../../subpackages/pages/sign/index?ID='+this.data.ID,
          //   })
          // }
         
          wx.request({
            url: app.globalData.url+'api/user/scanQrcode',
            method:'POST',
            data:{
               qrcodeId:res.result
            },
            success:(res)=>{
              console.log(res)
              if(res.data.code==0){
                if(res.data.data.codeno!=null&&res.data.data.codeno.substr(0,1)=='D'){
            wx.navigateTo({
              url: '../wxindex/wxindex?ID='+res.data.data.codeno,
            })
          }else{
            wx.navigateTo({
              url: '../../subpackages/pages/sign/index?ID='+res.data.data,
            })
          }
              }else{
                wx.showToast({
                  title:res.data.msg,
                  icon:'error'
                })
              }
            }
          })
    
        }
      }
     })
  },
  getqd(){
     wx.request({
       url:app.globalData.url+'api/getAddress',
       method:'POST',
       data:{
         userid:wx.getStorageSync('userid')
       },
       success:res=>{
         var that=this;
         console.log(res)
         if(res.data.code==1){
          wx.showModal({
            title: '提示',
            content: '您需要去进行签到',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    that.QR()
                } 
                else if (res.cancel) {
                    console.log('用户点击取消')
                }
              }
            })
         }
       }
     })
  },
  getpj(){
     wx.request({
       url: app.globalData.url+'api/pub/isPj',
       method:'POST',
       data:{
         userid:wx.getStorageSync('userid'),
         pjdate:this.data.pjdate
       },
       success:res=>{
         console.log(res)
         if(res.data.code==0&&this.data.stafftype==true){//&&this.data.fg==true
          wx.showModal({
      title: '提示',
      content: '您还没有进行岗位评价，请前往评价',
      confirmText: "前去评价",
      showCancel:false,
      success (res) {
        if (res.confirm) {
         wx.navigateTo({
           url: '../../subpackages/pages/positions/positions',
         })
        } else if (res.cancel) {
        }
      }
    })
         }else{
        
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
    var week=date.getDay()
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
    let time='星期'+['日','一','二','三','四','五','六','日',][week]
    let timehourl=xiaoshi
    this.setData({
      findtime:xiaoshi + ':' + fenzhong + ':' + miao,
      pjdate:year + '-' + month + '-' + day,
      time:time
    })
    if(time=='星期五'&&timehourl>10){
      this.setData({
        fg:true
      })
    }else{
      this.setData({
        fg:false
      })
    }
    // console.log(time)
    // if(time>'星期五 10:00'){
    //   console.log('true')
    // }else{
    //   console.log('false')
    // }
  },
  sjdl(){
    wx.navigateTo({
      url: '../../subpackages/pages/driverimg/driverimg',
    })
     },
  onLoad: function (options) {
    this.getqd()

    // wx.showModal({
    //   title: '提示',
    //   content: '您还没有进行岗位评价，请前往评价',
    //   confirmText: "前去评价",
    //   showCancel:false,
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  onShow(){
    console.log('1234')
    let abs=wx.getStorageSync('wxuser').stafftype
    if(abs==2||abs==0||abs==1){
      this.setData({
        stafftype:true
      })
    }
   
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据
    this.getNowDate()
  this.getpj()
 
  },
  jump_people(e){
  console.log(e.currentTarget.dataset.bean.orgid)
  wx.navigateTo({
    url: '../../subpackages/pages/Company_personnel/Company_personnel?orgid='+e.currentTarget.dataset.bean.orgid,
  })
  },
  getData: function () {
  	/**
  	 * 此处的操作：
  	 * 获取数据json
  	 */
  	wx.request({
      url: app.globalData.url+'api/pubpeoplenum/peopleNum',
      method:'GET',
      success: (res) => {
        console.log(res)
      if(res.data.code==0){
        let old_form=JSON.parse(JSON.stringify(res.data.data))
        this.setData({
          peoplelist:res.data.data,
        })
        dataList = JSON.parse(JSON.stringify(old_form.pubPeoplenum.sort((a,b)=>b.value-a.value).slice(0,10)));
        console.log(dataList)
      this.init_echarts();//初始化图表
      this.setData({
        list_form:JSON.parse(JSON.stringify(old_form.pubPeoplenum.sort((a,b)=>b.value-a.value)))
      })
      console.log(this.data.list_form,'list_form')
      }
      }
	});
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function () {
    //时间显示范围
    // 指定图表的配置项和数据
    var option = {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        position: [-10, 50]
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        show:false
      },
      series: [
        {
          type: 'pie',
          radius: '75%',
          data:dataList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    return option;
  },
})