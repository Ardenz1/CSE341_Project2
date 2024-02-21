const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const validation = require("../middleware/validate");
const { requiresAuth } = require("express-openid-connect");
const Recipe = require("../models/recipe");


// GET all recipes
router.get("/",  requiresAuth(), recipeController.getAll);

// router.get('/recipes/:chefId', recipeController.getRecipesByChefId);

// GET a recipe by ID
router.get("/:id", recipeController.getRecipeById);

// POST a new recipe
router.post("/", validation.saveRecipe, recipeController.createRecipe);

// PUT update a recipe
router.put("/:id", validation.saveRecipe, recipeController.updateRecipe);

// DELETE a recipe
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
