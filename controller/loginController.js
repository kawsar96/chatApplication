// internal imports
const User = require("../models/People");

// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// get login page
function getLogin(req, res, next) {
  res.render("index");
}

// login function
async function login(req, res, next) {
  try {
    // find user
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    // check password if user is found
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password, // plain password
        user.password // hashed password on DB
      );
      if (isValidPassword) {
        // user object to generate JWT token for user
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        // token generation
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // cookie generation
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set logged in user local identifier
        res.locals.loggedInUser = userObject;

        // redirect
        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again!");
      }
    } else {
      throw createError("Login failed! Please try again!");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

// logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
