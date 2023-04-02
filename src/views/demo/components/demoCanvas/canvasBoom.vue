<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="650" height="500"></canvas>
    随便点点呗
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
  const ctx = canvas.value.getContext('2d');

  // Configuration, Play with these
  const config = {
    particleNumber: 100,//粒子数量
    maxParticleSize: 10,//最大的粒子大小
    maxSpeed: 20,//最大的粒子速度
    colorVariation: 50//粒子颜色变化
  };

  // Colors
  let colorPalette = {
    bg: {//canvas画布背景颜色
      r: 12,
      g: 9,
      b: 29
    },
    matter: [//matter 属性是一个颜色数组，其中包含了四种不同的颜色，用于作为粒子的颜色。
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
  };

  // 存储粒子对象的数组
  let particles = [];

  // 绘制背景颜色
  let drawBg = function drawBg(ctx, color) {
    ctx.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
  };

  // 用于创建粒子对象的构造函数
  let Particle = function Particle(x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.value.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.value.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(
      colorPalette.matter[
        Math.floor(Math.random() * colorPalette.matter.length)
      ],
      true
    );
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
  };

  //颜色处理变化
  let colorVariation = (color, returnString) => {
    let r, g, b, a, variation;
    r = Math.round(
      Math.random() * config.colorVariation -
        config.colorVariation / 2 +
        color.r
    );
    g = Math.round(
      Math.random() * config.colorVariation -
        config.colorVariation / 2 +
        color.g
    );
    b = Math.round(
      Math.random() * config.colorVariation -
        config.colorVariation / 2 +
        color.b
    );
    a = Math.random() + 0.5;
    if (returnString) {
      return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    } else {
      return {
        r: r,
        g: g,
        b: b,
        a: a
      };
    }
  };

  // 用于计算粒子运动轨迹的函数
  let updateParticleModel = (p) => {
    let a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180
      ? (p.x += (p.s * Math.sin(p.d)) / Math.sin(p.s))
      : (p.x -= (p.s * Math.sin(p.d)) / Math.sin(p.s));
    p.d > 90 && p.d < 270
      ? (p.y += (p.s * Math.sin(a)) / Math.sin(p.s))
      : (p.y -= (p.s * Math.sin(a)) / Math.sin(p.s));
    return p;
  };

  // 绘制粒子
  let drawParticle = (x, y, r, c) => {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
  };
//用于初始化粒子效果。在该函数中，会创建一个包含一定数量粒子的数组，并将这些粒子对象存储在 particles 数组中。在每个粒子对象中，会设置其随机的位置、大小、颜色、速度和运动方向等属性。
  let initParticles = (numParticles, x?, y?) => {
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(x, y));
    }
    particles.forEach(function (p) {
      drawParticle(p.x, p.y, p.r, p.c);
    });
  };

  // That thing
  (window as any).requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Our Frame function
  let frame = () => {
    // Draw background first
    drawBg(ctx, colorPalette.bg);
    // Update Particle models to new position
    particles.map(function (p) {
      return updateParticleModel(p);
    });
    // Draw em'
    particles.forEach(function (p) {
      drawParticle(p.x, p.y, p.r, p.c);
    });
    // Play the same song? Ok!
    (window as any).requestAnimFrame(frame);
  };

  // Click listener
  document.body.addEventListener('click', function (event) {
    let x = event.clientX;
    let y = event.clientY;
    initParticles(config.particleNumber, x, y);
  });

//   // First Fram
  frame();

//   // First particle explosion
//   initParticles(config.particleNumber);
});
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
}
</style>
