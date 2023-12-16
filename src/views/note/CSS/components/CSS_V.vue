<template>
  <div>
    <div class="scroll" style="--t: 20s">
      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>

      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>
    </div>

    <div class="scroll" style="--t: 30s">
      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>

      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>
    </div>

    <div class="scroll" style="--t: 10s">
      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>

      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>
    </div>

    <div class="scroll" style="--t: 35s">
      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>

      <div>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>Vue</span>
        <span>React</span>
        <span>Figma</span>
        <span>Photoshop</span>
      </div>
    </div>

    <div class="scroll img-box" style="--t: 25s">
      <div>
        <div class="bg" style="--r: 0">1</div>
        <div class="bg" style="--r: 40">2</div>
        <div class="bg" style="--r: 80">3</div>
        <div class="bg" style="--r: 120">4</div>
        <div class="bg" style="--r: 160">5</div>
        <div class="bg" style="--r: 200">6</div>
        <div class="bg" style="--r: 240">7</div>
        <div class="bg" style="--r: 280">8</div>
        <div class="bg" style="--r: 320">9</div>
      </div>

      <div>
        <div class="bg" style="--r: 0">1-1</div>
        <div class="bg" style="--r: 40">2-1</div>
        <div class="bg" style="--r: 80">3-1</div>
        <div class="bg" style="--r: 120">4-1</div>
        <div class="bg" style="--r: 160">5-1</div>
        <div class="bg" style="--r: 200">6-1</div>
        <div class="bg" style="--r: 240">7-1</div>
        <div class="bg" style="--r: 280">8-1</div>
        <div class="bg" style="--r: 320">9-1</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,600,700,800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  min-height: 100vh;
  background-color: #222;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scroll {
  position: relative;

  display: flex;
  width: 700px;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #fff 20%,
    #fff 80%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #fff 20%,
    #fff 80%,
    transparent
  );
}

.scroll > div span {
  display: inline-block;
  margin: 10px;
  padding: 5px 10px;
  background-color: #333;
  border-radius: 5px;

  letter-spacing: 0.2em;
  text-transform: uppercase;

  cursor: pointer;
  transition: background-color 0.5s;
}
.scroll > div span:hover {
  background-color: #4caf50;
}

.img-box {
  display: flex;
  column-gap: 10px;
}
.img-box > div,
.img-box > div .bg {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.img-box .bg {
  width: 150px;
  height: 150px;
  background-color: #ff3e3e;
  filter: hue-rotate(calc(var(--r) * 1deg));

  cursor: pointer;
  transition: filter 0.5s;
}

.scroll > div {
  white-space: nowrap;
  animation: animate var(--t) linear infinite;
  animation-delay: calc(var(--t) * -1);
}
@keyframes animate {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.scroll > div:nth-child(2) {
  animation: animate2 var(--t) linear infinite;
  animation-delay: calc(var(--t) / -2);
}
@keyframes animate2 {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-200%);
  }
}

.scroll:hover > div {
  animation-play-state: paused;
}

@media screen and (max-width: 768px) {
  .scroll {
    width: 95vw;
  }

  .scroll > div span {
    background-color: #4caf50;
  }

  .img-box .bg {
    width: 15vw;
    height: 15vw;
  }
}
</style>
