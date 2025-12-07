// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      include: ['src', 'types'],
      exclude: [
        '**/*.test.*',
        '**/*.test.vue',
        'node_modules',
        'dist',
        'src/App.vue',    // ← 와일드카드보다 명시 경로가 안전
        'src/views/**',   // ← views 이하 전부 제외
      ],
      outDir: ['dist/types', 'types'],
      insertTypesEntry: true,
      rollupTypes: true,
      copyDtsFiles: true,
      cleanVueFileName: true,
      staticImport: true,
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),

      // ✅ 마지막 세이프가드: 실제 파일 쓰기 직전에 걸러냄
      beforeWriteFile: (filePath, content) => {
        // d.ts 생성 경로 기준 필터
        if (
          filePath.includes('/views/') ||
          filePath.includes('\\views\\') ||
          /[\\/]?App\.vue(\.d\.ts)?$/.test(filePath) ||
          /\.test\.vue\.d\.ts$/.test(filePath)
        ) {
          return undefined; // ← 이 파일은 생성하지 않음
        }
        return { filePath, content };
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'WaGrid',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'wagrid.esm.js' : 'wagrid.umd.js'),
    },
    outDir: 'dist',
    emptyOutDir: false, // types 유지 목적이면 그대로 OK
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue', /^vue(\/.+)?$/, 'xlsx', 'file-saver'],
      input: [path.resolve(__dirname, 'src/index.ts')],
      plugins: [
        // 번들 단계에서도 .test.vue는 확실히 무시
        {
          name: 'exclude-test-vue',
          load(id) {
            if (id.endsWith('.test.vue')) return '';
          },
        },
      ],
      output: {
        globals: { vue: 'Vue', xlsx: 'XLSX', 'file-saver': 'saveAs' },
        exports: 'named',
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css') ? 'wagrid.css' : assetInfo.name || '[name].[ext]',
      },
      // ✅ 사이드이펙트 없는 모듈을 더 잘 제거
      treeshake: { moduleSideEffects: false },
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
