<template>
    <div class="container themeBg flex-col">
        <div class="container-img">
            <div class="test">
                <ProgressiveImage src="https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/headImg.jpg" />
            </div>
        </div>
        <div class="container-name">阿平要努力啊</div>
        <div class="container-msg flex-align">
            <div class="msgItem flex-col">
                <div>文章</div>
                <div class="msgItem-num">{{ listNum }}</div>
            </div>
            <el-divider direction="vertical" />
            <div class="msgItem">
                <div>标签</div>
                <div class="msgItem-num">{{ tagsNum }}</div>
            </div>
        </div>
        <el-button @click="handleFont(0)" class="hand" type="primary" color="#000" style="width: 70%;"
            :icon="Position">加入书签</el-button>
        <div class="container-btn flex-align">
            <i @click="handleFont(1)" class="iconfont icon-github hoverColor hand"></i>
            <i @click="handleFont(2)" class="iconfont icon-wechat hoverColor hand"></i>
            <i @click="handleFont(3)" class="iconfont icon-letter hoverColor hand"></i>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { ProgressiveImage } from "vue-progressive-image";
import { Position } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
    listNum: {
        type: Number,
        default: 0,
    },
    tagsNum: {
        type: Number,
        default: 0,
    },
})

const textConfig = {
    0: '按 CTRL + D 将本页加入书签',
    1: 'github地址: https://github.com/wpgodforever/wpgod-blog',
    2: '微信号: wp997587729',
    3: '邮箱地址: 9975877292@qq.com',
}

const handleFont = (index: 0 | 1 | 2 | 3) => {

    ElMessage({
        message: textConfig[index],
        type: 'success',
    })
}
</script>
<style scoped lang='less'>
.container {
    width: 100%;
    padding: 20px;
    border-radius: 20px;
    align-items: center;

    &-img {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        
        .test{
            position: absolute;
            height: 200px;
            width: 200px;
            transform: translateX(-25%);
        }
    }

    &-name {
        font-size: 24px;
        font-weight: 600;
        margin-top: 15px;
    }

    &-msg {
        width: 50%;
        justify-content: space-between;
        margin: 25px 0 20px 0;

        .msgItem {

            align-items: center;

            &-num {
                margin-top: 10px;
                font-weight: 600;
            }
        }
    }

    &-btn {
        width: 70%;
        justify-content: space-around;
        margin-top: 25px;

        i {
            font-size: 26px;
        }
    }
}

.hoverColor:hover {
    color: green;
}</style>
