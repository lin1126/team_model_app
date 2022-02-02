const { student } = require('./loginDB')
// 查找某班级下所有学生
function getStudentClass(grade, career, cla) {
  return new Promise((resolve, reject) => {
    student.find({ grade: grade, career: career, class: cla }, { name: 1, ID: 1, identity: 1 }, (err, doc) => {
      if (err) {
        reject(err)
      }
      const res = {
        stuList: doc,
        stuLength: doc.length,
      }
      resolve(res)
    })
  })
}
module.exports = {
  getStudentClass,
}
