<template>
  <div class="main-container flex-col">
    <div class="banner flex-col">
      <h1>一砖一瓦，码出我的国度</h1>
        <h3>No Pain No Gain.</h3>
    </div>
    <div class="main">
      <div class="main-left">
        <div class="list flex-col">
          <listItem></listItem>
        </div>
      </div>
      <div class="main-right flex-col">
        <div class="main-right-img"></div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import listItem from './components/listItem.vue'
</script>
<style scoped lang='less'>
 .main-container{
  box-sizing: border-box;
   width: 100%;
   position: relative;
   min-height: 100vh;
   background-color: rgba(244, 244, 244);
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
  .main{
    width: 1200px;
    margin: 0 auto;
    padding: 30px 24px;
    display: flex;
    &-left{
      flex: 1;
      margin-right: 15px;
      overflow: hidden;
      
      .list{
        width: 100%;
        .item{
          width: 100%;
          height: 100px;
          background-color: #fff;
        }
      }
    }
    &-right{
      width: 25%;
      align-items: center;
      background-color: #fff;
      overflow: hidden;
      &-img{
        width: 50px;
        height: 50px;
      }
    }
  }
 }
</style>
