const { Sequelize } = require("sequelize");
const mysql = require('mysql2')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: 'mysql'
})
module.exports = sequelize;


