import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { title: '홈', keepAlive: true } },
  { path: '/about', name: 'About', component: AboutView, meta: { title: '소개', keepAlive: true } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
