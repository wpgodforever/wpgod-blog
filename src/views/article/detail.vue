<template>
  <div class="editorBox flex-col">
    <div class="editorBox-detail">
      <MdEditor v-model.trim="text" previewOnly/>
      <div class="time flex-align">
         <span>{{ '该文章发布于' + timeTransform(createdAt)  }}</span>
         <span>{{ '更新于' + timeTransform(updatedAt) }}</span>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="commentBox">
      <myComment v-bind="$attrs" :list="list"  @commentSuccess="commentSuccess" @replySuccess="replySuccess" @replyDeepSuccess="replyDeepSuccess"></myComment>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useRoute } from 'vue-router';
import { timeTransform } from '@/lib/utils.js'
import {
  articleDetailFn
} from '@/api/article/index'
import myComment from '@/components/comment/index.vue'
const route = useRoute()
let text = ref('')
let updatedAt = ref('')
let createdAt = ref('')
const list = ref([])
const getCommentList = () => {
  articleDetailFn({_id:route.params.id}).then(res => {
  text.value = res.data[0].text
  list.value = res.data[0].coms
  updatedAt.value = res.data[0].updatedAt
  createdAt.value = res.data[0].createdAt
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
 .editorBox{
   align-items: center;
   background-color: #fff;
   min-height: calc(100vh - 59px);
  &-detail{
    width: 80%;
    .time{
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
  .commentBox{
    width: 80%;
  }
 }
</style>
