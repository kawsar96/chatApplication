const { check, validationResult } = require("express-validator");

const loginValidators = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Email or mobile number is required!"),
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = {
  loginValidators,
  loginValidationHandler,
};
