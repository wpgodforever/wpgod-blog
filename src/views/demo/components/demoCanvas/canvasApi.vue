<template>
  <div class="parctise-box">
    <canvas ref="canvas" width="900" height="900"></canvas>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

// 获取canvas画布
const canvas = ref<HTMLCanvasElement>(null);
let ctx: CanvasRenderingContext2D;

const demoName = computed(() => {
  return route.name
})
const useMethod = computed(() => {
  return useMethods[demoName.value]
})
onMounted(() => {
  ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  useMethod.value()
})
const drawLine = () => {
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(100, 100)
  ctx.strokeStyle = '#fff'
  ctx.stroke()
  ctx.closePath()
}
const drawTwoLine = () => {
  ctx.moveTo(0, 150)
  ctx.lineTo(100, 150)
  ctx.strokeStyle = 'red'
  ctx.stroke()
  ctx.moveTo(0, 200)
  ctx.lineTo(100, 200)
  ctx.stroke()

}
const drawTrangle = () => {
  ctx.beginPath()
  ctx.moveTo(100, 0)
  ctx.lineTo(100, 50)
  ctx.lineTo(150, 50)
  ctx.lineTo(100, 0)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(160, 0)
  ctx.lineTo(160, 50)
  ctx.lineTo(210, 50)
  ctx.closePath()
  ctx.stroke()

}
const drawRect = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(0, 210, 200, 100)
  ctx.stroke()
  ctx.beginPath()
  ctx.strokeRect(0, 320, 200, 100)
  ctx.stroke()
  ctx.beginPath()
  ctx.fillRect(0, 440, 200, 100)
  ctx.stroke()
  ctx.clearRect(10, 460, 10, 10)

}

const drawCircle = () => {
  ctx.beginPath()
  ctx.arc(400, 200, 100, 0, Math.PI / 180 * 360)
  ctx.stroke()
  ctx.closePath()
  ctx.beginPath()
  ctx.arc(400, 310, 100, 0, Math.PI / 180 * 360)
  ctx.fill()
  ctx.closePath()
  ctx.beginPath()
  ctx.arc(600, 310, 100, 0, Math.PI / 180 * 270)
  ctx.fill()
  ctx.closePath()
}

const demo1 = () => {
  drawLine()
  drawTwoLine()
  drawTrangle()
  drawRect()
  drawCircle()
}
const demo2 = () => {
  drawLine()
}

const useMethods = {
  'baseApi': demo1,
  'baseStyle': demo2,
}
</script>
<style scoped lang='less'>
.parctise-box {

  height: 100%;

}

.border {
  border: 1px solid #fff;
}
</style>
