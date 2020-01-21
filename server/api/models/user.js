const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoris: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
    }],
    vus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
    }],
    nbfilmW : { type: String, required: true },
    level : { type: String, required: true },
    disponible : { type: Boolean, required: true }
});

module.exports = mongoose.model('User', userSchema);