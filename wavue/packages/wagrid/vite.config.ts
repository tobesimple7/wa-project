// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'node:path'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            // 타입 생성 기준 루트
            entryRoot: 'src',

            // .vue 포함 (폴더 단위로 지정하는 편이 안전)
            include: ['src', 'types'],
            exclude: ['**/*.test.*', 'node_modules', 'dist'],

            // 한 번의 실행으로 두 위치에 타입 출력
            outDir: ['dist/types', 'types'],

            insertTypesEntry: true, // dist/types/index.d.ts 엔트리 생성
            rollupTypes: true,      // 타입 번들 (권장)
            copyDtsFiles: true,     // 기존 d.ts도 복사
            cleanVueFileName: true, // SFC 파일명 깔끔하게
            staticImport: true,
            //logDiagnostics: false,
            //skipDiagnostics: true,
            // tsconfig 강제 지정(모노레포/서브패키지일 때 유용)
            tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'WaGrid',
            formats: ['es', 'umd'],
            fileName: (format) =>
                format === 'es' ? 'wagrid.esm.js' : 'wagrid.umd.js',
        },
        outDir: 'dist',
        emptyOutDir: false,
        sourcemap: false,
        cssCodeSplit: false,
        rollupOptions: {
            external: ['vue', /^vue(\/.+)?$/, 'xlsx', 'file-saver'],
            output: {
                globals: {
                    vue: 'Vue',
                    xlsx: 'XLSX',
                    'file-saver': 'saveAs',
                },
                exports: 'named',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) return 'wagrid.css'
                    return assetInfo.name || '[name].[ext]'
                },
            },
        },
        minify: 'terser',
        terserOptions: {
            format: { comments: false },
            compress: { drop_console: true, drop_debugger: true },
            keep_classnames: true,
            keep_fnames: true,
        },
    },
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
        extensions: ['.ts', '.js', '.vue'],
    },
})
