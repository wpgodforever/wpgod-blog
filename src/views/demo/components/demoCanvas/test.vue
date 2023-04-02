<template>
    <div class="canvas-container">
      <canvas ref="canvas" width="650" height="500"></canvas>
      随便点点呗
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const canvas = ref<HTMLCanvasElement>();
  let ball = null
  let ballList:Array<Ball> = []
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
    // const ctx = canvas.value.getContext('2d');
    canvas.value.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    ballList.push(new Ball(canvas.value,offsetX, offsetY));
    ballList.forEach(v => {
        v.fall()
    })
  });
//     // Configuration, Play with these
//     const config = {
//       particleNumber: 100,//粒子数量
//       maxParticleSize: 10,//最大的粒子大小
//       maxSpeed: 20,//最大的粒子速度
//       colorVariation: 50//粒子颜色变化
//     };
  
//     // Colors
//     let colorPalette = {
//       bg: {//canvas画布背景颜色
//         r: 12,
//         g: 9,
//         b: 29
//       },
//       matter: [//matter 属性是一个颜色数组，其中包含了四种不同的颜色，用于作为粒子的颜色。
//         {
//           r: 36,
//           g: 18,
//           b: 42
//         }, 
//         {
//           r: 78,
//           g: 36,
//           b: 42
//         },
//         {
//           r: 252,
//           g: 178,
//           b: 96
//         }, 
//         {
//           r: 253,
//           g: 238,
//           b: 152
//         }
//       ]
//     };
  
//     // 存储粒子对象的数组
//     let particles = [];
  
//     // 绘制背景颜色
//     let drawBg = function drawBg(ctx, color) {
//       ctx.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
//       ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
//     };
  
//     // 用于创建粒子对象的构造函数
//     let Particle = function Particle(x, y) {
//       // X Coordinate
//       this.x = x || Math.round(Math.random() * canvas.value.width);
//       // Y Coordinate
//       this.y = y || Math.round(Math.random() * canvas.value.height);
//       // Radius of the space dust
//       this.r = Math.ceil(Math.random() * config.maxParticleSize);
//       // Color of the rock, given some randomness
//       this.c = colorVariation(
//         colorPalette.matter[
//           Math.floor(Math.random() * colorPalette.matter.length)
//         ],
//         true
//       );
//       // Speed of which the rock travels
//       this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
//       // Direction the Rock flies
//       this.d = Math.round(Math.random() * 360);
//     };
  
//     //颜色处理变化
//     let colorVariation = (color, returnString) => {
//       let r, g, b, a, variation;
//       r = Math.round(
//         Math.random() * config.colorVariation -
//           config.colorVariation / 2 +
//           color.r
//       );
//       g = Math.round(
//         Math.random() * config.colorVariation -
//           config.colorVariation / 2 +
//           color.g
//       );
//       b = Math.round(
//         Math.random() * config.colorVariation -
//           config.colorVariation / 2 +
//           color.b
//       );
//       a = Math.random() + 0.5;
//       if (returnString) {
//         return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
//       } else {
//         return {
//           r: r,
//           g: g,
//           b: b,
//           a: a
//         };
//       }
//     };
  
//     // 用于计算粒子运动轨迹的函数
//     let updateParticleModel = (p) => {
//       let a = 180 - (p.d + 90); // find the 3rd angle
//       p.d > 0 && p.d < 180
//         ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s))
//         : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s));
//       p.d > 90 && p.d < 270
//         ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s))
//         : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s));
//       return p;
//     };
  
//     // 绘制粒子
//     let drawParticle = (x, y, r, c) => {
//       ctx.beginPath();
//       ctx.fillStyle = c;
//       ctx.arc(x, y, r, 0, 2 * Math.PI, false);
//       ctx.fill();
//       ctx.closePath();
//     };
//   //用于初始化粒子效果。在该函数中，会创建一个包含一定数量粒子的数组，并将这些粒子对象存储在 particles 数组中。在每个粒子对象中，会设置其随机的位置、大小、颜色、速度和运动方向等属性。
//     let initParticles = (numParticles, x?, y?) => {
//       for (let i = 0; i < numParticles; i++) {
//         particles.push(new Particle(x, y));
//       }
//       particles.forEach(function (p) {
//         drawParticle(p.x, p.y, p.r, p.c);
//       });
//     };
  
//     // That thing
//     (window as any).requestAnimFrame = (function () {
//       return (
//         window.requestAnimationFrame ||
//         (window as any).webkitRequestAnimationFrame ||
//         (window as any).mozRequestAnimationFrame ||
//         function (callback) {
//           window.setTimeout(callback, 1000 / 60);
//         }
//       );
//     })();
  
//     // Our Frame function
//     let frame = () => {
//       // Draw background first
//       drawBg(ctx, colorPalette.bg);
//       // Update Particle models to new position
//       particles.map(function (p) {
//         return updateParticleModel(p);
//       });
//       // Draw em'
//       particles.forEach(function (p) {
//         drawParticle(p.x, p.y, p.r, p.c);
//       });
//       // Play the same song? Ok!
//       (window as any).requestAnimFrame(frame);
//     };
  
//     // Click listener
//     document.body.addEventListener('click', function (event) {
//       let x = event.clientX;
//       let y = event.clientY;
//       initParticles(config.particleNumber, x, y);
//     });
  
//   //   // First Fram
//     frame();
  
//   //   // First particle explosion
//   //   initParticles(config.particleNumber);
  });
  </script>
  
  <style lang="less" scoped>
  canvas {
    border: 1px solid #fff;
  }
  </style>
  