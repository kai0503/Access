const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:'',
    answer:'',
    nextshow:true,
    nextshows:false,
    showanswer:false,
    parperid:'',
    userid:'',
    btns:true,
    show:false,
    values:' ',
    questionList:[],
    index: 0,
    chooseValue: [],
    totalScore: 0,
    wrong: 0,
    wrongList: [],
    wrongListSort: [],
    type:'',
  },


  onShow(){
  },
  getsubject(){
    wx.request({
      url:app.globalData.url+'api/user/getErrorTitle',
      method:'POST',
      data:{
        type:this.data.type,
        userid:wx.getStorageSync('userid')
      },
      success:(res)=>{
        if(res.data.code==0){
        let  reg=RegExp(/jpg|png/)
        res.data.data.forEach(item=>{
          
           if(item.options!=null){
            if(reg.test(item.questionstem)){
              item.options= item.options.replaceAll('{',app.globalData.url.concat('tm/')).replaceAll('}','').split('^')
              const lastIndexOfSpace =item.questionstem.replace('{',app.globalData.url.concat('tm/')).replace('}','').indexOf('h');
              item['url']=item.questionstem.replace('{',app.globalData.url.concat('tm/')).replace('}','').substring(lastIndexOfSpace);
             const lastWord = item.questionstem.substring(0,lastIndexOfSpace);
              item.questionstem=lastWord
              item['bs']=true
              
             }else{
              item.options= item.options.split('^')
              item['bs']=false
             }
           }
          })
          //console.log(res.data.data)
          this.setData({
            questionList:res.data.data
          })
          console.log(this.data.questionList)
        }
      }
    })
  },
  // 选中选项事件
  radioChange(e){
    //console.log(e)
    let s1=e.detail.value.toString()
    this.data.chooseValue[this.data.index] =s1
    //console.log(this.data.chooseValue[this.data.index])
     this.setData({
       answer:this.data.chooseValue[this.data.index]
     })
   
  },
  blurs(e){
    console.log(e)
    let s1=e.detail.value.toString().trim()
     this.data.chooseValue[this.data.index] =s1
    //console.log(this.data.chooseValue[this.data.index])
    //  this.setData({
    //    answer:this.data.chooseValue[this.data.index]
    //  })
    if(this.changeNum(this.data.chooseValue[this.data.index])!=this.data.questionList[this.data.index].answer){
      console.log('111')
      this.setData({
        values:e.detail.value.toString().trim(),
        answer:e.detail.value.toString().trim()
      })
    }else{
      console.log('222')
      // this.setData({
      //   values:''
      // })
    }
   
  },
  sortChange(a, b) {
    return a - b;
},
  // 下一题/提交 按钮
  nextSubmit(){
// console.log(this.data.chooseValue)
// console.log(this.data.index)
let arr=this.data.chooseValue[this.data.index].trim().split(',')
let arrs=arr.sort(this.sortChange).toString()
this.data.chooseValue[this.data.index]=arrs
//console.log(this.data.questionList[this.data.index].answer.trim())
//console.log(this.data.chooseValue[this.data.index].trim())
//console.log(this.data.questionList[this.data.index].type)
//console.log(this.data.questionList[this.data.index].answer.trim())
//console.log(this.data.questionList[this.data.index].type)
this.setData({
  answer:this.changeNum(this.data.chooseValue[this.data.index])
})
    // 如果没有选择
    if (this.data.chooseValue[this.data.index] == undefined || this.data.chooseValue[this.data.index].length == 0) {  
      return wx.showToast({
        title: '请选择答案!',
        icon: 'none'
      })
    }else if(this.changeNum(this.data.chooseValue[this.data.index])==this.data.questionList[this.data.index].answer&&this.data.questionList[this.data.index].pattern!=3){
      this.lastJudge();
    }else if(this.data.questionList[this.data.index].answer.trim()==this.data.chooseValue[this.data.index].trim()&&this.data.questionList[this.data.index].pattern==3){
      this.setData({
        values:''
      })
      this.lastJudge();
      
    }else{
     this.setData({
      showanswer:true,
      disabled:true,
      nextshow:false,
      nextshows:true,
      answer:this.data.chooseValue[this.data.index]
     })
    }

    // // 判断所选择的选项是否为正确答案
    // this.chooseJudge();

    // // 判断是不是最后一题

  },
  
 // 下一题/提交 按钮
 nextSubmits(){
   this.setData({
    disabled:false,
     showanswer:false,
    nextshow:true,
    nextshows:false,
    values:'',
   })
      // 如果没有选择
      if (this.data.chooseValue[this.data.index] == undefined || this.data.chooseValue[this.data.index].length == 0) {  
        return wx.showToast({
          title: '请选择答案!',
          icon: 'none'
        })
      }else{
     
      }
  
      // // 判断所选择的选项是否为正确答案
      // this.chooseJudge();
  
      // // 判断是不是最后一题
      this.lastJudge();
    },
    nextSubmitss(){
this.lastJudge()
    },
 changeNum(option){
   var answer =  option.split(',');
   var answers="";
   if(answer.length>0){
    answer.forEach(item=>{
       switch (item){
        case '0':
          answers+="A,";
          break;
          case '1':
            answers+="B,";
            break;
            case '2':
              answers+="C,";
              break;
              case '3':
                answers+="D,";
              break;
       }
     })
   }
   return answers.substr(0,answers.length-1);
 },

  // 判断所选择的选项是否为正确答案
  chooseJudge(){
    var trueValue = this.data.questionList[this.data.index]['true'];
    var chooseVal = this.data.chooseValue[this.data.index];
    if (chooseVal.toString() != trueValue.toString()) {
      // 答错则记录错题
      this.data.wrong++;
      this.data.wrongListSort.push(this.data.index);
      this.data.wrongList.push(this.data.questionList[this.data.index]._id);
    }else{
      // 答对则累计总分
      this.setData({
        totalScore: this.data.totalScore + 5
      })
    }
  },

  // 判断是不是最后一题
  lastJudge(){
    if (this.data.index < this.data.questionList.length - 1) {
      // 如果不是最后一题，则切换下一题
      let index = this.data.index + 1;    
      this.setData({
        index
      })
    } else {
      // 如果是最后一题，则提交答卷
      this.addExamRecord()
    }
  },

  // 提交答卷
  addExamRecord(){

    console.log(this.data.chooseValue,'console.log(this.data.chooseValue)')
    wx.setStorageSync('datas',this.data.chooseValue)
     this.setData({
       show:true,
       nextshow:false,
      nextshows:false
     })
    wx.showLoading({
      title: '提交答卷中'
    });
      wx.request({
        url: app.globalData.url+'api/user/getErrorTitle',
        method:'POST',
        data:{
          type:this.data.type,
          userid:this.data.userid,
          data:this.data.chooseValue,
        },
        success:(res)=>{
         console.log(res)
         if(res.data.code==0){
           wx.switchTab({
             url: '../information/information',
           })
         }
        }
      })
    setTimeout(()=>{
      wx.hideLoading();
    },1000)
    // })
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
  onLoad (options) {
    console.log(options.type)
    this.setData({
      type:options.type,
      userid:wx.getStorageSync('userid')
    })
    // 获取题库-函数执行
  this.getsubject()
    let canvasName = this.data.canvasName
    let ctx = wx.createCanvasContext(canvasName)
    this.setData({
      ctx: ctx
    })
    var query = wx.createSelectorQuery();
    query.select('.handCenter').boundingClientRect(rect => {
      // this.setData({
      //   canvasWidth: rect.width,
      //   canvasHeight: rect.height
      // })
    }).exec();
  },

  subCanvas(){
    // 新增我的
    let that = this
    let ctx = this.data.ctx;
    if(ctx.subpath==''){
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
    }
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
      //    console.log(that.data.tmpPath,'看下是个啥玩意')

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
          // console.log(res)
           //  console.log(wx.getStorageSync('datas'))
              if(JSON.parse(res.data).code==0){
                wx.request({
                  url: app.globalData.url+'api/paperuser/getinfo',
                method:'POST',
                 data:{
                  paperid:this.data.parperid,
                    userid:this.data.userid,
                    data:wx.getStorageSync('datas'),
                    path:JSON.parse(res.data).data
                 },
                  success:(res)=>{
                 // console.log(res.data.code)
                  if(res.data.code==0){
                   // console.log(JSON.parse(JSON.stringify(res.data.data)).score)
                   // console.log(JSON.parse(JSON.stringify(res.data.data)).qualified)
                    wx.setStorageSync('datas', '')
                    wx.showLoading({
                      title: '正在计算分数',
                      mask:true
                    })
                      
                      setTimeout(()=>{
                        wx.hideLoading()
                        wx.redirectTo({
                          url: '/pages/result/result?score='+JSON.parse(JSON.stringify(res.data.data)).score+ "&qualified=" + JSON.parse(JSON.stringify(res.data.data)).qualified,
                        })
                      },2000)
                  }else{
                    wx.showModal({
                      cancelColor: '网络错误',
                    })
                  }
                }
               })
              }
           }
         })
        }
      }, ctx)
  },1000))
  },


//弹出框隐藏
close(){
  this.setData({
    show:false
  })
},
})