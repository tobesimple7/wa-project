<template>
  <div class="login-container">
    <n-card title="로그인" style="width: 360px; margin: 120px auto;">
      <n-form @submit.prevent="onLogin">
        <n-form-item label="아이디">
          <n-input v-model:value="username" placeholder="아이디를 입력하세요" />
        </n-form-item>
        <n-form-item label="비밀번호">
          <n-input v-model:value="password" type="password" placeholder="비밀번호를 입력하세요" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" block @click="onLogin">로그인</n-button>
        </n-form-item>
      </n-form>
      <div v-if="error" style="color: red; margin-top: 8px;">{{ error }}</div>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../stores/auth'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import { NMessageProvider } from 'naive-ui'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const loading = ref(false)
const formRef = ref(null)

function onLogin() {
  //handleLogin()
  if (auth.login(username.value, password.value)) {
    router.push('/')
  } else {
    error.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
  }
}

async function handleLogin () {
  loading.value = true
  try {
    const res = await axios.post('https://localhost:8443/accounting/control/login',
        new URLSearchParams({
          USERNAME: 'admin',
          PASSWORD: 'ofbiz',
          JavaScriptEnabled: 'Y',
          requirePasswordChange: 'N'
        }),
        {
          withCredentials: true // ✅ OFBiz 세션 유지 (JSESSIONID 쿠키 공유)
        }
    )
    // await axios.post('https://localhost:8443/accounting/control/ajaxLogin',
    //     new URLSearchParams({
    //       USERNAME: 'admin',
    //       PASSWORD: 'ofbiz',
    //       JavaScriptEnabled: 'Y',
    //       requirePasswordChange: 'N'
    //     }),
    //     {
    //       withCredentials: true // ✅ OFBiz 세션 유지 (JSESSIONID 쿠키 공유)
    //     }
    // )
    //console.log('로그인 결과:', res.data) //{ "userLoginId": "admin", "status": "success" }

    console.log('data', res2)
    //if (res.data?.login === 'success' || res.data?.responseMessage === 'success') {
      //message.success('로그인 성공!')
      // 예시: 로그인 후 ERP 메인으로 이동
      //window.location.href = '/accounting/control/main'
    //} else {
      //message.error('로그인 실패! 아이디/비밀번호를 확인하세요.')
    //}
  } catch (err) {
    console.error(err)
    //message.error('서버 통신 오류')
  } finally {
    const res2 = await axios.post('https://localhost:8443/accounting/control/listAcctgTrans',
        new URLSearchParams({
          organizationPartyId: 'Company',
          performSearch: 'Y'
        }),
        {
          withCredentials: true // ✅ OFBiz 세션 유지 (JSESSIONID 쿠키 공유)
        }
    )
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
}

.login-card {
  width: 320px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.login-footer {
  text-align: center;
  color: #999;
  margin-top: 8px;
}
</style>
