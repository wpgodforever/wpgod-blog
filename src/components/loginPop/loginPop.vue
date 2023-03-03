<template>
    <el-dialog :modelValue="dialogVisible" title="Tips" width="30%" :before-close="onBeforeClose">
        <span>This is a message</span>
        <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">Cancel</el-button>
                <el-button type="primary" @click="Save">
                    Confirm
                </el-button>
            </span>
        </template> -->
    </el-dialog>
</template>
<script lang='ts' setup>
import { ref, computed, defineProps, getCurrentInstance } from "vue";
let { proxy }: any = getCurrentInstance();
const props = defineProps({
    dialogVisible: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:dialogVisible'])

const onBeforeClose = (done: any) => {
    emit('update:dialogVisible',false)
    // done()
};

</script>
<style scoped lang='less'>
// :deep(.el-dialog){
//     border-radius: 20px;
// }

</style>
