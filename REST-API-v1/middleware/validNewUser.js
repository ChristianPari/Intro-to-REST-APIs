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

module.exports = validNewUser;