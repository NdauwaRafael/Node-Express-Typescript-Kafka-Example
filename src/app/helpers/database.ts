import {Sequelize} from "sequelize";


const env = process.env.NODE_ENV || 'development';
const config = require( '../config/config.ts')[env];

export const db:any = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect
});