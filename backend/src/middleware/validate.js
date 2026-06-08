const { validationResult } = require("express-validator");

// Runs after express-validator checks; collects any errors and responds 400
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // return the first error message
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validate;
