declare namespace NodeJS {
  interface ProcessEnv {
    JWTSECRET: string
    DB_NAME: string
    DB_PWD: string
    DB: string
    DB_HOST: string
    DB_DIALECT: string
  }
}
