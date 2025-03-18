// initial code

"use strict";
console.clear();

// main code

// require all the modules , packages , objects

let path = require("path");
const { signupCollection, CVInfoColl } = require("../model/user.model");

// login part

let getLogin = function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "pages", "loginPage.html"));
};

let postLogin = async function (req, res) {
  let givenEmail = req.body.email;
  let givenPassword = req.body.password;

  let data = (await signupCollection.findOne({ email: givenEmail })) || null;

  if (data !== null) {
    if (data.email === givenEmail && data.password === givenPassword) {
      res.redirect("/");
    } else {
      res.json({
        status: 402,
        success: false,
        message: "incorrect email or password",
      });
    }
  } else {
    res.json({
      status: 402,
      success: false,
      message: "No account found for this email",
    });
  }
};

// signup part

let getSignup = function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "pages", "register.html"));
};

let postSignup = async function (req, res) {
  let { name, email, password } = req.body;

  let newUser = await signupCollection.create({
    name,
    email,
    password,
  });

  res.status(201).redirect("/login");
};

let getTemplet1 = function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "pages", "templet1.html"));
};

let getTemplet2 = function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "pages", "templet2.html"));
};

// forget pass part

let forgetpass = function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "pages", "forgetPass.html"));
};

// get started part

let getStarted = function (req, res) {
  res
    .status(200)
    .sendFile(path.join(__dirname, "..", "pages", "getStartedPage.html"));
};

// build cv part

let build = function (req, res) {
  res.status(200).sendFile(path.join(__dirname, "..", "pages", "form.html"));
};

let postBuild = async function (req, res) {
  let {
    name,
    email,
    mobile,
    currentAddress,
    permanentAddress,
    linkedLink,
    about,
    ssc,
    hsc,
    bsc,
    skills,
    hobbies,
  } = req.body;

  let newCV = await CVInfoColl.create({
    name,
    email,
    mobile,
    currentAddress,
    permanentAddress,
    linkedLink,
    about,
    ssc,
    hsc,
    bsc,
    skills,
    hobbies,
  });

  res.status(201).json({
    status: 201,
    success: true,
    newCV,
  });
};

// export codes

module.exports = {
  getStarted,
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  build,
  postBuild,
  forgetpass,
  getTemplet1,
  getTemplet2,
};
