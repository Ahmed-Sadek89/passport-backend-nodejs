const User = require('../Model/User.model');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require('dotenv').config()

const myGoogleStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", //FOR LOCALHOST
      //callbackURL: "https://file-api-sadek.herokuapp.com/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      //console.log(profile);
      User.findOne({userId: profile.userId}).then((currentUser) => {
        if(currentUser){
            // already have this user
            console.log('this user is already exist');
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                userId: profile.id,
                username: profile.displayName,
                thumbnail: profile.photos[0].value
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
    }
  )

module.export = myGoogleStrategy