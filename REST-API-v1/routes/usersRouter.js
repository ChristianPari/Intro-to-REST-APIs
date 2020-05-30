const express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    getDB = require('../middleware/getDB'),
    validID = require('../middleware/validID'),
    validNewUser = require('../middleware/validNewUser'),
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

router.post('/', getDB, validNewUser, (req, res) => { // POST/Create a new user

    let usersDB = req.db_data.users, // orginal DB but will be new once newUser is pushed to it
        newUser = req.body;

    usersDB.push(newUser);

    const stringifiedDB = JSON.stringify(usersDB);

    fs.writeFileSync(textFile, stringifiedDB);

    res.status(200).json({

        status: 200,
        message: 'User succesfully created',
        new_user: newUser,
        new_user_id: newDB.indexOf(newUser) + 1

    });

});

router.delete('/:user_id', getDB, validID, (req, res) => { // DELETE a user from the DB

    const userData = req.user_data,
        usersDB = req.db_data.users,
        userIdx = usersDB.indexOf(userData);

    usersDB.splice(userIdx, 1);

    const stirngifiedDB = JSON.stringify(usersDB);

    fs.writeFileSync(textFile, stirngifiedDB);

    res.status(200).json({

        status: 200,
        message: 'User succesfully deleted',
        deleted_user: userData

    });

});

router.patch('/:user_id', getDB, validID, (req, res) => { // PATCH/Update a user from within the DB

    const usersDB = req.db_data.users,
        userData = req.user_data,
        userIdx = usersDB.indexOf(userData),
        updatedUserData = req.body;

    for (const field in userData) {

        if (updatedUserData[field]) {

            userData[field] = updatedUserData[field];

        }

    }

    // change the users data in the db
    usersDB.splice(userIdx, 1, userData);

    const stringifiedDB = JSON.stringify(usersDB);

    fs.writeFileSync(textFile, stringifiedDB);

    res.status(200).json({

        status: 200,
        message: 'User succesfully updated',
        updated_user: userData

    });

});

module.exports = router; //! STOP FORGETTING TO EXPORT!!!