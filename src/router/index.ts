import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/pages/frontPage/index.vue'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/mv',
        component: () => import('@/components/mv/index.vue'),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/search',
        component: () => import('@/pages/search/index.vue'),
        meta: {
            keepAlive: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
