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
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");
const router = express.Router();

// users page
router.get(
  "/",
  decorateHTMLResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  userValidators,
  errorValidationHandler,
  addUser
);

// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);

module.exports = router;
