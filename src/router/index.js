import { createRouter, createWebHistory } from 'vue-router';
import * as ElementIcons from "@element-plus/icons-vue";



const routes = [
    {
        path: '/',
        meta: {
            permission: 1,
            hidden: true,
            icon: ElementIcons.House
        },
        redirect: '/home'
    },
    {
        path: '/:pathMatch(.*)*', // Vue Router 4 的通配符，捕获所有路由
        name: 'NotFound',
        meta: {
            hidden: true
        },
        redirect: '/home'  // 或者你可以使用 component: NotFound 来显示一个404页面
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            permission: 1,
            icon: ElementIcons.House
        },
        component: () => import('@/views/HomePage.vue')
    },
    {
        path: '/author',
        name: 'BSIManage',
        meta: {
            permission: 0,
            icon: ElementIcons.User,
            hidden: true
        },
        component: () => import('@/views/AuthorPage.vue')
    },
    {
        path: '/data',
        name: 'CellInfo',
        meta: {
            permission: 1,
            icon: ElementIcons.DataAnalysis,
            hidden: false

        },
        component: () => import('@/views/CellPage.vue')
    },
    {
        path: '/user',
        name: 'UserInfo',
        meta: {
            permission: 1,
            icon: ElementIcons.User,
            hidden: true
        },
        component: () => import('@/views/UserPage.vue')
    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
