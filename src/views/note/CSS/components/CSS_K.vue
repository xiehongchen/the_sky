<template>
  <div class="box">
    <div class="item">
      <img src="../../../../assets/css/scenery1.jpg" />
      <img src="../../../../assets/css/scenery2.jpg" />
      <img src="../../../../assets/css/scenery3.jpg" />
      <img src="../../../../assets/css/scenery4.jpg" />
      <img src="../../../../assets/css/scenery5.jpg" />
      <img src="../../../../assets/css/scenery6.jpg" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .item {
    display: grid;
    gap: 10px;
    // 它表示有三列，第一列和第三列的宽度将自动调整以适应内容，而第二列的宽度被设置为0，因此它会占据网格中的一定空间
    grid-template-columns: auto 0 auto;
    // 这是用来将网格容器内的子元素垂直和水平居中。它是align-items和justify-items属性的简写
    place-items: center;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 300px;
      // 用于设置元素的宽高比。在这里，它被设置为1，表示元素的宽高比是1:1，因此元素将是一个正方形
      aspect-ratio: 1;
      // 表示元素内容会被拉伸或缩放，以填充整个元素框，保持宽高比并且可能会被裁剪，以便填满整个框
      object-fit: cover;
      transition: 0.35s;
      // 将图像内容转为完全灰度，即黑白效果
      filter: grayscale(1);
      cursor: pointer;

      // clip-path: polygon(0 0, 50% 0, 100% 100%, 0 100%);：这是 clip-path 属性的值，使用 polygon 函数定义一个多边形形状。
      // polygon(0 0, 50% 0, 100% 100%, 0 100%);：这是 polygon 函数的参数，它定义了多边形的各个顶点坐标。具体来说：
      // (0 0) 表示多边形的第一个顶点，位于左上角。
      // (50% 0) 表示多边形的第二个顶点，位于水平中点的上边界。
      // (100% 100%) 表示多边形的第三个顶点，位于右下角。
      // (0 100%) 表示多边形的第四个顶点，位于左下角。
      &:nth-child(1) {
        clip-path: polygon(0 0, 50% 0, 100% 100%, 0 100%);
      }
      &:nth-child(2) {
        clip-path: polygon(0 0, 100% 0, 50% 100%);
      }
      &:nth-child(3) {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%);
      }
      &:nth-child(4) {
        clip-path: polygon(0 0, 100% 0, 50% 100%, 0 100%);
      }
      &:nth-child(5) {
        clip-path: polygon(50% 0, 100% 100%, 0% 100%);
      }
      &:nth-child(6) {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 100%);
      }

      &:hover {
        transform: scale(1.1);
        filter: grayscale(0);
      }
    }
  }
}
</style>
