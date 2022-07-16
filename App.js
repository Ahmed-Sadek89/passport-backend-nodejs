// const cookieSession = require("cookie-session");
const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session);
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require("passport");
const passportSetup = require("./Config/Passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
require('dotenv').config()

// app.use(
//   cookieSession({ name: "session", keys: ["sadek"], maxAge: 24 * 60 * 60 * 100 })
// );
const STORE  = new sessionStore({
  url: process.env.DB_CONNECT,
  collection: 'sessions'
})
app.use(session({
  secret: 'sdkfjdhaisdjimckdsjejimcei',
  saveUninitialized: false,
  
  cookie: {
    maxAge: 24 * 60 * 60 * 100,
    httpOnly: true
  },
  store: STORE
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://passport-fronend-react.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

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