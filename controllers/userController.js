//All the Database operations return a promise as a result
//Importing User table created from user.js file
const User = require('../models/user.js');

//Creating & exporting the getAppointments function
exports.getAppointments = (request, response, next)=>{
    console.log("Get Appointments...")
    //Finding all the entries in user table, this returns a promise
    User.findAll()
        .then((usersList)=>{
            //On success, we send the entries as a json response to the client
            response.json(usersList)
        })
}

//Creating & exporting the addAppointments function
exports.addAppointment = (request, response, next)=>{
    console.log("Add Appointment...", request.body);
    console.log(typeof request.body.id);
    //Checking if the received request contains the id
    //If yes, it indicates that we need to edit the entry (not to create a new entry)
    if(request.body.id)
    {
        //Finding the entry by its Primary Key
        User.findByPk(request.body.id)
            .then( (user)=>{
                //On success, we change the fields of entry with the content received in request
                user.name = request.body.name;
                user.phone = request.body.phone;
                user.email = request.body.email;
                //After modifying the data, we save it in DB & this returns a promise again
                return user.save();
            })
            .then( (user)=>{
                //On saving success, we pass the created entry to the client as json response
                response.json(user)
            })
            .catch(error=>console.log(error));
    }
    //If no id is present in the request body, we create a new entry
    else
    {
        //Creating a new entry in user table with the data from request
        User.create({
            name : request.body.name,
            phone : request.body.phone,
            email : request.body.email,
        })
        .then((userCreated)=>{
            //On successful creation, we send this created entry to client for using it
            response.json(userCreated);
        })
        .catch(error=>console.log(error));
    }
}

//Creating & exporting the deleteAppointment function
exports.deleteAppointment = (request, response, next)=>{
    console.log("Delete Appointment...", request.params.id);
    //Finding the entry by its Primary Key
    User.findByPk(request.params.id)
        .then( (userDelete)=>{
            //On succesfully finding, we destroy(delete) the entry
            return userDelete.destroy();
        })
        .then((userDelete)=>{
            //On successful destroy, we send the deleted entry to client
            response.json(userDelete);
        })
        .catch(error=>console.log(error));
}