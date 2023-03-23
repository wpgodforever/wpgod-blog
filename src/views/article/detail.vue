<template>
  <div class="editorBox flex-col">
    <div class="editorBox-detail">
      <MdEditor v-model.trim="text" previewOnly theme="dark"/>
      <div class="time flex-align">
        <span>{{ '该文章发布于' + timeTransform(createdAt) }}</span>
        <span>{{ '更新于' + timeTransform(updatedAt) }}</span>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="commentBox">
      <myComment
        v-bind="$attrs"
        :list="list"
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
let text = ref('');
let updatedAt = ref('');
let createdAt = ref('');
const list = ref([]);
const getCommentList = () => {
  articleDetailFn({ _id: route.params.id }).then((res) => {
    text.value = res.data[0].text;
    list.value = res.data[0].coms;
    updatedAt.value = res.data[0].updatedAt;
    createdAt.value = res.data[0].createdAt;
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
  &-detail {
    width: 100%;
    .time {
      justify-content: space-between;
      margin: 20px 0;
    }
  }
  .commentBox {
    width: 100%;
  }
}
.md-editor-dark {
  --md-bk-color: rgba(0, 0, 0,.1);
}
</style>
