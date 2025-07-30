import {addNewContact, getContacts, getContactWithID} from "../controllers/crmController";

const routes = (app) => {
    app.route('/contact') //this allows the get, put, and delete commands
    
    .get((req, res, next) => {  //get all contacts
        // middleware, used to call functions
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
        
    }, getContacts)
    


    .post(addNewContact);      // post a new contact

    

    app.route('/contact/:contactId')

    .get(getContactWithID)  // get specific contact

    .put((req,res) =>
        res.send('PUT request successful!')
    )


    .delete((req,res) =>
        res.send('DELETE request successful!')
    )

}


export default routes;
