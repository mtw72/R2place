'use strict';

// ******** VARIABLES ******** //

// Get the elements inside and around the navbar
var navbar = document.getElementById("navbar");
var navbarToggler = document.querySelector('.navbar__toggler');
var navContainer = document.querySelector('.navbar__collapse');
var navList = document.querySelector('.navbar__nav');
var navLinks = document.querySelectorAll('.navbar__nav-link');
var home = document.getElementById("home");
var r2link = document.querySelector('.navbar__brand');
var menuTab1 = document.getElementsByClassName("menu__tab")[0];
var accordionButton1 = document.getElementsByClassName("accordion__button")[0];
var screenWidth, currentScrollPos;

// ******** EVENT LISTENERS ******** //

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', function (event) {
  // Toggle the visibility of navContainer
  navContainer.classList.toggle('is-opened');
  if (navContainer.style.maxHeight) {
    // If navContainer is open, close it
    navContainer.style.maxHeight = null;
    // Set the toggler NOT to be aria-expanded
    togglerAriaNotExpanded();
    // Set the navlinks to be aria-hidden and tabindex = -1
    navLinkAriaHidden();
  } else {
    // If navContainer is closed, open it
    navContainer.style.maxHeight = navContainer.scrollHeight + "px";
    // Focus on the first menu item
    navLinks[0].focus();
    // Set the toggler to be aria-expanded
    togglerAriaExpanded();
    // Set the navlinks NOT to be aria-hidden and tabindex = 0
    navLinkAriaNotHidden();
  }
  event.stopPropagation();
});

// Hide the collapsible navbar when the nav link is clicked or when the user clicks anywhere outside of the navbar
document.addEventListener('click', closeNavbar);

//Check the screen size onload and assign appropriate aria attributes to HTML elements
window.addEventListener('load', checkScreenSize);

// Handle resize event with debounce
// 1. Close the navbar
// 2. Check the screen size and assign appropriate aria attributes to HTML elements
// 3. Check if needed to adjust the padding-top value of hero-image
window.addEventListener('resize', debounce(function () {
  closeNavbar();
  checkScreenSize();
  adjustHeroImagePadding();
  // if (window.innerWidth <= 900) {
  // Update the screenWidth variable with the current window width
  var screenWidth = window.innerWidth;
  if (screenWidth <= 350 || screenWidth <= 600 && screenWidth > 450) {
    navbar.style.top = "0";
  }
}, 50));

// Handle scroll event with debounce
// On screen wider than 900px, when the user scrolls down, hide the navbar.
// Show the navbar when the user scrolls up
var prevScrollPos = window.scrollY;
window.addEventListener('scroll', debounce(function () {
  var currentScrollPos = window.scrollY;

  // Update the screenWidth variable with the current window width
  var screenWidth = window.innerWidth;
  if (screenWidth > 650 || screenWidth <= 450 && screenWidth > 350) {
    navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-500px";
  }
  prevScrollPos = currentScrollPos;
}, 50));

// Keydown event when the menu is a collapsible navbar on small screen and is open
window.addEventListener('keydown', function (event) {
  var focusedElement = document.activeElement;
  var isNavLinkFocused = Array.prototype.includes.call(navLinks, focusedElement);
  if (navContainer.classList.contains('is-opened')) {
    switch (event.key) {
      // Close the open navbar menu by ESC key
      case 'Escape':
        event.preventDefault();
        closeNavbar();
        break;
      case 'Tab':
        if (event.shiftKey) {
          event.preventDefault();
          closeNavbar();
          navbarToggler.focus();
        } else {
          event.preventDefault();
          closeNavbar();
          menuTab1.focus();
          accordionButton1.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        navLinks[0].focus();
        break;
      case 'End':
        event.preventDefault();
        navLinks[navLinks.length - 1].focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (isNavLinkFocused) {
          var nextIndex = (Array.prototype.indexOf.call(navLinks, focusedElement) + 1) % navLinks.length;
          navLinks[nextIndex].focus();
        } else {
          navLinks[0].focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isNavLinkFocused) {
          var prevIndex = (Array.prototype.indexOf.call(navLinks, focusedElement) - 1 + navLinks.length) % navLinks.length;
          navLinks[prevIndex].focus();
        } else {
          navLinks[navLinks.length - 1].focus();
        }
        break;
    }
  }
});

// Keydown event when the menu is a menu bar on large screen
window.addEventListener('keydown', function (event) {
  var focusedElement = document.activeElement;
  var isNavLinkFocused = Array.prototype.includes.call(navLinks, focusedElement);
  if (isNavLinkFocused) {
    switch (event.key) {
      case 'Tab':
        if (event.shiftKey) {
          event.preventDefault();
          closeNavbar();
          r2link.focus();
        } else {
          event.preventDefault();
          closeNavbar();
          menuTab1.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        navLinks[0].focus();
        break;
      case 'End':
        event.preventDefault();
        navLinks[navLinks.length - 1].focus();
        break;
      case 'ArrowRight':
        event.preventDefault();
        // Get the index of the currently focused element
        var currentIndexRight = Array.prototype.indexOf.call(navLinks, focusedElement);
        // Calculate the index of the next element
        var nextIndexRight = (currentIndexRight + 1) % navLinks.length;
        navLinks[nextIndexRight].focus();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        // Get the index of the currently focused element
        var currentIndexLeft = Array.prototype.indexOf.call(navLinks, focusedElement);
        // Calculate the index of the previous element
        var prevIndexLeft = (currentIndexLeft - 1 + navLinks.length) % navLinks.length;
        navLinks[prevIndexLeft].focus();
        break;
    }
  }
});
menuTab1.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'Tab':
      if (event.shiftKey) {
        navbar.style.top = "0";
      }
      break;
  }
});
accordionButton1.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'Tab':
      if (event.shiftKey) {
        navbar.style.top = "0";
      }
      break;
  }
});

