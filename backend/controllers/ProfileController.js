import Profile from "../model/Profile.js";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('WARNING: JWT_SECRET not found in environment variables, using fallback key');
    return "yourFallbackSecretKey";
  }
  return secret;
};


export const updateProfile = async (req, res, next) => {
  const {
    email,
    password,
    fullName,
    level,
    quizPassed,
    fastestTime,
    correctAnswers,
    achievements,
    available,
    featuredCategory,
    image,
  } = req.body;
  let profile;

  const id = req.params.id;

  try {
    profile = await Profile.findByIdAndUpdate(id, {
      email: email,
      password: password,
      fullName: fullName,
      level,
      quizPassed,
      fastestTime,
      correctAnswers,
      achievements: achievements,
      featuredCategory,
      available: available,
      image,
    });

    await profile.save();
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(500).json({ message: "Unable to update by this id" });
  }
  return res.status(201).json({ profile });
};

export const deleteProfile = async (req, res, next) => {
  let profile;
  const id = req.params.id;

  try {
    profile = await Profile.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(500).json({ message: "Unable to delete by this id" });
  }
  return res
    .status(201)
    .json({ profile, message: "Product successfully deleted" });
};

export const getProfileById = async (req, res, next) => {
  const id = req.params.id;
  let profile;
  try {
    profile = await Profile.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!profile) {
    return res.status(404).json({ message: "No profile Found" });
  }
  return res.status(200).json({ profile });
};


export const getAllProfiles = async (req, res, next) => {
  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify JWT token
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);

    // Find the user profile to check role and admin access
    const userProfile = await Profile.findById(decoded.id);
    
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Check if user has admin role and approved admin access
    if (userProfile.role !== "admin" || userProfile.adminAccessRequested !== "APPROVED") {
      return res.status(403).json({ 
        message: "Access denied: Admin privileges required",
        userRole: userProfile.role,
        adminStatus: userProfile.adminAccessRequested
      });
    }

    // If all checks pass, fetch all profiles
    const profiles = await Profile.find();
    
    if (!profiles) {
      return res.status(404).json({ message: "No profiles Found" });
    }
    
    return res.status(200).json({ profiles });

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Invalid token" });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired. Please login again." });
    }
    
    console.error("Error in getAllProfiles:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const getPendingAdminRequests = async (req, res, next) => {
  try {
    // Extract JWT token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify JWT token
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);

    // Find the user profile to check role and admin access
    const userProfile = await Profile.findById(decoded.id);
    
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Check if user has admin role and approved admin access
    if (userProfile.role !== "admin" || userProfile.adminAccessRequested !== "APPROVED") {
      return res.status(403).json({ 
        message: "Access denied: Admin privileges required",
        userRole: userProfile.role,
        adminStatus: userProfile.adminAccessRequested
      });
    }

    // Fetch all profiles with pending admin access requests
    const pendingRequests = await Profile.find({ 
      adminAccessRequested: "PENDING" 
    }).sort({ createdAt: -1 }); // Sort by newest first
    
    return res.status(200).json({ 
      pendingRequests,
      count: pendingRequests.length,
      message: `Found ${pendingRequests.length} pending admin requests`
    });

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Invalid token" });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired. Please login again." });
    }
    
    console.error("Error in getPendingAdminRequests:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
