const express = require('express'),
    fs = require('fs'),
    router = express.Router();

// GET request for the subRoute /Users from the rootRoute
router.get('/', (req, res) => {

    // res.sendFile(process.cwd() + '/static/home.html');
    res.send("User's Page");

});

// GET request for the subRoute /test from the subRoute /Users of the rootRoute
router.get('/test', (req, res) => {

    let textFile = process.cwd() + '/database/database.txt', // specifiy local db txt file
        rawData = fs.readFileSync(textFile, 'utf8'); // access and read the txt file

    if (rawData[0] != '{') { res.send('No users yet') }

    let parsedData = JSON.parse(rawData),
        allUsers = '';

    for (let a = 0; a < parsedData.user.length; a++) {
        for (const key in parsedData.user[a]) {

            const value = parsedData.user[a][key];

            allUsers += `User ${a+1}: ${key} - ${value} `;

        }

    }

    console.log(allUsers);
    res.send(allUsers);

});

router.post('/', (req, res) => {

    let textFile = process.cwd() + '/database/database.txt', // specifiy local db txt file
        rawData = fs.readFileSync(textFile, 'utf8'); // access and read the txt file

    if (rawData[0] != '{') { rawData = '{}' }

    console.log(rawData);

    let parsedData = JSON.parse(rawData);

    if (parsedData.user == undefined) { // if undefined create the new key/value pair

        parsedData.user = [req.body]; // assign the value of the key the whole request body

    } else {

        parsedData.user.push(req.body); // else push the request body to the array

    }

    console.log(parsedData);

    let stringified = JSON.stringify(parsedData);

    fs.writeFileSync(textFile, stringified);

    res.json({
        message: 'Succesful User Creation',
        status: 200,
        new_user: req.body
    });

});

module.exports = router;