// ******** FUNCTIONS ******** //

// Debounce function to avoid the bouncing effect
function debounce(func, wait) {
  var timeout;
  return function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(_this, args);
    }, wait);
  };
}

// Functions to set / remove the aria attribute(s) of toggler (aria-expanded)
function togglerAriaExpanded() {
  navbarToggler.setAttribute('aria-expanded', 'true');
}
function togglerAriaNotExpanded() {
  navbarToggler.setAttribute('aria-expanded', 'false');
}
function togglerAriaRemoved() {
  navbarToggler.removeAttribute('aria-expanded', 'true');
  navbarToggler.removeAttribute('aria-expanded', 'false');
}

// Functions to set / remove the aria attributes of navlinks (tabindex and aria-hidden)
function navLinkAriaHidden() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
    navLinks[i].setAttribute('aria-hidden', 'true');
  }
}
function navLinkAriaNotHidden() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
    navLinks[i].setAttribute('aria-hidden', 'false');
  }
}
function navLinkAriaRemoved() {
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].removeAttribute('tabindex', '0');
    navLinks[i].removeAttribute('tabindex', '-1');
    navLinks[i].removeAttribute('aria-hidden', 'true');
    navLinks[i].removeAttribute('aria-hidden', 'false');
  }
}

// Function to close the collapsible navbar
function closeNavbar() {
  if (navContainer.classList.contains('is-opened')) {
    navContainer.style.maxHeight = null;
    navContainer.classList.remove('is-opened');
    togglerAriaNotExpanded();
    navLinkAriaHidden();
  }
}

// Function to adjust the padding top of the hero image according to the screen size
function adjustHeroImagePadding() {
  // Update the screenWidth variable with the current window width
  var screenWidth = window.innerWidth;

  // Check the screenWidth and adjust value of paddingTop accordingly
  home.style.paddingTop = screenWidth <= 350 || screenWidth <= 600 && screenWidth > 450 ? "70px" : "0px";
}

// Function to check the screen size and assign aria attributes to HTML elements
// For use when onload and onresize
function checkScreenSize() {
  var screenWidth = window.innerWidth;
  // On small screen, set the toggler to be aria-expanded,
  // set the navlinks to be aria-hidden and tabindex = -1
  if (screenWidth <= 576) {
    togglerAriaNotExpanded();
    navLinkAriaHidden();
    navList.setAttribute('role', 'menu');
  }
  // On large screen, remove the aria-expanded attribute of the toggler,
  // remove aria-hidden and tabindex attributes of navlinks
  else {
    togglerAriaRemoved();
    navLinkAriaRemoved();
    navList.setAttribute('role', 'menubar');
  }
}
'use strict';

// ******** VARIABLES ******** //

// Get all elements with the class "accordion__button"
var menuAccordion = document.getElementsByClassName("accordion__button");

// ******** EVENT LISTENERS ******** //

// Add event listener for window load to open active panels
window.addEventListener('load', openOrClosePanels);

// Add event listener for window resize to open active panels or remove aria attributes
window.addEventListener('resize', openOrClosePanels);

// Add event listener to the menu accordion to toggle panel open or close
for (var i = 0; i < menuAccordion.length; i++) {
  menuAccordion[i].addEventListener("click", function () {
    this.classList.toggle("accordion__button--active");
    var isActive = this.classList.contains("accordion__button--active");
    handlePanelState(this, isActive, true); // Always handle click events as small screen actions
  });
}

// ******** FUNCTIONS ******** //

// Function to handle panel state based on button and screen size
function handlePanelState(button, isActive, isSmallScreen) {
  var menuPanel = button.nextElementSibling;

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
  var isSmallScreen = window.innerWidth <= 450;
  for (var _i = 0; _i < menuAccordion.length; _i++) {
    var button = menuAccordion[_i];
    var isActive = button.classList.contains("accordion__button--active");
    handlePanelState(button, isActive, isSmallScreen);
  }
}
'use strict';

// Carousel for small & medium menu

// ******** VARIABLES ******** //

// Set the time for autoplay
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var time = 3.5; //3.5 seconds
var timeInterval = time * 1000 / 100;

