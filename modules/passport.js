import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import User from "../models/passportModel";
import * as dotenv from 'dotenv'
dotenv.config()



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    function (accessToken, refreshToken, profile, done) {
      let userdata = {
        name: profile.displayName,
        username: profile._json.name,
        email: profile._json.email,
        photo: profile._json.picture,
      };
      // console.log("new data",userdata);
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userdata, (err, user) => {
            if (err) return done(err);
            return done(null, user);
          });
        } else {
          user.save((err) => {
            if (err) return done(err);
            return done(null, user);
          });
        }
      });
    }
  )
);

// This  will creates the session and adds  the userid in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// now  if the user is already logged in then  deserailze user comes into picture
// it will grab  the id  from the cookie and finds this in the database
passport.deserializeUser((id, done) => {
  User.findById(id, "name , email ,username, token", (err, user) => {
    console.log("already a user", user);
    done(err, user);
  });
});
