// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

//internal imports
const User = require("../../models/People");

// user validation
const userValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required!")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name should only conrtain alphabet!")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid emial address!")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email is already in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("cn-CA", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a Canadian mobile number!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile number already is in use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters having at least 1 lowercase, 1 uppercase, 1 number & 1 symbol!"
    ),
];

const errorValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove the uploaded file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  userValidators,
  errorValidationHandler,
};
