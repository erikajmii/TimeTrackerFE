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
async function login() {
  try {
    const loginRequest = {
      NetID: document.getElementById('NetID').value,
      Password: document.getElementById('password').value,
    };

    const url = 'http://localhost:5264/api/auth/login';

    const formBody = new URLSearchParams(loginRequest);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    if (response.ok) {
      const result = await response.json();

      if (result.requiresPasswordChange) {
        alert('Password change required');
      } else {
        alert('Login successful');
      }
    } else {
      const error = await response.text();
      alert('Error: ' + error);
    }
  } catch (ex) {
    alert('Error: ' + ex.message);
  }
}

function initApp() {
  const appDiv = document.getElementById('app');

  // Initial login form rendering
  loadCSS('/css/login.css');
  appDiv.appendChild(createLoginForm());
  console.log('Login form loaded');

  // Handle login form submission
  appDiv.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Login form submitted');

    try {
      const loginResponse = await login();
      console.log('Login successful:', loginResponse);

      appDiv.innerHTML = '';
      loadCSS('/css/passwordSet.css');

      /* createPasswordPopup(function onPasswordSet() {
        appDiv.innerHTML = '';
        loadCSS('/css/homepage.css');
        appDiv.appendChild(createHomepage());
        console.log('Homepage loaded');

        setupNavigation(); 
        window.location.hash = '#home';
      }); */
      
      appDiv.innerHTML = '';
      loadCSS('/css/homepage.css');
      appDiv.appendChild(createHomepage());
      console.log('Homepage loaded');

      setupNavigation(); 
      window.location.hash = '#home';

    } catch (error) {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = error.message || 'Login failed. Please try again.';
      errorMessage.style.color = 'red';
      appDiv.appendChild(errorMessage);
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