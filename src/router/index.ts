import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('../views/layout/index.vue')
const Main = () => import('../views/main/index.vue')
const ArticleEdit = () => import('../views/article/edit.vue')
const ArticleDetail = () => import('../views/article/detail.vue')
const TimeLine = () => import('../views/timeLine/index.vue')
const Board = () => import('../views/board/index.vue')
const Demo = () => import('../views/demo/index.vue')
const demoGrain = () => import('../views/demo/components/demoGrain/index.vue')
const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        component: Layout,
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
                        path:'/article/detail/:id',
                        component: ArticleDetail
                    },
                    {
                        path:'/article/update/:id',
                        name:'articleUpdate',
                        component: ArticleEdit
                    },
                ]
            },
            {
                path:'/timeLine',
                component: TimeLine,
            },
            {
                path:'/board',
                component: Board,
            },
            {
                path:'/demo',
                redirect:'/demo/grain',
                component: Demo,
                children:[
                    {
                        path:'/demo/grain',
                        component: demoGrain
                    },
                ]
            },
        ] 
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
