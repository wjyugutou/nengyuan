import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
      ],
      dts: './types/auto-imports.d.ts',
      dirs: [
        './src/utils',
      ],
      vueTemplate: true,
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: './types/components.d.ts',
    })],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
})
