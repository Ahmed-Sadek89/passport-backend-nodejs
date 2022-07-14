const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passportSetup = require("./Config/Passport");
const passport = require("passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
require('dotenv').config()
//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});



app.options('*', cors({
  origin: process.env.CLIENT_ORIGIN,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
})); 

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
  next();
});

app.get('/', function (req, res) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  res.writeHead(200, {'Content-Type': 'text/plain'});
  contents = fs.readFileSync("sliderImages.json", "utf8");
  res.end(contents);
});
//
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_SESSION_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   cors({
//     origin: process.env.CLIENT_ORIGIN,
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

app.use("/auth", authRoute);


mongoose.connect(process.env.DB_CONNECT).then(() => {
  console.log('DB CONNECTED SUCCESSFULLY');
}).catch((error) => {
  console.log(error);
}) //AND CONNECT IT WITH PASSPORT

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server is running!");
});