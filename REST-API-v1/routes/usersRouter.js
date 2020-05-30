const express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    getDB = require('../middleware/getDB'),
    textFile = (process.cwd() + '/database/db.txt');

router.get('/', getDB, (req, res) => { // GET to the users route displays all the collection of users

    res.json(req.db_data.users);

});

router.get('/:user_id', getDB, validID, (req, res) => { // GET a specific user from the DB

    res.status(200).json({

        status: 200,
        message: 'Valid user requested',
        user_data: req.user_data

    });

});

router.post('/', getDB, validNewUser, (req, res) => {

    let newDB = req.db_data.users, // orginal DB but will be new once newUser is pushed to it
        newUser = req.body;

    newDB.push(newUser);

    const stringifiedDB = JSON.stringify(newDB);

    fs.writeFileSync(textFile, stringifiedDB);

    res.status(200).json({

        status: 200,
        message: 'User succesfully created',
        new_user: newUser,
        new_user_id: newDB.indexOf(newUser) + 1

    });

});

// PATCH
// DELETE

//* ############### Middleware for requests ###############
function validID(req, res, next) { // this validates if the requested user ID exists, if not responds with error

    const usersDB = req.db_data.users,
        amountOfUsers = usersDB.length,
        requestedID = req.params.user_id;

    if (isNaN(requestedID)) {

        return res.status(400).json({

            status: 400,
            message: `The ID you have requested in not a number, only numbers are valid ID's. Please enter an ID from the range below`,
            users_range: `1 to ${amountOfUsers}`,
            requested_id: requestedID

        });

    }

    if (requestedID > amountOfUsers || requestedID < 0) {

        return res.status(404).json({

            status: 404,
            message: `The user ID you have requested: ${requestedID}, is not a valid id within the database, please ensure the requested ID is within the correct range found below`,
            users_range: `1 to ${amountOfUsers}`,
            requested_id: requestedID

        })

    }

    req.user_data = usersDB[requestedID - 1];

    next();

};

function validNewUser(req, res, next) { // validates the data being created for a user; all fields are present else error

    const { owner: nO, pet: nP, breed: nB, favorites: nF } = req.body,
        newUserObj = {
            owner: nO,
            pet: nP,
            breed: nB,
            favorites: nF
        },
        newUserObjKeys = Object.keys(newUserObj), // used for length and their data in below code
        reqBodyKeys = Object.keys(req.body), // used for length and their data in below code 
        missingFields = [];

    for (const field in newUserObj) {

        if (!newUserObj[field]) {

            missingFields.push[field];

        }

    }

    if (reqBodyKeys.length != newUserObjKeys.length) {

        return res.status(400).json({

            status: 400,
            message: 'Request body length requirement not met',
            required_fields: newUserObjKeys,
            supplied_request: reqBodyKeys

        });

    } else if (missingFields.length != 0) {

        return res.status(400).json({

            status: 400,
            message: 'Missing required fields',
            required_fields: newUserObjKeys,
            supplied_request: reqBodyKeys

        });

    }

    req.body = newUserObj;

    next();

};

module.exports = router; //! STOP FORGETTING TO EXPORT!!!