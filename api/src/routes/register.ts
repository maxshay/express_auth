import { Router } from 'express'
const router = Router()
import { User } from '../models'
import { logIn } from '../auth'
import { guest, catchAsync } from '../middleware'
import { BadRequest } from '../errors'
import { registerSchema, validate } from '../validation'

router.post('/register', guest, catchAsync(async (req, res) => {

    // validate and get contents of request
    await validate(registerSchema, req.body)
  

    const { email, name, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (user) {
        throw new BadRequest('Invalid email.')
    }

    const newUser = await User.create({
        email, name, password
    })

    logIn(req, newUser?.id?.toString() ?? "999")

    res.json({message: 'OK'})


}))

export default router