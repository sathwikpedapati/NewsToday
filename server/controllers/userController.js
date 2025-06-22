const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../config/sendMail");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const profilePic = req.file?.path; 

  if (!username || !email || !password || !profilePic) {
    return res.status(400).json({ success: false, message: "Missing User Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    sendMail(email, "Welcome to Our News Today", `Hi ${username}, thank you for registering with ${email}`);

    res.status(201).json({
      success: true,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    sendMail(email, "Welcome Back", `Hello ${existingUser.username}, you've successfully logged in.`);

    res.status(200).json({
      success: true,
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        profilePic: existingUser.profilePic,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Authentication Failed" });
  }
};

const editprofile = async (req, res) => {
  const { username, email } = req.body;
  const profilePic = req.file?.path;

  try {
    const userId = req.user._id;
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (profilePic) updates.profilePic = profilePic;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");
     sendMail(email, "Welcome to Our News Today", `Hi ${username}, thank you for updating with ${email}`);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Edit Profile Error:", error);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};
const deleteuser = async (req, res) => {
  try {
    const userId = req.user._id;
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

module.exports = { signup, login, editprofile, deleteuser };
