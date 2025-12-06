import { defineStore } from 'pinia'

export const usePageStore = defineStore('pageStore', {
  state: () => ({
    pageStates: {} // { home: { msg: '' }, about: { desc: '' } }
  }),
  actions: {
    setPageState(page, key, value) {
      if (!this.pageStates[page]) this.pageStates[page] = {}
      this.pageStates[page][key] = value
    },
  },
  persist: true
})
