// Function to create homepage with left-side navigation bar
export function createHomepage() {
  const homepageDiv = document.createElement('div');
  
  // Create header
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="header-content">
      <h1>Time Tracker</h1>
    </div>
  `;
  
  // Create container for sidebar and main content
  const container = document.createElement('div');
  container.classList.add('container');
  
  // Create sidebar navigation
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');
  sidebar.innerHTML = `
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#timelogs">Timelogs</a></li>
      <li><a href="#peerreview">Peer Review</a></li>
      <li><a href="#profile">Profile</a></li>
    </ul>
  `;
  
  // Create content container for "This Week" and "New Entry" form
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container');
  
  // "This Week" section
  const thisWeekSection = document.createElement('section');
  thisWeekSection.classList.add('this-week');
  thisWeekSection.innerHTML = `
    <h2>This Week</h2>
    <p>*This will be where Students are shown time for the current week (3 previous days can be modified) and for the entire project* </p>
  `;
  
  // "New Entry" form section
  const newEntrySection = document.createElement('section');
  newEntrySection.classList.add('new-entry');
  newEntrySection.innerHTML = `
    <h2>New Entry</h2>
    <form id="entry-form">
      <label for="entry-date">Date: ? (may take out)</label>
      <input type="date" id="entry-date" required>

      <label for="entry-time">Time Spent (HH:MM)</label>
      <input type="text" id="entry-time" required pattern="^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$">

      <label for="account-description">Account of what you did:</label>
      <textarea id="account-description"></textarea>

      <label for="problems">Problems encountered:</label>
      <textarea id="problems"></textarea>

      <label for="planned">Planned next steps:</label>
      <textarea id="planned"></textarea>

      <button type="submit">Submit Entry</button>
    </form>

    <p id="form-success" style="display:none;color:green;">Entry submitted successfully!</p>
  `;

  // Append "This Week" and "New Entry" sections to content container
  contentContainer.appendChild(thisWeekSection);
  contentContainer.appendChild(newEntrySection);

  // Append sidebar and content container to the main container
  container.appendChild(sidebar);
  container.appendChild(contentContainer);
  
  homepageDiv.appendChild(header);
  homepageDiv.appendChild(container);

  return homepageDiv;
}
