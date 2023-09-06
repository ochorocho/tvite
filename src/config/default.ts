import {defineConfig} from 'vite'
import autoprefixer from 'autoprefixer';
import svgLoader from 'vite-svg-loader';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export function defaultConfig(mode: string = 'production') {
    return defineConfig({
        mode: 'production',
        plugins: [
            svgLoader(),
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
                    assetFileNames: 'Public/[name]-[hash].[ext]',
                    entryFileNames: 'Public/[name]-[hash].js'
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
        },
        server: {
            origin: `${process.env.DDEV_PRIMARY_URL}:${process.env.VITE_PRIMARY_PORT}`,
        },
    })

}
