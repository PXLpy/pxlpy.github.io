// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    app: {
        baseURL: "/", // repo name to build correctly for github-pages
    },
    modules: ["@nuxtjs/tailwindcss"],
    vite: {
        plugins: [],
        server: {
            watch: {
                usePolling: true,
            },
        },
    },
    typescript: {
        strict: true,
        shim: false,
    },
    // es-lint: ignore
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
    },
});
