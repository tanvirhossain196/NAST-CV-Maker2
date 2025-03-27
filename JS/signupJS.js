"use strict";

// main code
let loginBtn = document.querySelector("#loginBtn");
let signupBtn = document.querySelector("#signupBtn");
let blankTemplate = document.querySelector(".blank-template");
let switchToLoginLink = document.querySelector("#switchToLogin");

blankTemplate.addEventListener("click", function () {
  window.location.href = `/build`;
});

loginBtn.addEventListener("click", function () {
  // Show the login modal
  $("#loginModal").modal("show");
});

signupBtn.addEventListener("click", function () {
  // Show the signup modal instead of redirecting
  $("#signupModal").modal("show");
});

// Switch from signup to login modal
if (switchToLoginLink) {
  switchToLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    $("#signupModal").modal("hide");
    setTimeout(function () {
      $("#loginModal").modal("show");
    }, 500);
  });
}

// Show/hide password functionality for login
document.addEventListener("DOMContentLoaded", function () {
  const showPasswordBtn = document.querySelector(".show-password");
  if (showPasswordBtn) {
    showPasswordBtn.addEventListener("click", function () {
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
  }

  // Show/hide password functionality for signup
  const showPasswordSignupBtn = document.querySelector(".show-password-signup");
  if (showPasswordSignupBtn) {
    showPasswordSignupBtn.addEventListener("click", function () {
      const passwordInput = document.getElementById("signupPassword");
      const showText = this;

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showText.textContent = "Hide";
      } else {
        passwordInput.type = "password";
        showText.textContent = "Show";
      }
    });
  }
});
