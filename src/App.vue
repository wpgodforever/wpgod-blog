<template>
  <div id="app">
    <starBg></starBg>
    <router-view></router-view>
  </div>
</template>
<script lang='ts' setup name="App">
import starBg from '@/components/starBg/index.vue'
</script>
<style>
 #app {
  font-family: Microsoft YaHei;
  width: 100%;
  color: #fff;
}
::-webkit-scrollbar {
  width: 10px;
  background-color: #686868;
  z-index: 2;
}
::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: #424242;
}

.el-input{
  background: #1a1a1a;
}
</style>
