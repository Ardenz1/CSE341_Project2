const mongodb = require("../db/db.config");
const { ObjectId } = require("mongodb");
// const ObjectId = require('mongodb').ObjectId;

// GET all recipes
const getAll = async (req, res) => {
  try {
    const recipes = await mongodb
      .getDb()
      .db()
      .collection("recipes")
      .find()
      .toArray();
      
    // Populate chef details for each recipe
    for (const recipe of recipes) {
      const chefId = recipe.chefId; // Assuming chef ID is stored in recipe document
      const chef = await mongodb
        .getDb()
        .db()
        .collection("chefs")
        .findOne({ _id: chefId });
      
      recipe.chef = chef; // Embed chef details into recipe document
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error getting recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRecipesByChefId = async (req, res) => {
  try {
    const chefId = req.params.chefId;
    const recipes = await mongodb
      .getDb()
      .db()
      .collection("recipes")
      .find({ chefId }) // Filter recipes by chefId
      .toArray();

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error getting recipes by chef ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("recipes")
      .findOne({ _id: recipeId });
    if (!result) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result); // Return the single document directly
  } catch (error) {
    console.error("Error getting recipe by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createRecipe = async (req, res) => {
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    cuisine: req.body.cuisine,
    cook_time: req.body.cook_time,
    prep_time: req.body.prep_time,
    total_time: req.body.total_time,
    servings: req.body.servings,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("recipes")
    .insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the recipe."
      );
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = ObjectId.createFromHexString(req.params.id);
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    cuisine: req.body.cuisine,
    cook_time: req.body.cook_time,
    prep_time: req.body.prep_time,
    total_time: req.body.total_time,
    servings: req.body.servings,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("recipes")
    .replaceOne({ _id: recipeId }, recipe);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the recipe."
      );
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("recipes")
    .deleteOne({ _id: recipeId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the recipe."
      );
  }
};

module.exports = {
  getAll,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByChefId
};
