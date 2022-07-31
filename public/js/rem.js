const remSize = () => {
  // 获取视窗宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  // 检测视窗宽度并设置最大值与最小值
  if(deviceWidth >= 750){
    deviceWidth = 750;
  }
  if(deviceWidth <= 320){
    deviceWidth = 320;
  }
  // 设计稿750px，那么1rem = 100px
  // 设计稿375px，那么1rem = 50px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
  // 设置字体大小
  document.querySelector('body').style.fontSize = 0.3 + 'rem';
}

remSize()
window.onresize = function (){
  remSize()
}