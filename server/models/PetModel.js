/**
 * 使用实例好的sequelize对象对将pet表映射为一个对象，然后后台只需要进行操作的就是pet对象
 */

 const Sequelize = require('sequelize')
 const ModelHead = require('./ModelHead')

 const PetModel = ModelHead.define('pets', {
     id: {
         type: Sequelize.BIGINT, primaryKey: true
     },
     uid: Sequelize.BIGINT,
     nickname: Sequelize.STRING,
     petType: {
        type: Sequelize.STRING,
        field: 'pet_type'
     },
     petBreed: {
         type: Sequelize.STRING,
         field: 'pet_breed'
     },
     sex: Sequelize.STRING,
     age: Sequelize.INTEGER,
     petIntroInfo: {
         type: Sequelize.STRING,
         field: 'pet_intro_info'
     },
     petPhoto: {
         type: Sequelize.STRING,
         field: 'pet_photo'
     },
     updatedTime: {
         type: Sequelize.DATE,
         field: 'updated_time'
     },
     createdTime: {
         type: Sequelize.DATE,
         field: 'created_time'
     }
 }, {
    timestamps: false, // 如果不加这个sequelize就会自动在数据库表中加上updatetime和createtime
    freezeTableName: false // freezeTableName为false表示该模型对应的表明就为userinfo表，默认时为true，对应表名为userinfos
})

 module.exports = PetModel;