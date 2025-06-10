import express from "express";
import { getAllUser, signup, login } from "../controllers/UserController.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('WARNING: JWT_SECRET not found in environment variables, using fallback key');
    return "yourFallbackSecretKey";
  }
  return secret;
};

const userRouter = express.Router();

// Admin access to get all users
userRouter.get('/', authenticateToken, authorizeRole(['admin']), getAllUser);

// Public routes
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
    // req.user here comes from googleStrategy and should already have the role.
    const secret = getJwtSecret();
    
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, role: req.user.role }, 
      secret,
      { expiresIn: '1h' }
    );
    
    const userStr = encodeURIComponent(JSON.stringify(req.user));
    
    const frontendCallbackUrl = process.env.FRONTEND_CALLBACK_URL || 'http://localhost:3000/auth/google/callback';
    res.redirect(`${frontendCallbackUrl}?token=${token}&user=${userStr}`);
  }
);

export default userRouter;