require('dotenv').config();
const express = require('express'), // by requiring; you are allowing the file to access and use the designated package
    morgan = require('morgan'),
    app = express(),
    fs = require('fs'),
    port = process.env.PORT || 3000,
    reqBodyLog = require('./middleware/reqBodyLog');
console.log(`Created by: ${process.env.AUTHOR}`);

{ // ######################### Created DB of Global DB variable #########################
    //^ I had a global object with movie data that I used to create another docuemnt/collection within my text file
    // let textFile = process.cwd() + '/database/database.txt', // specifiy local db txt file
    //     rawData = fs.readFileSync(textFile, 'utf8'); // access and read the txt file

    // if (rawData[0] != '{') { rawData = '{}' }

    // let parsedData = JSON.parse(rawData);

    // parsedData.movies = database.movies;

    // let stringifiedData = JSON.stringify(parsedData);

    // fs.writeFileSync(textFile, stringifiedData);
}

// ######################### Use methods added for code functionality #########################
app.use(morgan('dev')); // used to get console logs of the requests being made
app.use(express.json()); // used to parse data in my request body that's json
app.use(express.static(__dirname + '/static')); // needed when we are using files that aren't changing like CSS
//^ Place before calback function in the GET request

// ######################### Route Handling w/ Middleware #########################
const homeRouter = require('./routes/homeRouter'),
    usersRouter = require('./routes/usersRouter'),
    movieRouter = require('./routes/movieRouter');

app.use('/', homeRouter); // hands off any request made to the root route to the homeRouter file
app.use('/users', usersRouter); // hands off any request made to the root route to the userRouter file
app.use('/movies', movieRouter);

app.listen(port, () => { console.log(`Listening on Port:${port}`) });