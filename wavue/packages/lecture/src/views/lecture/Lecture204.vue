<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 2강] : v-bind:(축약형 : 콜론), v-on:(축약형 @ 골뱅이)</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) input 박스와  v-bind</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button type="primary" size="small" @click="btnChange">스타일 변경</n-button>
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>

      <input v-model="inputValue" :class="inputClass"/>
      {{ inputValue }}

    </n-card>

    <!-- 주석 -->
    <highlightjs language="javascript" :code="lectureDesc" />

    <!-- Naive input box -->
    <n-card size="medium">
      <template #header>(예제 2) button과 v-on:(축약형 @) 이벤트</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button type="primary" size="small" @click="btnChange2">값을 변경</n-button>
          <n-button size="small" @click="btnInit2">초기화</n-button>
        </n-space>
      </template>

      <n-button type="primary" size="small" @click="btnClick">버튼</n-button>
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
const inputClass = ref('red')

const inputValueNaive = ref('')

// 일반 input box
function btnChange() {
  inputClass.value = 'blue'
}

function btnInit() {
  inputValue.value = ''
  inputClass.value = 'red'
}

// Naive input box
function btnChange2() {
  inputValueNaive.value = '값을 변경' //ref로 할 경우 문자열이 아니라 객체이기 때문에 .value를 붙여야 합니다.
}

function btnInit2() {
  inputValueNaive.value = ''
}

function btnClick() {
  inputValueNaive.value = 'v-on:click="btnClick"과  @click="btnClick"은 서로 같습니다.'
}



const lectureDesc = `
<template>
//1. v-bind는 input의 class에 연결되어 있습니다.
//2. v-bind는 inputClass 변수와 연결되어 있습니다.
//3. v-bind는 단축어로 땡땡이(콜론)으로 표시합니다.
//   v-bind:class 는 :class 서로 같음(축약형)
<input v-model="inputValue" v-bind:class="inputClass"/>
<input v-model="inputValue" :class="inputClass"/>
{{ inputValue }}

<script setup>
    const inputValue = ref('') // ref 함수는 vue.js에서 제공하는 함수 입니다. vue.js에서 inputValue의 값을 감시합니다.
    const inputClass = ref('red') // vue.js에서 inputValue의 값을 감시합니다. 값이 변경되면 바로 변경됩니다.

<style scoped>
.red {
  color: red;
}
.blue {
  color: blue;
}
`
const lectureDesc2 = `
<template>
<n-button type="primary" size="small" @click="btnClick">버튼</n-button>
<n-input v-model:value="inputValueNaive"/>
{{ inputValueNaive }}

<script setup>
const inputValueNaive = ref('')
function btnClick() {
  inputValueNaive.value = 'v-on:click="btnClick"과  @click="btnClick"은 서로 같습니다.'
}
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
