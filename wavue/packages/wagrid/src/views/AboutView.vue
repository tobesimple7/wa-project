<template>
  <n-space vertical>
    <n-tabs v-model:value="activeTab" type="line">
      <n-tab-pane name="a" tab="탭 A" />
      <n-tab-pane name="b" tab="탭 B" />
    </n-tabs>

    <!-- 핵심: keep-alive 안에서 컴포넌트를 교체 -->
    <keep-alive>
      <component :is="activeComponent" />
    </keep-alive>
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NInput, NCard, NButton, NSpace, NTabs, NTabPane } from 'naive-ui'

const activeTab = ref('a')

const TabA = {
  name: 'TabA',
  template: `
    <n-card title="탭 A">
      <n-input v-model:value="text" placeholder="A 입력값" />
      <p>입력값: {{ text }}</p>
    </n-card>
  `,
  setup() {
    const text = ref('')
    return { text }
  }
}

const TabB = {
  name: 'TabB',
  template: `
    <n-card title="탭 B">
      <n-input v-model:value="text" placeholder="B 입력값" />
      <p>입력값: {{ text }}</p>
    </n-card>
  `,
  setup() {
    const text = ref('')
    return { text }
  }
}

const activeComponent = computed(() => (activeTab.value === 'a' ? TabA : TabB))
</script>
