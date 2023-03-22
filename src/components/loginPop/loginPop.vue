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
                <el-form style="width: 80%;" :model="ruleForm" ref="ruleFormRef" :rules="rules" label-width="0px">
                    <el-form-item prop="username">
                      <el-input
                        v-model="ruleForm.username"
                        placeholder="Please input name"
                        :prefix-icon="User"
                        maxlength="15"
                        prop="username"
                      />
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        v-model="ruleForm.password"
                        type="password"
                        placeholder="Please input password"
                        show-password
                        :prefix-icon="User"
                        prop="password"
                      />
                    </el-form-item>
                
                </el-form>
                
                <div class="btn" :class="[isActive?'active':'']" @click="handleClick(ruleFormRef)">
                    <span class="btn-icon"><el-icon><RefreshRight /></el-icon></span>
                    <span class="btn-text">{{ tips }}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script lang='ts' setup>
import { ref, computed, reactive, getCurrentInstance } from "vue";
import type { FormRules, FormInstance } from 'element-plus'
import { User } from '@element-plus/icons-vue'
import { registerFn, loginFn } from '@/api/login/login'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
// pinia用户信息
const user = useUserStore()

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
    isActive.value = false 
    resetForm(ruleFormRef.value)
    emit('update:modelValue',false)
    // done()
};

const handleCancel = () => {
    emit('update:modelValue',false)
}

// 输入动画逻辑
// 输入动画效果需要将输入的字符串变成数组
const textList = computed(() => {
    return ruleForm.username.length? ruleForm.username.split('') : []
})
// 在animate进入动画完成后，再添加一个常态的悬浮动画
const transitionComplete = (el) => {
    el.classList.add('animateText')
}
// 删除输入值时，把常态动画删除，避免影响animate移除动画
const transitionleave = (el) => {
    el.classList.remove('animateText')
}


// 注册逻辑
// 点击按钮动画触发
const isActive = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    username: '',
    password: '',
})
const rules = reactive<FormRules>({
    username: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'change',
    },
  ],
})
const handleClick = async (formEl: FormInstance | undefined) => {
    await formEl.validate((valid, fields) => {
    if (valid) {
        isActive.value = true
        if(props.tips === '注册'){
            registerFn(ruleForm).then(res => {
                ElMessage.success(res.msg)
                resetForm(ruleFormRef.value)
                emit('update:modelValue',false)
            })
            .finally(()=>{
                isActive.value = false
            })
        }else{
            loginFn(ruleForm).then(res => {
                ElMessage.success(res.msg)
                user.userInfo = res.data
                resetForm(ruleFormRef.value)
                emit('update:modelValue',false)
            })
            .finally(()=>{
                isActive.value = false
            })
        }
        
    } else {
      console.log('error submit!', fields)
    }
  })
    
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
    .btn{
        position: relative;
        width: 80%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        background-color: rgba(11, 30, 45);
        border-radius: 50px;
        margin-top: 20px;
        transition: all 1.5s;
        &-icon{
            position: absolute;
            top: 50%;
            left: 5%;
            transform: translate(0, -45%);
            transition: all 1.5s;
        }
        &-text{
            transition: all 1.5s;
        }
    }
    .btn.active{
        width: 40px;
        .btn-text{
            opacity: 0;
        }
        .btn-icon{
            transform: translate(75%, -45%)!important;
        }
        i{
            animation: iconRoto 2s linear infinite;
        }
    }
    .btn:hover{
        width: 40px;
        .btn-text{
            opacity: 0;
        }
        .btn-icon{
            transform: translate(75%, -45%)!important;
        }
        i{
            animation: iconRoto 2s linear infinite;
        }
    }
}

@keyframes iconRoto {
        25% {
            transform:  rotate(90deg);
        } 
        50% {
            transform: rotate(180deg);
        }
        75% {
            transform: rotate(270deg);
        }
        100% {
            transform: rotate(360deg);
        }
}


:deep(.el-dialog){
    border-radius: 20px;
    background-image: url(../../assets/img/login-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
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
