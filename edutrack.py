# ================= BOOK CLASS =================
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.available = True


# ================= STUDENT CLASS =================
class Student:
    def __init__(self, name, skills, marks):
        self.name = name
        self.skills = skills
        self.marks = marks

    def performance(self):
        if self.marks >= 85:
            return "Excellent"
        elif self.marks >= 60:
            return "Good"
        else:
            return "Needs Improvement"


# ================= MAIN SYSTEM CLASS =================
class EduTrackSystem:
    def __init__(self):
        self.books = []
        self.students = []

    # ---------- Add Book ----------
    def add_book(self):
        title = input("Enter book title: ")
        author = input("Enter author name: ")

        book = Book(title, author)
        self.books.append(book)

        print(f"\n'{title}' added successfully!")

    # ---------- View Books ----------
    def view_books(self):
        if not self.books:
            print("\nNo books available.")
            return

        print("\n===== BOOK LIST =====")

        for index, book in enumerate(self.books):
            status = "Available" if book.available else "Borrowed"

            print(f"{index + 1}. {book.title} by {book.author} - {status}")

    # ---------- Borrow Book ----------
    def borrow_book(self):
        title = input("Enter book title to borrow: ")

        for book in self.books:
            if book.title.lower() == title.lower():

                if book.available:
                    book.available = False
                    print(f"\nYou borrowed '{book.title}'")

                else:
                    print("\nBook already borrowed.")

                return

        print("\nBook not found.")

    # ---------- Return Book ----------
    def return_book(self):
        title = input("Enter book title to return: ")

        for book in self.books:
            if book.title.lower() == title.lower():

                if not book.available:
                    book.available = True
                    print(f"\nYou returned '{book.title}'")

                else:
                    print("\nBook was not borrowed.")

                return

        print("\nBook not found.")

    # ---------- Add Student ----------
    def add_student(self):
        name = input("Enter student name: ")

        skills_input = input("Enter skills (comma separated): ")
        skills = skills_input.split(",")

        marks = int(input("Enter marks: "))

        student = Student(name, skills, marks)
        self.students.append(student)

        print(f"\n{name} added successfully!")

    # ---------- View Students ----------
    def view_students(self):
        if not self.students:
            print("\nNo students available.")
            return

        print("\n===== STUDENT LIST =====")

        for s in self.students:
            print(f"\nName: {s.name}")
            print(f"Skills: {', '.join(s.skills)}")
            print(f"Marks: {s.marks}")
            print(f"Performance: {s.performance()}")

    # ---------- Search Student ----------
    def search_student(self):
        name = input("Enter student name to search: ")

        for s in self.students:
            if s.name.lower() == name.lower():

                print(f"\nName: {s.name}")
                print(f"Skills: {', '.join(s.skills)}")
                print(f"Marks: {s.marks}")
                print(f"Performance: {s.performance()}")

                return

        print("\nStudent not found.")

     # ---------- Find Top Performer ----------
    def find_topper(self):

        if not self.students:
            print("\nNo students available.")
            return

        topper = max(self.students, key=lambda s: s.marks)

        print("\n🏆 TOP PERFORMER")
        print(f"Name: {topper.name}")
        print(f"Marks: {topper.marks}")
        print(f"Performance: {topper.performance()}")


# ================= MAIN PROGRAM =================
system = EduTrackSystem()

while True:
    print("\n====== EduTrack Management System ======")
    print("1. Add Book")
    print("2. View Books")
    print("3. Add Student")
    print("4. View Students")
    print("5. Borrow Book")
    print("6. Return Book")
    print("7. Search Student")
    print("8. Find Top Performer")
    print("9. Exit")

    choice = input("\nEnter your choice: ")

    # ---------- Conditions ----------
    if choice == "1":
        system.add_book()

    elif choice == "2":
        system.view_books()

    elif choice == "3":
        system.add_student()

    elif choice == "4":
        system.view_students()

    elif choice == "5":
        system.borrow_book()

    elif choice == "6":
        system.return_book()

    elif choice == "7":
        system.search_student()

    elif choice == "8":
        system.find_topper()

    elif choice == "9":
        print("\nExiting Program...")
        break