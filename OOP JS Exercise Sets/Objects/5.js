/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name: name,
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
        this.notes[courseCode] = `${this.notes[courseCode]}, ${note}`;
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

let school = createSchool();

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202 );
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

function createSchool() {
  return {
    students: [],
    addStudent(name, year) {
      if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
        let student = createStudent(name, year);
        this.students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode});
    },

    addGrade(student, courseName, grade) {
      let index = this.students.indexOf(student);
      let theStudent = this.students[index];
      theStudent.courses.forEach(course => {
        if (course.name === courseName) {
          course.grade = grade;
        }
      });
    },

    getReportCard(student) {
      let index = this.students.indexOf(student);
      let theStudent = this.students[index];
      theStudent.courses.forEach(course => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      console.log(`=${courseName} Grades=`);
      let grades = [];

      for (let index = 0; index < this.students.length; index += 1) {
        let student = this.students[index];
        let specificCourse = student.courses.find(course => {
          return course.name === courseName;
        });

        if (specificCourse !== undefined) {
          if (Object.getOwnPropertyNames(specificCourse).includes('grade')) {
            console.log(`${student.name}: ${specificCourse.grade}`);
            grades.push(specificCourse.grade);
          }
        }
      }

      console.log(`---`);
      let sum = grades.reduce((a, b) => a + b, 0);
      let average = sum / grades.length;
      if (average > 1 ) {
        console.log(`Course Average: ${average}`);
        console.log("");
      } else {
        return undefined;
      }
    },
  };
}