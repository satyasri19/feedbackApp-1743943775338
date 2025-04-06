// Main application controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components based on current page
    const path = window.location.pathname.split('/').pop();
    
    switch(path) {
        case 'teacher-dashboard.html':
            initTeacherDashboard();
            break;
        case 'student-dashboard.html':
            initStudentDashboard();
            break;
        case 'analytics.html':
            initAnalyticsDashboard();
            break;
        default:
            // For index.html or other pages
            break;
    }
});

// Teacher Dashboard Functions
function initTeacherDashboard() {
    // Load and display students
    renderStudentCards();
    
    // Add student button handler
    document.getElementById('add-student').addEventListener('click', function() {
        const name = prompt("Enter student name:");
        if (name) {
            const student = {
                id: Date.now().toString(),
                name: name,
                joinDate: new Date().toISOString()
            };
            DataManager.addStudent(student);
            renderStudentCards();
        }
    });
}

function renderStudentCards() {
    const container = document.getElementById('student-cards');
    container.innerHTML = '';
    
    const students = DataManager.getStudents();
    students.forEach(student => {
        const submissions = DataManager.getSubmissions(student.id);
        const feedbacks = submissions.flatMap(s => DataManager.getFeedback(s.id));
        
        const card = document.createElement('div');
        card.className = 'student-card bg-white p-4 rounded shadow';
        card.innerHTML = `
            <h3 class="text-xl font-semibold">${student.name}</h3>
            <p class="text-gray-600">Joined: ${new Date(student.joinDate).toLocaleDateString()}</p>
            <div class="mt-2">
                <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Submissions: ${submissions.length}
                </span>
                <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm ml-2">
                    Avg Score: ${calculateAverageScore(feedbacks)}%
                </span>
            </div>
            <button class="view-feedback mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm" 
                    data-student-id="${student.id}">
                View Feedback
            </button>
        `;
        container.appendChild(card);
    });
    
    // Add event listeners to feedback buttons
    document.querySelectorAll('.view-feedback').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-student-id');
            viewStudentFeedback(studentId);
        });
    });
}

function calculateAverageScore(feedbacks) {
    if (feedbacks.length === 0) return 'N/A';
    const total = feedbacks.reduce((sum, f) => sum + (f.score || 0), 0);
    return Math.round(total / feedbacks.length);
}

function viewStudentFeedback(studentId) {
    // Implementation for viewing detailed feedback
    alert(`Viewing feedback for student ${studentId}`);
}

// Student Dashboard Functions
function initStudentDashboard() {
    // Load and display previous submissions and feedback
    renderPreviousFeedback();
    
    // Setup submission form
    document.getElementById('submit-assignment').addEventListener('click', function() {
        const text = document.getElementById('assignment-text').value.trim();
        if (text.length < 100) {
            alert('Please write at least 100 characters for your assignment.');
            return;
        }
        
        const submission = {
            id: Date.now().toString(),
            text: text,
            date: new Date().toISOString(),
            studentId: 'current-student' // In a real app, this would be the logged-in student's ID
        };
        
        // Generate and save feedback
        const feedback = FeedbackEngine.generateFeedback(text);
        feedback.submissionId = submission.id;
        
        DataManager.addSubmission(submission);
        DataManager.addFeedback(feedback);
        
        // Clear and show success
        document.getElementById('assignment-text').value = '';
        alert('Assignment submitted successfully!');
        renderPreviousFeedback();
    });
}

function renderPreviousFeedback() {
    const container = document.getElementById('feedback-cards');
    container.innerHTML = '';
    
    const submissions = DataManager.getSubmissions('current-student');
    submissions.forEach(submission => {
        const feedback = DataManager.getFeedback(submission.id)[0];
        if (!feedback) return;
        
        const card = document.createElement('div');
        card.className = 'feedback-card bg-white p-4 rounded shadow mb-4';
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold">Submission on ${new Date(submission.date).toLocaleDateString()}</h3>
                <span class="inline-block px-2 py-1 rounded text-sm 
                    ${feedback.score > 70 ? 'bg-green-100 text-green-800' : 
                      feedback.score > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                    Score: ${feedback.score}%
                </span>
            </div>
            <div class="mt-2">
                <h4 class="font-medium">Strengths:</h4>
                <ul class="list-disc list-inside">
                    ${feedback.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
            <div class="mt-2">
                <h4 class="font-medium">Areas for Improvement:</h4>
                <ul class="list-disc list-inside">
                    ${feedback.areasForImprovement.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
            <div class="mt-2">
                <h4 class="font-medium">Detailed Feedback:</h4>
                <p>${feedback.detailedFeedback}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Analytics Dashboard Functions
function initAnalyticsDashboard() {
    // Load and render charts
    renderPerformanceChart();
    renderFeedbackChart();
    renderImprovementChart();
    renderIssuesChart();
}

function renderPerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const data = DataManager.getClassPerformance();
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Class Average'],
            datasets: [{
                label: 'Performance Score',
                data: [data.averageScore],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function renderFeedbackChart() {
    const ctx = document.getElementById('feedbackChart').getContext('2d');
    const feedbacks = DataManager.getAllData().feedback;
    
    // Count feedback categories
    const categories = {
        'Structure': 0,
        'Content': 0,
        'Grammar': 0,
        'Originality': 0
    };
    
    feedbacks.forEach(f => {
        if (f.areasForImprovement.some(a => a.includes('paragraph') || a.includes('structure'))) {
            categories['Structure']++;
        }
        if (f.areasForImprovement.some(a => a.includes('thesis') || a.includes('evidence') || a.includes('analysis'))) {
            categories['Content']++;
        }
        if (f.areasForImprovement.some(a => a.includes('grammar'))) {
            categories['Grammar']++;
        }
    });
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

function renderImprovementChart() {
    // Implementation for improvement trends chart
    const ctx = document.getElementById('improvementChart').getContext('2d');
    // Sample data - in real app would use actual student progress data
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Class Average Score',
                data: [65, 68, 72, 75],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        }
    });
}

function renderIssuesChart() {
    const ctx = document.getElementById('issuesChart').getContext('2d');
    const commonIssues = DataManager.getClassPerformance().commonIssues;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: commonIssues.map(i => i[0]),
            datasets: [{
                label: 'Frequency',
                data: commonIssues.map(i => i[1]),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        }
    });
}