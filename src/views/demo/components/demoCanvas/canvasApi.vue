<template>
  <div class="parctise-box">
    <canvas ref="canvas" width="900" height="900"></canvas>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue'
// 获取canvas画布
const canvas = ref<HTMLCanvasElement>(null);
let ctx: CanvasRenderingContext2D;

onMounted(() => {
  ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  drawLine()
  drawTwoLine()
  drawTrangle()
})
const drawLine = () => {
  ctx.beginPath()
  ctx.moveTo(0,0)
  ctx.lineTo(100,100)
  ctx.strokeStyle = '#fff'
  ctx.stroke()
  ctx.closePath()
}
const drawTwoLine = () => {
  ctx.moveTo(0, 150)
  ctx.lineTo(100, 150)
  ctx.strokeStyle ='red'
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
  ctx.closePath()
}

</script>
<style scoped lang='less'>
 .parctise-box{

     height: 100%;
     
 }
 .border{
   border: 1px solid #fff;
 }
</style>
