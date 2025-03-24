/**
 * Simplified PDF Solution - Direct Template Capture
 *
 * This script captures the template exactly as displayed and converts it to PDF
 * without modifying the layout or content in any way.
 */

document.addEventListener("DOMContentLoaded", function () {
  // Get the download button
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
      const profileImage = templateElement.querySelector(
        "#template-profile-image"
      );
      const profilePlaceholder = templateElement.querySelector(
        "#template-profile-placeholder"
      );
      const profileContainer = profileImage
        ? profileImage.parentElement
        : profilePlaceholder
        ? profilePlaceholder.parentElement
        : null;

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
});
