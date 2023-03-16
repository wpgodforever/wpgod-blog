// src/hooks/useMousePosition.ts
import { ref, onMounted, onUnmounted, } from 'vue'


const useLogin = () => {
  // 登录注册弹框逻辑
  const dialogVisible = ref(false)
  const tips = ref('登录')
  const popClick = (index: 0 | 1) => {
    const textConfig = {
      0: '注册',
      1: '登录'
    }
    tips.value = textConfig[index]
    dialogVisible.value = true
  }
  return {
    dialogVisible,
    tips,
    popClick,
  }
}

export {
  useLogin
}  
