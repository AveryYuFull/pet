/**
 * 实用实例好的sequelize对象进行user表的定义，来实现对象和表的映射关系
 */


const Sequelize = require('sequelize')
const ModelHead = require('./ModelHead')


const UserModel = ModelHead.define('users', {
    id: { type: Sequelize.BIGINT, primaryKey: true },
    email: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        field: 'pwd'
    },
    nickname: {
        type: Sequelize.STRING,
        field: 'nicheng'
    },
    updtime: Sequelize.DATE,
    role: Sequelize.TEXT('tiny'),
    createtime: Sequelize.DATE,
    msgnum: Sequelize.INTEGER
}, {
    timestamps: false, // 如果不加这个sequelize就会自动在数据库表中加上updatetime和createtime
    freezeTableName: false // freezeTableName为false表示该模型对应的表明就为userinfo表，默认时为true，对应表名为userinfos
})

module.exports = UserModel;
