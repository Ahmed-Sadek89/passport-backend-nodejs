const session = require('express-session');
const express = require("express");
const cors = require("cors");
const passportSetup = require("./Config/Passport");
const passport = require("passport"); // passport 5
const authRoute = require("./Routes/Auth.route");
const app = express();
const mongoose = require('mongoose');

require('dotenv').config()

app.use(express.json())
// app.set("trust proxy", 1);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    }
}))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

var whitelist = ['http://localhost:3000', 'https://passport-fronend-react.vercel.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true, }
  } else {
    corsOptions = { origin: false, credentials: false, }
  }
  callback(null, corsOptions)
}
app.use( cors(corsOptionsDelegate))

app.use("/auth", authRoute);

const port = process.env.PORT || 5000
mongoose.connect(process.env.DB_CONNECT)
.then(() => {
  console.log('DB WORKED SUCCESSFULLY')
})
app.listen(port, () => {
  console.log("SERVER IS WORKED SUCCESSFULLY ON PORT ", port);
});