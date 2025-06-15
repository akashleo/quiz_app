import Profile from "../model/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../model/Otp.js";
import { Resend } from 'resend';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn('WARNING: JWT_SECRET not found in environment variables, using fallback key');
    return "yourFallbackSecretKey";
  }
  return secret;
};

// ---------------- OTP utilities ----------------

// Generate a 6-digit numeric OTP
const generateNumericOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP email helper
const sendOtpMail = async (to, otp) => {
  const resend = new Resend(`${process.env.RESEND_SECRET_KEY}`);
  // Check if Resend secret key is available
  if (!process.env.RESEND_SECRET_KEY) {
    throw new Error('RESEND_SECRET_KEY not configured. Please check your environment variables.');
  }
  
  console.log('Sending email to:', to);
  console.log('OTP:', otp);
  console.log('Resend key configured:', process.env.RESEND_SECRET_KEY, process.env.EMAIL_FROM);
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Emo Quiz <emoquiz@akashghosh.xyz>',
      to: [to],
      subject: 'Your Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 8px;">${otp}</span>
          </div>
          <p style="color: #666;">This code will expire in 10 minutes.</p>
          <p style="color: #666;">If you didn't request this verification, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (err) {
    console.error('Error sending email with Resend:', err);
    throw err;
  }
};

// ---------------- OTP Controllers ----------------

// POST /user/verify/send-otp  { email }
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "A valid email is required" });
  }

  try {
    // Check existing OTP record
    const existingOtp = await Otp.findOne({ email }).sort({ updatedAt: -1 });

    const now = new Date();

    if (existingOtp) {
      // Rate limiting: max 5 sends per hour, minimum 60s gap
      const timeSinceLast = now - existingOtp.updatedAt;
      if (timeSinceLast < 60 * 1000) {
        return res.status(429).json({ message: "Please wait before requesting a new OTP" });
      }
      if (existingOtp.resendCount >= 5 && now - existingOtp.updatedAt < 60 * 60 * 1000) {
        return res.status(429).json({ message: "Too many OTP requests. Try again later." });
      }
    }

    // Generate and hash new OTP
    const otpPlain = generateNumericOtp();
    const hashedOtp = bcrypt.hashSync(otpPlain, 10);

    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

    await Otp.findOneAndUpdate(
      { email },
      {
        email,
        otp: hashedOtp,
        expiresAt,
        resendCount: existingOtp ? existingOtp.resendCount + 1 : 1,
        verified: false,
        attempts: 0,
      },
      { upsert: true, new: true }
    );

    // Send email
    await sendOtpMail(email, otpPlain);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

// POST /user/verify/validate-otp { email, otp }
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found. Please request a new one." });
    }

    if (otpRecord.verified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Limit attempts
    if (otpRecord.attempts >= 5) {
      return res.status(429).json({ message: "Too many invalid attempts. Please request a new OTP." });
    }

    const isMatch = bcrypt.compareSync(otp.toString(), otpRecord.otp);

    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ message: "Invalid OTP. Please try again." });
    }

    // Mark verified
    otpRecord.verified = true;
    await otpRecord.save();

    // Update user profile if exists
    await Profile.findOneAndUpdate({ email }, { isVerified: true });

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return res.status(500).json({ message: "Failed to verify OTP", error: err.message });
  }
};

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await Profile.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    res.status(404).json({ message: "no users found" });
  }

  return res.status(200).json({ users });
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Cannot find user" });
    }

    // For admin users, check email verification
    if (existingUser.role === "admin" && !existingUser.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password", status: 400 });
    }

    const secret = getJwtSecret();
    
    // Generate access token with longer expiration (24 hours)
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      secret,
      { expiresIn: '24h' }
    );

    // Generate refresh token (7 days)
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      secret,
      { expiresIn: '7d' }
    );
    
    const { password: _, ...userWithoutPassword } = existingUser.toObject();

    return res.status(200).json({
      message: "Login Successful",
      token,
      refreshToken,
      user: userWithoutPassword,
      status: 200
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Error during login",
      error: err.message
    });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const secret = getJwtSecret();
    
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, secret);
    
    // Get user from database
    const user = await Profile.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new access token
    const newToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: '24h' }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { id: user._id },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: "Token refreshed successfully",
      token: newToken,
      refreshToken: newRefreshToken
    });

  } catch (err) {
    console.error("Token refresh error:", err);
    return res.status(401).json({ 
      message: "Invalid refresh token",
      error: err.message 
    });
  }
};

