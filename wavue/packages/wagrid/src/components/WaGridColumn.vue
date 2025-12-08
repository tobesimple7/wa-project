<template></template>

<script setup lang="ts">
import {inject, onMounted, onBeforeUnmount} from 'vue'
import {ColumnDef} from '@/core/columns/ColumnDef'
import {COLUMN_KIND} from "@/core/columns/ColumnEnum";

export interface columnDef {
  name: any,
  text?: any,
  type?: any,
  children?: any,
  dataType?: any,
  width?: any,
  editable?: any,
  visible?: any,
  align?: any,
  scale?: any,
  roundType?: any,
  fixedScale?: any,
  scaleMax?: any,
  scaleMin?: any,
  showZero?: any,
  commaUnit?: any,
  thousandChar?: any,
  decimalChar?: any,
  currencyChar?: any,
  className?:  any,
  resizable?: any,
  sortable?: any,
  movable?: any,
  autoResizable?: any,
  autoWidth?: any,
  summaryType?: any,
  required?: any,
  combo?: any
  format?: any,
  kind?: any,
  rowSpan?: any,
  colSpan?: any,
  rowIndex?: any,
  colIndex?: any,
  subRowSpan?: any,
  subColSpan?: any,
  order?: any,
  value?: any,
  header?: any
}

const props = defineProps<columnDef>()

// 부모로 등록/해제 함수 주입
const register = inject<(col: ColumnDef) => void>('wagrid_register')
const unregister = inject<(name: string) => void>('wagrid_unregister')

onMounted(() => {
    register?.({ ...props })
})

onBeforeUnmount(() => {
    if (props.name) unregister?.(props.name)
})
</script>

<style scoped>

</style>