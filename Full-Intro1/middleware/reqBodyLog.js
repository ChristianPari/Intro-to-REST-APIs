function logReqBody(req, res, next) { // placement of req, res, next (refers to the callback function in the request) matter but can be named whatever you want

    console.log('Request Body...');

    console.log(req.body != undefined ? req.body : 'Empty');

    next(); // MUST call the next function to get the callback function to fire

};

module.exports = logReqBody;