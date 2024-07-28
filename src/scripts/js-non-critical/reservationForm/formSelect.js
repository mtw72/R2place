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