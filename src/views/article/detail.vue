<template>
  <div class="editorBox flex-col">
    <div class="editorBox-detail">
      <MdEditor v-model.trim="text" previewOnly/>
    </div>
    <!-- 评论区域 -->
    <div class="commentBox">
      <myComment v-bind="$attrs" :list="list" @commentSuccess="commentSuccess"></myComment>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useRoute } from 'vue-router';
import {
  articleDetailFn
} from '@/api/article/index'
import myComment from '@/components/comment/index.vue'
const route = useRoute()
let text = ref('')
const list = ref([])
articleDetailFn({_id:route.params.id}).then(res => {
  console.log(res)
  text.value = res.data[0].text
  list.value = res.data[0].coms
})
const commentSuccess = () => {
  articleDetailFn()
}
</script>
<style scoped lang='less'>
 .editorBox{
   align-items: center;
   background-color: #fff;
  &-detail{
    width: 80%;
  }
  .commentBox{
    width: 80%;
  }
 }
</style>
