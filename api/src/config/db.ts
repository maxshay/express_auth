import { Options } from 'sequelize'

const { POSTGRES_URI } = process.env

export const POSTGRES_CONNECTION_STRING: any = POSTGRES_URI

export const POSTGRES_OPTIONS: Options = { logging: false }