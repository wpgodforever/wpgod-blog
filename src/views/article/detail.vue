<template>
  <div class="editorBox flex-col">
    <h1 class="editorBox-title">
      {{ info.title }}
    </h1>
    <div class="editorBox-detail">
      <div class="time flex-align">
        <span>{{ '该文章发布于' + timeTransform(info.createdAt) }}</span>
        <span>{{ '更新于' + timeTransform(info.updatedAt) }}</span>
      </div>
      <MdEditor v-model.trim="info.text" previewOnly previewTheme="mk-cute" theme="dark"/>
      
    </div>
    <!-- 评论区域 -->
    <div class="commentBox">
      <myComment
        v-bind="$attrs"
        :list="info.coms"
        @commentSuccess="commentSuccess"
        @replySuccess="replySuccess"
        @replyDeepSuccess="replyDeepSuccess"
      ></myComment>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useRoute } from 'vue-router';
import { timeTransform } from '@/lib/utils.js';
import { articleDetailFn } from '@/api/article/index';
import myComment from '@/components/comment/index.vue';
const state = reactive({
  text: '',
  theme: 'dark'
});
const route = useRoute();
const info = reactive({
  text:'',
  updatedAt:'',
  createdAt:'',
  coms:[],
  tags:[],
  title:'',
})
const getCommentList = () => {
  articleDetailFn({ _id: route.params.id }).then((res) => {
    for(let i in info){
      info[i] = res.data[0][i]
    }
    console.log(info.coms)
  });
};
getCommentList();
const commentSuccess = () => {
  getCommentList();
};
const replySuccess = () => {
  getCommentList();
};
const replyDeepSuccess = () => {
  getCommentList();
};
</script>
<style scoped lang="less">
.editorBox {
  box-sizing: border-box;
  width: 80%;
  align-items: center;
  min-height: calc(100vh - 59px);
  margin: 0 auto;
  padding: 20px 40px;
  &-title{
    width: 100%;
    color: #999999;
  }
  &-detail {
    width: 100%;
    .time {
      justify-content: space-between;
      margin: 0 0 20px 0;
    }
  }
  .commentBox {
    width: 100%;
    margin-top: 20px;
  }
}
.md-editor-dark {
  --md-bk-color: rgba(0, 0, 0,.1);
}
</style>
