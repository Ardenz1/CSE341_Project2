// routes/chefRoutes.js
const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

// Define routes for chef operations
router.post('/', chefController.createChef);

module.exports = router;