'use strict';

// ******** FORM VARIABLES ******** //

// Get the form elements
const reservationForm = document.getElementById("reservation-form");
let submitButton = document.getElementById('formSumbitButton');
let confirmationMessage = document.getElementById("confirmation-message");
const closeButton = document.querySelector(".confirmation-message__close-button");
let confirmButton = document.querySelector(".confirmation-message__confirm-button");
const cancelButton = document.querySelector(".confirmation-message__cancel-button");
let modalTitle = document.getElementById("modalTitle");

// Get the form input elements
let nameInput = document.getElementById("name");
let phoneNumberInput = document.getElementById("phone");
let emailInput = document.getElementById("email");
let guestNumberInput = document.getElementById('guest-number');
let dateInput = document.getElementById('date');
let timeInput = document.getElementById('time');
const timeFirstOption = document.getElementById('time-first-option');
let messageInput = document.getElementById("optional-message");
const placeholderText = '(e.g. Dietary Restriction, Special Occasions)';

// Get the form error message of input elements
const nameError = document.getElementById("name-error");
const phoneNumberError = document.getElementById("phone-error");
const emailError = document.getElementById("email-error");
const guestNumberError = document.getElementById("guest-number-error");
const dateError = document.getElementById("date-error");
const timeError = document.getElementById("time-error");
const errorElements = [nameError, phoneNumberError, emailError, guestNumberError, dateError, timeError];

// Get the form output elements
let nameValue = document.getElementById("name-value");
let phoneValue = document.getElementById("phone-value");
let emailValue = document.getElementById("email-value");
let guestNumberValue = document.getElementById("guest-number-value");
let dateValue = document.getElementById("date-value");
let timeValue = document.getElementById("time-value");
let messageValue = document.getElementById("optional-message-value");