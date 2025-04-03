document.addEventListener("DOMContentLoaded", function () {
  // Get all form input elements
  const fullNameInput = document.querySelector(
    '.form-input[placeholder="Enter your title, first- and last name"]'
  );
  const jobTitleInput = document.querySelector(
    '.form-input[placeholder="Enter Job title"]'
  );
  const emailInput = document.querySelector(
    '.form-input[placeholder="Enter email"]'
  );
  const phoneInput = document.querySelector(
    '.form-input[placeholder="Enter Phone"]'
  );
  const addressInput = document.querySelector(
    '.form-input[placeholder="City, Country"]'
  );

  // Get template elements that will be updated
  const templateName = document.querySelector(".name h1");
  const templateDepartment = document.querySelector(".name p");
  const templateContactItems = document.querySelectorAll(".contact p");
  const templateEmail =
    templateContactItems[1]?.querySelector("span") || templateContactItems[1];
  const templatePhone =
    templateContactItems[0]?.querySelector("span") || templateContactItems[0];
  const templateAddress =
    templateContactItems[2]?.querySelector("span") || templateContactItems[2];

  // Get profile image elements
  const profileUploadInput = document.getElementById("profile-upload-input");
  const profilePlaceholder = document.getElementById("profile-placeholder");
  const profileImage = document.getElementById("profile-image");
  const templateProfileImage = document.querySelector(".profile-img img");

  // Initially hide the template profile image (show just the circle with placeholder)
  if (templateProfileImage) {
    // Hide the actual image and replace with a placeholder icon
    templateProfileImage.style.display = "none";

    // Create or find the placeholder for the template
    let templatePlaceholder = document.querySelector(
      ".profile-img .profile-placeholder"
    );
    if (!templatePlaceholder) {
      templatePlaceholder = document.createElement("div");
      templatePlaceholder.className = "profile-placeholder";
      templatePlaceholder.style.width = "160px";
      templatePlaceholder.style.height = "160px";
      templatePlaceholder.style.borderRadius = "50%";
      templatePlaceholder.style.backgroundColor = "#dcdcdc";
      templatePlaceholder.style.display = "flex";
      templatePlaceholder.style.justifyContent = "center";
      templatePlaceholder.style.alignItems = "center";
      templatePlaceholder.style.position = "relative";
      templatePlaceholder.style.margin = "0 auto";

      // Create icon
      const placeholderIcon = document.createElement("i");
      placeholderIcon.className = "fa-solid fa-user";
      placeholderIcon.style.fontSize = "60px";
      placeholderIcon.style.color = "#aaa";

      templatePlaceholder.appendChild(placeholderIcon);

      // Add before the image
      templateProfileImage.parentNode.appendChild(templatePlaceholder);
    }
  }

  // Object to store custom fields added dynamically
  const customFields = {
    personal: {},
    links: {},
  };

  // ---------- IMAGE UPLOAD & RESIZE FUNCTIONALITY ----------
  // Create and add resize controls
  const resizeControlContainer = document.createElement("div");
  resizeControlContainer.className = "resize-control-container";
  resizeControlContainer.style.display = "none";

  const resizeSlider = document.createElement("input");
  resizeSlider.type = "range";
  resizeSlider.min = "100";
  resizeSlider.max = "200";
  resizeSlider.value = "100";
  resizeSlider.className = "resize-slider";

  const resizeLabel = document.createElement("div");
  resizeLabel.className = "resize-label";
  resizeLabel.textContent = "Resize Image";

  // Create confirm button
  const confirmButton = document.createElement("button");
  confirmButton.className = "resize-confirm-btn";
  confirmButton.innerHTML = '<i class="fa-solid fa-check"></i> Confirm Size';

  resizeControlContainer.appendChild(resizeLabel);
  resizeControlContainer.appendChild(resizeSlider);
  resizeControlContainer.appendChild(confirmButton);

  // Insert after the profile upload container
  const profileUpload = document.querySelector(".profile-upload");
  profileUpload.parentNode.insertBefore(
    resizeControlContainer,
    profileUpload.nextSibling
  );

  // Variables to track image state
  let currentImageScale = 1;
  let currentImageUrl = "";
  let confirmedScale = 1;

  // Handle image upload
  profileUploadInput.addEventListener("change", function (event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Store the image URL
        currentImageUrl = e.target.result;

        // Reset scale on new upload
        currentImageScale = 1;
        resizeSlider.value = 100;

        // Update profile image in the form
        const profileImage = document.getElementById("profile-image");
        if (profileImage) {
          profileImage.src = currentImageUrl;
          profileImage.style.display = "block";
        }
        if (profilePlaceholder) {
          profilePlaceholder.style.display = "none";
        }

        // Update template profile image
        if (templateProfileImage) {
          // Hide the placeholder in template
          const templatePlaceholder = document.querySelector(
            ".profile-img .profile-placeholder"
          );
          if (templatePlaceholder) {
            templatePlaceholder.style.display = "none";
          }

          // Show and update the actual image
          templateProfileImage.src = currentImageUrl;
          templateProfileImage.style.display = "block";
          templateProfileImage.style.width = "160px"; // Fixed width matching the circle
          templateProfileImage.style.height = "160px"; // Fixed height matching the circle
          templateProfileImage.style.objectFit = "cover";
          templateProfileImage.style.borderRadius = "50%";
          templateProfileImage.style.transform = "scale(1)";
          templateProfileImage.style.transformOrigin = "center center";

          // Ensure image is centered in the parent container
          const profileImgContainer = templateProfileImage.parentElement;
          if (profileImgContainer) {
            profileImgContainer.style.display = "flex";
            profileImgContainer.style.justifyContent = "center";
            profileImgContainer.style.alignItems = "center";
          }
        }

        // Show resize controls
        resizeControlContainer.style.display = "block";
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  });

  // Handle image resizing
  resizeSlider.addEventListener("input", function () {
    if (currentImageUrl) {
      // Calculate scale based on slider value (100-200 becomes 1.0-2.0)
      currentImageScale = parseInt(this.value) / 100;

      // Apply scale transform to the template image
      if (templateProfileImage) {
        templateProfileImage.style.transform = `scale(${currentImageScale})`;
      }
    }
  });

  // Handle confirm button click
  confirmButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission if button is inside a form

    // Hide resize controls after confirmation
    resizeControlContainer.style.display = "none";

    // Save the confirmed scale
    confirmedScale = currentImageScale;

    // Ensure the transformation is permanently applied to template image
    if (templateProfileImage) {
      templateProfileImage.style.transform = `scale(${confirmedScale})`;
      // Store the confirmed scale in a data attribute for persistence
      templateProfileImage.dataset.scale = confirmedScale;
    }
  });

  // Ensure the confirmed scale persists if the template is rerendered
  if (templateProfileImage && templateProfileImage.dataset.scale) {
    templateProfileImage.style.transform = `scale(${templateProfileImage.dataset.scale})`;
  }

  // Function to update template with input values
  function updateTemplate() {
    // Update basic fields
    if (fullNameInput.value) {
      // Split the name to add span to last name if needed
      const nameParts = fullNameInput.value.trim().split(" ");
      if (nameParts.length > 1) {
        const lastName = nameParts.pop();
        const firstName = nameParts.join(" ");
        templateName.innerHTML = `${firstName} <span>${lastName}</span>`;
      } else {
        templateName.textContent = fullNameInput.value;
      }
    }

    if (jobTitleInput.value) {
      templateDepartment.textContent = jobTitleInput.value;
    }

    if (emailInput.value) {
      // Update email in template - handle both span and direct element
      if (templateEmail) {
        if (templateEmail.tagName.toLowerCase() === "span") {
          templateEmail.textContent = emailInput.value;
        } else {
          // Create or update span if needed
          let span = templateEmail.querySelector("span");
          if (!span) {
            const icon = templateEmail.querySelector("i");
            if (icon) {
              templateEmail.innerHTML = "";
              templateEmail.appendChild(icon);
              span = document.createElement("span");
              templateEmail.appendChild(span);
            } else {
              templateEmail.textContent = emailInput.value;
            }
          }
          if (span) span.textContent = emailInput.value;
        }
      }
    }

    if (phoneInput.value) {
      // Update phone in template
      if (templatePhone) {
        if (templatePhone.tagName.toLowerCase() === "span") {
          templatePhone.textContent = phoneInput.value;
        } else {
          let span = templatePhone.querySelector("span");
          if (!span) {
            const icon = templatePhone.querySelector("i");
            if (icon) {
              templatePhone.innerHTML = "";
              templatePhone.appendChild(icon);
              span = document.createElement("span");
              templatePhone.appendChild(span);
            } else {
              templatePhone.textContent = phoneInput.value;
            }
          }
          if (span) span.textContent = phoneInput.value;
        }
      }
    }

    if (addressInput.value) {
      // Update address in template
      if (templateAddress) {
        if (templateAddress.tagName.toLowerCase() === "span") {
          templateAddress.textContent = addressInput.value;
        } else {
          let span = templateAddress.querySelector("span");
          if (!span) {
            const icon = templateAddress.querySelector("i");
            if (icon) {
              templateAddress.innerHTML = "";
              templateAddress.appendChild(icon);
              span = document.createElement("span");
              templateAddress.appendChild(span);
            } else {
              templateAddress.textContent = addressInput.value;
            }
          }
          if (span) span.textContent = addressInput.value;
        }
      }
    }

    // Update custom personal information fields
    updateCustomFields();
  }

  // Function to update custom fields in the template
  function updateCustomFields() {
    // Personal information fields - update in the left content contact section
    const contactSection = document.querySelector(".contact");

    // Keep standard contact items (first 3 items: phone, email, address)
    const standardItems = 3;

    // Remove existing custom contact items (after the standard items)
    const existingItems = contactSection.querySelectorAll("p");
    for (let i = standardItems; i < existingItems.length; i++) {
      existingItems[i].remove();
    }

    // Recreate personal info items
    for (const [key, value] of Object.entries(customFields.personal)) {
      if (value) {
        const item = createPersonalInfoItem(key, value);
        contactSection.appendChild(item);
      }
    }

    // Links section - update in the template
    let linksSection = document.querySelector(".template-links-section");

    if (Object.keys(customFields.links).length > 0) {
      // Create links section if it doesn't exist and we have links
      if (!linksSection) {
        // Find a good place to insert the links section
        const rightContent = document.querySelector(".right-content");

        // Create section title
        const linksSectionTitle = document.createElement("h2");
        linksSectionTitle.innerHTML = '<i class="fas fa-link"></i> LINKS';

        // Create links container
        linksSection = document.createElement("div");
        linksSection.className = "template-links-section";

        // Add divider before the section
        const divider = document.createElement("div");
        divider.className = "divider";

        // Add to template container
        if (rightContent) {
          rightContent.appendChild(divider);
          rightContent.appendChild(linksSectionTitle);
          rightContent.appendChild(linksSection);
        }
      }

      if (linksSection) {
        linksSection.innerHTML = ""; // Clear existing links

        // Add each link
        for (const [site, url] of Object.entries(customFields.links)) {
          if (url) {
            const linkItem = document.createElement("p");
            linkItem.innerHTML = `<i class="fas fa-globe"></i> <span>${site}: <a href="${url}" target="_blank">${url}</a></span>`;
            linksSection.appendChild(linkItem);
          }
        }
      }
    } else if (linksSection) {
      // Remove links section if empty
      const title = linksSection.previousElementSibling;
      const divider = title.previousElementSibling;
      if (
        title &&
        title.tagName === "H2" &&
        title.innerHTML.includes("LINKS")
      ) {
        title.remove();
      }
      if (divider && divider.className === "divider") {
        divider.remove();
      }
      linksSection.remove();
    }
  }

  // Helper function to create personal info items
  function createPersonalInfoItem(key, value) {
    const item = document.createElement("p");

    // Choose appropriate icon based on the key
    let icon = "info-circle"; // Default icon

    switch (key.toLowerCase()) {
      case "date of birth":
        icon = "birthday-cake";
        break;
      case "nationality":
        icon = "flag";
        break;
      case "marital status":
        icon = "heart";
        break;
      case "gender":
      case "gender/pronoun":
        icon = "venus-mars";
        break;
      case "military service":
        icon = "shield-alt";
        break;
      case "passport or id":
        icon = "id-card";
        break;
      case "driving license":
        icon = "car";
        break;
      case "visa":
        icon = "passport";
        break;
    }

    item.innerHTML = `<i class="fas fa-${icon}"></i><span>${value}</span>`;

    return item;
  }

  // Add event listeners to form inputs
  fullNameInput.addEventListener("input", updateTemplate);
  jobTitleInput.addEventListener("input", updateTemplate);
  emailInput.addEventListener("input", updateTemplate);
  phoneInput.addEventListener("input", updateTemplate);
  addressInput.addEventListener("input", updateTemplate);

  // Function to handle dynamic field additions
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
      } else {
        // Direct removal from our local customFields
        if (fieldGroup.dataset.fieldType) {
          if (
            [
              "Website",
              "LinkedIn",
              "GitHub",
              "Medium",
              "ORCID",
              "Skype",
              "Bluesky",
            ].includes(fieldGroup.dataset.fieldType)
          ) {
            delete customFields.links[fieldGroup.dataset.fieldType];
          } else {
            delete customFields.personal[fieldGroup.dataset.fieldType];
          }
          updateTemplate();
        }
      }

      fieldGroup.remove();
    });

    // Add elements to field group
    fieldGroup.appendChild(label);
    fieldGroup.appendChild(input);
    fieldGroup.appendChild(deleteBtn);

    // Add input event listeners
    input.addEventListener("input", function () {
      // Determine if it's a personal info field or a link
      let category = "personal";
      if (
        [
          "Website",
          "LinkedIn",
          "GitHub",
          "Medium",
          "ORCID",
          "Skype",
          "Bluesky",
        ].includes(labelText)
      ) {
        category = "links";
      }

      // Store the value
      if (category === "personal") {
        customFields.personal[labelText] = input.value;
      } else {
        customFields.links[labelText] = input.value;
      }

      // Update the template
      updateTemplate();
    });

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

  // Function to create section form with appropriate fields
  function createSectionForm(sectionType, buttonElement) {
    const sectionForm = document.createElement("div");
    sectionForm.className = "section-form added-field";
    sectionForm.dataset.sectionType = sectionType;
    sectionForm.style.position = "relative";

    // Create the main form group
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    // Create section label
    const label = document.createElement("label");
    label.className = "form-label";
    label.textContent = sectionType + " ";

    // Create entries container to hold multiple entries
    const entriesContainer = document.createElement("div");
    entriesContainer.className = "entries-container";

    // Add different fields based on section type
    if (sectionType === "Objective") {
      // Single textarea for objective
      const textarea = document.createElement("textarea");
      textarea.className = "form-input";
      textarea.placeholder = "Enter your career objective";
      textarea.rows = 4;
      textarea.value =
        "Looking for a position as a teaching assistant at EWU where I may use my skills to help students develop holistically and to assist teachers in an effective manner.";

      textarea.addEventListener("input", function () {
        updateSectionInTemplate(sectionType, this.value);
      });

      entriesContainer.appendChild(textarea);

      // Initial update
      updateSectionInTemplate(sectionType, textarea.value);
    } else if (sectionType === "Professional Experience") {
      // Multiple entries for experience
      addExperienceEntry(entriesContainer, 0, {
        title: "Senior Web Designer",
        duration: "2020-Present",
        company: "Creative Agency / Chicago",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      });

      addExperienceEntry(entriesContainer, 1, {
        title: "Graphic Designer",
        duration: "2015-2020",
        company: "Creative Market / Chicago",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      });

      addExperienceEntry(entriesContainer, 2, {
        title: "Marketing Manager",
        duration: "2013-2015",
        company: "Manufacturing Agency / NJ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      });

      // Add "Add More" button
      const addMoreButton = document.createElement("button");
      addMoreButton.type = "button";
      addMoreButton.className = "add-more-btn";
      addMoreButton.innerHTML =
        '<i class="fa-solid fa-plus"></i> Add More Experience';

      addMoreButton.addEventListener("click", function () {
        const entryCount =
          entriesContainer.querySelectorAll(".entry-fields").length;
        addExperienceEntry(entriesContainer, entryCount);

        // Update template
        updateExperienceSection(entriesContainer);
      });

      entriesContainer.appendChild(addMoreButton);

      // Initial update
      updateExperienceSection(entriesContainer);
    } else if (sectionType === "Education") {
      // Multiple entries for education
      addEducationEntry(entriesContainer, 0, {
        degree: "Master Degree Graduate",
        duration: "2011-2013",
        institution: "Stanford University",
      });

      addEducationEntry(entriesContainer, 1, {
        degree: "Bachelor Degree Graduate",
        duration: "2007-2010",
        institution: "University of Chicago",
      });

      // Add "Add More" button
      const addMoreButton = document.createElement("button");
      addMoreButton.type = "button";
      addMoreButton.className = "add-more-btn";
      addMoreButton.innerHTML =
        '<i class="fa-solid fa-plus"></i> Add More Education';

      addMoreButton.addEventListener("click", function () {
        const entryCount =
          entriesContainer.querySelectorAll(".entry-fields").length;
        addEducationEntry(entriesContainer, entryCount);

        // Update template
        updateEducationSection(entriesContainer);
      });

      entriesContainer.appendChild(addMoreButton);

      // Initial update
      updateEducationSection(entriesContainer);
    } else if (sectionType === "Skills") {
      // Multiple entries for skills
      addSkillEntry(entriesContainer, 0, {
        category: "Adobe",
        skills: "Adobe Photoshop, Adobe Illustrator",
      });

      addSkillEntry(entriesContainer, 1, {
        category: "Office",
        skills: "Microsoft Word, PowerPoint",
      });

      addSkillEntry(entriesContainer, 2, {
        category: "Web",
        skills: "HTML/CSS",
      });

      addSkillEntry(entriesContainer, 3, {
        category: "Programming language",
        skills: "C, C++, Java, HTML, CSS, Python, PHP, Javascript",
      });

      // Add "Add More" button
      const addMoreButton = document.createElement("button");
      addMoreButton.type = "button";
      addMoreButton.className = "add-more-btn";
      addMoreButton.innerHTML =
        '<i class="fa-solid fa-plus"></i> Add More Skills';

      addMoreButton.addEventListener("click", function () {
        const entryCount =
          entriesContainer.querySelectorAll(".entry-fields").length;
        addSkillEntry(entriesContainer, entryCount);

        // Update template
        updateSkillsSection(entriesContainer);
      });

      entriesContainer.appendChild(addMoreButton);

      // Initial update
      updateSkillsSection(entriesContainer);
    } else if (sectionType === "Languages") {
      // Multiple entries for languages
      addLanguageEntry(entriesContainer, 0, {
        language: "English",
        proficiency: "Fluent",
      });

      addLanguageEntry(entriesContainer, 1, {
        language: "Bangla",
        proficiency: "Native",
      });

      // Add "Add More" button
      const addMoreButton = document.createElement("button");
      addMoreButton.type = "button";
      addMoreButton.className = "add-more-btn";
      addMoreButton.innerHTML =
        '<i class="fa-solid fa-plus"></i> Add More Languages';

      addMoreButton.addEventListener("click", function () {
        const entryCount =
          entriesContainer.querySelectorAll(".entry-fields").length;
        addLanguageEntry(entriesContainer, entryCount);

        // Update template
        updateLanguagesSection(entriesContainer);
      });

      entriesContainer.appendChild(addMoreButton);

      // Initial update
      updateLanguagesSection(entriesContainer);
    } else if (sectionType === "Hobbies") {
      // Single textarea for hobbies
      const textarea = document.createElement("textarea");
      textarea.className = "form-input";
      textarea.placeholder = "Enter your hobbies";
      textarea.rows = 4;
      textarea.value =
        "Teaching, Reading Books and Gardening, Playing Football & Cricket";

      textarea.addEventListener("input", function () {
        updateSectionInTemplate(sectionType, this.value);
      });

      entriesContainer.appendChild(textarea);

      // Initial update
      updateSectionInTemplate(sectionType, textarea.value);
    } else if (sectionType === "Personal Quality") {
      // Single textarea for personal qualities
      const textarea = document.createElement("textarea");
      textarea.className = "form-input";
      textarea.placeholder = "Enter your personal qualities";
      textarea.rows = 4;
      textarea.value =
        "Good team player, believe in self-dignity, well communication skill, Enthusiastic, Sincere and Eager to learn.";

      textarea.addEventListener("input", function () {
        updateSectionInTemplate(sectionType, this.value);
      });

      entriesContainer.appendChild(textarea);

      // Initial update
      updateSectionInTemplate(sectionType, textarea.value);
    }

    // Store the source button ID
    sectionForm.dataset.sourceButton = buttonElement.id;

    // Create delete button for the entire section
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-section-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    deleteBtn.addEventListener("click", function () {
      if (buttonElement) {
        buttonElement.style.display = "inline-flex";
      }
      sectionForm.remove();

      // Remove the section from the template
      removeSectionFromTemplate(sectionType);
    });

    // Assemble the form
    formGroup.appendChild(label);
    formGroup.appendChild(entriesContainer);
    sectionForm.appendChild(formGroup);
    sectionForm.appendChild(deleteBtn);

    // Insert the form
    const personalInfoSection = Array.from(
      document.querySelectorAll(".section-label")
    ).find((el) => el.textContent.includes("Personal information"));

    if (personalInfoSection) {
      personalInfoSection.parentNode.insertBefore(
        sectionForm,
        personalInfoSection
      );
    }

    // Hide the button
    buttonElement.style.display = "none";
  }

  // Function to add experience entry
  function addExperienceEntry(container, index, defaultValues = {}) {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-fields";
    entryDiv.dataset.entryIndex = index;

    // Create fields container
    const fieldsContainer = document.createElement("div");
    fieldsContainer.className = "fields-container";

    // Job Title
    const titleField = document.createElement("div");
    titleField.className = "entry-field entry-title-field";

    const titleLabel = document.createElement("div");
    titleLabel.className = "entry-title-label";
    titleLabel.textContent = "Job Title";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.className = "form-input";
    titleInput.placeholder = "Job Title";
    titleInput.value = defaultValues.title || "";

    titleField.appendChild(titleLabel);
    titleField.appendChild(titleInput);

    // Duration
    const durationField = document.createElement("div");
    durationField.className = "entry-field";

    const durationInput = document.createElement("input");
    durationInput.type = "text";
    durationInput.className = "form-input";
    durationInput.placeholder = "Duration (e.g., 2020 – present)";
    durationInput.value = defaultValues.duration || "";

    durationField.appendChild(durationInput);

    // Company/Location
    const companyField = document.createElement("div");
    companyField.className = "entry-field";

    const companyInput = document.createElement("input");
    companyInput.type = "text";
    companyInput.className = "form-input";
    companyInput.placeholder = "Company / Location";
    companyInput.value = defaultValues.company || "";

    companyField.appendChild(companyInput);

    // Description
    const descField = document.createElement("div");
    descField.className = "entry-field";

    const descInput = document.createElement("textarea");
    descInput.className = "form-input";
    descInput.placeholder = "Job Description";
    descInput.rows = 3;
    descInput.value = defaultValues.description || "";

    descField.appendChild(descInput);

    // Add all fields to container
    fieldsContainer.appendChild(titleField);
    fieldsContainer.appendChild(durationField);
    fieldsContainer.appendChild(companyField);
    fieldsContainer.appendChild(descField);

    entryDiv.appendChild(fieldsContainer);

    // Add delete button (not for first entry)
    if (index > 0) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-entry-btn";
      deleteBtn.innerHTML = '<i class="fa-solid fa-times"></i>';

      deleteBtn.addEventListener("click", function () {
        entryDiv.remove();

        // Re-index remaining entries
        const allEntries = container.querySelectorAll(".entry-fields");
        allEntries.forEach((entry, idx) => {
          entry.dataset.entryIndex = idx;
        });

        // Update the template
        updateExperienceSection(container);
      });

      entryDiv.appendChild(deleteBtn);
    }

    // Add input event listeners to all fields
    const allInputs = entryDiv.querySelectorAll("input, textarea");
    allInputs.forEach((input) => {
      input.addEventListener("input", function () {
        updateExperienceSection(container);
      });
    });

    // Add to parent container
    const addMoreBtn = container.querySelector(".add-more-btn");
    if (addMoreBtn) {
      container.insertBefore(entryDiv, addMoreBtn);
    } else {
      container.appendChild(entryDiv);
    }

    return entryDiv;
  }

  // Function to add education entry
  function addEducationEntry(container, index, defaultValues = {}) {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-fields";
    entryDiv.dataset.entryIndex = index;

    // Create fields container
    const fieldsContainer = document.createElement("div");
    fieldsContainer.className = "fields-container";

    // Degree
    const degreeField = document.createElement("div");
    degreeField.className = "entry-field entry-title-field";

    const degreeLabel = document.createElement("div");
    degreeLabel.className = "entry-title-label";
    degreeLabel.textContent = "Degree/Certificate";

    const degreeInput = document.createElement("input");
    degreeInput.type = "text";
    degreeInput.className = "form-input";
    degreeInput.placeholder = "Degree/Certificate";
    degreeInput.value = defaultValues.degree || "";

    degreeField.appendChild(degreeLabel);
    degreeField.appendChild(degreeInput);

    // Duration
    const durationField = document.createElement("div");
    durationField.className = "entry-field";

    const durationInput = document.createElement("input");
    durationInput.type = "text";
    durationInput.className = "form-input";
    durationInput.placeholder = "Duration";
    durationInput.value = defaultValues.duration || "";

    durationField.appendChild(durationInput);

    // Institution
    const institutionField = document.createElement("div");
    institutionField.className = "entry-field";

    const institutionInput = document.createElement("input");
    institutionInput.type = "text";
    institutionInput.className = "form-input";
    institutionInput.placeholder = "Institution";
    institutionInput.value = defaultValues.institution || "";

    institutionField.appendChild(institutionInput);

    // Add all fields to container
    fieldsContainer.appendChild(degreeField);
    fieldsContainer.appendChild(durationField);
    fieldsContainer.appendChild(institutionField);

    entryDiv.appendChild(fieldsContainer);

    // Add delete button (not for first entry)
    if (index > 0) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-entry-btn";
      deleteBtn.innerHTML = '<i class="fa-solid fa-times"></i>';

      deleteBtn.addEventListener("click", function () {
        entryDiv.remove();

        // Re-index remaining entries
        const allEntries = container.querySelectorAll(".entry-fields");
        allEntries.forEach((entry, idx) => {
          entry.dataset.entryIndex = idx;
        });

        // Update the template
        updateEducationSection(container);
      });

      entryDiv.appendChild(deleteBtn);
    }

    // Add input event listeners to all fields
    const allInputs = entryDiv.querySelectorAll("input, textarea");
    allInputs.forEach((input) => {
      input.addEventListener("input", function () {
        updateEducationSection(container);
      });
    });

    // Add to parent container
    const addMoreBtn = container.querySelector(".add-more-btn");
    if (addMoreBtn) {
      container.insertBefore(entryDiv, addMoreBtn);
    } else {
      container.appendChild(entryDiv);
    }

    return entryDiv;
  }

  // Function to add skill entry
  function addSkillEntry(container, index, defaultValues = {}) {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-fields";
    entryDiv.dataset.entryIndex = index;

    // Create fields container
    const fieldsContainer = document.createElement("div");
    fieldsContainer.className = "fields-container";

    // Skill Category
    const categoryField = document.createElement("div");
    categoryField.className = "entry-field entry-title-field";

    const categoryLabel = document.createElement("div");
    categoryLabel.className = "entry-title-label";
    categoryLabel.textContent = "Skill Category";

    const categoryInput = document.createElement("input");
    categoryInput.type = "text";
    categoryInput.className = "form-input";
    categoryInput.placeholder = "Skill Category (e.g., Programming Languages)";
    categoryInput.value = defaultValues.category || "";

    categoryField.appendChild(categoryLabel);
    categoryField.appendChild(categoryInput);

    // Skills
    const skillsField = document.createElement("div");
    skillsField.className = "entry-field";

    const skillsInput = document.createElement("input");
    skillsInput.type = "text";
    skillsInput.className = "form-input";
    skillsInput.placeholder = "Skills (comma separated)";
    skillsInput.value = defaultValues.skills || "";

    skillsField.appendChild(skillsInput);

    // Add all fields to container
    fieldsContainer.appendChild(categoryField);
    fieldsContainer.appendChild(skillsField);

    entryDiv.appendChild(fieldsContainer);

    // Add delete button (not for first entry)
    if (index > 0) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-entry-btn";
      deleteBtn.innerHTML = '<i class="fa-solid fa-times"></i>';

      deleteBtn.addEventListener("click", function () {
        entryDiv.remove();

        // Re-index remaining entries
        const allEntries = container.querySelectorAll(".entry-fields");
        allEntries.forEach((entry, idx) => {
          entry.dataset.entryIndex = idx;
        });

        // Update the template
        updateSkillsSection(container);
      });

      entryDiv.appendChild(deleteBtn);
    }

    // Add input event listeners to all fields
    const allInputs = entryDiv.querySelectorAll("input, textarea");
    allInputs.forEach((input) => {
      input.addEventListener("input", function () {
        updateSkillsSection(container);
      });
    });

    // Add to parent container
    const addMoreBtn = container.querySelector(".add-more-btn");
    if (addMoreBtn) {
      container.insertBefore(entryDiv, addMoreBtn);
    } else {
      container.appendChild(entryDiv);
    }

    return entryDiv;
  }

  // Function to add language entry
  function addLanguageEntry(container, index, defaultValues = {}) {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-fields";
    entryDiv.dataset.entryIndex = index;

    // Create fields container
    const fieldsContainer = document.createElement("div");
    fieldsContainer.className = "fields-container";

    // Language
    const languageField = document.createElement("div");
    languageField.className = "entry-field entry-title-field";

    const languageLabel = document.createElement("div");
    languageLabel.className = "entry-title-label";
    languageLabel.textContent = "Language";

    const languageInput = document.createElement("input");
    languageInput.type = "text";
    languageInput.className = "form-input";
    languageInput.placeholder = "Language";
    languageInput.value = defaultValues.language || "";

    languageField.appendChild(languageLabel);
    languageField.appendChild(languageInput);

    // Proficiency
    const proficiencyField = document.createElement("div");
    proficiencyField.className = "entry-field";

    const proficiencyInput = document.createElement("input");
    proficiencyInput.type = "text";
    proficiencyInput.className = "form-input";
    proficiencyInput.placeholder = "Proficiency Level";
    proficiencyInput.value = defaultValues.proficiency || "";

    proficiencyField.appendChild(proficiencyInput);

    // Add all fields to container
    fieldsContainer.appendChild(languageField);
    fieldsContainer.appendChild(proficiencyField);

    entryDiv.appendChild(fieldsContainer);

    // Add delete button (not for first entry)
    if (index > 0) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-entry-btn";
      deleteBtn.innerHTML = '<i class="fa-solid fa-times"></i>';

      deleteBtn.addEventListener("click", function () {
        entryDiv.remove();

        // Re-index remaining entries
        const allEntries = container.querySelectorAll(".entry-fields");
        allEntries.forEach((entry, idx) => {
          entry.dataset.entryIndex = idx;
        });

        // Update the template
        updateLanguagesSection(container);
      });

      entryDiv.appendChild(deleteBtn);
    }

    // Add input event listeners to all fields
    const allInputs = entryDiv.querySelectorAll("input, textarea");
    allInputs.forEach((input) => {
      input.addEventListener("input", function () {
        updateLanguagesSection(container);
      });
    });

    // Add to parent container
    const addMoreBtn = container.querySelector(".add-more-btn");
    if (addMoreBtn) {
      container.insertBefore(entryDiv, addMoreBtn);
    } else {
      container.appendChild(entryDiv);
    }

    return entryDiv;
  }

  // Function to remove a section from the template
  function removeSectionFromTemplate(sectionType) {
    let section;

    switch (sectionType) {
      case "Objective":
        section = document.querySelector(".about");
        break;
      case "Professional Experience":
        section = document.querySelector(".experience");
        break;
      case "Education":
        // For education in the left column
        section = document.querySelector(".education");
        break;
      case "Skills":
        section = document.querySelector(".skills");
        break;
      case "Hobbies":
        section = document.querySelector(
          ".template-section-title:has(i.fa-heart)"
        );
        if (section) {
          // Also remove the paragraph after it
          const para = section.nextElementSibling;
          if (para && para.tagName === "P") {
            para.remove();
          }
        }
        break;
      case "Personal Quality":
        section = document.querySelector(
          ".left-content .template-section-title:has(i.fa-star)"
        );
        if (section) {
          // Also remove the paragraph after it
          const para = section.nextElementSibling;
          if (para && para.tagName === "P") {
            para.remove();
          }
        }
        break;
      case "Languages":
        // This might be added dynamically, so search for it
        section = document.querySelector(
          ".template-section-title:has(i.fa-language)"
        );
        if (section) {
          // Also remove the list after it
          const list = section.nextElementSibling;
          if (list && list.tagName === "UL") {
            list.remove();
          }
        }
        break;
    }

    if (section) {
      section.remove();
    }
  }

  // Function to update experience section in template
  function updateExperienceSection(container) {
    const entries = container.querySelectorAll(".entry-fields");
    const experienceData = [];

    entries.forEach((entry) => {
      const inputs = entry.querySelectorAll("input, textarea");
      const entryData = {};

      // Map inputs to data object
      inputs.forEach((input, index) => {
        switch (index) {
          case 0:
            entryData.title = input.value;
            break;
          case 1:
            entryData.duration = input.value;
            break;
          case 2:
            entryData.company = input.value;
            break;
          case 3:
            entryData.description = input.value;
            break;
        }
      });

      if (
        entryData.title ||
        entryData.duration ||
        entryData.company ||
        entryData.description
      ) {
        experienceData.push(entryData);
      }
    });

    // Update the template
    updateExperienceSectionInTemplate(experienceData);
  }

  // Function to update education section in template
  function updateEducationSection(container) {
    const entries = container.querySelectorAll(".entry-fields");
    const educationData = [];

    entries.forEach((entry) => {
      const inputs = entry.querySelectorAll("input");
      const entryData = {};

      // Map inputs to data object
      inputs.forEach((input, index) => {
        switch (index) {
          case 0:
            entryData.degree = input.value;
            break;
          case 1:
            entryData.duration = input.value;
            break;
          case 2:
            entryData.institution = input.value;
            break;
        }
      });

      if (entryData.degree || entryData.duration || entryData.institution) {
        educationData.push(entryData);
      }
    });

    // Update the template
    updateEducationSectionInTemplate(educationData);
  }

  // Function to update skills section in template
  function updateSkillsSection(container) {
    const entries = container.querySelectorAll(".entry-fields");
    const skillsData = [];

    entries.forEach((entry) => {
      const inputs = entry.querySelectorAll("input");
      const entryData = {};

      // Map inputs to data object
      inputs.forEach((input, index) => {
        switch (index) {
          case 0:
            entryData.category = input.value;
            break;
          case 1:
            entryData.skills = input.value;
            break;
        }
      });

      if (entryData.category || entryData.skills) {
        skillsData.push(entryData);
      }
    });

    // Update the template
    updateSkillsSectionInTemplate(skillsData);
  }

  // Function to update languages section in template
  function updateLanguagesSection(container) {
    const entries = container.querySelectorAll(".entry-fields");
    const languagesData = [];

    entries.forEach((entry) => {
      const inputs = entry.querySelectorAll("input");
      const entryData = {};

      // Map inputs to data object
      inputs.forEach((input, index) => {
        switch (index) {
          case 0:
            entryData.language = input.value;
            break;
          case 1:
            entryData.proficiency = input.value;
            break;
        }
      });

      if (entryData.language || entryData.proficiency) {
        languagesData.push(entryData);
      }
    });

    // Update the template
    updateLanguagesSectionInTemplate(languagesData);
  }

  // Helper function to update experience section in template
  function updateExperienceSectionInTemplate(experienceData) {
    // Look for experience section or create it
    let experienceSection = document.querySelector(".experience");

    if (!experienceSection) {
      // Create new experience section
      experienceSection = document.createElement("section");
      experienceSection.className = "experience";

      // Create section title
      const title = document.createElement("h2");
      title.innerHTML =
        '<i class="fas fa-briefcase"></i> PROFESSIONAL EXPERIENCE';
      experienceSection.appendChild(title);

      // Find right content to add it to
      const rightContent = document.querySelector(".right-content");
      if (rightContent) {
        // Find a good place to insert it (after about section if it exists)
        const aboutSection = rightContent.querySelector(".about");
        if (aboutSection) {
          // Check for divider after about
          const divider = aboutSection.nextElementSibling;
          if (divider && divider.className === "divider") {
            rightContent.insertBefore(
              experienceSection,
              divider.nextElementSibling
            );
          } else {
            // Insert after about
            aboutSection.after(experienceSection);

            // Add a divider
            const newDivider = document.createElement("div");
            newDivider.className = "divider";
            aboutSection.after(newDivider);
          }
        } else {
          // Just append to right content
          rightContent.appendChild(experienceSection);
        }
      }
    } else {
      // Clear existing content except title
      const title = experienceSection.querySelector("h2");
      experienceSection.innerHTML = "";
      if (title) {
        experienceSection.appendChild(title);
      } else {
        // Recreate title if not found
        const newTitle = document.createElement("h2");
        newTitle.innerHTML =
          '<i class="fas fa-briefcase"></i> PROFESSIONAL EXPERIENCE';
        experienceSection.appendChild(newTitle);
      }
    }

    // Add experience entries
    experienceData.forEach((entry) => {
      // Job title with duration
      const titleElement = document.createElement("h3");
      titleElement.className = "template-experience-title";
      titleElement.innerHTML = `${entry.title} <span>${entry.duration}</span>`;
      experienceSection.appendChild(titleElement);

      // Company/Location
      const companyElement = document.createElement("p");
      companyElement.textContent = entry.company;
      experienceSection.appendChild(companyElement);

      // Description
      const descElement = document.createElement("p");
      descElement.textContent = entry.description;
      experienceSection.appendChild(descElement);
    });
  }

  // Helper function to update education section in template
  function updateEducationSectionInTemplate(educationData) {
    // Look for education section or create it
    let educationSection = document.querySelector(".education");

    if (!educationSection) {
      // Create new education section
      educationSection = document.createElement("section");
      educationSection.className = "education";

      // Create section title
      const title = document.createElement("h2");
      title.innerHTML = '<i class="fas fa-graduation-cap"></i> EDUCATION';
      educationSection.appendChild(title);

      // Find left content to add it to
      const leftContent = document.querySelector(".left-content");
      if (leftContent) {
        // Find a good place to insert it
        const contactSection = leftContent.querySelector(".contact");
        if (contactSection) {
          // Look for divider after contact
          const dividers = leftContent.querySelectorAll(".divider");
          let inserted = false;

          for (let i = 0; i < dividers.length; i++) {
            if (dividers[i].previousElementSibling === contactSection) {
              leftContent.insertBefore(
                educationSection,
                dividers[i].nextElementSibling
              );
              inserted = true;
              break;
            }
          }

          if (!inserted) {
            // Just append to left content
            leftContent.appendChild(educationSection);
          }
        } else {
          // Just append to left content
          leftContent.appendChild(educationSection);
        }
      }
    } else {
      // Clear existing content except title
      const title = educationSection.querySelector("h2");
      educationSection.innerHTML = "";
      if (title) {
        educationSection.appendChild(title);
      } else {
        // Recreate title if not found
        const newTitle = document.createElement("h2");
        newTitle.innerHTML = '<i class="fas fa-graduation-cap"></i> EDUCATION';
        educationSection.appendChild(newTitle);
      }
    }

    // Add education entries
    educationData.forEach((entry) => {
      // Institution
      const institutionElement = document.createElement("h3");
      institutionElement.textContent = entry.institution;
      educationSection.appendChild(institutionElement);

      // Degree and duration
      const degreeElement = document.createElement("p");
      degreeElement.textContent = `${entry.degree} (${entry.duration})`;
      educationSection.appendChild(degreeElement);
    });
  }

  // Helper function to update skills section in template
  function updateSkillsSectionInTemplate(skillsData) {
    // Check if we have skills data with "Programming language" category
    const programmingSkills = skillsData.find(
      (skill) => skill.category.toLowerCase() === "programming language"
    );

    // Handle programming skills separately (goes in left column)
    if (programmingSkills) {
      // Find or create the programming language category in left column
      let progLangCategory = document.querySelector(".template-skill-category");
      let progLangParagraph = progLangCategory
        ? progLangCategory.nextElementSibling
        : null;

      if (!progLangCategory) {
        // Create category
        progLangCategory = document.createElement("div");
        progLangCategory.className = "template-skill-category";
        progLangCategory.textContent = "Programming language";

        // Create paragraph for skills
        progLangParagraph = document.createElement("p");

        // Find left content to add it to
        const leftContent = document.querySelector(".left-content");
        if (leftContent) {
          // Add after education section if exists
          const educationSection = leftContent.querySelector(".education");
          if (educationSection) {
            educationSection.after(progLangCategory);
            progLangCategory.after(progLangParagraph);
          } else {
            // Just append to left content
            leftContent.appendChild(progLangCategory);
            leftContent.appendChild(progLangParagraph);
          }
        }
      }

      // Update programming language skills
      if (progLangParagraph) {
        progLangParagraph.textContent = programmingSkills.skills;
      }

      // Remove programming language from skills data for right column processing
      skillsData = skillsData.filter(
        (skill) => skill.category.toLowerCase() !== "programming language"
      );
    }

    // Process other skills for right column
    if (skillsData.length > 0) {
      // Look for skills section or create it
      let skillsSection = document.querySelector(".skills");

      if (!skillsSection) {
        // Create new skills section
        skillsSection = document.createElement("section");
        skillsSection.className = "skills";

        // Create section title
        const title = document.createElement("h2");
        title.innerHTML = '<i class="fas fa-cogs"></i> SKILLS';
        skillsSection.appendChild(title);

        // Create skills list
        const skillsList = document.createElement("ul");
        skillsSection.appendChild(skillsList);

        // Find right content to add it to
        const rightContent = document.querySelector(".right-content");
        if (rightContent) {
          // Find a good place to insert it (after experience section if it exists)
          const experienceSection = rightContent.querySelector(".experience");
          if (experienceSection) {
            // Check for divider after experience
            const dividers = rightContent.querySelectorAll(".divider");
            let inserted = false;

            for (let i = 0; i < dividers.length; i++) {
              if (dividers[i].previousElementSibling === experienceSection) {
                rightContent.insertBefore(
                  skillsSection,
                  dividers[i].nextElementSibling
                );
                inserted = true;
                break;
              }
            }

            if (!inserted) {
              // Add divider and insert skills section
              const newDivider = document.createElement("div");
              newDivider.className = "divider";
              experienceSection.after(newDivider);
              newDivider.after(skillsSection);
            }
          } else {
            // Just append to right content
            rightContent.appendChild(skillsSection);
          }
        }
      } else {
        // Clear existing skills list
        const skillsList = skillsSection.querySelector("ul");

        if (skillsList) {
          skillsList.innerHTML = "";
        } else {
          // Create skills list if it doesn't exist
          const newList = document.createElement("ul");

          // Preserve title if it exists
          const title = skillsSection.querySelector("h2");
          if (title) {
            skillsSection.innerHTML = "";
            skillsSection.appendChild(title);
            skillsSection.appendChild(newList);
          } else {
            skillsSection.innerHTML = "";

            // Recreate title
            const newTitle = document.createElement("h2");
            newTitle.innerHTML = '<i class="fas fa-cogs"></i> SKILLS';
            skillsSection.appendChild(newTitle);
            skillsSection.appendChild(newList);
          }
        }
      }

      // Get the skills list
      const skillsList = skillsSection.querySelector("ul");

      // Add skill items
      skillsData.forEach((skill) => {
        // Create list items for each skill in the skills list
        const skills = skill.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s);

        skills.forEach((skillItem) => {
          const li = document.createElement("li");
          li.innerHTML = '<i class="fas fa-check"></i> ' + skillItem;
          skillsList.appendChild(li);
        });
      });
    }
  }

  // Helper function to update languages section in template
  function updateLanguagesSectionInTemplate(languagesData) {
    if (languagesData.length === 0) return;

    // Look for languages section or create it
    let section = document.querySelector(
      ".template-section-title:has(i.fa-language)"
    );
    let languagesList;

    if (!section) {
      // Create new languages section
      const rightContent = document.querySelector(".right-content");
      if (!rightContent) return;

      // Create section title
      section = document.createElement("h2");
      section.className = "template-section-title";
      section.innerHTML = '<i class="fa-solid fa-language"></i> LANGUAGES';

      // Create languages list
      languagesList = document.createElement("ul");
      languagesList.className = "template-languages-list";

      // Find a good place to insert
      const skillsSection = rightContent.querySelector(".skills");
      const hobbiesSection = rightContent.querySelector(
        ".template-section-title:has(i.fa-heart)"
      );

      if (skillsSection) {
        // Add after skills section
        const divider = document.createElement("div");
        divider.className = "divider";
        skillsSection.after(divider);
        divider.after(section);
        section.after(languagesList);
      } else if (hobbiesSection) {
        // Add before hobbies
        rightContent.insertBefore(section, hobbiesSection);
        rightContent.insertBefore(languagesList, hobbiesSection);
      } else {
        // Add to the end
        rightContent.appendChild(section);
        rightContent.appendChild(languagesList);
      }
    } else {
      // Get or create languages list
      languagesList = section.nextElementSibling;

      if (
        !languagesList ||
        !languagesList.classList.contains("template-languages-list")
      ) {
        languagesList = document.createElement("ul");
        languagesList.className = "template-languages-list";
        section.after(languagesList);
      } else {
        // Clear existing list
        languagesList.innerHTML = "";
      }
    }

    // Add language items
    languagesData.forEach((lang) => {
      if (lang.language) {
        const li = document.createElement("li");
        li.className = "template-language-item";
        li.innerHTML = `<strong>${lang.language}:</strong> ${lang.proficiency}`;
        languagesList.appendChild(li);
      }
    });
  }

  // Handle Personal Information and Links buttons
  allAddButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Get button text without the + sign
      const buttonTextWithPlus = this.textContent.trim();
      const buttonText = buttonTextWithPlus.substring(
        buttonTextWithPlus.indexOf(" ") + 1
      );

      // Handle section buttons with createSectionForm
      if (
        [
          "Objective",
          "Professional Experience",
          "Education",
          "Skills",
          "Languages",
          "Hobbies",
          "Personal Quality",
        ].includes(buttonText)
      ) {
        createSectionForm(buttonText, this);
        return;
      }

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

      // Hide the button
      this.style.display = "none";
    });
  });

  // Setup multiple fields handler integration
  const originalUpdateSection = window.updateSection;
  const originalUpdateExperienceSection = window.updateExperienceSection;
  const originalUpdateEducationSection = window.updateEducationSection;
  const originalUpdateSkillsSection = window.updateSkillsSection;
  const originalUpdateLanguagesSection = window.updateLanguagesSection;

  // Create and handle section forms with multiple entries
  function updateSectionInTemplate(sectionType, content) {
    let sectionTitle, sectionIcon, selector;

    switch (sectionType) {
      case "Objective":
        sectionTitle = "OBJECTIVE";
        sectionIcon = "user";
        selector = ".about h2";
        break;
      case "Hobbies":
        sectionTitle = "HOBBIES";
        sectionIcon = "heart";
        selector = ".template-section-title:has(i.fa-heart)";
        break;
      case "Personal Quality":
        sectionTitle = "PERSONAL QUALITY";
        sectionIcon = "star";
        selector = ".template-section-title:has(i.fa-star)";
        break;
    }

    // Find section in template
    let section = document.querySelector(selector);

    if (!section) {
      // Create new section if it doesn't exist
      if (sectionType === "Objective") {
        // For Objective, find the about section
        const rightContent = document.querySelector(".right-content");
        if (!rightContent) return;

        const aboutSection = document.createElement("section");
        aboutSection.className = "about";

        section = document.createElement("h2");
        section.innerHTML = `<i class="fas fa-${sectionIcon}"></i>${sectionTitle}`;

        aboutSection.appendChild(section);

        // Find name section to insert after it
        const nameSection = rightContent.querySelector(".name");
        const divider = nameSection ? nameSection.nextElementSibling : null;

        if (divider) {
          rightContent.insertBefore(aboutSection, divider.nextElementSibling);
        } else {
          rightContent.appendChild(aboutSection);
        }
      } else {
        // For other sections
        let container;
        if (sectionType === "Personal Quality") {
          container = document.querySelector(".left-content");
        } else {
          container = document.querySelector(".right-content");
        }

        if (!container) return;

        section = document.createElement("h2");
        section.className = "template-section-title";
        section.innerHTML = `<i class="fa-solid fa-${sectionIcon}"></i> ${sectionTitle}`;

        container.appendChild(section);
      }
    }

    // Update or create paragraph
    let paragraph;

    if (sectionType === "Objective") {
      // For Objective, paragraph should be inside about section
      const aboutSection = section.closest(".about");
      paragraph = aboutSection.querySelector("p");

      if (!paragraph) {
        paragraph = document.createElement("p");
        aboutSection.appendChild(paragraph);
      }
    } else {
      // For other sections
      paragraph = section.nextElementSibling;

      if (!paragraph || paragraph.tagName !== "P") {
        paragraph = document.createElement("p");
        section.after(paragraph);
      }
    }

    paragraph.textContent = content;
  }

  // PDF Download Functionality
  const downloadBtn = document.querySelector(".download-btn");
  if (downloadBtn) {
    // Remove any existing event listeners
    const newDownloadBtn = downloadBtn.cloneNode(true);
    downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);

    // Add new click event listener
    newDownloadBtn.addEventListener("click", function () {
      // Show loading indicator
      const loadingIndicator = document.createElement("span");
      loadingIndicator.textContent = " Generating PDF...";
      loadingIndicator.className = "download-loading";
      this.appendChild(loadingIndicator);

      // Get the template element to capture
      const templateElement = document.querySelector(".template-container");

      // Center profile if exists
      const profileImage = templateElement.querySelector(".profile-img img");
      const profileContainer = profileImage ? profileImage.parentElement : null;

      let originalTextAlign = "";
      if (profileContainer) {
        originalTextAlign = profileContainer.style.textAlign;
        profileContainer.style.textAlign = "center";
      }

      // Get template name for the PDF file name
      const fullName =
        templateElement.querySelector("h1")?.textContent.trim() || "Resume";
      const fileName = `${fullName}_${new Date()
        .toLocaleDateString()
        .replace(/\//g, "-")}.pdf`;

      // Simple PDF generation options - no modifications to content
      const options = {
        margin: 10, // Small margin around the content
        filename: fileName,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: "px",
          format: [
            templateElement.offsetWidth + 20,
            templateElement.scrollHeight + 20,
          ],
          orientation: "portrait",
        },
      };

      // Generate the PDF by directly capturing the template
      html2pdf()
        .set(options)
        .from(templateElement)
        .save()
        .then(() => {
          // Remove loading indicator
          const loadingIndicator = document.querySelector(".download-loading");
          if (loadingIndicator) {
            loadingIndicator.remove();
          }

          // Restore profile container alignment if changed
          if (profileContainer && originalTextAlign !== "") {
            profileContainer.style.textAlign = originalTextAlign;
          }
        })
        .catch((error) => {
          console.error("PDF generation error:", error);

          // Remove loading indicator even on error
          const loadingIndicator = document.querySelector(".download-loading");
          if (loadingIndicator) {
            loadingIndicator.remove();
          }

          // Restore profile container alignment if changed
          if (profileContainer && originalTextAlign !== "") {
            profileContainer.style.textAlign = originalTextAlign;
          }

          // Show error message
          alert(
            "Sorry, there was an error generating your PDF. Please try again."
          );
        });
    });
  }

  // Setup Save Button functionality
  const saveBtn = document.querySelector(".save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Clear the form section but keep the template view
      const editSection = document.querySelector(".edit-section");
      if (editSection) {
        // Clone save button to keep the event listener
        const newSaveBtn = saveBtn.cloneNode(true);

        // Empty the form but keep structure
        const sectionHeader = editSection.querySelector(".section-header");
        const newForm = document.createElement("form");

        // Restore the section header and create an empty form
        editSection.innerHTML = "";
        editSection.appendChild(sectionHeader);
        editSection.appendChild(newForm);

        // Add back the save button at the end
        const buttonRow = document.createElement("div");
        buttonRow.className = "button-row";

        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancel-btn";
        cancelBtn.innerHTML = "<strong>Cancel</strong>";

        buttonRow.appendChild(cancelBtn);
        buttonRow.appendChild(newSaveBtn);
        newForm.appendChild(buttonRow);

        // Show success message
        const successMsg = document.createElement("div");
        successMsg.style.color = "#4CAF50";
        successMsg.style.marginTop = "15px";
        successMsg.style.fontWeight = "bold";
        successMsg.style.textAlign = "center";
        successMsg.textContent = "Your changes have been saved!";

        newForm.appendChild(successMsg);

        // Remove the message after 3 seconds
        setTimeout(() => {
          successMsg.style.display = "none";
        }, 3000);
      }
    });
  }

  // Override the window.updateSection function if it exists
  if (typeof window.updateSection === "function") {
    window.updateSection = function (sectionType, content) {
      if (originalUpdateSection) {
        originalUpdateSection(sectionType, content);
      }
      updateSectionInTemplate(sectionType, content);
    };
  } else {
    window.updateSection = updateSectionInTemplate;
  }
});
