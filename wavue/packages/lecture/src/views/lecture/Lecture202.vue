<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 2강] : {{ }} Mustache(머스타치)</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) </template>
      <template #header-extra>
        <n-space justify="end">
          <n-button type="primary" size="small" @click="btnChange">단어 변경</n-button>
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>
      msg : {{ msg }}
      <br/>
      refMsg : {{ refMsg }}
    </n-card>
    <DecsPage style="margin: 0px 10px 10px 10px;" />      
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { NButton,  NSpace, NCard } from 'naive-ui'
import DecsPage from '@/docs/Lecture202.md'

let msg = '안녕하세요'
const refMsg = ref('안녕하세요')

function btnChange() {
  alert('btnChange 함수')
  msg = 'msg 입니다'
  refMsg.value = 'refMsg 입니다'
}

function btnInit() {
  msg = '안녕하세요'
  refMsg.value = '안녕하세요(ref)'
}
</script>

<style scoped>
</style>
