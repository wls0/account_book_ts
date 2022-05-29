import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from '../../models/user'
import { Password } from '../../lib/lib'

const JWT = process.env.JWT

export const LocalPassport = passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'pwd',
    },
    async (id, pwd, done) => {
      const user = await User.findOne({ where: { id } })
      if (user === null) {
        return done(null, false)
      } else {
        const userPassword = user.password
        const salt = user.salt
        const pwdCheck = Password({ pwd, salt })
        if (userPassword === pwdCheck) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      }
    },
  ),
)

export const JwtPassport = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: JWT,
    },
    async (payload, done) => {
      try {
        const index = payload.check
        const user = await User.findOne({ where: { index } })
        if (user) {
          return done(null, user.index)
        } else {
          return done(null, false)
        }
      } catch (E) {
        return done(E)
      }
    },
  ),
)
