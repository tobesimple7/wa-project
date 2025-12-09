<template>
  <n-space vertical>
    <!-- 상단 메뉴 -->
    <n-menu :options="menuOptions" @update:value="onMenuClick" />

    <n-tree
        :data="mainTree"
        block-line
        expand-on-click
        selectable
        class="nbs-tree"
        @update:selected-keys="onSelect"
    />
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { useTabStore } from '@/stores/tabStore.js'

const tabStore = useTabStore()

// ========================
// 상단 메뉴 (홈 등)
// ========================
const menuOptions = [
  { label: '홈', key: 'home' }
]

function onMenuClick(key) {
  const menu = menuOptions.find(m => m.key === key)
  if (menu) {
    tabStore.addTab(menu.key, menu.label)
  }
}

function onSelect(keys, options) {
  const node = options[0]
  if (!node) return
  if (!node.children || node.children.length === 0) {
    tabStore.addTab(node.key, node.label)
  }
}

// ========================
// 트리 데이터
// ========================
const mainTree = ref([
  {
    label: 'Part 1. Vue.js 시작하기',
    key: 'Lecture100',
    children: [
      { key: 'lecture101', label: 'Part1. 1강. vue.js 안내' },
      { key: 'lecture102', label: 'Part1. 2강. node.js 다운로드' },
      { key: 'lecture103', label: 'Part1. 3강. vscode 편집기' },
      { key: 'lecture104', label: 'Part1. 4강. nvm' },
      { key: 'lecture105', label: 'Part1. 5강. npm' },
      { key: 'lecture106', label: 'Part1. 6강. pnpm' },
      { key: 'lecture107', label: 'Part1. 7강. 강의소스 다운로드' },
    ]
  },  
  {
    label: 'Part 2. Vue3 문법',
    key: 'Lecture200',
    children: [
      { key: 'lecture201', label: 'Part2. 1강. Vue 만들기' },
      { key: 'lecture202', label: 'Part2. 2강. {{ }} Mustache(머스타치)' },
      { key: 'lecture203', label: 'Part2. 3강. v-model (바인딩)' },
      { key: 'lecture204', label: 'Part2. 4강. v-bind (바인딩)' },
      { key: 'lecture205', label: 'Part2. 5강. v-on (이벤트)' },
      { key: 'lecture206', label: 'Part2. 6강. v-model, v-bind 예제' },
      { key: 'lecture207', label: 'Part2. 7강. v-if, v-show' },
      { key: 'lecture208', label: 'Part2. 8강. v-for (반복문)' },
      { key: 'lecture209', label: 'Part2. 9강. v-for, v-if, v-show 예제' },
      { key: 'lecture210', label: 'Part2. 10강. v-html' },
      { key: 'lecture211', label: 'Part2. 11강. v-text' },
    ]
  },
])
</script>

<style scoped>
.nbs-tree:deep(*) {
  font-size: 13px;
  line-height: 1.4;
  --n-node-content-height: 26px;
  color: white !important;
}

.nbs-tree :deep(.nbs-tree-node-content) {
  height: 26px !important;
  line-height: 26px !important;
  padding: 0 4px;
}

:deep(.nbs-tree .n-tree-node-indent > div) {
  width: 2px !important;
}

.nbs-tree :deep(.n-tree-node[data-depth="0"] .nbs-tree-node-indent > div) {
  width: 0 !important;
}

.nbs-tree :deep(.n-tree-node-content__text) {
  color: #333;
  transition: color 0.2s ease;
}
.nbs-tree :deep(.n-tree-node--clickable:hover .n-tree-node-content__text) {
  color: #2563eb;
  font-weight: 600;
}

.nbs-tree :deep(.n-tree-node--selected .nbs-tree-node-content__text) {
  color: #1d4ed8;
  font-weight: 700;
}

.nbs-tree {
  --n-line-color: #d4d4d8;
  --n-line-offset-top: -2px;
  --n-line-offset-bottom: -2px;
}
</style>
