const mongoose = require('mongoose'),
    mongoURI = process.env.MONGODB_URI;

function connectDB() {

    mongoose.connect(mongoURI || 'mongodb://localhost', { // string is the server host
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => { // to get a message when mongoose connects
        console.log('Mongoose is connected!');
    });

};

module.exports = connectDB;