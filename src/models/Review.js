const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    attraction: { type: mongoose.Schema.Types.ObjectId, ref: 'Attraction', required: true },
    visitor: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor', required: true },
    score: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, {
    timestamps: true,
});

ReviewSchema.index({ attraction: 1, visitor: 1 }, { unique: true }); // Prevent duplicate reviews

module.exports = mongoose.model('Review', ReviewSchema);
