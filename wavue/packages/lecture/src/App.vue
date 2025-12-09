<template>
  <HeaderBar />
  <n-layout has-sider style="height: calc(100vh - 48px);">
    <n-layout-sider width="280" bordered>
      <LeftMenu />
    </n-layout-sider>

    <n-layout-content style="padding: 8px;">
      <TabView />
    </n-layout-content>
  </n-layout>
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

onMounted(async () => {
  try {
    await nextTick()

    if (typeof tabStore.ensureHome === 'function') {
      tabStore.ensureHome()
    }

    if (typeof tabStore.restoreSession === 'function') {
      await tabStore.restoreSession()
    }
  } catch (err) {
    console.error('App.vue mounted error:', err)
  }
})
</script>
