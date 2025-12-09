<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 5강] v-on:(축약형 @)</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) v-on:이벤트 는 @이벤트 서로 같습니다.</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>

      <button v-on:click="clickEvent" v-bind:style="buttonStyle">버튼 실행</button>
      <button @click="clickEvent2" :style="buttonStyle2">버튼2 실행</button>

    </n-card>

    <!-- 주석 -->
    <highlightjs language="javascript" :code="lectureDesc" />

  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { NButton,  NSpace, NCard } from 'naive-ui'

const buttonStyle = ref('')
const buttonStyle2 = ref('')

function clickEvent() {
  buttonStyle.value = 'color:red;'
}
function clickEvent2() {
  buttonStyle2.value = 'color:blue;'
}
function btnInit() {
  buttonStyle.value = ''
  buttonStyle2.value = ''
}

const lectureDesc = `
<template>
<button v-on:click="clickEvent" v-bind:style="buttonStyle">버튼 실행</button>

<script setup>
import { ref } from 'vue'
import { NButton,  NSpace, NCard } from 'naive-ui'

const buttonStyle = ref('')
const buttonStyle2 = ref('')

function clickEvent() {
  buttonStyle.value = 'color:red;'
}
function clickEvent2() {
  buttonStyle2.value = 'color:blue;'
}
function btnInit() {
  buttonStyle.value = ''
  buttonStyle2.value = ''
}

<style scoped>
`
</script>
<style scoped>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>
