# Expermental! TYPO3 Vite

Minimal `vite.config.js` file:

```js
import {defineTypo3Config} from 'tvite'

export default defineTypo3Config(() => {
  return {
    mode: 'production',
    typo3: {
      entryPoints: {
        'site-distribution': {
          input: './packages/site-distribution/Resources/Private/Assets/JavaScript/app.js',
          outDir: './packages/site-distribution/Resources/Public/',
        }
      }
    },
    server: {
      origin: `${process.env.DDEV_PRIMARY_URL}:${process.env.VITE_PRIMARY_PORT}/`,
    },
  }
});
```

## Install

```bash
npm install git+github.com:ochorocho/tvite.git#main
```

## Commands

Run build:

```bash
./node_modules/.bin/tvite build
```

Run dev server:

```bash
./node_modules/.bin/tvite serve
```
