const express = require('express');
const {
    createVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor
} = require('../controllers/visitorController');

const router = express.Router();

router.post('/', createVisitor);
router.get('/', getVisitors);
router.get('/:id', getVisitorById);
router.put('/:id', updateVisitor);
router.delete('/:id', deleteVisitor);

module.exports = router;
