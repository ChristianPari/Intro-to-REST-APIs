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
    readDB = require('../middleware/readDB'),
    textFile = process.cwd() + '/database/database.txt';

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
router.get('/:id', readDB, validDB, (req, res) => {

    res.status(200).json({
        status: 200,
        movie: req.found
    });

});

// ######################### DELETE a movie #########################
router.delete('/:id', readDB, validDB, (req, res) => {

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

// ######################### POST a movie #########################
router.post('/', readDB, validNewMovie, (req, res) => {
    console.log(req.dbData.movies);
    let newMovieDB = req.dbData.movies;

    newMovieDB.push(req.body);

    const stringifiedMovieDB = JSON.stringify(newMovieDB);

    fs.writeFileSync(textFile, stringifiedMovieDB);

    res.status(200).json({
        status: 200,
        message: "New movie succesfully created",
        new_movie: req.body
    });

});

// updated a movie

//* ############### Middleware ###############
function validDB(req, res, next) { // validates the database for any data at all

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

function validNewMovie(req, res, next) { // validates the movie data within the req body, err or continues to POST req

    const { title: t, release: r, genre: g, ref, available: a } = req.body,
        newMovieObj = {
            title: t,
            release: r,
            genre: g,
            ref: ref,
            available: a
        },
        newMovieObjLength = Object.keys(newMovieObj).length,
        bodyLength = Object.keys(req.body).length;

    if (bodyLength < newMovieObjLength || bodyLength > 10) {

        return res.status(400).json({
            status: 400,
            message: `Bad Request, there were too few or too many key-value pairs in the request body`,
            required_fields: Object.keys(newMovieObj).join(', '),
            req_body_length: bodyLength,
            min_length: newMovieObjLength,
            max_length: 10
        })

    }

    let missingFields = []; // will recieve elements if the req.body doesn't pass the following if statement

    for (const field in newMovieObj) {

        if (newMovieObj[field] == undefined) {

            missingFields.push(field);

        }

    }

    if (missingFields.length > 0) {

        missingFields = missingFields.join(', ');

        return res.status(400).json({
            status: 400,
            error: 'Missing Fields',
            message: `The following fields are required: ${missingFields}`
        });

    }

    req.body = newMovieObj;

    next();

    //! would work when not having to remove anythin from the request body
    // const fields = ['title', 'release', 'genre', 'ref', 'available'],
    //     bodyLength = Object.keys(req.body).length;
    // let missingFields = []; // will recieve elements if the req.body doesn't pass the following if statement

    // if (bodyLength < fields.length || bodyLength > 10) {

    //     return res.status(400).json({
    //         status: 400,
    //         message: `Bad Request, there were too few or too many key-value pairs in the request body`,
    //         required_fields: fields.join(', '),
    //         req_body_length: bodyLength,
    //         min_length: fields.length,
    //         max_length: 10
    //     })

    // }

    // fields.forEach(field => {

    //     if (!req.body[field]) {

    //         missingFields.push(field);

    //     }

    // });

    // if (missingFields.length > 0) {

    //     missingFields = missingFields.join(', ');

    //     return res.status(400).json({
    //         status: 400,
    //         message: `The following fields are required: ${missingFields}`
    //     });

    // }

    // next();

};

module.exports = router;