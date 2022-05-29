import { param, body } from 'express-validator'

export const IdParam = param('id').notEmpty().isLength({ min: 2, max: 10 })

export const IdBody = body('id').notEmpty().isLength({ min: 2, max: 10 })
export const Pwd = body('pwd').notEmpty()
