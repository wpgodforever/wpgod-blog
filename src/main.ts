import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'

const store = createPinia()
let app = createApp(App)
app.use(store)
app.use(router)

app.mount('#app')
