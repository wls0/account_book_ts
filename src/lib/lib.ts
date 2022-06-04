import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'

export const ERROR = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode
  if (err.statusCode === null) {
    statusCode = 500
  } else {
    statusCode = err.statusCode
  }
  res.status(statusCode).json({
    code: statusCode,
    result: false,
    msg: err.message,
    data: '',
  })
  next()
}

export const Send = (res: Response, data: any) => {
  res.status(200).json({
    code: 200,
    result: true,
    msg: '',
    data,
  })
}

export const Password = (data: { pwd: string; salt: string }) => {
  const { pwd, salt } = data
  const password = crypto
    .createHash('sha512')
    .update(pwd + salt)
    .digest('hex')
  return password
}

export const CreateSalt = () => {
  const salt = Math.round(new Date().valueOf() + Math.random()) + ''
  return salt
}
