/**
 * Tips Panel Implementation
 * Shows a sliding panel with resume tips when the "Need help?" button is clicked
 */

document.addEventListener("DOMContentLoaded", function () {
  // Create the tips panel
  createTipsPanel();

  // Add event listener to the "Need help?" link
  const helpLink = document.querySelector(".help-link");
  if (helpLink) {
    helpLink.addEventListener("click", function (e) {
      e.preventDefault();
      showTipsPanel();
    });
  }

  // Function to create the tips panel
  function createTipsPanel() {
    const tipsPanel = document.createElement("div");
    tipsPanel.className = "tips-panel";
    tipsPanel.id = "tipsPanel";

    tipsPanel.innerHTML = `
      <div class="tips-panel-content">
        <div class="tips-header">
          <h2>Tips</h2>
          <button class="tips-close-btn">&times;</button>
        </div>
        
        <div class="tips-section active" data-section="general">
          <div class="tips-section-header">
            <h3>General</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </span>
          </div>
          <div class="tips-section-content">
            <ul class="tips-list">
              <li>Keep your sentences short and sweet.</li>
              <li>Sort your sections in 'Design', such that more important sections (e.g. professional experience & education) come before other sections.</li>
              <li>Stick to a reverse-chronological order for your section entries that have dates. We automatically do this for you by default.</li>
              <li>Always view your resume from the lens of the employer. What can you do for them?</li>
              <li>Don't start sentences with 'I' or 'my' but with action words instead.</li>
              <li>Always use active voice, never passive voice.</li>
            </ul>
          </div>
        </div>
        
        <div class="tips-section" data-section="action">
          <div class="tips-section-header">
            <h3>Action Words</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="personal">
          <div class="tips-section-header">
            <h3>Personal Details</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="profile">
          <div class="tips-section-header">
            <h3>Profile</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="education">
          <div class="tips-section-header">
            <h3>Education</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="experience">
          <div class="tips-section-header">
            <h3>Professional Experience</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="custom">
          <div class="tips-section-header">
            <h3>Custom</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="skills">
          <div class="tips-section-header">
            <h3>Skills</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="languages">
          <div class="tips-section-header">
            <h3>Languages</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="interests">
          <div class="tips-section-header">
            <h3>Interests</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="projects">
          <div class="tips-section-header">
            <h3>Projects</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
        
        <div class="tips-section" data-section="courses">
          <div class="tips-section-header">
            <h3>Courses</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>

        <div class="tips-section" data-section="projects">
          <div class="tips-section-header">
            <h3>Awards</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>

        <div class="tips-section" data-section="projects">
          <div class="tips-section-header">
            <h3>Organisations</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>

        <div class="tips-section" data-section="projects">
          <div class="tips-section-header">
            <h3>Publications</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>

        <div class="tips-section" data-section="projects">
          <div class="tips-section-header">
            <h3>References</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>

        <div class="tips-section" data-section="projects">
          <div class="tips-section-header">
            <h3>Certificates</h3>
            <span class="tips-chevron">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(tipsPanel);

    // Add event listener to close button
    const closeBtn = tipsPanel.querySelector(".tips-close-btn");
    closeBtn.addEventListener("click", function () {
      hideTipsPanel();
    });

    // Add event listeners to section headers
    const sectionHeaders = tipsPanel.querySelectorAll(".tips-section-header");
    sectionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const section = this.closest(".tips-section");
        toggleSection(section);
      });
    });

    // Add styles
    const tipsPanelStyles = document.createElement("style");
    tipsPanelStyles.textContent = `
      .tips-panel {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background-color: #fff;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transition: right 0.3s ease;
        overflow-y: auto;
      }
      
      .tips-panel.visible {
        right: 0;
      }
      
      .tips-panel-content {
        padding: 20px 0;
        height: 100%;
      }
      
      .tips-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 20px;
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 10px;
      }
      
      .tips-header h2 {
        font-size: 24px;
        color: #333;
        margin: 0;
        font-weight: 600;
      }
      
      .tips-close-btn {
        background: transparent;
        border: none;
        font-size: 28px;
        color: #999;
        cursor: pointer;
        padding: 0;
        line-height: 1;
      }
      
      .tips-section {
        border-bottom: 1px solid #f0f0f0;
      }
      
      .tips-section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        cursor: pointer;
      }
      
      .tips-section-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      
      .tips-section-content {
        padding: 0 20px 15px;
        display: none;
      }
      
      .tips-section.active .tips-section-content {
        display: block;
      }
      
      .tips-section.active .tips-chevron svg {
        transform: rotate(180deg);
      }
      
      .tips-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      
      .tips-list li {
        position: relative;
        padding-left: 20px;
        margin-bottom: 15px;
        font-size: 14px;
        line-height: 1.5;
        color: #555;
      }
      
      .tips-list li::before {
        content: "•";
        position: absolute;
        left: 0;
        top: 0;
        color: #333;
      }
      
      .tips-chevron {
        display: flex;
        align-items: center;
        color: #666;
        transition: transform 0.3s ease;
      }
      
      .tips-section.active .tips-chevron svg {
        transform: rotate(180deg);
      }
      
      @media (max-width: 768px) {
        .tips-panel {
          width: 100%;
          right: -100%;
        }
      }
    `;

    document.head.appendChild(tipsPanelStyles);
  }

  // Function to show the tips panel
  function showTipsPanel() {
    const tipsPanel = document.getElementById("tipsPanel");
    tipsPanel.classList.add("visible");
  }

  // Function to hide the tips panel
  function hideTipsPanel() {
    const tipsPanel = document.getElementById("tipsPanel");
    tipsPanel.classList.remove("visible");
  }

  // Function to toggle a section
  function toggleSection(section) {
    // First close all other sections
    const allSections = document.querySelectorAll(".tips-section");
    allSections.forEach((s) => {
      if (s !== section) {
        s.classList.remove("active");
      }
    });

    // Toggle the clicked section
    section.classList.toggle("active");
  }
});
