<template>
  <div class="main-container flex-col">
    <div class="banner flex-col">
      <h1>一砖一瓦，码出我的国度</h1>
      <h3>No Pain No Gain.</h3>
    </div>
    <div class="main">
      <!-- 左侧列表区域 -->
      <div class="main-left">
        <div class="list flex-col">
          <listItem :list="listInfo.list" @deleteFn="deleteFn"></listItem>
        </div>
      </div>
      <!-- 右侧信息卡片区域 -->
      <div class="main-right flex-col">
        <personCard :tagList="listInfo.tagList" :listNum="listInfo.list.length" :tagsNum="tagsNum"></personCard>
        <tagList :tagsClickList="articleInfo.tags" :tagList="listInfo.tagList" @tagClick="tagClick"></tagList>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import listItem from './components/listItem.vue'
import personCard from './components/personCard.vue'
import tagList from './components/tagList.vue'
import {
  articleListFn
} from '@/api/article/index'

// 获取文章列表----------------------------
const articleInfo = reactive({
  pageSize: 10,
  pageNo: 1,
  tags: [],
})

let listInfo = reactive({
  // 左侧文章列表
  list: [],
  // 右侧标签列表
  tagList: [],
})
let tagsNum = ref(0)
// 获取文章列表----------------------------
const articleList = () => {
  articleListFn(articleInfo).then(res => {
    // 将置顶文章筛选出来
    const topList = res.data.list.filter(v => v.isTop === 1)
    const bottomList = res.data.list.filter(v => v.isTop !== 1)
    listInfo.list = [...topList, ...bottomList]
    tagsNum.value = res.data.tagsNum
    listInfo.tagList = ['全部', ...res.data.tags] || []
  })
}
articleList()
// 删除文字触发--------------------
const deleteFn = () => {
  articleList()
}

// 右侧标签筛选被点击
const tagClick = (item) => {
  if (articleInfo.tags.indexOf(item) !== -1) {
    // 取消对应筛选
    articleInfo.tags.splice(articleInfo.tags.indexOf(item), 1)
  } else {
    if(item === '全部'){
      // 用户点击了全部，就清空筛选数组
      articleInfo.tags = []
    }else{
      // 用户点击的不是全部，之前已经选了全部，则取消全部被筛选状态
      if(articleInfo.tags.indexOf('全部')!== -1){
        articleInfo.tags.splice(articleInfo.tags.indexOf('全部'), 1)
      }
      articleInfo.tags.push(item)
    }
    
  }
  articleList()
}
</script>
<style scoped lang='less'>
.main-container {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  min-height: 100vh;
  background-color: rgba(244, 244, 244);

  .banner {
    height: 600px;
    background-image: url(../../assets/img/banner-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: -59px;
  }

  .main {
    box-sizing: border-box;
    width: 1200px;
    margin: 0 auto;
    padding: 30px 24px;
    display: flex;

    &-left {
      flex: 1;
      overflow: hidden;

      .list {
        width: 100%;

        .item {
          width: 100%;
          height: 100px;
          background-color: #fff;
        }
      }
    }

    &-right {
      width: 25%;
      margin-left: 45px;
      align-items: center;
    }
  }
}</style>
