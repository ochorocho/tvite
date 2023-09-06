#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const helper_1 = require("./helper");
const args = (0, minimist_1.default)(process.argv.slice(2));
const cmd = args._[0] || 'help';
// import { defaultVideConfig } from `${process.cwd()}vite.config.js`;
switch (cmd) {
    case 'version':
        // const require = createRequire(import.meta.url);
        console.log(require('../package.json').version);
        break;
    case 'build':
        (0, helper_1.getConfig)('build', 'production').then((config) => {
            (0, helper_1.build)(config.typo3.entryPoints, config);
        });
        break;
    case 'serve':
        (0, helper_1.getConfig)('build', 'production').then((config) => {
            (0, helper_1.serve)(config.typo3.entryPoints, config);
        });
        break;
}
//# sourceMappingURL=cli.js.map