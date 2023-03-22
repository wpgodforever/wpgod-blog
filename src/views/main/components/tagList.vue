<template>
    <div class="container flex-align">
        <div :class="[tagsClickList.includes(item)?'animateText':'']" class="item hand" @click="tagClick(item)" :style="{
            backgroundColor: colorInfo[Math.floor(Math.random() * 5 + 1)]
        }" v-for="(item, index) in tagList" :key="index"> {{ item }}</div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { colorInfo } from '@/assets/js/color'
const props = defineProps({
    tagList: {
        type: Array,
        default: () => [],
    },
    tagsClickList: {
        type: Array,
        default: () => [],
    },
})
const emit = defineEmits(['tagClick'])
const tagClick = (item) => {
    emit('tagClick',item)
}
</script>
<style scoped lang='less'>
.container {
    width: 100%;
    padding: 20px 20px 16px;
    border-radius: 20px;
    background-color: #fff;
    flex-wrap: wrap;
    margin-top: 20px;

    .item {
        color: #fff;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        font-size: 12px;
        border-radius: 4px;
        box-sizing: border-box;
        margin: 0 4px 4px 0;
        transition: all;
    }
}
</style>
