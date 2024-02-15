const validator = require("../helpers/validate");

const saveRecipe = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    ingredients: "required|string",
    instructions: "required|email",
    cuisine: "required|string",
    cook_time: "required|email",
    prep_time: "required|string",
    total_time: "string",
    servings: "required|numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveChef = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    nationality: "required|string",
    speciality: "required|email",
    recipeId: "numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveRecipe,
  saveChef,
};
