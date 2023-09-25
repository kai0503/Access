// person/person.js
const app = getApp()
Page({
  data: {
    parperid:'',
    userid:'',
    canvasName: 'handWriting',
    ctx: '',
    canvasWidth: 0,
    canvasHeight: 0,
    transparent: 1, // 透明度
    selectColor: 'black',
    lineColor: '#1A1A1A', // 颜色
    lineSize: 1.5,  // 笔记倍数
    lineMin: 0.5,   // 最小笔画半径
    lineMax: 4,     // 最大笔画半径
    pressure: 1,     // 默认压力
    smoothness: 60,  //顺滑度，用60的距离来计算速度
    currentPoint: {},
    currentLine: [],  // 当前线条
    firstTouch: true, // 第一次触发
    radius: 1, //画圆的半径
    cutArea: { top: 0, right: 0, bottom: 0, left: 0 }, //裁剪区域
    bethelPoint: [],  //保存所有线条 生成的贝塞尔点；
    lastPoint: 0,
    chirography: [], //笔迹
    currentChirography: {}, //当前笔迹
    linePrack: [], //划线轨迹 , 生成线条的实际点
    tmpPath:'',
    show:false,
    answerSelected:[],
    isClick:true,
    isClick:true,
    quests:[]
  },
 

zhuce(e){
 console.log('111')
  this.setData({
      isClick:false     //在点击一次后，点击状态变为关闭，默认为开启
    })
    setTimeout(()=>{    //定义一个延时操作setTimeout
      this.setData({
        isClick:true
      })
    },5000)
   
//下面书写主要方法，比方说判断输入内容是否为空、获取数据库数据、更新数据库内容等等
 
},
  gettimu(){
    console.log(this.data.paparid,this.data.userid)
    wx.request({
      url:app.globalData.url+'api/detail/getinfo',
      method:'POST',
      data:{
           paperid:this.data.parparid,
           userid:this.data.userid,
      },
      success:res=>{
        console.log(res)
        res.data.data.forEach(item=>{
          let arrList=item.options
          var strArr = []
          var strList = arrList.split('^')
        //  console.log(strList)
          strList.forEach(item =>{
            var obj = {}
            obj.name = item
            obj.check=false
            strArr.push(obj)
        })
       // console.log(strArr)
        item.options=strArr
         })
         this.setData({
      quests:res.data.data
    })
    console.log(this.data.quests)
      }
    })
    
    console.log(this.data.quests)
  },
  radioChange(e){
    this.data.answerSelected=[]
     console.log(e.currentTarget.dataset.field)
     this.data.quests.forEach(item=>{
       if(item.id==e.currentTarget.dataset.field){
          item.value=e.detail.value
       }
     })
     console.log(this.data.quests)
  },
   // 点击问题答案触发事件
   answerSelected(e) {
     console.log(e)
    let outidx = e.currentTarget.dataset.outidx;
    let idx = e.currentTarget.dataset.idx;
    let question = this.data.quests[outidx];
    if (question.type == 2 ||question.type == 0) {
      //单选
      for (let item of question.options) {
        item.selected = false;
      }
      question.options[idx].selected = true;
      this.setData({
        quests: this.data.quests
      });
    } else if (question.type == 1) {
      //多选
      question.options[idx].selected = !question.options[idx].selected;
      this.setData({
        quests: this.data.quests
      });
    }
  },
 
  // 点击提交按钮
  submit() {

    this.setData({
      isClick:false     //在点击一次后，点击状态变为关闭，默认为开启
    })
    setTimeout(()=>{    //定义一个延时操作setTimeout
      this.setData({
        isClick:true
      })
    },1000)
   this.data.answerSelected=[]
    let quests = this.data.quests;
    //用来保存选中的答案
    //let answerSelected = [];
    for (let questItem of quests) {
          
      if (questItem.type == 2||questItem.type == 0) { //处理单选题
      
        let isSelected = false;
        for (let answerItem of questItem.options) {
          if (answerItem.selected) {
            //答案被选中
            isSelected = true;
            this.data.answerSelected.push(answerItem.name.slice(0,1));
          }
        }
        if (!isSelected) {
          //如果一个都没选
          this.data.answerSelected.push('');
        }
      } else if(questItem.type == 1) { //处理多选题
        let multiAnswer = [];
        for (let answerItem of questItem.options) {
          if (answerItem.selected) {
            //答案被选中
            multiAnswer.push(answerItem.name.slice(0,1));
          }
        }
        this.data.answerSelected.push(multiAnswer.join(','));
      }else if(questItem.type==3||questItem.type==4){
        this.data.answerSelected.push(questItem.value)
      }

    }
   let flag= this.data.answerSelected.every(item=>!!item)
   if(!flag){
     console.log('不完整')
    wx.showToast({
        title: '还有题未答完,请继续答题!',
        icon: 'error'
      })
   }else{
     console.log('完整')
     wx.setStorageSync('datas',this.data.answerSelected)
     this.setData({
       show:true
     })
   }
     console.log(this.data.answerSelected)
  },
 // 笔迹开始
  uploadScaleStart (e) {
    if (e.type != 'touchstart') return false;
    let ctx = this.data.ctx;
    ctx.setFillStyle(this.data.lineColor);  // 初始线条设置颜色
    ctx.setGlobalAlpha(this.data.transparent);  // 设置半透明
    let currentPoint = {
      x: e.touches[0].x,
      y: e.touches[0].y
    }
    let currentLine = this.data.currentLine;
    currentLine.unshift({
      time: new Date().getTime(),
      dis: 0,
      x: currentPoint.x,
      y: currentPoint.y
    })
    this.setData({
      currentPoint,
      // currentLine
    })
    if (this.data.firstTouch) {
      this.setData({
        cutArea: { top: currentPoint.y, right: currentPoint.x, bottom: currentPoint.y, left: currentPoint.x },
        firstTouch: false
      })
    }
    this.pointToLine(currentLine);
  },
  // 笔迹移动
  uploadScaleMove (e) {
    if (e.type != 'touchmove') return false;
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    }
    let point = {
      x: e.touches[0].x,
      y: e.touches[0].y
    }

    //测试裁剪
    if (point.y < this.data.cutArea.top) {
      this.data.cutArea.top = point.y;
    }
    if (point.y < 0) this.data.cutArea.top = 0;

    if (point.x > this.data.cutArea.right) {
      this.data.cutArea.right = point.x;
    }
    if (this.data.canvasWidth - point.x <= 0) {
      this.data.cutArea.right = this.data.canvasWidth;
    }
    if (point.y > this.data.cutArea.bottom) {
      this.data.cutArea.bottom = point.y;
    }
    if (this.data.canvasHeight - point.y <= 0) {
      this.data.cutArea.bottom = this.data.canvasHeight;
    }
    if (point.x < this.data.cutArea.left) {
      this.data.cutArea.left = point.x;
    }
    if (point.x < 0) this.data.cutArea.left = 0;

    this.setData({
      lastPoint: this.data.currentPoint,
      currentPoint: point
    })
    let currentLine = this.data.currentLine
    currentLine.unshift({
      time: new Date().getTime(),
      dis: this.distance(this.data.currentPoint, this.data.lastPoint),
      x: point.x,
      y: point.y
    })
    // this.setData({
    //   currentLine
    // })
    this.pointToLine(currentLine);
  },
  // 笔迹结束
  uploadScaleEnd (e) {
    if (e.type != 'touchend') return 0;
    let point = {
      x: e.changedTouches[0].x,
      y: e.changedTouches[0].y
    }
    this.setData({
      lastPoint: this.data.currentPoint,
      currentPoint: point
    })
    let currentLine = this.data.currentLine
    currentLine.unshift({
      time: new Date().getTime(),
      dis: this.distance(this.data.currentPoint, this.data.lastPoint),
      x: point.x,
      y: point.y
    })
    // this.setData({
    //   currentLine
    // })
    if (currentLine.length > 2) {
      var info = (currentLine[0].time - currentLine[currentLine.length - 1].time) / currentLine.length;
      //$("#info").text(info.toFixed(2));
    }
    //一笔结束，保存笔迹的坐标点，清空，当前笔迹
    //增加判断是否在手写区域；
    this.pointToLine(currentLine);
    var currentChirography = {
      lineSize: this.data.lineSize,
      lineColor: this.data.lineColor
    };
    var chirography = this.data.chirography
    chirography.unshift(currentChirography);
    this.setData({
      chirography
    })
    var linePrack = this.data.linePrack
    linePrack.unshift(this.data.currentLine);
    this.setData({
      linePrack,
      currentLine: []
    })
  },
  onLoad () {
    let paparid=wx.getStorageSync('parperid')
    console.log(paparid)
    let userid=wx.getStorageSync('userid')
    this.setData({
      parparid:paparid,
      userid:userid
    })
    
    let canvasName = this.data.canvasName
    let ctx = wx.createCanvasContext(canvasName)
    this.setData({
      ctx: ctx
    })
    var query = wx.createSelectorQuery();
    query.select('.handCenter').boundingClientRect(rect => {
      this.setData({
        canvasWidth: rect.width,
        canvasHeight: rect.height
      })
    }).exec();
    this.gettimu()
  },

  subCanvas(){
    // 新增我的
    let that = this
    let ctx = that.data.ctx;
    console.log(ctx)
    if(ctx.subpath==''){
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
    }else{
 this.setData({
      isClick:false     //在点击一次后，点击状态变为关闭，默认为开启
    })
    setTimeout(()=>{    //定义一个延时操作setTimeout
      this.setData({
        isClick:true
      })
    },10000)
    wx.showLoading({
      title: '正在计算分数',
      mask:true
    })
    ctx.draw(true,setTimeout(function(){  //我的新增定时器及回调
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375,
        height: 152,
        canvasId: 'handWriting',
        fileType: 'png',
        success:(res)=>{
          that.setData({
            tmpPath:res.tempFilePath
          })
       console.log(that.data.tmpPath,'看下是个啥玩意')
       
         wx.uploadFile({
           url: app.globalData.url+'api/upload/importImg',
           method:'POST',
           name: 'file',
           filePath:that.data.tmpPath,
           formData: null,
          header: {
             'content-type': 'multipart/form-data'
                    },
           success:(res)=>{
           console.log(res)
            console.log(that.data.answerSelected)
              if(JSON.parse(res.data).code==0){
                console.log(JSON.parse(res.data).code,wx.getStorageSync('parperid'))
                wx.request({
                  url: app.globalData.url+'api/paperuser/getinfo',
                method:'POST',
                 data:{
                   paperid:wx.getStorageSync('parperid'),
                    userid:that.data.userid,
                    data:that.data.answerSelected,
                    test:1,
                    path:JSON.parse(res.data).data
                 },
                  success:(res)=>{
                  console.log(res)
                  if(res.data.code==0){
                    //console.log(JSON.parse(JSON.stringify(res.data.data)).score)
                    //console.log(JSON.parse(JSON.stringify(res.data.data)).qualified)

                    wx.setStorageSync('datas', '')
                  
                      
                      setTimeout(()=>{
                        wx.hideLoading()
                        wx.redirectTo({
                          url: '/pages/result/result?score='+JSON.parse(JSON.stringify(res.data.data)).score+ "&qualified=" + JSON.parse(JSON.stringify(res.data.data)).qualified,
                        })
                      },2000)
                  }else if(res.data.code==-1){
                    console.log('1111')
                    wx.hideLoading()
 
                      wx.showToast({
                        title:res.data.msg,
                        icon:'none'
                      })
                       setTimeout(()=>{
                          this.setData({
                            show:false,
                          })
                       },1000)
                  }
                  
                }
               })
              }
           }
         })
        }
      }, ctx)
  },1000))
    }
   
  },
