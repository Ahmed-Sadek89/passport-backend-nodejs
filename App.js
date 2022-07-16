const cookieSession = require("cookie-session");
// const session = require('express-session')
// const sessionStore = require('connect-mongodb-session')(session);
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const passportSetup = require("./Config/Passport");
const passport = require("passport");
const authRoute = require("./Routes/Auth.route");
const app = express();
require('dotenv').config()

app.use(cookieSession({
  name: 'session',
  keys: ['SESSION1', 'SESSION2'],
}));


app.use(passport.initialize());
app.use(passport.session());


app.all('/*', cors(), (req, res, next) => {
  next()
})

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