const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./Config/Passport");
const passport = require("passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
require('dotenv').config()
app.use(
  cookieSession({ 
    name: "session", 
    keys: ["lama"], 
    maxAge: 24 * 60 * 60 * 100,  
    httpOnly: true,
    secure: true,
    secret: "saaasda",
    cookie: {
      maxAge: 24 * 60 * 60 * 100,  
      httpOnly: true,
      secure: true,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://file-api-sadek.herokuapp.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth",cors(),  authRoute);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server is running!", port);
});