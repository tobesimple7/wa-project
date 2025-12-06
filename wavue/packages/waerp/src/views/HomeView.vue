<template>
  <n-card
      size="small"
      class="nbs-card"
  >
      <p>환영합니다! 이 탭에 입력한 값은 탭을 이동해도 유지됩니다.</p>
      <n-input v-model:value="text" placeholder="홈 탭 상태 테스트: 여기에 입력해보세요" />
    <div>{{ text }}</div>
    </n-card>

</template>
<script setup>
import { ref } from 'vue'
import {NCard} from "naive-ui";
const text  = ref('')

</script>