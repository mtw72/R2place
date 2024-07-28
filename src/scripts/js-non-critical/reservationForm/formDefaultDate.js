'use strict';

// Set default date for date picker
// If the cutoff time has yet to be reached, set today as default date
// If the cutoff time has been reached, set tomorrow as default date


// ******** VARIABLES ******** //

// Get date of today
const dateOfToday = new Date();
const today = getFormattedDate(dateOfToday);

// Get date of tomorrow
const dateOfTmr = new Date(new Date().setDate(dateOfToday.getDate() + 1));
const tomorrow = getFormattedDate(dateOfTmr);


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
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return yyyy + "-" + pad(mm) + "-" + pad(dd);
}

// Function to set default date (.value) and prevent choosing invalid dates (.min)
function generateDefaultDate() {
  const tdyDay = dateOfToday.getDay();
  const tdyHour = dateOfToday.getHours();
  const tdyMinute = dateOfToday.getMinutes();

  const isAfterCutoff = (cutoffHour) => {
    return tdyHour > cutoffHour || (tdyHour === cutoffHour && tdyMinute >= 1);
  };

  switch (tdyDay) {
    case 0: // Sunday
      setDefaultDate(isAfterCutoff(15));
      break;
    case 5: // Friday
    case 6: // Saturday
      setDefaultDate(isAfterCutoff(19));
      break;
    default: // Monday to Thursday
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