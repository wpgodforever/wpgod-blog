<template>
  <div class="itemContainer flex-col" :class="[isRight?'right':'']">
   <span class="title">{{ title }}</span>
   <span class="desc" :style="{
       color: colorInfo[Math.floor(Math.random() * 5 + 1)]
   }">{{ desc }}</span>
   <div class="img" v-if="cover">
    <img :src="cover" alt="" srcset="">
</div>
   <span class="date">{{ timeTransform(createdAt) }}</span>
  </div>
</template>
<script lang='ts' setup>
import { timeTransform } from '@/lib/utils.js'
import { ref, reactive } from 'vue'
const props = defineProps({
    title: {
        type:String
    },
    desc: {
        type:String
    },
    createdAt: {
        type:String
    },
    cover: {
        type:String
    },
    isRight:{
        type: Boolean
    }
})
const colorInfo = reactive({
    1: 'coral',
    2: 'rgba(14, 143, 200, 0.8)',
    3: 'rgba(19, 206, 102, 0.8)',
    4: 'rgba(173, 12, 242, 0.8)',
    5: 'rgba(235, 12, 105, 0.8)',
})
</script>
<style scoped lang='less'>
 .itemContainer{
     padding: 10px;
     border-bottom: 1px dashed #ccc;
     .title{
         font-weight: 700;
         font-size: 18px;
     }
     .desc{
         margin: 5px 0;
     }
     .img{
         width: 300px;
         height: 200px;
         margin: 10px 0;
         object-fit: cover;
         overflow: hidden;
     }
     .date{
         color: #6ca189;
     }
 }
 .itemContainer.right{
     padding: 10px;
     .title, .desc, .date{
         text-align: end;
     }
 }
</style>
