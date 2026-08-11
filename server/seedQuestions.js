const mongoose = require("mongoose");
const dns = require("node:dns");
require("dotenv").config();

const Question = require("./models/Question");

// DNS fix
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const questions = [
  {
    category: "Java",
    question: "Which keyword is used to create a class in Java?",
    options: ["function", "class", "struct", "define"],
    answer: "class",
  },
  {
    category: "Java",
    question: "Which method is the entry point of a Java program?",
    options: ["start()", "main()", "run()", "execute()"],
    answer: "main()",
  },
  {
    category: "Java",
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    answer: "extends",
  },

  {
    category: "Python",
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/*", "<!--"],
    answer: "#",
  },
  {
    category: "Python",
    question: "Which function is used to display output in Python?",
    options: ["echo()", "print()", "display()", "output()"],
    answer: "print()",
  },
  {
    category: "Python",
    question: "Which data type stores multiple values in an ordered collection?",
    options: ["List", "Integer", "Boolean", "Float"],
    answer: "List",
  },

  {
    category: "Web Development",
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "Java", "SQL"],
    answer: "CSS",
  },
  {
    category: "Web Development",
    question: "Which language is used to add interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: "JavaScript",
  },
  {
    category: "Web Development",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },

  {
    category: "DBMS",
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"],
    answer: "MongoDB",
  },
  {
    category: "DBMS",
    question: "Which language is commonly used to query relational databases?",
    options: ["HTML", "SQL", "CSS", "Python"],
    answer: "SQL",
  },
  {
    category: "DBMS",
    question: "What does DBMS stand for?",
    options: [
      "Database Management System",
      "Data Backup Management System",
      "Database Machine System",
      "Data Management Service",
    ],
    answer: "Database Management System",
  },

  {
    category: "Operating Systems",
    question: "Which of the following is an operating system?",
    options: ["Linux", "MongoDB", "React", "Node.js"],
    answer: "Linux",
  },
  {
    category: "Operating Systems",
    question: "Which component manages computer hardware and software resources?",
    options: ["Browser", "Operating System", "Compiler", "Database"],
    answer: "Operating System",
  },
  {
    category: "Operating Systems",
    question: "Which scheduling algorithm uses a queue structure?",
    options: ["Round Robin", "Binary Search", "DFS", "Merge Sort"],
    answer: "Round Robin",
  },

  {
    category: "Aptitude",
    question: "What is 15 + 25?",
    options: ["30", "35", "40", "45"],
    answer: "40",
  },
  {
    category: "Aptitude",
    question: "What is 20% of 200?",
    options: ["20", "30", "40", "50"],
    answer: "40",
  },
  {
    category: "Aptitude",
    question: "If a train travels 60 km in 1 hour, what is its speed?",
    options: ["30 km/h", "45 km/h", "60 km/h", "90 km/h"],
    answer: "60 km/h",
  },
];

async function seedQuestions() {
  try {
    console.log("Connecting to MongoDB...");

    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");

    await Question.deleteMany();

    console.log("🗑️ Old questions removed");

    await Question.insertMany(questions);

    console.log(
      `✅ ${questions.length} questions inserted successfully`
    );

    await mongoose.connection.close();

    console.log("✅ Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB Error:");
    console.error(error);

    process.exit(1);
  }
}

seedQuestions();