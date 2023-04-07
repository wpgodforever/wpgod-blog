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
//   const logos = reactive([
//       { label: "kazimierz", url: 'https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/headImg.jpg' },
//       { label: "rhine", url: 'https://p3-passport.byteimg.com/img/user-avatar/edcdbbde0d6f5cb89d7c28187ed55480~180x180.awebp' },
//   ]);
  const logos = reactive([
    { label: 'kazimierz', url: kazimierzUrl },
    { label: 'rhine', url: rhineUrl },
    { label: 'rhodes', url: rhodesUrl },
    { label: 'victoria', url: victoriazUrl },
    { label: 'yan', url: yanUrl },
    { label: "test", url: 'https://p3-passport.byteimg.com/img/user-avatar/edcdbbde0d6f5cb89d7c28187ed55480~180x180.awebp' },
  ]);
  let logoList = reactive([]);
  // 获取canvas画布
  const canvas = ref<HTMLCanvasElement>(null);
  let board;
  
  class Board {
    canvasDom: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    logoDotList = [];
    // logoList = []
    index: number = -1;
    constructor(canvasDom: HTMLCanvasElement, logos) {
      this.canvasDom = canvasDom;
      this.ctx = canvasDom.getContext('2d');
      logos.forEach((v) => {
        logoList.push(new Img(canvas.value, v.url));
      });
      this.animate()
    }
    changeImg(list){
        if(this.logoDotList.length === 0){//如果一开始没有选中图片，不需要对粒子做额外处理
            //注意 这里不可以直接.map(v=>{return v }) 会导致你选中的第一张图的粒子对象数组一直被更改，导致这张图切换后再切换回来会被上张图片粒子数据污染
            this.logoDotList = list.map(v=>{return new Dot(this.canvasDom, v.totalX, v.totalY, v.colorList) })
        }else{//如果切换图片的时候，已经存在粒子了，则对比前后两个粒子数组
              //已有的粒子替换为新的粒子，让过渡更丝滑
            let newArr = list//新粒子数组
            let newLen = newArr.length//新粒子数组长度
            let oldArr = this.logoDotList
            let oldLen = oldArr.length
            for(let i = 0;i < newLen; i++){
                const { totalX, totalY, colorList } = newArr[i];
                if(oldArr[i]){//如果旧数组有第i个粒子，改变其终点位置
                    oldArr[i].change(totalX, totalY, colorList)
                }else{//新数组的粒子长度比原数组多，就添加粒子
                    oldArr[i] = new Dot(this.canvasDom, totalX, totalY, colorList)
                }
            }
            // 新粒子数组较小 删除多余的粒子
            if (newLen < oldLen){
                this.logoDotList = oldArr.splice(0,newLen)
            }

            let len = this.logoDotList.length//获取处理完后的粒子数组长度
            while(len){//打乱数组中的粒子顺序
                let randomIdx = ~~(Math.random() * len--);
                let randomPrt = this.logoDotList[randomIdx];
                let { totalX: tx, totalY: ty, colorList } = randomPrt;

                // 交换目标位置与颜色
                randomPrt.totalX = this.logoDotList[len].totalX;
                randomPrt.totalY = this.logoDotList[len].totalY;
                randomPrt.colorList = this.logoDotList[len].colorList;
                this.logoDotList[len].totalX = tx;
                this.logoDotList[len].totalY = ty;
                this.logoDotList[len].colorList = colorList;
            }
        }
       
    }
    animate() {
      if (this.logoDotList.length > 0) {
        this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
        this.logoDotList.forEach((v) => {
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
    dotList;
  
    constructor(canvasDom: HTMLCanvasElement, src: string) {
      // 获取图片像素数据
      this.canvasDom = canvasDom;
      this.dotList = []
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
    change(totalX: number, totalY: number, colorList: number[]){
        this.totalX = totalX;
        this.totalY = totalY;
        this.colorList =[...colorList];
    }
  }
  
  onMounted(() => {
    board = new Board(canvas.value, logos);
  });
  const putImg = (index) => {
    board.changeImg(logoList[index].dotList);
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
  