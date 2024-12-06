// Written by Varsha Mallepalli
// Written by Erika Mii 
export function createPeerReviewPage() {
  const baseURL = 'http://localhost:5264/api';

  // Main Peer Review Div
  const peerReviewDiv = document.createElement('div');

  // Header for "Time Tracker"
  const header = document.createElement('header');
  header.classList.add('peer-review-header');
  header.innerHTML = `
    <div class="header-content">
      <h1>Time Tracker</h1>
    </div>
  `;
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
  container.appendChild(sidebar);

  // Content container for peer review
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container-peer-review');

  // Title for the Peer Review page
  const title = document.createElement('h2');
  title.textContent = 'Peer Review';
  title.style.marginBottom = '20px';
  contentContainer.appendChild(title);

  // Dropdown for selecting the person to review
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container-peer-review');

  const dropdownLabel = document.createElement('label');
  dropdownLabel.textContent = 'Select Person to Review:';
  dropdownLabel.setAttribute('for', 'review-person');

  const dropdown = document.createElement('select');
  dropdown.setAttribute('id', 'review-person');
  dropdown.setAttribute('name', 'review-person');

  dropdownContainer.appendChild(dropdownLabel);
  dropdownContainer.appendChild(dropdown);
  contentContainer.appendChild(dropdownContainer);

  // Questions container
  const questionsContainer = document.createElement('div');
  questionsContainer.classList.add('questions-container-peer-review');

  contentContainer.appendChild(questionsContainer);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Review';
  submitButton.classList.add('button-peer-review');
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    try {
      const reviewerResponse = await fetch(`${baseURL}/Auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const reviewer = await reviewerResponse.json();
      const revieweeId = dropdown.value; // Selected reviewee from dropdown
  
      // Collect answers from the form
      const answers = Array.from(questionsContainer.querySelectorAll('.question-peer-review'))
        .map((questionDiv) => {
          const questionId = parseInt(questionDiv.querySelector('textarea').getAttribute('data-question-id'));
          const writtenFeedback = questionDiv.querySelector('textarea').value.trim(); 
          const numericalFeedback = parseInt(questionDiv.querySelector('select').value);
  
          // Ensure written feedback is provided
          if (!writtenFeedback) {
            alert("Written feedback is required for all questions.");
            return null; // Skip this answer if written feedback is empty
          }
  
          // Ensure numerical feedback is valid
          if (isNaN(numericalFeedback)) {
            alert("Please provide a numerical rating (1-5) for all questions.");
            return null; // Skip invalid answers
          }
  
          return {
            PeerReviewQuestionId: questionId,
            numericalFeedback: numericalFeedback,
            WrittenFeedback: writtenFeedback,
          };
        }).filter(answer => answer !== null); // Remove any null answers
  
      if (answers.length === 0) {
        alert("Please provide answers to all questions.");
        return;
      }
  
      // Create a FormData object
      const formData = new FormData();
      formData.append('revieweeId', revieweeId);
      formData.append('startDate', new Date().toISOString());
      formData.append('endDate', new Date().toISOString());
      formData.append('answers', JSON.stringify(answers));
  
      // Now send the form data
      const response = await fetch(`${baseURL}/peerreview`, {
          method: 'POST',
          credentials: 'include',
          body: formData
      });
  
      if (response.ok) {
        alert('Peer review submitted successfully!');
        resetInputs(); // Reset input fields after successful submission
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
    dropdown.value = ''; // Reset the dropdown
    questionsContainer.querySelectorAll('.question-peer-review').forEach((questionDiv) => {
      const textarea = questionDiv.querySelector('textarea');
      const select = questionDiv.querySelector('select');
      textarea.value = ''; // Clear text area
      select.value = '1';  // Reset numerical feedback to default
    });
  }
  
  contentContainer.appendChild(submitButton);

  // Add content container to the main container
  container.appendChild(contentContainer);

  // Add the container to the peer review div
  peerReviewDiv.appendChild(container);

  (async () => {
    try {
      // Fetch the logged-in user's details to get their group ID
      const userResponse = await fetch(`${baseURL}/Auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch logged-in user's details.");
      }

      const user = await userResponse.json();
      const loggedInUserId = user.netID; // Adjust field name to match API response
      const userGroupId = user.group; // Assuming 'Group' contains the group ID

      console.log('User Details:', user); // Add this line
      console.log('Logged-in User Group ID:', userGroupId); // Add this line

      // Fetch the members of the logged-in user's group
      const groupResponse = await fetch(`${baseURL}/user/group/${userGroupId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!groupResponse.ok) {
        throw new Error(`Failed to fetch users for group ID ${userGroupId}.`);
      }

      const groupMembers = await groupResponse.json();
      console.log('Group Members:', groupMembers);

      // Populate dropdown with group members, excluding the logged-in user
      groupMembers
        .forEach((member) => {
          const option = document.createElement('option');
          option.value = member.netID;
          console.log('Group Member Net id: ', option.value);
          option.textContent = `${member.firstName} ${member.lastName}`; // Adjust field names as necessary
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
        console.log(`Question ID: ${question.peerReviewQuestionId}`);  // Log the question ID
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-peer-review');

        // Rating input before the question text
        const numericalFeedbackLabel = document.createElement('label');
        numericalFeedbackLabel.textContent = 'Rate (1-5):';
        questionDiv.appendChild(numericalFeedbackLabel);

        const numericalFeedbackSelect = document.createElement('select');
        numericalFeedbackSelect.setAttribute('data-question-id', question.peerReviewQuestionId);  // Use PeerReviewQuestionId here
        numericalFeedbackSelect.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        questionDiv.appendChild(numericalFeedbackSelect);

        const questionLabel = document.createElement('label');
        questionLabel.textContent = `${index + 1}. ${question.questionText}`;  // Use QuestionText for displaying the question
        questionDiv.appendChild(questionLabel);

        // Textarea for written feedback
        const answerTextarea = document.createElement('textarea');
        answerTextarea.setAttribute('data-question-id', question.peerReviewQuestionId);  // Use PeerReviewQuestionId here as well
        answerTextarea.placeholder = 'Write your response here...';
        questionDiv.appendChild(answerTextarea);

        questionsContainer.appendChild(questionDiv);
      });
    } catch (error) {
      console.error('Error fetching group members or questions:', error.message);
    }
  })();
  return peerReviewDiv;
}