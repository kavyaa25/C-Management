# Candidate Management Web Application

## Objective
This web application is designed to display, search, filter, and manage candidates' data using modern web technologies.

---

## Features

### Candidate Table View
- Displays a list of candidates in a tabular format with the following columns:
  - **Name**: The candidate's full name.
  - **Phone**: The candidate's contact number.
  - **Email**: The candidate's email address.
  - **Gender**: Male, Female, or Other.
  - **Experience**: 1 Year, 2 Years, 3 Years, etc.
  - **Skills**: A list of the candidate's skills, e.g., JavaScript, Python.

### Add Candidate
- An **Add Candidate** button is available at the top of the page.
- Clicking the button opens a form (modal or separate page) to input the following details:
  - **Name**: Text input.
  - **Phone**: Number input.
  - **Email**: Email input.
  - **Gender**: Dropdown with options (Male, Female, Other).
  - **Experience**: Dropdown with options (1 Year, 2 Years, 3 Years, etc.).
  - **Skills**: Multi-select field for adding multiple skills.
- On submission:
  - The candidate's data is stored in the backend database.
  - The new candidate is displayed in the table.

### Search Functionality
- **Search Bar**: Available at the top for real-time searching by:
  - Name
  - Phone
  - Email
- Results dynamically update as the user types.

### Pagination
- Supports pagination for large datasets:
  - Displays a fixed number of candidates per page (e.g., 10).
  - Includes **Next** and **Previous** buttons for navigation.

### Filtering
- **Filter Icon**: Located at the top-right of the page, enabling filtering by:
  - **Gender**: Male, Female, Other.
  - **Experience**: Based on the number of years.
  - **Skills**: Select one or more skills to filter candidates.
- The table dynamically updates based on filter criteria.

---

## Technology Stack

### Frontend
- **React.js**
  - Component-based architecture for a responsive and interactive UI.

### Backend
- **Node.js** (with Express.js) or **Python** (with Flask/Django)
  - Provides RESTful APIs for managing candidate data.

### Database
- **MongoDB**, **MySQL**, or **PostgreSQL**
  - Stores candidate data with a structured schema.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (for Express.js backend)
- **Python** (for Flask/Django backend)
- **MongoDB**, **MySQL**, or **PostgreSQL** (for the database)
- **Git** (for cloning the repository)

### Local Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/kavyaa25/C-Management.git
cd C-Management
```

#### 2. Backend Setup
- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  # OR
  pip install -r requirements.txt
  ```
- Configure the database connection in the `config` file.
- Start the backend server:
  ```bash
  npm start
  # OR
  python app.py
  ```

#### 3. Frontend Setup
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the React development server:
  ```bash
  npm start
  ```

#### 4. Access the Application
- Open your browser and navigate to: `http://localhost:3000`

---

## Database Configuration
- **For SQL Databases**:
  - Import the provided sample database dump into your database.
- **For MongoDB**:
  - Execute the provided seed script to populate the database with sample data.

---

## Sample Data
- Sample data files are available in the `data` directory for testing purposes.

---

## Contribution Guidelines

We welcome contributions! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request for review.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For questions or feedback, please reach out to [kavyaa25](https://github.com/kavyaa25).

---

## Screenshots (Optional)
Include screenshots of the application here to enhance the documentation.
