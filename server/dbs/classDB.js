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
// 根据学号查询学生信息
function getStuInfo(ID) {
  return new Promise((resolve, reject) => {
    student.find({ ID: ID }, (err, doc) => {
      if (err) {
        reject(400)
      }
      resolve(doc)
    })
  })
}
module.exports = {
  getStudentClass,
  getStuInfo,
}
