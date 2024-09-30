//app.js

//imports
import {createLoginForm} from '../pages/login.js';
import { createPasswordPopup } from '../pages/passwordSet.js';

// Initialize the application
function initApp() {
  const appDiv = document.getElementById('app');
  // Render the login form initially
  appDiv.appendChild(createLoginForm());

  // Add a click event listener to switch to the set password form
  appDiv.addEventListener('submit', function(event) {
    appDiv.innerHTML = ''; // Clear the current content
    appDiv.appendChild(createPasswordPopup()); // Render the set password form
  });
}

// Call the function to initialize the app
window.onload = initApp;