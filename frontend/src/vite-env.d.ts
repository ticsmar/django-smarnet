/// <reference types="vite/client" />



interface ImportMetaEnv {

  readonly VITE_DJANGO_API_URL?: string;

  readonly VITE_API_URL?: string;

  readonly VITE_USE_MOCK?: string;

  readonly VITE_APP_RUNTIME_ENV?: string;

}



interface ImportMeta {

  readonly env: ImportMetaEnv;

}

