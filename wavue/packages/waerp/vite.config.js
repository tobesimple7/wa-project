import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'   // ✅ 추가 부분
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],   // ✅ .md 파일도 Vue처럼 처리
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => false
                }
            }
        }),
        Markdown({
            // 필요시 옵션 지정 가능 (예: markdown-it 플러그인 추가 등)
            // markdownItSetup(md) {
            //   md.use(require('markdown-it-anchor'))
            // }
        })
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    server: {
        port: 5173
    }
})
