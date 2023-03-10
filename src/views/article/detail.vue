<template>
  <div class="editorBox flex-col">
    <div class="editorBox-detail">
      <MdEditor v-model.trim="text" previewOnly/>
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
const route = useRoute()
let text = ref('')
articleDetailFn({_id:route.params.id}).then(res => {
  console.log(res)
  text.value = res.data[0].text
})
</script>
<style scoped lang='less'>
 .editorBox{
   align-items: center;
  &-detail{
    width: 80%;
  }
 }
</style>
