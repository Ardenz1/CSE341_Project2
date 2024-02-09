const express = require('express');
const router = express.Router();

// Import route handlers
const recipeRoutes = require('./recipeRoutes');
const chefRoutes = require('./chefRoutes');

// Define route handlers
router.use('/', require('./swagger'));

router.use('/recipes', recipeRoutes);
router.use('/chefs', chefRoutes);

module.exports = router;