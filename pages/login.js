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
  formContainer.style.width = "100vw"; // Full width for the container
  
  // Set inner HTML for the form with email and password fields directly in the formContainer
  formContainer.innerHTML = `
    <h1 style="font-family: Arial, sans-serif; font-size: 24px; color: white; margin-bottom: 20px;">
      Time Tracker
    </h1>
    <form id="login-form" style="display: flex; flex-direction: column; align-items: center; width: 300px;">
      <div style="margin-bottom: 15px; width: 100%;">
        <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold; color: white; font-family: Arial;">E-mail</label>
        <div style="position: relative; width: 100%;">
          <input type="email" id="email" name="email" required placeholder="Enter your email address"
            style="width: 100%; padding: 10px; padding-right: 40px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box; color: #5f6368;">
          <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #5f6368;">
            &#x2709;
          </span>
        </div>
      </div>
      <div style="margin-bottom: 15px; width: 100%;">
        <label for="password" style="display: block; margin-bottom: 5px; font-weight: bold; color: white; font-family: Arial;">Password</label>
        <div style="position: relative; width: 100%;">
          <input type="password" id="password" name="password" required placeholder="Enter your password"
            style="width: 100%; padding: 10px; padding-right: 40px; border-radius: 5px; border: 1px solid #ccc; box-sizing: border-box; color: #5f6368;">
          <span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #5f6368;">
            &#x1F441;
          </span>
        </div>
      </div>
      <div>
        <button type="submit" style="padding: 10px 20px; border: none; border-radius: 5px; background-color: #6200EA; color: white; width: 100%; font-size: 16px; cursor: pointer;">
          Login
        </button>
      </div>
    </form>
  `;

  // Handle form submission
  formContainer.querySelector("#login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log("Email:", email);
    console.log("Password:", password);
  });

  return formContainer; 
}
