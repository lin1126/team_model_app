// const mongoose = require('../../utils/mongodb')
const { student } = require('./loginDB')

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
// 修改学生信息，传入学号和需要修改的字段对象
function updateStudentInfo(id, field, data) {
  if (field == 'email') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { email: data }, (err, doc) => {
        if (err) {
          reject('400')
        }
        resolve('200')
      })
    })
  } else if (field == 'phone') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { phone: data }, (err, doc) => {
        if (err) {
          reject('400')
        }
        resolve('200')
      })
    })
  } else if (field == 'place') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { place: data }, (err, doc) => {
        if (err) {
          resolve('400')
        }
        resolve('200')
      })
    })
  }
}

module.exports = {
  findStudentClass,
  updateStudentInfo,
}
