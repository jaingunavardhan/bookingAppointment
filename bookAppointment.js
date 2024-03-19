//finding onordered list (ul) element by it's ID
const ulList = document.getElementById('list');

//A function to fetch data and create the list elements in ul
function fetchData()
{
    //Fetching the available appoints from localhost (from User table in DB)
    //axios returns a promise
    axios.get('http://localhost:4000/appointments')
        .then( (result)=>{
            console.log("In Fetch...", result.data);
            //The result will be of an Object type with other meta data
            const appointments = result.data
            //We fetch the data array which contains appointments data from the result
            //Iterating through the data array
            for(let i=0; i<appointments.length; i++)
            {
                //Calling createListItem to create a <li> tag inside <ul> tag
                createListItem(appointments[i]);
            }
        })
        .catch(error=>console.log(error));

}
//Calling fetchData() as soon as the html file is loaded to display available appointments
fetchData();

//Function to create a <li> tag inside <ul> tag
//Here, the argument is received from the calling function which received this from DB call
function createListItem(newUser)
{
    //Creating <li> tag element
    let listItem = document.createElement('li');
    //Writing the innerHTML-The text it should contain (like the textNode element)
    listItem.innerHTML = `${newUser.name} - ${newUser.phone} - ${newUser.email}`;
    //Creating a arrtibute with 'name' and value as 'id'
    listItem.setAttribute('name', 'id');
    //Creating a arrtibute with 'value' and its value as ID received from creating a new entry in DB
    listItem.setAttribute('value', newUser.id);

    //Creating the edit button inside of <li> tag
    let edit_btn = document.createElement('button');
    edit_btn.innerHTML = 'Edit';
    edit_btn.setAttribute('value', newUser.id);
    //Defining what to do when the edit button is clicked
    edit_btn.onclick = (event)=>{
        //Fetching the parentElement of this button
        const listItem = event.target.parentElement;
        //fetching the textContent of the parentElement without it's children's text & splitting the text
        const strArray = listItem.firstChild.textContent.split(' - ');
        document.getElementById('name').value = strArray[0];        
        document.getElementById('phone').value = strArray[1];        
        document.getElementById('email').value = strArray[2];     
        document.getElementById('id').value = event.target.value;        
        document.getElementById('form-button').innerHTML = "Edit Appointment";
        //Adding the fetched values to the form fields for editing & modifying button's DIsplay text
        //Then, removing this <li> tag from <ul> tag as <li> is child of <ul> tag
        ulList.removeChild(listItem);        
    }

    //Creating the delete button inside of the <li> tag
    let delete_btn = document.createElement('button');
    delete_btn.innerHTML = 'Delete';
    delete_btn.setAttribute('value', newUser.id);
    //Defining what to happen when Delete button is clicked
    delete_btn.onclick = (event)=>{
        //Fteching its parent element
        const listItem = event.target.parentElement;
        console.log("Delete ListItem...", listItem, event.target.value);
        //Calling the localhost using axios as api handler 
        axios.delete(`http://localhost:4000/appointments/${event.target.value}`)
            .then((userDeleted)=>{
                //Removing <li> tag from <ul> tag when axios api operation is success
                ulList.removeChild(event.target.parentElement);
            })
    }

    //Appending the Edit & Delete buttons to <li> tag
    listItem.appendChild(edit_btn);
    listItem.appendChild(delete_btn);
    //Appending <li> tag to <ul> tag
    ulList.appendChild(listItem);
}

//When the "Book Appointment" button inside <form> is clicked, this function is called
function bookAppointment(event)
{
    //Preventing the Default operation so that the actions are visible to us in real-time
    event.preventDefault();
    //Creating the newUser Object with the data values fro input fields
    const newUser = {
        name : event.target.name.value,
        phone : event.target.phone.value,
        email : event.target.email.value,
        id : event.target.id.value //This id would be '' (empty) by default 
        //This id is kept to access during the Edit Operation
    }
    
    //Api call to localhost with the newUser data to create a user in user table of DB
    axios.post('http://localhost:4000/appointments', newUser)
        .then((result)=>{
            console.log("AXIOS Post...", result)
            const newUser = result.data;
            //If the API call is success, we create a <li> tag for this data in <ul>tag
            createListItem(newUser);
        })
        .catch(error=>console.log(error));

    //Once the button is clicked, newUser created in DB, & <li> tag created for the same
    // We clear the input fields & restore their empty values
    event.target.name.value = '';
    event.target.phone.value = '';
    event.target.email.value = '';
    event.target.id.value = '';
    event.target.button.innerHTML = "Book Appointment";
}