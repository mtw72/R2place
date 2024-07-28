'use strict';

// ******** VARIABLES ******** //

// Get the elements inside the navbar and the home section
const navbar = document.getElementById("navbar");
const navbarToggler = document.querySelector('.navbar__toggler');
const navContainer = document.querySelector('.navbar__collapse');
const navList = document.querySelector('.navbar__nav');
const navLinks = document.querySelectorAll('.navbar__nav-link');
const home = document.getElementById("home");
let screenWidth, currentScrollPos;


// ******** EVENT LISTENERS ******** //

// Show or hide the collapsible navbar when toggler is clicked
navbarToggler.addEventListener('click', (event) => {
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
window.addEventListener('resize', debounce(() => {
  closeNavbar();
  checkScreenSize();
  adjustHeroImagePadding();
  // if (window.innerWidth <= 900) {
  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;
  if (screenWidth <= 350 || (screenWidth <= 600 && screenWidth > 450)) {
    navbar.style.top = "0";
  }
}, 50));

// Handle scroll event with debounce
// On screen wider than 900px, when the user scrolls down, hide the navbar.
// Show the navbar when the user scrolls up
let prevScrollPos = window.scrollY;
window.addEventListener('scroll', debounce(() => {
  let currentScrollPos = window.scrollY;

  // Update the screenWidth variable with the current window width
  let screenWidth = window.innerWidth;
  if (screenWidth > 650 || (screenWidth <= 450 && screenWidth > 350)) {
    navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-500px";
  }
  prevScrollPos = currentScrollPos;
}, 50));

window.addEventListener('keydown', (event) => {
  const focusedElement = document.activeElement;
  const isNavLinkFocused = Array.prototype.includes.call(navLinks, focusedElement);
  const menuTab1 = (document.getElementsByClassName("menu__tab"))[0];
  const accordionButton1 = (document.getElementsByClassName("accordion__button"))[0];
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
          const nextIndex = (Array.prototype.indexOf.call(navLinks, focusedElement) + 1) % navLinks.length;
          navLinks[nextIndex].focus();
        } else {
          navLinks[0].focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isNavLinkFocused) {
          const prevIndex = (Array.prototype.indexOf.call(navLinks, focusedElement) - 1 + navLinks.length) % navLinks.length;
          navLinks[prevIndex].focus();
        } else {
          navLinks[navLinks.length - 1].focus();
        }
        break;
    }
  }
});

window.addEventListener('keydown', (event) => {
  const focusedElement = document.activeElement;
  const isNavLinkFocused = Array.prototype.includes.call(navLinks, focusedElement);
  const r2link = document.querySelector('.navbar__brand');
  const menuTab1 = (document.getElementsByClassName("menu__tab"))[0];
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
        const currentIndexRight = Array.prototype.indexOf.call(navLinks, focusedElement);
        // Calculate the index of the next element
        const nextIndexRight = (currentIndexRight + 1) % navLinks.length;
        navLinks[nextIndexRight].focus();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        // Get the index of the currently focused element
        const currentIndexLeft = Array.prototype.indexOf.call(navLinks, focusedElement);
        // Calculate the index of the previous element
        const prevIndexLeft = (currentIndexLeft - 1 + navLinks.length) % navLinks.length;
        navLinks[prevIndexLeft].focus();
        break;
    }
  }
});


// ******** FUNCTIONS ******** //

// Debounce function to avoid the bouncing effect
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
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
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '-1');
    navLinks[i].setAttribute('aria-hidden', 'true');
  }
}

function navLinkAriaNotHidden() {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].setAttribute('tabindex', '0');
    navLinks[i].setAttribute('aria-hidden', 'false');
  }
}

function navLinkAriaRemoved() {
  for (let i = 0; i < navLinks.length; i++) {
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
  let screenWidth = window.innerWidth;

  // Check the screenWidth and adjust value of paddingTop accordingly
  home.style.paddingTop = (screenWidth <= 350 || (screenWidth <= 600 && screenWidth > 450)) ? "70px" : "0px";
}

// Function to check the screen size and assign aria attributes to HTML elements
// For use when onload and onresize
function checkScreenSize() {
  let screenWidth = window.innerWidth;
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