<template>
    <div class="conmentListContainer">
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
        console.log(res.data,'------------------')
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
       width: 70%;
       margin: 0 auto ;
       background-color: #FFF;
       padding: 20px 10px;
       min-height: calc(100vh - 99px);
   }
  </style>
  