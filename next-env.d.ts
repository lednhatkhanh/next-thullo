/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN_SECRET: string;
  }
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
