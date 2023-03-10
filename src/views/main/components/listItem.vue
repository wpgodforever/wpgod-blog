<template>
    <div class="container flex-col">
        <div @click="jump(item)" class="containerItem" v-for="(item, index) in list" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="date">{{ timeTransform(item.updatedAt) }}</div>
            <div class="tags flex-align">
                <div class="tagItem" v-for="(tagsItem, tagsIndex) in item.tags" :key="tagsIndex">{{ tagsItem }}</div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, PropType } from 'vue'
import { timeTransform } from '@/lib/utils.js'
import { useRouter } from 'vue-router';
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
}

const jump = (item) => {
    router.push({
        path: '/article/detail/' + item.id
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
        background-color: #fff;
    }

    .title {
        font-size: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .date {
        color: rgba(0, 0, 0, .6);
        font-size: 14px;
        margin-top: 10px;
    }

    .tags {
        flex-wrap: wrap;
        margin-top: 10px;

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
    }
}
</style>