// Get the elements in carousel
var carouselTrack = document.getElementById("carousel__track");
var slides = document.getElementsByClassName("carousel__slide");
var prevButton = document.querySelector(".carousel__prev-button");
var nextButton = document.querySelector(".carousel__next-button");
var playButton = document.querySelector(".carousel__play-button");
var pauseButton = document.querySelector(".carousel__pause-button");
var progressList = document.querySelector(".carousel__progress-list");
var progressContainers = document.getElementsByClassName("carousel__progress-container");
var progressBars = document.getElementsByClassName("carousel__progress-bar");
var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var bar3 = document.getElementById("bar3");

// Create variables for progress bar
var currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
var currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
var width = 0,
  memo,
  dynamicFrame;
var isPlay = true;

// ******** INITIALIZATION ******** //

// Initialize the slide index to the first slide
var slideIndex = 1;
showSlides(slideIndex);
progressStart();

// ******** EVENT LISTENERS ******** //

// Add event listeners to previous and next buttons
prevButton.addEventListener("click", function () {
  plusSlides(-1);
});
nextButton.addEventListener("click", function () {
  plusSlides(1);
});

// Add event listeners to play and pause buttons
pauseButton.addEventListener("click", function () {
  progressPause();
  togglePlayPauseButtons();
});
playButton.addEventListener("click", function () {
  progressResume();
  togglePlayPauseButtons();
});

// Add event listeners to progress list
progressList.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      plusSlides(-1);
      focusProgress();
      break;
    case 'ArrowRight':
      plusSlides(1);
      focusProgress();
      break;
    case 'Home':
      event.preventDefault();
      currentSlide(1);
      focusProgress();
      break;
    case 'End':
      event.preventDefault();
      currentSlide(3);
      focusProgress();
      break;
  }
});

// Add event listeners to each progress container
var _loop = function _loop(i) {
  progressContainers[i].addEventListener("click", function () {
    currentSlide(1 + i);
  });
};
for (var i = 0; i < progressContainers.length; i++) {
  _loop(i);
}

// ******** FUNCTIONS ******** //

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length || slideIndex > slides.length) {
    slideIndex = 1;
  }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all the slides by removing the 'current-slide' class
  for (var _i = 0; _i < slides.length; _i++) {
    slides[_i].classList.remove("current-slide");
    progressContainers[_i].classList.remove("current-container");
    progressBars[_i].classList.remove("current-bar");
    progressBars[_i].setAttribute("aria-selected", "false");
    progressBars[_i].setAttribute("tabindex", "-1");
  }

  // Show the current slide by adding the 'current-slide' class, and setting 'aria-current' attribute to true
  slides[slideIndex - 1].classList.add("current-slide");
  progressContainers[slideIndex - 1].classList.add("current-container");
  progressBars[slideIndex - 1].classList.add("current-bar");
  progressBars[slideIndex - 1].setAttribute("aria-selected", "true");
  progressBars[slideIndex - 1].removeAttribute("tabindex", "-1");
}

// Function to start the progress initially
function progressStart() {
  frame();
  dynamicFrame = setInterval(frame, timeInterval);
}

// Function for the progress bar to advance
function frame() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  if (width < 100) {
    width++;
    currentProgressBar.style.width = width + "%";
    memo = width;
  } else {
    clearInterval(dynamicFrame); // Clear the coming round
    currentProgressBar.blur();
    currentProgressBar.style.width = "0.75rem";
    slideIndex++; // Advance to the next slide
    showSlides(slideIndex);
    checkDotColor(slideIndex);
    resetProgressBar();
    progressStart();
    carouselTrack.setAttribute("aria-live", "off");
  }
}

// Function to change the dot color according to the slide position
function checkDotColor(slideIndex) {
  _toConsumableArray(progressBars).forEach(function (bar) {
    return bar.classList.remove("finished-bar");
  });
  if (slideIndex === 2) {
    bar1.classList.add("finished-bar");
  }
  if (slideIndex === 3) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
  }
}

// Helper function to reset the progress bar
function resetProgressBar() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  width = 0; // Reset width
  currentProgressBar.style.width = width + "%";
  memo = width;
}

// Function to pause the progress bar running
function progressPause() {
  carouselTrack.setAttribute("aria-live", "polite");
  isPlay = false;
  clearInterval(dynamicFrame);
}

// Function to resume the progress bar running
function progressResume() {
  carouselTrack.setAttribute("aria-live", "off");
  isPlay = true;
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  width = memo; // Restore the width from memo
  if (width < 100) {
    currentProgressBar.style.width = width + "%";
    progressStart();
  } else {
    currentProgressBar.style.width = "0.75rem";
    slideIndex++; // Advance to the next slide
    showSlides(slideIndex);
    resetProgressBar();
    progressStart();
  }
}

// Helper function to pre-update the carousel initiated by user
function preUpdateByUser() {
  clearInterval(dynamicFrame);
  carouselTrack.setAttribute("aria-live", "polite");
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  currentProgressBar.style.width = "0.75rem";
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  preUpdateByUser();
  slideIndex += n;
  showSlides(slideIndex);
  postUpdateByUser();
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  preUpdateByUser();
  slideIndex = n;
  showSlides(slideIndex);
  postUpdateByUser();
}

