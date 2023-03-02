<template>
  <div class="container flex-col">
    <div class="title">标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试标题测试</div>
    <div class="date">2023-03-02</div>
    <div class="tags flex-align">
        <div class="tagItem">css</div>
        <div class="tagItem">js</div>
        <div class="tagItem">ts</div>
        <div class="tagItem">日记</div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
</script>
<style scoped lang='less'>
 .container{
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    .title{
        font-size: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .date{
        color: rgba(0,0,0,.6);
        font-size: 14px;
        margin-top: 10px;
    }
    .tags{
        flex-wrap: wrap;
        margin-top: 10px;
        .tagItem{
            color: #fff;
            font-size: 16px;
            padding: 2px 5px;
            margin-right: 10px;
            border-radius: 5px;
            background-color: pink;
        }
    }
 }
</style>
