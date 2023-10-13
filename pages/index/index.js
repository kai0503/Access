import * as echarts from '../../components/ec-canvas/echarts';
var dataList = [];
let app=getApp()
Page({
	/**
   * 页面的初始数据
   */
  data: {
    peoplelist:{},
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
         if(res.data.code==0&&this.data.fg==true&&this.data.stafftype==true){
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
  onLoad: function (options) {
  

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
    let abs=wx.getStorageSync('wxuser').stafftype
    if(abs==2||abs==0){
      this.setData({
        stafftype:true
      })
    }
   
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据
    this.getNowDate()
  this.getpj()
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
        this.setData({
          peoplelist:res.data.data
        })
        dataList = res.data.data.everyNum;
        console.log(dataList)
  		this.init_echarts();//初始化图表
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
        trigger: 'item'
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