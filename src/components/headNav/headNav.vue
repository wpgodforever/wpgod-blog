<template>
    <el-affix>
        <div class="headNav flex-align">
            <div class="nav-islogin">
                登录可以评论喔~
            </div>
            <el-input v-model="searchVal" style="width: 240px;" class="ml-auto" placeholder="Type something"
                :prefix-icon="Search" />
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
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
const searchVal = ref('')
</script>
<style scoped lang='less'>
.headNav {
    background-color: rgba(255, 255, 255, 0);
    padding: 15px 10px;
    border-bottom: 1px solid #eaecef;
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
