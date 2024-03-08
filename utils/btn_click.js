//点击防重
let isClick=false;
let preventDuplicateClicks=function(){
  if (!isClick) {
    isClick=true    
    setTimeout(function () {
      isClick = false
    }, 5000);
    return false;
  } else {
    return true;
  }
}
module.exports = {
  preventDuplicateClicks: preventDuplicateClicks
}