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
        <label for="new-password">New Password</label>
        <input type="password" id="new-password" placeholder="Enter new password">
        <label for="confirm-password" class="confirm-password-label">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder="Confirm new password">
        <button type="submit" id="submit-password-btn">Submit</button>
      </form>
    `;
  
    // Handle form submission for password reset
    const passwordForm = resetForm.querySelector('#password-form');
    const newPassword = resetForm.querySelector('#new-password');
    const confirmPassword = resetForm.querySelector('#confirm-password');
  
    passwordForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload
      if (newPassword.value === confirmPassword.value) {
        alert('Password reset successful!');
      } else {
        alert('Passwords do not match. Please try again.');
      }
    });
  
    // Append elements to the content container
    contentContainer.appendChild(profileCard);
    contentContainer.appendChild(resetForm);
  
    // Add the sidebar and content container to the main container
    container.appendChild(sidebar);
    container.appendChild(contentContainer);
  
    // Add the header and layout container to the main container
    mainContainer.appendChild(header);
    mainContainer.appendChild(container);
  
    // Return the profile page content
    return mainContainer;
  }
  