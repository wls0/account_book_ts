declare namespace NodeJS {
  interface ProcessEnv {
    DB: string
    DB_NAME: string
    DB_PASSWORD: string
    NODE_ENV: string
    JWT: string
  }
}

declare namespace Express {
  interface User {
    index: number
  }
}
