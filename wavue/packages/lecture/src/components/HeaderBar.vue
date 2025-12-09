<template>
  <n-space justify="space-between" align="center" style="padding: 8px; background: #304d4e; border-bottom: 1px solid #ddd;">
    <div><b style="color: white;">Lecture Dashboard</b></div>
    <n-space align="center">
      <span style="color: white;">관리자 님 환영합니다</span>
      <!-- <n-button size="tiny" type="error" @click="logout">로그아웃</n-button> -->
    </n-space>
  </n-space>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
