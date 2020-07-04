# Vault - A multi platform desktop wallet for the NKN blockchain

## About
This is the electron port of the official NKN wallet.js available at [https://vault.rule110.io](https://vault.rule110.io). It also uses open queries available through the [NKN Open API](https://github.com/rule110-io/nkn-open-api).

## Build Setup

``` bash
# install dependencies
npm install

# serve app with hot reload
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

# check for missing translations
npm run vue-i18n-extract report -v "./src/renderer/{components,layouts,pages}/**/*.?(js|vue)" -l "./src/renderer/lang/*.?(js|json)"

```

---

This project was generated with [electron-nuxt](https://github.com/michalzaq12/electron-nuxt) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).


