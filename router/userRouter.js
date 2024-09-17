// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHTMLResponse = require("../middlewares/common/decorateHTMLResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  userValidators,
  errorValidationHandler,
} = require("../middlewares/users/userValidator");

const router = express.Router();

// login page
router.get("/", decorateHTMLResponse("Users"), getUsers);

// add user
router.post("/", avatarUpload, userValidators, errorValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
