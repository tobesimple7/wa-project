<template>
    <n-card title="탭 A">
        <n-input v-bmodel:value="code_name" placeholder="A 입력값" />
    </n-card>
  <wa-grid>
  </wa-grid>
</template>

<script setup>
import { ref } from 'vue'
import { NCard, NInput } from 'naive-ui'
const code_name = ref('')
const code_id = ref('')

function a() {
    return 'abc';
}
</script>

<!--<template>-->
<!--    <WaGrid-->
<!--        style="padding-top:5px; width: 100%; height: 600px;"-->
<!--        :options="options"-->
<!--        :data="rows"-->
<!--        @ready="onReady">-->
<!--        <WaGridColumn name="code"></WaGridColumn>-->
<!--        <WaGridColumn name="code_name"></WaGridColumn>-->
<!--    </WaGrid>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import type { WaGridOption } from '@/core/WaGrid.types'-->
<!--import WaGrid from '@/components/WaGrid.vue'-->
<!--import WaGridColumn from "@/components/WaGridColumn.vue";-->

<!--const options: WaGridOption = {}-->

<!--const rows = ref<any[]>([]);-->

<!--function onReady(api: any) {-->
<!--    // 필요하면 여기서 api.setRowHeight(...) 같은 코어 함수도 바로 사용 가능-->
<!--    // api.setRowHeight('content', 24)-->
<!--}-->
<!--</script>-->