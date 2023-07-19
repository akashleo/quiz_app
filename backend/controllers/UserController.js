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

export const signup = async (req, res, next) => {
  const { email } = req.body;

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
    level: 4,
    quizPassed: "",
    fastestTime: "",
    correctAnswers: 6,
    achievements: ["U+1F44A", "U+1F596", "U+1F4A3", "U+1F4AF", "U+1F4AF", "U+270C", "U+270C", "U+2728", "U+1F6AC", "U+26F3", "U+1F308", "U+1F308", "U+1F308"],
    role: "user",
    available: true,
    image: "",
  });

  try {
    newUser.save();
  } catch (err) {
    console.log(err);
  }

  const { password, ...userobj } = newUser._doc;

  res
    .status(200)
    .json({
      message: "Profile successfully created",
      status: 200,
      user: userobj,
    });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await Profile.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Cannot find user" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  //console.log(existingUser.password, password)

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password", status: 400 });
  }
  const token = jwt.sign({ sub: email }, "secretkey");
  // if (password === existingUser.password) {
  //   return res
  //     .status(200)
  //     .json({ message: "Login Successful", token, user: existingUser });
  // } else {
  //   return res.status(400).json({ message: "Incorrect Password" });
  // }
  //const token = jwt.sign({ sub: user.id }, 'secretkey');
  return res
    .status(200)
    .json({
      message: "Login Successful",
      token,
      user: existingUser,
      status: 200,
    });

  //return res.status(200).json({ message: "Profile login successful" });
};