// Helper function to post-update the carousel initiated by user
function postUpdateByUser() {
  checkDotColor(slideIndex);
  resetProgressBar();
  if (isPlay) {
    progressStart();
  }
}

// Function to toggle play/pause button visibility and aria-hidden attribute
function togglePlayPauseButtons() {
  playButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
  playButton.setAttribute('aria-hidden', playButton.classList.contains("hidden"));
  pauseButton.setAttribute('aria-hidden', pauseButton.classList.contains("hidden"));
}

// Function to focus the progress container
function focusProgress() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  currentProgressBar.focus();
}
'use strict';

// ******** VARIABLES ******** //
var menuTabsContainer = document.querySelector(".menu__tabs");
var menuTabs = document.getElementsByClassName("menu__tab");
var currentTab = document.querySelector(".menu__tab--active");
var menus = document.getElementsByClassName("menu__panel");
var pastaTab = menuTabs[0];
var riceTab = menuTabs[1];
var sidesTab = menuTabs[2];
var i, currentTabIndex;

// ******** EVENT LISTENERS ******** //

menuTabsContainer.addEventListener('keydown', function (event) {
  menuTabs = document.getElementsByClassName("menu__tab");
  checkCurrentTabIndex();
  switch (event.key) {
    case 'ArrowLeft':
      currentTabIndex = currentTabIndex - 1;
      changeTabByKey(currentTabIndex);
      break;
    case 'ArrowRight':
      currentTabIndex = currentTabIndex + 1;
      changeTabByKey(currentTabIndex);
      break;
  }
});
pastaTab.addEventListener("click", function (event) {
  openMenu(event, "pasta-menu");
});
riceTab.addEventListener("click", function (event) {
  openMenu(event, "rice-menu");
});
sidesTab.addEventListener("click", function (event) {
  openMenu(event, "sides-menu");
});

// ******** INITIALIZATION ******** //

// Automatically click the tab with the ID "pasta-tab" to initialize the menu on page load
pastaTab.click();

// ******** FUNCTIONS ******** //

// Function to open a menu based on a tab click event
function openMenu(event, menuName) {
  menuTabs = document.getElementsByClassName("menu__tab");

  // Loop through each menu tab to deactivate it
  for (i = 0; i < menuTabs.length; i++) {
    menuTabs[i].classList.remove("menu__tab--active");
    menuTabs[i].setAttribute('aria-selected', 'false');
    menuTabs[i].setAttribute('tabindex', '-1');
  }

  // Activate the clicked tab
  event.currentTarget.classList.add("menu__tab--active");
  event.currentTarget.setAttribute('aria-selected', 'true');
  event.currentTarget.removeAttribute('tabindex', '-1');
  menus = document.getElementsByClassName("menu__panel");
  // Loop through each menu panel to hide it
  for (i = 0; i < menus.length; i++) {
    menus[i].style.display = "none";
  }

  // Display the selected menu panel
  document.getElementById(menuName).style.display = "grid";
}

// Function to check current tab index
function checkCurrentTabIndex() {
  var currentTab = document.querySelector(".menu__tab--active");
  switch (currentTab.id) {
    case "pasta-tab":
      currentTabIndex = 0;
      break;
    case "rice-tab":
      currentTabIndex = 1;
      break;
    case "sides-tab":
      currentTabIndex = 2;
      break;
  }
}

// Function to change the tab by current tab index
function changeTabByKey(currentTabIndex) {
  if (currentTabIndex === 0 || currentTabIndex > 2) {
    pastaTab.click();
    pastaTab.focus();
  } else if (currentTabIndex === 1) {
    riceTab.click();
    riceTab.focus();
  } else if (currentTabIndex === 2 || currentTabIndex < 0) {
    sidesTab.click();
    sidesTab.focus();
  }
}
'use strict';

// ******** FORM VARIABLES ******** //

// Get the form elements
var reservationForm = document.getElementById("reservation-form");
var submitButton = document.getElementById('formSumbitButton');
var confirmationMessage = document.getElementById("confirmation-message");
var closeButton = document.querySelector(".confirmation-message__close-button");
var confirmButton = document.querySelector(".confirmation-message__confirm-button");
var cancelButton = document.querySelector(".confirmation-message__cancel-button");
var modalTitle = document.getElementById("modalTitle");

// Get the form input elements
var nameInput = document.getElementById("name");
var phoneNumberInput = document.getElementById("phone");
var emailInput = document.getElementById("email");
var guestNumberInput = document.getElementById('guest-number');
var dateInput = document.getElementById('date');
var timeInput = document.getElementById('time');
var timeFirstOption = document.getElementById('time-first-option');
var messageInput = document.getElementById("optional-message");
var placeholderText = '(e.g. Dietary Restriction, Special Occasions)';

