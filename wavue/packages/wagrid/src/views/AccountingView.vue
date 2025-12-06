<template>
    <n-card
        size="small"
        class="compact-card"
        :content-style="{ padding: '8px 0px' }"
        :header-style="{ padding: '6px 12px', fontWeight: '600', fontSize: '14px' }"
        style="width: 100%;"
    >
    <template #header>
      전표 조회 (FA_010)
    </template>

    <template #header-extra>
      <n-space justify="end">
        <n-button type="primary" size="small" @click="handleSearch">조회</n-button>
        <n-button size="small" @click="handleReset">초기화</n-button>
      </n-space>
    </template>
    <n-form
        :model="form"
        size="small"
        label-placement="left"
        label-width="110"
        class="compact-form"
    >
      <n-grid :cols="3" x-gap="0" y-gap="0" >
        <n-form-item-gi label="전표번호" path="acctgTransId" >
          <n-input v-model:value="form.acctgTransId" placeholder="전표번호" size="tiny"/>
        </n-form-item-gi>

        <n-form-item-gi label="거래유형" path="acctgTransTypeId">
          <n-select
              v-model:value="form.acctgTransTypeId"
              :options="acctgTransTypeOptions"
              placeholder="선택"
              size="small"
              clearable
          />
        </n-form-item-gi>

        <n-form-item-gi label="회계연도유형" path="glFiscalTypeId">
          <n-select
              v-model:value="form.glFiscalTypeId"
              :options="glFiscalTypeOptions"
              placeholder="선택"
              size="small"
              clearable
          />
        </n-form-item-gi>

        <n-form-item-gi label="분개장" path="glJournalId">
          <n-select
              v-model:value="form.glJournalId"
              :options="glJournalOptions"
              placeholder="선택"
              size="small"
              clearable
          />
        </n-form-item-gi>

        <n-form-item-gi label="승인여부" path="isPosted">
          <n-select
              v-model:value="form.isPosted"
              :options="[
            { label: '아니오', value: 'N' },
            { label: '예', value: 'Y' }
          ]"
              placeholder="선택"
              size="small"
          />
        </n-form-item-gi>

        <n-form-item-gi label="송장번호" path="invoiceId">
          <n-input v-model:value="form.invoiceId" placeholder="송장번호" size="small" />
        </n-form-item-gi>

        <n-form-item-gi label="지급번호" path="paymentId">
          <n-input v-model:value="form.paymentId" placeholder="지급번호" size="small" />
        </n-form-item-gi>

        <n-form-item-gi label="제품번호" path="productId">
          <n-input v-model:value="form.productId" placeholder="제품번호" size="small" />
        </n-form-item-gi>

        <n-form-item-gi label="작업ID" path="workEffortId">
          <n-input v-model:value="form.workEffortId" placeholder="작업ID" size="small" />
        </n-form-item-gi>

        <n-form-item-gi label="출하ID" path="shipmentId">
          <n-input v-model:value="form.shipmentId" placeholder="출하ID" size="small" />
        </n-form-item-gi>

        <n-form-item-gi label="조회기간" path="fromDate" aria-colspan="4" :span="2">
          <n-space>
            <n-date-picker v-model:value="form.fromDate" type="date" size="small" placeholder="시작" />
            <n-date-picker v-model:value="form.thruDate" type="date" size="small" placeholder="종료" />
          </n-space>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>

  <div id="grid1" style="width: 100%; height: 100%"></div>

</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {
  NForm, NFormItemGi, NGrid,
  NInput, NSelect, NDatePicker, NButton,
  NSpace, NCard
} from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { waGridConfigs } from "../components/WaGridConfigs"
import "wagrid/waGridCss"
import { WaGrid } from '../core/wa.grid.core'

import { grid_data } from "../components/wagrid_data.js"

waGridConfigs.default
    const form = ref({
      acctgTransId: '',
      acctgTransTypeId: '',
      glFiscalTypeId: '',
      glJournalId: '',
      isPosted: '',
      invoiceId: '',
      paymentId: '',
      productId: '',
      workEffortId: '',
      shipmentId: '',
      fromDate: null,
      thruDate: null
    })

    const acctgTransTypeOptions = [
      { label: 'Journal Entry', value: 'JOURNAL' },
      { label: 'Payment', value: 'PAYMENT' }
    ]

    const glFiscalTypeOptions = [
      { label: 'Actual', value: 'ACTUAL' },
      { label: 'Budget', value: 'BUDGET' }
    ]

    const glJournalOptions = [
      { label: '일반분개장 [GL001]', value: 'GL001' },
      { label: '매출분개장 [GL002]', value: 'GL002' }
    ]

    function handleSearch () {
      console.log('검색조건:', form.value)
    }

    function handleReset () {
      Object.keys(form.value).forEach(k => form.value[k] = '')
    }

    const productCode = ref('')
    const showLookup = ref(false)
    const searchKeyword = ref('')

    // 샘플 상품 데이터
    const products = ref([
      { id: 'P1001', name: '볼펜', price: 500 },
      { id: 'P1002', name: '노트', price: 1000 },
      { id: 'P1003', name: '지우개', price: 300 }
    ])

    // 테이블 컬럼 정의
    const columns = [
      { title: '상품코드', key: 'id' },
      { title: '상품명', key: 'name' },
      { title: '단가', key: 'price' }
    ]

    // 검색 필터링
    const filteredProducts = computed(() =>
        products.value.filter(p =>
            p.name.includes(searchKeyword.value) || p.id.includes(searchKeyword.value)
        )
    )

    // 행 선택 시 input에 값 반영
    function handleSelect(row) {
      productCode.value = row.id
      showLookup.value = false
    }

    function searchProducts() {
      // 실제 환경에서는 axios 등으로 서버 검색 호출
      console.log('검색어:', searchKeyword.value)
    }

    onMounted(() => {

      const grid1 = new WaGrid('grid1', waGridConfigs);
      const options = {};
      const columns = [
        {name: "custcd", header: {text: "Code"}, width: 100}
        , {name: "usernm", header: {text: "Manager"}, width: 100}
        , {name: "custnm", header: {text: "Customer"}, width: 100}
        , {name: "bizno", header: {text: "Biz Number"}, width: 100}
        , {name: "ceo", header: {text: "ceo"}, width: 100}
        , {name: "tel", header: {text: "Telephone"}, width: 100}
        , {name: "email", header: {text: "E-Mail"}, width: 100}
        , {name: "saddr", header: {text: "Area"}, width: 100}
        , {name: "addr", header: {text: "Address"}, width: 100}
        , {name: "creditamt", header: {text: "Credit limit"}, type: 'number', scale: '18,2'}
        , {name: "payamt_d", header: {text: "Other Payable"}, type: 'number', scale: '18,2'}
        , {name: "getamt_d", header: {text: "Accounts receivable"}, type: 'number', scale: '18,2'}
        , {name: "useyn", header: {text: "Use"}, width: 60}
        , {name: "custnote", header: {text: "note"}, width: 100}
      ];
       grid1.setGrid(columns, options);
      // grid1.setData(grid_data);
    })
  </script>

<style scoped>

</style>
