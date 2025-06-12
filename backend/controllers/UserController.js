import Profile from "../model/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Otp from "../model/Otp.js";
import nodemailer from "nodemailer";

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

// Configure nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP email helper
const sendOtpMail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: "Your Verification OTP",
    html: `<p>Your verification code is: <b>${otp}</b></p><p>This code will expire in 10 minutes.</p>`,
  };
  return transporter.sendMail(mailOptions);
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

export const signup = async (req, res, next) => {
  const { email, role } = req.body;

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

  // Set isVerified based on role and signup method
  const isVerified = role !== "admin"; // Only admins need verification

  const newUser = new Profile({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
    level: 1,
    quizPassed: "0",
    fastestTime: "",
    correctAnswers: 0,
    achievements: [],
    role: role || "user",
    available: true,
    image: "",
    googleId: req.body.googleId,
    isVerified
  });

  try {
    await newUser.save();
    
    const { password, ...userWithoutPassword } = newUser.toObject();

    // For admin users, send verification OTP
    if (role === "admin") {
      try {
        await sendOtp(req, res);
        return;
      } catch (err) {
        console.error("Error sending OTP:", err);
        // Continue with response even if OTP fails
      }
    }

    return res.status(200).json({
      message: "Profile successfully created",
      status: 200,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({
      message: "Error creating user",
      error: err.message
    });
  }
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
    
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, role: existingUser.role },
      secret,
      { expiresIn: '1h' }
    );
    
    const { password: _, ...userWithoutPassword } = existingUser.toObject();

    return res.status(200).json({
      message: "Login Successful",
      token,
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
