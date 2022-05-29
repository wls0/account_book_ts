import crypto from 'crypto'
import { Request, Response } from 'express'

export const ERROR = (err: any, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    code: err.statusCode,
    result: false,
    msg: err.message,
    data: '',
  })
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
