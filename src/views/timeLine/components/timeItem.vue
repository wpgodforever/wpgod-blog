<template>
  <div class="itemContainer flex-col" :class="[isRight?'right':'']">
   <span class="title" >{{ title }}</span>
   <span class="desc">{{ desc }}</span>
   <div class="img" v-if="img">{{ img}}</div>
   <span class="date">{{ date }}</span>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
const props = defineProps({
    title: {
        type:String
    },
    desc: {
        type:String
    },
    date: {
        type:String
    },
    img: {
        type:String
    },
    isRight:{
        type: Boolean
    }
})
</script>
<style scoped lang='less'>
 .itemContainer{
     padding: 10px;
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
         background-color: pink;
         margin: 10px 0;
     }
 }
 .itemContainer.right{
     padding: 10px;
     .title, .desc, .date{
         text-align: end;
     }
 }
</style>
