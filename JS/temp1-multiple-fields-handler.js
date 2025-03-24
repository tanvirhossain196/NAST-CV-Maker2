document.addEventListener("DOMContentLoaded", function () {
  // Function to create section forms with multiple entries
  function setupMultiFieldSections() {
    const sectionTypes = [
      "Objective",
      "Professional Experience",
      "Education",
      "Skills",
      "Languages",
      "Hobbies",
      "Personal Quality",
    ];

    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach((button) => {
      const buttonTextWithPlus = button.textContent.trim();
      const buttonText = buttonTextWithPlus.substring(
        buttonTextWithPlus.indexOf(" ") + 1
      );

      if (sectionTypes.includes(buttonText)) {
        // Directly remove the initial input field for this section type
        removeInitialInputField(buttonText);

        // Modify button click behavior to only create the detailed form
        button.addEventListener("click", function () {
          createSectionForm(buttonText, this);
        });
      }
    });
  }

  // Function to completely remove the initial input fields
  function removeInitialInputField(sectionType) {
    // Look for all instances of the section type heading/label
    document
      .querySelectorAll("h1, h2, h3, h4, h5, h6, label, div")
      .forEach((element) => {
        if (element.textContent && element.textContent.trim() === sectionType) {
          // First, try to find a parent container that might contain both the heading and input
          let parent = element.parentElement;
          if (parent) {
            // Look for input fields within this container or its immediate siblings
            const inputField = parent.querySelector(
              'input[placeholder^="Enter ' + sectionType.toLowerCase() + '"]'
            );
            if (inputField) {
              // Find the closest wrapping container of the input field
              let inputContainer = inputField;
              while (
                inputContainer &&
                (!inputContainer.classList ||
                  !inputContainer.classList.contains("form-group"))
              ) {
                inputContainer = inputContainer.parentElement;
              }

              // Remove the input container if found
              if (inputContainer) {
                inputContainer.remove();
                return; // Exit after removing
              }
            }
          }

          // If we didn't find and remove via parent search, try siblings
          let currentNode = element;
          while (currentNode && currentNode.nextElementSibling) {
            currentNode = currentNode.nextElementSibling;
            const input = currentNode.querySelector(
              'input[placeholder^="Enter"]'
            );
            if (input) {
              // Check if this input relates to our section type
              if (
                input.placeholder
                  .toLowerCase()
                  .includes(sectionType.toLowerCase()) ||
                input.placeholder
                  .toLowerCase()
                  .includes("enter " + sectionType.toLowerCase())
              ) {
                currentNode.remove();
                return; // Exit after removing
              }
            }
          }
        }
      });

    // Additional specific targeting for common input field patterns
    document
      .querySelectorAll('input[placeholder^="Enter"]')
      .forEach((input) => {
        if (
          input.placeholder.toLowerCase().includes(sectionType.toLowerCase())
        ) {
          // Find the containing form group
          let container = input;
          while (
            container &&
            (!container.classList ||
              !container.classList.contains("form-group"))
          ) {
            container = container.parentElement;
          }

          if (container) {
            container.remove();
          }
        }
      });
  }

  // Create section form with ability to add multiple fields
  function createSectionForm(sectionType, buttonElement) {
    const sectionForm = document.createElement("div");
    sectionForm.className = "section-form added-field";
    sectionForm.dataset.sectionType = sectionType;
    // Add position relative to properly position the delete button
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

    // Create first entry
    const firstEntry = createEntryFields(sectionType, 0);
    entriesContainer.appendChild(firstEntry);

    // Add "Add More" button for sections that support multiple entries
    if (
      ["Professional Experience", "Education", "Skills", "Languages"].includes(
        sectionType
      )
    ) {
      const addMoreButton = document.createElement("button");
      addMoreButton.type = "button";
      addMoreButton.className = "add-more-btn";
      addMoreButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add More';

      addMoreButton.addEventListener("click", function () {
        const entryCount =
          entriesContainer.querySelectorAll(".entry-fields").length;
        const newEntry = createEntryFields(sectionType, entryCount);
        entriesContainer.appendChild(newEntry);

        // Focus on the first input of the new entry
        const firstInput = newEntry.querySelector("input, textarea");
        if (firstInput) firstInput.focus();
      });

      entriesContainer.appendChild(addMoreButton);
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
    });

    // Assemble the form
    formGroup.appendChild(label);
    formGroup.appendChild(entriesContainer);
    sectionForm.appendChild(formGroup);
    // Add delete button to sectionForm instead of formGroup for better positioning
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

  // Create fields for a single entry based on section type
  function createEntryFields(sectionType, index) {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-fields";
    entryDiv.dataset.entryIndex = index;

    let defaultValue = "";
    let placeholders = [];

    // Set different fields and default values based on section type
    switch (sectionType) {
      case "Objective":
        placeholders = ["Enter your career objective"];
        defaultValue =
          "Looking for a position as a teaching assistant at EWU where I may use my skills to help students develop holistically and to assist teachers in an effective manner.";
        break;
      case "Professional Experience":
        placeholders = [
          "Job Title",
          "Duration (e.g., 2020 – present)",
          "Description",
        ];
        if (index === 0) {
          defaultValue = [
            "Home Tutor",
            "2020 – present",
            "Home tutoring HSC and SSC students",
          ];
        }
        break;
      case "Education":
        placeholders = [
          "Degree/Certificate",
          "Duration",
          "Institution",
          "GPA/Grades",
          "Location",
        ];
        if (index === 0) {
          defaultValue = [
            "Bachelor of Science in CSE",
            "11/2021 – present",
            "East West University",
            "CGPA : 3.67/4.00(93 credits completed, Current 10th semester)",
            "Dhaka, Bangladesh",
          ];
        }
        break;
      case "Skills":
        placeholders = ["Skill Category", "Specific Skills"];
        if (index === 0) {
          defaultValue = ["Computer proficiency", "MS word, Excel, PowerPoint"];
        }
        break;
      case "Languages":
        placeholders = ["Language", "Proficiency Level"];
        if (index === 0) {
          defaultValue = ["English", "Fluent in speaking and writing"];
        }
        break;
      case "Hobbies":
        placeholders = ["Enter your hobbies"];
        defaultValue =
          "Teaching, Reading Books and Gardening, Playing Football & Cricket";
        break;
      case "Personal Quality":
        placeholders = ["Enter your personal qualities"];
        defaultValue =
          "Good team player, believe in self-dignity, well communication skill, Enthusiastic, Sincere and Eager to learn.";
        break;
    }

    // Create fields based on the section type
    if (["Objective", "Hobbies", "Personal Quality"].includes(sectionType)) {
      // Single textarea for these sections
      const textarea = document.createElement("textarea");
      textarea.className = "form-input";
      textarea.placeholder = placeholders[0];
      textarea.rows = 4;
      textarea.value = defaultValue;

      textarea.addEventListener("input", function () {
        updateSection(sectionType, this.value);
      });

      entryDiv.appendChild(textarea);

      // Trigger initial update
      if (index === 0) {
        updateSection(sectionType, textarea.value);
      }
    } else {
      // Create a container for the multiple fields
      const fieldsContainer = document.createElement("div");
      fieldsContainer.className = "fields-container";

      // Multiple fields for other sections
      placeholders.forEach((placeholder, i) => {
        const fieldDiv = document.createElement("div");
        fieldDiv.className = "entry-field";

        // Determine if this is a title field (first field of entry)
        const isTitle = i === 0;

        if (isTitle) {
          fieldDiv.classList.add("entry-title-field");
        }

        let inputElement;
        if (
          i === placeholders.length - 1 &&
          ["Professional Experience"].includes(sectionType)
        ) {
          // Last field for experience is description - use textarea
          inputElement = document.createElement("textarea");
          inputElement.rows = 3;
        } else {
          inputElement = document.createElement("input");
          inputElement.type = "text";
        }

        inputElement.className = "form-input";
        inputElement.placeholder = placeholder;

        // Set default value if available
        if (Array.isArray(defaultValue) && defaultValue[i]) {
          inputElement.value = defaultValue[i];
        }

        // Add bold style for title fields
        if (isTitle) {
          const titleLabel = document.createElement("div");
          titleLabel.className = "entry-title-label";
          titleLabel.textContent = "Title";
          fieldDiv.appendChild(titleLabel);
        }

        fieldDiv.appendChild(inputElement);
        fieldsContainer.appendChild(fieldDiv);

        // Add input event listeners
        inputElement.addEventListener("input", function () {
          // Collect all values from this entry's fields
          const entryValues = collectEntryValues(entryDiv.parentNode);
          updateSectionData(sectionType, entryValues);
        });
      });

      // Add the fields container to entry div
      entryDiv.appendChild(fieldsContainer);

      // Add delete button for this entry (not for the first entry)
      if (index > 0) {
        const deleteEntryBtn = document.createElement("button");
        deleteEntryBtn.type = "button";
        deleteEntryBtn.className = "delete-entry-btn";
        deleteEntryBtn.innerHTML = '<i class="fa-solid fa-times"></i>';

        deleteEntryBtn.addEventListener("click", function () {
          entryDiv.remove();

          // Re-index remaining entries
          const allEntries =
            entryDiv.parentNode.querySelectorAll(".entry-fields");
          allEntries.forEach((entry, idx) => {
            entry.dataset.entryIndex = idx;
          });

          // Update the section with remaining entries
          const entryValues = collectEntryValues(entryDiv.parentNode);
          updateSectionData(sectionType, entryValues);
        });

        entryDiv.appendChild(deleteEntryBtn);
      }

      // Initial update for default values
      if (index === 0 && Array.isArray(defaultValue)) {
        setTimeout(() => {
          const entryValues = collectEntryValues(entryDiv.parentNode);
          updateSectionData(sectionType, entryValues);
        }, 100);
      }
    }

    return entryDiv;
  }

  // Collect all values from entries in a section
  function collectEntryValues(container) {
    const entries = container.querySelectorAll(".entry-fields");
    const values = [];

    entries.forEach((entry) => {
      const inputElements = entry.querySelectorAll("input, textarea");
      const entryData = [];

      inputElements.forEach((input) => {
        entryData.push(input.value);
      });

      if (entryData.some((value) => value.trim() !== "")) {
        values.push(entryData);
      }
    });

    return values;
  }

  // Update template sections based on user input
  function updateSectionData(sectionType, entries) {
    switch (sectionType) {
      case "Professional Experience":
        updateExperienceSection(entries);
        break;
      case "Education":
        updateEducationSection(entries);
        break;
      case "Skills":
        updateSkillsSection(entries);
        break;
      case "Languages":
        updateLanguagesSection(entries);
        break;
    }
  }

  // Update section in template for simple text sections
  function updateSection(sectionType, content) {
    // Rest of the function remains the same
    let sectionTitle, sectionIcon;

    switch (sectionType) {
      case "Objective":
        sectionTitle = "OBJECTIVE";
        sectionIcon = "fa-bullseye";
        break;
      case "Hobbies":
        sectionTitle = "HOBBIES";
        sectionIcon = "fa-heart";
        break;
      case "Personal Quality":
        sectionTitle = "PERSONAL QUALITY";
        sectionIcon = "fa-star";
        break;
    }

    // Find or create the section
    let section = document.querySelector(
      `.template-section-title:has(i.fa-${sectionIcon})`
    );

    if (!section) {
      // Create new section if it doesn't exist
      section = document.createElement("h2");
      section.className = "template-section-title";
      section.innerHTML = `<i class="fa-solid ${sectionIcon}"></i> ${sectionTitle}`;

      // Find appropriate place to insert
      const templateContainer = document.querySelector(".template-container");
      templateContainer.appendChild(section);

      // Create paragraph for content
      const paragraph = document.createElement("p");
      templateContainer.appendChild(paragraph);
    }

    // Update content
    const paragraph = section.nextElementSibling;
    if (paragraph && paragraph.tagName === "P") {
      paragraph.textContent = content;
    }
  }

  // The rest of the updateExperienceSection, updateEducationSection etc. functions remain unchanged
  // These would be defined in your original code
  function updateExperienceSection(entries) {
    // Your existing implementation would go here
  }

  function updateEducationSection(entries) {
    // Your existing implementation would go here
  }

  function updateSkillsSection(entries) {
    // Your existing implementation would go here
  }

  function updateLanguagesSection(entries) {
    // Your existing implementation would go here
  }

  // Add CSS styles for the multi-field forms with improved positioning
  function addMultiFieldStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .entries-container {
        margin-bottom: 15px;
      }
      
      .entry-fields {
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
        background-color: #f9f9f9;
        position: relative;
      }
      
      .fields-container {
        width: 100%;
      }
      
      .entry-field {
        margin-bottom: 10px;
        width: 100%;
      }
      
      .entry-title-field {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 15px;
      }
      
      .entry-title-label {
        font-size: 12px;
        font-weight: bold;
        color: #777;
        margin-bottom: 5px;
        display: block;
      }
      
      .form-input {
        width: calc(100% - 20px); /* Account for the delete button space */
      }
      
      .section-form {
        position: relative;
        margin-bottom: 20px;
        padding-top: 10px;
      }
      
      .delete-section-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        background: none;
        border: none;
        color: #ff6384;
        cursor: pointer;
        font-size: 16px;
        z-index: 5;
      }
      
      .delete-entry-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: #ff6384;
        cursor: pointer;
        z-index: 5;
      }
      
      .add-more-btn {
        background-color: #f0f0f0;
        border: 1px dashed #ccc;
        padding: 10px;
        width: 100%;
        border-radius: 8px;
        margin-top: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: #555;
      }
      
      .add-more-btn:hover {
        background-color: #e8e8e8;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize
  function init() {
    // Add a small delay to ensure the DOM is fully loaded
    setTimeout(() => {
      setupMultiFieldSections();

      // Immediately remove initial input fields for all target section types
      [
        "Objective",
        "Professional Experience",
        "Education",
        "Skills",
        "Languages",
        "Hobbies",
        "Personal Quality",
      ].forEach((sectionType) => {
        removeInitialInputField(sectionType);
      });

      addMultiFieldStyles();

      // Add CSS to specifically hide any remaining initial input fields
      const style = document.createElement("style");
      style.textContent = `
        input[placeholder^="Enter education"],
        input[placeholder^="Enter objective"],
        input[placeholder^="Enter professional"],
        input[placeholder^="Enter skill"],
        input[placeholder^="Enter language"],
        input[placeholder^="Enter hobb"],
        input[placeholder^="Enter personal"] {
          display: none !important;
        }
        
        /* Hide their container elements as well */
        input[placeholder^="Enter education"],
        input[placeholder^="Enter objective"],
        input[placeholder^="Enter professional"],
        input[placeholder^="Enter skill"],
        input[placeholder^="Enter language"],
        input[placeholder^="Enter hobb"],
        input[placeholder^="Enter personal"] {
          display: none !important;
        }
        
        /* Target the specific form group containers */
        .form-group:has(> input[placeholder^="Enter education"]),
        .form-group:has(> input[placeholder^="Enter objective"]),
        .form-group:has(> input[placeholder^="Enter professional"]),
        .form-group:has(> input[placeholder^="Enter skill"]),
        .form-group:has(> input[placeholder^="Enter language"]),
        .form-group:has(> input[placeholder^="Enter hobb"]),
        .form-group:has(> input[placeholder^="Enter personal"]) {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }, 300);
  }

  // Run initialization
  init();
});
