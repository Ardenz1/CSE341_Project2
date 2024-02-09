// routes/chefRoutes.js
const express = require("express");
const router = express.Router();
const chefController = require("../controllers/chefController");

// GET all chefs
router.get("/", chefController.getAll);

// GET a chef by ID
router.get("/:id", chefController.getChefById);

// POST a new chef
router.post("/", chefController.createChef);

// PUT update a chef
router.put("/:id", chefController.updateChef);

// DELETE a chef
router.delete("/:id", chefController.deleteChef);

module.exports = router;
