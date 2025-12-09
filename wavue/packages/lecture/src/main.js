import { createApp, ref, h } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { NConfigProvider, darkTheme, lightTheme, koKR } from 'naive-ui'
import naive from 'naive-ui'
import App from './App.vue'
import router from './router'
import { themes } from './themes'
import './assets/global.css'
import './assets/wagrid.css'
import { useTabStore } from '@/stores/tabStore'   // ✅ 추가

//import 'highlight.js/styles/stackoverflow-light.css'
//import 'highlight.js/styles/github-dark.css'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from "@highlightjs/vue-plugin"

// 🌿 Pinia 초기화
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 🌗 Naive UI Theme 설정
const Root = {
    setup() {
        const isDark = ref(false)
        return () =>
            h(
                NConfigProvider,
                {
                    theme: isDark.value ? darkTheme : lightTheme,
                    themeOverrides: isDark.value ? themes.dark : themes.light,
                    locale: koKR
                },
                { default: () => h(App, { isDark: isDark.value }) }
            )
    }
}
hljs.registerLanguage('javascript', javascript);

const app = createApp(Root)
app.use(pinia)
app.use(router)
app.use(naive)
app.use(hljsVuePlugin)
// ✅ Pinia와 Router 연결 후 mount
app.mount('#app')

// ✅ Router 이동 시 TabStore 동기화
router.afterEach((to) => {
    // 로그인 페이지는 제외
    if (to.path === '/login') return

    const tabStore = useTabStore()
    const name = to.meta?.title || to.name || '홈'
    const path = to.fullPath

    // 이미 열린 탭이면 선택만
    const exists = tabStore.tabs.find((t) => t.path === path || t.key === to.name?.toUpperCase())
    if (exists) {
        tabStore.setActiveTab(exists.key || to.name?.toUpperCase())
    } else {
        // 새 탭 추가
        tabStore.addTab(to.name || path, name)
    }
})
