<template>
    <div class="parctise-box">
        <canvas ref="canvas" width="1100" height="400"></canvas>
        <div class="btnBox flex-align"><el-button type="primary" @click="reColor">反色图</el-button>
            <el-button type="primary" @click="turnGray">灰度图</el-button>
            <el-button type="primary" @click="turnLignt">升高亮度</el-button>
            <el-button type="primary" @click="turnDark">降低亮度</el-button>
            <el-button type="primary" @click="turnMask">蒙版</el-button>
            <el-button type="primary" @click="turnOpacity">透明</el-button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, } from 'vue';

// 获取canvas画布
const canvas = ref<HTMLCanvasElement>(null);
let ctx: CanvasRenderingContext2D;
const img = new Image()
onMounted(() => {
    ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    img.src = 'https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/headImg.jpg'+ '?time=' + new Date().valueOf();
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
        ctx.drawImage(img, 400, 150, 250, 150)
    }
});
const reColor = () => {
    ctx.beginPath()
    const imgData = ctx.getImageData(400, 150, 250, 150)
    const data = imgData.data
    console.log(imgData)
    for(let i =0; i<data.length; i+=4){
        data[i] = 255 - data[i]
        data[i + 1] = 255 - data[i +1]
        data[i + 2] = 255 - data[i +2]
    }
    ctx.putImageData(imgData,750,150)
}

const turnGray = () => {
    ctx.beginPath()
    const imgData = ctx.getImageData(400, 150, 250, 150)
    const data = imgData.data
    console.log(imgData)
    for(let i =0; i<data.length; i+=4){
        const average = (data[i] + data[i + 1] + data[i + 2])/3
        data[i] = average
        data[i + 1] = average
        data[i + 2] = average
    }
    ctx.putImageData(imgData,750,150)
}
const turnLignt = () => {
    ctx.beginPath()
    const imgData = ctx.getImageData(400, 150, 250, 150)
    const data = imgData.data
    console.log(imgData)
    for(let i =0; i<data.length; i+=4){
        data[i] = data[i] +130
        data[i + 1] = data[i +1] +130
        data[i + 2] = data[i +2] +130
    }
    ctx.putImageData(imgData,750,150)
}
const turnDark = () => {
    ctx.beginPath()
    const imgData = ctx.getImageData(400, 150, 250, 150)
    const data = imgData.data
    console.log(imgData)
    for(let i =0; i<data.length; i+=4){
        data[i] = data[i] -130
        data[i + 1] = data[i +1] -130
        data[i + 2] = data[i +2] -130
    }
    ctx.putImageData(imgData,750,150)
}

const turnMask = () => {
    ctx.beginPath()
    ctx.drawImage(img,750, 150, 250, 150)
    ctx.beginPath()
    ctx.fillStyle = '#ccc'
    ctx.globalAlpha = 0.3
    ctx.fillRect(750, 150, 250, 150)
}

const turnOpacity = () => {
    ctx.beginPath()
    const imgData = ctx.getImageData(400, 150, 250, 150)
    const data = imgData.data
    console.log(imgData)
    for(let i =0; i<data.length; i+=4){
        data[i + 3] = data[i + 3] -130
    }
    ctx.putImageData(imgData,750,150)
}


</script>
<style scoped lang="less">
.parctise-box {
    height: 100%;
}

.btnBox {
    width: 100%;
    justify-content: center;
}
</style>
  