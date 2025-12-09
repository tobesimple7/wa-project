<template>
  <n-space vertical>
    <!-- 강의 제목 -->
    <n-card size="large">
      <template #header>[강의 6강] : select와 v-model / v-bind(:) / v-on(@) / v-for</template>
    </n-card>

    <!-- (예제 1) select -->
    <n-card size="medium">
      <template #header>(예제 1) select box</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" type="primary" @click="btnChange">한국어로 선택</n-button>
          <n-button size="small" type="primary" @click="btnAdd">일본어 추가</n-button>
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>

      <label>언어: </label>
      <select v-model="item">
        <!-- options 바인딩 -->
        <option
          v-for="opt in itemOptions"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <div>현재 선택 값: {{ item }}</div>
    </n-card>

    <!-- 주석 -->
    <highlightjs language="javascript" :code="lectureDesc" />

    <!-- (예제 2) Naive-UI n-select + v-model:value -->
    <n-card size="medium">
      <template #header>(예제 2) Naive-UI n-select 기본/다중/비활성/필터</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" type="primary" @click="btnChange2">영어로 선택</n-button>
          <n-button size="small" type="primary" @click="btnAdd2">중국어 추가</n-button>
          <n-button size="small" @click="btnInit2">초기화</n-button>
        </n-space>
      </template>

      <div style="margin-bottom:6px">단일 선택</div>
      <n-select
        v-model:value="item2"
        :options="itemOptions2"
      />
      <div>현재 선택 값: {{ item2 }}</div>
    </n-card>

    <!-- 주석 -->
    <highlightjs language="javascript" :code="lectureDesc2" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { NSelect, NButton, NSpace, NCard } from 'naive-ui'

const item = ref('')
const itemOptions = ref([
  { value: ''  , label: '--언어선택--' },
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
])
const item2 = ref('')
const itemOptions2 = ref([
  { value: ''  , label: '--언어선택--' },
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
])

function btnChange() {
  item.value = 'ko'
}
function btnAdd() {
  itemOptions.value.push({ value: 'jp', label: '일본어'})
}
function btnInit() {
  item.value = ''
  // 일본어 제거
  const index = itemOptions.value.findIndex(item => item.value === 'jp')
  if (index !== -1) itemOptions.value.splice(index, 1)
}

function btnChange2() {
  item2.value = 'en'
}
function btnAdd2() {
  itemOptions2.value.push({ value: 'zh', label: '중국어'})
}
function btnInit2() {
  item2.value = ''
  // 중국어 제거
  const index = itemOptions2.value.findIndex(item => item.value === 'zh')
  if (index !== -1) itemOptions2.value.splice(index, 1)
}

/** 주석 */
const lectureDesc = `
<template>
  <select v-model="item">
    <option v-for="opt in itemOptions"
        :key="opt.value"
        :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
  {{ item }}
</template>

<script setup>
import { ref } from 'vue'
const item = ref('') // 단일: 문자열
const itemOptions = [
  { value: ''  , label: '--언어선택' }
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
]
`.trim()

/** 주석2 */
const lectureDesc2 = `
<template>
  <n-select
    v-model:value="item2"
    :options="itemOptions2"
  />
  {{ item2 }}

<script setup>
import { ref } from 'vue'
const item2 = ref(null)
const itemOptions2 = [
  { value: ''  , label: '--언어선택' }
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
]`.trim()
</script>
