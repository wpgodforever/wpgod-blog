import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const Layout = () => import('../views/layout/index.vue')
const Main = () => import('../views/main/index.vue')
const ArticleEdit = () => import('../views/article/edit.vue')
const ArticleDetail = () => import('../views/article/detail.vue')
const TimeLine = () => import('../views/timeLine/index.vue')
const Board = () => import('../views/board/index.vue')
const Demo = () => import('../views/demo/index.vue')
const demoGrain = () => import('../views/demo/components/demoCanvas/canvasGrain.vue')
const demoCanvasApi = () => import('../views/demo/components/demoCanvas/canvasApi.vue')
const demoCanvasPx = () => import('../views/demo/components/demoCanvas/canvasPx.vue')
const demoCanvaPhotoShot = () => import('../views/demo/components/demoCanvas/canvasPhotoShot.vue')
const canvasBallJump = () => import('../views/demo/components/demoCanvas/canvasBallJump.vue')
const canvasBoom = () => import('../views/demo/components/demoCanvas/canvasBoom.vue')
const test = () => import('../views/demo/components/demoCanvas/test.vue')
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
                redirect:'/demo/canvas/canvasGrain',
                component: Demo,
                children:[
                    {
                        path:'/demo/canvas/canvasGrain',
                        component: demoGrain
                    },
                    {
                        path:'/demo/canvas/baseApi',
                        name:'baseApi',
                        component: demoCanvasApi
                    },{
                        path:'/demo/canvas/baseStyle',
                        name:'baseStyle',
                        component: demoCanvasApi
                    },
                    {
                        path:'/demo/canvas/baseText',
                        name:'baseText',
                        component: demoCanvasApi
                    },
                    {
                        path:'/demo/canvas/baseImg',
                        name:'baseImg',
                        component: demoCanvasApi
                    },
                    {
                        path:'/demo/canvas/basePx',
                        name:'basePx',
                        component: demoCanvasPx
                    },
                    {
                        path:'/demo/canvas/canvasPhotoShot',
                        name:'canvasPhotoShot',
                        component: demoCanvaPhotoShot
                    },
                    {
                        path:'/demo/canvas/canvasBallJump',
                        name:'canvasBallJump',
                        component: canvasBallJump
                    },
                    {
                        path:'/demo/canvas/canvasBoom',
                        name:'canvasBoom',
                        component: canvasBoom
                    },
                    {
                        path:'/demo/canvas/test',
                        name:'test',
                        component: test
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
