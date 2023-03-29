<template>
  <div class="canvas-container">
    <canvas ref="canvasRef" width="1200" height="500"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { Ball } from './ball';
class Ball {
    x: number; // 粒子x轴的位置
    y: number; // 粒子y轴的位置
    r: number; // 粒子的半径
    vx: number; // 粒子向右的速率
    vy: number; // 粒子向下的速率
    maxX: number; // 粒子的右边界
    maxY: number; // 粒子的下边界
    color = randomColor(); // 粒子的颜色
    friction = 0.99; // 阻力系数
  
    constructor(x: number, y: number, width: number, height: number, r = 20) {
      this.x = x;
      this.y = y;
      this.r = r;
      const [vx, vy] = randomDirect();
      this.vx = vx;
      this.vy = vy;
      this.maxX = width - r;
      this.maxY = height - r;
    }
  
    draw() {
      drawCircle(this.x, this.y, this.r, this.color);
    }
  
    update() {
    this.vx *= this.friction; // 逐渐减缓小球的水平速度
    this.vy += 1.5; // 增加小球的垂直速度
    let dx = this.x + this.vx; // 粒子移动后的x坐标
    let dy = this.y + this.vy; // 粒子移动后的y坐标

    this.x = dx;
    this.y = dy;

    if (dx > this.maxX || dx < this.r) {
      this.vx = -this.vx;
    }

    if ((dy >= this.maxY && this.vy > 0) || (dy < this.r && this.vy < 0)) {
      if (Math.abs(this.vy) <= 1.5) {
        this.vy = 0;
        return;
      }
      this.vy = -this.vy * 0.5;
      this.vx *= 0.5;
    }

    this.vy *= this.friction; // 逐渐减缓小球的垂直速度
  }
  
    isStopped() {
      return this.vy === 0 && this.vx === 0;
    }
  }
  
  // 随机生成颜色
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };
  
  // 随机生成一个0-180°的方向
  const randomDirect = () => {
    const vx = Math.floor(Math.random() * 20) - 10;
    const vy =  - 10;
    // const vy = Math.floor(Math.random() * 5) - 10;
    return [vx, vy];
  };
const canvasRef = ref();
const width = ref(0);
const height = ref(0);
const ctx = ref<CanvasRenderingContext2D>();
const ball = ref<Ball>();

const drawCircle = (x: number, y: number, r: number, color: string) => {
  ctx.value?.clearRect(0, 0, width.value, height.value);
  ctx.value?.beginPath();
  ctx.value.fillStyle = color;
  ctx.value?.arc(x, y, r, 0, 360 * (Math.PI / 180));
  ctx.value?.fill();
  ctx.value?.closePath();
};

const animate = () => {
  ball.value?.update();
  drawCircle(ball.value?.x ?? 0, ball.value?.y ?? 0, ball.value?.r ?? 0, ball.value?.color ?? '');
  if (ball.value?.isStopped() ?? false) {
    return;
  }
  window.requestAnimationFrame(animate);
};

onMounted(() => {
  ctx.value = canvasRef.value?.getContext('2d');
  width.value = canvasRef.value.width = canvasRef.value?.offsetWidth ?? 0;
  height.value = canvasRef.value.height = canvasRef.value?.offsetHeight ?? 0;
  canvasRef.value?.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    ball.value = new Ball(offsetX, offsetY, width.value, height.value);
    animate();
  });
});
</script>

<style lang="less" scoped></style>
