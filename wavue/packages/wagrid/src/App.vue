<template>
  <n-space vertical>
    <n-tabs v-model:value="activeTab" type="line">
      <n-tab-pane name="a" tab="탭 A" />
      <n-tab-pane name="b" tab="탭 B" />
      <n-tab-pane name="c" tab="탭 C" />
    </n-tabs>

    <!-- 핵심 -->
    <keep-alive>
      <component :is="activeComponent" />
    </keep-alive>
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NSpace, NTabs, NTabPane } from 'naive-ui'
import TabA from './views/TabA.test.vue'
import TabB from './views/TabB.test.vue'
import TabC from './views/TabC.test.vue'

const activeTab = ref('a')
const activeComponent = computed(() =>
    {
      if (activeTab.value === 'a') return TabA
      else if (activeTab.value === 'b') return TabB
      else if (activeTab.value === 'c') return TabC
    }
)
</script>
