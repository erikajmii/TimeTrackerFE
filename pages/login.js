export function createLoginForm() {
  // Create the container
  const formContainer = document.createElement("div");
  formContainer.id = "form-container"; // Set the ID for the container

  // Set inner HTML for the form with NetID and password fields directly in the formContainer
  formContainer.innerHTML = `
    <h1>Time Tracker</h1>
    <form id="login-form">
      <div class="input-container">
        <label for="NetID">NetID</label>
        <input type="text" id="NetID" name="NetID" required placeholder="Enter Your NetID">
        <span style="position: absolute; right: 15px; top: 46%; transform: translateY(-50%); color: #5f6368; font-size: 28px;">
        </span>
      </div>
      <div class="input-container">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required placeholder="Enter your password">
        <span id="toggle-password" class="eye-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5.5C7.58 5.5 4.16 8.09 2.5 12C4.16 15.91 7.58 18.5 12 18.5C16.42 18.5 19.84 15.91 21.5 12C19.84 8.09 16.42 5.5 12 5.5ZM12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16ZM12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z" fill="#5f6368"/>
        </svg>
      </span>
      </div>
      <button type="submit" id="login-button">Login</button>
      <p id="error-message">Please fill in all fields.</p>
      <p>Don't have an account? <a id="register-link">Create Password</a></p>
    </form>
  `;

  // Handle form submission
  formContainer
    .querySelector("#login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const netID = event.target.NetID.value;
      const password = event.target.password.value;

      // Validate form fields
      if (!netID || netID.includes("@") || !password) {
        formContainer.querySelector("#error-message").style.display = "block";
        formContainer.querySelector("#error-message").textContent = "NetID should not contain an '@' symbol.";
        return;
      }

      // Clear error message if all fields are filled
      formContainer.querySelector("#error-message").style.display = "none";

      console.log("NetID:", netID);
      console.log("Password:", password);
    });

  // Handle password visibility toggle
  const togglePassword = formContainer.querySelector("#toggle-password");
  const passwordInput = formContainer.querySelector("#password");
  let isPasswordVisible = false;

  togglePassword.addEventListener("click", function () {
    if (isPasswordVisible) {
      passwordInput.type = "password";
      isPasswordVisible = false;
    } else {
      passwordInput.type = "text";
      isPasswordVisible = true;
    }
  });

  // Append the form container to the app div
  document.getElementById("app").style.margin = "0";
  document.getElementById("app").style.padding = "0";
  document.getElementById("app").appendChild(formContainer);

  return formContainer;
}
