const mongoose = require('mongoose');

const badgesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nb: { type: String, required: true },
    uri: { type: String, required: true }
});

module.exports = mongoose.model('Badges', badgesSchema);