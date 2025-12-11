import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { ProxyOptions } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  const proxyTarget = env.VITE_PROXY_TARGET

  const proxy: Record<string, string | ProxyOptions> | undefined = proxyTarget
    ? {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              proxyReq.removeHeader('origin')
            })
          },
        },
      }
    : undefined

  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      open: true,
      proxy,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})

