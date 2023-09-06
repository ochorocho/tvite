import {loadConfigFromFile, defineConfig, mergeConfig, ConfigEnv, build as viteBuild, createServer} from "vite";
import {defaultConfig} from './config/default.js'
import path from "node:path";

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
}

