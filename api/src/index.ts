import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
require('dotenv').config({path: __dirname+'/.env'});

import { createApp } from './app'

// config
import { REDIS_OPTIONS, APP_PORT } from './config'

// db models 
import { db } from './models';


;(async () => {
    db.sync().then(() => console.log('Connected and synced to database.'))
        .catch(err => console.log(`Error connecting: \n${err}`))

    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)

    const store = new RedisStore({client})

    const app = createApp(store)

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))

})()

