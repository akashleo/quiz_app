import express from "express";
import { getAllUser, signup, login } from "../controllers/UserController.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.get('/', getAllUser);
userRouter.post('/signup', signup);
userRouter.post('/login', login);

// Route to initiate Google authentication
userRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google callback URL
userRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Successful authentication. req.user is populated by Passport.
    const token = jwt.sign({ sub: req.user.email }, process.env.JWT_SECRET || "secretkey", { expiresIn: '1h' });
    
    // Prepare user data to be sent in the URL.
    // Note: Sending entire user object in URL can be long and has limits.
    // Consider sending only essential info or just the token, and fetching user details on frontend.
    const userStr = encodeURIComponent(JSON.stringify(req.user));
    
    // Redirect to frontend callback URL with token and user data
    // Ensure your frontend is configured to handle this route and parameters.
    // The frontend URL should ideally be an environment variable.
    const frontendCallbackUrl = process.env.FRONTEND_CALLBACK_URL || 'http://localhost:3000/auth/google/callback';
    res.redirect(`${frontendCallbackUrl}?token=${token}&user=${userStr}`);
  }
);

export default userRouter;