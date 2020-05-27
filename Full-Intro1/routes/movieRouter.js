// Things routers/router files need
// require express (const express = require('express');)
// requires an instance of the express.Router object
// require fs(file system; when working with local text doc DB file)
// export the router variable

// Things app.js uses that router files don't need
// app.listen method
// an instant of the express object

const express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    readDB = require('../middleware/readDB');

// ######################### GET for all movies in DB #########################
router.get('/', readDB, (req, res) => {

    const dbMovies = req.dbData.movies;
    console.log(dbMovies);

    res.status(200).json({
        status: 200,
        all_movies: dbMovies
    });

});

// ######################### GET for specific movie from DB #########################
router.get('/:id', readDB, validate, (req, res) => {

    res.status(200).json({
        status: 200,
        movie: req.found
    });

});

// ######################### Delete a movie #########################
router.delete('/:id', readDB, validate, (req, res) => {

    let databaseData = req.dbData; // will be removing a movie

    databaseData.movies.splice(req.params.id - 1, 1); // removes the specified movie

    stringifiedDB = JSON.stringify(databaseData); // stringify it before writing to the text file

    const textFile = process.cwd() + '/database/database.txt';

    fs.writeFileSync(textFile, stringifiedDB);

    res.status(200).json({
        status: 200,
        deleted_movie: req.found
    });

});

// post/add a new movie

// updated a movie

//* ############### Validate Function ###############
function validate(req, res, next) {

    if (!req.dbData.movies) {

        return res.status(500).json({
            status: 500,
            message: 'Server cannot access movies in database at this time'
        })

    }

    const dbMovies = req.dbData.movies,
        movieID = parseInt(req.params.id);

    if (isNaN(movieID)) {

        return res.status(404).json({
            status: 404,
            message: 'Not a valid movie ID, must be a numerical number'
        });

    } else if (movieID <= 0 || movieID >= dbMovies.length - 1) {

        return res.status(404).json({
            status: 404,
            message: 'ID is not within the valid range of movies'
        })

    }

    req.found = dbMovies[movieID - 1]; // passes the movie id into the request

    next();

};

module.exports = router;