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
  for (let hour = 12; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (hour === endHour && (minute === 15 || minute === 30 || minute === 45)) {
        continue;
      }
      if (hour > currentHour + 1 || (hour === currentHour + 1 && minute >= currentMinute)) {
        const optionText = hour + ':' + pad(minute);
        const option = new Option(optionText, optionText); // Set the value same as the text
        timeInput.add(option);
      }
    }
  }
}

// Function to generate time options based on current day and time
function generateTimeOptions() {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Clear existing options (if any)
  timeInput.innerHTML = '';

  // Add initial option for time (placeholder: Select Time)
  timeInput.appendChild(timeFirstOption);

  if (dateInput.value === today) {
    switch (dayIndex) {
      case 0: // Sunday
        generateOptionsForRange(16, currentHour, currentMinute);
        break;
      case 5:
      case 6: // Friday & Saturday
        generateOptionsForRange(20, currentHour, currentMinute);
        break;
      default: // Monday to Thursday
        generateOptionsForRange(19, currentHour, currentMinute);
    }
  }
  else if (dateInput.value > today) {
    // If the chosen day is not today
    const selectedDate = new Date(dateInput.value);
    const chosenDay = selectedDate.getDay();
    switch (chosenDay) {
      case 0: // Sunday
        generateOptionsForRange(16, -1, -1);
        break;
      case 5:
      case 6: // Friday & Saturday
        generateOptionsForRange(20, -1, -1);
        break;
      default: // Monday to Thursday
        generateOptionsForRange(19, -1, -1);
    }
  }
}

function updateAtSpecificTimes() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();

  // Check if the current time is between 11am and 8pm
  if (currentHour >= 11 && currentHour < 20) {
    // Check if the current minute is 01, 16, 31, or 46
    if (currentMinute === 1 || currentMinute === 16 || currentMinute === 31 || currentMinute === 46) {
      generateDefaultDate();
      generateTimeOptions();
    }
  }
}