const fs = require('fs');

function getDB(req, res, next) {

    const textFile = (process.cwd() + '/database/db.txt'),
        rawData = fs.readFileSync(textFile, 'utf8'),
        parsedData = JSON.parse(rawData);

    req.db_data = parsedData;

    next();

};

module.exports = getDB;