import { useState, useEffect } from "react";

function Books() {

  const [books, setBooks] = useState(() => {

    const savedBooks =
      localStorage.getItem("books");

    return savedBooks
      ? JSON.parse(savedBooks)
      : [];
  });

  const [bookName, setBookName] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [searchBook, setSearchBook] =
    useState("");

  useEffect(() => {

    localStorage.setItem(
      "books",
      JSON.stringify(books)
    );

  }, [books]);

  // Add Book

  const addBook = () => {

    if (bookName === "") {
      alert("Enter book name");
      return;
    }

    const newBook = {
      name: bookName,
      status: "Available",
      borrowedBy: "",
      borrowDate: "",
      deadline: "",
    };

    setBooks([...books, newBook]);

    setBookName("");
  };

  // Borrow Book

  const borrowBook = (index) => {

    if (studentName === "") {
      alert("Enter student name");
      return;
    }

    const updatedBooks = [...books];

    const today = new Date();

    const deadline = new Date();

    deadline.setDate(
      today.getDate() + 7
    );

    updatedBooks[index].status =
      "Borrowed";

    updatedBooks[index].borrowedBy =
      studentName;

    updatedBooks[index].borrowDate =
      today.toLocaleDateString();

    updatedBooks[index].deadline =
      deadline.toLocaleDateString();

    setBooks(updatedBooks);

    setStudentName("");
  };

  // Return Book

  const returnBook = (index) => {

    const updatedBooks = [...books];

    updatedBooks[index].status =
      "Available";

    updatedBooks[index].borrowedBy =
      "";

    updatedBooks[index].borrowDate =
      "";

    updatedBooks[index].deadline =
      "";

    setBooks(updatedBooks);
  };

  // Delete Book

  const deleteBook = (index) => {

    const updatedBooks =
      books.filter((_, i) => i !== index);

    setBooks(updatedBooks);
  };

  // Search Logic

  const filteredBooks = books.filter(
    (book) =>
      book.name
        .toLowerCase()
        .includes(
          searchBook.toLowerCase()
        )
  );

  return (
    <div className="card">

      <h2>📚 Library</h2>

      <input
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) =>
          setBookName(e.target.value)
        }
      />

      <button onClick={addBook}>
        Add Book
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) =>
          setStudentName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Search Book"
        value={searchBook}
        onChange={(e) =>
          setSearchBook(e.target.value)
        }
      />

      {filteredBooks.map(
        (book, index) => (

          <div
            key={index}
            className="student-box"
          >

            <h3>{book.name}</h3>

            <p>
              Status: {book.status}
            </p>

            {book.status ===
              "Borrowed" && (
              <>
                <p>
                  Borrowed By:
                  {" "}
                  {book.borrowedBy}
                </p>

                <p>
                  Borrow Date:
                  {" "}
                  {book.borrowDate}
                </p>

                <p>
                  Deadline:
                  {" "}
                  {book.deadline}
                </p>
              </>
            )}

            {book.status ===
            "Available" ? (

              <button
                onClick={() =>
                  borrowBook(index)
                }
              >
                Borrow
              </button>

            ) : (

              <button
                onClick={() =>
                  returnBook(index)
                }
              >
                Return
              </button>

            )}

            <br />
            <br />

            <button
              onClick={() =>
                deleteBook(index)
              }
            >
              Delete
            </button>

          </div>
        )
      )}

    </div>
  );
}

export default Books;