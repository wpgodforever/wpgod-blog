<template>
    <div class="headNav flex-align" :class="[showBorder ? '' : 'noBorder']">
        <div>{{ user.userInfo.username }}</div>
        <el-input v-model="searchVal" style="width: 240px;" class="ml-auto" placeholder="Type something"
            :prefix-icon="Search" />
        <div class="nav-list flex-align">
            <div class="nav-list_item">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">首页</div>
            </div>
            <div class="nav-list_item">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">归档</div>
            </div>
            <div class="nav-list_item">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">面试</div>
            </div>
            <div class="nav-list_item" v-if="userInfo.token && (userInfo.auth.includes('admin'))">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">发布文章</div>
            </div>
            <div class="nav-list_item" v-if="!userInfo.token"
            @click="popClick(0)">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">注册</div>
            </div>
            <div class="nav-list_item" v-if="!userInfo.token"
            @click="popClick(1)">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">登录</div>
            </div>
        </div>
    </div>
    <loginPop v-model="dialogVisible" :tips="tips"></loginPop>
</template>
<script lang='ts' setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import loginPop from '../loginPop/loginPop.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { includes } from 'lodash'

const searchVal = ref('')
const router = useRouter()
const showBorder = computed(() => {
    return router.currentRoute.value.path !== '/index'
})

// 登录注册弹框逻辑
const dialogVisible = ref(false)
const tips = ref('登录')
const popClick = (index:0|1) => {
    const textConfig = {
        0: '注册',
        1: '登录'
    }
    tips.value = textConfig[index]
    dialogVisible.value = true
}

// 获取pinia用户数据
const user = useUserStore()
const { userInfo } = storeToRefs(user)


// 鼠标移入按钮动画
const hoverAnimation = ($event) => {
    $event.currentTarget.className = 'hand animate__animated animate__bounce'
}
const hoverAnimationLeave = ($event) => {
    $event.currentTarget.className = 'hand'
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
    border-bottom: 1px solid #eaecef;
    box-sizing: border-box;
    z-index: 10;

    .nav-islogin {
        font-size: 20px;
        font-weight: 700;
    }

    .nav-list {
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
}</style>
