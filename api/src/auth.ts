import { Request, Response } from 'express'
import { SESSION_NAME } from './config'

export const logIn = (req: Request, userId: string | undefined) => {
    // console.log(req.session!.userId + " " + userId)
    if (userId) {
        req.session!.userId = userId
        req.session!.createdAt = Date.now()
    }
}

export const logOut = (req: Request, res: Response) =>
  new Promise<void>((resolve, reject) => {
    req.session!.destroy((err: Error) => {
        if (err) reject(err)

        if (SESSION_NAME === undefined) {
            throw new Error('env vars not working')
        } else {
            res.clearCookie(SESSION_NAME)
        }
        resolve()
    })
  })


export const isLoggedIn = (req: Request) => {
    // console.log(req.session)
    return !!req!.session!.userId
}