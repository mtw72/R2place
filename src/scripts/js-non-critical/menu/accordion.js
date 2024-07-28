'use strict';

// ******** VARIABLES ******** //

// Get all elements with the class "accordion__button"
const menuAccordion = document.getElementsByClassName("accordion__button");


// ******** EVENT LISTENERS ******** //

// Add event listener for window load to open active panels
window.addEventListener('load', openOrClosePanels);

// Add event listener for window resize to open active panels or remove aria attributes
window.addEventListener('resize', openOrClosePanels);

// Add event listener to the menu accordion to toggle panel open or close
for (let i = 0; i < menuAccordion.length; i++) {
  menuAccordion[i].addEventListener("click", function () {
    this.classList.toggle("accordion__button--active");
    const isActive = this.classList.contains("accordion__button--active");
    handlePanelState(this, isActive, true); // Always handle click events as small screen actions
  });
}


// ******** FUNCTIONS ******** //

// Function to handle panel state based on button and screen size
function handlePanelState(button, isActive, isSmallScreen) {
  const menuPanel = button.nextElementSibling;

  // Set aria-expanded attribute
  button.setAttribute('aria-expanded', isActive && isSmallScreen);

  if (isActive && isSmallScreen) {
    // Open the panel
    menuPanel.classList.add("accordion__panel--open");
    menuPanel.style.maxHeight = menuPanel.scrollHeight + "px";
    menuPanel.style.border = "1px solid rgba(226, 186, 137, 0.842)";
    menuPanel.setAttribute('role', 'region');
  } else {
    // Close the panel
    menuPanel.classList.remove("accordion__panel--open");
    menuPanel.style.maxHeight = null;
    menuPanel.style.border = "none";
    menuPanel.removeAttribute('role', 'region');
  }
}

// Function to open active panels when window width is <= 450px
function openOrClosePanels() {
  const isSmallScreen = window.innerWidth <= 450;

  for (let i = 0; i < menuAccordion.length; i++) {
    const button = menuAccordion[i];
    const isActive = button.classList.contains("accordion__button--active");
    handlePanelState(button, isActive, isSmallScreen);
  }
}