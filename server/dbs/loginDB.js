/******************************************************
 * 本文件封装与学生信息有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')

// 定义schema
const studentSchema = mongoose.Schema({
  ID: {
    type: Number,
    unique: true,
  },
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

// 判断用户名密码
// 没有该账号----10004
// 验证成功----10000
// 验证失败----10001
function verifyUser(username, userpwd) {
  return new Promise((resolve, reject) => {
    student.findOne({ ID: username }, function (err, doc) {
      // 如果没有该账号是返回10001
      if (err) {
        reject(err)
        return
      }
      if (!doc) {
        resolve({
          code: '10004',
          mes: '没有该账号',
        })
        return
      }
      if (doc.password == userpwd) {
        resolve({
          code: '10000',
          mes: '验证成功',
          identify: doc.identity,
        })
        return
      } else {
        resolve({
          code: '10001',
          mes: '密码验证失败',
        })
        return
      }
    })
  })
}
// 利用token获取学生信息
function getStuInfo(data) {
  return new Promise((resolve, reject) => {
    student.find({ ID: data }, (err, doc) => {
      if (err) {
        reject('查询用户信息失败')
      }
      resolve(doc)
    })
  })
}

// 按需暴露出函数
module.exports = {
  verifyUser,
  getStuInfo,
  student,
}
