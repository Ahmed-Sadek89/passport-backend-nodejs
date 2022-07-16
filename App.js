const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passportSetup = require("./Config/Passport");
const passport = require("passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
require('dotenv').config()

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_SESSION_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ["https://passport-fronend-react.vercel.app", "https://passport-fronend-react.vercel.app/#_=_", "https://passport-fronend-react.vercel.app/", "http://localhost:3000"], // =>  https://passport-fronend-react.vercel.app/
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