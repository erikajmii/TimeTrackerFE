//erika mii
// passwordSet.js
export function createPasswordPopup(onPasswordSet) {
  // Create the popup for setting a new password
  const popup = document.createElement('div');
  popup.id = 'popup';
  popup.className = 'popup';

  // Popup content with your styling
  popup.innerHTML = `
    <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          background-color: black;
        }

        #form-container {
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
        }

        .popup-content {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          width: 350px;
          text-align: center;
        }

        h2 {
          font-family: Arial, sans-serif;
          font-size: 24px;
          color: black;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 20px;
          text-align: left;
        }

        label {
          font-family: Arial, sans-serif;
          font-size: 16px;
          color: black;
          margin-bottom: 10px;
          display: block;
        }

        input[type="password"] {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          box-sizing: border-box;
        }

        .error {
          color: red;
          font-family: Arial, sans-serif;
          font-size: 14px;
          margin-top: 10px;
        }

        .btn {
          padding: 15px;
          font-weight: bold;
          border: none;
          border-radius: 30px;
          background-color: #6200EA;
          color: white;
          width: 100%;
          font-size: 16px;
          cursor: pointer;
        }

        .btn:hover {
          background-color: #4104ff;
        }
    </style>

    <div id="form-container">
      <div class="popup-content">
        <h2>Set New Password</h2>
        <form id="passwordForm">
          <div class="input-group">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" required>
          </div>
          <div class="input-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" required>
          </div>
          <p id="errorMessage" class="error"></p>
          <button type="submit" class="btn">Submit</button>
        </form>
      </div>
    </div>
  `;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Handle form submission
  document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');

    // Regular expression for standard password requirements
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if new password meets the requirements
    if (!passwordRequirements.test(newPassword)) {
      errorMessage.textContent = 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.';
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
    } else {
      errorMessage.textContent = '';  // Clear any previous error
      alert('Password has been set successfully!');
      popup.remove();  // Close the popup since the password was successfully set
      onPasswordSet(newPassword);  // Call the callback function with the new password
    }
  });

  //Close popup on clicking outside
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.remove(); // Close the popup if the background is clicked
    }
  });
}