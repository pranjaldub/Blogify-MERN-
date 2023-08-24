import dotenv from "dotenv";
import passport from "passport";
import User from "./model/User.js";
import UserActivity from "./model/UserActivity.js";
dotenv.config({path: "./local.env"});

import {Strategy as GoogleStrategy} from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "http://blogify-backend-zzfj.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      //console.log("printing", profile);
      //return done(null, profile);
      const foundUser = await User.findOne({
        username: `${profile.name.givenName}${profile.id}`,
      });
      console.log("found user", foundUser);
      if (foundUser) {
        return cb(null, foundUser);
      } else {
        console.log("creating");
        const createdUser = {
          name: profile.displayName,
          username: `${profile.name.givenName}${profile.id}`,
          password: profile.id,
        };
        await User.create(createdUser);
        await UserActivity.create({
          username: `${profile.name.givenName}${profile.id}`,
          createdBlogs: [],
          likedBlogs: [],
          savedBlogs: [],
        });
      }
      return cb(null, createdUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("serialize");
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const foundUser = await User.findOne({
    username: `${profile.name.givenName}${profile.id}`,
  });

  done(err, user);
});