// Get the form error message of input elements
var nameError = document.getElementById("name-error");
var phoneNumberError = document.getElementById("phone-error");
var emailError = document.getElementById("email-error");
var guestNumberError = document.getElementById("guest-number-error");
var dateError = document.getElementById("date-error");
var timeError = document.getElementById("time-error");
var errorElements = [nameError, phoneNumberError, emailError, guestNumberError, dateError, timeError];

// Get the form output elements
var nameValue = document.getElementById("name-value");
var phoneValue = document.getElementById("phone-value");
var emailValue = document.getElementById("email-value");
var guestNumberValue = document.getElementById("guest-number-value");
var dateValue = document.getElementById("date-value");
var timeValue = document.getElementById("time-value");
var messageValue = document.getElementById("optional-message-value");
'use strict';

// Set default date for date picker
// If the cutoff time has yet to be reached, set today as default date
// If the cutoff time has been reached, set tomorrow as default date

// ******** VARIABLES ******** //

// Get date of today
var dateOfToday = new Date();
var today = getFormattedDate(dateOfToday);

// Get date of tomorrow
var dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
var tomorrow = getFormattedDate(dateOfTmr);

// ******** INITIALIZATION ******** //

// Generate default date when the page loads
generateDefaultDate();

// ******** FUNCTIONS ******** //

// Helper function to pad single digit numbers with leading zero
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

// Function to get the formatted date string (yyyy-mm-dd)
function getFormattedDate(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  return yyyy + "-" + pad(mm) + "-" + pad(dd);
}

// Function to set default date (.value) and prevent choosing invalid dates (.min)
function generateDefaultDate() {
  var tdyDay = dateOfToday.getDay();
  var tdyHour = dateOfToday.getHours();
  var tdyMinute = dateOfToday.getMinutes();
  var isAfterCutoff = function isAfterCutoff(cutoffHour) {
    return tdyHour > cutoffHour || tdyHour === cutoffHour && tdyMinute >= 1;
  };
  switch (tdyDay) {
    case 0:
      // Sunday
      setDefaultDate(isAfterCutoff(15));
      break;
    case 5: // Friday
    case 6:
      // Saturday
      setDefaultDate(isAfterCutoff(19));
      break;
    default:
      // Monday to Thursday
      setDefaultDate(isAfterCutoff(18));
  }

  // Helper function to set the default date and min date
  function setDefaultDate(isAfterCutoff) {
    if (isAfterCutoff) {
      dateInput.value = tomorrow;
      dateInput.min = tomorrow;
    } else {
      dateInput.value = today;
      dateInput.min = today;
    }
  }
}
'use strict';

// Set default time for time picker

// ******** INITIALIZATION ******** //

// Generate time options when the page loads
generateTimeOptions();

// Update default date and time every minute
// to ensure the booking time is not outdated
setInterval(updateAtSpecificTimes, 60 * 1000);

// ******** EVENT LISTENERS ******** //

// Add event listener to date input to generate time options
dateInput.addEventListener('input', generateTimeOptions);

// ******** FUNCTIONS ******** //

// Helper function to generate time options for a specific range
function generateOptionsForRange(endHour, currentHour, currentMinute) {
  for (var hour = 12; hour <= endHour; hour++) {
    for (var minute = 0; minute < 60; minute += 15) {
      if (hour === endHour && (minute === 15 || minute === 30 || minute === 45)) {
        continue;
      }
      if (hour > currentHour + 1 || hour === currentHour + 1 && minute >= currentMinute) {
        var optionText = hour + ':' + pad(minute);
        var option = new Option(optionText, optionText); // Set the value same as the text
        timeInput.add(option);
      }
    }
  }
}

// Function to generate time options based on current day and time
function generateTimeOptions() {
  var now = new Date();
  var dayIndex = now.getDay();
  var currentHour = now.getHours();
  var currentMinute = now.getMinutes();

  // Clear existing options (if any)
  timeInput.innerHTML = '';

  // Add initial option for time (placeholder: Select Time)
  timeInput.appendChild(timeFirstOption);
  if (dateInput.value === today) {
    switch (dayIndex) {
      case 0:
        // Sunday
        generateOptionsForRange(16, currentHour, currentMinute);
        break;
      case 5:
      case 6:
        // Friday & Saturday
        generateOptionsForRange(20, currentHour, currentMinute);
        break;
      default:
        // Monday to Thursday
        generateOptionsForRange(19, currentHour, currentMinute);
    }
  } else if (dateInput.value > today) {
    // If the chosen day is not today
    var selectedDate = new Date(dateInput.value);
    var chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0:
        // Sunday
        generateOptionsForRange(16, -1, -1);
        break;
      case 5:
      case 6:
        // Friday & Saturday
        generateOptionsForRange(20, -1, -1);
        break;
      default:
        // Monday to Thursday
        generateOptionsForRange(19, -1, -1);
    }
  }
}
function updateAtSpecificTimes() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  // Check if the current time is between 11am and 8pm
  if (currentHour >= 11 && currentHour < 20) {
    // Check if the current minute is 01, 16, 31, or 46
    if (currentMinute === 1 || currentMinute === 16 || currentMinute === 31 || currentMinute === 46) {
      generateDefaultDate();
      generateTimeOptions();
    }
  }
}
'use strict';

