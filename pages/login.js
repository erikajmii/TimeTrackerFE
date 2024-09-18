export function createLoginForm() {
  // Create the container
  const formContainer = document.createElement("div");

  // Set the overall container styles
  formContainer.style.backgroundColor = "black"; // Black background for the full screen
  formContainer.style.display = "flex";
  formContainer.style.flexDirection = "column";
  formContainer.style.justifyContent = "center";
  formContainer.style.alignItems = "center";
  formContainer.style.height = "100vh";
  formContainer.style.width = "100vw";

  // Set inner HTML for the form with email and password fields directly in the formContainer
  formContainer.innerHTML = `
    <h1 style="font-family: Arial, sans-serif; font-size: 30px; color: white; margin-bottom: 30px;">
      Time Tracker
    </h1>
    <form id="login-form" style="display: flex; flex-direction: column; align-items: center; width: 350px;">
      <div style="margin-bottom: 25px; width: 100%;">
        <label for="email" style="display: block; margin-bottom: 10px; font-weight: bold; color: white; font-family: Arial; font-size: 18px;">E-mail</label>
        <div style="position: relative; width: 100%;">
          <input type="email" id="email" name="email" required placeholder="Enter your email address"
            style="width: 100%; padding: 15px; padding-right: 50px; border-radius: 8px; border: 1px solid #ccc; box-sizing: border-box; font-size: 16px; color: #5f6368;">
          <span style="position: absolute; right: 15px; top: 46%; transform: translateY(-50%); color: #5f6368; font-size: 28px;">
            &#x2709;
          </span>
        </div>
      </div>
      <div style="margin-bottom: 30px; width: 100%;">
        <label for="password" style="display: block; margin-bottom: 10px; font-weight: bold; color: white; font-family: Arial; font-size: 18px;">Password</label>
        <div style="position: relative; width: 100%;">
          <input type="password" id="password" name="password" required placeholder="Enter your password"
            style="width: 100%; padding: 15px; padding-right: 50px; border-radius: 8px; border: 1px solid #ccc; box-sizing: border-box; font-size: 16px; color: #5f6368;">
          <span id="toggle-password" style="position: absolute; right: 12px; top: 55%; transform: translateY(-50%); color: #5f6368; font-size: 24px; cursor: pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.5C7.58 5.5 4.16 8.09 2.5 12C4.16 15.91 7.58 18.5 12 18.5C16.42 18.5 19.84 15.91 21.5 12C19.84 8.09 16.42 5.5 12 5.5ZM12 16C9.24 16 7 13.76 7 11C7 8.24 9.24 6 12 6C14.76 6 17 8.24 17 11C17 13.76 14.76 16 12 16ZM12 8C10.34 8 9 9.34 9 11C9 12.66 10.34 14 12 14C13.66 14 15 12.66 15 11C15 9.34 13.66 8 12 8Z" fill="#5f6368"/>
            </svg>
          </span>
        </div>
      </div>
      <div>
        <button type="submit" style="padding: 15px 25px;font-weight: bold; border: none; border-radius: 8px; background-color: #6200EA; color: white; width: 100%; font-size: 18px; cursor: pointer;">
          Login
        </button>
      </div>
      <p id="error-message" style="color: #ff0000; font-family: Arial; font-size: 16px; margin-top: 20px; display: none;">
        Please fill in all fields.
      </p>
      <p style="margin-top: 20px; color: white; font-size: 16px; font-family: Arial;">
        Not already a user? <a id="register-link" style="color: #6200EA; text-decoration: none; cursor: pointer;">Register here</a>
      </p>
    </form>
  `;

  // Handle form submission
  formContainer
    .querySelector("#login-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;

      // Validate form fields
      if (!email || !password) {
        formContainer.querySelector("#error-message").style.display = "block";
        return;
      }

      // Clear error message if all fields are filled
      formContainer.querySelector("#error-message").style.display = "none";

      console.log("Email:", email);
      console.log("Password:", password);
    });

  // Handle password visibility toggle
  formContainer
    .querySelector("#toggle-password")
    .addEventListener("click", function () {
      const passwordInput = formContainer.querySelector("#password");
      const isPasswordVisible = passwordInput.type === "text";
      passwordInput.type = isPasswordVisible ? "password" : "text";
    });

  // Append the form container to the body
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.appendChild(formContainer);

  return formContainer;
}
