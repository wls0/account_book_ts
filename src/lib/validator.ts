import { validationResult } from 'express-validator'
import httpError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

export const Validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw httpError(400)
  }
  next()
}
