import express, { Response, Request, NextFunction }  from 'express'
import session, { Store } from 'express-session'
import { register } from './routes'
import { SESSION_OPTIONS } from './config'
import { internalServerError, notFound } from './middleware/errors'

export const createApp = (store: Store) => {

    const app = express() 
    app.use(express.json())

    app.use(
        session({
            ...SESSION_OPTIONS,
            store
        })
    )

    app.use(register)

    app.get('/', (req,res) => res.json({message: 'GOOD'}))

    app.use(notFound)
    
    app.use(internalServerError)

    return app 
}
