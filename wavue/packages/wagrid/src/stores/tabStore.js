import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabStore', {
  state: () => ({
    tabs: [],
    activeTab: '/',
  }),
  actions: {
    addTab(tab) {
      if (!this.tabs.find(t => t.path === tab.path)) {
        this.tabs.push(tab)
      }
      this.activeTab = tab.path
    },
    removeTab(path) {
      this.tabs = this.tabs.filter(t => t.path !== path)
      if (this.activeTab === path && this.tabs.length > 0) {
        this.activeTab = this.tabs[this.tabs.length - 1].path
      }
    },
  },
  persist: true
})
