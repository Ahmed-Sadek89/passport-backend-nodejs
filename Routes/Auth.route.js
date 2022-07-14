const router = require("express").Router();
const passport = require("passport");
require('dotenv').config();
const {LoginSuccess, LoginFailed, Logout} = require('../Controllers/Auth.controller')



const CLIENT_URL = process.env.CLIENT_HOME_URL;

router.get("/login/success", LoginSuccess);

router.get("/login/failed", LoginFailed);

router.get("/logout", Logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router