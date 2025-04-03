// "use strict";
// console.clear();

// // Navbar and Scroll Effects
// document.addEventListener("DOMContentLoaded", function () {
//   const headerDiv = document.getElementById("headerDiv");

//   // Check if we're on the pricing page
//   const isPricingPage = window.location.pathname.includes("/pricing");

//   // Start with transparent background (only for pricing page)
//   if (isPricingPage) {
//     headerDiv.classList.remove("scrolled");
//   }

//   // Scroll event listener
//   window.addEventListener("scroll", function () {
//     if (window.scrollY > 50) {
//       // Add white background when scrolled
//       headerDiv.classList.add("scrolled");
//     } else {
//       // Remove white background when at top
//       if (isPricingPage) {
//         headerDiv.classList.remove("scrolled");
//       }
//     }
//   });

//   // Navigation link click handlers
//   const navLinks = document.querySelectorAll(".nav-link");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (e) {
//       const page = this.getAttribute("data-page");
//       switch (page) {
//         case "template":
//           window.location.href = "/pricing";
//           break;
//         case "about":
//           window.location.href = "/about";
//           break;
//         case "get-started":
//           window.location.href = "/get-started";
//           break;
//       }
//     });
//   });

//   // Get Started Button
//   let getStartedButton = document.getElementById("getStartedButton");
//   if (getStartedButton) {
//     getStartedButton.addEventListener("click", function () {
//       window.location.href = `/get-started`;
//     });
//   }

//   // Typing Effect (if on index page)
//   const typingElement = document.querySelector("#typing");
//   if (typingElement) {
//     const texts = [
//       "Your first resume is 100% free, including all design features & unlimited downloads. Yes, really!",
//     ];
//     let index = 0;
//     let charIndex = 0;
//     let currentText = "";
//     let typingSpeed = 100;

//     function typeEffect() {
//       if (charIndex < texts[index].length) {
//         currentText += texts[index][charIndex];
//         typingElement.textContent = currentText;
//         charIndex++;
//         setTimeout(typeEffect, typingSpeed);
//       } else {
//         setTimeout(eraseEffect, 1000);
//       }
//     }

//     function eraseEffect() {
//       if (charIndex > 0) {
//         currentText = currentText.slice(0, -1);
//         typingElement.textContent = currentText;
//         charIndex--;
//         setTimeout(eraseEffect, 50);
//       } else {
//         index = (index + 1) % texts.length;
//         setTimeout(typeEffect, 500);
//       }
//     }

//     typeEffect();
//   }
// });
