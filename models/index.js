const config=require('../configs/db.config.js');
const Sequelize=require('sequelize');


//connection of the database

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect
    }
);

const db={

};

db.Sequelize=sequelize;
db.sequelize=sequelize;
db.user=require('./user.model.js')(db.sequelize,Sequelize);
module.exports=db;


/**
 * call the function in present the category model file 
 * (sequelize,Sequelize) 
 *
 * 
 * 
 * 
 * db={
    Sequelize:
    sequelize:
    user:function (){

    }
   

}
*/
