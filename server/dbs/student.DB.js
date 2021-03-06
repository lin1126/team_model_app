// const mongoose = require('../../utils/mongodb')
const { student } = require('./loginDB')

// 查找某班级下所有学生
function findStudentClass(grade, career, cla) {
  return new Promise((resolve, reject) => {
    student.find({ grade: grade, career: career, class: cla }, (err, doc) => {
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
// 修改学生信息，传入学号和需要修改的字段对象
function updateStudentInfo(id, field, data) {
  if (field == 'email') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { email: data }, (err, doc) => {
        if (err) {
          reject(400)
        }
        resolve(200)
      })
    })
  } else if (field == 'phone') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { phone: data }, (err, doc) => {
        if (err) {
          reject(400)
        }
        resolve(200)
      })
    })
  } else if (field == 'place') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { place: data }, (err, doc) => {
        if (err) {
          resolve(400)
        }
        resolve(200)
      })
    })
  } else if (field == 'password') {
    return new Promise((resolve, reject) => {
      student.updateOne({ ID: id }, { password: data }, (err, doc) => {
        if (err) {
          resolve(400)
        }
        resolve(200)
      })
    })
  }
}

// 修改密码
function updatePwd(id, oldPwd, newPwd) {
  return new Promise((resolve, reject) => {
    student.find({ ID: id, password: oldPwd }, async (err, doc) => {
      if (err) {
        reject(err)
      }
      if (doc.length == 0) {
        const res = {
          isTrue: false,
          msg: '您输入的密码有误！',
        }
        resolve(res)
      } else {
        const result = await updateStudentInfo(id, 'password', newPwd)
        if (result == 200) {
          var res = {
            isTrue: true,
            msg: '密码修改成功',
          }
        } else {
          var res = {
            isTrue: false,
            msg: '系统错误，请稍后重试！',
          }
        }
        resolve(res)
      }
    })
  })
}

// 修改头像
function updatePhoto(id, data) {
  return new Promise((resolve, reject) => {
    student.updateOne({ ID: id }, { photo: data }, (err, doc) => {
      if (err) {
        reject(400)
      }
      resolve(200)
    })
  })
}
// 获取年级
function getGrade() {
  return new Promise((resolve, reject) => {
    student
      .aggregate([
        // 用group分类进行去重
        {
          $group: {
            _id: '$grade',
          },
        },
      ])
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
  })
}
// 根据年级获取专业
function getCareer(grade) {
  return new Promise((resolve, reject) => {
    student
      .aggregate([
        {
          $match: { grade: grade },
        },
        // 用group分类进行去重
        {
          $group: {
            _id: '$career',
          },
        },
      ])
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
  })
}
// 根据年级、专业获取班级
function getClass(grade, career) {
  return new Promise((resolve, reject) => {
    student
      .aggregate([
        {
          $match: { grade: grade, career: career },
        },
        // 用group分类进行去重
        {
          $group: {
            _id: '$class',
          },
        },
      ])
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        resolve(doc)
      })
  })
}
module.exports = {
  findStudentClass,
  updateStudentInfo,
  updatePwd,
  updatePhoto,
  getGrade,
  getCareer,
  getClass,
}
