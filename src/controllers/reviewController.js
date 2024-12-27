const Review = require('../models/Review');
const Attraction = require('../models/Attraction');
const Visitor = require('../models/Visitor');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { attractionId, visitorId, score, comment } = req.body;

        // Check if the visitor has visited the attraction
        const visitor = await Visitor.findById(visitorId);
        if (!visitor || !visitor.visitedAttractions.includes(attractionId)) {
            return res.status(400).json({ error: 'Visitor has not visited the attraction' });
        }

        // Create the review
        const review = new Review({ attraction: attractionId, visitor: visitorId, score, comment });
        await review.save();

        // Update the attraction's rating
        const reviews = await Review.find({ attraction: attractionId });
        const averageRating = reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length;
        await Attraction.findByIdAndUpdate(attractionId, { rating: averageRating });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('attraction', 'name location').populate('visitor', 'name email');
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific review by ID
exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('attraction', 'name location').populate('visitor', 'name email');
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Update the attraction's rating after review deletion
        const attraction = await Attraction.findById(deletedReview.attraction);
        const reviews = await Review.find({ attraction: attraction._id });
        const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length : 0;
        await Attraction.findByIdAndUpdate(attraction._id, { rating: averageRating });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
