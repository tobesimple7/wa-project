import { reactive } from 'vue'

export const auth = reactive({
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  login(username, password) {
    // if (username === 'admin' && password === '1234') {
    //   this.user = { name: '관리자'}
    //   sessionStorage.setItem('user', JSON.stringify(this.user))
    //   return true
    // }
    // return false
    this.user = { name: '관리자'}
    sessionStorage.setItem('user', JSON.stringify(this.user))    
    return true
  },

  logout() {
    this.user = null
    sessionStorage.removeItem('user')
  },

  isLoggedIn() {
    return this.user !== null
  }
})
