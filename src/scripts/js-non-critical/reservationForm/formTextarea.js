'use strict';
// Textarea in reservation form
// 1. When on focus, clear placeholder 
// 2. When input is detected, change the text to solid color
// 3. When it is empty and loses focus, reset the placeholder


// ******** EVENT LISTENERS ******** //

// Clear placeholder when on focus
messageInput.addEventListener('focus', () => {
  if (messageInput.value.trim() === placeholderText) {
    messageInput.value = ''; // Clear the text
  }
});

// Change color of messageInput when user inputs
messageInput.addEventListener('input', () => {
  messageInput.classList.toggle('input', messageInput.value.trim() !== '');
});

// Reset the placeholder if the messageInput is empty when it loses focus
messageInput.addEventListener('blur', () => {
  if (messageInput.value.trim() === '') {
    messageInput.value = placeholderText;
    messageInput.classList.remove('input');
  }
});