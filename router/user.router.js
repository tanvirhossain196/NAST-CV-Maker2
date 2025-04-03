// initial code

"use strict";
console.clear();

// main code

// require all the modules , packages , objects
let express = require("express");
const {
  getStarted,
  getLogin,
  getSignup,
  build,
  forgetpass,
  postSignup,
  postLogin,
  postBuild,
  getTemplet2,
  getTemplet3,
  about,
  planpricing,
  home,
} = require("../controller/user.controller");
const {
  signupValidationRules,
  loginValidationRules,
} = require("../validation/rules.validation");
const validationErrorHandle = require("../validation/errorHandling.validation");

let route = express.Router();

// routing codes

route.get("/get-started", getStarted);

route.get("/login", getLogin);
route.post("/login", loginValidationRules, validationErrorHandle, postLogin);

route.get("/signup", getSignup);
route.post("/signup", signupValidationRules, validationErrorHandle, postSignup);

route.get("/build", build);
route.post("/build", postBuild);

// Template routes
route.get("/templet2", getTemplet2);
route.get("/templet3", getTemplet3);

route.get("/forgetpass", forgetpass);

route.get("/about", about);

route.get("/planpricing", planpricing);

route.get("/home", home);

// export codes

module.exports = route;
