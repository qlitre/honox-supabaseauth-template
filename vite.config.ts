import build from '@hono/vite-build/cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [honox({ devServer: { adapter } }), build()],
  ssr: {
    external: ['@supabase/supabase-js'],
  },
  server: {
    watch: {
      ignored: ['**/C:/DumpStack.log.tmp', '**/C:\\DumpStack.log.tmp'],
      usePolling: true, // ポーリングベースの監視に切り替え
      interval: 1000    // ポーリングの間隔を調整
    }
  },
})
