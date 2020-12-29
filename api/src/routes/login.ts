import { Router } from 'express'
const router = Router()
import { User } from '../models'
import { logIn, logOut } from '../auth'
import { guest, auth, catchAsync } from '../middleware'
import { BadRequest, Unauthorized } from '../errors'
import { loginSchema, validate } from '../validation'

router.post('/login', guest, catchAsync(async (req, res) => {
    await validate(loginSchema, req.body)
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (!user || !(await user.matchesPassword(password))) {
        throw new Unauthorized('Invalid email or password')
    }

    logIn(req, user?.id?.toString())

    res.json({message: 'OK'})


}))

router.post('/logout', auth, catchAsync(async (req, res) => {

    await logOut(req, res)
    res.json({message: 'OK'})

}))

export default router