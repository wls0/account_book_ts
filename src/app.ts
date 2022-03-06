import 'dotenv/config'
import ERROR from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'

import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import compression from 'compression'
import userRouter from './routes/user'
import cors from 'cors'
import accountRouter from './routes/account'

import { Send } from './lib/lib'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())

app.use('/user', userRouter)
app.use('/account', (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.user
  try {
    if (token !== '') {
      app.use('/account', accountRouter)
    } else {
      throw ERROR(401)
    }
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      throw ERROR(401)
    } else if (error.status !== 401) {
      throw ERROR(500)
    }
  }
  next()
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  Send(res, { code: error.status, result: error.expose, msg: error.message, data: '' })
})

export default app
