import './assets/wagrid.css'

// src/index.ts
import type { App } from 'vue'
import WaGrid from './components/WaGrid.vue'
import { WaGridCore } from './core/WaGridCore'

export default WaGrid

export { WaGrid, WaGridCore }

export const WaGridPlugin = {
    install(app: App) {
        app.component('wa-grid', WaGrid)
    }
}