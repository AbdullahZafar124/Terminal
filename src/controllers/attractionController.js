const Attraction = require('../models/Attraction');

// Create a new attraction (supports bulk insertion)
exports.createAttraction = async (req, res) => {
    try {
        const attractions = req.body; // Get the array of attractions from the request body

        // Check if the incoming data is an array
        if (Array.isArray(attractions)) {
            // Use insertMany to insert an array of attractions
            const savedAttractions = await Attraction.insertMany(attractions);
            res.status(201).json(savedAttractions); // Respond with the saved attractions
        } else {
            // If the data is not in array format, return an error
            res.status(400).json({ error: 'Data should be an array of attractions' });
        }
    } catch (error) {
        // Handle errors (e.g., validation, database errors)
        res.status(400).json({ error: error.message });
    }
};

// Get all attractions
exports.getAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json(attractions); // Respond with all attractions
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// Get a single attraction by ID
exports.getAttractionById = async (req, res) => {
    const { id } = req.params;
    try {
        const attraction = await Attraction.findById(id);
        if (!attraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json(attraction); // Respond with the attraction data
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// Update an existing attraction
exports.updateAttraction = async (req, res) => {
    const { id } = req.params;
    const { name, location, entryFee, rating, description } = req.body;

    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(
            id,
            { name, location, entryFee, rating, description },
            { new: true, runValidators: true }
        );

        if (!updatedAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json(updatedAttraction); // Respond with the updated attraction
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle validation or database errors
    }
};

// Delete an attraction by ID
exports.deleteAttraction = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAttraction = await Attraction.findByIdAndDelete(id);

        if (!deletedAttraction) {
            return res.status(404).json({ error: 'Attraction not found' });
        }
        res.status(200).json({ message: 'Attraction deleted successfully' }); // Confirm deletion
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// Get top-rated attractions
exports.getTopRatedAttractions = async (req, res) => {
    try {
        const topRated = await Attraction.find().sort({ rating: -1 }).limit(5);
        res.status(200).json(topRated); // Respond with top-rated attractions
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};
