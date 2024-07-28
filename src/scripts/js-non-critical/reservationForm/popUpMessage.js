'use strict';

// ******** EVENT LISTENERS ******** //

// Submit form upon confirmation of information
confirmButton.addEventListener("click", submitForm);

// Add an event listeners to the submit button to verify the inputs before the confirmation message pops up
submitButton.addEventListener('click', verifyInputs);

submitButton.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
        case 'Enter':
            verifyInputs(event);
            modalTitle = document.getElementById("modalTitle");
            modalTitle.focus();
            break;
    }
})

// Add an event listeners to the close button to close the message
closeButton.addEventListener("click", closeMessage);

closeButton.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
        case 'Enter':
            event.preventDefault();
            closeMessage();
            break;
    }
})

// Add an event listeners to the cancel button to close the message
cancelButton.addEventListener("click", closeMessage);

cancelButton.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
        case 'Enter':
            event.preventDefault();
            closeMessage();
            break;
    }
})

// Keep the focus within the confirmation message when navigating by keyboard
// modalTitle is the first focusable element
// confirmButton is the last focusable element
modalTitle.addEventListener('keydown', (event) => {
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

confirmButton.addEventListener('keydown', (event) => {
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
window.addEventListener('keydown', (event) => {
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
    if (errorElements.some(element => element.style.display === "block")) {
    } else {
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
    timeValue.textContent = timeInput.options[timeInput.selectedIndex].text

    // If the message input value is blank or default value,
    // the corresponding text in the confirmation message will be N/A
    if (messageInput.value === '' || messageInput.value === '(e.g. Dietary Restriction, Special Occasions)') {
        messageValue.textContent = "N/A";
    } else {
        // Encode the message input value to prevent HTML injection
        const encodedMessage = encodeHTML(messageInput.value);
        messageValue.innerHTML = encodedMessage;
    }
}

// Function to encode HTML entities
function encodeHTML(text) {
    return text.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/(\r\n|\n|\r)/g, '<br>'); // Preserve line breaks
}

// Function to submit form
function submitForm() {
    // Parse the selected date value from the form
    const selectedDateString = dateValue.innerText.trim(); // Get the date string and remove leading/trailing spaces
    const selectedDateComponents = selectedDateString.split('-');
    const selectedYear = parseInt(selectedDateComponents[0]);
    const selectedMonth = parseInt(selectedDateComponents[1]);
    const selectedDate = parseInt(selectedDateComponents[2]);

    // Set date of today as a benchmark date to do comparison
    const benchmarkDateComponents = today.split('-');
    const benchmarkYear = parseInt(benchmarkDateComponents[0]);
    const benchmarkMonth = parseInt(benchmarkDateComponents[1]);
    const benchmarkDate = parseInt(benchmarkDateComponents[2]);

    // console.log("selected date: " + selectedDate);
    // console.log("benchmark date: " + benchmarkDate);

    // Parse the selected time value from the form
    const timeString = timeValue.innerText.trim(); // Get the time string and remove leading/trailing spaces
    const timeComponents = timeString.split(':');
    const selectedHour = parseInt(timeComponents[0]);
    const selectedMinute = parseInt(timeComponents[1]);

    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();

    // console.log("selected time: " + timeString);
    // console.log("current hour: " + currentHour);
    // console.log("current minute: " + currentMinute);

    // Check if the selected date is before today's date or if it's today but the selected time has passed
    if (selectedYear < benchmarkYear || selectedMonth < benchmarkMonth || selectedDate < benchmarkDate || (selectedDate === benchmarkDate && (selectedHour < currentHour + 1 || (selectedHour === currentHour + 1 && selectedMinute < currentMinute)))) {
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