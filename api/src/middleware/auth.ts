import { Request, Response, NextFunction } from 'express'
import { SESSION_ABSOLUTE_TIMEOUT } from '../config'
import { isLoggedIn, logOut } from '../auth'
import { Unauthorized } from '../errors'
import { catchAsync } from './errors'

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
        return next(new Unauthorized('Already logged in.'))
    }
    next()
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    if (!isLoggedIn(req)) {
        return next(new Unauthorized('Already must be logged in.'))
    }
    next()
}

export const active  = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      if (isLoggedIn(req)) {
        const now = Date.now()
        const { createdAt } = req.session
  
        if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
          await logOut(req, res)
          return next(new Unauthorized('Session expired'))
        }
      }
  
      next()
    }
)