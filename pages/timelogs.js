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
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      const tableBody = tableSection.querySelector('#timelogs-entries');
      if (data && data.length > 0) {
        data.forEach((log) => {
          if (log.timeLogEntries && log.timeLogEntries.length > 0) {
            log.timeLogEntries.forEach((entry) => {
              const formattedDate = entry.createdAt.slice(0, 10);
              const durationInHours = `${Math.floor(entry.duration / 60)}:${(entry.duration % 60)
                .toString()
                .padStart(2, '0')}`;
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
      } else {
        const noEntriesRow = document.createElement('tr');
        noEntriesRow.innerHTML = `<td colspan="3">No time logs available.</td>`;
        tableBody.appendChild(noEntriesRow);
      }
    })
    .catch((error) => console.error('Error fetching time logs:', error));

  return timeLogsDiv;
}
