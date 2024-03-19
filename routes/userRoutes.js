//Importing express
const express = require('express');
//Importing the userController.js file to perform different actions based on incoming calls
const userController = require('../controllers/userController.js');
//Importing body-parser to work with the requests recived in incoming server calls
const bodyParser = require('body-parser');

//Creating a router object
const router = express.Router();

//Telling router to use this bodyParser function to work with incoming request data & send response
router.use(bodyParser.json({extended: false}));

//calls getAppoinments of userController when '/appointments' is accessed with GET method
router.get('/appointments', userController.getAppointments)
//calls addAppoinment of userController when '/appointments' is accessed with POST method
router.post('/appointments', userController.addAppointment)
//calls deleteAppoinment of userController when '/appointments/:ANY_ID' is accessed with DELETE method
router.delete('/appointments/:id', userController.deleteAppointment)

//Exporting this router to be used in app.js for usage
module.exports = router;