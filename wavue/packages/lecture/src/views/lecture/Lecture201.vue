<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 1강] : Vue 컴포넌트 만들기</template>
    </n-card>
    <DecsPage style="margin: 0px 10px 10px 10px;" />    
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { NSpace, NCard } from 'naive-ui'  
import DecsPage from '@/docs/Lecture201.md'
</script>

<style scoped>
</style>
