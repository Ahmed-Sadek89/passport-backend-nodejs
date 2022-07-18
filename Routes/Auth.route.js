const router = require("express").Router();
const passport = require("passport");
const User = require('../Model/User.model')

const CLIENT_URL = "https://passport-fronend-react.vercel.app/";

router.get("/login/success", async (req, res) => {
  const user = await User.find().sort({date: -1}).limit(1)
  console.log(req.user)
  console.log('auth.js ', req.user);
  res.status(200).json({
    success: true,
    message: "successfull",
    user: user,
    user2: req.user,
    //   cookies: req.cookies
  });
  
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", async (req, res) => {
  await User.deleteMany({})
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
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