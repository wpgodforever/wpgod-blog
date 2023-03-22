<template>
    <div class="itemContainer flex-col" :class="[isRight ? 'right' : '']">
        <span class="title">{{ title }}</span>
        <span class="desc" :style="{
            color: colorInfo[Math.floor(Math.random() * 5 + 1)]
        }">{{ desc }}</span>
        <div class="img" v-if="cover">
            <img :src="cover" alt="" srcset="">
        </div>
        <span class="date">{{ timeTransform(createdAt) }}</span>
    </div>
</template>
<script lang='ts' setup>
import { timeTransform } from '@/lib/utils.js'
import { colorInfo } from '@/assets/js/color'
import { ref, reactive } from 'vue'
const props = defineProps({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    createdAt: {
        type: String
    },
    cover: {
        type: String
    },
    isRight: {
        type: Boolean
    }
})
</script>
<style scoped lang='less'>
.itemContainer {
    padding: 10px;
    border-bottom: 1px dashed #ccc;

    .title {
        font-weight: 700;
        font-size: 18px;
    }

    .desc {
        margin: 5px 0;
    }

    .img {
        width: 300px;
        height: 200px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .date {
        color: #6ca189;
    }
}

.itemContainer.right {
    padding: 10px;

    .title,
    .desc,
    .date {
        text-align: end;
    }
}</style>
