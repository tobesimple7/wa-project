import { defineStore } from 'pinia'
import router from '@/router'

export const useTabStore = defineStore('tabStore', {
  state: () => ({
    tabs: [],
    activeTab: '',
    restoring: false       // ✅ 복원 중 여부 플래그
  }),
  persist: {
    storage: sessionStorage,   // ✅ 새로고침해도 유지
  },
  actions: {
    addTab(key, label) {
      if (this.restoring) return  // 복원 중이면 무시

      const keyClean = String(key).replace(/\//g, '')
      const upper = keyClean.toUpperCase()
      const lower = keyClean.toLowerCase()
      const exists = this.tabs.find(t => t.key === upper)

      // 1) 등록된 라우트에서 검색
      const routes = router.getRoutes()

      const matched = routes.find(r => r.name && String(r.name).toLowerCase() === lower)

      // 2) path 결정 (없으면 기존 규칙으로 폴백)
      let path = matched?.path ?? null

      // 3) 탭 추가/활성 + 라우팅
      if (!exists) {
          this.tabs.push({ key: upper, label, path, keepAlive: true })
      }

      this.activeTab = upper
      this.saveState()

      if (router.currentRoute.value.path !== path) {
          router.push(path)
      }
    },     
    setActiveTab(key) {
        if (this.restoring) return  // ✅ 복원 중이면 무시

        this.activeTab = key
        this.saveState()

        const tab = this.tabs.find(t => t.key === key)
        if (tab && router.currentRoute.value.path !== tab.path) {
            router.push(tab.path)
        }
    },
    closeTab(key) {
        if (this.restoring) return  // ✅ 복원 중이면 무시

        const index = this.tabs.findIndex(t => t.key === key)
        if (index === -1) return

        this.tabs.splice(index, 1)

        if (this.activeTab === key) {
            const newActive = this.tabs[index - 1] || this.tabs[index]
            if (newActive) this.setActiveTab(newActive.key)
            else this.addTab('HOME', '홈')
        }

        this.saveState()
    },
    saveState() {
        const simple = this.tabs.map(t => ({
            key: t.key,
            label: t.label,
            path: t.path
        }))
        sessionStorage.setItem('tabs', JSON.stringify(simple))
        sessionStorage.setItem('activeTab', this.activeTab)
    },
    async restoreSession() {
      this.restoring = true   // ✅ 시작

      const tabs = JSON.parse(sessionStorage.getItem('tabs') || '[]')
      const active = sessionStorage.getItem('activeTab')

      if (!tabs.length) {
          this.restoring = false
          return
      }

      this.tabs = tabs
      this.activeTab = active || (this.tabs[0]?.key ?? '')

      const activeTab = this.tabs.find(t => t.key === this.activeTab)
      if (activeTab && router.currentRoute.value.path !== activeTab.path) {
          await router.replace(activeTab.path)
      }

      this.restoring = false   // ✅ 끝
    }
  }
})
