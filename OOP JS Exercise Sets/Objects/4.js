/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name : name,
    year: year,
    courses: [],
    courseMatch: {},
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(courseObj) {
      this.courses.push(courseObj);

      this.courseMatch[courseObj.code] = courseObj.name;
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(courseCode, note) {
      if (this.notes[courseCode]) {
        this.notes[courseCode] = `${this.notes[courseCode]}; ${note}`;
      } else {
        this.notes[courseCode] = note;
      }
    },

    updateNote(courseCode, note) {
      this.notes[courseCode] = note;
    },

    viewNotes() {
      for (let course in this.notes) {
        let courseName = this.courseMatch[course];
        console.log(`${courseName}: ${this.notes[course]}`);
      }
    }
  };
}

let foo = createStudent('Foo', '1st');
foo.info(); // "Foo is a 1st year student"
foo.listCourses(); // [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
//"Math: Fun course"
//"Advanced Math: Difficult subject"