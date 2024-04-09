<template>
  <!-- 写一个vue3的拖拽案例 -->
  <div class="drag-container">
    <div
      class="drag-item"
      ref="draggableDiv"
      draggable="true"
      @dragstart="dragStart($event)"
      @dragend="dragEnd($event)"
    >
      普通拖拽
    </div>
  </div>
</template>

<script lang="ts" name="" setup>
import { ref } from "vue";
// // 初始化可拖拽的 div 的引用
const draggableDiv = ref(null);
let dragStartX = 0;
let dragStartY = 0;
const dragStart = (event) => {
  dragStartX = event.clientX - draggableDiv.value.getBoundingClientRect().left;
  dragStartY = event.clientY - draggableDiv.value.getBoundingClientRect().top;
};
const dragEnd = (event) => {
  event.target.style.left = event.clientX - dragStartX + "px";
  event.target.style.top = event.clientY - dragStartY + "px";
};
</script>

<style scoped lang="less">
.drag-container {
  padding: 20px;
  box-sizing: border-box;
  .drag-item {
    position: absolute;
  }
}
</style>