require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { Admin, Courses } = require("../db/db");
const inputValidation = require("../middlewares/inputValidation");
const adminAuth = require("../middlewares/adminAuth");
const jwtSecret = process.env.USER_JWT_SECRET || "imankush";


app.use(express.json());

app.post("/signup", inputValidation, async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await Admin.findOne({ username});
    if (existingUser) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }
    await Admin.create({ username, password });
    res.status(200).json({
      message: "Admin created successfully",
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

    const existingUser = await Admin.findOne({ username, password });
    if (!existingUser)
      return res.status(400).json({
        message: "Admin doesn't exists",
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

app.post("/courses", adminAuth, async (req, res) => {
  try {
    const course = await Courses.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageLink: req.body.imageLink,
    });
    if (!course)
      return res.status(400).json({
        message: "Your course has not been added",
      });
    res.status(200).json({
      message: "Course created successfully",
      courseId: course.id,
    });
  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

app.get("/courses", adminAuth, async (req, res) => {
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
    else{
      res.status(200).json({
        courses
      })
    }

  } catch (error) {
    res.status(400).json({
      message: `Some unexpected error ${error}`,
    });
  }
});

module.exports = app;