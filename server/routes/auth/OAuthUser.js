import express from "express";
const router = express.Router();
import passport from "passport";
import UserController from "../../app/controllers/auth/User";
import constants from "../../constants";
// const loginRateLimiter = require("../app/services/auth/loginRateLimiter");

// setup the configs
// import '../../config/passport';
require("../../config/passport");
/**
 * Oauth the user with facebook and google
 */

// ? Facebook login
router.get(
  "/auth/facebook",
  // loginRateLimiter,
  UserController.redirectIfAuth,
  passport.authenticate("facebook", { session: false, scope: "email" })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${constants.CLIENT_URL}/start`,
    session: false,
  }),
  function (req, res) {
    console.log("REDIRECT HOME !!!")
    // Successful authentication, redirect home.
    res.redirect(`${constants.CLIENT_URL}`);
  }
);

// ? google login
router.get(
  "/auth/google",
  // loginRateLimiter,
  UserController.redirectIfAuth,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  UserController.redirectIfAuth,
  passport.authenticate("google", {
    failureRedirect: `${constants.CLIENT_URL}/start`,
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${constants.CLIENT_URL}`);
  }
);

// logout
router.get(
  "/logout", 
  UserController.auth, 
  UserController.logout
);

// get logged in user info
router.get(
  "/me",
  UserController.auth,
  UserController.me
);

export default router;
