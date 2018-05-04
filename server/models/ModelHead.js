/**
 *  Sequelize会在初始化时设置一个连接池，这样你应该为每个数据库创建一个实例
 */

const Sequelize = require('sequelize');
const appConfig = require('../configs/appConfig');

module.exports = new Sequelize(appConfig.DATABASE, appConfig.USER, appConfig.PASSWORD, {
    host: appConfig.HOST,
    port: appConfig.PORT,
    dialect: appConfig.DIALECT,
    pool: appConfig.POOL
})
