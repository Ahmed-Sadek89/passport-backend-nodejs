const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require('../Model/User.model')
require('dotenv').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET

const FACEBOOK_APP_ID=process.env.FACEBOOK_APP_ID
const FACEBOOK_APP_SECRET=process.env.FACEBOOK_APP_SECRET


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // callbackURL: "/auth/google/callback",
      callbackURL: "https://file-api-sadek.herokuapp.com/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
       User.findOne({userId: profile.id}).then((currentUser) => {
        if(currentUser){
          console.log(currentUser.userId)
            // already have this user
             return User.updateOne({userId: currentUser.userId}, {
              $set: {
                date: Date.now()
              }
            }).then(() => {
              console.log('get the regesterd user at ', Date.now() );
              done(null, currentUser);
            })
        } else {
            // if not, create user in our db
            const data = {
              username: profile.displayName,
              userId: profile.id,
              thumbnail: profile.photos[0].value,
              date: Date.now(),
              type: "Oauth"
            }
             new User(data).save().then((newUser) => {
                console.log('created new user at ', Date.now());
                done(null, newUser);
            });
        }
    });
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      // callbackURL: "/auth/github/callback",
      callbackURL: "https://file-api-sadek.herokuapp.com/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
       User.findOne({userId: profile.id}).then((currentUser) => {
        if(currentUser){
          console.log(currentUser.userId)
            // already have this user
             return User.updateOne({userId: currentUser.userId}, {
              $set: {
                date: Date.now()
              }
            }).then(() => {
              console.log('get the regesterd user at ', Date.now() );
              done(null, currentUser);
            })
        } else {
            // if not, create user in our db
            const data = {
              username: profile.displayName,
              userId: profile.id,
              thumbnail: profile.photos[0].value,
              date: Date.now(),
              type: "Oauth"
            }
             new User(data).save().then((newUser) => {
                console.log('created new user at ', Date.now());
                done(null, newUser);
            });
        }
    });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      //callbackURL: "/auth/facebook/callback",
      callbackURL: "https://file-api-sadek.herokuapp.com/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
       User.findOne({userId: profile.id}).then((currentUser) => {
        if(currentUser){
          console.log(currentUser.userId)
            // already have this user
             return User.updateOne({userId: currentUser.userId}, {
              $set: {
                date: Date.now()
              }
            }).then(() => {
              console.log('get the regesterd user at ', Date.now() );
              done(null, currentUser);
            })
        } else {
            // if not, create user in our db
            const data = {
              username: profile.displayName,
              userId: profile.id,
              //thumbnail: profile.photos[0].value,
              date: Date.now(),
              type: "Oauth"
            }
             new User(data).save().then((newUser) => {
                console.log('created new user at ', Date.now());
                done(null, newUser);
            });
        }
    });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});