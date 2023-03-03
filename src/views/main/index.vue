<template>
  <div class="main-container flex-col">
    <div class="banner flex-col">
      <h1>一砖一瓦，码出我的国度</h1>
      <h3>No Pain No Gain.</h3>
    </div>
    <div class="main">
      <!-- 左侧列表区域 -->
      <div class="main-left">
        <div class="list flex-col">
          <listItem></listItem>
        </div>
      </div>
      <!-- 右侧信息卡片区域 -->
      <div class="main-right flex-col">
        <personCard></personCard>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import listItem from './components/listItem.vue'
import personCard from './components/personCard.vue'
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
    background-image: url(../../assets/img/banner-bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .main{
    box-sizing: border-box;
    width: 1200px;
    margin: 0 auto;
    padding: 30px 24px;
    display: flex;
    &-left{
      flex: 1;
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
      margin-left: 45px;
      align-items: center;
    }
  }
 }
</style>
