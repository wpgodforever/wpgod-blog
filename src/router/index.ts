import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Index = () => import('../views/index/index.vue')
const Main = () => import('../views/main/index.vue')
const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        component: Index,
        redirect: '/index',
        children:[
            {
                path:'/index',
                component: Main,
            }
        ] 
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
