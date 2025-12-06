/**
 * waerp project
 * 
 * - router 정의 
 * - 
 */
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../stores/auth'

const routes = [
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: () => import('../views/HomeView.vue') , meta: { keepAlive: true } },
    // { path: '/accounting', name: 'accounting', component: () => import('../views/AccountingView.vue'), meta: { keepAlive: true } },
    // { path: '/sample', name: 'sample', component: () => import('../views/SampleView.vue') },

    { path: '/party/party010',   name: 'party010', component: () => import('../views/party/Party010.vue') , meta: { keepAlive: true } },
    { path: '/party/party011',   name: 'party011', component: () => import('../views/party/Party011.vue') , meta: { keepAlive: true } },
    { path: '/party/party020',   name: 'party020', component: () => import('../views/party/Party020.vue') , meta: { keepAlive: true } },
    { path: '/party/party030',   name: 'party030', component: () => import('../views/party/Party030.vue') , meta: { keepAlive: true } },
    { path: '/party/party040',   name: 'party040', component: () => import('../views/party/Party040.vue') , meta: { keepAlive: true } },
    { path: '/party/party050',   name: 'party050', component: () => import('../views/party/Party050.vue') , meta: { keepAlive: true } },
    { path: '/party/party060',   name: 'party060', component: () => import('../views/party/Party060.vue') , meta: { keepAlive: true } },
    { path: '/party/party070',   name: 'party070', component: () => import('../views/party/Party070.vue') , meta: { keepAlive: true } },
    { path: '/party/party080',   name: 'party080', component: () => import('../views/party/Party080.vue') , meta: { keepAlive: true } },
    { path: '/party/party090',   name: 'party090', component: () => import('../views/party/Party090.vue') , meta: { keepAlive: true } },
    { path: '/party/party100',   name: 'party100', component: () => import('../views/party/Party100.vue') , meta: { keepAlive: true } },

    { path: '/accounting/fa010', name: 'fa010', component: () => import('../views/accounting/Fa010.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa011', name: 'fa011', component: () => import('../views/accounting/Fa011.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa020', name: 'fa020', component: () => import('../views/accounting/Fa020.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa030', name: 'fa030', component: () => import('../views/accounting/Fa030.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa040', name: 'fa040', component: () => import('../views/accounting/Fa040.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa050', name: 'fa050', component: () => import('../views/accounting/Fa050.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa060', name: 'fa060', component: () => import('../views/accounting/Fa060.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa070', name: 'fa070', component: () => import('../views/accounting/Fa070.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa080', name: 'fa080', component: () => import('../views/accounting/Fa080.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa090', name: 'fa090', component: () => import('../views/accounting/Fa090.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa100', name: 'fa100', component: () => import('../views/accounting/Fa100.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa110', name: 'fa110', component: () => import('../views/accounting/Fa110.vue') , meta: { keepAlive: true } },
    { path: '/accounting/fa120', name: 'fa120', component: () => import('../views/accounting/Fa120.vue') , meta: { keepAlive: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !auth.isLoggedIn()) {
    next('/login')
  } else if (to.path === '/login' && auth.isLoggedIn()) {
    next('/')
  } else {
    next()
  }
})

export default router

