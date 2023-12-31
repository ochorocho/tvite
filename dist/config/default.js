"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const vite_1 = require("vite");
const autoprefixer_1 = __importDefault(require("autoprefixer"));
const vite_plugin_image_optimizer_1 = require("vite-plugin-image-optimizer");
function defaultConfig(mode = 'production') {
    return (0, vite_1.defineConfig)({
        mode: 'production',
        plugins: [
            (0, vite_plugin_image_optimizer_1.ViteImageOptimizer)(),
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
            outDir: 'vite-outDir-not-configured',
            emptyOutDir: false,
        },
        css: {
            devSourcemap: true,
            postcss: {
                plugins: [
                    (0, autoprefixer_1.default)({})
                ],
            },
            preprocessorOptions: {
                scss: {
                    additionalData: `$mode: ${mode};`,
                },
            },
        }
    });
}
exports.defaultConfig = defaultConfig;
//# sourceMappingURL=default.js.map