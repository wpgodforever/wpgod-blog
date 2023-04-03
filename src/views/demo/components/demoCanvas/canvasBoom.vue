<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="650" height="500"></canvas>
    随便点点呗
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const canvas = ref<HTMLCanvasElement>();
interface ballColorConfigInterface {
  r: number,
  g: number,
  b: number,
}
class Boom {
  canvasDom:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  ballList: Array<Ball> = [];//存放每次点击出现的小球数组
  ballNum: number;//每次点击出现多少个小球
  ballColorConfig: Array<ballColorConfigInterface>;
  constructor(canvasDom:HTMLCanvasElement,ballNum: number, ballColorConfig?: Array<ballColorConfigInterface>) {
    this.ballNum = ballNum
    this.ballColorConfig = ballColorConfig || [//一个颜色数组，其中包含了四种不同的颜色，用于作为粒子的颜色。可以根据需求调整颜色
      {
        r: 36,
        g: 18,
        b: 42
      },
      {
        r: 78,
        g: 36,
        b: 42
      },
      {
        r: 252,
        g: 178,
        b: 96
      },
      {
        r: 253,
        g: 238,
        b: 152
      }
    ]
    this.canvasDom = canvasDom
    this.ctx = canvasDom.getContext('2d')
    this.init(canvasDom)
  }
  init(canvasDom){
    this.animate()
    canvasDom.addEventListener('click',(e) => {
      const { offsetX, offsetY } = e;
      for(let i = 0;i<this.ballNum; i++){
        const color = this.ballColorConfig[Math.floor(Math.random()*this.ballColorConfig.length)]
        this.ballList.push(new Ball(canvasDom,offsetX,offsetY,color))
      }
    })
  }
  animate(){
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0,0,this.canvasDom.width,this.canvasDom.height)
      this.ballList.forEach(v => {
        v.updateBall()
        v.draw()
      })
      this.animate()
    })
  }
}

class Ball {
  canvasDom:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  x:number;//小球X轴位置
  y:number;//小球Y轴位置
  speed:number;//小球移动速度
  deg:number;//小球运动角度
  r:number;//小球半径
  ballColor:ballColorConfigInterface;//小球颜色
  constructor(canvasDom:HTMLCanvasElement,x:number,y:number,ballColor?:ballColorConfigInterface){
    this.canvasDom = canvasDom
    this.x = x
    this.y = y
    this.ballColor = ballColor || {
        r: 36,
        g: 18,
        b: 42
      }
    this.r = this.randomR()
    this.randomSpeed()
    this.randomDeg()
    this.ctx = canvasDom.getContext('2d')
    this.draw()
  }
  draw(){
    this.ctx.beginPath()
    this.ctx.fillStyle = `rgba(${this.ballColor.r},${this.ballColor.g},${this.ballColor.b},255)`
    this.ctx.arc(this.x,this.y,this.r,0,360*(Math.PI/180))
    this.ctx.fill()
    this.ctx.closePath()
  }
  updateBall(){
    let a = 180 - (this.deg + 90);
    this.deg > 0 && this.deg < 180
      ? (this.x += Math.cos(this.deg)*this.speed)
      : (this.x -= Math.cos(this.deg)*this.speed);
      this.deg > 90 && this.deg < 270
      ? (this.y += this.speed * Math.sin(a))
      : (this.y -= this.speed * Math.sin(a));
  }
  randomSpeed(){//小球随机速度
    this.speed = Math.random() * 15
  }
  randomDeg(){//小球随机运动角度
    this.deg = Math.round(Math.random() * 360)
  }
  randomR(){//小球随机半径
    return Math.floor(Math.random() * 5) + 5
  }
}
onMounted(() => {
  new Boom(canvas.value,40)
});
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
  background-color: #fff;
}
</style>
