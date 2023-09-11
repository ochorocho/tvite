import {
  loadConfigFromFile,
  defineConfig,
  mergeConfig,
  ConfigEnv,
  build as viteBuild,
  createServer,
  ViteDevServer
} from "vite";
import {defaultConfig} from './config/default.js'
import path from "node:path";

function getMode() {
  const modeValueIndex = process.argv.indexOf('--mode') + 1;
  if (process.argv.length >= modeValueIndex && !process.argv[modeValueIndex].startsWith('--')) {
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
  let port: number = parseInt(process.env.VITE_PRIMARY_PORT)

  for (const entry of Object.keys(entryPoints)) {
    let entryConfig = {
      build: {
        rollupOptions: {
          input: entryPoints[entry].input
        },
        outDir: entryPoints[entry].outDir,
      },
      server: {
        port: port + 1,
        origin: `${process.env.DDEV_PRIMARY_URL}:${port + 1}`,
        //host: process.env.DDEV_HOSTNAME
      }
    }

    let config = await mergeConfig(entryConfig, defaultConfig)
    const server = await createServer(config)
    await server.listen()

    server.printUrls()
  }
}
