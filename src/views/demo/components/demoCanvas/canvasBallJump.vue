<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="650" height="500"></canvas>
    随便点点呗
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const canvas = ref<HTMLCanvasElement>();
let ball = null;

class Ball {
  canvas: HTMLCanvasElement; //canvas DOM
  canvasWidth: number; //小球右边界
  canvasHeigh: number; //小球下边界
  ctx: CanvasRenderingContext2D; //canvas上下文
  x: number; //小球出现位置
  y: number; //小球出现位置
  r: number; //小球半径
  color: string; //小球颜色
  vx: number; //水平速度
  vy: number; //下落速度
  constructor(canvas: HTMLCanvasElement,x: number, y: number,r?: number, color?: string) {
    this.x = x
    this.y = y
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeigh = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.init(r,color)
  }
  init(r?: number, color?: string) {
    this.randomDirect()
    this.setBall(r, color);
  }
  setBall(r?: number, color?: string) {
    if (r && (typeof r !== 'number' || isNaN(r) || r <= 0)) {
      throw new Error('小球半径必须是正数');
    }
    this.r = r || Math.floor(Math.random() * 5) + 15;
    this.color = color || this.randomColor();
  }
  drawBall(x: number, y: number) {
    this.x = x;
    this.y = y;
    // 定义随机渐变圆
    const circleStyle = this.ctx.createRadialGradient(
      this.x,
      this.y,
      this.r,
      this.x,
      this.y,
      this.r - 3
    );
    circleStyle.addColorStop(1, this.color);
    circleStyle.addColorStop(0, '#fff');
    this.ctx.fillStyle = circleStyle;
    // 每次点都清空画布
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigh);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 360 * (Math.PI / 180));
    this.ctx.fill();
    this.ctx.closePath();
  }
  fall() {
    window.requestAnimationFrame(() => {
      this.vx *= 0.9999999;
      this.vy += 1.5;
      let dx = this.x + this.vx; // 粒子移动后的x坐标
      let dy = this.y + this.vy; // 粒子移动后的y坐标

      //   下面的条件是当小球超出画板时，将水平方向相反
      if (dx > this.canvasWidth-this.r || dx < this.r) {
        this.vx = -this.vx;
      }
      if (
        (dy >= this.canvasHeigh-this.r && this.vy > 0) ||
        (dy < this.r && this.vy < 0)
      ) {
        if (Math.abs(this.vy) <= 1.5) return;
        this.vy = -this.vy;
      }

      this.drawBall(dx, dy);

      this.fall();
    });
  }
  // 随机颜色
  randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
  // 随机生成一个0-180°的方向
  randomDirect() {
    this.vx = Math.floor(Math.random() * 20) - 10;
    this.vy = Math.floor(Math.random() * 5) - 10;
  }
}

onMounted(() => {
  canvas.value.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    ball = new Ball(canvas.value,offsetX, offsetY);
    ball.fall();
  });
});
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
}
</style>
