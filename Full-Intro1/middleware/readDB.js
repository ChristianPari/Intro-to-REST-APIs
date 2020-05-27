const fs = require('fs');

function getDB(req, res, next) {

    const textFile = process.cwd() + '/database/database.txt',
        rawData = fs.readFileSync(textFile, 'utf8'),
        parsedData = JSON.parse(rawData);

    req.dbData = parsedData;

    next();

};

module.exports = getDB;