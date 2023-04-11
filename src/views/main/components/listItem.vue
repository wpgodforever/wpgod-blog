<template>
    <div class="container flex-col">
        <div @click="jump(item)" class="containerItem themeBg" v-for="(item, index) in list" :key="item.id">
            <div class="title">{{ item.title }}</div>
            <div class="tags flex-align">
                <div class="tagItem" v-if="!item.isTop" v-for="(tagsItem, tagsIndex) in item.tags" :key="tagsIndex">{{ tagsItem }}</div>
                <div class="tagItem isTop flex-align" v-if="item.isTop">
                    <el-icon><Top /></el-icon>置顶
                </div>
                <div class="autoBtn" v-if="isAdmin">
                    <el-button @click.stop="updateFn(item)" type="primary">修改</el-button>
                    <el-button v-if="!item.isTop" @click.stop="deleteFn(item)" type="danger">删除</el-button>
                </div>
                
            </div>
            <div class="date themeTip flex-align">
                <span>{{ '该文章发布于' + timeTransform(item.createdAt)  }}</span>
         <span>{{ '更新于' + timeTransform(item.updatedAt) }}</span>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, PropType } from 'vue'
import { timeTransform } from '@/lib/utils.js'
import { useRouter } from 'vue-router';
import { articleDeleteFn, } from '@/api/article/index';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
// 获取pinia用户数据
const user = useUserStore()
const { isAdmin } = storeToRefs(user)
const router = useRouter()
const props = defineProps({
    list: {
        type: Array as PropType<listItem[]>,
        default: [],
    },
})
interface listItem {
    title: string;
    id: string;
    tags: Array<string>;
    updatedAt: String;
    createdAt: String;
    isTop: Number;
}

const jump = (item) => {
    router.push({
        path: '/article/detail/' + item.id
    })
}

const updateFn = (item) => {
    router.push({
        path: '/article/update/' + item.id
    })
}

const emit = defineEmits(['deleteFn'])

const deleteFn = (item) => {
    ElMessageBox.confirm(
    '是否要删除该文章?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    articleDeleteFn({id:item.id}).then(res => {
        ElMessage.success('删除成功');
        emit('deleteFn')
    })
  }).catch(() => {
    
  })
   
}
</script>
<style scoped lang='less'>
.container {
    .containerItem {
        cursor: pointer;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .containerItem:hover{
        .autoBtn{
            display: block;
        }
    }
    .title {
        font-size: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .date {
        font-size: 14px;
        margin-top: 0px;
        justify-content: space-between;
    }

    .tags {
        flex-wrap: wrap;
        margin-top: 0px;
        height: 38px;
        .autoBtn{
            display: none;
            margin-left: auto;
        }
        .tagItem {
            color: #fff;
            height: 20px;
            line-height: 20px;
            padding: 0 5px;
            margin-right: 4px;
            font-size: 12px;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #20b041;
        }
        .isTop{
            background-color: black;
            padding-left: 2px;
            .el-icon{
                margin-right: 2px;
            }
        }
    }
}
</style>
