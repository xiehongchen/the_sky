import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('mode', mode)
  console.log('process', process.cwd())
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-imports.d.ts',
        eslintrc: { enabled: true },
      }),
      components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 别名
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    server: {
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     target: env.VITE_SERVER,
      //     changeOrigin: true, //开启代理
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
