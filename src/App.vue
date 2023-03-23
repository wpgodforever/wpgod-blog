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
  height: 100%;
  overflow: scroll;
  color: #fff;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}

.el-input{
  background: #1a1a1a;
}

html,body {
  height: 100%;
  overflow: scroll;
}
</style>
