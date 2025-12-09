## 소스
```vue
<template>
  <n-button type="primary" size="small" @click="btnChange">단어 변경</n-button>
  <n-button size="small" @click="btnInit">초기화</n-button>
  msg : {{ msg }}
  refMsg : {{ refMsg }}
</template>

<script setup>
let msg = '안녕하세요'
const refMsg = ref('안녕하세요')

function btnChange() {
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
