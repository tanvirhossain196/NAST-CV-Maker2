// When clicking the button, replace it with input field and delete button
function addPersonalInfoField(button) {
  const fieldName = button.textContent.replace("+ ", ""); // Get the field name from the button text

  // Create input field container
  const inputFieldContainer = document.createElement("div");
  inputFieldContainer.classList.add("input-field-container");

  // Create input field
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = `Enter ${fieldName}`;

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.innerHTML = "&#10006;"; // Delete icon

  // When delete button is clicked, replace input field with the original button
  deleteButton.onclick = function () {
    inputFieldContainer.remove();
    button.style.display = "inline-block";
  };

  // Add input field and delete button to the container
  inputFieldContainer.appendChild(inputField);
  inputFieldContainer.appendChild(deleteButton);

  // Hide the button and add input field with delete button
  button.style.display = "none";
  button.parentElement.appendChild(inputFieldContainer);
}

// Update CV Preview dynamically
document.getElementById("fullName").addEventListener("input", function () {
  document.getElementById("cvFullName").textContent = this.value || "Full Name";
});

document.getElementById("jobTitle").addEventListener("input", function () {
  document.getElementById("cvJobTitle").textContent = this.value || "Job Title";
});

document.getElementById("email").addEventListener("input", function () {
  document.getElementById("cvEmail").textContent = this.value || "Email";
});

document.getElementById("phone").addEventListener("input", function () {
  document.getElementById("cvPhone").textContent = this.value || "Phone";
});

document.getElementById("address").addEventListener("input", function () {
  document.getElementById("cvAddress").textContent = this.value || "Address";
});

// Dynamic Personal Information Example (Other sections like 'About Me', 'Work Experience')
document.getElementById("aboutMe").addEventListener("input", function () {
  document.getElementById("aboutMe").textContent =
    this.value || "Brief description about the person";
});

document
  .getElementById("workExperience")
  .addEventListener("input", function () {
    document.getElementById("workExperience").textContent =
      this.value || "Details about work experience";
  });

document.getElementById("education").addEventListener("input", function () {
  document.getElementById("education").textContent =
    this.value || "Educational background";
});

document.getElementById("hardSkills").addEventListener("input", function () {
  document.getElementById("hardSkills").textContent =
    this.value || "Skills list";
});

document.getElementById("certificates").addEventListener("input", function () {
  document.getElementById("certificates").textContent =
    this.value || "Certificates and achievements";
});

document.getElementById("languages").addEventListener("input", function () {
  document.getElementById("languages").textContent =
    this.value || "Languages spoken";
});

// To handle the dynamic update of resume name
document.getElementById("resumeName").addEventListener("click", function () {
  this.setAttribute("contenteditable", "true");
  this.focus(); // Focus the text area for immediate editing
});

document.getElementById("resumeName").addEventListener("blur", function () {
  this.setAttribute("contenteditable", "false");
});

// Function to handle Word file upload and convert to HTML
document
  .getElementById("wordFile")
  .addEventListener("change", function (event) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var arrayBuffer = e.target.result;

      // Convert the Word document to HTML using Mammoth.js
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function (result) {
          // Inject the converted HTML into the right-content section
          document.querySelector(".cv-template").innerHTML = result.value;
        })
        .catch(function (err) {
          console.log("Error converting Word file:", err);
        });
    };

    // Read the uploaded file as an ArrayBuffer
    reader.readAsArrayBuffer(event.target.files[0]);
  });
