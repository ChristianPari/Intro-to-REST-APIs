const express = require('express'),
    router = express.Router(),
    getDB = require('../middleware/getDB');

router.get('/', getDB, (req, res) => { // GET to the users route displays all the collection of users

    res.json(req.body.db_data.users);

});

router.get('/:user_id', getDB, (req, res) => { // GET a specific user from the DB

    res.status(200).json({

        status: 200,
        message: 'Valid user requested',
        user_data: usersDB[requestedID - 1]

    });

});

// POST
// PUT
// DELETE

module.exports = router; //! STOP FORGETTING TO EXPORT!!!