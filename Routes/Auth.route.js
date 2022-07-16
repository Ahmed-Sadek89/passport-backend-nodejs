const router = require("express").Router();
const passport = require("passport");
require('dotenv').config();
const { LoginFailed, Logout} = require('../Controllers/Auth.controller')
const User = require('../Model/User.model');


const CLIENT_URL = process.env.CLIENT_HOME_URL;

router.get("/login/success", (req, res) => {
  // req.session = req.user
  console.log('req.user ', req.user);
  console.log('req.session ', req.session);
  if (req.session) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      session: req.session
      //   cookies: req.cookies
    });
  }else {
    res.status(200).json({
      success: true,
      message: "successfull",
      userERR: 'req.user',
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", LoginFailed);

router.get("/logout", Logout);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    session: false
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