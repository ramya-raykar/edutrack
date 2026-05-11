import { useState, useEffect } from "react";

function Student({ setTopper }) {

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents
      ? JSON.parse(savedStudents)
      : [];
  });

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [marks, setMarks] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {

    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );

    if (students.length > 0) {

      const topStudent = students.reduce(
        (prev, current) =>
          prev.marks > current.marks
            ? prev
            : current
      );

      setTopper(topStudent);
    }

  }, [students, setTopper]);

  // Add Student

  const addStudent = () => {

    if (
      name === "" ||
      skills === "" ||
      marks === ""
    ) {
      alert("Fill all fields");
      return;
    }

    const newStudent = {
      name,
      skills,
      marks: Number(marks),
    };

    setStudents([...students, newStudent]);

    setName("");
    setSkills("");
    setMarks("");
  };

  // Delete Student

  const deleteStudent = (index) => {

    const updatedStudents =
      students.filter((_, i) => i !== index);

    setStudents(updatedStudents);
  };

  // Search Logic

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="card">

      <h2>👨‍🎓 Students</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Skills"
        value={skills}
        onChange={(e) =>
          setSkills(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) =>
          setMarks(e.target.value)
        }
      />

      <button onClick={addStudent}>
        Add Student
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Search Student"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filteredStudents.map(
        (student, index) => (

          <div
            key={index}
            className="student-box"
          >

            <h3>{student.name}</h3>

            <p>
              Skills: {student.skills}
            </p>

            <p>
              Marks: {student.marks}
            </p>

            <button
              onClick={() =>
                deleteStudent(index)
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

export default Student;