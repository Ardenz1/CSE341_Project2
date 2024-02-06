const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET all recipes
router.get('/recipes', recipeController.getAllRecipes);

// GET a recipe by ID
router.get('/recipes/:id', recipeController.getRecipeById);

// POST a new recipe
router.post('/recipes', recipeController.createRecipe);

// PUT update a recipe
router.put('/recipes/:id', recipeController.updateRecipe);

// DELETE a recipe
router.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = router;