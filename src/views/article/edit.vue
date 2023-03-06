<template>
  <div class="editor-box">
    <md-editor v-model="text" />

  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
</script>
<style scoped lang='less'>
 .editor-box{
   margin-top: 30%;
 }
</style>
