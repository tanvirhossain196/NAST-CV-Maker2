// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let expressValidator = require("express-validator") ;

// error handle for input validation 

let validationErrorHandle = function(req,res,next){

    let err = expressValidator.validationResult(req) ;

    if(err.isEmpty())
    {
        next() ;
    }
    else
    {
        res.status(401).json({
            status : 401,
            errors : err.array() 
        });
    }

}


// export codes 

module.exports = validationErrorHandle ;