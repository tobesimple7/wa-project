<template>
  <n-card title="홈">
    <n-input v-model:value="msg" placeholder="여기에 입력해보세요" />
    <p>입력값: {{ msg }}</p>
  </n-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePageStore } from '@/stores/pageStore'
import { NCard, NInput } from 'naive-ui'

const store = usePageStore()
const msg = ref(store.pageStates.home?.msg || '')

// 입력값 변경 시 자동 저장
watch(msg, val => {
  store.setPageState('home', 'msg', val)
})
</script>
