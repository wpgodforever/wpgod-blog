<template>
    <div class="container flex-col">
        <div class="containerItem" v-for="(item,index) in props.list" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="date">{{  item.updatedAt }}</div>
            <div class="tags flex-align" >
                <div class="tagItem" v-for="(tagsItem,tagsIndex) in item.tags" :key="tagsIndex">{{ tagsItem }}</div>
            </div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, PropType  } from 'vue'
import { timeTransform } from '@/lib/utils.js'
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
</script>
<style scoped lang='less'>
.container {
    .containerItem{
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
            font-size: 16px;
            padding: 2px 5px;
            margin-right: 10px;
            border-radius: 5px;
            background-color: pink;
        }
    }
}</style>
