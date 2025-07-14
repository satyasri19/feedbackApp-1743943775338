# Teacher Feedback Assistant

## Project Overview
The **Teacher Feedback Assistant** is a web application designed to facilitate feedback management between teachers and students. It provides a dashboard for teachers to track student submissions and performance, along with a student interface for submitting assignments and receiving detailed feedback. The application is built using HTML, CSS (via TailwindCSS), and vanilla JavaScript, incorporating responsive design principles to ensure usability across various devices.

## Installation
To get started with the Teacher Feedback Assistant, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/teacher-feedback-assistant.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd teacher-feedback-assistant
   ```

3. **Open the `index.html` file:**
   You can open `index.html` directly in a web browser to run the application.
   Alternatively, you can set up a local server using tools like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in Visual Studio Code.

## Usage
After opening the application, you will see the main landing page with options to access the Teacher Dashboard and Student Dashboard.

- **Teacher Dashboard:** Allows teachers to view students, add new students, and see performance metrics.
- **Student Dashboard:** Enables students to submit assignments and view feedback on their submissions.
- **Analytics Dashboard:** Provides insights into class performance metrics.

## Features
- **Dynamic Student Management:** Teachers can add students and view their submissions.
- **Assignment Submission:** Students can submit assignments directly through the interface.
- **Automated Feedback Generation:** The application generates detailed feedback based on submission content, scoring, and suggestions for improvement.
- **Analytics Overview:** Visual representation of class performance and common feedback issues through charts.

## Dependencies
The application utilizes the following dependencies:
- [TailwindCSS](https://tailwindcss.com/) for styling.
- [Chart.js](https://www.chartjs.org/) for displaying analytical charts.
  
While no package.json is provided as part of the project files, the external resources are linked directly in the HTML files.

## Project Structure
The project contains the following main files and directories:

```
/
├── index.html                  # Main landing page
├── teacher-dashboard.html      # Teacher dashboard interface
├── student-dashboard.html      # Student dashboard interface
├── analytics.html              # Class analytics page
├── styles.css                  # Custom styles for the project
├── data.js                     # Data management functionalities
├── feedbackEngine.js           # Automated feedback generation functionalities
├── app.js                      # Main application logic controller
```

### Additional Notes
- This application uses **localStorage** to manage data, ensuring that the data is preserved even after the page is refreshed.
- Please ensure to use a modern browser for the best compatibility with web technologies utilized in the project.

## Contributing
Contributions are welcome! If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.
