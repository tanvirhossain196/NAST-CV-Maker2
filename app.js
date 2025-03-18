"use strict";
console.clear();

let express = require("express");
let app = express();
let path = require("path");
let route = require("./router/user.router") ;
let morgan = require("morgan") ;

// Serve static files from the "images" folder

app.use(express.urlencoded({extended:true})) ;
app.use(express.json()) ;

app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'cssFiles')));
app.use(express.static(path.join(__dirname, "JS"))); 
app.use(morgan("dev")) ;

app.use(route) ;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.use(function(req, res, next){
    res.status(404).json({
        status: 404,
        message: "Page not found"
    });
});

module.exports = app;
