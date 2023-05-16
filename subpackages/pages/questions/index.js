const app = getApp();



Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    parperid:'',
    userid:'',
  },

  
  onShow(){
  },
  getsubject(){
    wx.request({
      url:app.globalData.url+'api/user/getBeforeTest',
      method:'POST',
      data:{
           userid:this.data.userid,
           pattern:this.data.pattern,
           examlevel:this.data.examlevel
      },
      success:(res)=>{
        console.log(res)
      if(res.data.code==0){
        res.data.data.forEach(item=>{
          item.options= item.options.split('^')
          })
         // console.log(res.data.data)
          this.setData({
            questionList:res.data.data
          })
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
    
  },
  blurs(e){
    this.setData({
      values:''
    })
  },
  // 下一题/提交 按钮
  nextSubmit(){
console.log(this.data.chooseValue)
    // 如果没有选择
    if (this.data.chooseValue[this.data.index] == undefined || this.data.chooseValue[this.data.index].length == 0) {  
      return wx.showToast({
        title: '请选择答案!',
        icon: 'none'
      })
    }

    // // 判断所选择的选项是否为正确答案
    // this.chooseJudge();

    // // 判断是不是最后一题
    this.lastJudge();
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
    wx.request({
      url:app.globalData.url+'api/user/getBeforeTest',
      method:'POST',
      data:{
           userid:this.data.userid,
           pattern:this.data.pattern,
           examlevel:this.data.examlevel,
           data:this.data.chooseValue
      },
      success:(res)=>{
        console.log(res.data.code)
        if(res.data.code==0){
          wx.showModal({
            title:'提示',
            content:res.data.msg,
            showCancel:false,
            confirmText: "确定",
            confirmColor: "#576B95",
            success:(res)=>{
              wx.switchTab({
                url: '../../../pages/information/information',
              })
            }
          })
        }
      }
    })
    //console.log(this.data.chooseValue,'console.log(this.data.chooseValue)')
    wx.setStorageSync('datas',this.data.chooseValue)
     this.setData({
       show:true
     })
     this.setData({
      btns:false
     })
    
  },
  bc(){
    console.log(this.data.chooseValue)
    wx.request({
      url:app.globalData.url+'api/user/getBeforeTest',
      method:'POST',
      data:{
           userid:this.data.userid,
           pattern:this.data.pattern,
           examlevel:this.data.examlevel,
           data:this.data.chooseValue
      },
      success:(res)=>{
        console.log(res.data.code)
        if(res.data.code==0){
          wx.showModal({
            title:'提示',
            content:res.data.msg,
            showCancel:false,
            confirmText: "确定",
            confirmColor: "#576B95",
            success:(res)=>{
              wx.switchTab({
                url: '../../../pages/information/information',
              })
            }
          })
        }
      }
    })
  },
  onLoad (options) {
     console.log(options)
    this.setData({
      userid:wx.getStorageSync('userid'),
      pattern:options.pattern,
      examlevel:options.examlevel
    })
    this.getsubject()
  },
})