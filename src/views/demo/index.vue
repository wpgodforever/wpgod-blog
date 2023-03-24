<template>
  <div class="demo-container">
    <div class="left">
        <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <el-menu-item :index="demoIndex + ''" v-for="(demoItem,demoIndex) in demoConfig">
        {{ demoItem.name }}
      </el-menu-item>
          
      </el-menu>
    </div>
    <div class="right">
        <RouterView></RouterView>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, shallowRef } from 'vue'
import demoConfig from './demoConfig.js' 
const activeIndex = ref('0')
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>
<style scoped lang='less'>
 .demo-container{
     display: flex;
    min-height: calc(100vh - 59px);
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
     .el-menu{
       background-color: rgba(0,0,0,0);
       
     }
     .el-menu-item{
      color: #fff;
     }
     .el-menu-item:hover{
      background-color: rgba(0,0,0,0);
     }
     .el-menu-item.is-active{
      color: #409eff!important;
     }
 }
</style>
