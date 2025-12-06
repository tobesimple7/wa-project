<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 5강] : v-for</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) 배열 v-for</template>
      <template #header-extra>
        <n-space justify="end">
          <!--n-button size="small" type="primary" @click="btnAdd">언어 추가</n-button -->
          <!--n-button size="small" @click="btnInit">초기화</n-button -->
        </n-space>
      </template>

      <ul>
        <li>v-for="(item, i) in arrayData"</li>
        <li v-for="(item, i) in arrayData">
          일련번호 {{ i }} - {{ item.name }} (id: {{ item.id }})
        </li>
      </ul>

      <ul>
        <li>v-for="(data, idx) in arrayData"</li>
        <li v-for="(data, idx) in arrayData">
          일련번호 {{ idx }} - {{ data.name }} (id: {{ data.id }})
        </li>
      </ul>
    </n-card>

    <highlightjs language="javascript" :code="lectureDesc" />

    <n-card size="medium">
      <template #header>(예제 2) Json 객체 v-for</template>
      <template #header-extra>
        <n-space justify="end">
          <!--n-button size="small" type="primary" @click="btnAdd2">항목 추가</n-button -->
          <!--n-button size="small" @click="btnInit2">초기화</n-button -->
        </n-space>
      </template>

      <ul>
        <li>v-for="(val, key, i) in jsonData"</li>
        <li v-for="(val, key, i) in jsonData">
          {{ i }}. {{ key }}: {{ val }}
        </li>
      </ul>

      <ul>
        <li>v-for="(value, itemcode, index) in jsonData"</li>
        <li v-for="(value, itemcode, index) in jsonData">
          {{ index }}. {{ itemcode }}: {{ value }}
        </li>
      </ul>

    </n-card>

    <highlightjs language="javascript" :code="lectureDesc2" />
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, NSpace, NCard, NInput, NInputNumber } from 'naive-ui'

/** 예제 데이터 */
const arrayData = ref([
  { id: 'ko', name: '한국어' },
  { id: 'ja', name: '일본어' },
  { id: 'zh', name: '중국어' }
])

/** 객체 반복용 */
const jsonData = ref({
  userName: '홍길동',
  userJob: 'Developer',
  userCity: 'Seoul'
})


/** 주석 1 */
const lectureDesc = `
<template>
  <ul>
    // item : 배열의 한 행
    // i : 일련번호 0부터 시작
    // 일련번호가 필요 없을 경우, v-for="item in arrayData" 으로 사용 가능합니다.
    // Vue에서 v-for 문에 사용되는 arrayData는 자동으로 binding이 됩니다.
    // 데이터가 변경되면 화면도 자동으로 업데이트 됩니다.
    <li>v-for="(item, i) in arrayData"</li>
    <li v-for="(item, i) in arrayData">
      일련번호 {{ i }} - {{ item.name }} (id: {{ item.id }})
    </li>
  </ul>

  <ul>
    // 변수명이 변경되어도 위와 같이 동작합니다
    <li>v-for="(data, idx) in arrayData"</li>
    <li v-for="(data, idx) in arrayData">
      일련번호 {{ idx }} - {{ data.name }} (id: {{ data.id }})
    </li>
  </ul>
<script setup>
// ref 를 사용하기 때문에, arrayData가 변경되면, 화면도 자동으로 업데이트 됩니다.

const arrayData = ref([
  { id: 'ko', name: '한국어' },
  { id: 'ja', name: '일본어' },
  { id: 'zh', name: '중국어' }
])
`
/** 주석 1 */
const lectureDesc2 = `
<template>
  <ul>
    <li>v-for="(val, key, i) in jsonData"</li>
    <li v-for="(val, key, i) in jsonData">
      {{ i }}. {{ key }}: {{ val }}
    </li>
  </ul>

  <ul>
    <li>v-for="(value, itemcode, index) in jsonData"</li>
    <li v-for="(value, itemcode, index) in jsonData">
      {{ index }}. {{ itemcode }}: {{ value }}
    </li>
  </ul>
<script setup>
// userName, userJob, userCity 등이 key
// 홍길동, Developer, Seoul 등이 val
// ref 가 있기 때문에, jsonData가 변경되면, UI에서 변경된 데이타로 표시됩니다.
const jsonData = ref({
  userName: '홍길동',
  userJob: 'Developer',
  userCity: 'Seoul'
})
`
</script>

<style scoped>

</style>