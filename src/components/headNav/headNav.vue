<template>
    <div class="headNav flex-align" :class="[showBorder ? '' : 'noBorder']">
        <el-input v-model="searchVal" style="width: 240px;" class="ml-auto" placeholder="Type something"
            :prefix-icon="Search" />
        <div class="nav-list flex-align">
            <div class="nav-list_item">首页</div>
            <div class="nav-list_item">归档</div>
            <div class="nav-list_item">面试</div>
            <div class="nav-list_item" @click="popClick(0)">注册</div>
            <div class="nav-list_item" @click="popClick(1)">登录</div>
        </div>
    </div>
    <loginPop v-model="dialogVisible" :tips="tips"></loginPop>
</template>
<script lang='ts' setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import loginPop from '../loginPop/loginPop.vue'

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
