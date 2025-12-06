<template>
  <n-space justify="space-between" align="center" style="padding: 8px; background: #304d4e; border-bottom: 1px solid #ddd;">
    <div><b style="color: white;">ERP Dashboard</b></div>
    <div v-if="auth.isLoggedIn()">
      <n-space align="center">
        <span style="color: white;">관리자 님 환영합니다</span>
        <!-- <n-button size="tiny" type="error" @click="logout">로그아웃</n-button> -->
      </n-space>
    </div>
  </n-space>
</template>

<script setup>
import { auth } from '../stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() { auth.logout(); router.push('/login') }
</script>
