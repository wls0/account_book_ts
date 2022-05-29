import express from 'express'
const router = express.Router()
import { IdBody, Pwd } from '../users/users.validators'
import { Validator } from '../../lib/validator'
import { LocalPassport } from './passport'
import { Login, LoginFail, TokenFail } from './login.service'

router.post(
  '/',
  [IdBody, Pwd, Validator],
  LocalPassport.authenticate('local', {
    failureRedirect: '/login/fail',
    session: false,
  }),
  Login,
)
router.get('/fail', LoginFail)
router.get('/token-fail', TokenFail)

export default router
