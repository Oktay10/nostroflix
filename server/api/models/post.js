const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film'
    },
    message: { type: String },
    date: { type: Date },

});
module.exports = mongoose.model('Post', postSchema);