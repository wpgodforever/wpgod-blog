<template>
  <el-dialog
    title="Tips"
    width="30%"
    :before-close="onBeforeClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="Save">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang='ts' setup>
import { ref, computed, defineProps, getCurrentInstance } from "vue";
let { proxy }:any = getCurrentInstance();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "550px",
  },
  option: {
    type: Object,
    default: {
      //可传递其他值
    },
  },
  cancelClick: {
    type: Function,
    default: () => {},
  },
  saveClick: {
    type: Function,
    default: () => {},
  },
  remove: {
    type: Function,
    default: () => {},
  },
});
const popupWidth = computed(() => {
  return props.width || "550px";
});
const dialogTitle = computed(() => {
  return props.title || "标题";
});
const handleCancel = () => {
  // 两种关闭方法
  // console.log(document.getElementById('loginPop1'))
  // document.getElementById('loginPop1').remove()
  props.remove()
};
const Save = () => {
  props.remove()
};
const onBeforeClose = (done:any) => {
  done();
};

</script>
<style scoped lang='less'>
 
</style>
