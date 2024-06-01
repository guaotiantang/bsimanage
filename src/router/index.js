
import { createRouter, createWebHistory } from 'vue-router';
import * as ElementIcons from "@element-plus/icons-vue";

const routes = [
    {
        path: '/',
        meta: {
            hidden: true, icon: ElementIcons.House
        },
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            icon: ElementIcons.House
        },
        component: () => import('../views/HomePage.vue')
    },
    {
        path: '/author',
        name: 'Login or Register',
        meta: {
            icon: ElementIcons.User,
            hidden: false
        },
        component: () => import('../views/AuthorPage.vue')
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
