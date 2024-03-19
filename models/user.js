//Importing Sequelize Class
const Sequelize = require('sequelize');
//Importing the sequelize database instance created in database.js
const sequelize = require('../util/database.js');

//Creating a model (table) "user" using the sequelize instance
const User = sequelize.define('user', {
    id:{    //Column Object with the Constarints Object
        type: Sequelize.INTEGER,    //datatype
        autoIncrement: true,        //constraints
        primaryKey: true,           //constraints
        allowNull: false            //constraints
    },  
    name: Sequelize.STRING, //name-column with its datatype
    phone: Sequelize.INTEGER,
    email: Sequelize.STRING
})

//Exporting this User table to be used by Controller
module.exports = User;