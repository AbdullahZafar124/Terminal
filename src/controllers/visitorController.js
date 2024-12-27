const Visitor = require('../models/Visitor');
const Attraction = require('../models/Attraction');

exports.createVisitor = async (req, res) => {
    try {
        const visitor = new Visitor(req.body);
        await visitor.save();
        res.status(201).json(visitor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().populate('visitedAttractions');
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVisitorActivity = async (req, res) => {
    try {
        const visitors = await Visitor.aggregate([
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'visitor',
                    as: 'reviews',
                },
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    reviewCount: { $size: '$reviews' },
                },
            },
        ]);
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
