document.addEventListener("DOMContentLoaded", function () {
  // ---------- IMAGE UPLOAD FUNCTIONALITY ----------
  // Elements for profile image upload
  const profileUploadInput = document.getElementById("profile-upload-input");
  const profilePlaceholder = document.getElementById("profile-placeholder");
  const templateProfileImage = document.getElementById(
    "template-profile-image"
  );
  const templateProfilePlaceholder = document.getElementById(
    "template-profile-placeholder"
  );

  // Variables to track image state
  let currentImageUrl = "";

  // Handle image upload
  profileUploadInput.addEventListener("change", function (event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Store the image URL
        currentImageUrl = e.target.result;

        // Update template profile image
        templateProfileImage.src = currentImageUrl;
        templateProfileImage.style.display = "block";
        templateProfilePlaceholder.style.display = "none";

        // Set initial image styling
        templateProfileImage.style.width = "100%";
        templateProfileImage.style.height = "100%";
        templateProfileImage.style.objectFit = "cover";
        templateProfileImage.style.borderRadius = "50%";
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  });

  // ---------- DYNAMIC FORM FIELDS FUNCTIONALITY ----------
  // Helper function to create a field group with delete button
  function createFieldGroup(
    labelText,
    placeholder,
    optional = true,
    sourceButtonId
  ) {
    // Create field container
    const fieldGroup = document.createElement("div");
    fieldGroup.className = "form-group added-field";
    fieldGroup.style.position = "relative"; // For proper delete button positioning

    // Create label
    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = labelText + " ";

    // Add optional text if needed
    if (optional) {
      const optionalSpan = document.createElement("span");
      optionalSpan.className = "optional";
      optionalSpan.textContent = "optional";
      label.appendChild(optionalSpan);
    }

    // Create input
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-input";
    input.placeholder = placeholder;

    // Store the source button ID
    fieldGroup.dataset.sourceButton = sourceButtonId;
    fieldGroup.dataset.fieldType = labelText; // Store field type

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-field-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // Add event listener to delete button
    deleteBtn.addEventListener("click", function () {
      // Find and show the corresponding add button
      if (sourceButtonId) {
        const sourceButton = document.getElementById(sourceButtonId);
        if (sourceButton) {
          sourceButton.style.display = "inline-flex";
        }
      }

      // Remove from customFields if exists
      if (window.templateFunctions && window.templateFunctions.customFields) {
        if (
          window.templateFunctions.customFields.personal &&
          window.templateFunctions.customFields.personal[labelText]
        ) {
          delete window.templateFunctions.customFields.personal[labelText];

          // Update the template
          if (window.templateFunctions.updateTemplate) {
            window.templateFunctions.updateTemplate();
          }
        }
      }

      fieldGroup.remove();
    });

    // Add elements to field group
    fieldGroup.appendChild(label);
    fieldGroup.appendChild(input);
    fieldGroup.appendChild(deleteBtn);

    return fieldGroup;
  }

  // Add unique IDs to all buttons for easy referencing
  const allAddButtons = document.querySelectorAll(".add-btn");
  allAddButtons.forEach((button, index) => {
    const buttonText = button.textContent.trim();
    // Extract text after the "+" sign
    const cleanText = buttonText.substring(buttonText.indexOf(" ") + 1);
    // Create ID based on text
    const buttonId = "add-btn-" + cleanText.toLowerCase().replace(/\s+/g, "-");
    button.id = buttonId;
  });

  // Target buttons that need special handling for template updates
  const targetButtons = [
    "Date of Birth",
    "Nationality",
    "Marital status",
    "Gender/Pronoun",
    "Gender",
  ];

  // Handle Personal Information and Links buttons
  allAddButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get button text without the + sign
      const buttonTextWithPlus = this.textContent.trim();
      const buttonText = buttonTextWithPlus.substring(
        buttonTextWithPlus.indexOf(" ") + 1
      );

      // Set appropriate placeholder text based on field type
      let placeholder = "";

      switch (buttonText) {
        case "Date of Birth":
          placeholder = "Enter your date of birth";
          break;
        case "Nationality":
          placeholder = "Enter Nationality";
          break;
        case "Passport or Id":
          placeholder = "Enter id number";
          break;
        case "Marital status":
          placeholder = "Enter marital status";
          break;
        case "Military Service":
          placeholder = "Enter military service details";
          break;
        case "Driving License":
          placeholder = "Enter driving license details";
          break;
        case "Gender/Pronoun":
          placeholder = "Enter gender/pronoun";
          break;
        case "Gender":
          placeholder = "Enter gender";
          break;
        case "Visa":
          placeholder = "Enter visa details";
          break;
        case "Website":
        case "LinkedIn":
        case "GitHub":
        case "Medium":
        case "ORCID":
        case "Skype":
        case "Bluesky":
          placeholder = `Enter ${buttonText.toLowerCase()} URL`;
          break;
        default:
          placeholder = `Enter ${buttonText.toLowerCase()}`;
      }

      // Create the field group with button ID
      const fieldGroup = createFieldGroup(
        buttonText,
        placeholder,
        true,
        this.id
      );

      // Determine where to insert the field
      if (
        [
          "Website",
          "LinkedIn",
          "GitHub",
          "Medium",
          "ORCID",
          "Skype",
          "Bluesky",
        ].includes(buttonText)
      ) {
        // For Links - insert before the Links section label
        const linksSection = Array.from(
          document.querySelectorAll(".section-label")
        ).find((el) => el.textContent.includes("Links"));

        if (linksSection) {
          linksSection.parentNode.insertBefore(fieldGroup, linksSection);
        }
      } else {
        // For Personal Information - insert before the Personal information section label
        const personalInfoSection = Array.from(
          document.querySelectorAll(".section-label")
        ).find((el) => el.textContent.includes("Personal information"));

        if (personalInfoSection) {
          personalInfoSection.parentNode.insertBefore(
            fieldGroup,
            personalInfoSection
          );
        }
      }

      // Special handling for target buttons (Date of Birth, Nationality, etc.)
      if (targetButtons.includes(buttonText)) {
        const input = fieldGroup.querySelector(".form-input");

        // Add custom input handler to ensure template updates
        input.addEventListener("input", function () {
          // Use multiple methods to ensure the template updates

          // Method 1: Add to customFields and update template
          if (
            window.templateFunctions &&
            window.templateFunctions.customFields
          ) {
            // Store value in customFields
            window.templateFunctions.customFields.personal[buttonText] =
              this.value;

            // Call template update functions
            if (window.templateFunctions.updateTemplate) {
              window.templateFunctions.updateTemplate();
            }
          }

          // Method 2: Direct DOM update as a backup
          if (
            !window.templateFunctions ||
            !window.templateFunctions.updateTemplate
          ) {
            updatePersonalInfoInTemplate(buttonText, this.value);
          }
        });
      }

      // Hide the button
      this.style.display = "none";
    });
  });

  // Function to directly update personal info in the template
  function updatePersonalInfoInTemplate(fieldType, value) {
    const personalInfoContainer = document.querySelector(
      ".template-personal-info"
    );
    if (!personalInfoContainer) return;

    // Find any existing item for this field type
    let existingItem = null;
    const items = personalInfoContainer.querySelectorAll(
      ".template-contact-item"
    );
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Try to determine if this is the correct item
      // Using various checks to handle different setups
      const icon = item.querySelector("i");
      const iconMatches =
        icon && iconMatchesFieldType(icon.className, fieldType);
      const span = item.querySelector("span");

      if (iconMatches) {
        existingItem = item;
        break;
      }
    }

    // Choose appropriate icon
    let iconClass = "fa-info-circle"; // Default
    switch (fieldType.toLowerCase()) {
      case "date of birth":
        iconClass = "fa-cake-candles";
        break;
      case "nationality":
        iconClass = "fa-flag";
        break;
      case "marital status":
        iconClass = "fa-heart";
        break;
      case "gender":
      case "gender/pronoun":
        iconClass = "fa-user";
        break;
      case "military service":
        iconClass = "fa-shield-alt";
        break;
      case "passport or id":
        iconClass = "fa-id-card";
        break;
      case "driving license":
        iconClass = "fa-car";
        break;
      case "visa":
        iconClass = "fa-passport";
        break;
    }

    // Update or create item
    if (value.trim() === "" && existingItem) {
      // Remove if empty value
      existingItem.remove();
    } else if (value.trim() !== "") {
      if (existingItem) {
        // Update existing item
        const span = existingItem.querySelector("span");
        if (span) {
          span.textContent = value;
        }
      } else {
        // Create new item
        const newItem = document.createElement("div");
        newItem.className = "template-contact-item";
        newItem.dataset.fieldType = fieldType;
        newItem.innerHTML = `
          <i class="fa-solid ${iconClass}"></i>
          <span>${value}</span>
        `;
        personalInfoContainer.appendChild(newItem);
      }
    }
  }

  // Helper function to determine if an icon class matches a field type
  function iconMatchesFieldType(iconClassName, fieldType) {
    const fieldTypeLower = fieldType.toLowerCase();

    if (
      fieldTypeLower === "date of birth" &&
      iconClassName.includes("fa-cake")
    ) {
      return true;
    }
    if (fieldTypeLower === "nationality" && iconClassName.includes("fa-flag")) {
      return true;
    }
    if (
      fieldTypeLower === "marital status" &&
      iconClassName.includes("fa-heart")
    ) {
      return true;
    }
    if (
      (fieldTypeLower === "gender" || fieldTypeLower === "gender/pronoun") &&
      iconClassName.includes("fa-user")
    ) {
      return true;
    }
    if (
      fieldTypeLower === "military service" &&
      iconClassName.includes("fa-shield")
    ) {
      return true;
    }
    if (
      fieldTypeLower === "passport or id" &&
      iconClassName.includes("fa-id-card")
    ) {
      return true;
    }
    if (
      fieldTypeLower === "driving license" &&
      iconClassName.includes("fa-car")
    ) {
      return true;
    }
    if (fieldTypeLower === "visa" && iconClassName.includes("fa-passport")) {
      return true;
    }

    return false;
  }

  // Add styles for delete button only
  const style = document.createElement("style");
  style.textContent = `
    .delete-field-btn {
        position: absolute;
        right: 10px;
        top: 32px; /* Position aligned with input field */
        background: none;
        border: none;
        color: #ff6384;
        cursor: pointer;
        font-size: 16px;
        z-index: 10;
    }
    .delete-field-btn:hover {
        color: #e63e6d;
    }
  `;
  document.head.appendChild(style);
});