//弹出框隐藏
close(){
  this.setData({
    show:false
  })
},
  retDraw () {
    this.data.ctx.clearRect(0, 0, 700, 730)
    this.data.ctx.subpath=''
    this.data.ctx.draw()
    this.setData({
      tmpPath:''
    })
  },
  

  //画两点之间的线条；参数为:line，会绘制最近的开始的两个点；
  pointToLine (line) {
    this.calcBethelLine(line);
    return;
  },
  //计算插值的方式；
  calcBethelLine (line) {
    if (line.length <= 1) {
      line[0].r = this.data.radius;
      return;
    }
    let x0, x1, x2, y0, y1, y2, r0, r1, r2, len, lastRadius, dis = 0, time = 0, curveValue = 0.5;
    if (line.length <= 2) {
      x0 = line[1].x
      y0 = line[1].y
      x2 = line[1].x + (line[0].x - line[1].x) * curveValue;
      y2 = line[1].y + (line[0].y - line[1].y) * curveValue;
      //x2 = line[1].x;
      //y2 = line[1].y;
      x1 = x0 + (x2 - x0) * curveValue;
      y1 = y0 + (y2 - y0) * curveValue;;

    } else {
      x0 = line[2].x + (line[1].x - line[2].x) * curveValue;
      y0 = line[2].y + (line[1].y - line[2].y) * curveValue;
      x1 = line[1].x;
      y1 = line[1].y;
      x2 = x1 + (line[0].x - x1) * curveValue;
      y2 = y1 + (line[0].y - y1) * curveValue;
    }
    //从计算公式看，三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
    len = this.distance({ x: x2, y: y2 }, { x: x0, y: y0 });
    lastRadius = this.data.radius;
    for (let n = 0; n < line.length - 1; n++) {
      dis += line[n].dis;
      time += line[n].time - line[n + 1].time;
      if (dis > this.data.smoothness) break;
    }
    this.setData({
      radius: Math.min(time / len * this.data.pressure + this.data.lineMin, this.data.lineMax) * this.data.lineSize
    });
    line[0].r = this.data.radius;
    //计算笔迹半径；
    if (line.length <= 2) {
      r0 = (lastRadius + this.data.radius) / 2;
      r1 = r0;
      r2 = r1;
      //return;
    } else {
      r0 = (line[2].r + line[1].r) / 2;
      r1 = line[1].r;
      r2 = (line[1].r + line[0].r) / 2;
    }
    let n = 5;
    let point = [];
    for (let i = 0; i < n; i++) {
      let t = i / (n - 1);
      let x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2;
      let y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2;
      let r = lastRadius + (this.data.radius - lastRadius) / n * i;
      point.push({ x: x, y: y, r: r });
      if (point.length == 3) {
        let a = this.ctaCalc(point[0].x, point[0].y, point[0].r, point[1].x, point[1].y, point[1].r, point[2].x, point[2].y, point[2].r);
        a[0].color = this.data.lineColor;
        // let bethelPoint = this.data.bethelPoint;
        // console.log(a)
        // console.log(this.data.bethelPoint)
        // bethelPoint = bethelPoint.push(a);
        this.bethelDraw(a, 1);
        point = [{ x: x, y: y, r: r }];
      }
    }
    this.setData({
      currentLine: line
    })
  },
  //求两点之间距离
  distance (a, b) {
    let x = b.x - a.x;
    let y = b.y - a.y;
    return Math.sqrt(x * x + y * y);
  },
  ctaCalc (x0, y0, r0, x1, y1, r1, x2, y2, r2) {
    let a = [], vx01, vy01, norm, n_x0, n_y0, vx21, vy21, n_x2, n_y2;
    vx01 = x1 - x0;
    vy01 = y1 - y0;
    norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2;
    vx01 = vx01 / norm * r0;
    vy01 = vy01 / norm * r0;
    n_x0 = vy01;
    n_y0 = -vx01;
    vx21 = x1 - x2;
    vy21 = y1 - y2;
    norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2;
    vx21 = vx21 / norm * r2;
    vy21 = vy21 / norm * r2;
    n_x2 = -vy21;
    n_y2 = vx21;
    a.push({ mx: x0 + n_x0, my: y0 + n_y0, color: "#1A1A1A" });
    a.push({ c1x: x1 + n_x0, c1y: y1 + n_y0, c2x: x1 + n_x2, c2y: y1 + n_y2, ex: x2 + n_x2, ey: y2 + n_y2 });
    a.push({ c1x: x2 + n_x2 - vx21, c1y: y2 + n_y2 - vy21, c2x: x2 - n_x2 - vx21, c2y: y2 - n_y2 - vy21, ex: x2 - n_x2, ey: y2 - n_y2 });
    a.push({ c1x: x1 - n_x2, c1y: y1 - n_y2, c2x: x1 - n_x0, c2y: y1 - n_y0, ex: x0 - n_x0, ey: y0 - n_y0 });
    a.push({ c1x: x0 - n_x0 - vx01, c1y: y0 - n_y0 - vy01, c2x: x0 + n_x0 - vx01, c2y: y0 + n_y0 - vy01, ex: x0 + n_x0, ey: y0 + n_y0 });
    a[0].mx = a[0].mx.toFixed(1);
    a[0].mx = parseFloat(a[0].mx);
    a[0].my = a[0].my.toFixed(1);
    a[0].my = parseFloat(a[0].my);
    for (let i = 1; i < a.length; i++) {
      a[i].c1x = a[i].c1x.toFixed(1);
      a[i].c1x = parseFloat(a[i].c1x);
      a[i].c1y = a[i].c1y.toFixed(1);
      a[i].c1y = parseFloat(a[i].c1y);
      a[i].c2x = a[i].c2x.toFixed(1);
      a[i].c2x = parseFloat(a[i].c2x);
      a[i].c2y = a[i].c2y.toFixed(1);
      a[i].c2y = parseFloat(a[i].c2y);
      a[i].ex = a[i].ex.toFixed(1);
      a[i].ex = parseFloat(a[i].ex);
      a[i].ey = a[i].ey.toFixed(1);
      a[i].ey = parseFloat(a[i].ey);
    }
    return a;
  },
  bethelDraw (point, is_fill, color) {
    // 新增我的
    let that = this
    let ctx = this.data.ctx;
    ctx.beginPath();
    ctx.moveTo(point[0].mx, point[0].my);
    if (undefined != color) {
      ctx.setFillStyle(color);
      ctx.setStrokeStyle(color);
    } else {
      ctx.setFillStyle(point[0].color);
      ctx.setStrokeStyle(point[0].color);
    }
    for (let i = 1; i < point.length; i++) {
      ctx.bezierCurveTo(point[i].c1x, point[i].c1y, point[i].c2x, point[i].c2y, point[i].ex, point[i].ey);
    }
    ctx.stroke();
    if (undefined != is_fill) {
      ctx.fill(); //填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
    }
    ctx.draw(true)
  },
  selectColorEvent (event) {
   // console.log(event)
    var color = event.currentTarget.dataset.colorValue;
    var colorSelected = event.currentTarget.dataset.color;
    this.setData({
      selectColor: colorSelected,
      lineColor: color
    })
  }
})