// ******** EVENT LISTENERS ******** //

// Add event listeners to option elements to change the text color to solid black color
guestNumberInput.addEventListener('change', function () {
  selectOption(guestNumberInput);
});
timeInput.addEventListener('change', function () {
  selectOption(timeInput);
});

// ******** FUNCTIONS ******** //

// Function to change the text color of selected option
function selectOption(selectedElement) {
  // Check if a valid option (not the disabled one) is selected
  if (selectedElement.value !== "") {
    // If a valid option is selected, add the 'valid' class to change its color
    selectedElement.classList.add('valid');
  } else {
    // If a valid option is yet to be selected, remove the 'valid' class to revert to its default color
    selectedElement.classList.remove('valid');
  }
}
'use strict';

// Textarea in reservation form
// 1. When on focus, clear placeholder 
// 2. When input is detected, change the text to solid color
// 3. When it is empty and loses focus, reset the placeholder

// ******** EVENT LISTENERS ******** //

// Clear placeholder when on focus
messageInput.addEventListener('focus', function () {
  if (messageInput.value.trim() === placeholderText) {
    messageInput.value = ''; // Clear the text
  }
});

// Change color of messageInput when user inputs
messageInput.addEventListener('input', function () {
  messageInput.classList.toggle('input', messageInput.value.trim() !== '');
});

// Reset the placeholder if the messageInput is empty when it loses focus
messageInput.addEventListener('blur', function () {
  if (messageInput.value.trim() === '') {
    messageInput.value = placeholderText;
    messageInput.classList.remove('input');
  }
});
'use strict';

// ******** EVENT LISTENERS ******** //
// the event listener for the form validation is in the popUpMessage.js

// ******** FUNCTIONS ******** //

// Form validation on clicking or pressing the submit button
// If the input is incorrect or empty, 
// show the error message and attach relevant class (styling) and aria-attributes to the elements
function validateUserImput() {
  //Validate name input
  var trimmedValue = nameInput.value.trim(); // Trim the input value

  if (nameInput.validity.patternMismatch || trimmedValue.length < 2 || nameInput.value === '') {
    nameInput.classList.add('error-input');
    nameInput.setAttribute('aria-describedby', 'name-error');
    nameInput.setAttribute('aria-invalid', 'true');
    nameError.style.display = "block";
  } else {
    nameInput.classList.remove('error-input');
    nameError.style.display = "none";
  }

  //Validate phone number input
  if (phoneNumberInput.validity.patternMismatch || phoneNumberInput.value === '') {
    phoneNumberInput.classList.add('error-input');
    phoneNumberInput.setAttribute('aria-describedby', 'phone-error');
    phoneNumberInput.setAttribute('aria-invalid', 'true');
    phoneNumberError.style.display = "block";
  } else {
    phoneNumberInput.classList.remove('error-input');
    phoneNumberError.style.display = "none";
  }

  //Validate email input
  if (emailInput.validity.patternMismatch || emailInput.value === '') {
    emailInput.classList.add('error-input');
    emailInput.setAttribute('aria-describedby', 'email-error');
    emailInput.setAttribute('aria-invalid', 'true');
    emailError.style.display = "block";
  } else {
    emailInput.classList.remove('error-input');
    emailError.style.display = "none";
  }

  //Validate guest number input
  if (guestNumberInput.value === '') {
    guestNumberInput.classList.add('error-input');
    guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
    guestNumberInput.setAttribute('aria-invalid', 'true');
    guestNumberError.style.display = "block";
  } else {
    guestNumberInput.classList.remove('error-input');
    guestNumberError.style.display = "none";
  }

  //Validate date input
  // Get the selected date from the date input field
  var selectedDate = new Date(dateInput.value);
  // Get the minimum allowed date from the min attribute of the date input field
  var minDate = new Date(dateInput.min);
  if (selectedDate < minDate || selectedDate === '') {
    dateInput.classList.add('error-input');
    dateInput.setAttribute('aria-describedby', 'date-error');
    dateInput.setAttribute('aria-invalid', 'true');
    dateError.style.display = "block";
  } else {
    dateInput.classList.remove('error-input');
    dateError.style.display = "none";
  }

  //Validate time input
  if (timeInput.value === '') {
    timeInput.classList.add('error-input');
    timeInput.setAttribute('aria-describedby', 'time-error');
    timeInput.setAttribute('aria-invalid', 'true');
    timeError.style.display = "block";
  } else {
    timeInput.classList.remove('error-input');
    timeError.style.display = "none";
  }

  // Alert the user about the erroneous input
  if (errorElements.some(function (element) {
    return element.style.display === "block";
  })) {
    alert("Please provide valid input.");
  }

  // Add event listeners to form elements after the first submission of form,
  // for ongoing validation of inputs
  nameInput.addEventListener('input', nameInputEvent);
  phoneNumberInput.addEventListener('input', phoneNumberInputEvent);
  emailInput.addEventListener('input', emailInputEvent);
  guestNumberInput.addEventListener('input', guestNumberInputEvent);
  dateInput.addEventListener('input', dateInputEvent);
  timeInput.addEventListener('input', timeInputEvent);
}
;

