<template>
  <div class="parctise-box flex-col">
    <canvas ref="canvas" width="400" height="400"></canvas>
    <div class="footer flex-align">
      <div
        @click="putImg(index)"
        class="imgBtn"
        v-for="(item, index) in logos"
        :key="index"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import kazimierzUrl from '@/assets/img/demoGrain/logo_kazimierz.png';
import rhineUrl from '@/assets/img/demoGrain/logo_rhine.png';
import rhodesUrl from '@/assets/img/demoGrain/logo_rhodes2.png';
import victoriazUrl from '@/assets/img/demoGrain/logo_victoria.png';
import yanUrl from '@/assets/img/demoGrain/logo_yan.png';

// 准备logo数据
// const logos = reactive([
//     { label: "kazimierz", url: 'https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/headImg.jpg' },
//     { label: "rhine", url: 'https://p3-passport.byteimg.com/img/user-avatar/edcdbbde0d6f5cb89d7c28187ed55480~180x180.awebp' },
// ]);
const logos = reactive([
  { label: 'kazimierz', url: kazimierzUrl },
  { label: 'rhine', url: rhineUrl },
  { label: 'rhodes', url: rhodesUrl },
  { label: 'victoria', url: victoriazUrl },
  { label: 'yan', url: yanUrl }
]);
// 获取canvas画布
const canvas = ref<HTMLCanvasElement>(null);
let board;

class Board {
  canvasDom: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  logoDotList = [];
  logoList = [];
  index: number = -1;
  constructor(canvasDom: HTMLCanvasElement, logos) {
    this.canvasDom = canvasDom;
    this.ctx = canvasDom.getContext('2d');
    logos.forEach((v) => {
      this.logoList.push(new Img(canvas.value, v.url).dotList);
    });
    this.animate()
  }
  init(index) {
    this.index = index;
  }
  animate() {
    if (this.index >= 0 && this.logoList.length > 0) {
      this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
      this.logoList[this.index].forEach((v) => {
        v.update();
        v.draw();
      });
    }
    window.requestAnimationFrame(() => this.animate());
  }
}

class Img {
  src: string;
  canvasDom: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dotList = [];

  constructor(canvasDom: HTMLCanvasElement, src: string) {
    // 获取图片像素数据
    this.canvasDom = canvasDom;
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas'); // 创建一个空的canvas
      canvas.width = 400;
      canvas.height = 400 * (img.height / img.width);
      this.ctx = canvas.getContext('2d');
      this.ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          // 像素点的序号 一个像素点有4个值
          const index = (x + y * canvas.height) * 4;
          // 在数组中对应的值
          const r = imgData!.data[index];
          const g = imgData!.data[index + 1];
          const b = imgData!.data[index + 2];
          const a = imgData!.data[index + 3];
          const sum = r + g + b + a;
          // 筛选条件 4个颜色通道加起来的值越大，像素点越亮
          if (sum >= 100) {
            const dot = new Dot(this.canvasDom, x, y, [r, g, b, a]);
            this.dotList.push(dot);
          }
        }
      }
    };
  }
}

class Dot {
  canvasDom: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number; // 粒子x轴的初始位置
  y: number; // 粒子y轴的初始位置
  totalX: number; // 粒子x轴的目标位置
  totalY: number; // 粒子y轴的目标位置
  colorList: Array<number>;
  mx?: number; // 粒子x轴需要移动的距离
  my?: number; // 粒子y轴需要移动的距离
  vx?: number; // 粒子x轴移动速度
  vy?: number; // 粒子y轴移动速度
  time: number = 40; // 粒子移动耗时
  r: number = 1; // 粒子的半径
  opacity: number = 0; // 粒子的透明度
  constructor(
    canvasDom: HTMLCanvasElement,
    totalX: number,
    totalY: number,
    colorList: Array<number>,
    time?: number,
    r?: number
  ) {
    this.canvasDom = canvasDom;
    this.ctx = canvasDom.getContext('2d');
    // 在canvas画布中随机取一个初始位置
    this.x = (Math.random() * canvasDom.width) >> 0;
    this.y = (Math.random() * canvasDom.height) >> 0;
    this.totalX = totalX;
    this.totalY = totalY;
    this.colorList = colorList;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, (Math.PI / 180) * 360);
    this.ctx.fillStyle = `rgba(${this.colorList.toString()})`;
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    // 设置粒子需要移动的距离
    this.mx = this.totalX - this.x;
    this.my = this.totalY - this.y;
    // 设置粒子移动速度
    this.vx = this.mx / this.time;
    this.vy = this.my / this.time;
    // 更新粒子位置
    this.x += this.vx;
    this.y += this.vy;
    if (this.opacity < 1) this.opacity += 1 / this.time;
  }
}

onMounted(() => {
  board = new Board(canvas.value, logos);
});
const putImg = (index) => {
  board.init(index);
};
</script>
<style scoped lang="less">
.parctise-box {
  width: 90vw;
  align-items: center;
}

.footer {
  justify-content: center;

  .imgBtn {
    background-color: blue;
    border-radius: 5px;
    padding: 5px;
    margin-left: 10px;
  }
}
canvas {
  margin: auto;
}
</style>
