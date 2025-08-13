import { addNewContact, 
        getContacts, 
        getContactWithID, 
        updateContact, 
        deleteContact } from "../controllers/crmController";

const routes = (app) => {
    app.route('/contact') //this allows the get, put, and delete commands
    
    // get all contacts
    .get((req, res, next) => {  //get all contacts
        // middleware, used to call functions
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
        
    }, getContacts)
    

    // post a new contact
    .post(addNewContact);     

    app.route('/contact/:contactId')

    // get a specific contact
    .get(getContactWithID) 

    // update a contact
    .put(updateContact)

    // delete a contact
    .delete(deleteContact)

}


export default routes;
