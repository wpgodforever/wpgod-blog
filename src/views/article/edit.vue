<template>
  <div class="flex-col container">
    <div class="editor-box">
      <md-editor v-model="text" />
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
<style scoped lang='less'>
.container{
  min-height: 100vh;
}
 .editor-box{
   position: fixed;
   bottom: 0;
   width: 100%;
 }
</style>
