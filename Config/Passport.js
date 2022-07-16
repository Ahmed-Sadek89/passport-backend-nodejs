const User = require('../Model/User.model');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
require('dotenv').config()



// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//       done(null, user);
//   }).catch(err => {
//     console.log(err.message);
//   })
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: "/auth/google/callback", //FOR LOCALHOST
      callbackURL: "https://file-api-sadek.herokuapp.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({userId: profile.id}).then((currentUser) => {
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
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      //callbackURL: "/auth/github/callback",
      callbackURL: "https://file-api-sadek.herokuapp.com/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      //console.log(profile);
      User.findOne({userId: profile.id}).then((currentUser) => {
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
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://file-api-sadek.herokuapp.com/auth/facebook/callback",
      //callbackURL: "/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      
      User.findOne({userId: profile.id}).then((currentUser) => {
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
);

passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	console.log('DEserialize ... called')
	User.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, user) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})
// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//       done(null, user);
//   }).catch(err => {
//     console.log(err.message);
//   })
// });