const express = require('express'),
    mongoose = require('mongoose'),
    User = require('../database/User'),
    fs = require('fs'),
    router = express.Router(),
    getDB = require('../middleware/getDB'), //* for .txt db
    validID = require('../middleware/validID'), //* for .txt db
    validNewUser = require('../middleware/validNewUser'), //* for .txt db
    textFile = (process.cwd() + '/database/db.txt'); //* for .txt db

router.get('/', (req, res) => { // GET to the users route displays all the collection of users

    // getDB
    //^ middleware for .txt file
    // res.json(req.db_data.users);
    //^ text file response

    User.find({})
        .then((allUsers) => { // runs if succesful
            res.status(200).json({

                status: 200,
                message: 'All users in database',
                db_data: allUsers

            });
        })
        .catch((error) => { // runs if error
            res.json({

                error_message: error

            });
        });

});

router.get('/:user_id', (req, res) => { // GET a specific user from the DB

    // getDB, validID,
    //^ middleware for .txt file

    const reqUserID = req.params.user_id;

    User.find({})
        .then((allUsers) => { // runs if succesful
            if (isNaN(reqUserID)) {

                return res.status(400).json({

                    status: 400,
                    message: `The ID you have requested in not a number, only numbers are valid ID's. Please enter an ID from the range below`,
                    users_range: `1 to ${allUsers.length}`,
                    requested_id: reqUserID

                });

            } else if (!allUsers[reqUserID - 1]) {

                return res.status(400).json({

                    status: 400,
                    message: 'Invalid user ID requested, not within the range of users',
                    users_range: `1 to ${allUsers.length}`,
                    requested_id: reqUserID

                })

            }

            res.status(200).json({

                status: 200,
                message: 'User found',
                user_data: allUsers[reqUserID - 1]

            });

        })
        .catch((error) => { // runs if error

            res.status(400).json({

                error: error.message

            });

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
        new_user: newUser

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