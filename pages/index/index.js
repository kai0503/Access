import * as echarts from '../../components/ec-canvas/echarts';
var dataList = [];
let app=getApp()
Page({
	/**
   * 页面的初始数据
   */
  data: {
    peoplelist:{},
    ec: {
      lazyLoad: true // 延迟加载
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow(){
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据
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