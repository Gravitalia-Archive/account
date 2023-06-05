interface ImportMetaEnv {
    readonly API_URL: string;
    readonly CDN_URL: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}