// Helper function to continuously validate name input after first submission
function nameInputEvent() {
  var letterPattern = /^[A-Za-z\.' \-]+$/;
  var trimmedValue = nameInput.value.trim(); // Trim the input value

  if (trimmedValue.length > 1 && letterPattern.test(trimmedValue)) {
    nameInput.classList.remove('error-input');
    nameInput.removeAttribute('aria-describedby', 'name-error');
    nameInput.removeAttribute('aria-invalid', 'true');
    nameError.style.display = "none";
  } else {
    nameInput.classList.add('error-input');
    nameInput.setAttribute('aria-describedby', 'name-error');
    nameInput.setAttribute('aria-invalid', 'true');
    nameError.style.display = "block";
  }
}

// Helper function to continuously validate phone number input after first submission
function phoneNumberInputEvent() {
  var numberPattern = /[0-9+]/g;
  if (phoneNumberInput.value.length > 6 && numberPattern.test(phoneNumberInput.value)) {
    phoneNumberInput.classList.remove('error-input');
    phoneNumberInput.removeAttribute('aria-describedby', 'phone-error');
    phoneNumberInput.removeAttribute('aria-invalid', 'true');
    phoneNumberError.style.display = "none";
  } else {
    phoneNumberInput.classList.add('error-input');
    phoneNumberInput.setAttribute('aria-describedby', 'phone-error');
    phoneNumberInput.setAttribute('aria-invalid', 'true');
    phoneNumberError.style.display = "block";
  }
}

// Helper function to continuously validate email input after first submission
function emailInputEvent() {
  var emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
  if (emailPattern.test(emailInput.value)) {
    emailInput.classList.remove('error-input');
    emailInput.removeAttribute('aria-describedby', 'email-error');
    emailInput.removeAttribute('aria-invalid', 'true');
    emailError.style.display = "none";
  } else {
    emailInput.classList.add('error-input');
    emailInput.setAttribute('aria-describedby', 'email-error');
    emailInput.setAttribute('aria-invalid', 'true');
    emailError.style.display = "block";
  }
}

// Helper function to continuously validate guest number input after first submission
function guestNumberInputEvent() {
  if (guestNumberInput.value === '') {
    guestNumberInput.classList.add('error-input');
    guestNumberInput.setAttribute('aria-describedby', 'guest-number-error');
    guestNumberInput.setAttribute('aria-invalid', 'true');
    guestNumberError.style.display = "block";
  } else {
    guestNumberInput.classList.remove('error-input');
    guestNumberInput.removeAttribute('aria-describedby', 'guest-number-error');
    guestNumberInput.removeAttribute('aria-invalid', 'true');
    guestNumberError.style.display = "none";
  }
}

// Helper function to continuously validate date input after first submission
function dateInputEvent() {
  // Get the selected date from the date input field
  var selectedDate = new Date(dateInput.value);
  // Get the minimum allowed date from the min attribute of the date input field
  var minDate = new Date(dateInput.min);
  if (selectedDate >= minDate) {
    dateInput.classList.remove('error-input');
    dateInput.removeAttribute('aria-describedby', 'date-error');
    dateInput.removeAttribute('aria-invalid', 'true');
    dateError.style.display = "none";
  } else {
    dateInput.classList.add('error-input');
    dateInput.setAttribute('aria-describedby', 'date-error');
    dateInput.setAttribute('aria-invalid', 'true');
    dateError.style.display = "block";
  }
}

// Helper function to continuously validate time input after first submission
function timeInputEvent() {
  if (timeInput.value === '') {
    timeInput.classList.add('error-input');
    timeInput.setAttribute('aria-describedby', 'time-error');
    timeInput.setAttribute('aria-invalid', 'true');
    timeError.style.display = "block";
  } else {
    timeInput.classList.remove('error-input');
    timeInput.removeAttribute('aria-describedby', 'time-error');
    timeInput.removeAttribute('aria-invalid', 'true');
    timeError.style.display = "none";
  }
}
'use strict';

// ******** EVENT LISTENERS ******** //

// Submit form upon confirmation of information
confirmButton.addEventListener("click", submitForm);

// Add an event listeners to the submit button to verify the inputs before the confirmation message pops up
submitButton.addEventListener('click', verifyInputs);
submitButton.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ' ':
    case 'Enter':
      verifyInputs(event);
      modalTitle = document.getElementById("modalTitle");
      modalTitle.focus();
      break;
  }
});

// Add an event listeners to the close button to close the message
closeButton.addEventListener("click", closeMessage);
closeButton.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ' ':
    case 'Enter':
      event.preventDefault();
      closeMessage();
      break;
  }
});

