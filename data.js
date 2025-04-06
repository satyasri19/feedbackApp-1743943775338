// Data storage and management
const DataManager = {
    // Initialize data structure if not exists
    init() {
        if (!localStorage.getItem('feedbackSystem')) {
            const initialData = {
                students: [],
                submissions: [],
                feedback: []
            };
            localStorage.setItem('feedbackSystem', JSON.stringify(initialData));
        }
    },

    // Get all data
    getAllData() {
        return JSON.parse(localStorage.getItem('feedbackSystem'));
    },

    // Save all data
    saveAllData(data) {
        localStorage.setItem('feedbackSystem', JSON.stringify(data));
    },

    // Student operations
    addStudent(student) {
        const data = this.getAllData();
        data.students.push(student);
        this.saveAllData(data);
    },

    getStudents() {
        return this.getAllData().students;
    },

    // Submission operations
    addSubmission(submission) {
        const data = this.getAllData();
        data.submissions.push(submission);
        this.saveAllData(data);
    },

    getSubmissions(studentId) {
        return this.getAllData().submissions.filter(s => s.studentId === studentId);
    },

    // Feedback operations
    addFeedback(feedback) {
        const data = this.getAllData();
        data.feedback.push(feedback);
        this.saveAllData(data);
    },

    getFeedback(submissionId) {
        return this.getAllData().feedback.filter(f => f.submissionId === submissionId);
    },

    // Analytics operations
    getClassPerformance() {
        const feedbacks = this.getAllData().feedback;
        // Calculate performance metrics
        return {
            averageScore: this.calculateAverageScore(feedbacks),
            commonIssues: this.findCommonIssues(feedbacks)
        };
    },

    calculateAverageScore(feedbacks) {
        if (feedbacks.length === 0) return 0;
        const total = feedbacks.reduce((sum, f) => sum + (f.score || 0), 0);
        return total / feedbacks.length;
    },

    findCommonIssues(feedbacks) {
        // Implementation for finding common feedback issues
        const issues = {};
        feedbacks.forEach(f => {
            if (f.areasForImprovement) {
                f.areasForImprovement.forEach(issue => {
                    issues[issue] = (issues[issue] || 0) + 1;
                });
            }
        });
        return Object.entries(issues)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }
};

// Initialize data manager when loaded
DataManager.init();