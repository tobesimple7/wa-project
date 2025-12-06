<template>
  <div
    :id="gridId"
    ref="rootRef"
    class="wa-grid-root">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, provide, nextTick} from 'vue'
import type { Ref } from 'vue'
import { WaGridCore } from '@/core/wa.grid.core'
import type { WaGridOption } from '@/core/WaGrid.types'
import { waGridConfigs } from "@/components/WaGridConfigs"

// props 정의
const props = defineProps<{
  id: string
  columns?: any
  options?: WaGridOption
  data?: any[]
  gridConfigs?: object
}>()

// 이벤트: 기본은 ready 한 개만
const emit = defineEmits<{
  (e: 'ready', api: WaGridCore): void
}>()

// 실제 DOM 컨테이너
const rootRef: Ref<HTMLElement | null> = ref(null)

// WaGridBase가 사용하는 gridId (DOM id와 동일하게 유지)
const gridId = ref<string>(props.id)

// Core 인스턴스
const grid = ref<WaGridCore | null>(null)

// 선언형 컬럼 수집 공간
// const collectedColumns = ref<WaGridColumnDef[]>([])
//
// function registerColumn(column: WaGridColumnDef) {
//     const i = collectedColumns.value.findIndex(c => c.name === column.name)
//     if (i >= 0) collectedColumns.value[i] = column
//     else collectedColumns.value.push(column)
// }
// function unregisterColumn(name: string) {
//     collectedColumns.value = collectedColumns.value.filter(c => c.name !== name)
// }
//
// provide('wagrid_register', registerColumn)
// provide('wagrid_unregister', unregisterColumn)

onMounted(async () => {
  // gridConfigs 안 넘기면 WaGridBase가 내부 gridConfigs 사용함
  const configArg = props.gridConfigs as any | typeof waGridConfigs

  // 1) Core 생성
  grid.value = new WaGridCore(props.id, configArg)
  await nextTick()

  // 2) 컬럼 + 옵션 세팅
  if (props.columns && props.columns.length) {
    const opt = (props.options ?? {}) as any
    ;(grid.value as any).setGrid(props.columns, opt)
  // }
  // else if (collectedColumns && collectedColumns.value.length) {
  //   const opt = (props.options ?? {}) as any
  //   ;(grid.value as any).setGrid(collectedColumns.value, opt)
  } else if (props.options) {
    // 컬럼 없이 옵션만 먼저 적용하고 싶을 경우
    if ((grid.value as any).createOption) {
        ;(grid.value as any).createOption(props.options)
    }
  }

  // 3) 초기 데이터 세팅
  if (props.data && props.data.length && (grid.value as any).setData) {
    ;(grid.value as any).setData(props.data)
  }

  // 부모에서 Core API 직접 쓰고 싶을 때
  emit('ready', grid.value!)
})

// data 변경 시 → setData 다시 호출
watch(
    () => props.data,
    (data) => {
      if (!grid.value || !(grid.value as any).setData) return
      if (!data) {
        ;(grid.value as any).setData([])
      } else {
        ;(grid.value as any).setData(data)
      }
    },
    { deep: true } //값이 변경되어야 감시가 되지만, 참조 같은 경우를 위해서 true를 사용
)

// columns / options 변경 시 → setGrid 다시 호출
watch(
    () => [props.columns, props.options] as const,
    ([cols, opt]) => {
      if (!grid.value || !(grid.value as any).setGrid) return
      if (!cols || !cols.length) return
          ;(grid.value as any).setGrid(cols, (opt ?? {}) as any)
    },
    { deep: true }
)

// 언마운트 시 정리
onBeforeUnmount(() => {
  if (grid.value && (grid.value as any).destroy) {
    ;(grid.value as any).destroy()
  }
  grid.value = null
})

// 부모에서 ref로 Core에 직접 접근 가능하게 노출
defineExpose({
  grid,
  gridId: gridId
})
</script>

<style scoped>
.wa-grid-root {
  width: 100%;
  height: 100%;
  /* 높이/패딩은 사용하는 쪽에서 style로 조절:
     <WaGrid style="padding-top:5px; height:600px" /> */
}
</style>
