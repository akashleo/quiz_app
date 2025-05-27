import GoogleStrategy from 'passport-google-oauth20';
import Profile from '../../model/Profile.js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Validate required environment variables
const validateEnvVariables = () => {
  const required = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please ensure you have a .env file with these variables defined.'
    );
  }
};

// Validate environment variables before creating strategy
validateEnvVariables();

const googleStrategyConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/user/auth/google/callback",
  scope: ['profile', 'email']
};

console.log('Google Strategy Config (clientID first 5 chars):', 
  googleStrategyConfig.clientID ? googleStrategyConfig.clientID.substring(0, 5) + '...' : 'missing');

const googleStrategy = new GoogleStrategy.Strategy(
  googleStrategyConfig,
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
        // Create new user with empty initial values
        const newUser = new Profile({
          googleId: googleProfile.id,
          fullName: googleProfile.displayName,
          email: googleProfile.emails[0].value,
          // Initialize with default values
          level: 1,
          quizPassed: "0",
          fastestTime: "",
          correctAnswers: 0,
          achievements: [], // Start with empty achievements array
          role: "user",
          available: true,
          image: googleProfile.photos ? googleProfile.photos[0].value : "",
        });
        await newUser.save();
        return done(null, newUser);
      }
    } catch (error) {
      console.error('Google Strategy Error:', error);
      return done(error, false);
    }
  }
);

export default googleStrategy; 