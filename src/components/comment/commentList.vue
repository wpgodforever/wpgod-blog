<template>
  <div class="conmentListContainer">
    <commentItem v-for="(item, index) in list" :key="index" :info="item" v-bind="$attrs"></commentItem>
  </div>
</template>
<script lang='ts' setup>
import commentItem from './commentItem.vue';
import { ref, reactive } from 'vue'
const props = defineProps({
    list:{
        default:[]
    }
})
</script>
<style scoped lang='less'>
 .conmentListContainer{
     width: 100%;
 }
</style>
