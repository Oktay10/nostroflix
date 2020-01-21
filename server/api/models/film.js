const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    filmVideo: { type: String },
    filmTrailer: { type: String },
    filmImage: { type: String },
    acteurs: { type: String },
    annee: { type: String },
    disponible: { type: Boolean },
    note: { type: String },
    reviews: { type: String },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }]
});

module.exports = mongoose.model('Film', filmSchema);