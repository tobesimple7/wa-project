<template>
  <n-space vertical>
    <!-- 상단 메뉴 -->
    <n-menu :options="menuOptions" @update:value="onMenuClick" />

    <!-- 즐겨찾기 -->
    <n-tree
        :data="favoriteTree"
        block-line
        expand-on-click
        selectable
        class="nbs-tree"
        @update:selected-keys="onSelect"
    />

    <!-- 회계 / 인사 트리 -->
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

// ========================
// 트리 선택 (즐겨찾기 + 메인 메뉴)
// ========================
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
const favoriteTree = ref([
  {
    label: '즐겨찾기',
    key: 'favorite',
    children: [
      { key: 'fa010', label: '전표조회', path: '', parent: '', children: [] },
      { key: 'fa011', label: '전표관리' },
    ]
  }
])

const mainTree = ref([
  {
    label: '회계',
    key: 'Accounting',
    children: [
      { key: 'fa010', label: '전표조회' },
      { key: 'fa011', label: '전표관리' },
      { key: 'fa020', label: '송장조회' },
      { key: 'fa030', label: '지급수납조회' },
      { key: 'fa040', label: '지급수납그룹조회' },
      { key: 'fa050', label: 'PG설정' },
      { key: 'fa060', label: '청구계정조회' },
      { key: 'fa070', label: '금융계정조회' },
      { key: 'fa080', label: '계약조회' },
      { key: 'fa090', label: '고정자산조회' },
      { key: 'fa100', label: '예산조회' },
      { key: 'fa110', label: '전사GL설정' },
      { key: 'fa120', label: '회사GL설정' }
    ]
  },
  {
    label: '인사',
    key: 'Party',
    children: [
      { key: 'party010', label: '파티조회' },
      { key: 'party011', label: '파티관리' },
      { key: 'party020', label: 'My Communication' },
      { key: 'party030', label: 'Communication2' },
      { key: 'party040', label: 'Visits' },
      { key: 'party050', label: '로그인유저' },
      { key: 'party060', label: 'Classifications' },
      { key: 'party070', label: '보안' },
      { key: 'party080', label: 'Address Match Map' },
      { key: 'party090', label: 'Invitation' },
      { key: 'party100', label: 'Import/Export' }
    ]
  }
])
</script>

<style scoped>
/* === ERP용 Naive Tree 컴팩트 스타일 === */
.nbs-tree {
  font-size: 13px;
  line-height: 1.4;
  --n-node-content-height: 26px;
}

/* 🌳 노드 전체 높이 및 수평 간격 */
.nbs-tree :deep(.nbs-tree-node-content) {
  height: 26px !important;
  line-height: 26px !important;
  padding: 0 4px;
}

/* 🌿 들여쓰기 폭 축소 (기본 24px → 7px) */
:deep(.nbs-tree .n-tree-node-indent > div) {
  width: 2px !important;
}

/* 🌲 루트는 왼쪽 완전 정렬 */
.nbs-tree :deep(.n-tree-node[data-depth="0"] .nbs-tree-node-indent > div) {
  width: 0 !important;
}

/* 🍃 텍스트 색상 및 hover 효과 */
.nbs-tree :deep(.n-tree-node-content__text) {
  color: #333;
  transition: color 0.2s ease;
}
.nbs-tree :deep(.n-tree-node--clickable:hover .n-tree-node-content__text) {
  color: #2563eb;
  font-weight: 600;
}

/* 🌼 선택된 노드 강조 */
.nbs-tree :deep(.n-tree-node--selected .nbs-tree-node-content__text) {
  color: #1d4ed8;
  font-weight: 700;
}

/* 🌱 연결 라인 부드럽게 */
.nbs-tree {
  --n-line-color: #d4d4d8;
  --n-line-offset-top: -2px;
  --n-line-offset-bottom: -2px;
}
</style>
