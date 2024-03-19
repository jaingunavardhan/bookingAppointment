//Importing express
const express = require('express');
//Importing the database instance from database.js file
const sequelize = require('./util/database.js')
//Importing the router from userRoutes.js file
const userRoutes =require('./routes/userRoutes.js')
//Importing cors (used to avoid browser from blocking the server calls to other server)
//In this, we call localhost as api from other html page which is not a part of the localhost
const cors = require('cors');

//Creating the express server
const app = express();

//Implementing cors to make sure browser don't block from other files to interact with localhost
app.use(cors());

//Intimating userRoutes to handle the incoming calls
app.use(userRoutes)

//Synchronising the Database with the created database instance
sequelize.sync()
    .then((result)=>{
        //On DB Sync success, we start listening on port 4000
        app.listen(4000);
    })
    .catch(error=>console.log(error))

