<template>
  <div class="main-container flex-col">
    <div class="banner">
      
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'

</script>
<style scoped lang='less'>
 .main-container{
   position: relative;
   top: -40px;
  .banner{
    width: 100%;
    height: 600px;
    background-image: url(../../assets/img/banner-bg1.png);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }
 }
</style>
