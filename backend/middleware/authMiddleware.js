import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('WARNING: JWT_SECRET not found in environment variables, using fallback key');
    return "yourFallbackSecretKey";
  }
  return secret;
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const secret = getJwtSecret();
  
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.error("JWT verification error:", {
        error: err.message,
        token: token.substring(0, 10) + '...', // Log only first 10 chars for security
        errorName: err.name,
        errorStack: err.stack
      });
      return res.status(403).json({ 
        message: "Forbidden: Invalid token",
        error: err.message 
      });
    }
    req.user = user; // Add decoded user payload to request object
    next();
  });
};

export const authorizeRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied. User role not available." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
}; 