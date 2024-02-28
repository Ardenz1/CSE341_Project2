// routes/chefRoutes.js
const express = require("express");
const router = express.Router();
const chefController = require("../controllers/chefController");
const validation = require('../middleware/validate');
const { requiresAuth } = require("express-openid-connect");



// GET all chefs
router.get("/", requiresAuth(), chefController.getAll);

// GET a chef by ID
router.get("/:id", chefController.getChefById);

// POST a new chef
router.post("/", validation.saveChef, chefController.createChef);

// PUT update a chef
router.put("/:id", validation.saveChef, chefController.updateChef);

// DELETE a chef
router.delete("/:id", chefController.deleteChef);

module.exports = router;
