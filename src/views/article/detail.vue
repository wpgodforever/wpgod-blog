<template>
  <div class="editorBox">
    <MdEditor v-model.trim="text" previewOnly/>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
let text = ref('')
</script>
<style scoped lang='less'>
 
</style>
