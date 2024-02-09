const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET all recipes
router.get('/', recipeController.getAll);

// router.get('/recipes/:chefId', recipeController.getRecipesByChefId);

// GET a recipe by ID
router.get('/:id', recipeController.getRecipeById);

// POST a new recipe
router.post('/', recipeController.createRecipe);

// PUT update a recipe
router.put('/:id', recipeController.updateRecipe);

// DELETE a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;