// Admin access request function
export const requestAdminAccess = async (req, res, next) => {
  const { email } = req.body;

  if (!validateEmail(email)) {
    return res.status(403).json({ message: "Invalid email format" });
  }

  let existingUser;

  try {
    existingUser = await Profile.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Profile already exists, Login instead" });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password);

  const newUser = new Profile({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
    level: 1,
    quizPassed: "0",
    fastestTime: "",
    correctAnswers: 0,
    achievements: [],
    role: "user", // Default role as user
    available: true,
    image: "",
    isVerified: false,
    adminAccessRequested: "PENDING",
    authorisedBy: ""
  });

  try {
    await newUser.save();
    
    const { password, ...userWithoutPassword } = newUser.toObject();

    return res.status(200).json({
      message: "Admin access request submitted successfully",
      status: 200,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error("Error creating admin access request:", err);
    return res.status(500).json({
      message: "Error creating admin access request",
      error: err.message
    });
  }
};

// Approve admin access request
export const approveAdminRequest = async (req, res, next) => {
  const { profileId } = req.params;
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!profileId) {
    return res.status(400).json({ message: "Profile ID is required" });
  }

  try {
    // Verify the authorizing user has admin role
    const authorizingUser = await Profile.findOne({ email });
    if (!authorizingUser) {
      return res.status(404).json({ message: "Authorizing user not found" });
    }

    if (authorizingUser.role !== "admin") {
      return res.status(403).json({ message: "Only admin users can approve requests" });
    }

    // Find and update the requested profile
    const profileToUpdate = await Profile.findById(profileId);
    if (!profileToUpdate) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profileToUpdate.adminAccessRequested !== "PENDING") {
      return res.status(400).json({ message: "Request is not in pending state" });
    }

    // Update the profile
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        adminAccessRequested: "APPROVED",
        authorisedBy: email,
        role: "admin", // Grant admin role
        isVerified: true // Admin users should be verified
      },
      { new: true }
    );

    const { password, ...profileWithoutPassword } = updatedProfile.toObject();

    return res.status(200).json({
      message: "Admin access request approved successfully",
      status: 200,
      profile: profileWithoutPassword
    });

  } catch (err) {
    console.error("Error approving admin request:", err);
    return res.status(500).json({
      message: "Error approving admin request",
      error: err.message
    });
  }
};

// Reject admin access request
export const rejectAdminRequest = async (req, res, next) => {
  const { profileId } = req.params;
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  if (!profileId) {
    return res.status(400).json({ message: "Profile ID is required" });
  }

  try {
    // Verify the authorizing user has admin role
    const authorizingUser = await Profile.findOne({ email });
    if (!authorizingUser) {
      return res.status(404).json({ message: "Authorizing user not found" });
    }

    if (authorizingUser.role !== "admin") {
      return res.status(403).json({ message: "Only admin users can reject requests" });
    }

    // Find and update the requested profile
    const profileToUpdate = await Profile.findById(profileId);
    if (!profileToUpdate) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profileToUpdate.adminAccessRequested !== "PENDING") {
      return res.status(400).json({ message: "Request is not in pending state" });
    }

    // Update the profile
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        adminAccessRequested: "REJECTED",
        authorisedBy: email
      },
      { new: true }
    );

    const { password, ...profileWithoutPassword } = updatedProfile.toObject();

    return res.status(200).json({
      message: "Admin access request rejected",
      status: 200,
      profile: profileWithoutPassword
    });

  } catch (err) {
    console.error("Error rejecting admin request:", err);
    return res.status(500).json({
      message: "Error rejecting admin request",
      error: err.message
    });
  }
};
