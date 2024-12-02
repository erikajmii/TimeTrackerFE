// Written by Varsha Mallepalli 
// Written by Erika Mii 

// imports
import { createLoginForm } from '../pages/login.js'; // Import the login form
import { createPasswordPopup } from '../pages/passwordSet.js'; // Import the password change popup
import { createHomepage } from '../pages/homepage.js'; // Import the homepage
import { createTimeLogsPage } from '../pages/timelogs.js'; // Import the time logs page
import { createPeerReviewPage } from '../pages/peerreview.js'; // Import the peer review page

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
function renderPage() {
  const appDiv = document.getElementById('app');
  const currentHash = window.location.hash.substring(1); // Remove the '#' character

  appDiv.innerHTML = ''; // Clear the current content

  switch (currentHash) {
    case 'timelogs':
      loadCSS('/css/timeLogs.css');
      appDiv.appendChild(createTimeLogsPage());
      console.log('Time Logs page loaded');
      break;
    case 'peerreview':
      loadCSS('/css/peerreview.css');
      appDiv.appendChild(createPeerReviewPage());
      console.log('Peer Review page loaded');
      break;
    case 'home':
    default:
      loadCSS('/css/homepage.css');
      appDiv.appendChild(createHomepage());
      console.log('Homepage loaded');
      break;
  }
}

// Navigation setup
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  // Add click event listener to each navigation item
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetHash = e.target.getAttribute('href');
      window.location.hash = targetHash; // Update the URL hash
    });
  });

  // Render the page on hash change
  window.addEventListener('hashchange', renderPage);

  // Render the current page on initial load
  renderPage();
}

window.onload = initApp; // Initialize the application
