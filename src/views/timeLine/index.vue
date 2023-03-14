<template>
    <div class="timeLine-container">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-timeline>
                    <el-timeline-item v-for="(item,index) in list" :key="index" :class="[index%2 !== 0?'right':'']" center>
                        <timeLine v-bind="{...item}" :isRight="index%2 !== 0?true:false"></timeLine>
                    </el-timeline-item>
                </el-timeline>
            </el-col>
            <el-col :span="8">
                <div class="grid-content ep-bg-purple" />
            </el-col>
        </el-row>
    </div>
</template>
<script lang='ts' setup>
import timeLine from './components/timeItem.vue'
import { ref, reactive } from 'vue'
const list = reactive([
    {
        title:'这是文章标题',
        desc:'这是文章描述',
        img:'',
        date:'2023-10-10',
        id:1
    },
    {
        title:'这是文章标题',
        desc:'这是文章描述',
        img:'',
        date:'2023-10-10',
        id:2
    },
    {
        title:'这是文章标题',
        desc:'这是文章描述',
        img:'',
        date:'2023-10-10',
        id:3
    },
])
</script>
<style scoped lang='less'>
.timeLine-container {
    width: 80%;
    min-height: 100vh;
    background-color: #fff;
    margin: 0 auto;
}

:deep(.el-timeline-item__tail) {
    left: 50%;
}

:deep(.el-timeline-item__node) {
    left: calc(50% - 5px);
}

:deep(.el-timeline-item__wrapper) {
    left: calc(50% - 5px);
    width: 50% !important;
}

.right {

    :deep(.el-timeline-item__wrapper) {
        left: calc(0% - 45px)!important;
    }
}
</style>
