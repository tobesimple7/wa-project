<template>
  <WaGrid
      style="padding-top:5px; width: 100%; height: 300px;"
      :id="gridId1"
      :columns="columns1"
      :options="options1"
      :data="rows1"
      :gridConfigs="gridConfigs"
      @ready="onReady1"
  />
  <WaGrid
    style="padding-top:5px; width: 100%; height: 300px;"
    :id="gridId2"
    :columns="columns2"
    :options="options2"
    :data="rows2"
    :gridConfigs="gridConfigs"
    @ready="onReady2"
  />
</template>
<script setup lang="ts">
import {ref, computed} from 'vue'
import { waGridConfigs } from "@/components/WaGridConfigs"
import WaGrid from '@/components/WaGrid.vue'
import {grid_data} from "@/components/wagrid_data.js"; 
import { WaGridColumnDef } from '@/core/columns/ColumnDef';

const gridConfigs = waGridConfigs;

const columns1: WaGridColumnDef[] = [
    { name: "ACCTG_TRANS_ID", header: {text: "Code"}, width: 100, editable: true }
  , { name: "ACCTG_TRANS_TYPE_ID", header: {text: "Manager"}, width: 100}
  , { name: "DESCRIPTION", header: {text: "Customer"}, width: 100}
  , { name: "SCHEDULED_POSTING_DATE", header: {text: "Biz Number"}, width: 100}
  , { name: "VOUCHER_DATE", header: {text: "ceo"}, width: 100}
]
const columns2: WaGridColumnDef[] = [
    { name: "ACCTG_TRANS_ID", header: {text: "Code"}, width: 100, editable: true }
  , { name: "ACCTG_TRANS_TYPE_ID", header: {text: "Manager"}, width: 100}
  , { name: "DESCRIPTION", header: {text: "Customer"}, width: 100}
  , { name: "SCHEDULED_POSTING_DATE", header: {text: "Biz Number"}, width: 100}
  , { name: "VOUCHER_DATE", header: {text: "ceo"}, width: 100}
]
const rows1 = []
const rows2 = []

const options1 = {}
const options2 = {}

const gridId1 = 'grid1'
const gridId2 = 'grid2'

const grid1 = ref(null)
const grid2 = ref(null)

// const grid1 = computed(() => waGrid1.value?.grid)
// const grid2 = computed(() => waGrid2.value?.grid)

function onReady1(waGrid) {
  grid1.value = waGrid;
  let count = grid1.value.getRowCount();
  grid1.value.setData([]);
}
function onReady2(waGrid) {
  grid2.value = waGrid;
  grid2.value.setData([]);
}
</script>