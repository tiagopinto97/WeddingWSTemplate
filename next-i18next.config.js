/** @type {import('next-i18next').UserConfig} */

const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend = require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

const isBrowser = typeof window !== 'undefined'

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  // debug: true,
  i18n: {
    locales: ['default', 'pt', 'en'],
    defaultLocale: 'default',

    localeDetection: false,
  },
  trailingSlash: true,

  //debug: true,
  defaultNS: "common",
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development', // Useful during development
  react: { useSuspense: false },
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : []
}