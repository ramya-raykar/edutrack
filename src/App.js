import "./App.css";

import { useState, useEffect } from "react";

import Student from "./Student";
import Books from "./Books";
import Topper from "./Topper";

function App() {

  const [topper, setTopper] = useState(null);

  const [studentCount, setStudentCount] = useState(0);

  const [bookCount, setBookCount] = useState(0);

  const [borrowedCount, setBorrowedCount] = useState(0);

  useEffect(() => {

    // Students Count

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudentCount(students.length);

    // Books Count

    const books =
      JSON.parse(localStorage.getItem("books")) || [];

    setBookCount(books.length);

    // Borrowed Books Count

    const borrowedBooks = books.filter(
      (book) => book.status === "Borrowed"
    );

    setBorrowedCount(borrowedBooks.length);

  }, []);

  return (
    <div className="App">

      {/* Navbar */}

      <div className="navbar">
        <h1>📚 EduTrack Management System</h1>
      </div>

      {/* Dashboard Stats */}

      <div className="stats-container">

        <div className="stats-card">
          <h2>👨‍🎓 Students</h2>
          <p>{studentCount}</p>
        </div>

        <div className="stats-card">
          <h2>📚 Books</h2>
          <p>{bookCount}</p>
        </div>

        <div className="stats-card">
          <h2>📕 Borrowed</h2>
          <p>{borrowedCount}</p>
        </div>

      </div>

      {/* Main Dashboard */}

      <div className="container">

        <Student setTopper={setTopper} />

        <Books />

        <Topper topper={topper} />

      </div>

    </div>
  );
}

export default App;