//Importing the Sequelize Class
const Sequelize = require('sequelize');

//Creating a new sequelize instance for the node_booking_appointment DB
const sequelize = new Sequelize(
    'node_booking_appointment', //DB name
    'root',     //username
    'guna',     //password
    {
        dialect: 'mysql',   //Specifying the sequelize to use mysql
        host: 'localhost'   //Specifying host as localhost
    }
)

//Exporting the created DB instance
module.exports = sequelize;