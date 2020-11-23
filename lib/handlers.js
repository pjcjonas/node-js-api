// Dependencies
const _data = require("./data");
const helpers = require("./helpers");

// Define Handlers
let handlers = {};

handlers.users = (data, callback) => {
    const acceptableMethods = ["post", "get", "put", "delete"];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        handlers.notfound(405);
    }
}

// Container sub methods
handlers._users = {};

/**
 * Users - post
 * data - {firstName, lastName, phone, password, tosAgreement}
 * optional - N\A
 * @param {*} data 
 * @param {*} callback 
 */

handlers._users.post = (data, callback) => {
    // check all required fields are filled out
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone =  typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tossAgreement = typeof(data.payload.tossAgreement) == 'boolean' && data.payload.tossAgreement ? data.payload.tossAgreement : false;

    if (firstName && lastName && phone && password && tossAgreement) {
        // Make sure that the user does not already exist.
        _data.read('users', phone, (err, data) => {
            if (err) {
                // Hash the password - DONT STORE PASSWORDS AS READABLE TEXT
                const hashedPassword = helpers.hash(password);

                // Create user object
                const userObject = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'phone': phone,
                    'password': hashedPassword,
                    'tossAgreement': tossAgreement
                };

                _data.create('users', phone, userObject, (err) => {
                    if (!err) {
                        callback(200);
                    } else {
                        console.log(err);
                        callback(500, {"Error": "Could Not Create User"});
                    }
                })

            } else {
                // User already exists.
                callback(400, {"Error": "A user with that phone number already exists."})
            }
        });
    } else {
        callback(400, "Missing Required Fields");
    }
}

/**
 * Users - get
 * data - {}
 * 
 * @param {*} data 
 * @param {*} callback 
 */

handlers._users.get = (data, callback) => {}

/**
 * Users - put
 * data - {}
 * 
 * @param {*} data 
 * @param {*} callback 
 */

handlers._users.put = (data, callback) => {}

/**
 * Users - delete
 * data - {}
 * 
 * @param {*} data 
 * @param {*} callback 
 */

handlers._users.delete = (data, callback) => {}



// Ping Handler
handlers.ping = (data, callback) => {
    callback(200);
}

handlers.hello = (data, callback) => {
    callback(200, {message:"Welcome to the jungle"});
}

// Not found Handler
handlers.notfound = (data, callback) => {
    // callback http status code and payload object
    callback(404);
}

// Export handlers
module.exports = handlers;
