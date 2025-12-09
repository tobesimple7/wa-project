<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 6강] v-text / v-html</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) v-text 는 {{ }} 와 같은 역할, v-html 은 HTML 태그까지 출력합니다.</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>

      <n-space vertical>
        <!-- v-text 사용 -->
        <div>
          v-text :
          <span v-text="message"></span>
        </div>

        <!-- v-html 사용 -->
        <div>
          v-html :
          <span v-html="htmlMessage"></span>
        </div>

        <n-space>
          <n-button size="small" type="primary" @click="btnChangeText">
            텍스트 변경 (v-text)
          </n-button>
          <n-button size="small" type="warning" @click="btnChangeHtml">
            HTML 변경 (v-html)
          </n-button>
        </n-space>
      </n-space>
    </n-card>

    <!-- 코드 설명 영역 -->
    <highlightjs language="javascript" :code="lectureDesc" />
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NSpace, NCard } from 'naive-ui'

const message = ref('안녕하세요 (텍스트)')
const htmlMessage = ref('<b>안녕하세요 (굵게, v-html)</b>')

function btnChangeText() {
  message.value = 'v-text 로 변경된 텍스트입니다.'
}

function btnChangeHtml() {
  htmlMessage.value =
    '<span style="color:red; font-weight:bold;">v-html 로 변경된 <u>HTML 텍스트</u> 입니다.</span>'
}

function btnInit() {
  message.value = '안녕하세요 (텍스트)'
  htmlMessage.value = '<b>안녕하세요 (굵게, v-html)</b>'
}

/**
 * 강의용 코드 블록 (highlightjs 에서 보여줄 내용)
 */
const lectureDesc = `
<template>
  <div>보간 {{ '{{ message }}' }}</div>

  <div>
    v-text :
    <span v-text="message"></span>
  </div>

  <div>
    v-html :
    <span v-html="htmlMessage"></span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('안녕하세요 (텍스트)')
const htmlMessage = ref('<b>안녕하세요 (굵게, v-html)</b>')

function btnChangeText() {
  message.value = 'v-text 로 변경된 텍스트입니다.'
}

function btnChangeHtml() {
  htmlMessage.value =
    '<span style="color:red; font-weight:bold;">v-html 로 변경된 <u>HTML 텍스트</u> 입니다.</span>'
}

function btnInit() {
  message.value = '안녕하세요 (텍스트)'
  htmlMessage.value = '<b>안녕하세요 (굵게, v-html)</b>'
}

`
</script>

<style scoped>
</style>
