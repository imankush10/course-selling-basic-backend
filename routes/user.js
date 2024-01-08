require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { User, Courses } = require("../db/db");
const inputValidation = require("../middlewares/inputValidation");
const userAuth = require("../middlewares/userAuth");
const jwtSecret = process.env.USER_JWT_SECRET || "imankush10";

app.use(express.json());

app.post("/signup", inputValidation, async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username});
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    await User.create({ username, password });
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

app.post("/signin", inputValidation, async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username, password });
    if (!existingUser)
      return res.status(400).json({
        message: "User doesn't exists",
      });

    const token = jwt.sign({ username }, jwtSecret);
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

app.get("/courses", userAuth, async (req, res) => {
  try {
    const courses = await Courses.find({});
    if (!courses)
      return res.status(400).json({
        message: "Can not retrieve courses",
      });
    if (courses.length == 0)
      res.status(200).json({
        message: "No courses found",
      });
    else {
      res.status(200).json({
        courses,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

app.post("/courses/:courseId", userAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const username = jwt.decode(token).username;

    const courseId = req.params.courseId;
    const course = await Courses.findById(courseId);

    if (!course)
      return res.status(400).json({
        message: "Invalid course id",
      });
    await User.updateOne(
      { username },
      { $push: { purchasedCourses: courseId } }
    );
    res.status(200).json({
      message: "Course purchased successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

app.get("/purchasedCourses", userAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const username = jwt.decode(token).username;
    const {purchasedCourses} = await User.findOne({username});

    const result = await Promise.all(purchasedCourses.map(async (courseId)=>await Courses.findById(courseId)));
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

module.exports = app;
