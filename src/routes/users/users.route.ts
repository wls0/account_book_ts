import { Router } from 'express'
const router = Router()
import { Validator } from '../../lib/validator'
import { CheckUserId, CreateUser } from './users.service'
import { IdParam, IdBody, Pwd } from './users.validators'

router.get('/:id', [IdParam, Validator], CheckUserId)
router.post('/signup', [IdBody], [Pwd, Validator], CreateUser)

export default router
