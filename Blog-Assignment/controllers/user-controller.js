// Install The Modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlogPost = require("../models/blog")
const User = require("../models/user");
const HttpError = require("../utils/http-error");
// User Signup
const userSignup = async (req, res, next) => {
  // console.log(req.body);
  const { name, age, email, password,role } = req.body;
  // Existing user
  let existingUser;
  try {
    existingUser = await User.findOne({
      email: email,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signup failed, please try later", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("Email already in use", 422);
    return next(error);
  }
  // Encrypt password
  let hashedPasswaord;
  try {
    hashedPasswaord = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Password encryption failed", 500);
    return next(error);
  }
  // User Create
  const createdUser = new User({
    name: name,
    password: hashedPasswaord,
    email: email,
    age: age || 0,
    role: "User",
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signup failed", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        age: existingUser.age,
      },
      "userSecretKey",
      { expiresIn: "2h" }
    );

    // console.log(token);
  } catch (err) {
    const error = new HttpError("Login Failed, Please try later", 403);
    return next(error);
  }

  return res.json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
};
// User Login
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({
      email: email,
    });
    // console.log(existingUser);
  } catch (err) {
    const error = new HttpError("Login failed, Please try later", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    //returns true when value matches
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid Credentials, Please try later", 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        age: existingUser.age,
      },
      "userSecretKey",
      { expiresIn: "2h" }
    );

    // console.log(token);
  } catch (err) {
    const error = new HttpError("Login Failed, Please try later", 403);
    return next(error);
  }

  res.status(200).json({
    email: existingUser.email,
    age: existingUser.age,
    token: token,
  });
};
// User Information
const userGetInfo = async (req, res, next) => {
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({
      email: email,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("no user found", 500);
    return next(error);
  }

  if (existingUser) {
    res.json({
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      dob: existingUser.dob,
      password: existingUser.password,
      role: existingUser.role,
    });
  }
};
// Post Creator
const createPost = async (req, res, next) => {
  const { Name, blogheading, blogpost, bloguserID } = req.body;
  const newBlog = new BlogPost({
    heading: blogheading,
    blog: blogpost,
    userID: bloguserID,
  });

  try {
    await newBlog.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("blog uploading failed", 500);
    return next(error);
  }
  return res.json({
    message: `Post created by user ${fName}`,
  });
};
// Post Search
const getBlog = async (req, res, next) => {
  const { bloguserID } = req.body;
  let existingBlog;
  try {
    existingBlog = await BlogPost.findOne({
      userID: bloguserID,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("no Blog found", 500);
    return next(error);
  }

  if (existingBlog) {
    res.json({
      heading: existingBlog.heading,
      blog: existingBlog.blog,
    });
  }
};
 // Exports the objects
exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.userInfo = userGetInfo;
exports.createPost = createPost;
exports.getBlog = getBlog;
