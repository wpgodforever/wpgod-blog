<template>
  <el-dialog
    v-model="dialogPopVisible"
    title="Tips"
    width="30%"
    :before-close="onBeforeClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogPopVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogPopVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang='ts' setup>
import { ref, computed, defineProps } from "vue";
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
});
const dialogPopVisible = ref(false); // 窗体显示控制
const popupWidth = computed(() => {
  return props.width || "550px";
});
const dialogTitle = computed(() => {
  return props.title || "标题";
});
const Cancel = () => {
  dialogPopVisible.value = false;
  props.cancelClick();
};
const Save = () => {
  dialogPopVisible.value = false;
  props.saveClick('传值');
};
const onBeforeClose = (done:any) => {
  done();
};
</script>
<style scoped lang='less'>
 
</style>
