// vite.config.ts
import { defineConfig } from "file:///D:/NODE/99.source/wavue_framework/node_modules/.pnpm/vite@5.4.21_@types+node@22.18.12_terser@5.44.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/NODE/99.source/wavue_framework/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_550cbe2963448acf1cf5eac073b0f726/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/NODE/99.source/wavue_framework/node_modules/.pnpm/vite-plugin-dts@4.5.4_@type_427902e0e1c44beabc331aa369f8c827/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "D:\\NODE\\99.source\\wavue_framework\\packages\\WaGrid";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      // 타입 생성 기준 루트
      entryRoot: "src",
      // .vue 포함 (폴더 단위로 지정하는 편이 안전)
      include: ["src", "types"],
      exclude: ["**/*.test.*", "node_modules", "dist"],
      // 한 번의 실행으로 두 위치에 타입 출력
      outDir: ["dist/types", "types"],
      insertTypesEntry: true,
      // dist/types/index.d.ts 엔트리 생성
      rollupTypes: true,
      // 타입 번들 (권장)
      copyDtsFiles: true,
      // 기존 d.ts도 복사
      cleanVueFileName: true,
      // SFC 파일명 깔끔하게
      staticImport: true,
      //logDiagnostics: false,
      //skipDiagnostics: true,
      // tsconfig 강제 지정(모노레포/서브패키지일 때 유용)
      tsconfigPath: path.resolve(__vite_injected_original_dirname, "tsconfig.json")
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "WaGrid",
      formats: ["es", "umd"],
      fileName: (format) => format === "es" ? "wagrid.esm.js" : "wagrid.umd.js"
    },
    outDir: "dist",
    emptyOutDir: false,
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ["vue", /^vue(\/.+)?$/, "xlsx", "file-saver"],
      output: {
        globals: {
          vue: "Vue",
          xlsx: "XLSX",
          "file-saver": "saveAs"
        },
        exports: "named",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "wagrid.css";
          return assetInfo.name || "[name].[ext]";
        }
      }
    },
    minify: "terser",
    terserOptions: {
      format: { comments: false },
      compress: { drop_console: true, drop_debugger: true },
      keep_classnames: true,
      keep_fnames: true
    }
  },
  resolve: {
    alias: { "@": path.resolve(__vite_injected_original_dirname, "src") },
    extensions: [".ts", ".js", ".vue"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxOT0RFXFxcXDk5LnNvdXJjZVxcXFx3YXZ1ZV9mcmFtZXdvcmtcXFxccGFja2FnZXNcXFxcV2FHcmlkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxOT0RFXFxcXDk5LnNvdXJjZVxcXFx3YXZ1ZV9mcmFtZXdvcmtcXFxccGFja2FnZXNcXFxcV2FHcmlkXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9OT0RFLzk5LnNvdXJjZS93YXZ1ZV9mcmFtZXdvcmsvcGFja2FnZXMvV2FHcmlkL3ZpdGUuY29uZmlnLnRzXCI7Ly8gdml0ZS5jb25maWcudHNcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHZ1ZSgpLFxyXG4gICAgICAgIGR0cyh7XHJcbiAgICAgICAgICAgIC8vIFx1RDBDMFx1Qzc4NSBcdUMwRERcdUMxMzEgXHVBRTMwXHVDOTAwIFx1QjhFOFx1RDJCOFxyXG4gICAgICAgICAgICBlbnRyeVJvb3Q6ICdzcmMnLFxyXG5cclxuICAgICAgICAgICAgLy8gLnZ1ZSBcdUQzRUNcdUQ1NjggKFx1RDNGNFx1QjM1NCBcdUIyRThcdUM3MDRcdUI4NUMgXHVDOUMwXHVDODE1XHVENTU4XHVCMjk0IFx1RDNCOFx1Qzc3NCBcdUM1NDhcdUM4MDQpXHJcbiAgICAgICAgICAgIGluY2x1ZGU6IFsnc3JjJywgJ3R5cGVzJ10sXHJcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFsnKiovKi50ZXN0LionLCAnbm9kZV9tb2R1bGVzJywgJ2Rpc3QnXSxcclxuXHJcbiAgICAgICAgICAgIC8vIFx1RDU1QyBcdUJDODhcdUM3NTggXHVDMkU0XHVENTg5XHVDNzNDXHVCODVDIFx1QjQ1MCBcdUM3MDRcdUNFNThcdUM1RDAgXHVEMEMwXHVDNzg1IFx1Q0Q5Q1x1QjgyNVxyXG4gICAgICAgICAgICBvdXREaXI6IFsnZGlzdC90eXBlcycsICd0eXBlcyddLFxyXG5cclxuICAgICAgICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSwgLy8gZGlzdC90eXBlcy9pbmRleC5kLnRzIFx1QzVENFx1RDJCOFx1QjlBQyBcdUMwRERcdUMxMzFcclxuICAgICAgICAgICAgcm9sbHVwVHlwZXM6IHRydWUsICAgICAgLy8gXHVEMEMwXHVDNzg1IFx1QkM4OFx1QjRFNCAoXHVBRDhDXHVDN0E1KVxyXG4gICAgICAgICAgICBjb3B5RHRzRmlsZXM6IHRydWUsICAgICAvLyBcdUFFMzBcdUM4NzQgZC50c1x1QjNDNCBcdUJDRjVcdUMwQUNcclxuICAgICAgICAgICAgY2xlYW5WdWVGaWxlTmFtZTogdHJ1ZSwgLy8gU0ZDIFx1RDMwQ1x1Qzc3Q1x1QkE4NSBcdUFFNTRcdUIwNTRcdUQ1NThcdUFDOENcclxuICAgICAgICAgICAgc3RhdGljSW1wb3J0OiB0cnVlLFxyXG4gICAgICAgICAgICAvL2xvZ0RpYWdub3N0aWNzOiBmYWxzZSxcclxuICAgICAgICAgICAgLy9za2lwRGlhZ25vc3RpY3M6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIHRzY29uZmlnIFx1QUMxNVx1QzgxQyBcdUM5QzBcdUM4MTUoXHVCQUE4XHVCMTc4XHVCODA4XHVEM0VDL1x1QzExQ1x1QkUwQ1x1RDMyOFx1RDBBNFx1QzlDMFx1Qzc3QyBcdUI1NEMgXHVDNzIwXHVDNkE5KVxyXG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGg6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICd0c2NvbmZpZy5qc29uJyksXHJcbiAgICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcclxuICAgICAgICAgICAgbmFtZTogJ1dhR3JpZCcsXHJcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PlxyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID09PSAnZXMnID8gJ3dhZ3JpZC5lc20uanMnIDogJ3dhZ3JpZC51bWQuanMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsIC9ednVlKFxcLy4rKT8kLywgJ3hsc3gnLCAnZmlsZS1zYXZlciddLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcclxuICAgICAgICAgICAgICAgICAgICB2dWU6ICdWdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHhsc3g6ICdYTFNYJyxcclxuICAgICAgICAgICAgICAgICAgICAnZmlsZS1zYXZlcic6ICdzYXZlQXMnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXHJcbiAgICAgICAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZT8uZW5kc1dpdGgoJy5jc3MnKSkgcmV0dXJuICd3YWdyaWQuY3NzJ1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSB8fCAnW25hbWVdLltleHRdJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAgICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAgICAgICBmb3JtYXQ6IHsgY29tbWVudHM6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIGNvbXByZXNzOiB7IGRyb3BfY29uc29sZTogdHJ1ZSwgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICBrZWVwX2NsYXNzbmFtZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGtlZXBfZm5hbWVzOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7ICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpIH0sXHJcbiAgICAgICAgZXh0ZW5zaW9uczogWycudHMnLCAnLmpzJywgJy52dWUnXSxcclxuICAgIH0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUE7QUFBQSxNQUVBLFdBQVc7QUFBQTtBQUFBLE1BR1gsU0FBUyxDQUFDLE9BQU8sT0FBTztBQUFBLE1BQ3hCLFNBQVMsQ0FBQyxlQUFlLGdCQUFnQixNQUFNO0FBQUE7QUFBQSxNQUcvQyxRQUFRLENBQUMsY0FBYyxPQUFPO0FBQUEsTUFFOUIsa0JBQWtCO0FBQUE7QUFBQSxNQUNsQixhQUFhO0FBQUE7QUFBQSxNQUNiLGNBQWM7QUFBQTtBQUFBLE1BQ2Qsa0JBQWtCO0FBQUE7QUFBQSxNQUNsQixjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJZCxjQUFjLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsSUFDekQsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILEtBQUs7QUFBQSxNQUNELE9BQU8sS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUM3QyxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQ1AsV0FBVyxPQUFPLGtCQUFrQjtBQUFBLElBQzVDO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsTUFDWCxVQUFVLENBQUMsT0FBTyxnQkFBZ0IsUUFBUSxZQUFZO0FBQUEsTUFDdEQsUUFBUTtBQUFBLFFBQ0osU0FBUztBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsTUFBTTtBQUFBLFVBQ04sY0FBYztBQUFBLFFBQ2xCO0FBQUEsUUFDQSxTQUFTO0FBQUEsUUFDVCxnQkFBZ0IsQ0FBQyxjQUFjO0FBQzNCLGNBQUksVUFBVSxNQUFNLFNBQVMsTUFBTSxFQUFHLFFBQU87QUFDN0MsaUJBQU8sVUFBVSxRQUFRO0FBQUEsUUFDN0I7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ1gsUUFBUSxFQUFFLFVBQVUsTUFBTTtBQUFBLE1BQzFCLFVBQVUsRUFBRSxjQUFjLE1BQU0sZUFBZSxLQUFLO0FBQUEsTUFDcEQsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLElBQ2pCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTyxFQUFFLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUssRUFBRTtBQUFBLElBQzdDLFlBQVksQ0FBQyxPQUFPLE9BQU8sTUFBTTtBQUFBLEVBQ3JDO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
