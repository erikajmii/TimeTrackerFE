// Written by Varsha Mallepalli 

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
      <li><a href="#timelogs" class="nav-item">Timelogs</a></li>
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
      <h3 id="group">Group 78</h3>
    </div>
  `;

  // Add the reset password form
  const resetForm = document.createElement('div');
  resetForm.classList.add('reset-form');
  resetForm.id = 'reset-form';
  resetForm.innerHTML = `
    <h3>Reset Your Password</h3>
    <form id="password-form">
      <div class="input-container">
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" placeholder="Enter new password">
        <span class="toggle-password" id="toggle-new-password">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.5C7.58 5.5 4.16 8.09 2.5 12C4.16 15.91 7.58 18.5 12 18.5C16.42 18.5 19.84 15.91 21.5 12C19.84 8.09 16.42 5.5 12 5.5ZM12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16ZM12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z" fill="#5f6368"/>
          </svg>
        </span>
      </div>
      <div class="input-container">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder="Confirm new password">
        <span class="toggle-password" id="toggle-confirm-password">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.5C7.58 5.5 4.16 8.09 2.5 12C4.16 15.91 7.58 18.5 12 18.5C16.42 18.5 19.84 15.91 21.5 12C19.84 8.09 16.42 5.5 12 5.5ZM12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16ZM12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z" fill="#5f6368"/>
          </svg>
        </span>
      </div>
      <button type="submit" id="submit-password-btn">Submit</button>
    </form>
  `;

  // Append elements to the content container
  contentContainer.appendChild(profileCard);
  contentContainer.appendChild(resetForm);

  // Add the sidebar and content container to the main container
  container.appendChild(sidebar);
  container.appendChild(contentContainer);

  // Add the header and layout container to the main container
  mainContainer.appendChild(header);
  mainContainer.appendChild(container);

  // Toggle password visibility logic
  const togglePasswordIcons = resetForm.querySelectorAll('.toggle-password');

  togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const input = icon.previousElementSibling;

      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }
    });
  });

  // Return the profile page content
  return mainContainer;
}
