import { Router } from 'express'
import { User } from '../models'
import { auth, catchAsync } from '../middleware'
const router = Router()

router.get('/home', auth, catchAsync(async (req, res) => {
    const user = await User.findByPk(req.session!.userId, { attributes: ['id', 'email', 'name', 'createdAt', 'updatedAt']})
    res.json(user)
}))

export default router   