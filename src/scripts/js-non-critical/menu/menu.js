'use strict';

// ******** VARIABLES ******** //

const menuTabsContainer = document.querySelector(".menu__tabs");
let menuTabs = document.getElementsByClassName("menu__tab");
let currentTab = document.querySelector(".menu__tab--active");
let menus = document.getElementsByClassName("menu__panel");
const pastaTab = menuTabs[0];
const riceTab = menuTabs[1];
const sidesTab = menuTabs[2];
let i, currentTabIndex;


// ******** EVENT LISTENERS ******** //

menuTabsContainer.addEventListener('keydown', (event) => {
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

pastaTab.addEventListener("click", (event) => {
  openMenu(event, "pasta-menu");
});

riceTab.addEventListener("click", (event) => {
  openMenu(event, "rice-menu");
});

sidesTab.addEventListener("click", (event) => {
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
  const currentTab = document.querySelector(".menu__tab--active");
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