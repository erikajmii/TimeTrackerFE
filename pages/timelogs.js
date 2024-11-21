export function createTimeLogsPage() {
  console.log("Initializing Time Logs page...");

  const timeLogsDiv = document.createElement('div');

  // Time Tracker header (reused from homepage)
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="header-content">
      <h1>Time Tracker</h1>
    </div>
  `;

  // Container for sidebar and main content
  const container = document.createElement('div');
  container.classList.add('container');

  // Sidebar navigation (reused from homepage)
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar');
  sidebar.innerHTML = `
    <nav class="sidebar">
      <ul>
        <li><a href="#home" class="nav-item">Home</a></li>
        <li><a href="#timelogs" class="nav-item active-tab">Timelogs</a></li>
        <li><a href="#peerreview" class="nav-item">Peer Review</a></li>
        <li><a href="#profile" class="nav-item">Profile</a></li>
      </ul>
    </nav>
  `;

  // Main content container
  const timeLogsContent = document.createElement('div');
  timeLogsContent.classList.add('content-container');

  // Time Logs table section
  const tableSection = document.createElement('section');
  tableSection.classList.add('this-week'); // Reuse the same class for consistency
  tableSection.innerHTML = `
    <h2>Time Logs</h2>
    <table class="this-week-table">
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
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      // Access the table body where rows will be appended
      const tableBody = tableSection.querySelector('#timelogs-entries');
  
      // Check if data contains logs
      if (data && data.length > 0) {
        let hasEntries = false; // To track if there are any entries
  
        // Iterate through each log
        data.forEach((log) => {
          if (log.timeLogEntries && log.timeLogEntries.length > 0) {
            hasEntries = true;
  
            // Iterate through each entry in the log
            log.timeLogEntries.forEach((entry) => {
              const formattedDate = entry.createdAt.slice(0, 10);
              const durationInHours = `${Math.floor(entry.duration / 60)}:${(entry.duration % 60).toString().padStart(2, '0')}`;
  
              // Create a row for the entry
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${durationInHours}</td>
                <td>${entry.description}</td>
              `;
              tableBody.appendChild(row);
            });
          }
        });
  
        // If no entries found in all logs
        if (!hasEntries) {
          const noEntriesRow = document.createElement('tr');
          noEntriesRow.innerHTML = `<td colspan="3">No time logs available.</td>`;
          tableBody.appendChild(noEntriesRow);
        }
      } else {
        // If no logs are present
        const noEntriesRow = document.createElement('tr');
        noEntriesRow.innerHTML = `<td colspan="3">No time logs available.</td>`;
        tableBody.appendChild(noEntriesRow);
      }
    })
    .catch((error) => {
      console.error('Error fetching time logs:', error);
    });

  return timeLogsDiv;
}