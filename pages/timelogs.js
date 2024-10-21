// pages/timeLogsPage.js

export function createTimeLogsPage() {
    const timeLogsDiv = document.createElement('div');
    
    // Container setup
    const container = document.createElement('div');
    container.classList.add('content-container');
    
    // New Entry form for Time Logs
    const newEntrySection = document.createElement('section');
    newEntrySection.classList.add('new-entry');
    newEntrySection.innerHTML = `
      <h2>New Entry</h2>
      <form id="timelogs-form">
        <label for="entry-date">Date:</label>
        <input type="date" id="entry-date" required>
  
        <label for="entry-time">Time Spent (HH:MM):</label>
        <input type="text" id="entry-time" required pattern="^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$">
  
        <label for="account-description">Account of what you did:</label>
        <textarea id="account-description"></textarea>
  
        <label for="problems">Problems encountered:</label>
        <textarea id="problems"></textarea>
  
        <label for="planned">Planned next steps:</label>
        <textarea id="planned"></textarea>
  
        <button type="submit">Submit Entry</button>
      </form>
    `;
  
    // Entries list section
    const entriesSection = document.createElement('section');
    entriesSection.classList.add('entries-list');
    entriesSection.innerHTML = `
      <h2>Entries</h2>
      <p>No entries yet. Add your first entry above.</p>
    `;
  
    // Append sections to the container
    container.appendChild(newEntrySection);
    container.appendChild(entriesSection);
    
    // Append the container to the time logs div
    timeLogsDiv.appendChild(container);
  
    return timeLogsDiv;
  }
  