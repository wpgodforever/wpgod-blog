<template>
    <el-affix>
        <div class="headNav flex-align" :class="[showBorder?'':'noBorder']">
            <div class="nav-islogin">
                登录可以评论喔~
            </div>
            <el-input v-model="searchVal" style="width: 240px;" class="ml-auto" placeholder="Type something"
                :prefix-icon="Search"/>
            <div class="nav-list flex-align">
                <div class="nav-list_item">首页</div>
                <div class="nav-list_item">归档</div>
                <div class="nav-list_item">面试</div>
                <div class="nav-list_item">注册</div>
                <div class="nav-list_item">登录</div>
            </div>
        </div>
    </el-affix>
</template>
<script lang='ts' setup>
import { ref, reactive, computed } from 'vue'
import {useRouter} from 'vue-router'
import { Search } from '@element-plus/icons-vue'
const searchVal = ref('')
const router =useRouter()
const showBorder = computed(() => {
    console.log(router.currentRoute.value.path)
    return router.currentRoute.value.path !== '/index'
})
console.log(showBorder)
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
  .nav-list, .nav-islogin {
    display: none;
  }
}
</style>
