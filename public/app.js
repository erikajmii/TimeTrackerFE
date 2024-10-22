// imports
import { createLoginForm } from '../pages/login.js'; // Import the login form
import { createPasswordPopup } from '../pages/passwordSet.js'; // Import the password change popup
import { createHomepage } from '../pages/homepage.js'; // Import the homepage
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
          body: formBody,
          credentials: 'include'
      });

    if (response.ok) {  // Check if response status is OK
      const result = await response.json();  // Parse JSON response
      if (result.requiresPasswordChange) {
          alert("Password change required");  // Display alert in JS
          // Assuming the token is received in result.message
          document.cookie = `jwt=${result.message}; path=/; secure; HttpOnly`; // Set cookie
          return result;
      } else {
          alert("Login successful");
          // Set the JWT token in a cookie
          document.cookie = `jwt=${result.message}; path=/; secure; HttpOnly`; // Set cookie
          return result;
      }
  }
  } catch (ex) {
      alert("Error: " + ex.message);  // Catch and display any other exceptions
  }
}

// Function to update the password in the backend
const updatePassword = async (netID, newPassword) => {
  try {
    //call the api
    const response = await fetch('http://localhost:5264/api/auth/update-password', {
        method: 'PATCH',
        credentials: 'include', // make sure cookies are sent
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ Password: newPassword }) 
    });

    //if repsonse is okay
    if (response.ok) {
        console.log('Password updated successfully');
        return true; 
    } else {
        //if there is an error
        const errorText = await response.text(); 
        console.error('Error updating password:', response.statusText, errorText);
        return false; 
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return false; 
  }
};

function initApp() {
  const appDiv = document.getElementById('app');

  // Initial login form rendering
  loadCSS('/css/login.css');
  appDiv.appendChild(createLoginForm());
  console.log('Login form loaded');

  appDiv.addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("Login form submitted");

    const loginResponse = await login();

    console.log("after awaiting");
    console.log(loginResponse);

    if (loginResponse && loginResponse.requiresPasswordChange) {
        appDiv.innerHTML = '';
        loadCSS('/css/passwordSet.css');
        createPasswordPopup(async function onPasswordSet(newPassword) {
          const netID = loginResponse.NetID; // Get NetID from the login response
          const passwordUpdateSuccess = await updatePassword(netID, newPassword); // Pass the NetID and new password
        
          if (passwordUpdateSuccess) {
              appDiv.innerHTML = '';
              loadCSS('/css/homepage.css');
              appDiv.appendChild(createHomepage());
              //window.location.hash = "#home";
              setupNavigation();
              window.location.hash = '#home';
          }
        });
    } else if (loginResponse && !loginResponse.requiresPasswordChange) {
        appDiv.innerHTML = '';
        loadCSS('/css/homepage.css');
        appDiv.appendChild(createHomepage());
        console.log("homepage loaded");
        //window.location.hash = "#home";
        setupNavigation();
        window.location.hash = '#home';
    }
});
}

// Navigation between different pages
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item'); 
  const appDiv = document.getElementById('app'); 

  // Loop through each nav item and attach event listeners
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); 

      const targetPage = e.target.getAttribute('href').substring(1);
      appDiv.innerHTML = '';

      // Load the correct page based on the target
      switch (targetPage) {
        case 'home':
          loadCSS('/css/homepage.css');
          appDiv.appendChild(createHomepage());
          break;
        case 'timelogs':
          loadCSS('/css/timeLogs.css');
          appDiv.appendChild(createTimeLogsPage());
          console.log('Time Logs page loaded');
          break;
        case 'peerreview':
          break;
        case 'profile':
          break;
        default:
          console.error('Unknown page:', targetPage);
      }

      // Update the URL hash without reloading the page
      window.location.hash = `#${targetPage}`;
    });
  });

  // Load the page based on the current hash on page load
  const currentHash = window.location.hash.substring(1);
  if (currentHash) {
    document.querySelector(`a[href="#${currentHash}"]`).click();
  } else {
    document.querySelector('a[href="#home"]').click();
  }
}

window.onload = initApp;
