// Written by Varsha Mallepalli 
// Written by Erika Mii 

export function createPeerReviewPage() {
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

  // Placeholder names
  const placeholderNames = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Emily Davis'];

  placeholderNames.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  });

  dropdownContainer.appendChild(dropdownLabel);
  dropdownContainer.appendChild(dropdown);
  contentContainer.appendChild(dropdownContainer);

  // Questions container
  const questionsContainer = document.createElement('div');
  questionsContainer.classList.add('questions-container-peer-review');

  const placeholderQuestions = [
    'What did this team member do well?',
    'What could this team member improve on?',
    'Any additional feedback?',
  ];

  placeholderQuestions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-peer-review');

    const questionLabel = document.createElement('label');
    questionLabel.textContent = `${index + 1}. ${question}`;
    questionDiv.appendChild(questionLabel);

    const answerTextarea = document.createElement('textarea');
    answerTextarea.placeholder = 'Write your response here...';
    questionDiv.appendChild(answerTextarea);

    questionsContainer.appendChild(questionDiv);
  });

  contentContainer.appendChild(questionsContainer);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Review';
  submitButton.classList.add('button-peer-review');
  contentContainer.appendChild(submitButton);

  // Add content container to the main container
  container.appendChild(contentContainer);

  // Add the container to the peer review div
  peerReviewDiv.appendChild(container);

  return peerReviewDiv;
}
