import {createRouter,createWebHashHistory} from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../components/Index.vue')
        },
        {
            path: '/add',
            component: () => import('../components/Add.vue')
        },        
        {
            path: '/next',
            component: () => import('../components/Next.vue')
        }        
    ]
})

router.beforeEach((to, from, next) => {
    // console.log(to, from, next);
    next();
})

export default router;