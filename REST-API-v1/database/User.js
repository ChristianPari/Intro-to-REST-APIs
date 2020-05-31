const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    UserSchema = new Schema({
        owner: String,
        pet: String,
        breed: String,
        favorties: {
            food: String,
            toy: String,
            sleep_place: String
        }
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;