import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 需要安装 @types/node
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import baseUrl from './src/assets/js/baseUrl'

import { keywordReplace } from './vite-plugin.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    keywordReplace(),
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
  server: {
    host: '0.0.0.0',
    proxy: {
        '/api': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
            target: baseUrl,
            changeOrigin: true, //是否跨域
            rewrite: path => path.replace(/^\/api/, '')
        }
    }
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
