<template>
  <div class="flex-col box">
    <canvas ref="canvas" width="1100" height="600"></canvas>
    <div>
      <el-button
        class="canvas-button"
        size="small"
        id="file-shot"
        type="primary"
        @click="shot"
        >截图</el-button
      >
      <el-button
        class="canvas-button"
        size="small"
        id="file-shot"
        type="primary"
        @click="swi"
        >切换</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { ScreenShot } from '@/lib/class'
const canvas = ref<HTMLCanvasElement>(null);
let screenShot = null;
const img = new Image();
onMounted(() => {
  img.src =
    'https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/headImg.jpg' +
    '?time=' +
    new Date().valueOf();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    // 实例化截图框类
    screenShot = new ScreenShot(canvas.value, img, 0, 0, 200, 200);
  };
});
// 点击截图
const shot = () => {
    screenShot.save();
};
// 点击截图
const swi = () => {
    img.src = 'https://p3-passport.byteimg.com/img/user-avatar/edcdbbde0d6f5cb89d7c28187ed55480~180x180.awebp'
    screenShot.init(canvas.value, img);
};
</script>
<style scoped lang="less">
.box {
  align-items: center;
}
.canvas-button {
  position: relative;
  margin: 10px;
  border: none;
  width: 5rem;
  height: 2rem;
  background-color: rgb(255, 157, 28);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #000;
  &:hover {
    background-color: rgb(255, 180, 83);
    transition: 0.3s all;
  }
}
#file-input {
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  opacity: 0;
}
</style>
