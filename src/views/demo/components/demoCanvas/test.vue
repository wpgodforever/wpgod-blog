<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="650" height="500"></canvas>
    随便点点呗
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// 获取canvas画布
const canvas = ref<HTMLCanvasElement | null>(null);

// 获取上下文
let ctx = null
onMounted(()=>{
   ctx= canvas.value.getContext('2d')

const ballRadius = 20 // 小球半径
const ballColor = '#FF0000' // 小球颜色
const gravity = 0.5 // 重力加速度

let ballList = [] // 小球列表

// 绘制小球
function drawBall(ball) {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI)
  ctx.fillStyle = ballColor
  ctx.fill()
}

// 更新小球位置和速度
// 更新小球位置和速度
function updateBall(ball) {
  ball.vy += gravity // 更新小球在垂直方向上的速度
  ball.y += ball.vy // 更新小球的垂直位置
  if (ball.y + ballRadius > canvas.value.height) { // 如果小球触底
    ball.y = canvas.value.height - ballRadius // 将小球位置重置到画布底部
    ball.vy = -ball.vy * 0.8 // 反弹，并减小速度（弹性损失）
  }
  // 判断小球与其他小球是否相撞
  for (let i = 0; i < ballList.length; i++) {
    const otherBall = ballList[i]
    if (otherBall !== ball) { // 排除自己
      const dx = otherBall.x - ball.x
      const dy = otherBall.y - ball.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance <= ballRadius * 2) { // 相撞了
        // 计算弹开的方向和力度
        const angle = Math.atan2(dy, dx)
        const force = (ballRadius * 2 - distance) * 0.1
        // 更新自己的位置和速度
        ball.x -= Math.cos(angle) * force
        ball.y -= Math.sin(angle) * force
        ball.vy = -ball.vy * 0.8
        // 更新其他小球的位置和速度
        otherBall.x += Math.cos(angle) * force
        otherBall.y += Math.sin(angle) * force
        otherBall.vy = -otherBall.vy * 0.8
      }
    }
  }
}


// 添加小球
function addBall(e) {
  const x = e.clientX - canvas.value.offsetLeft
  const y = e.clientY - canvas.value.offsetTop
  const ball = {
    x: x,
    y: y,
    vy: Math.random() * -10, // 随机生成小球在垂直方向上的初速度
  }
  ballList.push(ball)
}

// 渲染场景
function render() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

// 遍历小球列表，依次更新和绘制每一个小球
for (let i = 0; i < ballList.length; i++) {
const ball = ballList[i]
updateBall(ball)
drawBall(ball)
}
}

// 每帧动画的主函数
function animate() {
requestAnimationFrame(animate)
render()
}

// 绑定事件监听器
canvas.value.addEventListener('click', addBall)

// 启动动画
animate()
})
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
  background-color: #fff;
}
</style>
