/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly VITE_SIYUAN_API_URL: string
    readonly VITE_SIYUAN_AUTH_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
