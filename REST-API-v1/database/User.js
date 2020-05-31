const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    UserSchema = new Schema({

        owner: { type: String, required: true },
        pet: { type: String, required: true },
        breed: { type: String, required: true },
        favorites: {
            food: { type: String, required: true },
            toy: { type: String, required: true },
            sleep_place: { type: String, required: true }

        }
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;