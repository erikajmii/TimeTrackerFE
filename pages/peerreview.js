// Written by Varsha Mallepalli: Worked on the UI components, including designing and implementing the structure and layout.
// Written by Erika Mii: Worked on integrating the frontend with the backend, including calling the APIs and handling backend connections.

export function createPeerReviewPage() {
  // Base URL for API endpoints
  const baseURL = 'http://localhost:5264/api';

  // Main wrapper for the peer review page
  const peerReviewDiv = document.createElement('div');

  // Header for "Time Tracker"
  const header = document.createElement('header');
  header.classList.add('peer-review-header');
  header.innerHTML = `
    <div class="header-content">
      <h1>Time Tracker</h1>
    </div>
  `;
  // Append the header to the main div
  peerReviewDiv.appendChild(header);

  // Main container for sidebar and content
  const container = document.createElement('div');
  container.classList.add('container-peer-review');

  // Sidebar navigation
  const sidebar = document.createElement('nav');
  sidebar.classList.add('sidebar-peer-review');
  sidebar.innerHTML = `
    <ul>
      <li><a href="#home" class="nav-item">Home</a></li>
      <li><a href="#timelogs" class="nav-item">Timelogs</a></li>
      <li><a href="#peerreview" class="nav-item active-tab">Peer Review</a></li>
      <li><a href="#profile" class="nav-item">Profile</a></li>
    </ul>
  `;
  // Append sidebar to the main container
  container.appendChild(sidebar);

  // Content container for peer review
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container-peer-review');

  // Title for the Peer Review page
  const title = document.createElement('h2');
  title.textContent = 'Peer Review';
  title.style.marginBottom = '20px';
  // Append title to the content container
  contentContainer.appendChild(title);

  // Dropdown container for selecting the person to review
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container-peer-review');

  // Label for the dropdown
  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select a Person to Review:';
  dropdownLabel.setAttribute('for', 'review-person');

  // Dropdown element
  const dropdown = document.createElement('select');
  dropdown.setAttribute('id', 'review-person');
  dropdown.setAttribute('name', 'review-person');

  // Append label and dropdown to the dropdown container
  dropdownContainer.appendChild(dropdownLabel);
  dropdownContainer.appendChild(dropdown);

  // Append dropdown container to the content container
  contentContainer.appendChild(dropdownContainer);

  // Container for peer review questions
  const questionsContainer = document.createElement('div');
  questionsContainer.classList.add('questions-container-peer-review');
  // Append questions container to the content container
  contentContainer.appendChild(questionsContainer);

  // Submit button for submitting the review
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Review';
  submitButton.classList.add('button-peer-review');

  // Event listener for the submit button
  submitButton.addEventListener('click', async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    try {
      // Fetch details of the logged-in user
      const reviewerResponse = await fetch(`${baseURL}/Auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const reviewer = await reviewerResponse.json();

      // Get the selected reviewee from the dropdown
      const revieweeId = dropdown.value;

      // Collect answers from the questions container
      const answers = Array.from(questionsContainer.querySelectorAll('.question-peer-review'))
        .map((questionDiv) => {
          // Get the question ID
          const questionId = parseInt(questionDiv.querySelector('textarea').getAttribute('data-question-id'));
          // Get the written feedback
          const writtenFeedback = questionDiv.querySelector('textarea').value.trim();
          // Get the numerical feedback
          const numericalFeedback = parseInt(questionDiv.querySelector('select').value);

          // Validate written feedback
          if (!writtenFeedback) {
            alert("Written feedback is required for all questions.");
            return null;
          }

          // Validate numerical feedback
          if (isNaN(numericalFeedback)) {
            alert("Please provide a numerical rating (1-5) for all questions.");
            return null;
          }

          // Return the answer object
          return {
            PeerReviewQuestionId: questionId,
            NumericalFeedback: numericalFeedback,
            WrittenFeedback: writtenFeedback,
          };
        })
        // Remove any null answers
        .filter(answer => answer !== null);

      // Check if all answers are provided
      if (answers.length === 0) {
        alert("Please provide answers to all questions.");
        return;
      }

      // Create a FormData object for the review submission
      const formData = new FormData();
      formData.append('revieweeId', revieweeId);
      formData.append('startDate', new Date().toISOString());
      formData.append('endDate', new Date().toISOString());
      formData.append('answers', JSON.stringify(answers));

      // Send the review data to the backend
      const response = await fetch(`${baseURL}/peerreview`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      // Handle the response
      if (response.ok) {
        alert('Peer review submitted successfully!');
        // Reset input fields after successful submission
        resetInputs();
      } else {
        const errorResponse = await response.json();
        console.error('Failed to submit peer review:', errorResponse);
        alert('Failed to submit peer review.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  // Function to reset input fields
  function resetInputs() {
    // Reset the dropdown selection
    dropdown.value = '';
    // Clear all question inputs
    questionsContainer.querySelectorAll('.question-peer-review').forEach((questionDiv) => {
      const textarea = questionDiv.querySelector('textarea');
      const select = questionDiv.querySelector('select');
      textarea.value = '';
      select.value = '1';
    });
  }

  // Append the submit button to the content container
  contentContainer.appendChild(submitButton);

  // Append the content container to the main container
  container.appendChild(contentContainer);

  // Append the main container to the peer review div
  peerReviewDiv.appendChild(container);

  // Fetch user and group data, and dynamically populate the page
  (async () => {
    try {
      // Fetch the logged-in user's details
      const userResponse = await fetch(`${baseURL}/Auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch logged-in user's details.");
      }

      const user = await userResponse.json();
      const loggedInUserId = user.netID;
      const userGroupId = user.group;

      // Fetch the members of the user's group
      const groupResponse = await fetch(`${baseURL}/user/group/${userGroupId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!groupResponse.ok) {
        throw new Error(`Failed to fetch users for group ID ${userGroupId}.`);
      }

      const groupMembers = await groupResponse.json();

      // Populate dropdown with group members (excluding the logged-in user)
      groupMembers.forEach((member) => {
        const option = document.createElement('option');
        option.value = member.netID;
        option.textContent = `${member.firstName} ${member.lastName}`;
        dropdown.appendChild(option);
      });

      // Fetch peer review questions
      const questionResponse = await fetch(`${baseURL}/peerreviewquestion`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!questionResponse.ok) {
        throw new Error("Failed to fetch peer review questions.");
      }

      const questions = await questionResponse.json();

      // Dynamically create question elements
      questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-peer-review');

        // Add numerical rating input
        const numericalFeedbackLabel = document.createElement('label');
        numericalFeedbackLabel.textContent = 'Rate (1-5):';
        questionDiv.appendChild(numericalFeedbackLabel);

        const numericalFeedbackSelect = document.createElement('select');
        numericalFeedbackSelect.setAttribute('data-question-id', question.peerReviewQuestionId);
        numericalFeedbackSelect.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        questionDiv.appendChild(numericalFeedbackSelect);

        // Add question text
        const questionLabel = document.createElement('label');
        questionLabel.textContent = `${index + 1}. ${question.questionText}`;
        questionDiv.appendChild(questionLabel);

        // Add text area for written feedback
        const answerTextarea = document.createElement('textarea');
        answerTextarea.setAttribute('data-question-id', question.peerReviewQuestionId);
        answerTextarea.placeholder = 'Write your response here...';
;
        questionDiv.appendChild(answerTextarea);

        questionsContainer.appendChild(questionDiv);
      });
    } catch (error) {
      console.error('Error fetching group members or questions:', error.message);
    }
  })();
  return peerReviewDiv;
}