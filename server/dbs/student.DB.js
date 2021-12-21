const mongoose = require('../../utils/mongodb')

const studentSchema = mongoose.Schema({
  ID: Number,
  password: String,
  name: String,
  school: String,
  college: String,
  grade: String,
  career: String,
  class: Number,
  phone: String,
  email: String,
  photo: String,
  identity: String,
  place: String,
})

const student = mongoose.model('Student_db', studentSchema, 'student_db')

function findStudentClass(grade, career, cla) {
  return new Promise((resolve, reject) => {
    student.find({ grade: grade, career: career, class: cla }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

module.exports = {
  findStudentClass,
}
