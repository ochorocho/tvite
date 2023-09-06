import { build as viteBuild, defineConfig, mergeConfig , createServer} from 'vite';
import { getConfig } from './helper.js';
import path from 'node:path';

async function vite(config = {}, sharedViteConfig = {}, enableServer = false) {

    let viteConfig = mergeConfig(
        defaultVideConfig,
        {
            build: {
                rollupOptions: {
                    input: config.input,
                },
                outDir: config.output,
            },
        },
        false,
    );

    // merge shared vite config
    if (Object.keys(sharedViteConfig).length > 0) {
        viteConfig = mergeConfig(
            viteConfig,
            sharedViteConfig,
            false,
        );
    }

    // marge site package specific vite config
    if (config?.viteConfig && Object.keys(config.viteConfig).length > 0) {
        viteConfig = mergeConfig(
            viteConfig,
            config.viteConfig,
            false,
        );
    }

    if (enableServer) {
        const ExtPath = path.resolve(process.env.INIT_CWD, config.input.split('/Resources/')[0]);
        const server = await createServer({
            ...viteConfig,
            configFile: false,
            root: __dirname,
            server: {
                host: true,
            },
        })
        await server.listen();
        server.printUrls();
    } else {
        await viteBuild(viteConfig);
    }
}

export async function build(sitesConfig = {}, args = '',  enableServer = false) {
    if (args.site && sitesConfig.sites.get(args.site)) {
        vite(sitesConfig.sites.get(args.site).config, sitesConfig.sharedConfig, enableServer);
    } else {
        for (const [key, site] of sitesConfig.sites) {
            vite(site.config, sitesConfig.sharedConfig);
        }
    }
}
