import { createRouter, createWebHashHistory ,  RouteRecordRaw } from 'vue-router'
const Index = ()=> import('../views/index/index.vue')
const routes: Array<RouteRecordRaw> = [  
    {    path: '/',    name: 'index',    component: Index  },  
]
const router = createRouter({  
    history: createWebHashHistory (),  
    routes
})

export default router
