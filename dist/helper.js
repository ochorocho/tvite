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
// export async function  getEntryPoints(test) {
//   let entryPoints = []
//   await FastGlob(test, {
//     dot: false,
//     unique: true,
//     onlyFiles: true,
//     extglob: true
//   }).then((files) => {
//     files.forEach((file) => {
//       let matchDetails = file.match(globRegex.replace(test));
//       entryPoints.push({ source: matchDetails[0], folder: matchDetails[1], file: matchDetails[2], suffix: matchDetails[3] })
//     })
//   })
//
//   return entryPoints;
// }
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
    //server.watcher.add('/Users/jochen/Development/test-tvite/assets/site-distribution')
    // for (const entry of Object.keys(entryPoints)) {
    //   let entryConfig = {
    //     build: {
    //       rollupOptions: {
    //         input: entryPoints[entry].input
    //       },
    //       outDir: entryPoints[entry].outDir,
    //     }
    //   }
    //
    //   // const __dirname = fileURLToPath(new URL('.', import.meta.url))
    //
    //   ;(async () => {
    //     let config = await mergeConfig(defaultConfig, entryConfig)
    //
    //     const server = await createServer(config)
    //     await server.listen()
    //
    //     server.printUrls()
    //   })()
    // let config = mergeConfig(defaultConfig, entryConfig)
    // const ExtPath = entryPoints[entry].outDir;
    // const server = await createServer({
    //   ...config,
    //   configFile: false,
    //   root: ExtPath,
    //   server: {
    //     host: true,
    //   },
    // })
    //
    // await server.listen()
    // server.printUrls()
    // server.then((src) => {
    //   src.listen().then((server) => {
    //     server.printUrls()
    //   });
    // })
}
exports.serve = serve;
//# sourceMappingURL=helper.js.map