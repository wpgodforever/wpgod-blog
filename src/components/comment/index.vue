<!-- 普通评论输入框 -->
<template>
  <div class="container flex-align">
    <el-avatar :size="50" :src="circleUrl" />
    
    <div class="loginBox" v-if="!isLogin">
        看完啦，<span class="hand" @click="popClick(1)">登录</span>分享一下感受吧~
    </div>
    <div class="inputBox" v-else></div>
    <loginPop v-model="dialogVisible" :tips="tips"></loginPop>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import loginPop from '@/components/loginPop/loginPop.vue'
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl, } = toRefs(state)
// 获取pinia用户数据
const user = useUserStore()
// 获取是否登录
const { isLogin } = storeToRefs(user)
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
.container{
    margin-bottom: 20px;
}
 .inputBox, .loginBox{
     margin: 0 0 0px 20px;
     width: 100%;
     height: 80px;
     border-radius: 10px;
     overflow: hidden;
 }
 .loginBox{
    background-color: #f2f3f5;
    line-height: 80px;
    text-align: center;
    span{
        color: #1e80ff;
    }
 }
</style>
