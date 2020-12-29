import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from './types';
import { compare, hash } from 'bcrypt'
import { BCRYPT_WORK_FACTOR } from '../config';

export function userFactory (sequelize: Sequelize): UserStatic {
    const userModel = <UserStatic>sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

    userModel.beforeSave(async (user) => {
        if (user.previous('password') != user.password) {
            user.password = await hash(user.password, BCRYPT_WORK_FACTOR)
        }
    });

    userModel.prototype.matchesPassword = function (password: string) { 
        return compare(password, this.password)
    }

    return userModel
}