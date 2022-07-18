const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./Config/Passport");
const passport = require("passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

app.use(passport.initialize());

app.use(cors())
 

app.use("/auth", authRoute);

const port = process.env.PORT || 5000
mongoose.connect(process.env.DB_CONNECT)
.then(() => {
  console.log('DB WORKED SUCCESSFULLY')
})
app.listen(port, () => {
  console.log("SERVER IS WORKED SUCCESSFULLY ON PORT ", port);
});