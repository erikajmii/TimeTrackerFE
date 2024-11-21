export function createPeerReviewPage() {
    const peerReviewDiv = document.createElement('div');
  
    // Header for "Time Tracker"
    const header = document.createElement('header');
    header.innerHTML = `
      <div class="header-content">
        <h1>Time Tracker</h1>
      </div>
    `;
    peerReviewDiv.appendChild(header);
  
    // Main container for sidebar and content
    const container = document.createElement('div');
    container.classList.add('container');
  
    // Sidebar navigation (reused from the homepage)
    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
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
    contentContainer.classList.add('content-container');
  
    // Title for the Peer Review page
    const title = document.createElement('h2');
    title.textContent = 'Peer Review';
    title.style.marginBottom = '20px';
    contentContainer.appendChild(title);
  
    // Questions container
    const questionsContainer = document.createElement('div');
    questionsContainer.classList.add('questions-container');
  
    // Placeholder questions
    const placeholderQuestions = [
      'What did this team member do well?',
      'What could this team member improve on?',
      'Any additional feedback?',
    ];
  
    placeholderQuestions.forEach((question, index) => {
      // Create a question container
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
  
      // Question label
      const questionLabel = document.createElement('label');
      questionLabel.textContent = `${index + 1}. ${question}`;
      questionDiv.appendChild(questionLabel);
  
      // Answer textarea
      const answerTextarea = document.createElement('textarea');
      answerTextarea.placeholder = 'Write your response here...';
      questionDiv.appendChild(answerTextarea);
  
      questionsContainer.appendChild(questionDiv);
    });
  
    contentContainer.appendChild(questionsContainer);
  
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Review';
    submitButton.addEventListener('click', () => {
      alert('Peer review responses submitted!'); // Placeholder functionality
    });
    contentContainer.appendChild(submitButton);
  
    // Add content container to the main container
    container.appendChild(contentContainer);
  
    // Add the container to the peer review div
    peerReviewDiv.appendChild(container);
  
    return peerReviewDiv;
  }
  