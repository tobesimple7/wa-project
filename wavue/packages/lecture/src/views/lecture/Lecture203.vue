<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 3강] : v-model(바인딩)</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) input 박스와  v-model</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button type="primary" size="small" @click="btnChange">값을 변경</n-button>
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>

      <input v-model="inputValue"/>
      {{ inputValue }}
    </n-card>
    <!-- 주석 -->
    <highlightjs language="javascript" :code="lectureDesc" />

    <!-- Naive input box -->
    <n-card size="medium">
      <template #header>(예제 2) Naive : input박스와 v-model</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button type="primary" size="small" @click="btnChange2">값을 변경</n-button>
          <n-button size="small" @click="btnInit2">초기화</n-button>
        </n-space>
      </template>
      <n-input v-model:value="inputValueNaive"/>
      {{ inputValueNaive }}
    </n-card>
    <!-- 주석 -->
    <highlightjs language="javascript" :code="lectureDesc2" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { NInput, NButton,  NSpace, NCard } from 'naive-ui'


const inputValue = ref('')
const inputValueNaive = ref('')



// 일반 input box
function btnChange() {
  inputValue.value = '값을 변경' //ref로 할 경우 문자열이 아니라 객체이기 때문에 .value를 붙여야 합니다.
}

function btnInit() {
  inputValue.value = ''
}

// Naive input box
function btnChange2() {
  inputValueNaive.value = '값을 변경' //ref로 할 경우 문자열이 아니라 객체이기 때문에 .value를 붙여야 합니다.
}

function btnInit2() {
  inputValueNaive.value = ''
}

const lectureDesc = `
<template>
  // <input v-model="inputValue"/> 의 뜻은 다음과 같습니다.
  // ㄴ v-model은 input의 값과 연결되어 있습니다.
  // ㄴ v-model은 inputValue 변수와 연결되어 있습니다.
  // ㄴ input의 값이 변경되면, inputValue의 값도 변경됩니다.
  // ㄴ inputValue의 값이 변경되면, input box의 값도 변경됩니다.

  <input v-model="inputValue"/>
  {{ inputValue }}

<script setup>
  // ref 함수는 vue에서 제공하는 함수 입니다(vue에서 data 감지)
  // ref 함수를 사용하지 않으면, inputValue와 동기화가 되지 않습니다.
  const inputValue = ref('')
  // inputValue 의 값을 변경하려면, 다음과 같이 써야 합니다.
  // inputValue.value = '변경된 값'
  // 반드시 .value를 붙여야 합니다.
`.trim()

const lectureDesc2 = `
<template>
  <n-input v-model:value="inputValueNaive"/>
  {{ inputValueNaive }}

<script setup>
  const inputValueNaive = ref('')
`.trim()

</script>

<style scoped>

</style>
