//app.js
//imports
import { createLoginForm } from '../pages/login.js';
import { createPasswordPopup } from '../pages/passwordSet.js';
import { createHomepage } from '../pages/homepage.js'; // New import for homepage

// Function to load CSS dynamically
function loadCSS(filename) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  document.head.appendChild(link);
}

// Initialize the application
function initApp() {
  const appDiv = document.getElementById('app');

  // Initial login form rendering
  loadCSS('/css/login.css');
  appDiv.appendChild(createLoginForm());
  console.log("Login form loaded");

  // Handle login form submission
  appDiv.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload on form submission
    console.log("Login form submitted");

    appDiv.innerHTML = ''; // Clear the current content
    loadCSS('/css/passwordSet.css'); // Load password CSS

    // Render password popup
    createPasswordPopup(function onPasswordSet() {
      // Callback when password is set successfully
      appDiv.innerHTML = ''; // Clear content after password is set
      loadCSS('/css/homepage.css'); // Load homepage CSS
      appDiv.appendChild(createHomepage()); // Render homepage content
      console.log("Homepage loaded");

      // Update the URL without reloading the page
      window.location.hash = "#homepage";
      
    });
  });
}

// Call the function to initialize the app
window.onload = initApp;
