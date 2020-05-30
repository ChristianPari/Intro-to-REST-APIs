require("dotenv").config(); // needed to use the key/values from within the .env file
//^ needs to be configured first before using anhy key/values from within it
const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"), // needed to be able to read and write a .txt file
    app = express(), // creates a new express server
    port = process.env.PORT || 3000; // assigns the .env key PORT to port; if doesnt exist assigns port 3000

//* ############### Middleware for all routes ###############
app.use(morgan("dev")); // used to display to the server console the requests being made
app.use(express.json()); // parses JSON data
app.use(express.static(__dirname + '/static')); // serves the static files from the static folder

//* ############### Middleware/Route Handling ###############
//! must create variables for the routes being used; require needed with the file path
const homeRouter = require('./routes/homeRouter'),
    usersRouter = require('./routes/usersRouter');

app.use('/', homeRouter); // handling for root route
app.use('/users', usersRouter); // handling for users route

app.listen(port, () => { console.log(`Listening on port:${port}`) });