export function createProfilePage() {
    // Create the main container for the profile page
    const mainContainer = document.createElement('div');
  
    // Add the Time Tracker header
    const header = document.createElement('header');
    header.classList.add('timelogs-header');
    header.innerHTML = `<h1>Time Tracker</h1>`;
  
    // Add the main layout container
    const container = document.createElement('div');
    container.classList.add('container-profile');
  
    // Add the sidebar navigation
    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar-profile');
    sidebar.innerHTML = `
      <ul>
        <li><a href="#home" class="nav-item">Home</a></li>
        <li><a href="#timelogs" class="nav-item">Time Logs</a></li>
        <li><a href="#peerreview" class="nav-item">Peer Review</a></li>
        <li><a href="#profile" class="nav-item active-tab">Profile</a></li>
      </ul>
    `;
  
    // Add the main content container
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container-profile');
  
    // Add the profile card with name and group number
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');
    profileCard.innerHTML = `
      <div class="profile-details">
        <h2 id="name">Erika Mii</h2>
        <p id="group">Group 78</p>
      </div>
    `;
  
    // Add the reset password form
    const resetForm = document.createElement('div');
    resetForm.classList.add('reset-form');
    resetForm.id = 'reset-form';
    resetForm.innerHTML = `
      <h3>Reset Your Password</h3>
      <form id="password-form">
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" placeholder="Enter new password">
        <label for="confirm-password" class="confirm-password-label">Confirm Passwor