<template>
    <div class="headNav flex-align" :class="[showBorder ? '' : 'noBorder']">
        <el-input v-model="searchVal" style="width: 240px;" class="ml-auto" placeholder="Type something"
            :prefix-icon="Search" />
        <div class="nav-list flex-align">
            <div class="nav-list_item">首页</div>
            <div class="nav-list_item">归档</div>
            <div class="nav-list_item">面试</div>
            <div class="nav-list_item" @click="popClick">注册</div>
            <div class="nav-list_item" @click="popClick">登录</div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
let { proxy }:any = getCurrentInstance();
const searchVal = ref('')
const router = useRouter()
const showBorder = computed(() => {
    return router.currentRoute.value.path !== '/index'
})
const popClick = () => {
    proxy.$loginPop({
    title: "title",
    width: "550px",
    option: {

    },
    cancelClick: () => {},
    saveClick: async (val) => {
      console.log(val)
    },
  }
)
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
