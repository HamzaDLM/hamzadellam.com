import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core'],
            dts: 'src/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
                filepath: './eslint-auto-import.json',
                globalsPropValue: true,
            },
            vueTemplate: true,
        }),
        Components({
            dirs: ['src/components'],
            resolvers: [VueUseComponentsResolver()],
            extensions: ['vue'],
            deep: true,
            dts: 'src/components.d.ts',
        }),
    ],
    ssr: { noExternal: true },
    build: {
        outDir: 'dist',
    },
    base: '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
})
