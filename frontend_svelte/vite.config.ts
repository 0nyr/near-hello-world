import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
    process: {
      env: {}
    }
  },
  plugins: [
    inject({ Buffer: ['buffer', 'Buffer'] }),
    svelte()
  ]
})
