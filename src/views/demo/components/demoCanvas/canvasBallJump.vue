<template>
  <div class="canvas-container">
    <canvas ref="canvas" width="650" height="500"></canvas>
    随便点点呗
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Ball } from '@/lib/class'
const canvas = ref<HTMLCanvasElement>();
let ball = null;



onMounted(() => {
  ball = new Ball(canvas.value);
  canvas.value.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    
    ball.add(offsetX, offsetY);
  });
});
</script>

<style lang="less" scoped>
canvas {
  border: 1px solid #fff;
}
</style>
