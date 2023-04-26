<template>
  <div class="main-container flex-col">
    <div class="banner flex-col">
      <div class="banner-particle">
        <particleText></particleText>
      </div>
      <div class="banner-bg">
        <ProgressiveImage src="https://wpbucket124.oss-cn-guangzhou.aliyuncs.com/public/assets/banner-bg.png" />
      </div>
    </div>
    <div class="main">
      <!-- 左侧列表区域 -->
      <div class="main-left">
        <div class="list flex-col">
          <listItem v-loading="loading" element-loading-background="rgba(21, 24, 34,.7)" :list="listInfo.list"
            @deleteFn="deleteFn"></listItem>
          <el-divider class="hand" content-position="center" @click="loadMore">{{hasMore? '获取更多': '没有更多了'}}</el-divider>
        </div>
      </div>
      <!-- 右侧信息卡片区域 -->
      <div class="main-right flex-col">
        <personCard :tagList="listInfo.tagList" :listNum="total" :tagsNum="tagsNum"></personCard>
        <tagList :tagsClickList="articleInfo.tags" :tagList="listInfo.tagList" @tagClick="tagClick"></tagList>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, onMounted, onActivated } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import listItem from './components/listItem.vue'
import personCard from './components/personCard.vue'
import tagList from './components/tagList.vue'
import particleText from '@/components/particleText/index.vue'
import { ProgressiveImage } from "vue-progressive-image";
import {
  articleListFn
} from '@/api/article/index'

const route = useRoute()
const router = useRouter()

// 获取文章列表----------------------------
let loading = ref(false)
let total = ref(0)
let hasMore = ref(true)

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

const articleList = (index: number) => {//0:刷新 1:加载更多
  loading.value = true
  articleListFn(articleInfo).then(res => {
    const { data } = res
    if (index === 0) {
      listInfo.list = []
    }
    const list = [...listInfo.list, ...data.list]
    // 将置顶文章筛选出来
    const topList = list.filter(v => v.isTop === 1)
    const bottomList = list.filter(v => v.isTop !== 1)
    listInfo.list = [...topList, ...bottomList]
    tagsNum.value = data.tagsNum
    listInfo.tagList = ['全部', ...data.tags] || []
    total.value = data.total
    loading.value = false
    if (data.total <= articleInfo.pageSize * articleInfo.pageNo) {
      hasMore.value = false
    }
  })
}

// 删除文字触发--------------------
const deleteFn = () => {
  articleList(0)
}

onMounted(() => {
  articleList(0)
})

onActivated(() => {
  // router.options.history.state.forward用于判断是否是返回操作，null代表不是返回操作
  //并且之前的页面要是从修改详情过来才会重置页面
  if ((router.options.history.state.back as string).indexOf('update') !== -1 && !router.options.history.state.forward) {
    articleInfo.pageNo = 1
    articleList(0)
  }
})

// 右侧标签筛选被点击
const tagClick = (item) => {
  // 点了标签就重置页码
  articleInfo.pageNo = 1
  if (articleInfo.tags.indexOf(item) !== -1) {
    // 取消对应筛选
    articleInfo.tags.splice(articleInfo.tags.indexOf(item), 1)
  } else {
    if (item === '全部') {
      // 用户点击了全部，就清空筛选数组
      articleInfo.tags = []
    } else {
      // 用户点击的不是全部，之前已经选了全部，则取消全部被筛选状态
      if (articleInfo.tags.indexOf('全部') !== -1) {
        articleInfo.tags.splice(articleInfo.tags.indexOf('全部'), 1)
      }
      articleInfo.tags.push(item)
    }

  }
  articleList(0)
}

// 获取更多
const loadMore = () => {
  if(!hasMore.value) return
  articleInfo.pageNo++
  articleList(1)
}
</script>
<style scoped lang='less'>
.main-container {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  min-height: 100vh;
  // background-color: rgba(244, 244, 244);
  z-index: 2;

  .banner {
    position: relative;
    height: 600px;
    // background-image: url(../../assets/img/banner-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-top: -59px;

    &-bg {
      position: absolute;
      height: 600px;
      width: 100%;
      object-fit: cover;
      overflow: hidden;
    }

    &-particle {
      z-index: 3;
    }

    h1,
    h3 {
      z-index: 2;
    }
  }

  .main {
    box-sizing: border-box;
    width: 1200px;
    margin: 0 auto;
    padding: 30px 24px;
    display: flex;

    &-left {
      flex: 1;
      // overflow: hidden;

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
}

:deep(.el-divider__text) {
  background-color: rgba(18, 22, 31, 1) !important;
  color: #fff !important;
}</style>
