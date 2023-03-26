<template>
  <div class="parctise-box">
    <canvas ref="canvas" width="900" height="900"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

// 获取canvas画布
const canvas = ref<HTMLCanvasElement>(null);
let ctx: CanvasRenderingContext2D;

const demoName = computed(() => {
  return route.name;
});
const useMethod = computed(() => {
  return useMethods[demoName.value];
});
onMounted(() => {
  ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  useMethod.value();
});
const drawLine = () => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 100);
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.closePath();
};
const drawTwoLine = () => {
  ctx.moveTo(0, 150);
  ctx.lineTo(100, 150);
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.moveTo(0, 200);
  ctx.lineTo(100, 200);
  ctx.stroke();
};
const drawTrangle = () => {
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(160, 0);
  ctx.lineTo(160, 50);
  ctx.lineTo(210, 50);
  ctx.closePath();
  ctx.stroke();
};
const drawRect = () => {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 210, 200, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeRect(0, 320, 200, 100);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillRect(0, 440, 200, 100);
  ctx.stroke();
  ctx.clearRect(10, 460, 10, 10);
};

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(400, 200, 100, 0, (Math.PI / 180) * 360);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(400, 310, 100, 0, (Math.PI / 180) * 360);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(600, 310, 100, 0, (Math.PI / 180) * 270);
  ctx.fill();
  ctx.closePath();
};

const drawColor = () => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 100);
  ctx.strokeStyle = 'orange';
  ctx.stroke();
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      // 设置轮廓颜色
      ctx.strokeStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(
        255 - 42.5 * j
      )})`;
      ctx.beginPath();
      ctx.arc(200 + j * 25, 30 + i * 25, 10, 0, (360 * Math.PI) / 180, true);
      ctx.stroke();
    }
  }
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(50, 170, 250, 30);

  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.globalAlpha = 0.7;
  ctx.fillRect(50, 200, 250, 30);

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.globalAlpha = 0.4;
  ctx.fillRect(150, 180, 50, 40);
  ctx.beginPath();
  ctx.lineWidth = 1.0;
  ctx.moveTo(50, 50);
  ctx.lineTo(200, 50);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = '#fff';
  ctx.lineCap = 'butt';
  ctx.lineWidth = 2.0;
  ctx.moveTo(50, 275);
  ctx.lineTo(200, 275);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 4.0;
  ctx.lineCap = 'round';
  ctx.moveTo(50, 300);
  ctx.lineTo(200, 300);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 10.0;
  ctx.lineCap = 'square';
  ctx.moveTo(50, 325);
  ctx.lineTo(200, 325);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.setLineDash([]); //设定实线与空白的大小
  ctx.moveTo(50, 400);
  ctx.lineTo(250, 400);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([4]); //设定实线与空白的大小
  ctx.moveTo(50, 420);
  ctx.lineTo(250, 420);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([4, 2]); //设定实线与空白的大小
  ctx.moveTo(50, 440);
  ctx.lineTo(250, 440);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([10, 3, 1]); //设定实线与空白的大小
  ctx.moveTo(50, 460);
  ctx.lineTo(250, 460);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([10, 3, 3, 3, 3]); //设定实线与空白的大小
  ctx.moveTo(50, 480);
  ctx.lineTo(250, 480);
  ctx.stroke();

  ctx.beginPath();
  const lineGradient = ctx.createLinearGradient(20, 500, 160, 500);
  lineGradient.addColorStop(0, '#03a9f4');
  lineGradient.addColorStop(0.33, '#f441a5');
  lineGradient.addColorStop(0.66, '#ffeb3b');
  lineGradient.addColorStop(1, '#03a9f4');
  ctx.fillStyle = lineGradient;
  ctx.globalAlpha = 1;
  ctx.fillRect(20, 500, 140, 40);

  ctx.beginPath();
  const lineGradient1 = ctx.createLinearGradient(180, 500, 320, 540);
  lineGradient1.addColorStop(0, '#03a9f4');
  lineGradient1.addColorStop(0.33, '#f441a5');
  lineGradient1.addColorStop(0.66, '#ffeb3b');
  lineGradient1.addColorStop(1, '#03a9f4');
  ctx.fillStyle = lineGradient1;
  ctx.globalAlpha = 1;
  ctx.fillRect(180, 500, 140, 40);

  ctx.beginPath();
  const radgrad1 = ctx.createRadialGradient(400, 40, 10, 410, 40, 30);
  radgrad1.addColorStop(0, '#A7D30C');
  radgrad1.addColorStop(0.9, '#019F62');
  radgrad1.addColorStop(1, 'rgba(1,159,98,0)');

  ctx.fillStyle = radgrad1;
  ctx.fillRect(0, 0, 500, 400);
};

const demo1 = () => {
  drawLine();
  drawTwoLine();
  drawTrangle();
  drawRect();
  drawCircle();
};
const demo2 = () => {
  drawColor();
};
const demo3 = () => {
  drawColor();
};

const useMethods = {
  baseApi: demo1,
  baseStyle: demo2,
  baseText: demo3
};
</script>
<style scoped lang="less">
.parctise-box {
  height: 100%;
}

.border {
  border: 1px solid #fff;
}
</style>
