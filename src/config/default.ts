import {defineConfig} from 'vite'
import autoprefixer from 'autoprefixer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export function defaultConfig(mode: string = 'production') {
    return defineConfig({
        mode: 'production',
        plugins: [
            ViteImageOptimizer(),
        ],
        publicDir: false,
        base: '',
        build: {
            manifest: true,
            target: 'es2020',
            rollupOptions: {
                input: '',
                output: {
                    assetFileNames: '[name]-[hash].[ext]',
                    entryFileNames: '[name]-[hash].js'
                }
            },
            outDir: 'vite-outDir-not-configured', // @todo: better config error handling
            emptyOutDir: false,
        },
        css: {
            devSourcemap: true,
            postcss: {
                plugins: [
                    autoprefixer({})
                ],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `$mode: ${mode};`,
                },
            },
        }
    })

}
