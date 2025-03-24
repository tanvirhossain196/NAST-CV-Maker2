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
  const templateName = document.querySelector(".template-container h1");
  const templateDepartment = document.querySelector(".template-department");
  const templateEmail = document.querySelector(
    ".template-contact-item:nth-child(1) span"
  );
  const templatePhone = document.querySelector(
    ".template-contact-item:nth-child(2) span"
  );
  const templateAddress = document.querySelector(
    ".template-contact-item:nth-child(3) span"
  );

  // Object to store custom fields added dynamically
  const customFields = {
    personal: {},
    links: {},
  };

  // Function to update template with input values
  function updateTemplate() {
    // Update basic fields
    if (fullNameInput.value) {
      templateName.textContent = fullNameInput.value;
    }

    if (jobTitleInput.value) {
      templateDepartment.textContent = jobTitleInput.value;
    }

    if (emailInput.value) {
      templateEmail.textContent = emailInput.value;
    }

    if (phoneInput.value) {
      templatePhone.textContent = phoneInput.value;
    }

    if (addressInput.value) {
      templateAddress.textContent = addressInput.value;
    }

    // Update custom personal information fields
    updateCustomFields();
  }

  // Function to update custom fields in the template
  function updateCustomFields() {
    // Personal information fields
    const personalInfoContainer = document.querySelector(
      ".template-personal-info"
    );
    personalInfoContainer.innerHTML = ""; // Clear existing fields

    // Recreate personal info items
    for (const [key, value] of Object.entries(customFields.personal)) {
      if (value) {
        const item = createPersonalInfoItem(key, value);
        personalInfoContainer.appendChild(item);
      }
    }

    // Links section - for demonstration, we'll add this below the hobbies section
    // Find or create a links section
    let linksSection = document.querySelector(".template-links-section");

    if (Object.keys(customFields.links).length > 0 && !linksSection) {
      // Create links section if it doesn't exist and we have links
      const templateContainer = document.querySelector(".template-container");

      // Create section title
      const linksSectionTitle = document.createElement("h2");
      linksSectionTitle.className = "template-section-title";
      linksSectionTitle.innerHTML = '<i class="fa-solid fa-link"></i> LINKS';

      // Create links container
      linksSection = document.createElement("div");
      linksSection.className = "template-links-section";

      // Add to template container
      templateContainer.appendChild(linksSectionTitle);
      templateContainer.appendChild(linksSection);
    }

    // If we have a links section, update it
    if (linksSection) {
      linksSection.innerHTML = ""; // Clear existing links

      // Add each link
      for (const [site, url] of Object.entries(customFields.links)) {
        if (url) {
          const linkItem = document.createElement("div");
          linkItem.className = "template-contact-item";
          linkItem.innerHTML = ` 
            <i class="fa-solid fa-globe"></i>
            <span>${site}: <a href="${url}" target="_blank">${url}</a></span>
          `;
          linksSection.appendChild(linkItem);
        }
      }
    }
  }

  // Helper function to create personal info items
  function createPersonalInfoItem(key, value) {
    const item = document.createElement("div");
    item.className = "template-contact-item";

    // Choose appropriate icon based on the key
    let icon = "fa-info-circle"; // Default icon

    switch (key.toLowerCase()) {
      case "date of birth":
        icon = "fa-cake-candles";
        break;
      case "nationality":
        icon = "fa-flag";
        break;
      case "marital status":
        icon = "fa-heart";
        break;
      case "gender":
      case "gender/pronoun":
        icon = "fa-user";
        break;
      case "military service":
        icon = "fa-shield-alt";
        break;
      case "passport or id":
        icon = "fa-id-card";
        break;
      case "driving license":
        icon = "fa-car";
        break;
      case "visa":
        icon = "fa-passport";
        break;
    }

    item.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${value}</span>
    `;

    return item;
  }

  // Add event listeners to form inputs
  fullNameInput.addEventListener("input", updateTemplate);
  jobTitleInput.addEventListener("input", updateTemplate);
  emailInput.addEventListener("input", updateTemplate);
  phoneInput.addEventListener("input", updateTemplate);
  addressInput.addEventListener("input", updateTemplate);

  // Get all relevant input elements for sections
  const objectiveInput = document.querySelector(
    '.form-input[placeholder="Enter your career objective"]'
  );
  const professionalExperienceInput = document.querySelector(
    '.form-input[placeholder="Enter professional experience"]'
  );
  const educationInput = document.querySelector(
    '.form-input[placeholder="Enter education"]'
  );
  const skillsInput = document.querySelector(
    '.form-input[placeholder="Enter skills"]'
  );
  const languagesInput = document.querySelector(
    '.form-input[placeholder="Enter languages"]'
  );
  const hobbiesInput = document.querySelector(
    '.form-input[placeholder="Enter hobbies"]'
  );
  const personalQualityInput = document.querySelector(
    '.form-input[placeholder="Enter personal qualities"]'
  );

  // Function to update the template for each section
  function updateSectionTemplate(sectionType, value) {
    let sectionTitle, sectionIcon;

    switch (sectionType) {
      case "Objective":
        sectionTitle = "OBJECTIVE";
        sectionIcon = "fa-bullseye";
        break;
      case "Professional Experience":
        sectionTitle = "PROFESSIONAL EXPERIENCE";
        sectionIcon = "fa-briefcase";
        break;
      case "Education":
        sectionTitle = "EDUCATION";
        sectionIcon = "fa-graduation-cap";
        break;
      case "Skills":
        sectionTitle = "SKILLS";
        sectionIcon = "fa-tools";
        break;
      case "Languages":
        sectionTitle = "LANGUAGES";
        sectionIcon = "fa-language";
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
      paragraph.textContent = value;
    }
  }

  // Add event listeners to the new input fields
  objectiveInput.addEventListener("input", function () {
    updateSectionTemplate("Objective", this.value);
  });

  professionalExperienceInput.addEventListener("input", function () {
    updateSectionTemplate("Professional Experience", this.value);
  });

  educationInput.addEventListener("input", function () {
    updateSectionTemplate("Education", this.value);
  });

  skillsInput.addEventListener("input", function () {
    updateSectionTemplate("Skills", this.value);
  });

  languagesInput.addEventListener("input", function () {
    updateSectionTemplate("Languages", this.value);
  });

  hobbiesInput.addEventListener("input", function () {
    updateSectionTemplate("Hobbies", this.value);
  });

  personalQualityInput.addEventListener("input", function () {
    updateSectionTemplate("Personal Quality", this.value);
  });

  // Function to handle dynamic field additions
  function setupDynamicFieldListeners() {
    // Track the most recently added inputs
    const newInputs = document.querySelectorAll(".added-field .form-input");

    newInputs.forEach((input) => {
      // Get the field label from the sibling element (the label)
      const fieldLabel = input.parentNode.querySelector(".form-label");

      if (fieldLabel) {
        const labelText = fieldLabel.textContent.trim().split(" ")[0];
        const sourceButton = input.closest(".added-field").dataset.sourceButton;

        // Determine if it's a personal info field or a link
        let category = "personal";
        if (
          sourceButton &&
          (sourceButton.includes("website") ||
            ["linkedin", "github", "medium", "orcid", "skype", "bluesky"].some(
              (link) => sourceButton && sourceButton.includes(link)
            ))
        ) {
          category = "links";
        }

        // Add input event listener
        input.addEventListener("input", function () {
          // Store the value
          if (category === "personal") {
            customFields.personal[labelText] = input.value;
          } else {
            customFields.links[labelText] = input.value;
          }

          // Update the template
          updateTemplate();
        });
      }
    });
  }

  // Add observer to detect when new fields are added
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            // Element node
            if (node.classList && node.classList.contains("added-field")) {
              // New field was added, set up listeners
              setupDynamicFieldListeners();
            }

            // Also check for any .added-field descendants
            const addedFields = node.querySelectorAll(".added-field");
            if (addedFields.length > 0) {
              setupDynamicFieldListeners();
            }
          }
        });
      }
    });
  });

  // Start observing the document for added nodes
  observer.observe(document.body, { childList: true, subtree: true });

  // PDF Download Functionality
  const downloadBtn = document.querySelector(".download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      // Show loading indicator
      const loadingIndicator = document.createElement("span");
      loadingIndicator.textContent = " Generating PDF...";
      loadingIndicator.className = "download-loading";
      this.appendChild(loadingIndicator);

      // Use html2pdf library to convert to PDF
      generatePDF();
    });
  }

  function generatePDF() {
    // Ensure the html2pdf library is loaded (we'll add this to the HTML)
    if (typeof html2pdf === "undefined") {
      console.error("html2pdf library not loaded");
      return;
    }

    const templateElement = document.querySelector(".template-container");
    const fileName = `${
      templateName.textContent.trim() || "Resume"
    }_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`;

    const options = {
      margin: 10,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Generate and download PDF
    html2pdf()
      .set(options)
      .from(templateElement)
      .save()
      .then(() => {
        // Remove loading indicator after generation
        const loadingIndicator = document.querySelector(".download-loading");
        if (loadingIndicator) {
          loadingIndicator.remove();
        }
      });
  }

  // Setup initial template values
  updateTemplate();

  // Global variable to expose functions to other scripts
  window.templateFunctions = {
    updateTemplate,
    updateCustomFields,
    customFields,
  };
});
