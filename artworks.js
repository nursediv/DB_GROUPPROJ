const express = require('express');
const router = express.Router();
const artworksController = require('../controllers/artworksController');

// GET request for list of all Artwork items
router.get('/', artworksController.artworks_list);

// GET request for one Artwork item by ID
router.get('/:id', artworksController.artwork_detail);

// POST request for creating an Artwork
router.post('/', artworksController.artwork_create);

// PUT request to update an Artwork by ID
router.put('/:id', artworksController.artwork_update);

// DELETE request to delete an Artwork by ID
router.delete('/:id', artworksController.artwork_delete);

module.exports = router;
