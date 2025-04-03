// "use strict";

// // main code
// let loginBtns = document.querySelector("#loginBtn");
// let signupBtns = document.querySelector("#signupBtn");
// let blankTemplates = document.querySelector(".blank-template");

// blankTemplates.addEventListener("click", function () {
//   window.location.href = `/build`;
// });

// loginBtns.addEventListener("click", function () {
//   window.location.href = `/login`;
// });

// signupBtns.addEventListener("click", function () {
//   window.location.href = `/signup`;
// });

// "use strict";

// // main code
// let loginBtn = document.querySelector("#loginBtn");
// let signupBtn = document.querySelector("#signupBtn");
// let blankTemplate = document.querySelector(".blank-template");

// blankTemplate.addEventListener("click", function () {
//   window.location.href = `/build`;
// });

// loginBtn.addEventListener("click", function () {
//   // Show the login modal instead of redirecting
//   $("#loginModal").modal("show");
// });

// signupBtn.addEventListener("click", function () {
//   window.location.href = `/signup`;
// });

// // Show/hide password functionality
// document.addEventListener("DOMContentLoaded", function () {
//   const showPasswordBtn = document.querySelector(".show-password");
//   if (showPasswordBtn) {
//     showPasswordBtn.addEventListener("click", function () {
//       const passwordInput = document.getElementById("password");
//       const showText = this;

//       if (passwordInput.type === "password") {
//         passwordInput.type = "text";
//         showText.textContent = "Hide";
//       } else {
//         passwordInput.type = "password";
//         showText.textContent = "Show";
//       }
//     });
//   }
// });

// "use strict";

// // main code
// let loginBtn = document.querySelector("#loginBtn");
// let signupBtn = document.querySelector("#signupBtn");
// let blankTemplate = document.querySelector(".blank-template");
// let switchToLoginLink = document.querySelector("#switchToLogin");

// blankTemplate.addEventListener("click", function () {
//   window.location.href = `/build`;
// });

// loginBtn.addEventListener("click", function () {
//   // Show the login modal
//   $("#loginModal").modal("show");
// });

// signupBtn.addEventListener("click", function () {
//   // Show the signup modal instead of redirecting
//   $("#signupModal").modal("show");
// });

// // Switch from signup to login modal
// if (switchToLoginLink) {
//   switchToLoginLink.addEventListener("click", function (e) {
//     e.preventDefault();
//     $("#signupModal").modal("hide");
//     setTimeout(function () {
//       $("#loginModal").modal("show");
//     }, 500);
//   });
// }

// // Show/hide password functionality for login
// document.addEventListener("DOMContentLoaded", function () {
//   const showPasswordBtn = document.querySelector(".show-password");
//   if (showPasswordBtn) {
//     showPasswordBtn.addEventListener("click", function () {
//       const passwordInput = document.getElementById("password");
//       const showText = this;

//       if (passwordInput.type === "password") {
//         passwordInput.type = "text";
//         showText.textContent = "Hide";
//       } else {
//         passwordInput.type = "password";
//         showText.textContent = "Show";
//       }
//     });
//   }

//   // Show/hide password functionality for signup
//   const showPasswordSignupBtn = document.querySelector(".show-password-signup");
//   if (showPasswordSignupBtn) {
//     showPasswordSignupBtn.addEventListener("click", function () {
//       const passwordInput = document.getElementById("signupPassword");
//       const showText = this;

//       if (passwordInput.type === "password") {
//         passwordInput.type = "text";
//         showText.textContent = "Hide";
//       } else {
//         passwordInput.type = "password";
//         showText.textContent = "Show";
//       }
//     });
//   }
// });

// "use strict";

// // main code
// let loginBtns = document.querySelector("#loginBtn");
// let signupBtns = document.querySelector("#signupBtn");
// let blankTemplates = document.querySelector(".blank-template");

// blankTemplate.addEventListener("click", function () {
//   window.location.href = `/build`;
// });

// loginBtn.addEventListener("click", function () {
//   window.location.href = `/login`;
// });

// signupBtn.addEventListener("click", function () {
//   window.location.href = `/signup`;
// });

"use strict";

// main code
let loginBtn = document.querySelector("#loginBtn");
let signupBtn = document.querySelector("#signupBtn");
let blankTemplate = document.querySelector(".blank-template");
let switchToLoginLink = document.querySelector("#switchToLogin");
let switchToSignupLink = document.querySelector("#switchToSignup");
let forgotPasswordLink = document.querySelector("#forgotPasswordLink");
let switchToLoginFromReset = document.querySelector("#switchToLoginFromReset");

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

// Switch from login to signup modal
if (switchToSignupLink) {
  switchToSignupLink.addEventListener("click", function (e) {
    e.preventDefault();
    $("#loginModal").modal("hide");
    setTimeout(function () {
      $("#signupModal").modal("show");
    }, 500);
  });
}

// Show forgot password modal
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", function (e) {
    e.preventDefault();
    $("#loginModal").modal("hide");
    setTimeout(function () {
      $("#forgotPasswordModal").modal("show");
    }, 500);
  });
}

// Switch from reset password back to login
if (switchToLoginFromReset) {
  switchToLoginFromReset.addEventListener("click", function (e) {
    e.preventDefault();
    $("#forgotPasswordModal").modal("hide");
    setTimeout(function () {
      $("#loginModal").modal("show");
    }, 500);
  });
}

// Show/hide password functionality
document.addEventListener("DOMContentLoaded", function () {
  // Login password toggle
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

  // Signup password toggle
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

  // Reset password form validation
  const resetForm = document.querySelector("#forgotPasswordModal form");
  const resetEmailInput = document.getElementById("resetEmail");
  const resetErrorMessage = document.querySelector(
    "#forgotPasswordModal .error-message"
  );

  if (resetForm) {
    resetForm.addEventListener("submit", function (e) {
      if (!resetEmailInput.value.trim()) {
        e.preventDefault();
        resetErrorMessage.style.display = "block";
        resetEmailInput.classList.add("error");
      } else {
        resetErrorMessage.style.display = "none";
        resetEmailInput.classList.remove("error");
      }
    });

    resetEmailInput.addEventListener("input", function () {
      if (resetEmailInput.value.trim()) {
        resetErrorMessage.style.display = "none";
        resetEmailInput.classList.remove("error");
      }
    });

    resetEmailInput.addEventListener("blur", function () {
      if (!resetEmailInput.value.trim()) {
        resetErrorMessage.style.display = "block";
        resetEmailInput.classList.add("error");
      }
    });
  }
});
