'use strict';

// ******** EVENT LISTENERS ******** //
// the event listener for the form validation is in the popUpMessage.js


// ******** FUNCTIONS ******** //

// Form validation on clicking or pressing the submit button
// If the input is incorrect or empty, 
// show the error message and attach relevant class (styling) and aria-attributes to the elements
function validateUserImput() {

    //Validate name input
    const trimmedValue = nameInput.value.trim(); // Trim the input value

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
    const selectedDate = new Date(dateInput.value);
    // Get the minimum allowed date from the min attribute of the date input field
    const minDate = new Date(dateInput.min);

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
    if (errorElements.some(element => element.style.display === "block")) {
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
};

// Helper function to continuously validate name input after first submission
function nameInputEvent() {
    const letterPattern = /^[A-Za-z\.' \-]+$/;
    const trimmedValue = nameInput.value.trim(); // Trim the input value

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
    const numberPattern = /[0-9+]/g;

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
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

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
    const selectedDate = new Date(dateInput.value);
    // Get the minimum allowed date from the min attribute of the date input field
    const minDate = new Date(dateInput.min);

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