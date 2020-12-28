import { Sequelize } from 'sequelize'

import { POSTGRES_CONNECTION_STRING, POSTGRES_OPTIONS } from '../config'

import { userFactory } from './user';

export const db = new Sequelize(POSTGRES_CONNECTION_STRING, POSTGRES_OPTIONS)

export const User = userFactory(db)