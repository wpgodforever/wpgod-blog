import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 需要安装 @types/node
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    // 别名
    alias: {
      '@': resolvePath('src'),
      '@/api': path.resolve(__dirname, '..', 'src/api')
    },
    // extensions: [".ts", ".js"],
  },
})

/**
 * 配置路径
 * @param paths 路径
 * @returns
 */
 function resolvePath(paths: string): string {
  return resolve(__dirname, paths);
}
