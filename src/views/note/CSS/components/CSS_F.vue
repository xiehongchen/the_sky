<template>
  <a href="https://juejin.cn/post/7246917539766304829#heading-0">掘金地址</a>
  <span style="margin-left: 20px; color: red">看不懂</span>
  <div ref="btn" class="div" @click="toggleClass"></div>
  <div class="moon"></div>
</template>

<script setup lang="ts">
const btn = ref<HTMLElement | null>()
const toggleClass = () => {
  if (btn.value) {
    btn.value.classList.toggle('active')
  }
}
</script>

<style lang="scss" scoped>
.div {
  position: relative;
  width: 220px;
  height: 90px;
  /**
  这个 CSS 样式代码是用来创建一种背景效果，通常用于装饰或美化元素的背景。让我为你解释一下这些代码的作用：
    这一段是用多个径向渐变（radial-gradient）来创建一系列的白色光斑效果，仿佛是光照射到表面上产生的高光。每个径向渐变都以不同的位置和尺寸来生成白色光斑，以及透明区域来模拟高光的形状。这些径向渐变被叠加在一起，用逗号分隔，以创建一个整体的背景效果。
    最后一段是一个线性渐变（linear-gradient），用来创建水平渐变背景。从左到右，它的颜色会从 #2b303e 渐变到 #5a81b4。这个线性渐变在中间有一个颜色分割点，形成了一种阶梯状的背景效果。
    综合起来，这段代码创建了一种光斑和渐变相结合的背景效果，可以用来美化元素的背景，如卡片、容器等。具体应用可以根据设计需要进行调整和使用。
   */
  /**
  radial-gradient:
    circle: 这是渐变的形状，指定为圆形。你也可以使用其他形状，比如 ellipse 表示椭圆。
    at 18% 20px: 这定义了渐变的位置。at 表示在哪个位置创建渐变，后面跟着百分比和像素值，分别表示渐变的水平位置和垂直位置。在这个例子中，渐变被放置在元素宽度的18%和20像素的位置。
    #fff: 这是渐变的起始颜色，表示从中心开始的白色。
    #fff 6px: 这是在距离中心6像素的位置的颜色，也是白色。这样在渐变的开始部分，颜色从中心开始向外辐射6像素都是白色。
    transparent 7px: 这是一个透明色，在距离中心7像素的位置。这使得在颜色从白色渐变到透明，模拟高光的效果。
    transparent: 最终位置的颜色，完全透明，使渐变结束处透明。
   */
  /**
  linear-gradient:
    90deg: 这是渐变的角度，表示渐变是沿着水平方向的。90deg 表示从左到右的水平渐变。
    #2b303e: 这是渐变的起始颜色，表示渐变的起始点的颜色，即左侧的颜色。
    #2b303e 50%: 这是指定在渐变的50%位置的颜色，也就是从渐变的左侧到达一半位置的颜色，依然是 #2b303e，这实际上没有颜色变化。
    #5a81b4 50%: 这是在渐变的50%位置指定的另一个颜色，即从渐变的一半位置到渐变的右侧的颜色，这个颜色是 #5a81b4。
    #5a81b4: 这是渐变的结束颜色，表示从渐变的右侧开始的颜色，即最右侧的颜色。
    综合起来，这个线性渐变在水平方向上从左到右创建了一个渐变效果，从 #2b303e 开始，经过渐变的一半位置时保持为 #2b303e，然后在渐变的另一半位置变为 #5a81b4，最终到达右侧的 #5a81b4。这种渐变创建了一个阶梯状的背景效果，通过两种颜色的交替来实现。
   */
  background: radial-gradient(
      circle at 18% 20px,
      #fff,
      #fff 6px,
      transparent 7px,
      transparent
    ),
    radial-gradient(
      circle at 35% 45px,
      #fff,
      #fff 1px,
      transparent 2px,
      transparent
    ),
    radial-gradient(
      circle at 10% 70px,
      #fff,
      #fff 2.5px,
      transparent 3.5px,
      transparent
    ),
    radial-gradient(
      circle at 25% 15px,
      #fff,
      #fff 3px,
      transparent 4px,
      transparent
    ),
    radial-gradient(
      circle at 15% 50px,
      #fff,
      #fff 1.5px,
      transparent 2.5px,
      transparent
    ),
    radial-gradient(
      circle at 30% 75px,
      #fff,
      #fff 5px,
      transparent 6px,
      transparent
    ),
    radial-gradient(
      circle at 5% 30px,
      #fff,
      #fff 0.5px,
      transparent 1.5px,
      transparent
    ),
    radial-gradient(
      circle at 25% 60px,
      #fff,
      #fff 0.5px,
      transparent 1.5px,
      transparent
    ),
    radial-gradient(
      circle at 7% 35px,
      #fff,
      #fff 0.5px,
      transparent 1.5px,
      transparent
    ),
    linear-gradient(90deg, #2b303e, #2b303e 50%, #5a81b4 50%, #5a81b4);
  // 这个属性用于控制背景图像是否重复显示。设置为 no-repeat 表示背景图像不会在元素内重复显示，而只会显示一次。
  background-repeat: no-repeat;
  // 这个属性用于控制背景图像的尺寸。设置为 200% 100% 表示背景图像的宽度会被放大到原始图像宽度的两倍，而高度保持不变。
  background-size: 200% 100%;
  // 这个属性用于控制背景图像在元素内的位置。设置为 100% 0 表示背景图像将会在元素的右上角对齐，水平方向上紧贴元素右边缘，垂直方向上紧贴元素上边缘。
  background-position: 100% 0;
  border-radius: 90px;
  /**
  这个属性用于在元素周围创建阴影效果。它支持多个参数，每个参数都表示一个不同的阴影。在这个例子中，共有四个阴影参数：
    0 -3px 4px #999: 这个阴影位于元素的上部，垂直偏移为 -3px，水平偏移为 0，模糊半径为 4px，颜色为 #999。
    inset 0 3px 5px #333: 这个阴影是一个内阴影，位于元素内部，垂直偏移为 3px，水平偏移为 0，模糊半径为 5px，颜色为 #333。
    0 4px 4px #ffe: 这个阴影位于元素的底部，垂直偏移为 4px，水平偏移为 0，模糊半径为 4px，颜色为 #ffe。
    inset 0 -3px 5px #ddd: 这个阴影是一个内阴影，位于元素内部，垂直偏移为 -3px，水平偏移为 0，模糊半径为 5px，颜色为 #ddd。 
  */
  box-shadow: 0 -3px 4px #999, inset 0 3px 5px #333, 0 4px 4px #ffe,
    inset 0 -3px 5px #ddd;
  cursor: pointer;
  overflow: hidden;
  transition: 0.5s all;
  &::before,
  &::after {
    content: '';
    position: absolute;
    transition: 0.5s all;
  }
  // 太阳
  &::before {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: #e9cb50;
    inset: 7.5px;
    box-shadow: 0 0 5px #333, inset 2px 2px 3px #f8f4e4,
      inset -2px -2px 3px #665613;
    z-index: 1;
  }
  //  图案
  &::after {
    width: 70px;
    height: 70px;
    inset: 10px;
    border-radius: 50%;
    /**
      水平偏移（Horizontal Offset）： 这是阴影相对于元素的水平位置。在你的例子中，水平偏移为 10px，表示阴影相对于元素右侧移动了 10px。
      垂直偏移（Vertical Offset）： 这是阴影相对于元素的垂直位置。在你的例子中，垂直偏移为 0px，表示阴影在垂直方向上不发生偏移。
      模糊半径（Blur Radius）： 这是阴影的模糊半径，可以使阴影看起来更加柔和。在你的例子中，模糊半径为 0，表示阴影没有模糊效果。
      扩展半径（Spread Radius）： 这是一个用于扩展或收缩阴影的值。在你的例子中，扩展半径为 10px，表示阴影会向外扩展 10px。
      颜色（Color）： 这是阴影的颜色。在你的例子中，阴影颜色为 #fff，表示阴影颜色为白色。
    */
    box-shadow: 10px 60px 0 10px #fff, 65px 60px 0 5px #fff,
      95px 70px 0 10px #fff, 135px 45px 0 5px #fff, 170px 35px 0 10px #fff,
      195px -5px 0 10px #fff, -10px 0 0 50px rgba(255, 255, 255, 0.2),
      15px 0 0 50px rgba(255, 255, 255, 0.15),
      40px 0 0 50px rgba(255, 255, 255, 0.21), 10px 40px 0 10px #abc1d9,
      70px 35px 0 10px #abc1d9, 95px 40px 0 10px #abc1d9,
      135px 20px 0 10px #abc1d9, 155px 15px 0 10px #abc1d9,
      190px -20px 0 10px #abc1d9;
  }
}
.div:hover::before {
  // contrast(90%): 这个滤镜效果用于调整图像的对比度。值为 90% 表示对比度降低了，图像可能会变得稍微暗淡。
  // brightness(110%): 这个滤镜效果用于调整图像的亮度。值为 110% 表示图像的亮度会稍微增加。
  filter: contrast(90%) brightness(110%);
  scale: 1.05;
}
.active {
  background-position: 0 0;

  // 月亮
  &::before {
    translate: 130px;
    background: radial-gradient(
        circle at 50% 20px,
        #939aa5,
        #939aa5 6.5px,
        transparent 7px,
        transparent
      ),
      radial-gradient(
        circle at 35% 45px,
        #939aa5,
        #939aa5 11.5px,
        transparent 12px,
        transparent
      ),
      radial-gradient(
        circle at 72% 50px,
        #939aa5,
        #939aa5 8.5px,
        transparent 9px,
        transparent
      ),
      radial-gradient(#cbcdda, #cbcdda);
  }
  &::after {
    transform: translate(130px);
    box-shadow: 10px 60px 0 10px transparent, 65px 60px 0 5px transparent,
      95px 70px 0 10px transparent, 135px 45px 0 5px transparent,
      170px 35px 0 10px transparent, 195px -5px 0 10px transparent,
      10px 0 0 50px rgba(255, 255, 255, 0.2),
      -15px 0 0 50px rgba(255, 255, 255, 0.15),
      -40px 0 0 50px rgba(255, 255, 255, 0.21), 10px 40px 0 10px transparent,
      70px 35px 0 10px transparent, 95px 40px 0 10px transparent,
      135px 20px 0 10px transparent, 155px 15px 0 10px transparent,
      190px -20px 0 10px transparent;
  }
}
.moon {
  margin: 20px;
  position: relative;
  height: 100px;
  width: 100px;
  background-color: #fff;
  z-index: 2;
  border-radius: 50%;
  box-shadow: 30px 0px 0 10px #95989f;
  // transform: rotate(40deg);
  position: relative;
  &::before {
    content: '';
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
    background: radial-gradient(
      circle at 80% 20px,
      red,
      red 6px,
      transparent 7px,
      transparent
    );
  }
}
</style>
