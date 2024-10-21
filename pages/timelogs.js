// timelogs.js
export function createTimeLogsPage() {
  const timeLogsDiv = document.createElement('div');

  // Create title for the Time Logs page
  const title = document.createElement('h1');
  title.textContent = 'Time Logs';
  timeLogsDiv.appendChild(title);

  // Create container for tabs
  const tabsContainer = document.createElement('div');
  tabsContainer.classList.add('tabs-container');

  // Create list of tabs for different students
  const tabsList = document.createElement('ul');
  tabsList.classList.add('tabs-list');

  const students = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];

  students.forEach((student, index) => {
    const tab = document.createElement('li');
    tab.classList.add('tab-item');
    tab.textContent = student;
    tab.dataset.student = index + 1; // Add a data attribute for student number
    tab.addEventListener('click', () => switchTab(index + 1));
    tabsList.appendChild(tab);
  });

  tabsContainer.appendChild(tabsList);
  timeLogsDiv.appendChild(tabsContainer);

  // Create content container for each student's logs
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('tab-content-container');

  // Create content for each student and hide it initially
  students.forEach((student, index) => {
    const studentContent = document.createElement('div');
    studentContent.classList.add('student-content');
    studentContent.id = `student-${index + 1}`;
    studentContent.style.display = 'none'; 

    const studentTitle = document.createElement('h2');
    studentTitle.textContent = `${student} Logs`;
    studentContent.appendChild(studentTitle);

    const logParagraph = document.createElement('p');
    logParagraph.textContent = `Logs for ${student} will be displayed here.`;
    studentContent.appendChild(logParagraph);

    contentContainer.appendChild(studentContent);
  });

  timeLogsDiv.appendChild(contentContainer);

  // Function to switch between tabs
  function switchTab(studentNumber) {
    const allContent = document.querySelectorAll('.student-content');
    allContent.forEach((content) => (content.style.display = 'none')); // Hide all content

    const selectedContent = document.getElementById(`student-${studentNumber}`);
    selectedContent.style.display = 'block'; // Show the selected student's content

    const allTabs = document.querySelectorAll('.tab-item');
    allTabs.forEach((tab) => tab.classList.remove('active-tab')); // Remove active class from all tabs

    const selectedTab = document.querySelector(`.tab-item[data-student="${studentNumber}"]`);
    selectedTab.classList.add('active-tab'); // Add active class to the selected tab
  }

  // Activate the first tab by default
  switchTab(1);

  return timeLogsDiv;
}
