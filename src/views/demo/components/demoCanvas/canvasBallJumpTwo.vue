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
  ballList: Array<{
    offsetX: number,//小球下一帧位置
    offsetY: number,//小球下一帧位置
    vx: number,//小球水平速度
    vy: number,//小球下落速度
    r: number,
    color: string
  }> = [];//小球下落数组
  constructor(canvas: HTMLCanvasElement,) {
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeigh = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.init()
  }
  init() {
    this.animate()
  }
  setBall(r?: number, color?: string) {
    if (r && (typeof r !== 'number' || isNaN(r) || r <= 0)) {
      throw new Error('小球半径必须是正数');
    }
    r = r || Math.floor(Math.random() * 5) + 15;
    color = color || this.randomColor();
    return { r, color }
  }
  drawBall(x: number, y: number, r?: number, color?: string) {
    // 定义随机渐变圆
    const circleStyle = this.ctx.createRadialGradient(
      x,
      y,
      r,
      x,
      y,
      r - 3
    );
    circleStyle.addColorStop(1, color);
    circleStyle.addColorStop(0, '#fff');
    this.ctx.fillStyle = circleStyle;
    // 每次点都清空画布
    // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigh);
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 360 * (Math.PI / 180));
    this.ctx.fill();
    this.ctx.closePath();
  }
  fall(index: number) {
    let { offsetX, offsetY, vx, vy, r, color } = this.ballList[index]
    let newVy = vy
    let newVx = vx
    
    // 如果两个小球相交了，需要交换他们的速度
    this.ballList.forEach((item, itemIndex) => {

      if (itemIndex !== index) {
        // 判断是否相交
        // 注意，当速度很大是，会造成小球重叠，这样子会一直交换速度又一直重叠
        // 当他们相交重叠时，不仅要交换速度，还要重置一下与它相交的小球的位置
        // 我们需要算出重叠的距离，配合他们的方向反向重置
        const { state, distance } = this.isInterect(this.ballList[index], item)
        let xVelDiff = item.vx - vx;
        let yVelDiff = item.vy - vy;
        let xDist = item.offsetX - offsetX;
        let yDist = item.offsetY - offsetY;
        if (state && xVelDiff * xDist + yVelDiff * yDist < 0) {
          const tempSpeedX = newVx;
          newVx = item.vx;
          item.vx = tempSpeedX;
          // 交换y方向速度
          const tempSpeedY = newVy;
          newVy = item.vy;
          item.vy = tempSpeedY;
        }
      }
    })
    //   下面的条件是当小球超出画板时，将水平方向相反
    if (offsetX > this.canvasWidth - r || offsetX < r) {
      newVx = -newVx;
    }
    if (
      (offsetY >= this.canvasHeigh - r && newVy > 0) ||
      (offsetY < r && newVy < 0)
    ) {

      newVy = -newVy;
    }
    newVy = newVy + 1.5
    const dx = offsetX + newVx; // 粒子移动后的x坐标
    const dy = offsetY + newVy; // 粒子移动后的y坐标
    this.drawBall(dx, dy, r, color);
    this.ballList[index].offsetX = dx; // 粒子移动后的x坐标
    this.ballList[index].offsetY = dy; // 粒子移动后的y坐标
    this.ballList[index].vx = newVx; // 粒子移动后的y坐标
    this.ballList[index].vy = newVy; // 粒子移动后的y坐标
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
    const vx = Math.floor(Math.random() * 20) - 10;
    const vy = Math.floor(Math.random() * 5) - 10;
    return { vx, vy }
  }
  animate() {
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeigh);
      this.ballList.forEach((v, index) => {
        this.fall(index)
      })
      this.animate()
    });
  }
  add(offsetX?: number, offsetY?: number, ballR?: number, ballColor?: string) {
    const { r, color } = this.setBall(ballR, ballColor);
    const vx = this.randomDirect().vx
    const vy = this.randomDirect().vy
    this.ballList.push({ offsetX, offsetY, vx, vy, r, color })
  }
  isInterect(selfBall, jugBall) {
    const dx = selfBall.offsetX - jugBall.offsetX;
    const dy = selfBall.offsetY - jugBall.offsetY;
    // 圆心与圆心的距离
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (selfBall.r + jugBall.r >= distance + 1)
      // 半径之和大于等于圆心距离，说明相交了
      return { state: true, distance };
    else
      return { state: false, distance };
  }

}


onMounted(() => {
  ball = new Ball(canvas.value);
  canvas.value.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    ball.add(offsetX, offsetY);
  });
});
</script>
  
<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
}
</style>
  