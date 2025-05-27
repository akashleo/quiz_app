import Profile from "../model/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    role: "user",
    available: true,
    image: "",
    googleId: req.body.googleId
  });

  try {
    await newUser.save();
    
    const { password, ...userWithoutPassword } = newUser.toObject();

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

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password", status: 400 });
    }

    const token = jwt.sign({ sub: email }, "secretkey");
    
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
