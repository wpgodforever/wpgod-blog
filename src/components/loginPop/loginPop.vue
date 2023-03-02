<template>
  <el-dialog
    :value="dialogPopVisible"
    title="Tips"
    width="30%"
    :before-close="onBeforeClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary">
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
  dialogPopVisible: {
    type: Boolean,
    default: false
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
const emits = defineEmits(['update:dialogPopVisible'])
const popupWidth = computed(() => {
  return props.width || "550px";
});
const dialogTitle = computed(() => {
  return props.title || "标题";
});
const handleCancel = () => {
//   dialogPopVisible.value = false;
//   console.log(dialogPopVisible.value)
//   props.cancelClick();
emits('update:dialogPopVisible',false)
};
// const Save = () => {
//   dialogPopVisible.value = false;
//   props.saveClick('传值');
// };
const onBeforeClose = (done:any) => {
  done();
};
</script>
<style scoped lang='less'>
 
</style>
