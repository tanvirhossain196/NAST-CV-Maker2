// Template slider management
document.addEventListener("DOMContentLoaded", function () {
  // Template data - you can expand this with more details
  const templates = [];
  for (let i = 1; i <= 30; i++) {
    templates.push({
      id: i,
      src: `/templates/template${i}.jpg`,
      alt: `Resume Template ${i}`,
    });
  }

  const templatesPerPage = 7; // Number of templates visible at once
  const templateSlider = document.querySelector(".template-slider");
  const templateRow = document.querySelector(".template-row");
  const paginationContainer = document.querySelector(".template-pagination");
  const totalPages = Math.ceil(templates.length / templatesPerPage);

  // Clear existing content
  templateRow.innerHTML = "";
  paginationContainer.innerHTML = "";

  // Make the template row auto-scroll initially
  templateRow.classList.add("auto-scroll");

  // Create duplicate templates for infinite scrolling effect - updated for more items
  function createScrollingTemplates() {
    // Create more templates for a fuller scrolling experience
    const displayCount = Math.min(templates.length, 16); // Show more templates

    // First create original set
    for (let i = 0; i < displayCount; i++) {
      const template = templates[i];

      const templateCard = document.createElement("div");
      templateCard.classList.add("template-card");

      const img = document.createElement("img");
      img.src = template.src;
      img.alt = template.alt;
      img.classList.add("template-img");

      templateCard.appendChild(img);
      templateRow.appendChild(templateCard);
    }

    // Duplicate the first 8 templates and add them to the end for seamless scrolling
    for (let i = 0; i < 8; i++) {
      const template = templates[i];

      const templateCard = document.createElement("div");
      templateCard.classList.add("template-card");

      const img = document.createElement("img");
      img.src = template.src;
      img.alt = template.alt;
      img.classList.add("template-img");

      templateCard.appendChild(img);
      templateRow.appendChild(templateCard);
    }
  }

  // Initially create scrolling templates instead of paged templates
  createScrollingTemplates();

  // Create pagination dots
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", function () {
      // Update active dot
      document
        .querySelectorAll(".dot")
        .forEach((d) => d.classList.remove("active"));
      this.classList.add("active");

      // Update current page
      currentPage = i;

      // Load corresponding page
      loadTemplatePage(i);
    });

    paginationContainer.appendChild(dot);
  }

  // Function to load templates for a specific page
  function loadTemplatePage(pageIndex) {
    // Clear current templates
    templateRow.innerHTML = "";

    // Calculate start and end indices
    const startIndex = pageIndex * templatesPerPage;
    const endIndex = Math.min(startIndex + templatesPerPage, templates.length);

    // Add template cards for current page
    for (let i = startIndex; i < endIndex; i++) {
      const template = templates[i];

      const templateCard = document.createElement("div");
      templateCard.classList.add("template-card");

      const img = document.createElement("img");
      img.src = template.src;
      img.alt = template.alt;
      img.classList.add("template-img");

      templateCard.appendChild(img);
      templateRow.appendChild(templateCard);
    }
  }

  // Add arrow navigation
  const prevButton = document.createElement("button");
  prevButton.textContent = "←";
  prevButton.classList.add("nav-button", "prev-button");

  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.classList.add("nav-button", "next-button");

  templateSlider.parentNode.insertBefore(prevButton, templateSlider);
  templateSlider.parentNode.appendChild(nextButton);

  let currentPage = 0;

  prevButton.addEventListener("click", function () {
    if (currentPage > 0) {
      currentPage--;
      updateActiveDot();
      loadTemplatePage(currentPage);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateActiveDot();
      loadTemplatePage(currentPage);
    }
  });

  function updateActiveDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Handle "Show all Templates" button
  const showAllBtn = document.querySelector(".show-all-btn");
  showAllBtn.addEventListener("click", function () {
    // Change background to transparent
    document.getElementById("templateShowcase").classList.add("expanded");

    // Stop auto-scrolling
    templateRow.classList.remove("auto-scroll");
    templateRow.classList.add("grid-mode");

    // Change to grid layout
    templateRow.style.display = "grid";
    templateRow.style.gridTemplateColumns =
      "repeat(auto-fill, minmax(250px, 1fr))";
    templateRow.style.width = "100%";
    templateRow.style.justifyContent = "center";
    templateRow.style.gap = "30px"; // Increased gap for better spacing
    templateRow.style.animation = "none";

    // Clear and load all templates
    templateRow.innerHTML = "";
    templates.forEach((template) => {
      const templateCard = document.createElement("div");
      templateCard.classList.add("template-card", "grid-card");

      const img = document.createElement("img");
      img.src = template.src;
      img.alt = template.alt;
      img.classList.add("template-img");

      templateCard.appendChild(img);
      templateRow.appendChild(templateCard);
    });

    // Hide pagination when showing all
    paginationContainer.style.display = "none";
    this.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";

    // Add a "Show less" button
    const showLessBtn = document.createElement("button");
    showLessBtn.textContent = "Show fewer templates";
    showLessBtn.classList.add("show-all-btn", "mt-4");
    showLessBtn.style.display = "inline-block";
    this.parentNode.appendChild(showLessBtn);

    showLessBtn.addEventListener("click", function () {
      // Change background back to transparent
      document.getElementById("templateShowcase").classList.remove("expanded");

      // Reset to original view with auto-scroll
      templateRow.style.display = "flex";
      templateRow.style.gridTemplateColumns = "";
      templateRow.style.width = "max-content";
      templateRow.classList.remove("grid-mode");

      // Clear and create scrolling templates
      templateRow.innerHTML = "";
      createScrollingTemplates();

      // Restart auto-scrolling
      templateRow.classList.add("auto-scroll");

      // Show button again
      showAllBtn.style.display = "inline-block";

      // Remove self
      this.remove();
    });
  });

  // Remove the pagination dots and navigation buttons as they're not needed with auto-scroll
  paginationContainer.style.display = "none";
  prevButton.style.display = "none";
  nextButton.style.display = "none";
});
