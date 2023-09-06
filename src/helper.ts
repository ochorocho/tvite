import {loadConfigFromFile, defineConfig, mergeConfig, ConfigEnv, build as viteBuild, createServer} from "vite";
import {defaultConfig} from './config/default.js'
import path from "node:path";
import { fileURLToPath } from 'url'
import globRegex from "glob-regex";
import FastGlob from "fast-glob";

function getMode() {
  const modeValueIndex = process.argv.indexOf('--mode') + 1;
  if(process.argv.length >= modeValueIndex && !process.argv[modeValueIndex].startsWith('--')) {
    return process.argv[modeValueIndex]
  }

  return 'production'
}

export function defineTypo3Config(config) {
  return config
}

export async function getConfig(command, mode, configFile = 'vite.config.js') {
  let configEnv: ConfigEnv = {
    command: command,
    mode: mode,
  }

  let projectConfig = await loadConfigFromFile(configEnv, path.join(process.cwd(), configFile))

  return mergeConfig(projectConfig.config, defaultConfig(mode), false)
}

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

export async function build(entryPoints, defaultConfig) {
  Object.keys(entryPoints).forEach((entry) => {
    let entryConfig = {
      build: {
        rollupOptions: {
          input: entryPoints[entry].input
        },
        outDir: entryPoints[entry].outDir,
      }
    }

    viteBuild(mergeConfig(defaultConfig, entryConfig))
  })
}

export async function serve(entryPoints, defaultConfig) {
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
      }

  let config = await mergeConfig(defaultConfig, entryConfig)

  const server = await createServer(config)
  await server.listen()

  server.printUrls()
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

