//app.js
//imports
import { createLoginForm } from '../pages/login.js';
import { createPasswordPopup } from '../pages/passwordSet.js';
import { createHomepage } from '../pages/homepage.js'; // New import for homepage
import { createTimeLogsPage } from '../pages/timelogs.js'; // Import the time logs page

// Function to load CSS dynamically
function loadCSS(filename) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = filename;
  document.head.appendChild(link);
}

// Function to call the backend for login
async function login() {
  try {
      const loginRequest = {
          NetID: document.getElementById('NetID').value,  // Assuming _netId is defined in your JS code
          Password: document.getElementById('password').value  // Assuming _password is defined in your JS code
      };

      const url = "http://localhost:5264/api/auth/login";

      // Convert the loginRequest object into URL-encoded form data
      const formBody = new URLSearchParams(loginRequest);

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
      });

      if (response.ok) {  // Check if response status is OK
          const result = await response.json();  // Parse JSON response

          if (result.requiresPasswordChange) {
              alert("Password change required");  // Display alert in JS
          } else {
              alert("Login successful");
          }
      } else {
          const error = await response.text();  // Get error message as plain text
          alert("Error: " + error);
      }
  } catch (ex) {
      alert("Error: " + ex.message);  // Catch and display any other exceptions
  }
}

function initApp() {
  const appDiv = document.getElementById('app');

  // Initial login form rendering
  loadCSS('/css/login.css');
  appDiv.appendChild(createLoginForm());
  console.log("Login form loaded");

  // Handle login form submission
  appDiv.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent page reload on form submission
    console.log("Login form submitted");

    // Call the login function and handle response
    try {
      const loginResponse = await login();
      console.log("Login successful:", loginResponse);

      // Clear the current content after login success
      appDiv.innerHTML = '';
      loadCSS('/css/passwordSet.css'); // Load password CSS

      // Render password popup
      createPasswordPopup(function onPasswordSet() {
        // Callback when password is set successfully
        appDiv.innerHTML = ''; // Clear content after password is set
        loadCSS('/css/homepage.css'); // Load homepage CSS
        appDiv.appendChild(createHomepage()); // Render homepage content
        console.log("Homepage loaded");

        // Set up navigation for homepage links
        setupNavigation();
        
        // Update the URL without reloading the page
        window.location.hash = "#homepage";
      });
    } catch (error) {
      // Handle login error, e.g., show error message to the user
      const errorMessage = document.createElement('p');
      errorMessage.textContent = error.message || "Login failed. Please try again.";
      errorMessage.style.color = 'red';
      appDiv.appendChild(errorMessage);
    }
  });
}

// Function to set up navigation for different pages
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const appDiv = document.getElementById('app');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = e.target.getAttribute('href').substring(1);

      // Update navigation highlighting
      navItems.forEach(nav => nav.classList.remove('active'));
      e.target.classList.add('active');

      // Render the corresponding page based on the target
      switch (targetPage) {
        case 'homepage':
          appDiv.innerHTML = '';
          loadCSS('/css/homepage.css');
          appDiv.appendChild(createHomepage());
          break;
        case 'timelogs':
          appDiv.innerHTML = '';
          loadCSS('/css/timeLogs.css'); // Ensure you have a CSS file for the Time Logs page
          appDiv.appendChild(createTimeLogsPage());
          console.log("Time Logs page loaded");
          break;
        // Add more cases for additional pages (e.g., Peer Review, Profile, etc.)
        default:
          console.error("Unknown page:", targetPage);
      }
      
      // Update the URL without reloading the page
      window.location.hash = `#${targetPage}`;
    });
  });
}

// Call the function to initialize the app
window.onload = initApp;
