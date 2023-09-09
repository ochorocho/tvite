"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = exports.build = exports.getConfig = exports.defineTypo3Config = void 0;
const vite_1 = require("vite");
const default_js_1 = require("./config/default.js");
const node_path_1 = __importDefault(require("node:path"));
function getMode() {
    const modeValueIndex = process.argv.indexOf('--mode') + 1;
    if (process.argv.length >= modeValueIndex && !process.argv[modeValueIndex].startsWith('--')) {
        return process.argv[modeValueIndex];
    }
    return 'production';
}
function defineTypo3Config(config) {
    return config;
}
exports.defineTypo3Config = defineTypo3Config;
async function getConfig(command, mode, configFile = 'vite.config.js') {
    let configEnv = {
        command: command,
        mode: mode,
    };
    let projectConfig = await (0, vite_1.loadConfigFromFile)(configEnv, node_path_1.default.join(process.cwd(), configFile));
    return (0, vite_1.mergeConfig)(projectConfig.config, (0, default_js_1.defaultConfig)(mode), false);
}
exports.getConfig = getConfig;
async function build(entryPoints, defaultConfig) {
    Object.keys(entryPoints).forEach((entry) => {
        let entryConfig = {
            build: {
                rollupOptions: {
                    input: entryPoints[entry].input
                },
                outDir: entryPoints[entry].outDir,
            }
        };
        (0, vite_1.build)((0, vite_1.mergeConfig)(defaultConfig, entryConfig));
    });
}
exports.build = build;
async function serve(entryPoints, defaultConfig) {
    let entryConfig = {
        build: {
            rollupOptions: {
                input: entryPoints['site-distribution'].input
            },
            outDir: entryPoints['site-distribution'].outDir,
        },
        server: {
            hmr: {
                onReload: (info) => {
                    // Print information about reloaded files
                    console.log('Reloaded files:', info.file, info.timestamp);
                },
            },
        }
    };
    let config = await (0, vite_1.mergeConfig)(defaultConfig, entryConfig);
    const server = await (0, vite_1.createServer)(config);
    await server.listen();
    server.printUrls();
}
exports.serve = serve;
//# sourceMappingURL=helper.js.map