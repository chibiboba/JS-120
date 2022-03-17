
// eslint-disable-next-line max-lines-per-function
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    courseMatch: {},
    notes: {}, // {101: 'difficult subject', 102: 'fun course; remeber to study for algebra'}
    info: function() {
      console.log(`${this.name} is a ${this.year} student`);
    },

    addCourse: function(course) {
      this.courses.push(course);

      this.courseMatch[course.code] = course.name;
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, note) {
      if (this.notes[code]) {
        this.notes[code] = `${this.notes[code]}; ${note}`;
      } else {
        this.notes[code] = note;
      }
    },


    updateNote(code, note) {
      this.notes[code] = note;
    },

    viewNotes() {
      for (let code in this.notes) {
        let courseName = this.courseMatch[code];
        console.log(`${courseName}: ${this.notes[code]}`);
      }
    }
  };
}

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
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
// "Math: Fun course"
// "Advanced Math: Difficult subject"