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
    this.init(canvasDom)
  }
  init(canvasDom){
    canvasDom.addEventListener('click',(e) => {
      console.log(1)
    })
  }
}

class Ball {

}
onMounted(() => {
  const ctx = canvas.value.getContext('2d');
  new Boom(canvas.value,20)

  // Click listener
  // canvas.value.addEventListener('click', function (event) {
  //   let x = event.clientX;
  //   let y = event.clientY;
  //   initParticles(config.particleNumber, x, y);
  // });

});
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
}
</style>
