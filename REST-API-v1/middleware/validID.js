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

module.exports = validID;