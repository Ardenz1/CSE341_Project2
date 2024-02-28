const validator = require("../helpers/validate");

const saveRecipe = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    ingredients: "required|array",
    instructions: "required|array",
    cuisine: "required|string",
    cook_time: "required|string",
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
      // Return to exit the middleware chain
      return;
    }
    next(); // Proceed to the next middleware or route handler
  });
};

const saveChef = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    nationality: "required|string",
    speciality: "string",
    recipeId: "numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
      // Return to exit the middleware chain
      return;
    }
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = {
  saveRecipe,
  saveChef,
};
