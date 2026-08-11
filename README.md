# 🎯 QuizMaster – Online Quiz Game

QuizMaster is a full-stack **Online Quiz Game** developed using the **MERN Stack**. The application allows users to register and securely log in, participate in timed quizzes, view instant results, track their quiz history, analyze their performance, and compare their scores through a leaderboard.

---

## 🚀 Features

- 🔐 User Registration and Login
- 🔑 Secure JWT Authentication
- 🛡️ Protected Routes
- 📚 Multiple Quiz Categories
- ⏱️ Timed Quizzes
- 📝 Interactive Quiz Interface
- 🎯 Instant Quiz Results
- 👤 User Profile
- 📊 Performance Statistics
- 📜 Quiz History
- 🏆 Leaderboard
- 👥 User-specific Results
- 📱 Responsive User Interface
- 💾 MongoDB Database

---

## 📚 Quiz Categories

QuizMaster currently provides quizzes in the following categories:

- ☕ Java
- 🐍 Python
- 🌐 Web Development
- 🗄️ DBMS
- 💻 Operating Systems
- 🧮 Aptitude

---

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Router

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- bcryptjs
- Protected Routes
- Environment Variables

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```text
Online-Quiz-Game/
│
├── client/                     # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       ├── ProtectedRoute.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/                     # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seedQuestions.js
│   └── server.js
│
├── .gitignore
└── README.md
