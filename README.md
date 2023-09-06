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
          // Omit Public and treat Resources as output directory,
          // to avoid having a public manifest.json
          outDir: './packages/site-distribution/Resources/',
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
