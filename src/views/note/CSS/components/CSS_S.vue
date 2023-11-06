<template>
  <div class="box">
    <div class="container">
      <div class="main1 flex" ref="mainRef">
        <div class="main2">
          <div class="firstCircle positon center"></div>
          <!-- 最外层的圆环 -->
          <div class="secondCircle positon center"></div>
          <!-- 第二层两段圆环 -->
          <div class="fourthCircle flex positon center">
            <!-- 一堆圆环组成的圆环 -->
            <div class="annulusContent">
              <div
                v-for="i in 36"
                class="annulus"
                :class="`annulus-${i}`"
                :key="i"
              ></div>
            </div>
          </div>
          <div class="bar positon flex">
            <div
              class="line"
              v-for="i in 10"
              :class="`line-${i}`"
              :key="i"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainRef = ref<HTMLElement>()
const isDragging = ref(false)
const initialX = ref(0) // 初始鼠标X坐标
const initialY = ref(0) // 初始鼠标Y坐标
const currentX = ref(0) // 当前鼠标X坐标
const currentY = ref(0) // 当前鼠标Y坐标
const initialRotationY = ref(0) // 初始旋转角度（Y轴）
const initialRotationX = ref(0) // 初始旋转角度（X轴）

onMounted(() => {
  console.log('onMounted')
  if (!mainRef.value) return
  mainRef.value.addEventListener('mousedown', mousedown)
  mainRef.value.addEventListener('mousemove', mousemove)
  mainRef.value.addEventListener('mouseup', mouseup)
})
onUnmounted(() => {
  console.log('onUnmounted')
  if (!mainRef.value) return
  mainRef.value.removeEventListener('mousedown', mousedown)
  mainRef.value.removeEventListener('mousemove', mousemove)
  mainRef.value.removeEventListener('mouseup', mouseup)
})
function mousedown(e: any) {
  console.log('mousedown')
  initialY.value = e.clientY // 获取初始鼠标Y坐标
  initialX.value = e.clientX
  initialRotationY.value = parseInt(
    getComputedStyle(mainRef.value!)
      .getPropertyValue('transform')
      .replace(/[^0-9-.,]/g, '')
      .split(',')[4],
  ) // 获取初始旋转角度（Y轴）
  initialRotationX.value = parseInt(
    getComputedStyle(mainRef.value!)
      .getPropertyValue('transform')
      .replace(/[^0-9-.,]/g, '')
      .split(',')[5],
  ) // 获取初始旋转角度（X轴）
  isDragging.value = true // 设置isDragging为true，表示正在拖动
}
function mousemove(e: any) {
  console.log('mousemove')
  if (isDragging.value) {
    // 如果正在拖动
    currentY.value = e.clientY // 获取当前鼠标Y坐标
    let dy = currentY.value - initialY.value // Y轴方向移动的距离
    let newRotationY = initialRotationY.value + dy // 根据移动方向计算新的旋转角度（Y轴）

    currentX.value = e.clientX
    let dx = currentX.value - initialX.value // Y轴方向移动的距离
    let newRotationX = initialRotationX.value + dx * -1
    mainRef.value!.style.transform =
      'rotateX(' + newRotationX + 'deg) rotateY(' + newRotationY + 'deg)' // 设置元素的旋转角度
  }
}
function mouseup() {
  console.log('mouseup')
  isDragging.value = false
}
</script>

<style lang="scss" scoped>
.box {
  height: 1000px;
  background-color: #000;
  .container {
    width: 300px;
    height: 300px;
    .main1 {
      width: 500px;
      height: 500px;
      transform: translateZ(-150px);
      transform-style: preserve-3d;
      .main2 {
        width: 300px;
        height: 300px;
        transform-style: preserve-3d;
        transform: rotateX(60deg);
        position: relative;
        .positon {
          position: absolute;
        }
        .center {
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
        .firstCircle {
          width: 400px;
          height: 400px;
          border-radius: 50%;
          border: 3px solid rgb(42, 153, 255);
        }
        .secondCircle {
          width: 350px;
          height: 350px;
          border-radius: 50%;
          border: 10px solid rgb(42, 153, 255);
          border-color: rgb(42, 153, 255) transparent;

          animation: rotate1 3s linear infinite;
        }
        .thirdCircle {
        }
        .fourthCircle {
          width: 300px;
          height: 300px;
          transform: translateX(-50%) translateY(-50%) translateZ(30px);
          animation: rotate2 3s linear infinite;
        }
        .annulusContent {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          .annulus {
            width: 300px;
            height: 300px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            background: conic-gradient(
              rgb(69, 164, 254) 0,
              rgb(69, 164, 254) 2%,
              transparent 2%
            );
            border-radius: 50%;
            -webkit-mask: radial-gradient(
              transparent,
              transparent 57%,
              #000 57%,
              #000 100%
            );
          }
          @for $i from 1 through 37 {
            .annulus-#{$i} {
              transform: translateX(-50%)
                translateY(-50%)
                rotateZ(10deg + $i * 10);
            }
          }
        }
        .bar {
          width: 280px;
          height: 300px;
          background: transparent;
          top: 50%;
          left: 50%;
          transform: translateZ(150px) translateX(-50%) translateY(-50%)
            rotateX(90deg);
          display: flex;
          gap: 20px;
          overflow: hidden;
        }
        .line {
          width: 3px;
          height: 100px;
          background: linear-gradient(
            to top,
            rgb(69, 164, 254),
            rgba(42, 153, 255, 0.1)
          );
        }
        // @for $i from 1 through 11 {
        //   .line-#{$i} {
        //     animation: line1 $i $i infinite;
        //   }
        // }
        .line-1 {
          animation: line1 1s linear infinite;
        }
        .line-2 {
          animation: line1 0.5s 0.2s linear infinite;
        }
        .line-3 {
          animation: line1 1.5s 0.5s linear infinite;
        }
        .line-4 {
          animation: line1 1.3s 1s linear infinite;
        }
        .line-5 {
          animation: line1 1.6s 0.3s linear infinite;
        }
        .line-6 {
          animation: line1 2s 0.4s linear infinite;
        }
        .line-7 {
          animation: line1 1.2s 0.6s linear infinite;
        }
        .line-8 {
          animation: line1 1.1s 1.1s linear infinite;
        }
        .line-9 {
          animation: line1 1.9s 0.9s linear infinite;
        }
        .line-10 {
          animation: line1 1.7s 1.3s linear infinite;
        }
        .line-11 {
          animation: line1 1.3s 1.1s linear infinite;
        }
        .line-12 {
          animation: line1 1.4s 0.4s linear infinite;
        }
      }
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
@keyframes rotate1 {
  0% {
    transform: translateZ(20px) translateX(-50%) translateY(-50%) rotateZ(0deg);
  }
  100% {
    transform: translateZ(20px) translateX(-50%) translateY(-50%)
      rotateZ(-360deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(30px) rotateZ(0deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(30px)
      rotateZ(360deg);
  }
}

@keyframes line1 {
  0% {
    transform: translateY(-220px);
  }
  100% {
    transform: translateY(220px);
  }
}
</style>
