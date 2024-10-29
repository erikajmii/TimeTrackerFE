export function createHomepage() {
  // Create the main div for the homepage content
  const homepageDiv = document.createElement('div');
  console.log("here");

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
  thisWeekSection.innerHTML = `<h2>This Week</h2>`;

  // Create the "My Groups" section
  const myGroupsSection = document.createElement('section');
  myGroupsSection.classList.add('my-groups');
  myGroupsSection.innerHTML = `<h2>My Group</h2>`;

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

      <label for="problems">Problems encountered:</label>
      <textarea id="problems"></textarea>

      <label for="planned">Planned next steps:</label>
      <textarea id="planned"></textarea>

      <button type="submit">Submit Entry</button>
    </form>

    <p id="form-success" style="display:none;color:green;">Entry submitted successfully!</p>
  `;

  // Append the individual sections to the content container
  contentContainer.appendChild(thisWeekSection);
  contentContainer.appendChild(myGroupsSection);
  contentContainer.appendChild(newEntrySection);

  // Add the sidebar and content container to the main container
  container.appendChild(sidebar);
  container.appendChild(contentContainer);

  // Add the header and main container to the homepage div
  homepageDiv.appendChild(header);
  homepageDiv.appendChild(container);

  // Set today's date as min and max for the date input field
  const today = new Date().toISOString().split('T')[0]; // Format the current date as YYYY-MM-DD
  const dateInput = newEntrySection.querySelector('#entry-date');
  dateInput.min = today; // Set the minimum date to today
  dateInput.max = today; // Set the maximum date to today, limiting input to today's date only

  // Add event listener for form validation on submission
  const form = newEntrySection.querySelector('#entry-form');
  const accountDescription = newEntrySection.querySelector('#account-description');
  const descriptionWarning = newEntrySection.querySelector('#description-warning');

  form.addEventListener('submit', (event) => {
    // Prevent form submission if "Account of what you did" is too short
    if (accountDescription.value.length < 30) {
      event.preventDefault(); // Stop form submission
      descriptionWarning.style.display = 'block'; // Show warning message
    } else {
      descriptionWarning.style.display = 'none'; // Hide warning message if valid
    }
  });

  return homepageDiv; // Return the completed homepage element
}