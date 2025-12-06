import { reactive } from 'vue'

export const auth = reactive({
  user: JSON.parse(sessionStorage.getItem('user')) || null,

  login(username, password) {
    if (username === 'admin' && password === '1234') {
      this.user = { name: '관리자', username }
      sessionStorage.setItem('user', JSON.stringify(this.user))
      return true
    }
    return false
  },

  logout() {
    this.user = null
    sessionStorage.removeItem('user')
  },

  isLoggedIn() {
    return this.user !== null
  }
})
