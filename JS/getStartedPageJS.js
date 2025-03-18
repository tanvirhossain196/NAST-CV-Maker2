// initial code 
"use strict" 

// main code 

let loginBtn = document.querySelector("#loginBtn") ;
let signupBtn = document.querySelector("#signupBtn") ;
let dottedDiv = document.querySelector("#dottedDiv") ;

dottedDiv.addEventListener("click" , function(){
    window.location.href = `/build` ;
})

loginBtn.addEventListener("click" , function(){
    window.location.href = `/login` ;
}) ;

signupBtn.addEventListener("click" , function(){
    window.location.href = `/signup` ;
}) ;
