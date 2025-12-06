<template>
  <div v-if="!isLoginPage">
    <HeaderBar />
    <n-layout has-sider style="height: calc(100vh - 48px);">
      <n-layout-sider width="280" bordered>
        <LeftMenu />
      </n-layout-sider>

      <n-layout-content style="padding: 8px;">
        <TabView />
      </n-layout-content>
    </n-layout>
  </div>

  <div v-else>
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import LeftMenu from './components/LeftMenu.vue'
import TabView from './components/TabView.vue'
import { useTabStore } from './stores/tabStore'

// ✅ main.js에서 넘겨주는 prop 정의
defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const tabStore = useTabStore()

// ✅ 로그인 페이지 여부
const isLoginPage = computed(() => route.path === '/login')

// ✅ 안전한 마운트 (router & store 모두 준비 후)
onMounted(async () => {
  try {
    await nextTick()

    // 홈 탭 보장
    if (typeof tabStore.ensureHome === 'function') {
      tabStore.ensureHome()
    }

    // 세션 복원 (컴포넌트 로딩 오류 방지)
    if (typeof tabStore.restoreSession === 'function') {
      await tabStore.restoreSession()
    }
  } catch (err) {
    console.error('App.vue mounted error:', err)
  }
})
</script>
