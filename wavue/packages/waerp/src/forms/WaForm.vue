<template>
  <n-form
      :model="form"
      size="small"
      label-placement="left"
      label-width="110"
      class="nbs-form-search"
  >
    <n-grid :cols="4" x-gap="3" y-gap="3">
      <n-form-item-gi
          v-for="(field, index) in columns"
          :key="index"
          :label="field.label"
          :path="field.path"
      >
        <!-- ✅ 필드 타입에 따라 동적 렌더링 -->
        <component
            :is="getComponentType(field)"
            v-model:value="form[field.path]"
            :placeholder="field.placeholder"
            :options="field.options"
            size="tiny"
            clearable
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import { NForm, NFormItemGi, NGrid, NInput, NSelect, NDatePicker, NInputNumber } from "naive-ui"

/* ✅ props 정의 */
const props = defineProps({
  form: { type: Object, required: true },
  columns: { type: Array, required: true },
})

/* ✅ 동적 컴포넌트 결정 함수 */
function getComponentType(field) {
  switch (field.type) {
    case 'select': return NSelect
    case 'date': return NDatePicker
    case 'number': return NInputNumber
    default: return NInput
  }
}
</script>

<style scoped>
.nbs-form-search {
  background-color: #fafafa;
  padding: 8px;
  border-radius: 6px;
}
</style>
