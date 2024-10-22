// homepage.js
export function createHomepage() {
  const homepageDiv = document.createElement('div');
  console.log("here");
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
      <li><a href="#home" class="nav-item">Home</a></li>
      <li><a href="#timelogs" class="nav-item">Timelogs</a></li>
      <li><a href="#peerreview" class="nav-item">Peer Review</a></li>
      <li><a href="#profile" class="nav-item">Profile</a></li>
    </ul>
  `;

  // Create content container for "This Week", "My Groups", and "New Entry" form
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container');

  // "This Week" section
  const thisWeekSection = document.createElement('section');
  thisWeekSection.classList.add('this-week');
  thisWeekSection.innerHTML = `<h2>This Week</h2>`;

  // "My Groups" section
  const myGroupsSection = document.createElement('section');
  myGroupsSection.classList.add('my-groups');
  myGroupsSection.innerHTML = `<h2>My Group</h2>`;

  // "New Entry" form section
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
      <textarea id="account-description"></textarea>

      <label for="problems">Problems encountered:</label>
      <textarea id="problems"></textarea>

      <label for="planned">Planned next steps:</label>
      <textarea id="planned"></textarea>

      <button type="submit">Submit Entry</button>
    </form>

    <p id="form-success" style="display:none;color:green;">Entry submitted successfully!</p>
  `;

  // Append sections to content container
  contentContainer.appendChild(thisWeekSection);
  contentContainer.appendChild(myGroupsSection);
  contentContainer.appendChild(newEntrySection);

  // Append sidebar and content container to the main container
  container.appendChild(sidebar);
  container.appendChild(contentContainer);

  // Append header and main container to the homepage div
  homepageDiv.appendChild(header);
  homepageDiv.appendChild(container);

  return homepageDiv;
}
