import express from "express";
import mongoose from "mongoose";
import profileRouter from "./routes/profileRoutes.js";
import userRouter from "./routes/userRoutes.js";
import gradesRouter from "./routes/gradesRoutes.js"; 
import topicRouter from "./routes/topicRoutes.js"
import questionRouter from "./routes/questionRoutes.js";
import answerRouter from "./routes/answerRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import Profile from './model/Profile.js';
import jwt from 'jsonwebtoken';

import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/user/auth/google/callback",
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, googleProfile, done) => {
    try {
      let user = await Profile.findOne({ email: googleProfile.emails[0].value });

      if (user) {
        if (!user.googleId) {
          // If user exists but without googleId, link the account
          user.googleId = googleProfile.id;
          user.image = user.image || (googleProfile.photos ? googleProfile.photos[0].value : "");
          await user.save();
        }
        return done(null, user);
      } else {
        const newUser = new Profile({
          googleId: googleProfile.id,
          fullName: googleProfile.displayName,
          email: googleProfile.emails[0].value,
          // Password field is not set for Google OAuth users
          level: 4,
          quizPassed: "",
          fastestTime: "",
          correctAnswers: 6,
          achievements: [
            "U+1F44A", "U+1F596", "U+1F4A3", "U+1F4AF", "U+1F4AF",
            "U+270C", "U+270C", "U+2728", "U+1F6AC", "U+26F3",
            "U+1F308", "U+1F308", "U+1F308",
          ],
          role: "user",
          available: true,
          image: googleProfile.photos ? googleProfile.photos[0].value : "",
        });
        await newUser.save();
        return done(null, newUser);
      }
    } catch (error) {
      return done(error, false);
    }
  }
));

// Optional: If using sessions with Passport (not strictly necessary if you're just issuing JWTs)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await Profile.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// });

app.use("/profiles", profileRouter);
app.use("/user", userRouter);
app.use("/grades", gradesRouter);
app.use("/topics", topicRouter);
app.use("/questions", questionRouter);
app.use("/answer", answerRouter);
app.use("/upload", fileRouter);


mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.vu326ye.mongodb.net/test`
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("server is running at port 5000");
    });
  });