// Add an event listeners to the cancel button to close the message
cancelButton.addEventListener("click", closeMessage);
cancelButton.addEventListener('keydown', function (event) {
  switch (event.key) {
    case ' ':
    case 'Enter':
      event.preventDefault();
      closeMessage();
      break;
  }
});

// Keep the focus within the confirmation message when navigating by keyboard
// modalTitle is the first focusable element
// confirmButton is the last focusable element
modalTitle.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'Tab':
      if (event.shiftKey) {
        // Handle Shift + Tab
        event.preventDefault(); // Prevent default Tab behavior
        confirmButton = document.querySelector(".confirmation-message__confirm-button");
        confirmButton.focus();
      }
      break;
  }
});
confirmButton.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'Tab':
      if (event.shiftKey) {
        // Handle Shift + Tab
        // Default setting
      } else {
        event.preventDefault(); // Prevent default Tab behavior
        modalTitle = document.getElementById("modalTitle");
        modalTitle.focus();
      }
      break;
  }
});

// Add an event listener to the window to close the message
// If the confirmation message is popped up
window.addEventListener('keydown', function (event) {
  if (confirmationMessage.style.display === "flex") {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMessage();
    }
  }
});

// ******** FUNCTIONS ******** //

// Function to verify the inputs before the confirmation message pops up
function verifyInputs(event) {
  event.preventDefault();
  validateUserImput();
  if (errorElements.some(function (element) {
    return element.style.display === "block";
  })) {} else {
    openModal();
  }
}

// Function to open the modal when the user clicks the form submit button
function openModal() {
  confirmationMessage.style.display = "flex";
  confirmationMessage.setAttribute('aria-modal', 'true');

  // Copy the value of inputs or options in the form to confirmation message
  nameValue.textContent = nameInput.value;
  phoneValue.textContent = phoneNumberInput.value;
  emailValue.textContent = emailInput.value;
  guestNumberValue.textContent = guestNumberInput.value;
  dateValue.textContent = dateInput.value;
  timeValue.textContent = timeInput.options[timeInput.selectedIndex].text;

  // If the message input value is blank or default value,
  // the corresponding text in the confirmation message will be N/A
  if (messageInput.value === '' || messageInput.value === '(e.g. Dietary Restriction, Special Occasions)') {
    messageValue.textContent = "N/A";
  } else {
    // Encode the message input value to prevent HTML injection
    var encodedMessage = encodeHTML(messageInput.value);
    messageValue.innerHTML = encodedMessage;
  }
}

// Function to encode HTML entities
function encodeHTML(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/(\r\n|\n|\r)/g, '<br>'); // Preserve line breaks
}

// Function to submit form
function submitForm() {
  // Parse the selected date value from the form
  var selectedDateString = dateValue.innerText.trim(); // Get the date string and remove leading/trailing spaces
  var selectedDateComponents = selectedDateString.split('-');
  var selectedYear = parseInt(selectedDateComponents[0]);
  var selectedMonth = parseInt(selectedDateComponents[1]);
  var selectedDate = parseInt(selectedDateComponents[2]);

  // Set date of today as a benchmark date to do comparison
  var benchmarkDateComponents = today.split('-');
  var benchmarkYear = parseInt(benchmarkDateComponents[0]);
  var benchmarkMonth = parseInt(benchmarkDateComponents[1]);
  var benchmarkDate = parseInt(benchmarkDateComponents[2]);

  // console.log("selected date: " + selectedDate);
  // console.log("benchmark date: " + benchmarkDate);

  // Parse the selected time value from the form
  var timeString = timeValue.innerText.trim(); // Get the time string and remove leading/trailing spaces
  var timeComponents = timeString.split(':');
  var selectedHour = parseInt(timeComponents[0]);
  var selectedMinute = parseInt(timeComponents[1]);
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();

  // console.log("selected time: " + timeString);
  // console.log("current hour: " + currentHour);
  // console.log("current minute: " + currentMinute);

  // Check if the selected date is before today's date or if it's today but the selected time has passed
  if (selectedYear < benchmarkYear || selectedMonth < benchmarkMonth || selectedDate < benchmarkDate || selectedDate === benchmarkDate && (selectedHour < currentHour + 1 || selectedHour === currentHour + 1 && selectedMinute < currentMinute)) {
    alert("Please select another available day or time slot.");
    closeMessage();
    generateDefaultDate();
    generateTimeOptions();
  } else {
    // Trigger form submission
    reservationForm.submit();
    alert("Thanks for choosing our restaurant!\nWe will contact you shortly to confirm your reservation.");

    // Hide the following 2 lines if the PHP file is ready
    closeMessage();
    reservationForm.reset();
  }
}

// Function to close the message
function closeMessage() {
  confirmationMessage = document.getElementById("confirmation-message");
  submitButton = document.getElementById('formSumbitButton');
  confirmationMessage.style.display = "none";
  confirmationMessage.setAttribute('aria-modal', 'false');
  submitButton.focus();
}
'use strict';

// Automatically update the year for the copyright in footer
document.getElementById("year").textContent = dateOfToday.getFullYear();
//# sourceMappingURL=non-critical-legacy-script.js.map
