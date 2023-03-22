import { createApp } from 'vue'
import './style.css'
import store from '@/store'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
// 注册element plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
import 'animate.css';
// 渐进式加载图片插件
import "vue-progressive-image/dist/style.css"; // <--- very important!



let app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store)
app.use(router)

app.mount('#app')
