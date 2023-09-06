#!/usr/bin/env node

import minimist from 'minimist';
import {getConfig, build, serve} from './helper'
import path from "node:path";

const args = minimist(process.argv.slice(2));
const cmd = args._[0] || 'help';
// import { defaultVideConfig } from `${process.cwd()}vite.config.js`;


switch (cmd) {
    case 'version':
        // const require = createRequire(import.meta.url);
        console.log(require('../package.json').version)
        break;
    case 'build':
        getConfig('build', 'production').then((config) => {
            build(config.typo3.entryPoints, config)
        })

        break;
    case 'serve':
        getConfig('build', 'production').then((config) => {
            serve(config.typo3.entryPoints, config)
        })

        break;
}
