<template>
    <div class="headNav flex-align">
        <div>{{ user.userInfo.username }}</div>
        <div class="nav-list flex-align">
            <el-select v-show="tabNum === 0" ref="selectRef" v-on:keyup.enter="search" v-model="articleInfo.title" clearable filterable remote placeholder="请输入你想查的文章标题"
                :remote-method="filterMethod" :selectLoading="selectLoading">
                <el-option v-for="item in seletctOptions" :key="item.id" :label="item.title" :value="item.title" />
            </el-select>
            <div v-for="(item, index) in config" :key="index">
                <div class="nav-list_item" v-if="item.isAdmin === 0 || (item.isAdmin === 1 && isAdmin)"
                    @click="jump(item.path, index)">
                    <div class="hand" @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">{{ item.name }}
                    </div>
                </div>
            </div>


            <div class="nav-list_item" v-if="!userInfo.token" @click="popClick(0)">
                <div class="hand" @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">注册</div>
            </div>
            <div class="nav-list_item" v-if="!userInfo.token" @click="popClick(1)">
                <div class="hand" @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">登录</div>
            </div>
        </div>
    </div>
    <loginPop v-model="dialogVisible" :tips="tips"></loginPop>
</template>
<script lang='ts' setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import loginPop from '../loginPop/loginPop.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useLogin } from '@/hooks/useLogin'
import config from './headNavConfig.js'
import { useListStore } from '@/store/articleList'
onMounted(() => {
    // 导航栏颜色修改
    if (router.currentRoute.value.path !== '/index') {
        window.removeEventListener("scroll", scrollTopListener)
    } else {
        window.addEventListener("scroll", scrollTopListener, true)
    }

});

const router = useRouter()
const bgChange = computed(() => {
    return router.currentRoute.value.path !== '/index' || (scrollTop.value > 540)
})

const { dialogVisible, tips, popClick } = useLogin()

// 获取pinia用户数据
const user = useUserStore()
const { userInfo, isAdmin } = storeToRefs(user)


// 鼠标移入按钮动画
const hoverAnimation = ($event) => {
    $event.currentTarget.className = 'hand animate__animated animate__bounce'
}
const hoverAnimationLeave = ($event) => {
    $event.currentTarget.className = 'hand'
}

// 顶部导航栏颜色变化

const scrollTop = ref(0);//侧边栏初始高度
const scrollTopListener = () => {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
}

// 跳转方法
const tabNum = ref(0)
const jump = (url, index) => {
    tabNum.value = index
    router.push({
        path: url
    })
}

// 搜索框----------------------------------------------
const listStore = useListStore()
let { articleInfo, seletctOptions, selectLoading } = storeToRefs(listStore)
const filterMethod = (title: string) => {
    if (title) {
        selectLoading.value = true
        listStore.getArticleListTitle(title)
    } else {
        seletctOptions.value = []
    }
}
watch(
    () => articleInfo.value.title,
    (value) => {
        listStore.getArticleList(0)
    }
)


const selectRef = ref()
const search = (e) => {
    articleInfo.value.pageNo = 1
    articleInfo.value.tags = []
    articleInfo.value.title = e.target.value
    selectRef.value.blur()
}

</script>
<style scoped lang='less'>
.headNav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    color: #fff;
    backdrop-filter: blur(2px);
    padding: 10px;
    box-sizing: border-box;
    z-index: 10;

    .nav-islogin {
        font-size: 20px;
        font-weight: 700;
    }

    .nav-list {
        margin-left: auto;

        &_item {
            margin: 0 15px;
            padding: 10px 0;
        }
    }
}

// / orientation: portrait  竖屏状态
@media screen and (orientation: portrait) and (max-width: 720px) {

    .nav-list,
    .nav-islogin {
        display: none;
    }
}
</style>
