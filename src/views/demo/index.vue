<template>
  <div class="demo-container">
    <div class="left">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
        <component :is="currentComponents"></component>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, shallowRef } from 'vue'
import test1 from './components/test1.vue';
import test from './components/test.vue';
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
//这里用ref的话，vue给出警告Vue接收到一个组件，该组件被制成反应对象。这可能会导致不必要的性能开销，应该通过将组件标记为“markRaw”或使用“shallowRef”而不是“ref”来避免。
// 如果使用 markRaw 那么currentComp将不永远不会再成为响应式对象。 所以得使用 shallowRef
let currentComponents = shallowRef(test)

</script>
<style scoped lang='less'>
 .demo-container{
     display: flex;
    min-height: calc(100vh - 59px);
     background-color: #fff;
     .left{
         width: 20%;
         min-height: calc(100vh - 59px);
         .el-menu{
             height: 100%;
         }
     }
     .right{
         flex: 1;
        min-height: calc(100vh - 59px);
     }
 }
</style>
