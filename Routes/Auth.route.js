const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://passport-fronend-react.vercel.app/";

router.get("/login/success", (req, res) => {
  console.log(req.user)
  console.log('auth.js ', req.session);
  res.status(200).json({
    success: true,
    message: "successfull",
    user: req.user,
    session: req.session
  });
  
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed", 
    session: true 
  }),
  function (req, res) {
    res.redirect(CLIENT_URL);
  }
);


router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed", 
    session: true 
  }),
  function (req, res) {
    res.redirect(CLIENT_URL);
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
    session: true 
  }),
  function (req, res) {
    res.redirect(CLIENT_URL);
  }
);


module.exports = router