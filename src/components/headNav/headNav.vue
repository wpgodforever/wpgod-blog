<template>
  <div class="headNav flex-align">
    <div class="nav-list flex-align">
        <div class="nav-list_item">首页</div>
        <div class="nav-list_item">归档</div>
        <div class="nav-list_item">面试</div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
</script>
<style scoped lang='less'>
 .headNav{
     background-color: pink;
     padding: 15px 10px;
     .nav-list{
         margin-left: auto;
         &_item{
             margin: 0 10px;
         }
     }
 }
</style>
