// https://nuxt.com/docs/api/configuration/nuxt-config
const releaseRes = await fetch('https://api.github.com/repos/joncorv/filera/releases/latest', {
  headers: { Accept: 'application/vnd.github+json' }
}).catch(() => null)

const latestTag: string = releaseRes?.ok
  ? await releaseRes.json().then((d: { tag_name: string }) => d.tag_name)
  : 'filera-v0.4.25'

export default defineNuxtConfig({
  runtimeConfig: {
    public: { latestTag }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  compatibilityDate: '2025-01-15',

  vite: {
    optimizeDeps: {
      include: []
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
