import { createRouter, createWebHistory } from 'vue-router';
import List from '../page/List.vue'
import Detail from '../page/Detail.vue'
import NotFound from "../page/NotFound.vue";

const routes = [
    {
        path: '/',
        name: 'List',
        component: List
    },
    {
        path: '/:id',
        name: 'Detail',
        component: Detail,
        props: true
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
