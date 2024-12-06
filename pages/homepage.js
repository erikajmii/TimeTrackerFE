// Written by Varsha Mallepalli: Worked on the UI components, including designing and implementing the structure and layout.
// Written by Erika Mii: Worked on integrating the frontend with the backend, including calling the APIs and handling backend connections, as well as helped with the UI components.

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

  // Create the sidebar navigation with links
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');
  sidebar.innerHTML = `
    <ul>
      <li><a href="#home" class="nav-item" id="home-link">Home</a></li>
      <li><a href="#timelogs" class="nav-item" id="timelogs-link">Timelogs</a></li>
      <li><a href="#peerreview" class="nav-item" id="peerreview-link">Peer Review</a></li>
      <li><a href="#profile" class="nav-item" id="profile-link">Profile</a></li>
    </ul>
  `;

  // Function to update the active navigation link based on the current hash
  function updateActiveNav() {
    document.querySelectorAll('.sidebar .nav-item').forEach(link => {
      link.classList.remove('active'); // Remove active class from all links
    });
    const currentHash = location.hash || '#home'; // Default to #home if no hash is present
    const activeLink = document.querySelector(`.sidebar .nav-item[href="${currentHash}"]`);
    if (activeLink) {
      activeLink.classList.add('active'); // Add active class to the current link
    }
  }

  window.addEventListener('hashchange', updateActiveNav); // Update active link on hash change
  updateActiveNav(); // Initial call to set the active link

  // Create a container for the main content sections
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container');

  // Create the "This Week" section to display weekly entries
  const thisWeekSection = document.createElement('section');
  thisWeekSection.classList.add('this-week');
  thisWeekSection.innerHTML = `
    <h2>This Week</h2>
    <h3 class="current-week-range">${getCurrentWeekRange()}</h3> <!-- Display the current week's date range -->
    <table class="this-week-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time Spent (hh:mm)</th>
          <th>What Was Accomplished</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="this-week-entries"> <!-- Table body for entries -->
      </tbody>
    </table>
  `;

  // Create the "New Entry" form section for submitting entries
  const newEntrySection = document.createElement('section');
  newEntrySection.classList.add('new-entry');
  newEntrySection.innerHTML = `
    <h2>New Entry</h2>
    <form id="entry-form">
      <label for="entry-date">Date:</label>
      <input type="date" id="entry-date" required> <!-- Input for date -->

      <label for="entry-time">Time Spent (HH:MM)</label>
      <input type="text" id="entry-time" required pattern="^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$"> <!-- Time input -->

      <label for="account-description">Account of what you did:</label>
      <textarea id="account-description" minlength="30" required></textarea> <!-- Description of work -->
      <small id="description-warning" style="color:red;display:none;">Description must be at least 30 characters long.</small>

      <button type="submit">Submit Entry</button> <!-- Submit button -->
    </form>
    <p id="form-success" style="display:none;color:green;">Entry submitted successfully!</p> <!-- Success message -->
  `;

  // Append sections to the content container
  contentContainer.appendChild(thisWeekSection);
  contentContainer.appendChild(newEntrySection);

  // Append the sidebar and content container to the main container
  container.appendChild(sidebar);
  container.appendChild(contentContainer);

  // Append the header and main container to the homepage div
  homepageDiv.appendChild(header);
  homepageDiv.appendChild(container);

  // Restrict date input to today only
  const today = new Date().toISOString().split('T')[0];
  const form = newEntrySection.querySelector('#entry-form');
  const dateInput = newEntrySection.querySelector('#entry-date');
  const entryTimeInput = newEntrySection.querySelector('#entry-time');
  const accountDescription = newEntrySection.querySelector('#account-description');
  const descriptionWarning = newEntrySection.querySelector('#description-warning');
  dateInput.min = today;
  dateInput.max = today;

  // Load current week's time log entries from the backend
  async function loadCurrentTimeLog() {
    try {
      const response = await fetch('http://localhost:5264/api/timelogs/current', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        console.error('Failed to load time log:', response.statusText);
        return;
      }
      const timeLog = await response.json();
      const tableBody = document.getElementById('this-week-entries');
      if (!tableBody) return;
      tableBody.innerHTML = ''; // Clear existing entries
      timeLog?.timeLogEntries?.forEach(entry => {
        addToThisWeek(entry.duration, entry.description, entry.id, entry.date || entry.createdAt);
      });
    } catch (error) {
      console.error('Error loading time log:', error);
    }
  }

  // Add a single entry to the "This Week" table
  function addToThisWeek(duration, description, entryId, entryDate) {
    const tableBody = document.getElementById('this-week-entries');
    const entryRow = document.createElement('tr');
    entryRow.dataset.id = entryId;

    // Safely format the date or use a fallback
    const formattedDate = entryDate ? entryDate.slice(0, 10) : 'No Date Available';

    // Convert duration from minutes to HH:MM format
    const durationInHours = `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`;

    // Determine if the entry is editable (within 3 days)
    const isEditable = entryDate
      ? (() => {
          const entryTime = new Date(entryDate).getTime();
          const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
          return new Date().getTime() - entryTime <= threeDaysMs;
        })()
      : false;

    // Populate the row with data and action button if editable
    entryRow.innerHTML = `
      <td>${formattedDate}</td>
      <td>${durationInHours}</td>
      <td>${description}</td>
      <td>
        ${
          isEditable
            ? `<button class="edit-button" data-id="${entryId}" data-duration="${duration}" data-description="${description}" data-date="${entryDate}">Edit</button>`
            : 'Not Editable'
        }
      </td>
    `;

    // Append the row to the table body
    tableBody.appendChild(entryRow);

    // Add event listener to the edit button if editable
    if (isEditable) {
      entryRow.querySelector('.edit-button').addEventListener('click', (e) => {
        const button = e.target;
        openEditForm(button.dataset.id, button.dataset.duration, button.dataset.description, button.dataset.date);
      });
    }
  }

  // Open the form pre-filled with entry data for editing
  function openEditForm(entryId, duration, description, entryDate) {
    dateInput.value = entryDate.split('T')[0];
    entryTimeInput.value = convertMinutesToHHMM(duration);
    accountDescription.value = description;

    let hiddenInput = document.getElementById('entry-id');
    if (!hiddenInput) {
      hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.id = 'entry-id';
      form.appendChild(hiddenInput);
    }
    hiddenInput.value = entryId;
    alert('Edit the entry and resubmit.');
  }

  // Handle form submission for adding or updating entries
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (accountDescription.value.length < 30) {
      descriptionWarning.style.display = 'block'; // Show warning if description is too short
      return;
    }
    descriptionWarning.style.display = 'none'; // Hide warning if input is valid
    const entryDate = dateInput.value;
    const entryTime = convertToMinutes(entryTimeInput.value); // Convert time to minutes
    const description = accountDescription.value;
    const entryId = document.getElementById('entry-id')?.value;

    try {
      // Decide on POST (new entry) or PATCH (edit entry) based on entryId
      const url = entryId
        ? `http://localhost:5264/api/timelogs/entry/${entryId}` // PATCH request for editing
        : `http://localhost:5264/api/timelogs/entry`; // POST request for adding

      const method = entryId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set content type for form-urlencoded
        },
        credentials: 'include', // Include cookies
        body: new URLSearchParams({
          date: entryDate,
          Duration: entryTime,
          description,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Failed to submit entry: ${response.status} ${response.statusText}`);
        console.error('Error details:', errorMessage);
        alert('Failed to submit entry. Please check the console for details.');
        return;
      }

      form.reset(); // Clear the form after submission
      alert(entryId ? 'Entry updated successfully!' : 'Entry submitted successfully!');
      await loadCurrentTimeLog(); // Reload the current week's entries
    } catch (error) {
      console.error('Error submitting entry:', error);
    }
  });

  // Convert time (HH:MM) to minutes
  function convertToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Convert minutes to HH:MM format
  function convertMinutesToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
  }

  // Get the current week's date range (Monday - Sunday)
  function getCurrentWeekRange() {
    const today = new Date();
    const day = today.getDay();
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - (day === 0 ? 6 : day - 1)); // Get last Monday
    const nextSunday = new Date(lastMonday);
    nextSunday.setDate(lastMonday.getDate() + 6); // Get next Sunday

    const options = { month: '2-digit', day: '2-digit' }; // Format options for date
    return `${lastMonday.toLocaleDateString(undefined, options)} - ${nextSunday.toLocaleDateString(undefined, options)}`;
  }

  // Initial load of current time logs
  loadCurrentTimeLog();

  // Return the fully constructed homepage div
  return homepageDiv;
}
