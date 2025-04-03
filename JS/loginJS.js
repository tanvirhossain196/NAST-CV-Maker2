"use strict";

// main code
let loginBtn = document.querySelector("#loginBtn");
let signupBtn = document.querySelector("#signupBtn");
let blankTemplate = document.querySelector(".blank-template");

blankTemplate.addEventListener("click", function () {
  window.location.href = `/build`;
});

loginBtn.addEventListener("click", function () {
  // Show the login modal instead of redirecting
  $("#loginModal").modal("show");
});

signupBtn.addEventListener("click", function () {
  window.location.href = `/signup`;
});

// Show/hide password functionality
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".show-password")
    .addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const showText = this;

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showText.textContent = "Hide";
      } else {
        passwordInput.type = "password";
        showText.textContent = "Show";
      }
    });
});
