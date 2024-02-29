// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/image'],
    runtimeConfig: {
        public: {
            baseURL: "http://localhost:8080",
        }
    },
    routeRules: {
        '/login': {ssr: false},
        '/robot/qr/**': {ssr: false}
    },
})