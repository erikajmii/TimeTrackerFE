// Function to initialize the Time Logs page
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

  // Example dynamic data (replace with real data integration)
  const exampleData = [
    { date: '11/18/2024', timeSpent: '2:00', accomplished: 'Reviewed project documentation' },
    { date: '11/19/2024', timeSpent: '3:00', accomplished: 'Worked on feature implementation' },
  ];

  const tableBody = tableSection.querySelector('#timelogs-entries');
  exampleData.forEach((entry) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.timeSpent}</td>
      <td>${entry.accomplished}</td>
    `;
    tableBody.appendChild(row);
  });

  return timeLogsDiv;
}
