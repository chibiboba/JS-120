/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    /* 
    [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
    ],
    */
    courseMatch: {},
    notes: {}, // {101: 'difficult subject', 102: 'fun course; remeber to study for algebra'}
    info: function () {
      console.log(`${this.name} is a ${this.year} student`);
    },

    addCourse: function (course) {
      this.courses.push(course);

      this.courseMatch[course.code] = course.name;
    },

    listCourses() {
      return this.courses;
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


function createSchool() {
  return {
    students: [], // array of student objects

    addStudent(name, year) {
      if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
        let student = createStudent(name, year);
        this.students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent(student, courseName, code) {
      student.addCourse({name: courseName, code: code});
    },

    addGrade(student, courseName, grade) {
      let course = student.courses.find(course => {
        return course.name === courseName;
      });

      if (course) { // in case find returns undefined.
        course.grade = grade; // modifying the nested course object. objects are mutable.
      }
    },

    getReportCard(student) {
      student.courses.forEach(course => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      let grades = [];
      console.log(`=${courseName} Grades=`);

      this.students.forEach(student => {
        let course = student.courses.find(course => course.name === courseName);

        if (course && ('grade' in course)) {
          console.log(`${student.name}: ${course.grade}`);
          grades.push(course.grade);
        }
      });
      console.log(`---`);
      let courseSum = grades.reduce((a, b) => a + b, 0);
      let courseAverage = courseSum / grades.length;
      if (courseAverage > 1) {
        console.log(`Course Average: ${courseAverage}`);
        console.log("");
      } else {
        return undefined;
      }
    },
  };
}

let school = createSchool();

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);
school.getReportCard(foo);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);
school.getReportCard(bar);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);
school.getReportCard(qux);

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');