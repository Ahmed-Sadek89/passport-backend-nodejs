const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./Config/Passport");
const passport = require("passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
require('dotenv').config()
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['keys.session.cookieKey']
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', cors(),(req, res, next) => 
  next()
);
app.use('/*', cors(),(req, res, next) => 
  next()
);

app.use("/auth", authRoute);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server is running!", port);
});