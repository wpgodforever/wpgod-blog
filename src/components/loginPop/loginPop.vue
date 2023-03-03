<template>
    <div>
        <el-dialog :modelValue="modelValue" width="40%" :before-close="onBeforeClose">
            <div class="login-box flex-col">
                <div class="text-line flex-align">
                    <transition-group @after-enter="transitionComplete" @before-leave="transitionleave" leave-active-class="animate__animated animate__rollOut" enter-active-class="animate__animated animate__rollIn">
                        <div v-for="(item, index) in textList" :key="index" >
                            {{ item }}
                        </div>
                    </transition-group>
                </div>
                
                <el-input
                  v-model="nameVal"
                  placeholder="Please input name"
                  :prefix-icon="User"
                  maxlength="10"
                />
                <el-input
                  v-model="passwordVal"
                  type="password"
                  placeholder="Please input password"
                  show-password
                  :prefix-icon="User"
                />
            </div>
        </el-dialog>
    </div>
</template>
<script lang='ts' setup>
import { ref, computed, getCurrentInstance } from "vue";
import { User } from '@element-plus/icons-vue'
let { proxy }: any = getCurrentInstance();
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    tips: {
        type: String,
        default: '注册',
    },
});

const emit = defineEmits(['update:modelValue'])

const onBeforeClose = (done: any) => {
    emit('update:modelValue',false)
    // done()
};

const handleCancel = () => {
    emit('update:modelValue',false)
}

// 注册逻辑
const nameVal = ref('')
const passwordVal = ref('')


// 输入动画逻辑
// 输入动画效果需要将输入的字符串变成数组
const textList = computed(() => {
    return nameVal.value.length? nameVal.value.split('') : []
})
// 在animate进入动画完成后，再添加一个常态的悬浮动画
const transitionComplete = (el) => {
    el.classList.add('animateText')
}
// 删除输入值时，把常态动画删除，避免影响animate移除动画
const transitionleave = (el) => {
    el.classList.remove('animateText')
}

</script>
<style scoped lang='less'>
.login-box{
    width: 100%;
    height: 100%;
    align-items: center;
    .text-line{
        color: #fff;
        font-size: 38px;
        height: 30px;
        .transitionClass{
            transition: all 1s;
        }
    }
}

// 输入后字体的漂浮效果
.animateText{
    animation: flow 1.6s linear infinite;
    // animation-delay:1s;
}

@keyframes flow {
        25% {
             transform: translateY(-4px);
        }
        50%, 100% {
             transform: translateY(0);
        }
        75% {
             transform: translateY(4px);
        }
}


:deep(.el-dialog){
    border-radius: 20px;
    background-image: url(../../assets/img/login-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
}
:deep(el-dialog__header){
    display: none;
}
:deep(.el-input__wrapper){
    background-color: rgba(255, 255, 255, 0);
    margin-top: 20px;
    border: 0;
}
:deep(.el-input__inner){
    color: #fff;
}

</style>
