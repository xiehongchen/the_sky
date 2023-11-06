<template>
  <div class="box">
    <div class="box-item">
      <div class="title">线性渐变背景</div>
      <div class="box1 hover"></div>
    </div>
    <div class="box-item">
      <div class="title">渐变色直角边框</div>
      <div class="box2 hover"></div>
    </div>
    <div class="box-item">
      <div class="title">渐变色圆角边框</div>
      <div class="box3 hover"></div>
    </div>
    <!-- <div class="box-item">
      <div class="title">渐变色虚线边框</div>
      <div class="box4 hover"></div>
    </div> -->
    <div class="box-item">
      <div class="box5 hover">渐变文字</div>
    </div>
    <div class="box-item">
      <div class="box6 hover">带阴影的渐变文字</div>
    </div>
    <div class="box-item">
      <div class="box7 hover">省略号代替超出文本框的渐变色文字</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  display: flex;
  .box-item {
    width: 200px;
    height: 200px;
    border: 1px solid #ff0000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 10px;
    position: relative;
    .title {
      width: 200px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 20;
      font-size: 20px;
      font-weight: 700;
    }
    .hover:hover {
      transform: scale(2);
    }
    .box1 {
      width: 100px;
      height: 100px;
      background-image: linear-gradient(
        rgba(0, 0, 255, 0.5),
        rgba(255, 255, 0, 0.5)
      );
    }
    .box2 {
      width: 100px;
      height: 100px;
      border-width: 10px;
      border-style: solid;
      border-image-source: linear-gradient(
        0deg,
        rgb(25, 25, 209) 0%,
        rgb(255, 0, 220) 97.9381%
      ); //使用图像作为边框，可传url
      border-image-slice: 10; //防止失真
    }
    .box3 {
      content: '';
      position: absolute;
      top: 50px;
      width: 100px;
      height: 100px;
    }
    .box3::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, red, blue);
      mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);
      mask-clip: content-box, border-box;
      -webkit-mask-image: linear-gradient(#fff 0 0), linear-gradient(#fff 0 0);
      -webkit-mask-clip: content-box, border-box;
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      padding: 10px;
      border-radius: 30px;
    }
    .box4 {
      position: absolute;
      top: 50px;
      width: 100px;
      height: 100px;
    }
    .box4::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, gold, purple, cyan, deeppink);
      mask: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='57' ry='57' stroke='black' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 30px;
    }
    .box5 {
      color: transparent;
      background-image: linear-gradient(45deg, gold, purple, cyan, deeppink);
      -webkit-background-clip: text;
      background-clip: text;
    }
    .box6 {
      color: transparent;
      background-image: linear-gradient(45deg, gold, purple, cyan, deeppink);
      -webkit-background-clip: text;
      background-clip: text;
      filter: drop-shadow(#0ff 10px 10px 15px);
    }
    .box7 {
      width: 100px;
      height: auto;
      color: transparent;
      background-image: radial-gradient(
        rgb(44, 234, 218) 15.4639%,
        rgb(0, 59, 255) 99.4845%
      );
      background-clip: text;
      -webkit-background-clip: text;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
