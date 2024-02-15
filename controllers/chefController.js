const mongodb = require("../db/db.config");
const { ObjectId } = require("mongodb");
// const ObjectId = require('mongodb').ObjectId;

// GET all recipes
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection("chefs").find();
  result.toArray().then((err ,lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getChefById = async (req, res) => {
  try {
    const chefId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("chefs")
      .findOne({ _id: chefId });
    if (!result) {
      return res.status(404).json({ message: "chef not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result); // Return the single document directly
  } catch (error) {
    console.error("Error getting recipe by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createChef = async (req, res) => {
  const chef = {
    firstName: req.body.firstName,
    nationality: req.body.nationality,
    speciality: req.body.speciality
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("chefs")
    .insertOne(chef);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the chef."
      );
  }
};

const updateChef = async (req, res) => {
  const chefId = ObjectId.createFromHexString(req.params.id);
  const chef = {
    firstName: req.body.firstName,
    nationality: req.body.nationality,
    speciality: req.body.speciality
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("chefs")
    .replaceOne({ _id: chefId }, chef);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the chef."
      );
  }
};

const deleteChef = async (req, res) => {
  const chefId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("chefs")
    .deleteOne({ _id: chefId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the chef."
      );
  }
};

module.exports = {
  getAll,
  getChefById,
  createChef,
  updateChef,
  deleteChef,
};
