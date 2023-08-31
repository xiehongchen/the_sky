<template>
  <div>
    <div ref="container"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = ref<HTMLElement | null>(null)
onMounted(() => {
  if (!container.value) return
  // 创建场景
  const scene = new THREE.Scene()
  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)
  // 相机位置
  camera.position.set(5, 5, 10)
  // 相机看向的位置
  camera.lookAt(0, 0, 0)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  // 创建一个立方体
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // 创建坐标轴
  const arrowLength = 5
  const arrowColorX = 0xff0000
  const arrowColorY = 0x00ff00
  const arrowColorZ = 0x0000ff

  const arrowX = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    arrowLength,
    arrowColorX,
  )
  const arrowY = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    arrowLength,
    arrowColorY,
  )
  const arrowZ = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    arrowLength,
    arrowColorZ,
  )

  scene.add(arrowX)
  scene.add(arrowY)
  scene.add(arrowZ)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 0, 10)
  scene.add(directionalLight)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
  document.addEventListener('keydown', (event) => {
    const key = event.key
    if (key === 'ArrowUp') {
      cube.position.y += 1 // 向上移动
    }
    if (key === 'ArrowDown') {
      cube.position.y -= 1 // 向下移动
    }
    if (key === 'ArrowLeft') {
      cube.position.x -= 1 // 向左移动
    }
    if (key === 'ArrowRight') {
      cube.position.x += 1 // 向右移动
    }
  })
})
</script>

<style lang="scss" scoped>
#container {
  width: 400px;
  height: 400px;
}
</style>
