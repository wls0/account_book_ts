import httpError from 'http-errors'
import { IdFind, UserCreate } from './users.repository'
import { Send } from '../../lib/lib'
import { Password, CreateSalt } from '../../lib/lib'
import { Request, Response, NextFunction } from 'express'

export const CheckUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const check = await IdFind(id)
    if (!check) {
      return Send(res, true)
    } else {
      throw httpError(409)
    }
  } catch (E) {
    next(E)
  }
}

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, pwd } = req.body
    const userCheck = await IdFind(id)
    if (!userCheck) {
      const salt = CreateSalt()
      const password = Password({ pwd, salt })
      const result = await UserCreate({ id, password, salt })
      if (result) {
        return Send(res, '')
      } else {
        throw httpError(500)
      }
    } else {
      throw httpError(409)
    }
  } catch (E) {
    next(E)
  }
}
