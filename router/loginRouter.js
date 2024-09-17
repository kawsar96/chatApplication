// external imports
const express = require("express");

// internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const {
  loginValidators,
  loginValidationHandler,
} = require("../middlewares/login/loginValidator");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

// set page title
const page_title = "Login";

// login page
router.get("/", decorateHTMLResponse(page_title), redirectLoggedIn, getLogin);

// login process
router.post(
  "/",
  decorateHTMLResponse(page_title),
  loginValidators,
  loginValidationHandler,
  login
);

// logout process
router.delete("/", logout);

module.exports = router;
