const express = require('express');
const {
    createAttraction,
    getAttractions,
    getAttractionById,
    updateAttraction,
    deleteAttraction
} = require('../controllers/attractionController');

const router = express.Router();

router.post('/', createAttraction);
router.get('/', getAttractions);
router.get('/:id', getAttractionById);
router.put('/:id', updateAttraction);
router.delete('/:id', deleteAttraction);

module.exports = router;
