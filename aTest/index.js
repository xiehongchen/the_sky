function $(selector) {
  return document.querySelector(selector);
}

// 初始化

var curIndex = 0; // 当前显示的是第几张图片
var doms = {
  container: $('.carousel-container'),
  carouselList: $('.carousel-list'),
  indicator: $('.indicator'),
  arrowLeft: $('.arrow-left'),
  arrowRight: $('.arrow-right'),
};
var containerWidth = doms.container.clientWidth; // 容器可见区域的宽度
var urls = [
  '../img/1.jpg',
  '../img/2.jpg',
  '../img/3.jpg',
  '../img/4.png',
  '../img/5.jpg',
  '../img/6.jpg',
]; //记录了要显示的所有轮播图的图片路径

function init() {
  function _img(url) {
      const img = document.createElement('img')
      img.src = url
      img.className = "carousel-item"
      doms.carouselList.appendChild(img)
  }
  for (var i = 0; i < urls.length; i++) {
      _img(urls[i])
      //  创建指示器
      var div = document.createElement('div');
      div.className = 'indicator-item';
      doms.indicator.appendChild(div);
  }
  _img(urls[0])
  // 重新设置容器宽度
  doms.carouselList.style.width = doms.carouselList.children.length + '00%';
  setActive()
}
init()

//  设置激活样式

function setActive() {
  /**
   * 根据curIndex来做判断
   * 1取消已经激活的样式
   * 2设置当前激活样式
   */
  //取消
  var active = $(".indicator-item.active")
  if (active) {
      active.className = "indicator-item"
  }
  //   // 2. 激活当前的指示器
  var index = curIndex;
  if (index > urls.length - 1) {
      index = 0;
  }

  // 这里对多加入的那一张图片进行的指示器样式的处理，以本项目为例
  //有7张图片，当图片进行<=6的时候没有问题，当进行第七章的时候，指示器只有六个，无法激活第七个样式
  //所以用这种办法，1%7=1，2%7=2 .......当进行到7的时候 7%7=0就又会重新激活第一个指示器
  var index = curIndex % urls.length;
  doms.indicator.children[index].className = 'indicator-item active';
}


//  交互
var totalMS = 300;
var isPlaying = false; // 是否有正在进行的切换动画
/**
* 将轮播图从当前的位置，切换到newIndex位置
* @param {*} newIndex 新的位置的图片索引
* @param time 所需要的变换时间
*/
function moveTo(newIndex, onend) {
  if (isPlaying || newIndex === curIndex) {
      return; // 有动画进行 或 切换目标和当前一致，不做任何事情不然如果从第一张切换到第一张虽然没有变化
      //但是仍然会进行处理
  }
  isPlaying = true;
  //    获取margin值并且转换为浮点数类型
  var from = parseFloat(doms.carouselList.style.marginLeft) || 0;
  //  算出下一个图片的margi值
  var to = -newIndex * containerWidth;
  createAnimation({
      from: from,
      to: to,
      totalMS: totalMS,
      onmove: function (n) {
          //切换图片函数
          doms.carouselList.style.marginLeft = n + 'px';
      },
      onend: function () {
          isPlaying = false;
          //动画完成后调用这个onend函数
          onend && onend();
      },
  });
  curIndex = newIndex;
  // 更改当前显示的图片索引
  setActive()
}

//注册点击事件
for (let i = 0; i < doms.indicator.children.length; i++) {
  doms.indicator.children[i].onclick = function () {
      console.log("chufa")
      moveTo(i);
  }
}

function next() {
  // 切换到下一张
  var newIndex = curIndex + 1
  var onend;
  if (newIndex === doms.carouselList.children.length - 1) {
      // 切换到最后一张图片了
      // 等动画完成后，要回到第一张图片
      onend = function () {
          doms.carouselList.style.marginLeft = 0;
          curIndex = 0;
      };
  }
  moveTo(newIndex, onend);
}

function prev() {
  // 切换到上一张图
  var newIndex = curIndex - 1;
  if (newIndex < 0) {
      // 当进行到小于0的时候跳转到倒数第二张
      var maxIndex = doms.carouselList.children.length - 1;
      //   计算出来倒数第二张的margin值，并且设置
      doms.carouselList.style.marginLeft = -maxIndex * containerWidth + 'px';
      //   将新的页码设置为倒数第二张的页码
      newIndex = maxIndex - 1;
  }
  // 跳转到
  moveTo(newIndex);
}
// 注册左右点击按钮
doms.arrowLeft.onclick = debounce(prev,200) ;
doms.arrowRight.onclick = debounce(next,200);

var duration = 2000; // 自动切换的间隔
var timerId;

function autoStart() {
  if (timerId) {
      // 已经有自动切换在进行了
      return;
  }
  timerId = setInterval(next, duration);
}

function autoStop() {
  clearInterval(timerId);
  timerId = null;
}


autoStart(); // 最开始自动切换
//当鼠标移入时停止自动切换，移除时加入自动切换
doms.container.onmouseenter = autoStop;
doms.container.onmouseleave = autoStart;