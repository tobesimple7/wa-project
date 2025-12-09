<template>
  <n-space vertical>
    <n-card size="large">
      <template #header>[강의 7강] v-if / v-show</template>
    </n-card>

    <n-card size="medium">
      <template #header>(예제 1) v-if </template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" type="primary" @click="btnShow">보이기</n-button>
          <n-button size="small" type="primary" @click="btnHide">감추기</n-button>
          <n-button size="small" @click="btnInit">초기화</n-button>
        </n-space>
      </template>

      <div>
        <p id="P_TAG_ID" v-if="isShow">p 태그가 보입니다</p>
      </div>
    </n-card>

    <highlightjs language="html" :code="lectureDesc" />

    <n-card size="medium">
      <template #header>(예제 2) v-if / v-else-if / v-else</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" type="primary" @click="btnChangeAdmin2">관리자로 변경</n-button>
          <n-button size="small" type="primary" @click="btnChangeUser2">사용자로 변경</n-button>
          <n-button size="small" @click="btnInit2">초기화</n-button>
        </n-space>
      </template>

      <div>
        <p v-if="userType === 'admin'">관리자</p>
        <p v-else-if="userType === 'user'">사용자</p>
        <p v-else>게스트</p>
      </div>
    </n-card>

    <highlightjs language="javascript" :code="lectureDesc2" />

    <n-card size="medium">
      <template #header>(예제 3) v-show</template>
      <template #header-extra>
        <n-space justify="end">
          <n-button size="small" type="primary" @click="btnShow3">보이기</n-button>
          <n-button size="small" type="primary" @click="btnHide3">감추기</n-button>
          <n-button size="small" @click="btnInit3">초기화</n-button>
        </n-space>
      </template>

      <div>
        <p id="P_TAG" v-show="isShow3">p 태그가 보입니다</p>
      </div>
    </n-card>

    <highlightjs language="javascript" :code="lectureDesc3" />

    <n-card size="medium">
      <template #header>(예제 4) v-if 와 v-show (같은 태그에 같이 쓰지 말자)</template>
      <template #header-extra>
        <n-space justify="end">
          <!--<n-button size="small" type="primary" @click="">초기화</n-button>-->
        </n-space>
      </template>

      <div v-if="true">
        <p v-show="false">p 태그가 보여지지 않습니다.</p>
        <p v-show="true">p 태그가 보여집니다.</p>
      </div>
    </n-card>

    <highlightjs language="javascript" :code="lectureShow" />
  </n-space>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NButton, NSpace, NCard } from 'naive-ui'

// 예제 1
const isShow = ref(true)
function btnShow() {
  isShow.value = true
}
function btnHide() {
  isShow.value = false
}
function btnInit() {
  isShow.value = true
}

// 예제 2
const userType = ref('guest') // 'admin' | 'user' | 'guest'
function btnChangeAdmin2() {
  userType.value = "admin"
}
function btnChangeUser2() {
  userType.value = "user"
}
function btnInit2() {
  userType.value = "guest"
}

// 예제 3
const isShow3 = ref(true)
function btnShow3() {
  isShow3.value = true
}
function btnHide3() {
  isShow3.value = false
}
function btnInit3() {
  isShow3.value = true
}


function toggleLogin() {
  isLogin.value = !isLogin.value
}
function nextuserType() {
  userType.value = userType.value === 'guest' ? 'user' : userType.value === 'user' ? 'admin' : 'guest'
}

/** (예제 2) v-if vs v-show */
const visible = ref(true)

/** (예제 3) v-if + v-for */
const numbers = ref([1, 2, 3, 4, 5, 6, 7])
const onlyOdd = ref(false)
const filteredNumbers = computed(() =>
  onlyOdd.value ? numbers.value.filter(n => n % 2 === 1) : numbers.value
)
/** 주석 */
const lectureDesc = `
<template>
  <div>
    // v-if의 조건이 true 일 경우 p 태그가 생성됨
    <p v-if="isShow">p 태그가 보입니다</p>
  </div>

<script setup>
const isShow = ref(true)
`.trim()

/** 주석2 */
const lectureDesc2 = `
<template>
  <p v-if="userType === 'admin'">관리자</p>
  <p v-else-if="userType === 'user'">사용자</p>
  <p v-else>게스트</p>
</template>

<script setup>
const userType = ref('guest')
`.trim()

/** 주석3 */
const lectureDesc3 = `
<template>
  <div>
    <p id="P_TAG" v-show="isShow3">p 태그가 보입니다</p>
  </div>
<script setup>
const isShow3 = ref(true)
`.trim()

const lectureShow = `
<template>
  <div v-if="true">
    <p v-show="false">p 태그가 보여지지 않습니다.</p>
    <p v-show="true">p 태그가 보여집니다.</p>
  </div>


// v-if="true"  일 경우 dom에 div tag 생성
// v-if="false" 일 경우 dom에 div tag 제거

// v-show="true"  일 경우 dom에 항상 존재. p 태그가 표시됨
// v-show="false" 일 경우 dom에 항상 존재. p 태그가 표시 않됨 style="display:none" 이 발생함


// v-if는 생성과 제거에 사용됨으로 v-if > v-show 순서로 사용 하는 것이 좋다.
  </div>

`.trim()

const lectureIfFor = `
<li v-for="n in numbers" :key="n" v-if="n % 2 === 1">{{ n }}</li>

<!-- 권장: computed로 필터 후 v-for -->
<li v-for="n in filteredNumbers" :key="n">{{ n }}</li>

<script setup>
import { ref, computed } from 'vue'
const numbers = ref([1,2,3,4,5,6,7])
const filteredNumbers = computed(() => numbers.value.filter(n => n % 2 === 1))
`.trim()
</script>

<style scoped>
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.note { margin: 8px 0; color: #666; }
.warn { color: #c2410c; }
</style>
