import './assets/wagrid.css'

// src/index.ts
import type { App } from 'vue'
import WaGrid from './components/WaGrid.vue'
import { WaGridCore } from './core/wa.grid.core'

// 👉 1) 기본 export는 컴포넌트
export default WaGrid

// 👉 2) named export로도 컴포넌트/코어 다 공개
export { WaGrid, WaGridCore }

// 👉 3) 그래도 plugin 패턴 쓰고 싶은 사람을 위한 옵션 (선택)
export const WaGridPlugin = {
    install(app: App) {
        app.component('wa-grid', WaGridCore)
    }
}