import Joi from 'joi'

const password = Joi.string().min(8).max(72, 'utf8')
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
    .required()

const email = Joi.string().email().min(8).max(254).lowercase().trim().required()

export const registerSchema = Joi.object({
    email,
    name: Joi.string().min(2).max(128).trim().required(),
    password,
    passwordConfirm: Joi.valid(Joi.ref('password')).required()
}) 

export const loginSchema = Joi.object({
    email,
    password
})