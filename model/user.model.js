// initial code 

"use strict" 
console.clear() ;

// main code 

// require all the modules , packages , objects 

let mongoose = require("mongoose") ;

// connection of server and database

async function connectDB ()
{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/NAST_CV") ;
        console.log("Database is connected") ;
    }
    catch(error)
    {
        console.log(error) ;
        process.exit(1) ;
    }
}

// create collection for signup information 

let signupCollectionSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true
    } ,

    email : {
        type : String ,
        required : true 
    }   ,

    password : {
        type : String ,
        required : true
    }

});

let signupCollection = mongoose.model("signup-info" , signupCollectionSchema) ;

// create collection for CV information 

const cvInfoCollSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        // required: true
    },
    currentAddress: {
        type: String,
        // required: true
    },
    permanentAddress: {
        type: String,
        // required: true
    },
    linkedLink: {
        type: String,
        // trim: true
    },
    about: {
        type: String,
        // trim: true
    }, 
    ssc: {
            type: String,
            // trim: true
        },
    hsc: {
            type: String,
            // trim: true
        },
    bsc: {
            type: String,
            // trim: true
        },
    skills: {
        type: [String], // Array of strings
        // required: true
    },
    hobbies: {
        type: [String] // Array of strings
    }
});

const CVInfoColl = mongoose.model("CV-Information", cvInfoCollSchema);


// export codes 

module.exports = {
    connectDB,
    signupCollection ,
    CVInfoColl ,
}