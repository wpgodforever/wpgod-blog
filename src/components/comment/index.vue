<!-- 普通评论输入框 -->
<template>
    <div class="container flex-col">
        <div class="headComment flex">
            <el-avatar :size="50" :src="circleUrl" />
            <!-- 未登录时显示 -->
            <div class="loginBox themeTextBg" v-if="!isLogin">
                看完啦，<span class="hand" @click="popClick(1)">登录 </span>分享一下感受吧~
            </div>
            <!-- 登录时显示 -->
            <div class="inputBox" v-else>
                <el-input style="white-space: pre-line" v-model="content" :autosize="{ minRows: 4 }" type="textarea"
                    placeholder="请留下你的评论吧~" />
                <el-button @click="send" :disabled="!content" type="primary">发表评论</el-button>
            </div>
        </div>
        <commentList v-bind="$attrs"></commentList>
        <loginPop v-model="dialogVisible" :tips="tips"></loginPop>
    </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs, toRaw } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import loginPop from '@/components/loginPop/loginPop.vue'
import { useLogin } from '@/hooks/useLogin'
import { ElMessage } from 'element-plus'
import { commentInput } from '@/api/comment'
import { useRoute } from 'vue-router';
import commentList from './commentList.vue'
const route = useRoute()
const emit = defineEmits(['commentSuccess'])
const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl, } = toRefs(state)
// 获取pinia用户数据
const user = useUserStore()
// 获取是否登录
const { isLogin, userId } = storeToRefs(user)
// 登录注册弹框逻辑
const { dialogVisible, tips, popClick } = useLogin()
// 评论功能
const content = ref('')
const send = () => {
    if (!content.value.trim()) {
        ElMessage({
            message: '不可输入纯空格',
            center: true,
            type: 'error',
        })
    }
    commentInput({
        content: content.value,
        article_id: route.params.id || null,
        reply_user_id: userId.value
    }).then(res => {
        ElMessage({
            message: '评论成功',
            center: true,
            type: 'success',
        })
        content.value = ''
        emit('commentSuccess')
    })
}
</script>
<style scoped lang='less'>
.container {
    margin-bottom: 20px;
    .headComment{
        display: flex;
    }
}

.inputBox,
.loginBox {
    flex: 1;
    margin: 0 0 20px 20px;
    width: 100%;
    min-height: 80px;
    border-radius: 10px;
    padding-right: 10px;
}

.loginBox {
    line-height: 80px;
    text-align: center;

    span {
        color: #1e80ff;
    }
}

.inputBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .el-button {
        margin-top: 20px;
    }
}
:deep(.el-textarea){
  --el-input-bg-color: #232323!important;
  --el-input-text-color: #fff;
}
</style>
