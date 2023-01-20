import Auth from "@/pages/Auth";
import Documents from "@/pages/Documents";
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: Auth,
    },
    {
        path: '/documents',
        component: Documents,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})


export default router;

