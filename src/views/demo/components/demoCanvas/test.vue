<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="1200" height="500"></canvas>
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
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeigh = canvas.height;
    this.ctx = canvas.getContext('2d');
  }
  init(r?: number, color?: string) {
    this.canvas.addEventListener('click', (e) => {
        const { offsetX, offsetY } = e;
      this.drawBall(offsetX,offsetY,r,color);
    });
  }
  drawBall(x: number, y: number, r?: number, color?: string) {
    if (r && (typeof r !== 'number' || isNaN(r) || r <= 0)) {
      throw new Error('小球半径必须是正数');
    }
    this.r = r || Math.floor(Math.random() * 5) +15;
    console.log(this.r)
    this.x = x
    this.y = y
    this.color = color || this.randomColor();
    
    if(!color){
        
        // 定义随机渐变圆
        const circleStyle = this.ctx.createRadialGradient(this.x,this.y,this.r, this.x,this.y,this.r-3)
        circleStyle.addColorStop(1,this.color)
        circleStyle.addColorStop(0,'#fff')
        this.ctx.fillStyle = circleStyle
    }else{
        this.ctx.fillStyle = color
    }
    // 每次点都清空画布
    this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeigh)
    this.ctx.beginPath()
    this.ctx.arc(x,y,this.r,0,360 * (Math.PI / 180))
    this.ctx.fill()
    this.ctx.closePath()
  }
  // 随机颜色
  randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
}

onMounted(() => {
  ball = new Ball(canvas.value);
  ball.init()
});
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
}
</style>
