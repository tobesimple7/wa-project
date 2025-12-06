<template>
  <!-- 🔹 탭 헤더 영역 -->
  <n-tabs
      type="card"
      v-model:value="tabStore.activeTab"
      closable
      @update:value="onSelect"
      @close="onClose"
  >
    <n-tab-pane
        v-for="tab in tabStore.tabs"
        :key="tab.key"
        :name="tab.key"
        :tab="tab.label"
    />
  </n-tabs>

  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component
          :is="Component"
          v-if="route.meta.keepAlive"
          :key="route.name"
      />
    </keep-alive>

    <component
        :is="Component"
        v-if="!route.meta.keepAlive"
        :key="route.name"
    />
  </router-view>

</template>

<script setup>
import { useTabStore } from '@/stores/tabStore'
const tabStore = useTabStore()

function onSelect(key) {
  tabStore.setActiveTab(key)
}
function onClose(key) {
  tabStore.closeTab(key)
}
</script>

<style scoped>
.tab-content {
  margin-top: 8px;
}
</style>
