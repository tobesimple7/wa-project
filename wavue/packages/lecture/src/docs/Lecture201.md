### 1. Composition API (Vue 3 / script setup)

```vue
<template></template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello Options API')
function hello() {
  alert('hello')
}
// return 필요 없음 (자동 노출)
</script>
<style scoped>
.input { 
  color: red; 
}
</style>
```


### 2. Composition API (Vue 3 / setup 함수)
```vue
<template></template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello Options API')

    function hello() {
      alert('hello')
    }

    return { 
      message, 
      hello 
    } // 반드시 반환해야 템플릿에서 사용 가능
  }
}
</script>
<style scoped>
.input { 
  color: red; 
}
</style>
```
## 3.Options API (Vue 2)
```vue
<template></template>

<script>
export default {
  data() {
    return { 
      message: 'Hello Options API' 
    }
  },
  methods: {
    hello() { 
      alert(this.message) 
    }
  }
}
</script>

<style scoped>
.input { 
  color: red; 
}
</style>
```

### API 용어 이해
#### 함수형 API : array.map()	
#### 라이브러리 API : axios.get()	
#### HTTP API : http://localhost/user_list	
#### 브라우저 API : localStorage.setItem()	
