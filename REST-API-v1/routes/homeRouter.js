const express = require("express"),
    router = express.Router();

router.get('/', (req, res) => {

    res.sendFile(process.cwd() + '/static/home.html');
    //^ need process.cwd() not __dirname here(< only in app.js)

});

//! DONT FORGET TO EXPORT!!!
module.exports = router;