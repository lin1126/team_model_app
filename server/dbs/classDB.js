const { student } = require('./loginDB')
// 查找某班级下所有学生
function getStudentClass(grade, career, cla) {
  return new Promise((resolve, reject) => {
    student.aggregate(
      [
        {
          $match: { grade: grade, career: career, class: cla },
        },
        {
          $project: { name: 1, ID: 1, identity: 1 },
        },
        {
          $sort: { ID: 1 },
        },
      ],
      (err, doc) => {
        if (err) {
          reject(err)
        }
        const res = {
          stuList: doc,
          stuLength: doc.length,
        }
        resolve(res)
      }
    )
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
// 添加学生
function addStudent(data) {
  return new Promise((resolve, reject) => {
    const u = new student(data)
    u.save((err) => {
      if (err) {
        resolve({ code: 408, msg: '学号已存在，请重新填写' })
      }
      resolve({ code: 200, msg: '学生添加成功！' })
    })
  })
}

// 删除学生
function delStudent(id) {
  return new Promise((resolve, reject) => {
    student.deleteOne({ ID: id }, (err, doc) => {
      if (err) {
        resolve(222)
      }
      resolve(200)
    })
  })
}
module.exports = {
  getStudentClass,
  getStuInfo,
  addStudent,
  delStudent,
}
