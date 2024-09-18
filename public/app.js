//app.js

//imports
import {createLoginForm} from '../pages/login.js';
import { createRegistrationForm } from '../pages/register.js';

// Initialize the application
function initApp() {
  const appDiv = document.getElementById('app');
  // Render the login form initially
  appDiv.appendChild(createLoginForm());

  // Add a click event listener to switch to the registration form
  appDiv.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'register-link') {
      appDiv.innerHTML = ''; // Clear the current content
      appDiv.appendChild(createRegistrationForm()); // Render the registration form
    }
    if (event.target && event.target.id === 'login-link') {
      appDiv.innerHTML = ''; // Clear the current content
      appDiv.appendChild(createLoginForm()); // Render the login form
    }
  });
}

// Call the function to initialize the app
window.onload = initApp;