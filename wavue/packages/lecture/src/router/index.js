import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../stores/auth'

const routes = [
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: () => import('../views/HomeView.vue') , meta: { keepAlive: true } },

    { path: '/lecture/lecture101',   name: 'lecture101', component: () => import('../views/lecture/Lecture101.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture102',   name: 'lecture102', component: () => import('../views/lecture/Lecture102.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture103',   name: 'lecture103', component: () => import('../views/lecture/Lecture103.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture104',   name: 'lecture104', component: () => import('../views/lecture/Lecture104.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture105',   name: 'lecture105', component: () => import('../views/lecture/Lecture105.vue') , meta: { keepAlive: true } },

    { path: '/lecture/lecture201',   name: 'lecture201', component: () => import('../views/lecture/Lecture201.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture202',   name: 'lecture202', component: () => import('../views/lecture/Lecture202.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture203',   name: 'lecture203', component: () => import('../views/lecture/Lecture203.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture204',   name: 'lecture204', component: () => import('../views/lecture/Lecture204.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture205',   name: 'lecture205', component: () => import('../views/lecture/Lecture205.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture206',   name: 'lecture206', component: () => import('../views/lecture/Lecture206.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture207',   name: 'lecture207', component: () => import('../views/lecture/Lecture207.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture208',   name: 'lecture208', component: () => import('../views/lecture/Lecture208.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture209',   name: 'lecture209', component: () => import('../views/lecture/Lecture209.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture210',   name: 'lecture210', component: () => import('../views/lecture/Lecture210.vue') , meta: { keepAlive: true } },
    { path: '/lecture/lecture211',   name: 'lecture211', component: () => import('../views/lecture/Lecture211.vue') , meta: { keepAlive: true } },    
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //if (to.path !== '/login' && !auth.isLoggedIn()) {
  //  next('/login')
  //} else if (to.path === '/login' && auth.isLoggedIn()) {
  //  next('/')
  //} else {
  //  next()
  //}
  next()
})

export default router

