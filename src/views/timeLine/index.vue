<template>
    <div class="timeLine-container">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-timeline>
                    <el-timeline-item v-for="(item,index) in listInfo.list" :key="index" :class="[index%2 !== 0?'right':'']" center>
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
import {
  articleListFn
} from '@/api/article/index'
import { ref, reactive } from 'vue'
// 获取文章列表----------------------------
const articleInfo = reactive({
  pageSize:10,
  pageNo:1,
  tags:[],
})

let listInfo = reactive({
  list: []
})
let tagsNum = ref(0)
articleListFn(articleInfo).then(res => {
  listInfo.list.push(...res.data.list) 
  tagsNum.value = res.data.tagsNum
})
</script>
<style scoped lang='less'>
.timeLine-container {
    width: 80%;
    min-height: calc(100vh - 59px);
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
