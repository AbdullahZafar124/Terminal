const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    entryFee: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
});

module.exports = mongoose.model('Attraction', AttractionSchema);
