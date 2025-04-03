/**
 * Profile Image Resizer
 * Enhances the image upload functionality with a modal dialog for resizing
 * and cropping profile photos in a resume builder.
 */

document.addEventListener("DOMContentLoaded", function () {
  // Elements for profile image upload
  const profileUploadInput = document.getElementById("profile-upload-input");
  const profileImage = document.getElementById("profile-image");
  const profilePlaceholder = document.getElementById("profile-placeholder");

  // Get the template profile image - make sure to use querySelector for the correct selector
  const templateProfileImage = document.querySelector(".profile-img img");

  // Variables to track image state
  let currentScale = 1;
  let currentImageUrl = "";

  // Create modal elements
  const modal = createModal();
  document.body.appendChild(modal);

  // Handle image upload
  profileUploadInput.addEventListener("change", function (event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        currentImageUrl = e.target.result;

        // Set initial image in modal
        const modalImg = document.getElementById("modal-image");
        modalImg.src = currentImageUrl;
        modalImg.style.transform = `scale(${currentScale})`;

        // Show modal
        modal.style.display = "flex";

        // Reset slider
        const scaleSlider = document.getElementById("scale-slider");
        scaleSlider.value = 100;
        currentScale = 1;
        updateScaleDisplay();
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  });

  // Close button functionality
  const closeBtn = document.querySelector(".modal-close");
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Handle clicks outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle scale slider changes
  const scaleSlider = document.getElementById("scale-slider");
  scaleSlider.addEventListener("input", function () {
    currentScale = parseInt(this.value) / 100;
    const modalImg = document.getElementById("modal-image");
    modalImg.style.transform = `scale(${currentScale})`;
    updateScaleDisplay();
  });

  // Function to update scale percentage display
  function updateScaleDisplay() {
    const scalePercentage = document.getElementById("scale-percentage");
    scalePercentage.textContent = `${Math.round(currentScale * 100)}%`;
  }

  // Function to create the modal dialog
  function createModal() {
    const modalContainer = document.createElement("div");
    modalContainer.className = "image-resize-modal";
    modalContainer.style.display = "none";

    modalContainer.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Customize Image</h2>
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">
          <h3>Upload Portrait Photo</h3>
          <div class="image-preview">
            <div class="image-container">
              <img id="modal-image" src="" alt="Profile Preview">
            </div>
          </div>
          <div class="resize-controls">
            <div class="scale-control">
              <div class="scale-label">
                <div>Scale</div>
                <div id="scale-percentage">100%</div>
              </div>
              <input type="range" id="scale-slider" min="100" max="200" value="100" class="slider">
            </div>
            <div class="background-toggle">
              <div class="background-label">Background</div>
              <div class="background-options">
                <div class="background-option white active" data-color="white"></div>
                <div class="background-option gray" data-color="gray"></div>
                <div class="background-option blue" data-color="blue"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button id="delete-image-btn" class="delete-btn">Delete</button>
          <button id="replace-image-btn" class="replace-btn">Replace Photo</button>
          <button id="save-image-btn" class="save-btn">Save</button>
        </div>
      </div>
    `;

    // Add styles
    const modalStyle = document.createElement("style");
    modalStyle.textContent = `
      .image-resize-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
      }
      
      .modal-content {
        background-color: #fff;
        width: 90%;
        max-width: 600px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }
      
      .modal-header {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
      }
      
      .modal-header h2 {
        margin: 0;
        font-size: 20px;
        color: #333;
      }
      
      .modal-close {
        font-size: 28px;
        font-weight: bold;
        color: #aaa;
        cursor: pointer;
      }
      
      .modal-close:hover {
        color: #ff6384;
      }
      
      .modal-body {
        padding: 20px;
        background-color: #000;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .modal-body h3 {
        color: #fff;
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: normal;
      }
      
      .image-preview {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
      }
      
      .image-container {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
      }
      
      #modal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform-origin: center;
      }
      
      .resize-controls {
        width: 100%;
        max-width: 400px;
      }
      
      .scale-control {
        margin-bottom: 20px;
      }
      
      .scale-label {
        display: flex;
        justify-content: space-between;
        color: #fff;
        margin-bottom: 10px;
        font-size: 14px;
      }
      
      .slider {
        width: 100%;
        height: 5px;
        border-radius: 5px;
        background: #666;
        outline: none;
        -webkit-appearance: none;
      }
      
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff6384;
        cursor: pointer;
      }
      
      .slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff6384;
        cursor: pointer;
        border: none;
      }
      
      .background-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .background-label {
        color: #fff;
        font-size: 14px;
      }
      
      .background-options {
        display: flex;
        gap: 10px;
      }
      
      .background-option {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
      }
      
      .background-option.active {
        border-color: #ff6384;
      }
      
      .background-option.white {
        background-color: #fff;
      }
      
      .background-option.gray {
        background-color: #e0e0e0;
      }
      
      .background-option.blue {
        background-color: #a8c0ff;
      }
      
      .modal-footer {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #eee;
      }
      
      .delete-btn {
        background-color: transparent;
        color: #ff6384;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
      
      .replace-btn {
        background-color: transparent;
        color: #333;
        border: 1px solid #ddd;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
      
      .save-btn {
        background-color: #ff6384;
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
      }
      
      .save-btn:hover {
        background-color: #e73e6c;
      }
    `;

    document.head.appendChild(modalStyle);

    return modalContainer;
  }

  // Initialize event listeners after DOM is fully loaded and modal is created
  setTimeout(() => {
    // Save button functionality
    const saveBtn = document.getElementById("save-image-btn");
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        console.log("Save button clicked");

        // Update the form profile image
        if (profileImage) {
          profileImage.src = currentImageUrl;
          profileImage.style.display = "block";
        }
        if (profilePlaceholder) {
          profilePlaceholder.style.display = "none";
        }

        // Update the template profile image
        if (templateProfileImage) {
          templateProfileImage.src = currentImageUrl;
          templateProfileImage.style.display = "block";
          templateProfileImage.style.transform = `scale(${currentScale})`;
        }

        // Find and hide the template placeholder if it exists
        const templatePlaceholder = document.querySelector(
          ".profile-img .profile-placeholder"
        );
        if (templatePlaceholder) {
          templatePlaceholder.style.display = "none";
        }

        // Close the modal
        modal.style.display = "none";
      });
    } else {
      console.error("Save button not found");
    }

    // Setup background color options
    const backgroundOptions = document.querySelectorAll(".background-option");
    const imageContainer = document.querySelector(".image-container");

    backgroundOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        backgroundOptions.forEach((opt) => opt.classList.remove("active"));

        // Add active class to clicked option
        this.classList.add("active");

        // Set background color
        const color = this.dataset.color;
        switch (color) {
          case "white":
            imageContainer.style.backgroundColor = "#fff";
            break;
          case "gray":
            imageContainer.style.backgroundColor = "#e0e0e0";
            break;
          case "blue":
            imageContainer.style.backgroundColor = "#a8c0ff";
            break;
        }
      });
    });

    // Handle delete button
    const deleteBtn = document.getElementById("delete-image-btn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        // Reset images
        if (profileImage) {
          profileImage.src = "";
          profileImage.style.display = "none";
        }
        if (profilePlaceholder) {
          profilePlaceholder.style.display = "block";
        }

        if (templateProfileImage) {
          templateProfileImage.src = "";
          templateProfileImage.style.display = "none";
        }

        // Find and show the template placeholder
        const templatePlaceholder = document.querySelector(
          ".profile-img .profile-placeholder"
        );
        if (templatePlaceholder) {
          templatePlaceholder.style.display = "block";
        }

        // Close modal
        modal.style.display = "none";
      });
    }

    // Handle replace button
    const replaceBtn = document.getElementById("replace-image-btn");
    if (replaceBtn) {
      replaceBtn.addEventListener("click", function () {
        // Trigger file input click
        profileUploadInput.click();
      });
    }
  }, 300); // Small delay to ensure the DOM is fully loaded
});
