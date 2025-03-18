// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let expressValidator = require("express-validator") ;

// rules for input validation 

exports.signupValidationRules = [

    expressValidator.check("name").trim().notEmpty().withMessage("name is empty") ,
    expressValidator.check("email").trim().notEmpty().withMessage("email is empty").isEmail().withMessage("invalid email"),
    expressValidator.check("password").trim().notEmpty().withMessage("password is empty").isLength({min:6 , max:12}).withMessage("password length should be between 6 and 12 characters")
]

exports.loginValidationRules = [

    expressValidator.check("email").trim().notEmpty().withMessage("email is empty").isEmail().withMessage("invalid email"),
    expressValidator.check("password").trim().notEmpty().withMessage("password is empty").isLength({min:6 , max:12}).withMessage("password length should be between 6 and 12 characters")
]
