<template>
  <n-card
      size="small"
      class="nbs-card"
  >
    <p>거래처 화면입니다. 탭 상태가 유지됩니다.</p>
    <n-dynamic-tags :max="5" />
  </n-card>
</template>
<script setup>
defineOptions({ name: 'sample' })
import {NCard} from "naive-ui";

</script>
