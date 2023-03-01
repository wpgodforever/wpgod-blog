<template>
  <div class="main-container flex-col">
    <div class="banner flex-col">
      <h1>一砖一瓦，码出我的国度</h1>
        <h3>No Pain No Gain.</h3>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'

</script>
<style scoped lang='less'>
 .main-container{
  box-sizing: border-box;
   width: 100%;
   position: relative;
   top: -40px;
  .banner{
    height: 600px;
    background-image: url(../../assets/img/banner-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 -100px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
 }
</style>
