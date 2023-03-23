<template>
    <div class="timeLine-container themeBg">
        <el-row :gutter="20">
            <el-col :span="16">
                <div id="big">
                    <el-timeline>
                        <el-timeline-item hollow v-for="(item, index) in listInfo.list" :key="index" :id="item.id"
                            :class="[index % 2 !== 0 ? 'right' : '']" center>
                            <timeLine v-bind="{ ...item }" :isRight="index % 2 !== 0 ? true : false"></timeLine>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="linkBox themeText flex-col" id="smallBox">
                    <h2>锚点</h2>
                    <span class="hand" :id="item.id + 124" @click="scrollTo(item)" v-for="(item, index) in listInfo.list"
                        :key="index">{{ item.title
                        }}</span>
                </div>
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
    pageSize: 10,
    pageNo: 1,
    tags: [],
})

let listInfo = reactive({
    list: []
})
let tagsNum = ref(0)
articleListFn(articleInfo).then(res => {
    listInfo.list.push(...res.data.list)
    tagsNum.value = res.data.tagsNum
})
// 锚点滚动------------------------------------
const scrollTo = (item) => {
    const scrollId = item.id // 设置选中的锚点为当前点击的
    // 点击对应的时间轴的那一项
    const smallScrollBoxItem = document.getElementById(scrollId + 124)
    const smallScrollBox = document.getElementById('smallBox')
    // 点击对应的时间轴的那一项
    const bigScrollBoxItem = document.getElementById(scrollId)
    const bigOffsetTop = bigScrollBoxItem.offsetTop
    const smallOffsetTop = smallScrollBoxItem.offsetTop
    const bigScrollBox = document.getElementById('big')
    console.log(bigOffsetTop)
    bigScrollBox.scrollTo({
        behavior: 'smooth',
        top: bigOffsetTop - 62
    })
    // 父盒子滚动，而不是那一项滚动
    smallScrollBox.scrollTo({
        behavior: 'smooth',
        top: smallOffsetTop
    })
}
</script>
<style scoped lang='less'>
.timeLine-container {
    width: 70%;
    min-height: calc(100vh - 59px);
    margin: 0 auto;
    padding: 10px;
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
        left: calc(0% - 45px) !important;
    }
}

#big{
    max-height: 100vh;
    overflow: scroll;
}

.linkBox {
    position: sticky;
    top: 69px;
    border-radius: 20px;
    padding: 10px;
    margin-left: 30px;
    max-height: 50vh;
    overflow: scroll;

    span {
        margin-bottom: 15px;
        text-decoration: underline;
    }
}
</style>
