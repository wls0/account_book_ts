import { Request, Response, NextFunction } from 'express'
import httpError from 'http-errors'
import { Send } from '../../lib/lib'
import jwt from 'jsonwebtoken'
const JWT = process.env.JWT
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user
    if (user) {
      const info = {
        check: user.index,
      }
      const accessToken = jwt.sign(info, JWT, {
        expiresIn: '1d',
        issuer: 'localhost',
        subject: 'userInfo',
      })
      return Send(res, accessToken)
    } else {
      throw httpError(401)
    }
  } catch (E) {
    next(E)
  }
}

export const LoginFail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw httpError(404)
  } catch (E) {
    next(E)
  }
}

export const TokenFail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    throw httpError(401)
  } catch (E) {
    next(E)
  }
}
