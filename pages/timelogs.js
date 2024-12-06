// Written by Varsha Mallepalli: Worked on the UI components, including designing and implementing the structure and layout.
// Written by Erika Mii: Worked on integrating the frontend with the backend, including calling the APIs and handling backend connections.

export function createTimeLogsPage() {
  console.log("Initializing Time Logs page...");

  const timeLogsDiv = document.createElement('div');

  // Time Tracker header
  const header = document.createElement('header');
  header.classList.add('timelogs-header');
  header.innerHTML = `
    <div class="header-content">
      <h1>Time Tracker</h1>
    </div>
  `;

  // Container for sidebar and main content
  const container = document.createElement('div');
  container.classList.add('container-timelogs');

  // Sidebar navigation
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar-timelogs');
  sidebar.innerHTML = `
    <ul>
      <li><a href="#home" class="nav-item">Home</a></li>
      <li><a href="#timelogs" class="nav-item active-tab">Timelogs</a></li>
      <li><a href="#peerreview" class="nav-item">Peer Review</a></li>
      <li><a href="#profile" class="nav-item">Profile</a></li>
    </ul>
  `;

  // Main content container
  const timeLogsContent = document.createElement('div');
  timeLogsContent.classList.add('content-container-timelogs');

  // Time Logs table section
  const tableSection = document.createElement('section');
  tableSection.classList.add('timelogs-table-section');
  tableSection.innerHTML = `
    <h2>Time Logs</h2>
    <table class="timelogs-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time Spent (hh:mm)</th>
          <th>What Was Accomplished</th>
        </tr>
      </thead>
      <tbody id="timelogs-entries">
        <!-- Dynamic entries will be inserted here -->
      </tbody>
    </table>
  `;

  // Append the table section to the main content
  timeLogsContent.appendChild(tableSection);

  // Append everything to the container
  container.appendChild(sidebar);
  container.appendChild(timeLogsContent);

  // Add the header and container to the main div
  timeLogsDiv.appendChild(header);
  timeLogsDiv.appendChild(container);

  // Fetch time logs for the logged-in user from the backend
  fetch('http://localhost:5264/api/timelogs/me', {
    method: 'GET', // HTTP GET method to retrieve data
    headers: { 'Content-Type': 'application/json' }, // Headers specify that we are expecting JSON response
    credentials: 'include', // Include credentials like cookies for the request
  })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
      // Get the table body where the time log entries will be inserted
      const tableBody = tableSection.querySelector('#timelogs-entries');

      // Check if data exists and has entries
      if (data && data.length > 0) {
        data.forEach((log) => {
          // Check if the log has timeLogEntries and iterate through them
          if (log.timeLogEntries && log.timeLogEntries.length > 0) {
            log.timeLogEntries.forEach((entry) => {
              // Format the date (YYYY-MM-DD) from the createdAt timestamp
              const formattedDate = entry.createdAt.slice(0, 10);

              // Convert duration from minutes to hours and minutes (HH:mm)
              const durationInHours = `${Math.floor(entry.duration / 60)}:${(entry.duration % 60)
                .toString()
                .padStart(2, '0')}`; // Ensure two digits for minutes

              // Create a table row element for the entry
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${formattedDate}</td> <!-- Display the formatted date -->
                <td>${durationInHours}</td> <!-- Display the duration in HH:mm format -->
                <td>${entry.description}</td> <!-- Display the description -->
              `;

              // Append the row to the table body
              tableBody.appendChild(row);
            });
          }
        });
      } else {
        // If no data or entries, show a message in the table
        const noEntriesRow = document.createElement('tr');
        noEntriesRow.innerHTML = `<td colspan="3">No time logs available.</td>`; // Spanning 3 columns for the message
        tableBody.appendChild(noEntriesRow);
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error fetching time logs:', error);
    });

  // Return the main container for time logs (likely for further rendering in the UI)
  return timeLogsDiv;
}