<template>
    <div class="conmentListContainer themeBg">
        <myComment v-bind="$attrs" :list="list"  @commentSuccess="commentSuccess" @replySuccess="replySuccess" @replyDeepSuccess="replyDeepSuccess"></myComment>
    </div>
  </template>
  <script lang='ts' setup>
  import { ref, reactive } from 'vue'
  import {
    boardList
} from '@/api/comment/index'
  import myComment from '@/components/comment/index.vue'
 
const list = ref([])
  const getCommentList = () => {
    boardList().then(res => {
        list.value = res.data
})
}
getCommentList()
const commentSuccess = () => {
  getCommentList()
}
const replySuccess = () => {
  getCommentList()
}
const replyDeepSuccess = () => {
  getCommentList()
}
  </script>
  <style scoped lang='less'>
   .conmentListContainer{
     z-index: 2;
       width: 70%;
       margin: 0 auto ;
       padding: 20px 10px;
       min-height: calc(100vh - 99px);
   }
  </style>
  