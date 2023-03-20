<template>
    <div class="headNav flex-align" :class="[bgChange ? 'bgChange' : 'noBorder']">
        <div>{{ user.userInfo.username }}</div>
        <el-input v-model="searchVal" style="width: 240px;" class="ml-auto" placeholder="Type something"
            :prefix-icon="Search" />
        <div class="nav-list flex-align">
            <div class="nav-list_item" @click="jump('/index')">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)" >首页</div>
            </div>
            <div class="nav-list_item" @click="jump('/timeLine')">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)" >时间线</div>
            </div>
            <div class="nav-list_item" @click="jump('/demo')">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">练手实例</div>
            </div>
            <div class="nav-list_item" @click="jump('/board')">
                <div class="hand"  @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">留言建议</div>
            </div>
            <div class="nav-list_item" @click="jump('/article/edit')" v-if="userInfo.token && (userInfo.auth.includes('admin'))">
                <div class="hand" @mouseleave="hoverAnimationLeave" @mouseenter="hoverAnimation($event)">发布文章</div>
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
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import loginPop from '../loginPop/loginPop.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { useLogin } from '@/hooks/useLogin'
import { includes } from 'lodash'
onMounted(() => {
    // 导航栏颜色修改
    if(router.currentRoute.value.path !== '/index'){
        window.removeEventListener("scroll", scrollTopListener)
    }else{
        window.addEventListener("scroll", scrollTopListener, true);
    }
});

const searchVal = ref('')
const router = useRouter()
const bgChange = computed(() => {
    return router.currentRoute.value.path !== '/index' || (scrollTop.value>540)
})

const { dialogVisible, tips, popClick } = useLogin()

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

// 顶部导航栏颜色变化

const scrollTop = ref(0);//侧边栏初始高度
const scrollTopListener = () => {
    scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
}

// 跳转方法
const jump = (url, params={}) => {
    router.push({
        path: url,
        params
    })
}

</script>
<style scoped lang='less'>

.bgChange{
    background-color: #fff;
    color: #000!important;
}
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
