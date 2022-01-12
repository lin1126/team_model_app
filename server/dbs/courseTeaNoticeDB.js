/******************************************************
 * 本文件封装与教师课程通知有关的数据库操作
 ******************************************************/
const mongoose = require('../../utils/mongodb')
const { addAllNotice } = require('./courseNoticeDB.js')
const courseNoticeSchema = mongoose.Schema({
  courseID: Number,
  notice: String,
  title: String,
  Time: {
    type: Number,
    unique: true,
  },
  teacherID: Number,
  show: Boolean,
})

const courseTeaNotice = mongoose.model('Teacher_notice_db', courseNoticeSchema, 'teacher_notice_db')

// 教师获取课程公告
function getTeaNotice(teacherID, courseID, page, limit) {
  return new Promise((resolve, reject) => {
    courseTeaNotice
      .find({ ID: teacherID, courseID: courseID })
      .skip((page - 1) * limit)
      .limit(limit - 0)
      .sort({ State: 1 })
      .sort({ Time: -1 })
      .exec((err, doc) => {
        if (err) {
          reject('查询课程公告失败')
        }
        resolve(doc)
      })
  })
}

// 添加课程公告的方法
function addTeaNotice(data) {
  return new Promise(async (resolve, reject) => {
    var time = new Date()
    const date = time.getTime()
    // 填充数据
    var msg = {
      courseID: data.courseID,
      notice: data.notice,
      title: data.title,
      Time: date,
      teacherID: data.teacherID,
      show: false,
    }
    // 添加一条教师课程公告
    const u = new courseTeaNotice(msg)
    u.save((err) => {
      if (err) {
        console.log(err)
        reject(400)
      }
    })
    // 为班级中的每一个学生都添加上课程通知
    const res = await addAllNotice(data, date)
    resolve(res)
  })
}

module.exports = {
  getTeaNotice,
  addTeaNotice,
}
