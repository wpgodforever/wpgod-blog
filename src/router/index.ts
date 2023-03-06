import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Index = () => import('../views/layout/index.vue')
const Main = () => import('../views/main/index.vue')
const ArticleEdit = () => import('../views/article/edit.vue')
const ArticleDetail = () => import('../views/article/detail.vue')
const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        component: Index,
        redirect: '/index',
        children:[
            {
                path:'/index',
                component: Main,
            },
            {
                path:'/article',
                redirect: '/article/detail',
                children:[
                    {
                        path:'/article/edit',
                        component: ArticleEdit
                    },
                    {
                        path:'/article/detail',
                        component: ArticleDetail
                    },
                ]
            }
        ] 
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
