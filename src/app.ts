import 'dotenv/config'
import express from 'express'
import logger from 'morgan'
import compression from 'compression'
import cors from 'cors'
import httpError from 'http-errors'

import { ERROR } from './lib/lib'
import userRouter from './routes/users/users.route'
import loginRouter from './routes/login/login.route'
import accountRouter from './routes/accounts/accounts.route'
import { sequelize } from './models/index'
import { JwtPassport } from './routes/login/passport'

if (process.env.NODE_ENV === 'local1') {
  sequelize
    .sync()
    .then(() => {
      console.log(' DB 연결 성공')
    })
    .catch((E: any) => {
      console.log('연결 실패')
      console.log(E)
    })
}

const app = express()
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  }),
)

app.use(compression())
app.use(logger('dev'))
app.use(express.json())

app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use(
  '/accounts',
  JwtPassport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login/token-fail',
  }),
  accountRouter,
)

app.use(() => {
  throw httpError(404)
})

app.use(ERROR)

app.listen(3000, () => {
  console.log('server start!')
})

module.exports = app
