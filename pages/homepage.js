// Written by Varsha Mallepalli 
// Written by Erika Mii 

export function createHomepage() {
  // Create the main div for the homepage content
  const homepageDiv = document.createElement('div');

  // Create and set up the header section
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="header-content">
      <h1>Time Tracker</h1>
    </div>
  `;

  // Create the main container for the sidebar and content area
  const container = document.createElement('div');
  container.classList.add('container');

  // Create the sidebar navigation
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');
  sidebar.innerHTML = `
    <ul>
      <li><a href="#home" class="nav-item">Home</a></li>
      <li><a href="#timelogs" class="nav-item">Timelogs</a></li>
      <li><a href="#peerreview" class="nav-item">Peer Review</a></li>
      <li><a href="#profile" class="nav-item">Profile</a></li>
    </ul>
  `;

  // Create a container for the main content sections
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container');

  // Create the "This Week" section
  const thisWeekSection = document.createElement('section');
  thisWeekSection.classList.add('this-week');

  thisWeekSection.innerHTML = `
    <h2>This Week</h2>
    <h3 class="current-week-range">${getCurrentWeekRange()}</h3>
    <table class="this-week-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time Spent (hh:mm)</th>
          <th>What Was Accomplished</th>
        </tr>
      </thead>
      <tbody id="this-week-entries">
      </tbody>
    </table>
  `;


  // Create the "New Entry" form section
  const newEntrySection = document.createElement('section');
  newEntrySection.classList.add('new-entry');
  newEntrySection.innerHTML = `
    <h2>New Entry</h2>
    <form id="entry-form">
      <label for="entry-date">Date:</label>
      <input type="date" id="entry-date" required>

      <label for="entry-time">Time Spent (HH:MM)</label>
      <input type="text" id="entry-time" required pattern="^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$">

      <label for="account-description">Account of what you did:</label>
      <textarea id="account-description" minlength="30" required></textarea>
      <small id="description-warning" style="color:red;display:none;">Description must be at least 30 characters long.</small>

      <button type="submit">Submit Entry</button>
    </form>

    <p id="form-success" style="display:none;color:green;">Entry submitted successfully!</p>
  `;

  // Append the individual sections to the content container
  contentContainer.appendChild(thisWeekSection);
  contentContainer.appendChild(newEntrySection);

  // Add the sidebar and content container to the main container
  container.appendChild(sidebar);
  container.appendChild(contentContainer);

  // Add the header and main container to the homepage div
  homepageDiv.appendChild(header);
  homepageDiv.appendChild(container);

  // Function to convert HH:MM to minutes
  function convertToMinutes(time) {
    console.log("time: ");
    console.log(time);
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
  }

  function convertMinutesToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);  // Calculate hours
    const remainingMinutes = minutes % 60;  // Calculate remaining minutes
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
  }

  // Set today's date as min and max for the date input field
  const today = new Date().toISOString().split('T')[0]; // Format the current date as YYYY-MM-DD

 // Add event listener for form validation on submission
 const form = newEntrySection.querySelector('#entry-form');

 //inputs from entry form
 const dateInput = newEntrySection.querySelector('#entry-date');
 dateInput.min = today; // Set the minimum date to today
 dateInput.max = today; // Set the maximum date to today, limiting input to today's date only
 const entryTimeInput = newEntrySection.querySelector('#entry-time');
 const accountDescription = newEntrySection.querySelector('#account-description');
 const descriptionWarning = newEntrySection.querySelector('#description-warning');

 //on pressing sumbit
 form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // make sure the user is entering over 30 characters for the description
  if (accountDescription.value.length < 30) {
    descriptionWarning.style.display = 'block';
    return;
  } else {
    descriptionWarning.style.display = 'none';
  }

  //retrieve inputs 
  const entryDate = dateInput.value;
  const entryTime = convertToMinutes(entryTimeInput.value); //this will convert HH:MM to minutes 
  console.log("This is the entry time that was sent to backend:");
  console.log(entryTime);
  const description = accountDescription.value;

  // checking to see if the form data is correct
  console.log('Form Data:', {
    entryDate,
    entryTime, 
    description,
  });

  // Post to the backend
  try {
    const response = await fetch('http://localhost:5264/api/timelogs/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'include',
      body: new URLSearchParams({
        date: entryDate, 
        Duration: entryTime, 
        description  
      })
    });

    if (response.ok) {
      descriptionWarning.style.display = 'none';
      form.reset();
      alert('Entry submitted successfully!');
      await loadCurrentTimeLog();
    } else {
      console.error('Failed to submit entry:', response.statusText);
    }
  } catch (error) {
    console.error('Error submitting entry:', error);
  }
});

  // Fetch and display the current week's time log entries
  async function loadCurrentTimeLog() {
    try {
      const response = await fetch('http://localhost:5264/api/timelogs/current', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      if (response.ok) {
        const timeLog = await response.json();
        console.log('Time Log Entries:', timeLog); // Verify structure here

        // Clear out "This Week" section first to avoid duplicate entries
        const tableBody = document.getElementById('this-week-entries');
        tableBody.innerHTML = ''; // Clear existing entries

        // Iterate through entries and call addToThisWeek with correct values
        timeLog.timeLogEntries.forEach(entry => {
          addToThisWeek(entry.duration, entry.description, entry.id);
        });
      } else {
        console.error('Failed to load time log:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading time log:', error);
    }
  }

  // Utility function to calculate the current week range in MM/DD - MM/DD format
  function getCurrentWeekRange() {
    const today = new Date();
    const day = today.getDay();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
    const nextSunday = new Date(lastMonday);
    nextSunday.setDate(lastMonday.getDate() + 6);

    const options = { month: '2-digit', day: '2-digit' };
    return `${lastMonday.toLocaleDateString(undefined, options)} - ${nextSunday.toLocaleDateString(undefined, options)}`;
  }

// Add a time entry to the "This Week" section
function addToThisWeek(duration, description, entryId) {
  const tableBody = document.getElementById('this-week-entries');
  
  const entryDiv = document.createElement('tr');
  entryDiv.classList.add('entry');
  entryDiv.dataset.id = entryId;
  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear().toString().slice(-2)}`;

  entryDiv.innerHTML = `
    <td>${formattedDate}</td>
    <td>${convertMinutesToHHMM(duration)}</td>
    <td>${description}</td>
  `;
    // Append the entry row to the table body
    tableBody.appendChild(entryDiv);
}

  // Load the time log entries when the page loads
  loadCurrentTimeLog();

  return homepageDiv; // Return the completed homepage element
}


